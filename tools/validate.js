import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { repoRoot, loadTokens, loadRegistry, templateIds, loadTemplate } from "../lib/catalog.js";
import { renderTemplate } from "../lib/render.js";
import { adaptProfile } from "../lib/adapt.js";
import { parseYaml } from "../lib/yaml.js";
import { contrastRatio, assertTextContrast } from "../lib/contrast.js";
import { assertWellFormedXml } from "../lib/xml.js";
import { ReadMyError } from "../lib/errors.js";

const FORBIDDEN_HOSTS = [
  "img.shields.io",
  "vercel.app",
  "herokuapp.com",
  "skillicons.dev",
  "demolab.com",
  "githubusercontent.com",
  "komarev.com",
];

const TEXT_ROLES = ["text", "muted", "accent"];
const ASSET_LIMIT = 20_000;

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "node_modules" || entry.name === "archive") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else files.push(full);
  }
  return files;
}

function relativeLinks(file, text) {
  const links = [];
  const pattern = /(?:\[[^\]]*\]\(|(?:src|srcset)=["'])([^"')]+)["')]/g;
  let match;
  while ((match = pattern.exec(text)) !== null) {
    const target = match[1].trim();
    if (target.startsWith("http:") || target.startsWith("https:") || target.startsWith("mailto:") || target.startsWith("#")) {
      continue;
    }
    links.push(target.split(/\s+/)[0]);
  }
  return links;
}

