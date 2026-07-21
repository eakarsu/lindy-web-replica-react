# Governed demo-request workflow

This repository now implements one complete product journey: a visitor submits a demo request, receives a durable reference, and an authorized sales reviewer moves it through an explicit PostgreSQL-backed lifecycle. The previous broad AI marketing replica was narrowed because static pages and dead buttons were not evidence of a working product.

## Acceptance criteria

- A consented public submission is validated and persisted exactly once under browser/network retry.
- The browser receives a non-sensitive reference and clear failure state; form data is never logged.
- Reviewers authenticate without default credentials. ADMIN and REP can perform valid transitions; AUDITOR is read-only.
- Every read/write is scoped to the server-configured organization. The public client cannot choose a tenant.
- State updates require an expected version and idempotency key. Invalid jumps, stale writes, CSRF, origins, and cross-tenant IDs fail closed.
- Creation and status changes produce immutable, per-organization hash-linked audit events.
- Readiness proves the database, exact migration checksums, and public organization are present.

The lifecycle is `NEW -> QUALIFIED -> CONTACTED -> CLOSED`, with rejection from `NEW` or `QUALIFIED` and re-qualification from `CONTACTED`.

## Local setup

Requires Node.js 22 or later and PostgreSQL 14 or later.

```sh
npm ci
cp .env.example .env
# Replace both secret placeholders and adjust DATABASE_URL.
set -a; source .env; set +a
npm run db:migrate
npm run admin:create
```

`admin:create` reads the temporary `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_ORGANIZATION_NAME`, and `ADMIN_ROLE` variables. It refuses to overwrite an existing account. Remove the bootstrap password from the environment after use.

Run the API on port 3001 and Vite on port 8080 in separate terminals:

```sh
npm run dev:api
npm run dev
```

Vite proxies `/api` locally. A production build is served by the same Express process:

```sh
npm run build
NODE_ENV=production COOKIE_SECURE=true npm start
```

Production must sit behind a known TLS proxy and use an exact HTTPS `ALLOWED_ORIGINS` value. See [operations](docs/OPERATIONS.md) and the [security model](docs/SECURITY.md).

## Quality and database checks

```sh
npm run lint
npm run typecheck
npm test
TEST_DATABASE_URL=postgresql:///lindy_test npm run test:integration
npm run test:e2e
npm run build
npm audit --omit=dev --audit-level=high
npm run db:verify
```

Integration and browser tests expect a disposable database; the integration suite applies checked-in migrations and seeds synthetic users. CI also repeats migrations, exercises Chromium end to end, scans full Git history for secrets, creates and restores a real database backup, and builds the non-root container.

## Runtime endpoints

- `GET /api/health/live` — process liveness only
- `GET /api/health/ready` — database, migrations, and workflow-organization readiness
- `POST /api/public/demo-requests` — strict public intake; requires `Idempotency-Key`
- `POST /api/auth/login`, `GET /api/auth/me`, `POST /api/auth/logout`
- `GET /api/admin/demo-requests` — authenticated tenant queue
- `POST /api/admin/demo-requests/:id/transitions` — ADMIN/REP, CSRF token, expected version, and idempotency key required
- `GET /api/admin/audit/verify` — ADMIN/AUDITOR chain verification

There are no sample production credentials, fake integrations, analytics beacons, external AI calls, or automatic email claims. Deployment-owned legal approval, retention/deletion policy, MFA/SSO, managed encryption, immutable external audit storage where required, observability ownership, accessibility, load, penetration, and disaster-recovery exercises remain launch gates.
