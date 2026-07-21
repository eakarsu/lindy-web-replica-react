import { verifyAuditChain } from "../server/audit.mjs";
import { loadConfig } from "../server/config.mjs";
import { createPool } from "../server/db.mjs";
import { verifyMigrations } from "../server/migrations.mjs";

const config = loadConfig();
const pool = createPool(config);

try {
  const migrations = await verifyMigrations(pool);
  if (!migrations.ok) throw new Error(migrations.reason);

  const controls = await pool.query(`
    SELECT
      to_regclass('public.organizations') IS NOT NULL AS organizations,
      to_regclass('public.users') IS NOT NULL AS users,
      to_regclass('public.demo_requests') IS NOT NULL AS demo_requests,
      to_regclass('public.request_events') IS NOT NULL AS request_events,
      EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'request_events_no_update' AND NOT tgisinternal) AS no_event_update,
      EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'request_events_no_delete' AND NOT tgisinternal) AS no_event_delete,
      EXISTS (SELECT 1 FROM pg_constraint WHERE conrelid = 'demo_requests'::regclass AND contype = 'f') AS request_foreign_keys,
      EXISTS (SELECT 1 FROM pg_constraint WHERE conrelid = 'request_events'::regclass AND contype = 'f') AS event_foreign_keys
  `);
  const failedControl = Object.entries(controls.rows[0]).find(([, value]) => value !== true);
  if (failedControl) throw new Error(`Database control is missing: ${failedControl[0]}`);

  const organizations = await pool.query("SELECT id, slug FROM organizations ORDER BY slug");
  for (const organization of organizations.rows) {
    const audit = await verifyAuditChain(pool, organization.id);
    if (!audit.ok) throw new Error(`Audit chain failed for ${organization.slug} at ${audit.failedEventId}`);
  }

  console.info(
    JSON.stringify({
      migrations: migrations.count,
      controls: Object.keys(controls.rows[0]).length,
      organizations: organizations.rowCount,
      auditChains: "valid",
    }),
  );
} finally {
  await pool.end();
}
