import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { after, before, test } from "node:test";
import { createApp } from "../../server/app.mjs";
import { createPool } from "../../server/db.mjs";
import { migrate } from "../../server/migrations.mjs";
import { hashPassword, randomToken, signSession } from "../../server/security.mjs";

const databaseUrl = process.env.TEST_DATABASE_URL;
const integrationTest = databaseUrl ? test : test.skip;
const ids = {
  organization: randomUUID(),
  user: randomUUID(),
  otherOrganization: randomUUID(),
  otherUser: randomUUID(),
};
const config = {
  nodeEnv: "test",
  port: 0,
  databaseUrl,
  databaseSslMode: "disable",
  migrateOnStart: false,
  publicOrganizationSlug: "demo-sales",
  allowedOrigins: ["http://localhost:8080"],
  trustProxyHops: 0,
  authSecret: randomToken(),
  privacyHashSecret: randomToken(),
  sessionTtlSeconds: 900,
  cookieSecure: false,
  intakeRateLimit: 100,
  intakeRateWindowSeconds: 900,
  loginRateLimit: 100,
};

let pool;
let server;
let baseUrl;
let sessionCookie;
let csrfToken;
let createdRequest;

async function request(path, init = {}) {
  const response = await fetch(`${baseUrl}${path}`, init);
  const body = response.status === 204 ? null : await response.json();
  return { response, body };
}

before(async () => {
  if (!databaseUrl) return;
  pool = createPool(config);
  await migrate(pool);
  await pool.query(
    "TRUNCATE status_operations, request_events, demo_requests, auth_rate_limits, intake_rate_limits, users, organizations CASCADE",
  );
  const passwordHash = await hashPassword(process.env.TEST_ADMIN_PASSWORD ?? "integration-password-value");
  await pool.query(
    `INSERT INTO organizations (id, slug, name) VALUES ($1, 'demo-sales', 'Demo Sales'), ($2, 'other-team', 'Other Team')`,
    [ids.organization, ids.otherOrganization],
  );
  await pool.query(
    `INSERT INTO users (id, organization_id, email, password_hash, role)
     VALUES ($1, $2, 'admin@example.test', $3, 'ADMIN'),
            ($4, $5, 'other@example.test', $3, 'ADMIN')`,
    [ids.user, ids.organization, passwordHash, ids.otherUser, ids.otherOrganization],
  );

  const app = createApp({ pool, config, serveFrontend: false, logger: { info() {}, error() {} } });
  await new Promise((resolve) => {
    server = app.listen(0, "127.0.0.1", resolve);
  });
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  if (server) await new Promise((resolve) => server.close(resolve));
  if (pool) await pool.end();
});

integrationTest("health differentiates liveness and configured readiness", async () => {
  assert.equal((await request("/api/health/live")).response.status, 200);
  const ready = await request("/api/health/ready");
  assert.equal(ready.response.status, 200);
  assert.equal(ready.body.organizationConfigured, true);
});

integrationTest("origin and intake validation fail closed", async () => {
  const rejectedOrigin = await request("/api/health/live", { headers: { Origin: "https://evil.example" } });
  assert.equal(rejectedOrigin.response.status, 403);

  const invalid = await request("/api/public/demo-requests", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Idempotency-Key": randomUUID() },
    body: JSON.stringify({ name: "A", email: "bad", message: "short", privacyConsent: false }),
  });
  assert.equal(invalid.response.status, 400);
  assert.equal(invalid.body.error.code, "VALIDATION_FAILED");
});

integrationTest("public intake persists once and rejects idempotency-key misuse", async () => {
  const key = randomUUID();
  const body = {
    name: "Ada Lovelace",
    email: "ADA@EXAMPLE.TEST",
    company: "Analytical Engines",
    message: "We need to evaluate a governed request workflow.",
    privacyConsent: true,
    website: "",
  };
  const created = await request("/api/public/demo-requests", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Idempotency-Key": key },
    body: JSON.stringify(body),
  });
  assert.equal(created.response.status, 201);
  assert.match(created.body.request.reference, /^DEMO-/);
  createdRequest = created.body.request;

  const replay = await request("/api/public/demo-requests", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Idempotency-Key": key },
    body: JSON.stringify(body),
  });
  assert.equal(replay.response.status, 200);
  assert.equal(replay.response.headers.get("idempotent-replay"), "true");
  assert.equal(replay.body.request.id, createdRequest.id);

  const conflict = await request("/api/public/demo-requests", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Idempotency-Key": key },
    body: JSON.stringify({ ...body, message: "A different message that is long enough." }),
  });
  assert.equal(conflict.response.status, 409);
  assert.equal(conflict.body.error.code, "IDEMPOTENCY_CONFLICT");
  assert.equal((await pool.query("SELECT count(*)::int AS count FROM demo_requests")).rows[0].count, 1);
});

