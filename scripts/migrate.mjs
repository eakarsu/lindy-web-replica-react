import { loadDatabaseConfig } from "../server/config.mjs";
import { createPool } from "../server/db.mjs";
import { migrate, verifyMigrations } from "../server/migrations.mjs";

const config = loadDatabaseConfig();
const pool = createPool(config);

try {
  await migrate(pool);
  const state = await verifyMigrations(pool);
  if (!state.ok) throw new Error(state.reason);
  console.info(`Database migrations verified (${state.count})`);
} finally {
  await pool.end();
}