export function validateRepo(root = repoRoot()) {
  const errors = [];
  const tokens = loadTokens(root);
  const registry = loadRegistry(root);
  const pairs = [];
  for (const [themeName, theme] of Object.entries(tokens.themes)) {
    for (const mode of ["light", "dark"]) {
      for (const role of TEXT_ROLES) {
        pairs.push({
          name: `${themeName}.${mode}.${role}`,
          foreground: theme[mode][role],
          background: theme[mode].bg,
        });
      }
    }
  }
  try {
    assertTextContrast(pairs, 4.5);
  } catch (error) {
    errors.push(error.message);
  }

  const ids = templateIds(root);
  if (ids.length !== 10) errors.push(`CATALOGUE: ${ids.length} gabarits, 10 attendus`);
  const seenLayouts = new Map();
  for (const id of ids) {
    const { dir, template, profile } = loadTemplate(root, id);
    if (!template.layout || template.layout === "stack") errors.push(`${id}: layout distinct attendu`);
    if (seenLayouts.has(template.layout)) errors.push(`${id}: layout ${template.layout} déjà utilisé par ${seenLayouts.get(template.layout)}`);
    else seenLayouts.set(template.layout, id);
    const metaPath = path.join(dir, "metadata.yml");
    const customPath = path.join(dir, "customization.md");
    if (!fs.existsSync(metaPath)) errors.push(`${id}: metadata.yml absent`);
    else {
      try {
        const meta = parseYaml(fs.readFileSync(metaPath, "utf8"));
        if (meta.id !== id) errors.push(`${id}: metadata.id différent du dossier`);
        if (meta.anonymized !== true) errors.push(`${id}: anonymized doit être true`);
        if (!meta.style || meta.style.architecture !== template.layout) errors.push(`${id}: architecture différente du layout`);
        if (!meta.images || meta.images.external !== false) errors.push(`${id}: images.external doit être false`);
        if (!meta.images || meta.images.alt_text_required !== true) errors.push(`${id}: alt_text_required`);
        if (!Array.isArray(meta.audience) || meta.audience.length === 0) errors.push(`${id}: audience vide`);
        if (!Array.isArray(meta.sections) || meta.sections.length < 3) errors.push(`${id}: sections`);
        if (typeof meta.title !== "string" || meta.title.trim() === "") errors.push(`${id}: title`);
        if (typeof meta.category !== "string" || meta.category.trim() === "") errors.push(`${id}: category`);
      } catch (error) {
        errors.push(`${id}: metadata ${error.message}`);
      }
    }
    if (!fs.existsSync(customPath)) errors.push(`${id}: customization.md absent`);
    else {
      const custom = fs.readFileSync(customPath, "utf8");
      if (!custom.includes("Remplacer")) errors.push(`${id}: customization sans guide de remplacement`);
      if (!custom.includes(template.layout)) errors.push(`${id}: customization ne nomme pas l'architecture`);
    }
    let rendered;
    try {
      rendered = renderTemplate(template, profile, tokens, registry);
    } catch (error) {
      errors.push(`${id}: ${error.message}`);
      continue;
    }
    const readmePath = path.join(dir, "README.md");
    const readme = fs.existsSync(readmePath) ? fs.readFileSync(readmePath, "utf8") : "";
    if (readme !== rendered.markdown) errors.push(`${id}: README.md ne correspond pas au rendu`);
    for (const asset of rendered.assets) {
      const assetPath = path.join(dir, asset.path);
      const onDisk = fs.existsSync(assetPath) ? fs.readFileSync(assetPath, "utf8") : "";
      if (onDisk !== asset.contents) errors.push(`${id}: ${asset.path} ne correspond pas au rendu`);
      if (Buffer.byteLength(asset.contents) > ASSET_LIMIT) errors.push(`${id}: ${asset.path} trop lourd`);
      const xmlErrors = assertWellFormedXml(asset.contents);
      if (xmlErrors.length > 0) errors.push(`${id}: ${asset.path} ${xmlErrors.join(",")}`);
      const python = spawnSync("python3", ["-c", "import sys, xml.etree.ElementTree as ET; ET.parse(sys.argv[1])", assetPath], {
        encoding: "utf8",
      });
      if (python.status !== 0) errors.push(`${id}: ${asset.path} refusé par ElementTree`);
    }
    if (!/<img\b[^>]*\balt="[^"]+"/.test(rendered.markdown)) errors.push(`${id}: image sans alt`);
    const ratio = contrastRatio(tokens.themes[template.theme].light.text, tokens.themes[template.theme].light.bg);
    if (ratio < 4.5) errors.push(`${id}: contraste clair ${ratio}`);
  }

  const active = walk(root).filter((file) => /\.(md|yml|yaml|svg|json)$/.test(file));
  for (const file of active) {
    const rel = path.relative(root, file);
    const text = fs.readFileSync(file, "utf8");
    if (!text.endsWith("\n")) errors.push(`${rel}: pas de saut de ligne final`);
    const surface = rel === "README.md" || rel.startsWith("templates/") || rel.startsWith("skills/") || rel.startsWith("components/") || rel.startsWith("design/");
    if (surface) {
      for (const host of FORBIDDEN_HOSTS) {
        if (text.includes(host)) errors.push(`${rel}: hôte interdit ${host}`);
      }
    }
    if (file.endsWith(".md")) {
      for (const link of relativeLinks(file, text)) {
        const resolved = path.resolve(path.dirname(file), link);
        if (!fs.existsSync(resolved)) errors.push(`${path.relative(root, file)}: lien relatif cassé ${link}`);
      }
      const images = text.match(/<img\b[^>]*>/g) ?? [];
      for (const image of images) {
        const alt = image.match(/\balt="([^"]*)"/);
        if (!alt || alt[1].trim() === "") errors.push(`${path.relative(root, file)}: alt manquant`);
      }
    }
  }

  if (!registry.blocks || Object.keys(registry.blocks).length < 8) {
    errors.push("BLOCS: bibliothèque copiable incomplète");
  } else {
    for (const [name, block] of Object.entries(registry.blocks)) {
      const file = path.join(root, "components", block.file);
      if (!fs.existsSync(file)) {
        errors.push(`bloc absent ${name}`);
        continue;
      }
      const blockText = fs.readFileSync(file, "utf8");
      if (!blockText.includes(`readmy-block:${name}`)) errors.push(`bloc ${name} sans marqueur`);
      if (!blockText.includes("{{")) errors.push(`bloc ${name} sans placeholder`);
    }
  }

  try {
    const fixture = JSON.parse(fs.readFileSync(path.join(root, "skills/readmy-profile-adapter/fixtures/octocat.json"), "utf8"));
    const minimal = loadTemplate(root, "minimal");
    const adapted = adaptProfile({
      template: minimal.template,
      github: fixture.github,
      consent: fixture.consent,
      overrides: fixture.overrides,
      tokens,
      registry,
    });
    const exampleDir = path.join(root, "skills/readmy-profile-adapter/examples/octocat-minimal");
    const exampleReadme = fs.existsSync(path.join(exampleDir, "README.md"))
      ? fs.readFileSync(path.join(exampleDir, "README.md"), "utf8")
      : "";
    if (exampleReadme !== adapted.markdown) errors.push("exemple octocat-minimal périmé");
    for (const asset of adapted.assets) {
      const onDisk = fs.existsSync(path.join(exampleDir, asset.path))
        ? fs.readFileSync(path.join(exampleDir, asset.path), "utf8")
        : "";
      if (onDisk !== asset.contents) errors.push(`exemple octocat-minimal ${asset.path} périmé`);
    }
  } catch (error) {
    errors.push(`exemple octocat-minimal ${error.message}`);
  }
  return errors;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const errors = validateRepo();
    if (errors.length > 0) {
      for (const error of errors) console.error(error);
      process.exit(1);
    }
    console.log(`validation: ok`);
  } catch (error) {
    if (error instanceof ReadMyError) {
      console.error(error.message);
      process.exit(1);
    }
    throw error;
  }
}
