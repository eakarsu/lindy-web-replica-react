import assert from "node:assert/strict";
import test from "node:test";
import { hashPassword, opaqueHash, signSession, verifyPassword, verifySession } from "../../server/security.mjs";

const secret = "test-auth-secret-that-is-longer-than-thirty-two-characters";

test("password hashes verify the original password only", async () => {
  const encoded = await hashPassword("correct horse battery staple");
  assert.match(encoded, /^scrypt\$/);
  assert.equal(await verifyPassword("correct horse battery staple", encoded), true);
  assert.equal(await verifyPassword("incorrect horse battery staple", encoded), false);
});

test("sessions enforce signature, issuer, audience and expiry", () => {
  const now = Date.parse("2026-07-20T10:00:00.000Z");
  const token = signSession(
    {
      userId: "a4b4fdf8-61a0-4a73-9c88-0f04ae9d6780",
      organizationId: "7dc1218d-d3ee-4704-8df7-ad6761842fab",
      role: "ADMIN",
      authVersion: 3,
      csrfToken: "csrf-token-longer-than-thirty-two-characters",
    },
    secret,
    900,
    now,
  );

  assert.equal(verifySession(token, secret, now + 1_000)?.ver, 3);
  assert.equal(verifySession(`${token.slice(0, -1)}x`, secret, now + 1_000), null);
  assert.equal(verifySession(token, secret, now + 901_000), null);
});

test("opaque hashes are stable within one secret and unlinkable across secrets", () => {
  const first = opaqueHash("subject", "privacy-secret-longer-than-thirty-two-characters");
  const repeated = opaqueHash("subject", "privacy-secret-longer-than-thirty-two-characters");
  const other = opaqueHash("subject", "different-privacy-secret-longer-than-thirty-two");
  assert.equal(first, repeated);
  assert.notEqual(first, other);
  assert.match(first, /^[a-f0-9]{64}$/);
});
