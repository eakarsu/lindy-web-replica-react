import { createHash, randomBytes, randomUUID } from "node:crypto";
import { z } from "zod";
import { appendRequestEvent, canonicalJson } from "./audit.mjs";
import { HttpError, assertIdempotencyKey } from "./errors.mjs";
import { opaqueHash } from "./security.mjs";
import { withTransaction } from "./db.mjs";

const intakeSchema = z
  .object({
    name: z.string().trim().min(2).max(120),
    email: z.string().trim().email().max(254).transform((value) => value.toLowerCase()),
    company: z.string().trim().max(160).optional().transform((value) => value || null),
    message: z.string().trim().min(10).max(4000),
    privacyConsent: z.literal(true),
    website: z.string().max(0).optional(),
  })
  .strict();

const transitionSchema = z
  .object({
    status: z.enum(["QUALIFIED", "CONTACTED", "CLOSED", "REJECTED"]),
    expectedVersion: z.number().int().positive(),
    note: z.string().trim().min(2).max(500).optional(),
  })
  .strict();

const allowedTransitions = new Map([
  ["NEW", new Set(["QUALIFIED", "REJECTED"])],
  ["QUALIFIED", new Set(["CONTACTED", "REJECTED"])],
  ["CONTACTED", new Set(["CLOSED", "QUALIFIED"])],
  ["CLOSED", new Set()],
  ["REJECTED", new Set()],
]);

function validationError(result) {
  return new HttpError(
    400,
    "VALIDATION_FAILED",
    "The request body is invalid",
    result.error.issues.map((issue) => ({ field: issue.path.join("."), message: issue.message })),
  );
}

function requestHash(value) {
  return createHash("sha256").update(canonicalJson(value)).digest("hex");
}

function requestReference(now = new Date()) {
  const date = now.toISOString().slice(0, 10).replaceAll("-", "");
  const suffix = randomBytes(5)
    .toString("base64url")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "X")
    .padEnd(8, "X")
    .slice(0, 8);
  return `DEMO-${date}-${suffix}`;
}

function publicResponse(row) {
  return {
    id: row.id,
    reference: row.reference,
    status: row.status,
    createdAt: row.created_at.toISOString(),
  };
}

async function organizationForPublicWorkflow(queryable, slug) {
  const result = await queryable.query("SELECT id FROM organizations WHERE slug = $1", [slug]);
  if (!result.rows[0]) {
    throw new HttpError(503, "WORKFLOW_NOT_CONFIGURED", "The request workflow is not configured");
  }
  return result.rows[0];
}

async function existingIntake(pool, organizationId, idempotencyKeyHash, bodyHash) {
  const result = await pool.query(
    `SELECT id, reference, status, created_at, request_hash
       FROM demo_requests
      WHERE organization_id = $1 AND idempotency_key_hash = $2`,
    [organizationId, idempotencyKeyHash],
  );
  if (!result.rows[0]) return null;
  if (result.rows[0].request_hash !== bodyHash) {
    throw new HttpError(409, "IDEMPOTENCY_CONFLICT", "That idempotency key was used for a different request");
  }
  return publicResponse(result.rows[0]);
}

export async function createDemoRequest({ pool, config, body, idempotencyKey, ipAddress, now = new Date() }) {
  assertIdempotencyKey(idempotencyKey);
  const parsed = intakeSchema.safeParse(body);
  if (!parsed.success) throw validationError(parsed);

  const organization = await organizationForPublicWorkflow(pool, config.publicOrganizationSlug);
  const normalized = parsed.data;
  const bodyHash = requestHash(normalized);
  const keyHash = opaqueHash(idempotencyKey, config.privacyHashSecret);
  const replay = await existingIntake(pool, organization.id, keyHash, bodyHash);
  if (replay) return { request: replay, replayed: true };

  const ipHash = opaqueHash(ipAddress || "unknown", config.privacyHashSecret);
  const windowMilliseconds = config.intakeRateWindowSeconds * 1000;
  const windowStartedAt = new Date(Math.floor(now.getTime() / windowMilliseconds) * windowMilliseconds);

  try {
    const created = await withTransaction(pool, async (client) => {
      const rate = await client.query(
        `INSERT INTO intake_rate_limits
           (organization_id, subject_hash, window_started_at, request_count)
         VALUES ($1, $2, $3, 1)
         ON CONFLICT (organization_id, subject_hash, window_started_at)
         DO UPDATE SET request_count = intake_rate_limits.request_count + 1
         RETURNING request_count`,
        [organization.id, ipHash, windowStartedAt],
      );
      if (rate.rows[0].request_count > config.intakeRateLimit) {
        throw new HttpError(429, "RATE_LIMITED", "Too many requests; try again later");
      }

      const id = randomUUID();
      const reference = requestReference(now);
      const result = await client.query(
        `INSERT INTO demo_requests
          (id, organization_id, reference, name, email, company, message, privacy_consent_at,
           source, ip_hash, idempotency_key_hash, request_hash, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'website', $9, $10, $11, $8, $8)
         RETURNING id, reference, status, created_at`,
        [
          id,
          organization.id,
          reference,
          normalized.name,
          normalized.email,
          normalized.company,
          normalized.message,
          now,
          ipHash,
          keyHash,
          bodyHash,
        ],
      );

      await appendRequestEvent(client, {
        organizationId: organization.id,
        demoRequestId: id,
        actorKind: "PUBLIC",
        eventType: "REQUEST_CREATED",
        toStatus: "NEW",
        payload: { source: "website", privacyConsentRecorded: true },
        createdAt: now,
      });
      return publicResponse(result.rows[0]);
    });
    return { request: created, replayed: false };
  } catch (error) {
    if (error?.code === "23505") {
      const concurrentReplay = await existingIntake(pool, organization.id, keyHash, bodyHash);
      if (concurrentReplay) return { request: concurrentReplay, replayed: true };
    }
    throw error;
  }
}

