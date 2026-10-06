import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { repoRoot, loadTokens, loadRegistry, templateIds, loadTemplate } from "../lib/catalog.js";
import { renderTemplate } from "../lib/render.js";
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
  for (const id of ids) {
    const { dir, template, profile } = loadTemplate(root, id);
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
