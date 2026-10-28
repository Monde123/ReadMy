import assert from "node:assert/strict";
import test from "node:test";
import { parseYaml } from "../lib/yaml.js";
import { ReadMyError } from "../lib/errors.js";

function codeOf(action) {
  try {
    action();
  } catch (error) {
    assert.ok(error instanceof ReadMyError);
    return error.code;
  }
  assert.fail("no error thrown");
}

test("handwritten document", () => {
  const parsed = parseYaml(`
id: minimal
version: 2.0.0
count: 2
ready: false
note: "Colon: ok"
site: https://example.com/a#b
audiences:
  - beginner
  - professional
stack:
  - name: Languages
    items:
      - Go
      - Rust
`);
  assert.deepEqual(parsed, {
    id: "minimal",
    version: "2.0.0",
    count: 2,
    ready: false,
    note: "Colon: ok",
    site: "https://example.com/a#b",
    audiences: ["beginner", "professional"],
    stack: [{ name: "Languages", items: ["Go", "Rust"] }],
  });
});

test("comments do not change the parsed object", () => {
  const left = parseYaml("name: Inès\nrole: Engineer\n");
  const right = parseYaml("# header\nname: Inès # fictitious person\n\nrole: Engineer\n");
  assert.deepEqual(left, right);
});

test("quotes and apostrophes", () => {
  const parsed = parseYaml(`title: "a \\"b\\" c"\nmotto: 'the ''workshop'''\n`);
  assert.deepEqual(parsed, { title: 'a "b" c', motto: "the 'workshop'" });
});

test("empty document", () => {
  assert.equal(codeOf(() => parseYaml("")), "YAML_EMPTY");
  assert.equal(codeOf(() => parseYaml("   \n# nothing\n")), "YAML_EMPTY");
});

test("single key", () => {
  assert.deepEqual(parseYaml("name: A\n"), { name: "A" });
});

test("tab, duplicate key, unsupported syntax, leading zero, huge integer, unclosed quote", () => {
  assert.equal(codeOf(() => parseYaml("name:\tA\n")), "YAML_TAB");
  assert.equal(codeOf(() => parseYaml("name: A\nname: B\n")), "YAML_DUPLICATE_KEY");
  assert.equal(codeOf(() => parseYaml("items: [Go, Rust]\n")), "YAML_UNSUPPORTED_SYNTAX");
  assert.equal(codeOf(() => parseYaml("count: 08\n")), "YAML_INVALID_NUMBER");
  assert.equal(codeOf(() => parseYaml("count: 1234567890\n")), "YAML_NUMBER_TOO_LARGE");
  assert.equal(codeOf(() => parseYaml('title: "unclosed\n')), "YAML_STRUCTURE");
});
