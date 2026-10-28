import assert from "node:assert/strict";
import test from "node:test";
import { techBadgesSvg } from "../lib/svg.js";
import { renderTemplate } from "../lib/render.js";
import { assertWellFormedXml } from "../lib/xml.js";
import { loadTokens, loadRegistry } from "../lib/catalog.js";

const tokens = loadTokens();
const registry = loadRegistry();

test("techBadgesSvg: generates well-formed SVG with pixel-perfect vector icons", () => {
  const stack = ["Rust", "Python", "TypeScript", "Go", "Docker", "Linux", "React", "Kubernetes", "PostgreSQL", "Swift"];
  const svg = techBadgesSvg({
    tokens,
    themeName: "ink",
    mode: "dark",
    items: stack,
    title: "Core Technologies",
  });

  assert.ok(svg.includes("<title>Core Technologies</title>"));
  assert.ok(svg.includes('xmlns="http://www.w3.org/2000/svg"'));
  assert.ok(svg.includes("Rust"));
  assert.ok(svg.includes("TypeScript"));
  assert.ok(svg.includes("Docker"));
  assert.deepEqual(assertWellFormedXml(svg), []);
});

test("techBadgesSvg: wraps cleanly across rows for large technology lists", () => {
  const many = [
    "Rust", "Python", "TypeScript", "Go", "C++", "C", "Docker", "Kubernetes", "Linux",
    "PostgreSQL", "Redis", "Kafka", "ClickHouse", "React", "Next.js", "Tailwind", "Git"
  ];
  const lightSvg = techBadgesSvg({
    tokens,
    themeName: "paper",
    mode: "light",
    items: many,
    title: "Extensive Stack",
  });

  assert.deepEqual(assertWellFormedXml(lightSvg), []);
  // Should have wrapped onto multiple rows, height should be >= 100
  const heightMatch = lightSvg.match(/height="(\d+)"/);
  assert.ok(heightMatch && parseInt(heightMatch[1], 10) >= 100);
});

test("renderTemplate: renders tech-badges component as local SVG assets and responsive picture", () => {
  const template = {
    id: "sample-tech",
    version: "2.0.0",
    title: "Tech Sample",
    summary: "A sample template demonstrating local tech badges.",
    audiences: ["developer"],
    theme: "paper",
    banner: "rule",
    projects: "list",
    components: ["banner", "identity", "tech-badges", "colophon"],
    requires: ["name", "role"],
  };

  const profile = {
    name: "Alex Vance",
    role: "Full-Stack Systems Engineer",
    badges: ["Rust", "Python", "Docker", "Linux", "PostgreSQL"],
  };

  const rendered = renderTemplate(template, profile, tokens, registry);
  assert.ok(rendered.markdown.includes("<picture>"));
  assert.ok(rendered.markdown.includes('srcset="./assets/tech-badges-dark.svg"'));
  assert.ok(rendered.markdown.includes('src="./assets/tech-badges-light.svg"'));
  assert.ok(rendered.markdown.includes('alt="Tech Stack: Rust, Python, Docker, Linux, PostgreSQL"'));

  const lightAsset = rendered.assets.find((a) => a.path === "assets/tech-badges-light.svg");
  const darkAsset = rendered.assets.find((a) => a.path === "assets/tech-badges-dark.svg");
  assert.ok(lightAsset && darkAsset);
  assert.deepEqual(assertWellFormedXml(lightAsset.contents), []);
  assert.deepEqual(assertWellFormedXml(darkAsset.contents), []);
});