function adminRequest(row) {
  return {
    id: row.id,
    reference: row.reference,
    name: row.name,
    email: row.email,
    company: row.company,
    message: row.message,
    status: row.status,
    version: row.version,
    assignedTo: row.assigned_to,
    source: row.source,
    privacyConsentAt: row.privacy_consent_at.toISOString(),
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  };
}

export async function listDemoRequests(pool, principal, query) {
  const limit = Math.min(Math.max(Number(query.limit) || 50, 1), 100);
  const status = query.status ? z.enum(["NEW", "QUALIFIED", "CONTACTED", "CLOSED", "REJECTED"]).safeParse(query.status) : null;
  if (status && !status.success) throw new HttpError(400, "VALIDATION_FAILED", "Unknown request status");

  const values = [principal.organizationId, limit];
  const filters = ["organization_id = $1"];
  if (status?.success) {
    values.push(status.data);
    filters.push(`status = $${values.length}`);
  }

  const result = await pool.query(
    `SELECT id, reference, name, email, company, message, status, version, assigned_to,
            source, privacy_consent_at, created_at, updated_at
       FROM demo_requests
      WHERE ${filters.join(" AND ")}
      ORDER BY created_at DESC, id DESC
      LIMIT $2`,
    values,
  );
  return result.rows.map(adminRequest);
}

async function existingStatusOperation(queryable, principal, keyHash, bodyHash) {
  const result = await queryable.query(
    `SELECT request_hash, response_body
       FROM status_operations
      WHERE organization_id = $1 AND actor_user_id = $2 AND idempotency_key_hash = $3`,
    [principal.organizationId, principal.userId, keyHash],
  );
  if (!result.rows[0]) return null;
  if (result.rows[0].request_hash !== bodyHash) {
    throw new HttpError(409, "IDEMPOTENCY_CONFLICT", "That idempotency key was used for a different operation");
  }
  return result.rows[0].response_body;
}

export async function transitionDemoRequest({ pool, config, principal, requestId, body, idempotencyKey, now = new Date() }) {
  assertIdempotencyKey(idempotencyKey);
  if (!/^[0-9a-f-]{36}$/i.test(requestId)) throw new HttpError(404, "NOT_FOUND", "Request not found");
  const parsed = transitionSchema.safeParse(body);
  if (!parsed.success) throw validationError(parsed);

  const bodyHash = requestHash({ requestId, ...parsed.data });
  const keyHash = opaqueHash(idempotencyKey, config.privacyHashSecret);
  const replay = await existingStatusOperation(pool, principal, keyHash, bodyHash);
  if (replay) return { request: replay, replayed: true };

  try {
    const response = await withTransaction(pool, async (client) => {
      const found = await client.query(
        `SELECT id, reference, name, email, company, message, status, version, assigned_to,
                source, privacy_consent_at, created_at, updated_at
           FROM demo_requests
          WHERE id = $1 AND organization_id = $2
          FOR UPDATE`,
        [requestId, principal.organizationId],
      );
      const current = found.rows[0];
      if (!current) throw new HttpError(404, "NOT_FOUND", "Request not found");
      if (current.version !== parsed.data.expectedVersion) {
        throw new HttpError(409, "VERSION_CONFLICT", "The request changed; reload before retrying", {
          currentVersion: current.version,
          currentStatus: current.status,
        });
      }
      if (!allowedTransitions.get(current.status)?.has(parsed.data.status)) {
        throw new HttpError(422, "INVALID_TRANSITION", `Cannot move ${current.status} to ${parsed.data.status}`);
      }

      const updated = await client.query(
        `UPDATE demo_requests
            SET status = $1, version = version + 1, updated_at = $2
          WHERE id = $3 AND organization_id = $4 AND version = $5
          RETURNING id, reference, name, email, company, message, status, version, assigned_to,
                    source, privacy_consent_at, created_at, updated_at`,
        [parsed.data.status, now, requestId, principal.organizationId, current.version],
      );
      if (updated.rowCount !== 1) {
        throw new HttpError(409, "VERSION_CONFLICT", "The request changed; reload before retrying");
      }

      await appendRequestEvent(client, {
        organizationId: principal.organizationId,
        demoRequestId: requestId,
        actorUserId: principal.userId,
        actorKind: "USER",
        eventType: "STATUS_CHANGED",
        fromStatus: current.status,
        toStatus: parsed.data.status,
        payload: { note: parsed.data.note ?? null },
        createdAt: now,
      });

      const responseBody = adminRequest(updated.rows[0]);
      await client.query(
        `INSERT INTO status_operations
          (id, organization_id, actor_user_id, demo_request_id, idempotency_key_hash,
           request_hash, response_body, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb, $8)`,
        [randomUUID(), principal.organizationId, principal.userId, requestId, keyHash, bodyHash, JSON.stringify(responseBody), now],
      );
      return responseBody;
    });
    return { request: response, replayed: false };
  } catch (error) {
    if (error?.code === "23505") {
      const concurrentReplay = await existingStatusOperation(pool, principal, keyHash, bodyHash);
      if (concurrentReplay) return { request: concurrentReplay, replayed: true };
    }
    throw error;
  }
}

export function canTransition(fromStatus, toStatus) {
  return allowedTransitions.get(fromStatus)?.has(toStatus) ?? false;
}

export { intakeSchema, transitionSchema };
