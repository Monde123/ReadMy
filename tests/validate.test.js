import assert from "node:assert/strict";
import test from "node:test";
import { validateRepo } from "../tools/validate.js";

test("active repository passes full validation", () => {
  const errors = validateRepo();
  assert.deepEqual(errors, []);
});
