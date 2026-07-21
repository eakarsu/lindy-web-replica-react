import assert from "node:assert/strict";
import test from "node:test";
import { canonicalJson, eventHash } from "../../server/audit.mjs";
import { canTransition, intakeSchema, transitionSchema } from "../../server/workflow.mjs";

test("intake validation normalizes email and rejects missing privacy consent", () => {
  const valid = intakeSchema.safeParse({
    name: " Ada Lovelace ",
    email: "ADA@EXAMPLE.TEST",
    company: "",
    message: "We need to evaluate the governed workflow.",
    privacyConsent: true,
    website: "",
  });
  assert.equal(valid.success, true);
  assert.equal(valid.data.email, "ada@example.test");
  assert.equal(valid.data.company, null);

  assert.equal(
    intakeSchema.safeParse({
      name: "Ada Lovelace",
      email: "ada@example.test",
      message: "We need to evaluate the governed workflow.",
      privacyConsent: false,
    }).success,
    false,
  );
});

test("transition validation and state machine reject unsafe jumps", () => {
  assert.equal(transitionSchema.safeParse({ status: "QUALIFIED", expectedVersion: 1 }).success, true);
  assert.equal(transitionSchema.safeParse({ status: "NEW", expectedVersion: 1 }).success, false);
  assert.equal(canTransition("NEW", "QUALIFIED"), true);
  assert.equal(canTransition("NEW", "CLOSED"), false);
  assert.equal(canTransition("CLOSED", "QUALIFIED"), false);
});

test("canonical audit serialization is key-order independent", () => {
  assert.equal(canonicalJson({ b: 2, a: { d: 4, c: 3 } }), canonicalJson({ a: { c: 3, d: 4 }, b: 2 }));
  assert.equal(eventHash({ b: 2, a: 1 }), eventHash({ a: 1, b: 2 }));
  assert.notEqual(eventHash({ a: 1 }), eventHash({ a: 2 }));
});
