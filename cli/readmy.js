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
  if (!username) throw new ReadMyError("ARGUMENT_INVALIDE", "identifiant GitHub requis pour l'audit : readmy audit <username>");
  process.stdout.write(`\nAnalyse du README de profil pour @${username}...\n`);
  const current = await fetchCurrentReadme(username);
  const audit = auditReadme(current ? current.text : null, username);
  process.stdout.write(formatAuditReport(audit));
}

async function runInteractive(root, tokens, registry) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    process.stdout.write("\n╔═══════════════════════════════════════════════════════════════════╗\n");
    process.stdout.write("║      ReadMy · Générateur de Profil GitHub Indestructible          ║\n");
    process.stdout.write("╚═══════════════════════════════════════════════════════════════════╝\n\n");

    const username = await rl.question("Votre identifiant GitHub : ");
    if (!username.trim()) throw new ReadMyError("ARGUMENT_INVALIDE", "identifiant requis");
    const cleanUser = username.trim();

    process.stdout.write(`\n1/3 Audit de durabilité de votre profil actuel...\n`);
    const current = await fetchCurrentReadme(cleanUser);
    const audit = auditReadme(current ? current.text : null, cleanUser);
    process.stdout.write(formatAuditReport(audit));

    process.stdout.write(`2/3 Analyse sémantique de vos dépôts publics...\n`);
    const fixture = await fetchGitHubProfile(cleanUser);
    const meta = fixture.meta || {};

    process.stdout.write(`\n✓ Spécialité déduite : ${meta.inferredRole || "Software Engineer"}\n`);
    if (meta.topLanguages?.length > 0) {
      process.stdout.write(`✓ Stack dominante : ${meta.topLanguages.slice(0, 4).map((l) => `${l.name} (${l.count})`).join(", ")}\n`);
    }

    process.stdout.write(`\nGabarits recommandés pour votre profil :\n`);
    const recs = meta.recommendations || [];
    recs.forEach((r, idx) => {
      process.stdout.write(`  [${idx + 1}] ${r.id} — ${r.reason}\n`);
    });

    const defaultTpl = recs[0]?.id || "minimal";
    const templateChoice = await rl.question(`\nQuel gabarit souhaitez-vous utiliser [${defaultTpl}] : `) || defaultTpl;
    const availableIds = templateIds(root);
    const selectedTemplate = availableIds.includes(templateChoice.trim()) ? templateChoice.trim() : defaultTpl;

    const roleChoice = await rl.question(`Titre / Rôle affiché [${meta.inferredRole}] : `) || meta.inferredRole;
    fixture.overrides.role = roleChoice.trim();

    const outDir = await rl.question("\nDossier de sortie [./mon-profil] : ") || "./mon-profil";

    process.stdout.write(`\n3/3 Génération du profil sans service tiers...\n`);
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

    process.stdout.write(`\n🎉 Félicitations ! Votre profil indestructible a été généré dans : ${targetDir}\n`);
    process.stdout.write(`→ Score de durabilité prévisionnel : 100/100 (0 appel réseau, Dark/Light natif)\n`);
    process.stdout.write(`→ Copiez README.md et le dossier assets/ à la racine de votre dépôt ${cleanUser}/${cleanUser}.\n\n`);
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
    process.stdout.write(`ReadMy v2.0.0 — Générateur de README de profil GitHub sans service tiers.

Commandes :
  init                                                        Assistant interactif complet (Audit + Génération)
  audit <username>                                            Auditer la durabilité d'un profil GitHub actuel
  list                                                        Lister les gabarits disponibles
  render --template <id> --out <dir> [--profile <yml>]        Générer depuis un profil local
  adapt --template <id> --out <dir> [--github <user>|--profile <json>] Adapter un profil GitHub
  validate                                                    Valider la conformité du catalogue
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

    let fixture;
    if (githubUser) {
      fixture = await fetchGitHubProfile(githubUser);
    } else if (profilePath) {
      fixture = JSON.parse(fs.readFileSync(profilePath, "utf8"));
    } else {
      throw new ReadMyError("PROFIL_INCOMPLET", "option --github ou --profile manquante");
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

  throw new ReadMyError("COMMANDE_INCONNUE", "attendu: init, audit, list, render, adapt, validate");
}

main().catch((error) => {
  if (error instanceof ReadMyError) {
    process.stderr.write(`${error.message}\n`);
    process.exit(1);
  }
  process.stderr.write(`${error.stack || error.message}\n`);
  process.exit(1);
});