integrationTest("authentication uses an HttpOnly session and protects administrative data", async () => {
  assert.equal((await request("/api/admin/demo-requests")).response.status, 401);
  const badLogin = await request("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "admin@example.test", password: "wrong" }),
  });
  assert.equal(badLogin.response.status, 401);

  const signedIn = await request("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: "http://localhost:8080" },
    body: JSON.stringify({
      email: "admin@example.test",
      password: process.env.TEST_ADMIN_PASSWORD ?? "integration-password-value",
    }),
  });
  assert.equal(signedIn.response.status, 200);
  sessionCookie = signedIn.response.headers.get("set-cookie").split(";")[0];
  csrfToken = signedIn.body.csrfToken;
  assert.match(signedIn.response.headers.get("set-cookie"), /HttpOnly/);

  const list = await request("/api/admin/demo-requests", { headers: { Cookie: sessionCookie } });
  assert.equal(list.response.status, 200);
  assert.equal(list.body.requests[0].email, "ada@example.test");
});

integrationTest("status changes enforce CSRF, state, version, tenant and idempotency", async () => {
  const missingCsrf = await request(`/api/admin/demo-requests/${createdRequest.id}/transitions`, {
    method: "POST",
    headers: { Cookie: sessionCookie, "Content-Type": "application/json", "Idempotency-Key": randomUUID() },
    body: JSON.stringify({ status: "QUALIFIED", expectedVersion: 1 }),
  });
  assert.equal(missingCsrf.response.status, 403);

  const operationKey = randomUUID();
  const transitionHeaders = {
    Cookie: sessionCookie,
    "Content-Type": "application/json",
    "Idempotency-Key": operationKey,
    "X-CSRF-Token": csrfToken,
  };
  const changed = await request(`/api/admin/demo-requests/${createdRequest.id}/transitions`, {
    method: "POST",
    headers: transitionHeaders,
    body: JSON.stringify({ status: "QUALIFIED", expectedVersion: 1 }),
  });
  assert.equal(changed.response.status, 200);
  assert.equal(changed.body.request.version, 2);

  const replay = await request(`/api/admin/demo-requests/${createdRequest.id}/transitions`, {
    method: "POST",
    headers: transitionHeaders,
    body: JSON.stringify({ status: "QUALIFIED", expectedVersion: 1 }),
  });
  assert.equal(replay.response.status, 200);
  assert.equal(replay.response.headers.get("idempotent-replay"), "true");

  const stale = await request(`/api/admin/demo-requests/${createdRequest.id}/transitions`, {
    method: "POST",
    headers: { ...transitionHeaders, "Idempotency-Key": randomUUID() },
    body: JSON.stringify({ status: "CONTACTED", expectedVersion: 1 }),
  });
  assert.equal(stale.response.status, 409);
  assert.equal(stale.body.error.code, "VERSION_CONFLICT");

  const otherCsrf = randomToken();
  const otherToken = signSession(
    {
      userId: ids.otherUser,
      organizationId: ids.otherOrganization,
      role: "ADMIN",
      authVersion: 1,
      csrfToken: otherCsrf,
    },
    config.authSecret,
    900,
  );
  const crossTenant = await request(`/api/admin/demo-requests/${createdRequest.id}/transitions`, {
    method: "POST",
    headers: {
      Cookie: `lindy_session=${otherToken}`,
      "Content-Type": "application/json",
      "Idempotency-Key": randomUUID(),
      "X-CSRF-Token": otherCsrf,
    },
    body: JSON.stringify({ status: "CONTACTED", expectedVersion: 2 }),
  });
  assert.equal(crossTenant.response.status, 404);
});

integrationTest("audit verification passes and active session revocation is immediate", async () => {
  const audit = await request("/api/admin/audit/verify", { headers: { Cookie: sessionCookie } });
  assert.equal(audit.response.status, 200);
  assert.equal(audit.body.ok, true);
  assert.equal(audit.body.checked, 2);

  await pool.query("UPDATE users SET auth_version = auth_version + 1 WHERE id = $1", [ids.user]);
  const revoked = await request("/api/auth/me", { headers: { Cookie: sessionCookie } });
  assert.equal(revoked.response.status, 401);
  assert.equal(revoked.body.error.code, "SESSION_REVOKED");
});
