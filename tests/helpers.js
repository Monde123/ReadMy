import { loadTokens, loadRegistry } from "../lib/catalog.js";

export const tokens = loadTokens();
export const registry = loadRegistry();

export function templateEssai(overrides = {}) {
  return {
    id: "essai",
    version: "2.0.0",
    title: "Essai",
    summary: "Gabarit utilisé par les tests.",
    audiences: ["debutant"],
    theme: "paper",
    banner: "rule",
    projects: "list",
    components: ["banner", "identity", "projects", "colophon"],
    requires: ["name", "role"],
    ...overrides,
  };
}

export function profilEssai(overrides = {}) {
  return {
    name: "A",
    role: "Rôle test",
    projects: [
      {
        name: "Seul",
        url: "https://github.com/example-user/seul",
        description: "Un seul projet.",
      },
    ],
    ...overrides,
  };
}
