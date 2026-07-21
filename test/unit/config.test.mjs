import assert from "node:assert/strict";
import test from "node:test";
import { loadConfig } from "../../server/config.mjs";

function validEnvironment(overrides = {}) {
  return {
    NODE_ENV: "test",
    DATABASE_URL: "postgresql://localhost/lindy_test",
    AUTH_SECRET: "auth-secret-longer-than-thirty-two-characters",
    PRIVACY_HASH_SECRET: "privacy-secret-longer-than-thirty-two-characters",
    ...overrides,
  };
}

test("configuration rejects short secrets and malformed origins", () => {
  assert.throws(() => loadConfig(validEnvironment({ AUTH_SECRET: "short" })), /AUTH_SECRET/);
  assert.throws(() => loadConfig(validEnvironment({ ALLOWED_ORIGINS: "https://example.test/path" })), /invalid origin/);
});

test("production requires secure cookies", () => {
  assert.throws(
    () => loadConfig(validEnvironment({
      NODE_ENV: "production",
      COOKIE_SECURE: "false",
      DATABASE_SSL_MODE: "require",
      DATABASE_URL: "postgresql://app@db.example.test/lindy",
      ALLOWED_ORIGINS: "https://lindy.example.test",
    })),
    /COOKIE_SECURE/,
  );
});

test("production requires verified database TLS, external PostgreSQL, exact HTTPS origins, and release-job migrations", () => {
  const production = validEnvironment({
    NODE_ENV: "production",
    COOKIE_SECURE: "true",
    DATABASE_SSL_MODE: "require",
    DATABASE_URL: "postgresql://app@db.example.test/lindy",
    ALLOWED_ORIGINS: "https://lindy.example.test",
  });
  assert.equal(loadConfig(production).databaseSslMode, "require");
  assert.throws(() => loadConfig({ ...production, DATABASE_SSL_MODE: "disable" }), /mandatory/);
  assert.throws(() => loadConfig({ ...production, DATABASE_URL: "postgresql:\/\/app@127.0.0.1\/lindy" }), /loopback/);
  assert.throws(() => loadConfig({ ...production, ALLOWED_ORIGINS: "http://lindy.example.test" }), /invalid origin/);
  assert.throws(() => loadConfig({ ...production, MIGRATE_ON_START: "true" }), /release job/);
});
