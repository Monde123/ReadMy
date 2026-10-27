import assert from "node:assert/strict";
import test from "node:test";
import { auditReadme, formatAuditReport } from "../lib/audit-profile.js";
import { inferRole, computeTopLanguages, suggestTemplates } from "../lib/github.js";

test("audit : détecte les widgets tiers fragiles et calcule le score de durabilité", () => {
  const fragileMarkdown = `# Mon Profil
![Build](https://img.shields.io/badge/build-passing-green)
![Stats](https://github-readme-stats.vercel.app/api?username=john)
![Streak](https://github-readme-streak-stats.herokuapp.com/?user=john)
<img src="https://komarev.com/ghpvc/?username=john" alt="Views"/>
`;

  const report = auditReadme(fragileMarkdown, "john");
  assert.ok(report.score < 70, `le score devrait être pénalisé, obtenu ${report.score}`);
  assert.ok(report.fragileFound.length >= 3);
  assert.ok(report.issues.some((i) => i.includes("Shields.io")));
  assert.ok(report.issues.some((i) => i.includes("Dark Mode")));
});

test("audit : un profil ReadMy 100% local obtient un score parfait de 100", () => {
  const cleanMarkdown = `<!-- readmy:template=minimal -->
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./assets/banner-dark.svg" />
  <source media="(prefers-color-scheme: light)" srcset="./assets/banner-light.svg" />
  <img alt="Bandeau : Inès Morel" src="./assets/banner-light.svg" />
</picture>

# Inès Morel
<p>Ingénieure logiciel</p>
`;

  const report = auditReadme(cleanMarkdown, "ines");
  assert.equal(report.score, 100);
  assert.equal(report.grade, "A");
  assert.equal(report.fragileFound.length, 0);
  assert.equal(report.issues.length, 0);

  const formatted = formatAuditReport(report);
  assert.ok(formatted.includes("100/100"));
});

test("intelligence sémantique : inférence de rôle et de templates recommandés", () => {
  const bioAI = "Senior ML Systems Engineer at HuggingFace. Working on vLLM and CUDA.";
  const languagesAI = [{ name: "Python", count: 12 }, { name: "C++", count: 4 }];

  const role = inferRole(bioAI, languagesAI);
  assert.ok(role.toLowerCase().includes("engineer"));

  const recommendations = suggestTemplates({
    github: { bio: bioAI, name: "Dr. Elena" },
    topLanguages: languagesAI,
    inferredRole: role,
  });

  assert.ok(recommendations.some((r) => r.id === "003-ai-engineer"));
});

test("intelligence sémantique : agrégation des langages dominants", () => {
  const repos = [
    { language: "Rust", stargazers_count: 100 },
    { language: "Rust", stargazers_count: 50 },
    { language: "Go", stargazers_count: 200 },
    { language: null, stargazers_count: 10 },
  ];

  const top = computeTopLanguages(repos);
  assert.equal(top[0].name, "Rust");
  assert.equal(top[0].count, 2);
  assert.equal(top[1].name, "Go");
  assert.equal(top[1].count, 1);
});
