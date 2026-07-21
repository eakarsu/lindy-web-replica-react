import { timingSafeEqual } from "node:crypto";
import { z } from "zod";
import { HttpError } from "./errors.mjs";
import {
  expiredSessionCookie,
  hashPassword,
  opaqueHash,
  parseCookies,
  randomToken,
  sessionCookie,
  signSession,
  verifyPassword,
  verifySession,
} from "./security.mjs";

const loginSchema = z
  .object({
    email: z.string().trim().email().max(254).transform((value) => value.toLowerCase()),
    password: z.string().min(1).max(256),
  })
  .strict();

const dummyHashPromise = hashPassword("not-a-real-password-value");

function sameSecret(left, right) {
  if (typeof left !== "string" || typeof right !== "string") return false;
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

export function authHandlers({ pool, config }) {
  async function login(req, res) {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new HttpError(400, "VALIDATION_FAILED", "A valid email and password are required");
    }

    const organization = await pool.query("SELECT id FROM organizations WHERE slug = $1", [
      config.publicOrganizationSlug,
    ]);
    if (!organization.rows[0]) {
      throw new HttpError(503, "WORKFLOW_NOT_CONFIGURED", "The request workflow is not configured");
    }

    const windowMilliseconds = config.intakeRateWindowSeconds * 1000;
    const windowStartedAt = new Date(Math.floor(Date.now() / windowMilliseconds) * windowMilliseconds);
    const subjectHash = opaqueHash(
      `${req.ip || "unknown"}:${parsed.data.email}`,
      config.privacyHashSecret,
    );
    const rate = await pool.query(
      `INSERT INTO auth_rate_limits
        (organization_id, subject_hash, window_started_at, request_count)
       VALUES ($1, $2, $3, 1)
       ON CONFLICT (organization_id, subject_hash, window_started_at)
       DO UPDATE SET request_count = auth_rate_limits.request_count + 1
       RETURNING request_count`,
      [organization.rows[0].id, subjectHash, windowStartedAt],
    );
    if (rate.rows[0].request_count > config.loginRateLimit) {
      throw new HttpError(429, "RATE_LIMITED", "Too many sign-in attempts; try again later");
    }

    const result = await pool.query(
      `SELECT id, organization_id, email, password_hash, role, active, auth_version
         FROM users
        WHERE organization_id = $1 AND email = $2`,
      [organization.rows[0].id, parsed.data.email],
    );
    const user = result.rows[0];
    const passwordHash = user?.password_hash ?? (await dummyHashPromise);
    const passwordMatches = await verifyPassword(parsed.data.password, passwordHash);
    if (!user || !user.active || !passwordMatches) {
      throw new HttpError(401, "INVALID_CREDENTIALS", "Email or password is incorrect");
    }

    const csrfToken = randomToken();
    const token = signSession(
      {
        userId: user.id,
        organizationId: user.organization_id,
        role: user.role,
        authVersion: user.auth_version,
        csrfToken,
      },
      config.authSecret,
      config.sessionTtlSeconds,
    );
    res.setHeader("Set-Cookie", sessionCookie(token, config));
    res.json({
      user: { id: user.id, email: user.email, role: user.role },
      csrfToken,
      expiresInSeconds: config.sessionTtlSeconds,
    });
  }

  async function requireAuth(req, _res, next) {
    const token = parseCookies(req.headers.cookie).lindy_session;
    const session = token ? verifySession(token, config.authSecret) : null;
    if (!session) return next(new HttpError(401, "UNAUTHENTICATED", "Sign in is required"));

    try {
      const result = await pool.query(
        `SELECT id, organization_id, email, role, active, auth_version
           FROM users
          WHERE id = $1 AND organization_id = $2`,
        [session.sub, session.org],
      );
      const user = result.rows[0];
      if (!user || !user.active || user.auth_version !== session.ver || user.role !== session.role) {
        return next(new HttpError(401, "SESSION_REVOKED", "This session is no longer valid"));
      }
      req.principal = {
        userId: user.id,
        organizationId: user.organization_id,
        email: user.email,
        role: user.role,
        csrfToken: session.csrf,
      };
      return next();
    } catch (error) {
      return next(error);
    }
  }

  function requireCsrf(req, _res, next) {
    if (!sameSecret(req.get("X-CSRF-Token"), req.principal?.csrfToken)) {
      return next(new HttpError(403, "CSRF_REJECTED", "The CSRF token is missing or invalid"));
    }
    return next();
  }

  function requireRoles(...roles) {
    return (req, _res, next) => {
      if (!req.principal || !roles.includes(req.principal.role)) {
        return next(new HttpError(403, "FORBIDDEN", "This role cannot perform that action"));
      }
      return next();
    };
  }

  function me(req, res) {
    res.json({
      user: {
        id: req.principal.userId,
        email: req.principal.email,
        role: req.principal.role,
      },
      csrfToken: req.principal.csrfToken,
    });
  }

  function logout(_req, res) {
    res.setHeader("Set-Cookie", expiredSessionCookie(config));
    res.status(204).end();
  }

  return { login, requireAuth, requireCsrf, requireRoles, me, logout };
}
