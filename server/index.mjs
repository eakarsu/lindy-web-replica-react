import { createApp } from "./app.mjs";
import { loadConfig } from "./config.mjs";
import { createPool } from "./db.mjs";
import { migrate, verifyMigrations } from "./migrations.mjs";

const config = loadConfig();
const pool = createPool(config);

if (config.migrateOnStart) await migrate(pool);
const migrationState = await verifyMigrations(pool);
if (!migrationState.ok) {
  throw new Error(`Database is not ready: ${migrationState.reason}`);
}

const app = createApp({ pool, config });
const server = app.listen(config.port, () => {
  console.info(JSON.stringify({ level: "info", event: "server_started", port: config.port }));
});

let shuttingDown = false;
async function shutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;
  console.info(JSON.stringify({ level: "info", event: "server_stopping", signal }));
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
