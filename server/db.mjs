import pg from "pg";

const { Pool } = pg;

export function createPool(config) {
  return new Pool({
    connectionString: config.databaseUrl,
    ssl: config.databaseSslMode === "require"
      ? { rejectUnauthorized: true, ...(config.databaseSslCa ? { ca: config.databaseSslCa } : {}) }
      : false,
    max: config.nodeEnv === "test" ? 5 : 15,
    connectionTimeoutMillis: 5_000,
    idleTimeoutMillis: 30_000,
    statement_timeout: 10_000,
    application_name: "lindy-demo-request-workflow",
  });
}

export async function withTransaction(pool, operation) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await operation(client);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
