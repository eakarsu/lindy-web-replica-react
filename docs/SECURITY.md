# Security model

## Trust boundaries

- The public form accepts untrusted input. Strict schemas, a 32 KiB body limit, persistent fixed-window rate limits, a honeypot field, and parameterized SQL constrain it.
- The configured `PUBLIC_ORGANIZATION_SLUG` routes public requests; clients cannot choose a tenant.
- Reviewer sessions are signed, short-lived, HttpOnly, SameSite=Strict cookies. The server reloads active state, role, tenant, and `auth_version` on every request. State-changing requests also require a session-bound CSRF token and an allowed Origin.
- `ADMIN` and `REP` can change status. `AUDITOR` can read requests and verify the audit chain but cannot mutate workflow state.
- Every administrative query includes `organization_id`; composite foreign keys prevent cross-tenant actor/request relationships.

Passwords use Node's scrypt with per-password random salts. Login failures do not disclose whether an account exists. IP addresses and idempotency keys are stored only as keyed SHA-256 hashes. Application logs exclude PII and credentials.

Request events are append-only at the database layer and linked by SHA-256 per organization. `npm run db:verify` detects missing controls or a broken chain. A database owner can still defeat local triggers, so regulated deployments should export audit heads/events to independently controlled immutable storage.

Production fails closed unless cookies and browser origins use HTTPS, PostgreSQL uses certificate-verifying TLS on a non-loopback host, and migrations run as a separate release job. A private CA can be supplied through `DATABASE_SSL_CA`.

## Reporting and dependency policy

Do not place secrets or customer data in issues. Use the private owner-designated security channel. CI runs unit/integration tests, migration replay, build/lint, low-threshold production and development dependency audits, backup/restore verification, container build, and full-history secret scanning. Both dependency graphs must have zero known audit findings before release.
