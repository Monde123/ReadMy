#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline/promises";
import { repoRoot, loadTokens, loadRegistry, templateIds, loadTemplate } from "../lib/catalog.js";
import { renderTemplate } from "../lib/render.js";
import { adaptProfile } from "../lib/adapt.js";
import { parseYaml } from "../lib/yaml.js";
import { fetchGitHubProfile } from "../lib/github.js";
import { fetchCurrentReadme, auditReadme, formatAuditReport } from "../lib/audit-profile.js";
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

async function runAuditCommand(username) {
  if (!username) throw new ReadMyError("INVALID_ARGUMENT", "GitHub username required for audit: readmy audit <username>");
  process.stdout.write(`\nAnalyzing profile README for @${username}...\n`);
  const current = await fetchCurrentReadme(username);
  const audit = auditReadme(current ? current.text : null, username);
  process.stdout.write(formatAuditReport(audit));
}

async function runInteractive(root, tokens, registry) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    process.stdout.write("\n╔═══════════════════════════════════════════════════════════════════╗\n");
    process.stdout.write("║      ReadMy · Indestructible GitHub Profile Generator             ║\n");
    process.stdout.write("╚═══════════════════════════════════════════════════════════════════╝\n\n");

    const username = await rl.question("Your GitHub username: ");
    if (!username.trim()) throw new ReadMyError("INVALID_ARGUMENT", "username is required");
    const cleanUser = username.trim();

    process.stdout.write("\n1/3 Durability audit of your current profile...\n");
    const current = await fetchCurrentReadme(cleanUser);
    const audit = auditReadme(current ? current.text : null, cleanUser);
    process.stdout.write(formatAuditReport(audit));

    process.stdout.write("2/3 Semantic analysis of your public repositories...\n");
    const fixture = await fetchGitHubProfile(cleanUser);
    const meta = fixture.meta || {};

    process.stdout.write(`\n✓ Inferred role: ${meta.inferredRole || "Software Engineer"}\n`);
    if (meta.topLanguages?.length > 0) {
      process.stdout.write(`✓ Dominant stack: ${meta.topLanguages.slice(0, 4).map((l) => `${l.name} (${l.count})`).join(", ")}\n`);
    }

    process.stdout.write("\nRecommended templates for your profile:\n");
    const recs = meta.recommendations || [];
    recs.forEach((r, idx) => {
      process.stdout.write(`  [${idx + 1}] ${r.id} — ${r.reason}\n`);
    });

    const defaultTpl = recs[0]?.id || "minimal";
    const templateChoice = await rl.question(`\nWhich template would you like to use [${defaultTpl}]: `) || defaultTpl;
    const availableIds = templateIds(root);
    const selectedTemplate = availableIds.includes(templateChoice.trim()) ? templateChoice.trim() : defaultTpl;

    const roleChoice = await rl.question(`Displayed Title / Role [${meta.inferredRole}]: `) || meta.inferredRole;
    fixture.overrides.role = roleChoice.trim();

    const outDir = await rl.question("\nOutput directory [./my-profile]: ") || "./my-profile";

    process.stdout.write("\n3/3 Generating zero-third-party profile...\n");
    const { template } = loadTemplate(root, selectedTemplate);

    const adapted = adaptProfile({
      template,
      github: fixture.github,
      consent: fixture.consent,
      overrides: fixture.overrides,
      tokens,
      registry,
    });

    const targetDir = path.resolve(outDir.trim());
    writeOutput(targetDir, adapted.markdown, adapted.assets);
    fs.writeFileSync(
      path.join(targetDir, "provenance.json"),
      `${JSON.stringify({ placeholders: adapted.placeholders, warnings: adapted.warnings, provenance: adapted.provenance }, null, 2)}\n`,
    );

    process.stdout.write(`\n🎉 Congratulations! Your indestructible profile has been generated in: ${targetDir}\n`);
    process.stdout.write("→ Projected Durability Score: 100/100 (Zero network calls, native Dark/Light)\n");
    process.stdout.write(`→ Copy README.md and the assets/ folder to the root of your ${cleanUser}/${cleanUser} repository.\n\n`);
  } finally {
    rl.close();
  }
}

async function main() {
  const [command, ...args] = process.argv.slice(2);
  const root = repoRoot();
  const tokens = loadTokens(root);
  const registry = loadRegistry(root);

  if (!command || command === "--help" || command === "-h") {
    process.stdout.write(`ReadMy v2.0.0 — Zero-third-party GitHub profile README generator.

Commands:
  init                                                        Full interactive wizard (Audit + Generation)
  audit <username>                                            Audit durability of an existing GitHub profile
  list                                                        List available templates
  render --template <id> --out <dir> [--profile <yml>]        Generate from a local profile
  adapt --template <id> --out <dir> [--github <user>|--profile <json>] Adapt a GitHub profile
  validate                                                    Validate catalog compliance
`);
    return;
  }

  if (command === "audit") {
    const username = args[0];
    await runAuditCommand(username);
    return;
  }

  if (command === "list") {
    for (const id of templateIds(root)) {
      const { template } = loadTemplate(root, id);
      process.stdout.write(`${template.id}\t${template.title}\t${template.theme}\n`);
    }
    return;
  }

  if (command === "init") {
    await runInteractive(root, tokens, registry);
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
    const githubUser = flag(args, "--github");

    if (!id) throw new ReadMyError("UNKNOWN_TEMPLATE", "missing --template option");
    if (!out) throw new ReadMyError("MISSING_OUTPUT", "missing --out option");
    const { template, profile } = loadTemplate(root, id);

    if (command === "render") {
      const data = profilePath ? parseYaml(fs.readFileSync(profilePath, "utf8")) : profile;
      const rendered = renderTemplate(template, data, tokens, registry);
      writeOutput(path.resolve(out), rendered.markdown, rendered.assets);
      process.stdout.write(`${path.resolve(out)}\n`);
      return;
    }

    let fixture;
    if (githubUser) {
      fixture = await fetchGitHubProfile(githubUser);
    } else if (profilePath) {
      fixture = JSON.parse(fs.readFileSync(profilePath, "utf8"));
    } else {
      throw new ReadMyError("INCOMPLETE_PROFILE", "missing --github or --profile option");
    }

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

  throw new ReadMyError("UNKNOWN_COMMAND", "expected: init, audit, list, render, adapt, validate");
}

main().catch((error) => {
  if (error instanceof ReadMyError) {
    process.stderr.write(`${error.message}\n`);
    process.exit(1);
  }
  process.stderr.write(`${error.stack || error.message}\n`);
  process.exit(1);
});
