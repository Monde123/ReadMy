import assert from "node:assert/strict";
import test from "node:test";
import { loadTemplate, repoRoot, templateIds } from "../lib/catalog.js";
import { renderTemplate } from "../lib/render.js";
import { ReadMyError } from "../lib/errors.js";
import { assertWellFormedXml } from "../lib/xml.js";
import { profilEssai, registry, templateEssai, tokens } from "./helpers.js";

const root = repoRoot();

const MARKERS = [
  ["minimal", "<h2>Sélection</h2>"],
  ["engineer", "FORMAT RFC"],
  ["terminal", "$ whoami"],
  ["student", "<h2>Jalons</h2>"],
  ["academic", "<h2>Bibliographie</h2>"],
  ["founder", "01 — Problème"],
  ["security", "DIFFUSION : DÉFENSIVE"],
  ["journey", "<h2>Chronique</h2>"],
  ["maintainer", "<h2>Bureau</h2>"],
  ["creator", "<h2>Mur d'atelier</h2>"],
];

function render(template, profile) {
  return renderTemplate(template, profile, tokens, registry);
}

test("les dix géométries restent distinctes du squelette En bref", () => {
  const pages = new Map();
  for (const id of templateIds(root)) {
    const { template, profile } = loadTemplate(root, id);
    pages.set(id, render(template, profile).markdown);
  }
  assert.equal(pages.size, MARKERS.length);
  for (const [id, marker] of MARKERS) {
    const owners = [...pages.entries()].filter(([, markdown]) => markdown.includes(marker)).map(([owner]) => owner);
    assert.deepEqual(owners, [id], `${marker} doit n'appartenir qu'à ${id}`);
    assert.equal(pages.get(id).includes("<h2>En bref</h2>"), false);
  }
});

test("entrée hostile : balise dans le nom RFC, fermeture de pre, projets vides, pitch absent", () => {
  const hostileName = render(
    templateEssai({ id: "essai-rfc", layout: "rfc", banner: "rfc", theme: "ink", components: ["banner", "identity", "prose", "colophon"] }),
    { name: "<script>alert(1)</script>", role: "Rôle test", summary: "Résumé" },
  );
  assert.equal(hostileName.markdown.includes("<script>"), false);
  assert.ok(hostileName.markdown.includes("&lt;script&gt;"));
  assert.ok(hostileName.markdown.includes("FORMAT RFC"));
  for (const asset of hostileName.assets) assert.deepEqual(assertWellFormedXml(asset.contents), []);

  const breakout = render(
    templateEssai({
      id: "essai-tui",
      layout: "tui",
      banner: "terminal",
      theme: "ink",
      components: ["banner", "projects", "colophon"],
    }),
    profilEssai({
      projects: [{ name: "Seul", url: "https://example.com/seul", description: "</pre><script>alert(1)</script>" }],
    }),
  );
  assert.equal(breakout.markdown.includes("</pre><script>"), false);
  assert.ok(breakout.markdown.includes("&lt;/pre&gt;"));
  assert.ok(breakout.markdown.includes("$ whoami"));

  const empty = render(templateEssai({ layout: "editorial" }), { name: "A", role: "Rôle test", projects: [] });
  assert.ok(empty.markdown.includes("<h2>Sélection</h2>"));
  assert.ok(empty.markdown.includes("section:projets omise : liste vide ou absente"));
  assert.equal(empty.markdown.includes("NexusDB"), false);

  const noPitch = render(
    templateEssai({
      id: "essai-pitch",
      layout: "pitch",
      banner: "slides",
      theme: "signal",
      components: ["banner", "identity", "pitch", "colophon"],
    }),
    { name: "A", role: "Rôle test" },
  );
  assert.ok(noPitch.markdown.includes("01 — Problème"));
  assert.ok(noPitch.markdown.includes("02 — Offre"));
  assert.ok(noPitch.markdown.includes("03 — Preuve"));
  assert.ok(noPitch.markdown.includes("section:pitch omise : bloc absent"));
});

test("layout inconnu refusé, la note sécurité ne décrit pas d'attaque", () => {
  assert.throws(
    () => render(templateEssai({ layout: "neon" }), profilEssai()),
    (error) => error instanceof ReadMyError && error.code === "TEMPLATE_INVALIDE",
  );
  const { template, profile } = loadTemplate(root, "security");
  const page = render(template, profile).markdown.toLowerCase();
  assert.ok(page.includes("ne contient pas de procédure d'attaque"));
  for (const word of ["reverse shell", "payload", "metasploit", "0day"]) {
    assert.equal(page.includes(word), false, word);
  }
});
