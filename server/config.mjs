import net from "node:net";
import { z } from "zod";

const booleanString = z
  .enum(["true", "false"])
  .transform((value) => value === "true");

const environmentSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().min(1).max(65535).default(3001),
  DATABASE_URL: z.string().min(1),
  DATABASE_SSL_MODE: z.enum(["disable", "require"]).default("disable"),
  DATABASE_SSL_CA: z.string().optional(),
  MIGRATE_ON_START: booleanString.default("false"),
  PUBLIC_ORGANIZATION_SLUG: z
    .string()
    .regex(/^[a-z0-9][a-z0-9-]{1,62}$/)
    .default("demo-sales"),
  ALLOWED_ORIGINS: z.string().default("http://localhost:8080,http://localhost:3001,http://127.0.0.1:3001"),
  TRUST_PROXY_HOPS: z.coerce.number().int().min(0).max(5).default(0),
  AUTH_SECRET: z.string().min(32),
  PRIVACY_HASH_SECRET: z.string().min(32),
  SESSION_TTL_SECONDS: z.coerce.number().int().min(300).max(3600).default(900),
  COOKIE_SECURE: booleanString.default("false"),
  INTAKE_RATE_LIMIT: z.coerce.number().int().min(1).max(1000).default(20),
  INTAKE_RATE_WINDOW_SECONDS: z.coerce.number().int().min(60).max(86400).default(900),
  LOGIN_RATE_LIMIT: z.coerce.number().int().min(1).max(100).default(10),
});

const databaseEnvironmentSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string().min(1),
  DATABASE_SSL_MODE: z.enum(["disable", "require"]).default("disable"),
  DATABASE_SSL_CA: z.string().optional(),
});

export function loadDatabaseConfig(environment = process.env) {
  const parsed = databaseEnvironmentSchema.safeParse(environment);
  if (!parsed.success) {
    const details = parsed.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ");
    throw new Error(`Invalid database configuration: ${details}`);
  }

  const config = parsed.data;
  if (config.NODE_ENV === "production" && config.DATABASE_SSL_MODE !== "require") {
    throw new Error("DATABASE_SSL_MODE=require is mandatory in production");
  }
  let databaseUrl;
  try {
    databaseUrl = new URL(config.DATABASE_URL);
  } catch {
    throw new Error("DATABASE_URL must be a valid PostgreSQL URL");
  }
  if (!["postgres:", "postgresql:"].includes(databaseUrl.protocol)) {
    throw new Error("DATABASE_URL must use PostgreSQL");
  }
  const databaseHost = databaseUrl.hostname.toLowerCase().replace(/^\[(.*)\]$/, "$1");
  const loopback = databaseHost === "localhost"
    || (net.isIP(databaseHost) === 4 && databaseHost.startsWith("127."))
    || databaseHost === "::1";
  if (config.NODE_ENV === "production" && loopback) {
    throw new Error("Production DATABASE_URL cannot target a loopback host");
  }

  return {
    nodeEnv: config.NODE_ENV,
    databaseUrl: config.DATABASE_URL,
    databaseSslMode: config.DATABASE_SSL_MODE,
    databaseSslCa: config.DATABASE_SSL_CA?.replace(/\\n/g, "\n"),
  };
}

export function loadConfig(environment = process.env) {
  const parsed = environmentSchema.safeParse(environment);
  if (!parsed.success) {
    const details = parsed.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ");
    throw new Error(`Invalid runtime configuration: ${details}`);
  }

  const config = parsed.data;
  const allowedOrigins = config.ALLOWED_ORIGINS.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (allowedOrigins.length === 0) throw new Error("ALLOWED_ORIGINS must contain at least one exact origin");
  for (const origin of allowedOrigins) {
    let parsedOrigin;
    try {
      parsedOrigin = new URL(origin);
    } catch {
      throw new Error(`ALLOWED_ORIGINS contains an invalid origin: ${origin}`);
    }
    if (
      parsedOrigin.origin !== origin ||
      !["http:", "https:"].includes(parsedOrigin.protocol) ||
      (config.NODE_ENV === "production" && parsedOrigin.protocol !== "https:")
    ) {
      throw new Error(`ALLOWED_ORIGINS contains an invalid origin: ${origin}`);
    }
  }

  if (config.NODE_ENV === "production" && !config.COOKIE_SECURE) {
    throw new Error("COOKIE_SECURE must be true in production");
  }
  if (config.NODE_ENV === "production" && config.DATABASE_SSL_MODE !== "require") {
    throw new Error("DATABASE_SSL_MODE=require is mandatory in production");
  }
  if (config.NODE_ENV === "production" && config.MIGRATE_ON_START) {
    throw new Error("MIGRATE_ON_START must be false in production; run migrations as a release job");
  }
  let databaseUrl;
  try {
    databaseUrl = new URL(config.DATABASE_URL);
  } catch {
    throw new Error("DATABASE_URL must be a valid PostgreSQL URL");
  }
  if (!["postgres:", "postgresql:"].includes(databaseUrl.protocol)) {
    throw new Error("DATABASE_URL must use PostgreSQL");
  }
  const databaseHost = databaseUrl.hostname.toLowerCase().replace(/^\[(.*)\]$/, "$1");
  const loopback = databaseHost === "localhost"
    || (net.isIP(databaseHost) === 4 && databaseHost.startsWith("127."))
    || databaseHost === "::1";
  if (config.NODE_ENV === "production" && loopback) {
    throw new Error("Production DATABASE_URL cannot target a loopback host");
  }

  return {
    nodeEnv: config.NODE_ENV,
    port: config.PORT,
    databaseUrl: config.DATABASE_URL,
    databaseSslMode: config.DATABASE_SSL_MODE,
    databaseSslCa: config.DATABASE_SSL_CA?.replace(/\\n/g, "\n"),
    migrateOnStart: config.MIGRATE_ON_START,
    publicOrganizationSlug: config.PUBLIC_ORGANIZATION_SLUG,
    allowedOrigins,
    trustProxyHops: config.TRUST_PROXY_HOPS,
    authSecret: config.AUTH_SECRET,
    privacyHashSecret: config.PRIVACY_HASH_SECRET,
    sessionTtlSeconds: config.SESSION_TTL_SECONDS,
    cookieSecure: config.COOKIE_SECURE,
    intakeRateLimit: config.INTAKE_RATE_LIMIT,
    intakeRateWindowSeconds: config.INTAKE_RATE_WINDOW_SECONDS,
    loginRateLimit: config.LOGIN_RATE_LIMIT,
  };
}
