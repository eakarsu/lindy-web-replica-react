import { createHmac, randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);
const passwordParameters = { cost: 32768, blockSize: 8, parallelization: 1, maxmem: 64 * 1024 * 1024 };
const issuer = "lindy-demo-request-workflow";
const audience = "lindy-sales-console";

function base64urlJson(value) {
  return Buffer.from(JSON.stringify(value)).toString("base64url");
}

function hmac(value, secret) {
  return createHmac("sha256", secret).update(value).digest();
}

export function opaqueHash(value, secret) {
  return createHmac("sha256", secret).update(value).digest("hex");
}

export async function hashPassword(password) {
  if (typeof password !== "string" || password.length < 16 || password.length > 256) {
    throw new Error("Password must contain between 16 and 256 characters");
  }
  const salt = randomBytes(16);
  const derived = await scrypt(password, salt, 64, passwordParameters);
  return `scrypt$${passwordParameters.cost}$${passwordParameters.blockSize}$${passwordParameters.parallelization}$${salt.toString("base64url")}$${derived.toString("base64url")}`;
}

export async function verifyPassword(password, encodedHash) {
  try {
    const [algorithm, cost, blockSize, parallelization, saltValue, hashValue] = encodedHash.split("$");
    if (algorithm !== "scrypt" || !hashValue) return false;
    const expected = Buffer.from(hashValue, "base64url");
    const actual = await scrypt(password, Buffer.from(saltValue, "base64url"), expected.length, {
      cost: Number(cost),
      blockSize: Number(blockSize),
      parallelization: Number(parallelization),
      maxmem: 64 * 1024 * 1024,
    });
    return actual.length === expected.length && timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}

export function signSession({ userId, organizationId, role, authVersion, csrfToken }, secret, ttlSeconds, now = Date.now()) {
  const issuedAt = Math.floor(now / 1000);
  const header = base64urlJson({ alg: "HS256", typ: "JWT" });
  const payload = base64urlJson({
    iss: issuer,
    aud: audience,
    sub: userId,
    org: organizationId,
    role,
    ver: authVersion,
    csrf: csrfToken,
    iat: issuedAt,
    nbf: issuedAt - 5,
    exp: issuedAt + ttlSeconds,
  });
  const unsigned = `${header}.${payload}`;
  return `${unsigned}.${hmac(unsigned, secret).toString("base64url")}`;
}

export function verifySession(token, secret, now = Date.now()) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const [headerValue, payloadValue, signatureValue] = parts;
    const header = JSON.parse(Buffer.from(headerValue, "base64url").toString("utf8"));
    if (header.alg !== "HS256" || header.typ !== "JWT") return null;

    const expected = hmac(`${headerValue}.${payloadValue}`, secret);
    const actual = Buffer.from(signatureValue, "base64url");
    if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return null;

    const payload = JSON.parse(Buffer.from(payloadValue, "base64url").toString("utf8"));
    const seconds = Math.floor(now / 1000);
    if (
      payload.iss !== issuer ||
      payload.aud !== audience ||
      typeof payload.sub !== "string" ||
      typeof payload.org !== "string" ||
      !["ADMIN", "REP", "AUDITOR"].includes(payload.role) ||
      !Number.isInteger(payload.ver) ||
      typeof payload.csrf !== "string" ||
      payload.csrf.length < 32 ||
      !Number.isInteger(payload.exp) ||
      !Number.isInteger(payload.nbf) ||
      payload.exp <= seconds ||
      payload.nbf > seconds
    ) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export function randomToken(bytes = 32) {
  return randomBytes(bytes).toString("base64url");
}

export function parseCookies(header = "") {
  return Object.fromEntries(
    header
      .split(";")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const separator = part.indexOf("=");
        if (separator < 1) return [part, ""];
        return [decodeURIComponent(part.slice(0, separator)), decodeURIComponent(part.slice(separator + 1))];
      }),
  );
}

export function sessionCookie(token, config) {
  const attributes = [
    `lindy_session=${encodeURIComponent(token)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Strict",
    `Max-Age=${config.sessionTtlSeconds}`,
  ];
  if (config.cookieSecure) attributes.push("Secure");
  return attributes.join("; ");
}

export function expiredSessionCookie(config) {
  return `lindy_session=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${config.cookieSecure ? "; Secure" : ""}`;
}
