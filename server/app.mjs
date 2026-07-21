import { randomUUID } from "node:crypto";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import helmet from "helmet";
import { authHandlers } from "./auth.mjs";
import { verifyAuditChain } from "./audit.mjs";
import { HttpError } from "./errors.mjs";
import { verifyMigrations } from "./migrations.mjs";
import { createDemoRequest, listDemoRequests, transitionDemoRequest } from "./workflow.mjs";

const rootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function safeRequestId(value) {
  return typeof value === "string" && /^[A-Za-z0-9._:-]{8,100}$/.test(value) ? value : randomUUID();
}

function asyncRoute(handler) {
  return (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
}

export function createApp({ pool, config, serveFrontend = true, logger = console }) {
  const app = express();
  const auth = authHandlers({ pool, config });
  app.disable("x-powered-by");
  if (config.trustProxyHops > 0) app.set("trust proxy", config.trustProxyHops);

  app.use((req, res, next) => {
    req.requestId = safeRequestId(req.get("X-Request-Id"));
    res.setHeader("X-Request-Id", req.requestId);
    const startedAt = Date.now();
    res.on("finish", () => {
      logger.info?.(
        JSON.stringify({
          level: "info",
          event: "http_request",
          requestId: req.requestId,
          method: req.method,
          path: req.path,
          status: res.statusCode,
          durationMs: Date.now() - startedAt,
          principalId: req.principal?.userId ?? null,
        }),
      );
    });
    next();
  });

  app.use((req, res, next) => {
    const origin = req.get("Origin");
    if (origin && !config.allowedOrigins.includes(origin)) {
      return next(new HttpError(403, "ORIGIN_REJECTED", "This origin is not allowed"));
    }
    if (origin) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Vary", "Origin");
    }
    if (req.method === "OPTIONS") {
      res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type,Idempotency-Key,X-CSRF-Token,X-Request-Id");
      return res.status(204).end();
    }
    return next();
  });

  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: "same-origin" },
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", "data:"],
          connectSrc: ["'self'", ...config.allowedOrigins],
          objectSrc: ["'none'"],
          baseUri: ["'self'"],
          frameAncestors: ["'none'"],
        },
      },
    }),
  );
  app.use(express.json({ limit: "32kb", strict: true }));

  app.get("/api/health/live", (_req, res) => res.json({ status: "live" }));
  app.get(
    "/api/health/ready",
    asyncRoute(async (_req, res) => {
      await pool.query("SELECT 1");
      const migrations = await verifyMigrations(pool);
      const organization = await pool.query("SELECT 1 FROM organizations WHERE slug = $1", [
        config.publicOrganizationSlug,
      ]);
      const ready = migrations.ok && organization.rowCount === 1;
      res.status(ready ? 200 : 503).json({
        status: ready ? "ready" : "not_ready",
        migrations,
        organizationConfigured: organization.rowCount === 1,
      });
    }),
  );

  app.post(
    "/api/public/demo-requests",
    asyncRoute(async (req, res) => {
      const result = await createDemoRequest({
        pool,
        config,
        body: req.body,
        idempotencyKey: req.get("Idempotency-Key"),
        ipAddress: req.ip,
      });
      if (result.replayed) res.setHeader("Idempotent-Replay", "true");
      res.status(result.replayed ? 200 : 201).json({ request: result.request });
    }),
  );

  app.post("/api/auth/login", asyncRoute(auth.login));
  app.get("/api/auth/me", auth.requireAuth, auth.me);
  app.post("/api/auth/logout", auth.requireAuth, auth.requireCsrf, auth.logout);

  app.get(
    "/api/admin/demo-requests",
    auth.requireAuth,
    asyncRoute(async (req, res) => {
      res.json({ requests: await listDemoRequests(pool, req.principal, req.query) });
    }),
  );
  app.post(
    "/api/admin/demo-requests/:requestId/transitions",
    auth.requireAuth,
    auth.requireCsrf,
    auth.requireRoles("ADMIN", "REP"),
    asyncRoute(async (req, res) => {
      const result = await transitionDemoRequest({
        pool,
        config,
        principal: req.principal,
        requestId: req.params.requestId,
        body: req.body,
        idempotencyKey: req.get("Idempotency-Key"),
      });
      if (result.replayed) res.setHeader("Idempotent-Replay", "true");
      res.json({ request: result.request });
    }),
  );
  app.get(
    "/api/admin/audit/verify",
    auth.requireAuth,
    auth.requireRoles("ADMIN", "AUDITOR"),
    asyncRoute(async (req, res) => {
      const result = await verifyAuditChain(pool, req.principal.organizationId);
      res.status(result.ok ? 200 : 409).json(result);
    }),
  );

  if (serveFrontend) {
    const distributionDirectory = path.join(rootDirectory, "dist");
    if (existsSync(distributionDirectory)) {
      app.use(express.static(distributionDirectory, { index: false, maxAge: "1h" }));
      app.get("/{*path}", (_req, res) => res.sendFile(path.join(distributionDirectory, "index.html")));
    }
  }

  app.use((req, _res, next) => next(new HttpError(404, "NOT_FOUND", `No route for ${req.method} ${req.path}`)));
  app.use((error, req, res, _next) => {
    const status = error instanceof HttpError ? error.status : error?.type === "entity.parse.failed" ? 400 : 500;
    const code = error instanceof HttpError ? error.code : status === 400 ? "INVALID_JSON" : "INTERNAL_ERROR";
    const message = error instanceof HttpError ? error.message : status === 400 ? "The JSON body is invalid" : "The request failed";
    if (status >= 500) {
      logger.error?.(
        JSON.stringify({ level: "error", event: "request_failed", requestId: req.requestId, message: error?.message }),
      );
    }
    res.status(status).json({
      error: {
        code,
        message,
        ...(error instanceof HttpError && error.details ? { details: error.details } : {}),
        requestId: req.requestId,
      },
    });
  });

  return app;
}
