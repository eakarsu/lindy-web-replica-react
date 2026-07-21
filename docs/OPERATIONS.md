# Operations runbook

## Supported production boundary

The executable product boundary is website demo-request intake plus tenant-scoped sales review. Static pages describing an AI automation product are presentation content and are not evidence that those capabilities exist.

The supported state machine is `NEW -> QUALIFIED -> CONTACTED -> CLOSED`, with rejection available from `NEW` or `QUALIFIED` and re-qualification available from `CONTACTED`. Public submissions and reviewer transitions require idempotency keys. Reviewer updates require an expected version, so concurrent changes fail instead of silently overwriting one another.

## Initial deployment

1. Provision PostgreSQL and a TLS-terminating reverse proxy. Give the application a database role scoped only to this database.
2. Copy `.env.example` into the deployment secret manager. Generate unrelated `AUTH_SECRET` and `PRIVACY_HASH_SECRET` values of at least 32 random characters. Set `COOKIE_SECURE=true`, the exact HTTPS origin, `TRUST_PROXY_HOPS` to the known proxy count, and `DATABASE_SSL_MODE=require`; production refuses to start without certificate verification or when the database is loopback. Set `DATABASE_SSL_CA` when the provider CA is not rooted in the system trust store.
3. Run `npm ci`, `npm run build`, and `npm run db:migrate` as a release job. Running the migration a second time must be a no-op.
4. Set the temporary `ADMIN_*` values and run `npm run admin:create` once. Remove the bootstrap password from the job environment immediately afterward.
5. Start `npm start`. Route liveness to `/api/health/live` and readiness to `/api/health/ready`.

The container runs as a non-root user and refuses to start with missing or modified migrations. Production mode refuses insecure session cookies, HTTP origins, loopback or non-TLS databases, and migration-on-start. Do not expose PostgreSQL publicly.

## Monitoring and response

Application logs are structured JSON and include request ID, method, path, status, latency, and authenticated user ID. They intentionally omit request bodies, email addresses, messages, cookies, idempotency keys, raw IP addresses, and secret values. Alert on readiness failures, sustained 5xx rates, origin/CSRF rejections, and rate-limit spikes. Forward logs to access-controlled storage with a retention policy approved by the owner.

To revoke one user's sessions immediately, deactivate the user or increment `users.auth_version`. To rotate `AUTH_SECRET`, replace it and restart all instances; all current sessions will be invalidated. Rotate `PRIVACY_HASH_SECRET` only under a planned migration because it changes idempotency and abuse-control hashes.

## Backup and recovery

Run `scripts/backup.sh` from a protected host with `DATABASE_URL` set. It creates a mode-0600 custom-format dump and validates its catalog. Store dumps encrypted outside the primary failure domain.

At least quarterly, create an empty disposable database and run:

```sh
RESTORE_DATABASE_URL=postgresql://... scripts/restore-verify.sh backups/example.dump
```

The restore check verifies migration checksums, required constraints/triggers, and every organization's audit hash chain. The operator must define and test recovery-point and recovery-time objectives before launch.

## Deployment gates not supplied by source code

The owner must approve the privacy/retention policy and all marketing claims; configure managed TLS and encryption at rest; add MFA or enterprise identity for reviewers; run accessibility, penetration, load, and disaster-recovery exercises; establish alert ownership and incident response; and decide whether audit exports require immutable external storage. These are launch gates, not claims made by this repository.
