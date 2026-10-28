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
  const fixture = JSON.parse(fs.readFileSync(path.join(root, "tests", "fixtures", file), "utf8"));
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

test("octocat: real repo, fork excluded, privacy omitted, nothing invented", () => {
  const fixture = JSON.parse(fs.readFileSync(path.join(root, "tests", "fixtures", "octocat.json"), "utf8"));
  const result = adapt("octocat.json");
  assert.ok(result.markdown.includes("Hello-World"));
  assert.ok(result.markdown.includes("My first repository"));
  assert.ok(result.markdown.includes("42 stars"));
  assert.equal(result.markdown.includes("Spoon-Knife"), false);
  assert.equal(result.markdown.includes("10000"), false);
  assert.equal(result.markdown.includes(fixture.github.location), false);
  assert.equal(result.markdown.includes(fixture.github.email), false);
  assert.equal(result.markdown.includes(fixture.github.company), false);
  assert.equal(result.markdown.includes("NexusDB"), false);
  assert.ok(result.markdown.includes("{{role}}"));
  assert.ok(result.placeholders.includes("role"));
  assert.ok(result.provenance.some((item) => item.field === "location" && item.source === "omitted"));
});

test("profile without repositories: login only, placeholder, zero fabricated projects", () => {
  const result = adapt("solo.json");
  assert.ok(result.markdown.includes(">solo</h1>"));
  assert.ok(result.markdown.includes("{{role}}"));
  assert.ok(result.markdown.includes("section:projects omitted"));
  assert.ok(result.warnings.some((warning) => warning.includes("no un-forked public repositories")));
});

test("explicit consent enables location and rejects malformed email", () => {
  const fixture = JSON.parse(fs.readFileSync(path.join(root, "tests", "fixtures", "octocat.json"), "utf8"));
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
      github: { ...fixture.github, email: "not an email" },
      consent: { showEmail: true },
      tokens,
      registry,
    }),
    (error) => error instanceof ReadMyError && error.code === "INVALID_IDENTIFIER",
  );
});

test("hostile bio escaped, fork without boolean, untracked override project", () => {
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
    (error) => error instanceof ReadMyError && error.code === "INCOMPLETE_REPO",
  );
  const custom = adaptProfile({
    template: minimal,
    github: { login: "octocat", name: "The Octocat", repos: [] },
    overrides: { projects: [{ name: "Offline", url: "https://example.com/offline", description: "Verified by author." }] },
    tokens,
    registry,
  });
  assert.ok(custom.markdown.includes("Offline"));
  assert.ok(custom.warnings.some((warning) => warning.includes("Offline")));
});

test("adapter strictly forbids data fabrication", () => {
  const result = adaptProfile({
    template: minimal,
    github: { login: "nobody", repos: [] },
    tokens,
    registry,
  });
  assert.ok(result.markdown.includes("{{role}}"));
  assert.ok(result.placeholders.includes("role"));
  assert.ok(result.warnings.some((w) => w.includes("missing role")));
});

test("custom links in overrides are accepted and validated", () => {
  const result = adaptProfile({
    template: minimal,
    github: { login: "monde", name: "Moise", repos: [] },
    overrides: {
      links: [
        { label: "LinkedIn", url: "https://www.linkedin.com/in/moise-koudanko/" },
      ],
    },
    tokens,
    registry,
  });
  assert.ok(result.markdown.includes("LinkedIn"));
  assert.ok(result.markdown.includes("https://www.linkedin.com/in/moise-koudanko/"));
  assert.ok(result.provenance.some((item) => item.field === "links.LinkedIn" && item.source === "user"));

  assert.throws(
    () => adaptProfile({
      template: minimal,
      github: { login: "monde", repos: [] },
      overrides: { links: [{ label: "Bad", url: "http://insecure.com" }] },
      tokens,
      registry,
    }),
    (error) => error instanceof ReadMyError && error.code === "INVALID_URL",
  );
});
