import assert from "node:assert/strict";
import test from "node:test";
import { contrastRatio } from "../lib/contrast.js";
import { loadTokens } from "../lib/catalog.js";
import { ReadMyError } from "../lib/errors.js";

test("rapports calculés hors de ce dépôt par la formule WCAG en Python", () => {
  assert.ok(Math.abs(contrastRatio("#000000", "#ffffff") - 21) < 0.001);
  assert.ok(Math.abs(contrastRatio("#ffffff", "#0d1117") - 18.9246) < 0.001);
  const gray = contrastRatio("#777777", "#ffffff");
  assert.ok(Math.abs(gray - 4.4781) < 0.001);
  assert.ok(gray < 4.5);
});

test("couleur invalide, vide, ou raccourcie", () => {
  for (const color of ["", "#fff", "#gggggg", "ffffff", null]) {
    assert.throws(() => contrastRatio(color, "#ffffff"), (error) => error instanceof ReadMyError && error.code === "COULEUR_INVALIDE");
  }
});

test("chaque token de texte atteint 4,5:1 sur son fond", () => {
  const tokens = loadTokens();
  const spec = {
    paper: {
      light: { bg: "#ffffff", text: "#1f2328", muted: "#59636e", accent: "#0550ae" },
      dark: { bg: "#0d1117", text: "#e6edf3", muted: "#9198a1", accent: "#79c0ff" },
    },
    ink: {
      light: { bg: "#f6f8fa", text: "#24292f", muted: "#57606a", accent: "#24292f" },
      dark: { bg: "#010409", text: "#f0f6fc", muted: "#8b949e", accent: "#f0f6fc" },
    },
    signal: {
      light: { bg: "#fff7ed", text: "#431407", muted: "#9a3412", accent: "#9a3412" },
      dark: { bg: "#1c1410", text: "#ffedd5", muted: "#fdba74", accent: "#fdba74" },
    },
    violet: {
      light: { bg: "#faf5ff", text: "#2e1065", muted: "#6d28d9", accent: "#6d28d9" },
      dark: { bg: "#1c1424", text: "#f3e8ff", muted: "#d8b4fe", accent: "#d8b4fe" },
    },
  };
  assert.deepEqual(tokens.space, { xs: 4, sm: 8, md: 16, lg: 24 });
  for (const [themeName, theme] of Object.entries(spec)) {
    for (const mode of ["light", "dark"]) {
      for (const role of ["bg", "text", "muted", "accent"]) {
        assert.equal(tokens.themes[themeName][mode][role], theme[mode][role]);
      }
      for (const role of ["text", "muted", "accent"]) {
        assert.ok(contrastRatio(theme[mode][role], theme[mode].bg) >= 4.5);
      }
    }
  }
});
