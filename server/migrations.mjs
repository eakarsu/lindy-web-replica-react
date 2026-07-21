import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const migrationsDirectory = path.join(rootDirectory, "migrations");

async function migrationFiles() {
  const files = (await readdir(migrationsDirectory))
    .filter((file) => /^\d{3}_[a-z0-9_]+\.sql$/.test(file))
    .sort();

  if (files.length === 0) {
    throw new Error("No database migrations were found");
  }

  return Promise.all(
    files.map(async (file) => {
      const sql = await readFile(path.join(migrationsDirectory, file), "utf8");
      return {
        id: file,
        sql,
        checksum: createHash("sha256").update(sql).digest("hex"),
      };
    }),
  );
}

async function ensureMigrationTable(client) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id text PRIMARY KEY,
      checksum text NOT NULL CHECK (char_length(checksum) = 64),
      applied_at timestamptz NOT NULL DEFAULT now()
    )
  `);
}

export async function migrate(pool) {
  const migrations = await migrationFiles();
  const client = await pool.connect();

  try {
    await client.query("SELECT pg_advisory_lock(hashtext('lindy_schema_migrations'))");
    await ensureMigrationTable(client);
    const applied = await client.query("SELECT id, checksum FROM schema_migrations ORDER BY id");
    const appliedById = new Map(applied.rows.map((row) => [row.id, row.checksum]));

    for (const migration of migrations) {
      const existingChecksum = appliedById.get(migration.id);
      if (existingChecksum && existingChecksum !== migration.checksum) {
        throw new Error(`Migration checksum mismatch for ${migration.id}`);
      }
      if (existingChecksum) continue;

      await client.query("BEGIN");
      try {
        await client.query(migration.sql);
        await client.query(
          "INSERT INTO schema_migrations (id, checksum) VALUES ($1, $2)",
          [migration.id, migration.checksum],
        );
        await client.query("COMMIT");
      } catch (error) {
        await client.query("ROLLBACK");
        throw error;
      }
    }
  } finally {
    await client.query("SELECT pg_advisory_unlock(hashtext('lindy_schema_migrations'))").catch(() => {});
    client.release();
  }
}

export async function verifyMigrations(pool) {
  const migrations = await migrationFiles();
  const expected = new Map(migrations.map((migration) => [migration.id, migration.checksum]));

  const exists = await pool.query("SELECT to_regclass('public.schema_migrations') AS table_name");
  if (!exists.rows[0].table_name) {
    return { ok: false, reason: "schema_migrations is missing" };
  }

  const applied = await pool.query("SELECT id, checksum FROM schema_migrations ORDER BY id");
  if (applied.rowCount !== expected.size) {
    return { ok: false, reason: `expected ${expected.size} migrations; found ${applied.rowCount}` };
  }

  for (const row of applied.rows) {
    if (expected.get(row.id) !== row.checksum) {
      return { ok: false, reason: `unexpected or modified migration ${row.id}` };
    }
  }

  return { ok: true, count: expected.size };
}
