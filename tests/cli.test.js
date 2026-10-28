import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { spawnSync } from "node:child_process";
import { repoRoot } from "../lib/catalog.js";

const root = repoRoot();
const cli = path.join(root, "cli", "readmy.js");

function run(args) {
  return spawnSync(process.execPath, [cli, ...args], { encoding: "utf8", cwd: root });
}

test("list and render write a README and two SVGs", () => {
  const listed = run(["list"]);
  assert.equal(listed.status, 0, listed.stderr);
  assert.ok(listed.stdout.includes("minimal"));
  const out = fs.mkdtempSync(path.join(os.tmpdir(), "readmy-"));
  const rendered = run(["render", "--template", "minimal", "--out", out]);
  assert.equal(rendered.status, 0, rendered.stderr);
  assert.equal(fs.existsSync(path.join(out, "README.md")), true);
  assert.equal(fs.existsSync(path.join(out, "assets", "banner-dark.svg")), true);
});

test("unknown command and missing template fail clearly", () => {
  const unknown = run(["dance"]);
  assert.equal(unknown.status, 1);
  assert.ok(unknown.stderr.includes("UNKNOWN_COMMAND"));
  const missing = run(["render", "--template", "absent", "--out", os.tmpdir()]);
  assert.equal(missing.status, 1);
  assert.ok(missing.stderr.includes("UNKNOWN_TEMPLATE"));
});

test("empty yaml profile rejected by render command", () => {
  const file = path.join(os.tmpdir(), "readmy-empty.yml");
  fs.writeFileSync(file, "");
  const result = run(["render", "--template", "minimal", "--profile", file, "--out", os.tmpdir()]);
  assert.equal(result.status, 1);
  assert.ok(result.stderr.includes("YAML_EMPTY"));
});
