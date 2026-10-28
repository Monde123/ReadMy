import { loadTokens, loadRegistry } from "../lib/catalog.js";

export const tokens = loadTokens();
export const registry = loadRegistry();

export function sampleTemplate(overrides = {}) {
  return {
    id: "trial",
    version: "2.0.0",
    title: "Trial",
    summary: "Template used for automated tests.",
    audiences: ["beginner"],
    theme: "paper",
    banner: "rule",
    projects: "list",
    components: ["banner", "identity", "projects", "colophon"],
    requires: ["name", "role"],
    ...overrides,
  };
}

export const templateEssai = sampleTemplate;

export function sampleProfile(overrides = {}) {
  return {
    name: "A",
    role: "Test Role",
    projects: [
      {
        name: "Solo",
        url: "https://github.com/example-user/solo",
        description: "A single project.",
      },
    ],
    ...overrides,
  };
}

export const profilEssai = sampleProfile;
