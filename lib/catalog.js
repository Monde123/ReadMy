import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseYaml } from "./yaml.js";
import { fail } from "./errors.js";

export function repoRoot() {
  return path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
}

export function loadJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

export function loadTokens(root = repoRoot()) {
  return loadJson(path.join(root, "design", "tokens.json"));
}

export function loadRegistry(root = repoRoot()) {
  return loadJson(path.join(root, "components", "registry.json"));
}

export function templateIds(root = repoRoot()) {
  const base = path.join(root, "templates");
  return fs
    .readdirSync(base, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && fs.existsSync(path.join(base, entry.name, "template.yml")))
    .map((entry) => entry.name)
    .sort();
}

export function loadTemplate(root, id) {
  const dir = path.join(root, "templates", id);
  if (!fs.existsSync(dir)) fail("TEMPLATE_INCONNU", id);
  const template = parseYaml(fs.readFileSync(path.join(dir, "template.yml"), "utf8"));
  if (template.id !== id) fail("TEMPLATE_INVALIDE", `le dossier ${id} ne correspond pas à l'id ${template.id}`);
  const profile = parseYaml(fs.readFileSync(path.join(dir, "profile.example.yml"), "utf8"));
  return { dir, template, profile };
}
