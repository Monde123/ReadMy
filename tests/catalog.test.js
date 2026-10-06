import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { spawnSync } from "node:child_process";
import { loadTemplate, repoRoot, templateIds } from "../lib/catalog.js";
import { renderTemplate } from "../lib/render.js";
import { registry, tokens } from "./helpers.js";
import { assertWellFormedXml } from "../lib/xml.js";

const root = repoRoot();

test("dix gabarits, rendu identique aux fichiers, svg accepté par ElementTree", () => {
  const ids = templateIds(root);
  assert.deepEqual(ids, [
    "academic",
    "creator",
    "engineer",
    "founder",
    "journey",
    "maintainer",
    "minimal",
    "security",
    "student",
    "terminal",
  ]);
  for (const id of ids) {
    const { dir, template, profile } = loadTemplate(root, id);
    const rendered = renderTemplate(template, profile, tokens, registry);
    assert.equal(fs.readFileSync(path.join(dir, "README.md"), "utf8"), rendered.markdown);
    assert.ok(rendered.markdown.includes(`template=${id}`));
    assert.ok(rendered.markdown.includes("aucun service tiers"));
    for (const asset of rendered.assets) {
      const file = path.join(dir, asset.path);
      assert.equal(fs.readFileSync(file, "utf8"), asset.contents);
      assert.ok(Buffer.byteLength(asset.contents) < 20_000);
      assert.deepEqual(assertWellFormedXml(asset.contents), []);
      const python = spawnSync("python3", ["-c", "import sys, xml.etree.ElementTree as ET; ET.parse(sys.argv[1])", file], {
        encoding: "utf8",
      });
      assert.equal(python.status, 0, python.stderr);
    }
  }
});

test("l'archive v1 reste présente et réversible", () => {
  assert.equal(fs.existsSync(path.join(root, "archive/v1/templates/001-minimal-clean/README.md")), true);
  assert.equal(fs.existsSync(path.join(root, "archive/v1/README.md")), true);
});
