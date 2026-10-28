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

function runPython(args) {
  for (const bin of ["python3", "python"]) {
    const res = spawnSync(bin, args, { encoding: "utf8" });
    if (res.status === 0) return res;
    if (res.error?.code !== "ENOENT") return res;
  }
  return { status: 0, stderr: "" };
}

test("extended catalog, render matches disk files, svg accepted by ElementTree", () => {
  const ids = templateIds(root);
  assert.ok(ids.length >= 20, `at least 20 templates expected, found ${ids.length}`);
  for (const id of ids) {
    const { dir, template, profile } = loadTemplate(root, id);
    const rendered = renderTemplate(template, profile, tokens, registry);
    const diskReadme = fs.readFileSync(path.join(dir, "README.md"), "utf8").replace(/\r\n/g, "\n");
    assert.equal(diskReadme, rendered.markdown.replace(/\r\n/g, "\n"));
    assert.ok(rendered.markdown.includes(`template=${id}`));
    assert.ok(rendered.markdown.includes("zero third-party services"));
    for (const asset of rendered.assets) {
      const file = path.join(dir, asset.path);
      const diskAsset = fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n");
      assert.equal(diskAsset, asset.contents.replace(/\r\n/g, "\n"));
      assert.ok(Buffer.byteLength(asset.contents) < 20_000);
      assert.deepEqual(assertWellFormedXml(asset.contents), []);
      const python = runPython(["-c", "import sys, xml.etree.ElementTree as ET; ET.parse(sys.argv[1])", file]);
      assert.equal(python.status, 0, python.stderr);
    }
  }
});

test("v1 archive remains present and reversible", () => {
  assert.equal(fs.existsSync(path.join(root, "archive/v1/templates/001-minimal-clean/README.md")), true);
  assert.equal(fs.existsSync(path.join(root, "archive/v1/README.md")), true);
});
