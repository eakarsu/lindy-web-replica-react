# Completeness Review: lindy-web-replica-react

**Review date:** 2026-07-18

## Assessment basis

Static inspection of project-owned source and configuration only; no dependency installation, build, database migration, external-service call, or runtime launch was performed. The scan considered 102 project files (87 source files), 1 manifest(s), 0 test-like file(s), and 0 CI workflow(s), excluding dependency/generated directories.

## Classification

**Functional but incomplete**

This is a substantive but unfinished application workflow application, not just an empty scaffold. Inspection found 87 source files across `src/` using Next.js, React; however, the checked-in workflow and delivery controls do not yet demonstrate a complete, production-operable product.

## Why it is not complete

- Mock, demo, sample, fixture, or placeholder behavior remains in executable/product paths.
- No recognizable project-owned automated tests were found for the main workflow.
- No checked-in CI workflow proves builds, tests, migrations, and security checks on every change.
- No environment template documents required configuration and secret boundaries.
- No clear deployment/container configuration demonstrates a reproducible production topology.

## Needed features

1. Define the primary user and acceptance criteria, then complete one end-to-end workflow against persistent data instead of demo fixtures.
2. Replace mocks, placeholders, and generic AI responses with validated domain services and explicit failure/retry behavior.
3. Implement secure identity, role/tenant boundaries, input validation, secrets handling, and auditable state changes.
4. Add representative automated tests, CI quality gates, environment documentation, migrations, observability, backup, and deployment configuration.
5. Add risk-based unit, integration, and end-to-end tests in CI, including migration and failure-path coverage.

## Risks or launch blockers

- Regression risk is high because no recognizable project-owned automated tests cover the main path.
- No CI evidence prevents broken or insecure changes from reaching a release.

## Evidence inspected

- `README.md`
- `src/pages/ContactPage.tsx:123`
- `src/App.tsx`
- `src/main.tsx`
- `package.json`

## Recommended next action

Choose one real application workflow journey, define acceptance criteria and external contracts, then close its persistence, permission, integration, failure, and test gaps before expanding features.

## Implementation progress (2026-07-20)

The recommendation is implemented for a deliberately bounded product: public demo-request intake and tenant-scoped sales review. The unsupported AI-platform marketing replica is no longer the running product surface; fake testimonials, pricing, solution, integration, compliance, contact, map, and dead-button pages were retired. The remaining UI identifies the verified boundary and provides a working overview, consented request form, privacy/security notices, and authenticated reviewer console.

Implemented workflow and controls:

- PostgreSQL migrations define organizations, revocable ADMIN/REP/AUDITOR users, demo requests, optimistic versions, persistent intake/login rate limits, idempotent operations, composite tenant/actor foreign keys, and append-only request events. The migration runner serializes deploys, records SHA-256 checksums, refuses modified history, and is safe to repeat.
- Public submissions use strict bounded schemas, an abuse honeypot, explicit privacy consent, keyed IP/idempotency hashes, parameterized SQL, server-selected tenant routing, and stable replay/conflict semantics. Only a non-sensitive request reference is returned.
- Reviewers use scrypt password hashes and short signed HttpOnly/SameSite sessions. The server reloads active state, role, tenant, and `auth_version` on every request; allowed origins and a session-bound CSRF token protect mutations. No default account or credential is checked in.
- The explicit `NEW -> QUALIFIED -> CONTACTED -> CLOSED` lifecycle rejects invalid jumps and stale expected versions. Rejection and re-qualification paths are explicit. ADMIN/REP may transition; AUDITOR is read-only. All data queries are tenant-scoped, and cross-tenant identifiers resolve as not found.
- Creation and status changes append per-organization SHA-256-linked events with database update/delete guards. `db:verify` checks migration state, constraints/triggers, and every audit chain. Logs contain request metadata but omit form bodies, PII, cookies, raw IPs, idempotency keys, and secrets.
- A non-root multi-stage image, health checks, Compose topology, strict environment template, safe bootstrap command, CI workflow, operational/security runbooks, and real `pg_dump`/`pg_restore` verification are checked in. Production mode requires secure cookies; managed TLS, database encryption, and proxy trust remain deployment configuration.

Verification completed on 2026-07-20:

- A clean `npm ci` completed; ESLint and TypeScript project type-check passed; 9/9 unit tests passed; the Vite 8 production build completed.
- On a fresh disposable PostgreSQL database, migration deploy and repeat deploy passed. Six HTTP/database integration tests covered validation, idempotent replay/conflict, CORS, authentication, CSRF, role/tenant isolation, optimistic conflicts, audit verification, and live session revocation.
- A Chromium end-to-end test passed the real visitor form -> durable reference -> reviewer login -> tenant queue -> `QUALIFIED` transition journey.
- Production and full npm dependency audits both reported zero known vulnerabilities. Current-tree and full seven-commit-history Gitleaks scans reported no leaks. `git diff --check`, shell syntax, Compose rendering, live/ready/static HTTP, unauthenticated 401, rejected-origin 403, login 200, and public-intake 201 checks passed.
- A custom-format database backup restored into an empty disposable database; migration/control/audit verification passed and restored counts were 2 organizations, 2 requests, and 3 audit events at that checkpoint.

Independent verification additionally made CI secrets ephemeral, raised both dependency graphs to the low-severity audit threshold, made production fail closed on HTTP origins, non-verifying or loopback PostgreSQL, and migration-on-start, and corrected the exact development/E2E origin allowlist so same-origin application assets are not rejected. The final fresh PostgreSQL rerun passed all 9 unit tests, all 6 HTTP/database integration tests, database control/audit verification, and the complete Chromium journey. The local Docker/Colima daemon is stopped, so the image could not be built on this host; CI retains the image-build gate. Before a real launch, the owner must approve legal/marketing content and retention/deletion rules; configure managed TLS, encryption, network isolation, monitoring, and alert ownership; add MFA or enterprise identity; decide whether audit export needs independently controlled immutable storage; and complete accessibility, load, penetration, disaster-recovery, and incident-response exercises. No wider AI product capability or compliance certification is claimed by this implementation.

## Runtime and login acceptance — 2026-07-20

- **Status:** VERIFIED
- **Startup safety:** the new root `start.sh` was inspected; it starts only the already-installed application, performs no installation, migration, seeding, process killing, or database creation, and fails closed when dependencies, the built frontend, database URL, or secrets are absent.
- **Startup:** `./start.sh` launched the built Express/Vite application on isolated port `5808` against disposable PostgreSQL on isolated port `55494` without a startup error.
- **Readiness:** `/api/health/ready` returned `200` after the explicit pre-start migration and administrator bootstrap completed.
- **Login:** the project-owned runtime administrator authenticated through `/api/auth/login` with `200`; `/api/auth/me` returned `200` with the issued session; an invalid password returned `401`.
- **Primary journey:** the previously recorded real Chromium end-to-end run completed visitor intake, durable reference creation, reviewer login, tenant queue access, and the `QUALIFIED` transition against this implemented application.
- **Browser/server evidence:** the recorded Chromium journey supplies browser evidence; the fresh server log contained no error, exception, unhandled rejection, or fatal event. A new in-app-browser pass could not be added because no browser backend was currently available.
- **Cleanup:** the application process, disposable PostgreSQL listener, and temporary runtime directory were stopped and removed.
- **Residual issue:** none for local runtime/login acceptance; deployment-owner launch gates listed above remain outside this local proof.
