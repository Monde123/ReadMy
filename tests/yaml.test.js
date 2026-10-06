import assert from "node:assert/strict";
import test from "node:test";
import { parseYaml } from "../lib/yaml.js";
import { ReadMyError } from "../lib/errors.js";

function codeOf(action) {
  try {
    action();
  } catch (error) {
    assert.ok(error instanceof ReadMyError);
    return error.code;
  }
  assert.fail("aucune erreur");
}

test("document écrit à la main", () => {
  const parsed = parseYaml(`
id: minimal
version: 2.0.0
count: 2
ready: false
note: "Deux points: ok"
site: https://example.com/a#b
audiences:
  - debutant
  - professionnel
stack:
  - name: Langages
    items:
      - Go
      - Rust
`);
  assert.deepEqual(parsed, {
    id: "minimal",
    version: "2.0.0",
    count: 2,
    ready: false,
    note: "Deux points: ok",
    site: "https://example.com/a#b",
    audiences: ["debutant", "professionnel"],
    stack: [{ name: "Langages", items: ["Go", "Rust"] }],
  });
});

test("les commentaires ne changent pas l'objet", () => {
  const left = parseYaml("name: Inès\nrole: Ingénieure\n");
  const right = parseYaml("# tête\nname: Inès # personne fictive\n\nrole: Ingénieure\n");
  assert.deepEqual(left, right);
});

test("guillemets et apostrophes", () => {
  const parsed = parseYaml(`title: "a \\"b\\" c"\nmotto: 'l''atelier'\n`);
  assert.deepEqual(parsed, { title: 'a "b" c', motto: "l'atelier" });
});

test("document vide", () => {
  assert.equal(codeOf(() => parseYaml("")), "YAML_VIDE");
  assert.equal(codeOf(() => parseYaml("   \n# rien\n")), "YAML_VIDE");
});

test("une seule clé", () => {
  assert.deepEqual(parseYaml("name: A\n"), { name: "A" });
});

test("tabulation, clé dupliquée, flux, zéro en tête, entier énorme, guillemet ouvert", () => {
  assert.equal(codeOf(() => parseYaml("name:\tA\n")), "YAML_TAB");
  assert.equal(codeOf(() => parseYaml("name: A\nname: B\n")), "YAML_CLE_DUPLIQUEE");
  assert.equal(codeOf(() => parseYaml("items: [Go, Rust]\n")), "YAML_SYNTAXE_NON_SUPPORTEE");
  assert.equal(codeOf(() => parseYaml("count: 08\n")), "YAML_NOMBRE_INVALIDE");
  assert.equal(codeOf(() => parseYaml("count: 1234567890\n")), "YAML_NOMBRE_TROP_GRAND");
  assert.equal(codeOf(() => parseYaml('title: "ouvert\n')), "YAML_STRUCTURE");
});
