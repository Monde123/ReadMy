#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { repoRoot, loadTokens, loadRegistry, templateIds, loadTemplate } from "../lib/catalog.js";
import { renderTemplate } from "../lib/render.js";
import { adaptProfile } from "../lib/adapt.js";
import { parseYaml } from "../lib/yaml.js";
import { validateRepo } from "../tools/validate.js";
import { ReadMyError } from "../lib/errors.js";

function flag(args, name) {
  const index = args.indexOf(name);
  if (index === -1) return null;
  return args[index + 1] ?? null;
}

function writeOutput(dir, markdown, assets) {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "README.md"), markdown);
  for (const asset of assets) {
    const target = path.join(dir, asset.path);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, asset.contents);
  }
}

function main() {
  const [command, ...args] = process.argv.slice(2);
  const root = repoRoot();
  const tokens = loadTokens(root);
  const registry = loadRegistry(root);
  if (command === "list") {
    for (const id of templateIds(root)) {
      const { template } = loadTemplate(root, id);
      process.stdout.write(`${template.id}\t${template.title}\t${template.layout}\n`);
    }
    return;
  }
  if (command === "validate") {
    const errors = validateRepo(root);
    if (errors.length > 0) {
      for (const error of errors) process.stderr.write(`${error}\n`);
      process.exit(1);
    }
    process.stdout.write("validation: ok\n");
    return;
  }
  if (command === "render" || command === "adapt") {
    const id = flag(args, "--template");
    const out = flag(args, "--out");
    const profilePath = flag(args, "--profile");
    if (!id) throw new ReadMyError("TEMPLATE_INCONNU", "option --template manquante");
    if (!out) throw new ReadMyError("SORTIE_MANQUANTE", "option --out manquante");
    const { template, profile } = loadTemplate(root, id);
    if (command === "render") {
      const data = profilePath ? parseYaml(fs.readFileSync(profilePath, "utf8")) : profile;
      const rendered = renderTemplate(template, data, tokens, registry);
      writeOutput(path.resolve(out), rendered.markdown, rendered.assets);
      process.stdout.write(`${path.resolve(out)}\n`);
      return;
    }
    if (!profilePath) throw new ReadMyError("PROFIL_INCOMPLET", "option --profile manquante");
    const fixture = JSON.parse(fs.readFileSync(profilePath, "utf8"));
    const adapted = adaptProfile({
      template,
      github: fixture.github,
      consent: fixture.consent,
      overrides: fixture.overrides,
      tokens,
      registry,
    });
    writeOutput(path.resolve(out), adapted.markdown, adapted.assets);
    fs.writeFileSync(
      path.join(path.resolve(out), "provenance.json"),
      `${JSON.stringify({ placeholders: adapted.placeholders, warnings: adapted.warnings, provenance: adapted.provenance }, null, 2)}\n`,
    );
    process.stdout.write(`${path.resolve(out)}\n`);
    return;
  }
  throw new ReadMyError("COMMANDE_INCONNUE", "attendu: list, render, adapt, validate");
}

try {
  main();
} catch (error) {
  if (error instanceof ReadMyError) {
    process.stderr.write(`${error.message}\n`);
    process.exit(1);
  }
  throw error;
}
