import assert from "node:assert/strict";
import test from "node:test";
import { renderTemplate } from "../lib/render.js";
import { ReadMyError } from "../lib/errors.js";
import { assertWellFormedXml } from "../lib/xml.js";
import { sampleProfile, sampleTemplate, registry, tokens } from "./helpers.js";

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
  assert.fail("no error thrown");
}

test("provided text renders, image paths are local, alt is populated", () => {
  const result = render(sampleTemplate(), sampleProfile());
  assert.equal(result.markdown.includes(">A<") || result.markdown.includes(">A</h1>"), true);
  assert.ok(result.markdown.includes("Solo"));
  assert.ok(result.markdown.includes("https://github.com/example-user/solo"));
  assert.ok(result.markdown.includes('src="./assets/banner-light.svg"'));
  assert.ok(result.markdown.includes('alt="Banner: A, Test Role"'));
  assert.equal(result.markdown.includes("img.shields.io"), false);
  assert.equal(result.assets.length, 2);
  for (const asset of result.assets) assert.deepEqual(assertWellFormedXml(asset.contents), []);
  assert.ok(result.markdown.includes("banner@2.0.0"));
  const again = render(sampleTemplate(), sampleProfile());
  assert.equal(again.markdown, result.markdown);
});

test("missing required field, empty field, oversized field, invalid url, unknown key", () => {
  assert.equal(codeOf(() => render(sampleTemplate(), { role: "Test Role" })), "MISSING_FIELD");
  assert.equal(codeOf(() => render(sampleTemplate(), { name: "   ", role: "Test Role" })), "EMPTY_FIELD");
  assert.equal(codeOf(() => render(sampleTemplate(), { name: "A".repeat(121), role: "Test Role" })), "FIELD_TOO_LONG");
  assert.equal(
    codeOf(() => render(sampleTemplate(), sampleProfile({ projects: [{ name: "X", url: "javascript:alert(1)", description: "Y" }] }))),
    "INVALID_URL",
  );
  assert.equal(codeOf(() => render(sampleTemplate(), sampleProfile({ password: "secret" }))), "UNKNOWN_PROFILE_KEY");
});

test("empty list is gracefully noted, injection is escaped, unknown theme and component fail", () => {
  const empty = render(sampleTemplate(), { name: "A", role: "Test Role", projects: [] });
  assert.ok(empty.markdown.includes("section:projects omitted : empty or missing list"));
  assert.equal(empty.markdown.includes("NexusDB"), false);
  const hostile = render(sampleTemplate(), sampleProfile({ name: '<script>alert(1)</script>' }));
  assert.ok(hostile.markdown.includes("&lt;script&gt;"));
  assert.equal(hostile.markdown.includes("<script>"), false);
  assert.equal(codeOf(() => render(sampleTemplate({ theme: "neon" }), sampleProfile())), "UNKNOWN_THEME");
  assert.equal(codeOf(() => render(sampleTemplate({ components: ["banner", "banner"] }), sampleProfile())), "DUPLICATE_COMPONENT");
  assert.equal(codeOf(() => render(sampleTemplate({ colour: "blue" }), sampleProfile())), "UNKNOWN_TEMPLATE_KEY");
});

test("excessive projects exceed cap, secret detection aborts without leaking", () => {
  const projects = Array.from({ length: 9 }, (_, index) => ({
    name: `P${index}`,
    url: `https://example.com/p${index}`,
    description: "Too many.",
  }));
  assert.equal(codeOf(() => render(sampleTemplate(), sampleProfile({ projects }))), "LIST_TOO_LONG");
  let message = "";
  try {
    render(sampleTemplate(), sampleProfile({ name: "ghp_ABCDEFGHIJ1234" }));
  } catch (error) {
    message = error.message;
    assert.equal(error.code, "SECRET_DETECTED");
  }
  assert.equal(message.includes("ghp_"), false);
});
