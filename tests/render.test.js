import assert from "node:assert/strict";
import test from "node:test";
import { renderTemplate } from "../lib/render.js";
import { ReadMyError } from "../lib/errors.js";
import { assertWellFormedXml } from "../lib/xml.js";
import { profilEssai, registry, templateEssai, tokens } from "./helpers.js";

function render(template, profile) {
  return renderTemplate(template, profile, tokens, registry);
}

function codeOf(action) {
  try {
    action();
  } catch (error) {
    assert.ok(error instanceof ReadMyError);
    return error.code;
  }
  assert.fail("aucune erreur");
}

test("le texte fourni réapparaît, l'image est locale, l'alt est rempli", () => {
  const result = render(templateEssai(), profilEssai());
  assert.equal(result.markdown.includes(">A<") || result.markdown.includes(">A</h1>"), true);
  assert.ok(result.markdown.includes("Seul"));
  assert.ok(result.markdown.includes("https://github.com/example-user/seul"));
  assert.ok(result.markdown.includes('src="./assets/banner-light.svg"'));
  assert.ok(result.markdown.includes('alt="Bandeau : A, Rôle test"'));
  assert.equal(result.markdown.includes("img.shields.io"), false);
  assert.equal(result.assets.length, 2);
  for (const asset of result.assets) assert.deepEqual(assertWellFormedXml(asset.contents), []);
  assert.ok(result.markdown.includes("banner@2.0.0"));
  const again = render(templateEssai(), profilEssai());
  assert.equal(again.markdown, result.markdown);
});

test("champ requis manquant, vide, trop long, url interdite, clé en trop", () => {
  assert.equal(codeOf(() => render(templateEssai(), { role: "Rôle test" })), "CHAMP_MANQUANT");
  assert.equal(codeOf(() => render(templateEssai(), { name: "   ", role: "Rôle test" })), "CHAMP_VIDE");
  assert.equal(codeOf(() => render(templateEssai(), { name: "A".repeat(121), role: "Rôle test" })), "CHAMP_TROP_LONG");
  assert.equal(
    codeOf(() => render(templateEssai(), profilEssai({ projects: [{ name: "X", url: "javascript:alert(1)", description: "Y" }] }))),
    "URL_INVALIDE",
  );
  assert.equal(codeOf(() => render(templateEssai(), profilEssai({ password: "secret" }))), "PROFIL_CLE_INCONNUE");
});

test("liste vide visible, injection échappée, thème et composant inconnus", () => {
  const empty = render(templateEssai(), { name: "A", role: "Rôle test", projects: [] });
  assert.ok(empty.markdown.includes("section:projets omise : liste vide ou absente"));
  assert.equal(empty.markdown.includes("NexusDB"), false);
  const hostile = render(templateEssai(), profilEssai({ name: '<script>alert(1)</script>' }));
  assert.ok(hostile.markdown.includes("&lt;script&gt;"));
  assert.equal(hostile.markdown.includes("<script>"), false);
  assert.equal(codeOf(() => render(templateEssai({ theme: "neon" }), profilEssai())), "THEME_INCONNU");
  assert.equal(codeOf(() => render(templateEssai({ components: ["banner", "banner"] }), profilEssai())), "COMPOSANT_DUPLIQUE");
  assert.equal(codeOf(() => render(templateEssai({ colour: "bleu" }), profilEssai())), "TEMPLATE_CLE_INCONNUE");
});

test("neuf projets dépassent le plafond, un secret arrête le rendu sans être recopié", () => {
  const projects = Array.from({ length: 9 }, (_, index) => ({
    name: `P${index}`,
    url: `https://example.com/p${index}`,
    description: "Trop.",
  }));
  assert.equal(codeOf(() => render(templateEssai(), profilEssai({ projects }))), "LISTE_TROP_LONGUE");
  let message = "";
  try {
    render(templateEssai(), profilEssai({ name: "ghp_ABCDEFGHIJ1234" }));
  } catch (error) {
    message = error.message;
    assert.equal(error.code, "SECRET_DETECTE");
  }
  assert.equal(message.includes("ghp_"), false);
});
