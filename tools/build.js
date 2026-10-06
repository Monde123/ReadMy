import fs from "node:fs";
import path from "node:path";
import { repoRoot, loadTokens, loadRegistry, templateIds, loadTemplate } from "../lib/catalog.js";
import { renderTemplate } from "../lib/render.js";
import { adaptProfile } from "../lib/adapt.js";

const root = repoRoot();
const tokens = loadTokens(root);
const registry = loadRegistry(root);

for (const id of templateIds(root)) {
  const { dir, template, profile } = loadTemplate(root, id);
  const rendered = renderTemplate(template, profile, tokens, registry);
  fs.writeFileSync(path.join(dir, "README.md"), rendered.markdown);
  for (const asset of rendered.assets) {
    const target = path.join(dir, asset.path);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, asset.contents);
  }
  process.stdout.write(`rendu ${id}\n`);
}

const fixturePath = path.join(root, "skills", "readmy-profile-adapter", "fixtures", "octocat.json");
const fixture = JSON.parse(fs.readFileSync(fixturePath, "utf8"));
const minimal = loadTemplate(root, "minimal").template;
const adapted = adaptProfile({
  template: minimal,
  github: fixture.github,
  consent: fixture.consent,
  overrides: fixture.overrides,
  tokens,
  registry,
});
const exampleDir = path.join(root, "skills", "readmy-profile-adapter", "examples", "octocat-minimal");
fs.mkdirSync(path.join(exampleDir, "assets"), { recursive: true });
fs.writeFileSync(path.join(exampleDir, "README.md"), adapted.markdown);
for (const asset of adapted.assets) {
  fs.writeFileSync(path.join(exampleDir, asset.path), asset.contents);
}
fs.writeFileSync(
  path.join(exampleDir, "provenance.json"),
  `${JSON.stringify({ placeholders: adapted.placeholders, warnings: adapted.warnings, provenance: adapted.provenance }, null, 2)}\n`,
);
process.stdout.write("rendu skill octocat-minimal\n");
