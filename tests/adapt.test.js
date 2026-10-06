import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { adaptProfile } from "../lib/adapt.js";
import { loadTemplate, repoRoot } from "../lib/catalog.js";
import { ReadMyError } from "../lib/errors.js";
import { registry, tokens } from "./helpers.js";

const root = repoRoot();
const minimal = loadTemplate(root, "minimal").template;

function adapt(file, extra = {}) {
  const fixture = JSON.parse(fs.readFileSync(path.join(root, "skills", "readmy-profile-adapter", "fixtures", file), "utf8"));
  return adaptProfile({
    template: minimal,
    github: fixture.github,
    consent: fixture.consent,
    overrides: fixture.overrides,
    tokens,
    registry,
    ...extra,
  });
}

test("octocat : dépôt réel, fork exclu, vie privée omise, rien d'inventé", () => {
  const fixture = JSON.parse(fs.readFileSync(path.join(root, "skills/readmy-profile-adapter/fixtures/octocat.json"), "utf8"));
  const result = adapt("octocat.json");
  assert.ok(result.markdown.includes("Hello-World"));
  assert.ok(result.markdown.includes("My first repository"));
  assert.ok(result.markdown.includes("42 étoiles"));
  assert.equal(result.markdown.includes("Spoon-Knife"), false);
  assert.equal(result.markdown.includes("10000"), false);
  assert.equal(result.markdown.includes(fixture.github.location), false);
  assert.equal(result.markdown.includes(fixture.github.email), false);
  assert.equal(result.markdown.includes(fixture.github.company), false);
  assert.equal(result.markdown.includes("NexusDB"), false);
  assert.ok(result.markdown.includes("{{role}}"));
  assert.ok(result.placeholders.includes("role"));
  assert.ok(result.provenance.some((item) => item.field === "location" && item.source === "omis"));
});

test("profil sans dépôt : login seul, placeholder, aucun projet fabriqué", () => {
  const result = adapt("solo.json");
  assert.ok(result.markdown.includes(">solo</h1>"));
  assert.ok(result.markdown.includes("{{role}}"));
  assert.ok(result.markdown.includes("section:projets omise"));
  assert.ok(result.warnings.some((warning) => warning.includes("aucun dépôt")));
});

test("le consentement explicite laisse passer le lieu et refuse un email mal formé", () => {
  const fixture = JSON.parse(fs.readFileSync(path.join(root, "skills/readmy-profile-adapter/fixtures/octocat.json"), "utf8"));
  const shown = adaptProfile({
    template: minimal,
    github: fixture.github,
    consent: { showLocation: true, showEmail: false, showCompany: false, showSocial: false },
    tokens,
    registry,
  });
  assert.ok(shown.markdown.includes("San Francisco"));
  assert.throws(
    () => adaptProfile({
      template: minimal,
      github: { ...fixture.github, email: "pas un email" },
      consent: { showEmail: true },
      tokens,
      registry,
    }),
    (error) => error instanceof ReadMyError && error.code === "IDENTIFIANT_INVALIDE",
  );
});

test("bio hostile échappée, fork sans booléen, dépôt override inconnu", () => {
  const injected = adaptProfile({
    template: minimal,
    github: {
      login: "octocat",
      name: "The Octocat",
      bio: '</p><img src=x onerror=alert(1)>',
      repos: [],
    },
    tokens,
    registry,
  });
  assert.equal(injected.markdown.includes("<img src=x"), false);
  assert.ok(injected.markdown.includes("&lt;/p&gt;"));
  assert.throws(
    () => adaptProfile({
      template: minimal,
      github: { login: "octocat", name: "The Octocat", repos: [{ name: "X", html_url: "https://example.com/x" }] },
      tokens,
      registry,
    }),
    (error) => error instanceof ReadMyError && error.code === "DEPOT_INCOMPLET",
  );
  const custom = adaptProfile({
    template: minimal,
    github: { login: "octocat", name: "The Octocat", repos: [] },
    overrides: { projects: [{ name: "HorsLigne", url: "https://example.com/hors", description: "Confirmé par la personne." }] },
    tokens,
    registry,
  });
  assert.ok(custom.markdown.includes("HorsLigne"));
  assert.ok(custom.warnings.some((warning) => warning.includes("HorsLigne")));
});

test("la skill énonce l'interdiction d'inventer", () => {
  const skill = fs.readFileSync(path.join(root, "skills/readmy-profile-adapter/SKILL.md"), "utf8");
  assert.ok(skill.includes("## Entrées"));
  assert.ok(skill.includes("## Sorties"));
  assert.ok(skill.includes("## Interdits"));
  assert.ok(skill.includes("N'invente aucun dépôt, chiffre, diplôme, récompense ou intitulé de poste."));
});
