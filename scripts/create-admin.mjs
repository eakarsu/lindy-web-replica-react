import { randomUUID } from "node:crypto";
import { z } from "zod";
import { loadDatabaseConfig } from "../server/config.mjs";
import { createPool, withTransaction } from "../server/db.mjs";
import { hashPassword } from "../server/security.mjs";
import { verifyMigrations } from "../server/migrations.mjs";

const inputSchema = z.object({
  BOOTSTRAP_ACKNOWLEDGEMENT: z.literal("create-initial-admin"),
  ADMIN_EMAIL: z.string().trim().email().max(254).transform((value) => value.toLowerCase()),
  ADMIN_PASSWORD: z.string().min(12).max(256),
  ADMIN_ORGANIZATION_NAME: z.string().trim().min(2).max(160),
  ADMIN_ROLE: z.enum(["ADMIN", "REP", "AUDITOR"]).default("ADMIN"),
  PUBLIC_ORGANIZATION_SLUG: z
    .string()
    .regex(/^[a-z0-9][a-z0-9-]{1,62}$/)
    .default("demo-sales"),
});

const input = inputSchema.safeParse({
  BOOTSTRAP_ACKNOWLEDGEMENT: process.env.BOOTSTRAP_ACKNOWLEDGEMENT,
  ADMIN_EMAIL: process.env.PROVISION_ADMIN_EMAIL || process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.PROVISION_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD,
  ADMIN_ORGANIZATION_NAME:
    process.env.BOOTSTRAP_TENANT_NAME
    || process.env.PROVISION_COMPANY_NAME
    || process.env.ADMIN_ORGANIZATION_NAME,
  ADMIN_ROLE: process.env.ADMIN_ROLE,
  PUBLIC_ORGANIZATION_SLUG: process.env.PUBLIC_ORGANIZATION_SLUG,
});
if (!input.success) {
  throw new Error(
    `Invalid bootstrap configuration: ${input.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("; ")}`,
  );
}

const config = loadDatabaseConfig();
const pool = createPool(config);

try {
  const migrationState = await verifyMigrations(pool);
  if (!migrationState.ok) throw new Error(`Run migrations first: ${migrationState.reason}`);
  const passwordHash = await hashPassword(input.data.ADMIN_PASSWORD);

  const created = await withTransaction(pool, async (client) => {
    const organization = await client.query(
      `INSERT INTO organizations (id, slug, name)
       VALUES ($1, $2, $3)
       ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
       RETURNING id, slug`,
      [randomUUID(), input.data.PUBLIC_ORGANIZATION_SLUG, input.data.ADMIN_ORGANIZATION_NAME],
    );
    const user = await client.query(
      `INSERT INTO users (id, organization_id, email, password_hash, role)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (organization_id, email) DO UPDATE SET
         password_hash = EXCLUDED.password_hash,
         role = EXCLUDED.role,
         active = true,
         auth_version = users.auth_version + 1
       RETURNING id, email, role`,
      [randomUUID(), organization.rows[0].id, input.data.ADMIN_EMAIL, passwordHash, input.data.ADMIN_ROLE],
    );
    return { organization: organization.rows[0], user: user.rows[0] };
  });

  console.info(`Provisioned ${created.user.role} ${created.user.email} in organization ${created.organization.slug}`);
} finally {
  await pool.end();
}
