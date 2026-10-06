import assert from "node:assert/strict";
import test from "node:test";
import { validateRepo } from "../tools/validate.js";

test("le dépôt actif passe la validation complète", () => {
  const errors = validateRepo();
  assert.deepEqual(errors, []);
});
