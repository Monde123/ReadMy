import { fail } from "./errors.js";
import { escapeHtml } from "./xml.js";
import { bannerSvg, techBadgesSvg } from "./svg.js";

const TEMPLATE_KEYS = new Set([
  "id",
  "version",
  "title",
  "summary",
  "audiences",
  "theme",
  "banner",
  "projects",
  "components",
  "requires",
]);

const PROFILE_KEYS = new Set([
  "name",
  "role",
  "summary",
  "focus",
  "location",
  "organization",
  "metrics",
  "projects",
  "stack",
  "badges",
  "publications",
  "timeline",
  "checklist",
  "pitch",
  "principles",
  "links",
]);

const SECRET = /\b(ghp_[A-Za-z0-9]+|github_pat_[A-Za-z0-9_]+|AKIA[0-9A-Z]{16}|sk-[A-Za-z0-9]{10,})\b/;

const LIMITS = {
  name: 120,
  role: 160,
  summary: 2000,
  focus: 2000,
  location: 80,
  organization: 80,
  description: 500,
  title: 200,
  detail: 500,
  label: 80,
  url: 300,
  item: 40,
  period: 40,
  venue: 160,
  year: 10,
  pitch: 600,
  principle: 180,
};

const LIST_LIMITS = {
  metrics: 6,
  projects: 8,
  publications: 12,
  timeline: 12,
  checklist: 20,
  principles: 8,
  links: 8,
  stack: 6,
  badges: 32,
  items: 12,
  audiences: 8,
  components: 16,
};

function rejectSecrets(value) {
  if (typeof value === "string" && SECRET.test(value)) {
    fail("SECRET_DETECTED", "field resembles a secret, rendering aborted");
  }
}

function text(field, value, { required = false, max }) {
  if (value === undefined || value === null) {
    if (required) fail("MISSING_FIELD", field);
    return null;
  }
  if (typeof value === "number" && Number.isInteger(value)) value = String(value);
  if (typeof value !== "string") fail("INVALID_PROFILE", `${field} must be a string`);
  rejectSecrets(value);
  if (value.length > max) fail("FIELD_TOO_LONG", `${field} (${value.length} > ${max})`);
  if (value.trim() === "") {
    if (required) fail("EMPTY_FIELD", field);
    return null;
  }
  return value.trim();
}

function httpsUrl(field, value) {
  const raw = text(field, value, { required: true, max: LIMITS.url });
  let url;
  try {
    url = new URL(raw);
  } catch {
    fail("INVALID_URL", field);
  }
  if (url.protocol !== "https:" || url.username || url.password) fail("INVALID_URL", field);
  return raw;
}

function linkUrl(field, value) {
  const raw = text(field, value, { required: true, max: LIMITS.url });
  let url;
  try {
    url = new URL(raw);
  } catch {
    fail("INVALID_URL", field);
  }
  if ((url.protocol !== "https:" && url.protocol !== "mailto:") || url.username || url.password) {
    fail("INVALID_URL", field);
  }
  return raw;
}

function listOf(field, value, limit) {
  if (value === undefined || value === null) return null;
  if (!Array.isArray(value)) fail("INVALID_PROFILE", `${field} must be a list`);
  if (value.length > limit) fail("LIST_TOO_LONG", `${field} (${value.length} > ${limit})`);
  return value;
}

function assertOnlyKeys(source, allowed, code) {
  if (source === null || typeof source !== "object" || Array.isArray(source)) {
    fail(code, "expected object");
  }
  for (const key of Object.keys(source)) {
    if (!allowed.has(key)) fail(code, key);
  }
}

export function normalizeTemplate(template, registry) {
  assertOnlyKeys(template, TEMPLATE_KEYS, "UNKNOWN_TEMPLATE_KEY");
  const id = text("id", template.id, { required: true, max: 42 });
  if (!/^[a-z0-9][a-z0-9-]{1,40}$/.test(id)) fail("INVALID_TEMPLATE", "id");
  const version = text("version", template.version, { required: true, max: 16 });
  if (!/^\d+\.\d+\.\d+$/.test(version)) fail("INVALID_TEMPLATE", "version");
  const title = text("title", template.title, { required: true, max: 80 });
  const summary = text("summary", template.summary, { required: true, max: 400 });
  const audiences = listOf("audiences", template.audiences, LIST_LIMITS.audiences);
  if (!audiences || audiences.length === 0) fail("MISSING_FIELD", "audiences");
  for (const audience of audiences) {
    text("audiences", audience, { required: true, max: 40 });
  }
  const theme = text("theme", template.theme, { required: true, max: 24 });
  const banner = text("banner", template.banner, { required: true, max: 24 });
  const projects = text("projects", template.projects, { required: true, max: 16 });
  if (projects !== "list" && projects !== "table" && projects !== "cards") fail("INVALID_TEMPLATE", "projects");
  const components = listOf("components", template.components, LIST_LIMITS.components);
  if (!components || components.length === 0) fail("MISSING_FIELD", "components");
  const seen = new Set();
  for (const component of components) {
    const name = text("components", component, { required: true, max: 32 });
    if (seen.has(name)) fail("DUPLICATE_COMPONENT", name);
    seen.add(name);
    if (!registry.components[name]) fail("UNKNOWN_COMPONENT", name);
  }
  const requires = listOf("requires", template.requires, 8);
  if (!requires) fail("MISSING_FIELD", "requires");
  for (const field of requires) text("requires", field, { required: true, max: 32 });
  return { id, version, title, summary, audiences, theme, banner, projects, components, requires };
}

const FIELD_COMPONENT = {
  summary: "prose",
  focus: "prose",
  metrics: "metrics",
  projects: "projects",
  stack: "stack",
  badges: "tech-badges",
  publications: "publications",
  timeline: "timeline",
  checklist: "checklist",
  pitch: "pitch",
  principles: "principles",
  links: "links",
  location: "identity",
  organization: "identity",
};

export function normalizeProfile(profile, template) {
  assertOnlyKeys(profile, PROFILE_KEYS, "UNKNOWN_PROFILE_KEY");
  for (const [field, component] of Object.entries(FIELD_COMPONENT)) {
    if (profile[field] !== undefined && profile[field] !== null && !template.components.includes(component)) {
      fail("SECTION_NOT_DISPLAYED", `${field} requires component ${component}`);
    }
  }
  const data = {};
  for (const field of template.requires) {
    if (profile[field] === undefined || profile[field] === null || String(profile[field]).trim() === "") {
      if (profile[field] === undefined || profile[field] === null) fail("MISSING_FIELD", field);
      fail("EMPTY_FIELD", field);
    }
  }
  data.name = text("name", profile.name, { required: template.requires.includes("name") || template.components.includes("banner") || template.components.includes("identity"), max: LIMITS.name });
  data.role = text("role", profile.role, { required: template.requires.includes("role") || template.components.includes("banner"), max: LIMITS.role });
  data.summary = text("summary", profile.summary, { max: LIMITS.summary });
  data.focus = text("focus", profile.focus, { max: LIMITS.focus });
  data.location = text("location", profile.location, { max: LIMITS.location });
  data.organization = text("organization", profile.organization, { max: LIMITS.organization });

  const metrics = listOf("metrics", profile.metrics, LIST_LIMITS.metrics);
  data.metrics = metrics
    ? metrics.map((item, index) => {
        if (item === null || typeof item !== "object" || Array.isArray(item)) fail("INVALID_PROFILE", `metrics[${index}]`);
        assertOnlyKeys(item, new Set(["label", "value", "detail"]), "UNKNOWN_PROFILE_KEY");
        return {
          label: text("metrics.label", item.label, { required: true, max: 40 }),
          value: text("metrics.value", item.value, { required: true, max: 40 }),
          detail: text("metrics.detail", item.detail, { max: 100 }),
        };
      })
    : null;

  const projects = listOf("projects", profile.projects, LIST_LIMITS.projects);
  data.projects = projects
    ? projects.map((item, index) => {
        if (item === null || typeof item !== "object" || Array.isArray(item)) fail("INVALID_PROFILE", `projects[${index}]`);
        assertOnlyKeys(item, new Set(["name", "url", "description", "language", "stars"]), "UNKNOWN_PROFILE_KEY");
        const project = {
          name: text("projects.name", item.name, { required: true, max: LIMITS.name }),
          url: httpsUrl("projects.url", item.url),
          description: text("projects.description", item.description, { required: true, max: LIMITS.description }),
        };
        project.language = text("projects.language", item.language, { max: LIMITS.item });
        if (item.stars !== undefined && item.stars !== null) {
          if (typeof item.stars !== "number" || !Number.isInteger(item.stars) || item.stars < 0 || item.stars > 1_000_000_000) {
            fail("INVALID_PROFILE", "projects.stars");
          }
          project.stars = item.stars;
        }
        return project;
      })
    : null;

  const stack = listOf("stack", profile.stack, LIST_LIMITS.stack);
  data.stack = stack
    ? stack.map((group, index) => {
        if (group === null || typeof group !== "object" || Array.isArray(group)) fail("INVALID_PROFILE", `stack[${index}]`);
        assertOnlyKeys(group, new Set(["name", "items"]), "UNKNOWN_PROFILE_KEY");
        const items = listOf("stack.items", group.items, LIST_LIMITS.items);
        if (!items || items.length === 0) fail("EMPTY_FIELD", "stack.items");
        return {
          name: text("stack.name", group.name, { required: true, max: LIMITS.item }),
          items: items.map((item) => text("stack.items", item, { required: true, max: LIMITS.item })),
        };
      })
    : null;

  const badges = listOf("badges", profile.badges, LIST_LIMITS.badges);
  data.badges = badges
    ? badges.map((item) => text("badges", item, { required: true, max: 40 }))
    : null;

  const publications = listOf("publications", profile.publications, LIST_LIMITS.publications);
  data.publications = publications
    ? publications.map((item) => {
        assertOnlyKeys(item, new Set(["year", "title", "venue", "url"]), "UNKNOWN_PROFILE_KEY");
        return {
          year: text("publications.year", item.year, { required: true, max: LIMITS.year }),
          title: text("publications.title", item.title, { required: true, max: LIMITS.title }),
          venue: text("publications.venue", item.venue, { required: true, max: LIMITS.venue }),
          url: httpsUrl("publications.url", item.url),
        };
      })
    : null;

  const timeline = listOf("timeline", profile.timeline, LIST_LIMITS.timeline);
  data.timeline = timeline
    ? timeline.map((item) => {
        assertOnlyKeys(item, new Set(["period", "title", "detail"]), "UNKNOWN_PROFILE_KEY");
        return {
          period: text("timeline.period", item.period, { required: true, max: LIMITS.period }),
          title: text("timeline.title", item.title, { required: true, max: LIMITS.title }),
          detail: text("timeline.detail", item.detail, { required: true, max: LIMITS.detail }),
        };
      })
    : null;

  const checklist = listOf("checklist", profile.checklist, LIST_LIMITS.checklist);
  data.checklist = checklist
    ? checklist.map((item) => {
        assertOnlyKeys(item, new Set(["label", "status"]), "UNKNOWN_PROFILE_KEY");
        const status = text("checklist.status", item.status, { required: true, max: 16 });
        if (!["done", "in_progress", "planned", "fait", "encours", "prevu"].includes(status)) {
          fail("INVALID_STATUS", status);
        }
        return { label: text("checklist.label", item.label, { required: true, max: LIMITS.label }), status };
      })
    : null;

  if (profile.pitch !== undefined && profile.pitch !== null) {
    if (typeof profile.pitch !== "object" || Array.isArray(profile.pitch)) fail("INVALID_PROFILE", "pitch");
    assertOnlyKeys(profile.pitch, new Set(["problem", "offer", "proof"]), "UNKNOWN_PROFILE_KEY");
    data.pitch = {
      problem: text("pitch.problem", profile.pitch.problem, { required: true, max: LIMITS.pitch }),
      offer: text("pitch.offer", profile.pitch.offer, { required: true, max: LIMITS.pitch }),
      proof: text("pitch.proof", profile.pitch.proof, { required: true, max: LIMITS.pitch }),
    };
  } else {
    data.pitch = null;
  }

  const principles = listOf("principles", profile.principles, LIST_LIMITS.principles);
  data.principles = principles
    ? principles.map((item) => text("principles", item, { required: true, max: LIMITS.principle }))
    : null;

  const links = listOf("links", profile.links, LIST_LIMITS.links);
  data.links = links
    ? links.map((item) => {
        assertOnlyKeys(item, new Set(["label", "url"]), "UNKNOWN_PROFILE_KEY");
        return {
          label: text("links.label", item.label, { required: true, max: LIMITS.label }),
          url: linkUrl("links.url", item.url),
        };
      })
    : null;
  return data;
}

function omitted(section, reason) {
  return `<!-- section:${section} omitted : ${reason} -->`;
}

function paragraph(value) {
  return `<p>${escapeHtml(value)}</p>`;
}

function renderProjects(template, data) {
  if (!data.projects || data.projects.length === 0) return omitted("projects", "empty or missing list");
  const withStars = data.projects.some((project) => project.stars !== undefined);
  if (template.projects === "list") {
    const items = data.projects
      .map((project) => {
        const language = project.language ? ` · ${escapeHtml(project.language)}` : "";
        const stars = project.stars !== undefined ? ` · ${project.stars} stars` : "";
        return `<li><a href="${escapeHtml(project.url)}">${escapeHtml(project.name)}</a> — ${escapeHtml(project.description)}${language}${stars}</li>`;
      })
      .join("\n");
    return `<h2>Projects</h2>\n<ul>\n${items}\n</ul>`;
  }
  if (template.projects === "cards") {
    const rows = [];
    for (let i = 0; i < data.projects.length; i += 2) {
      const p1 = data.projects[i];
      const p2 = data.projects[i + 1];
      const lang1 = p1.language ? ` · <code>${escapeHtml(p1.language)}</code>` : "";
      const stars1 = p1.stars !== undefined ? ` · ★ ${p1.stars}` : "";
      const c1 = `    <td width="50%" valign="top">
      <h3><a href="${escapeHtml(p1.url)}">${escapeHtml(p1.name)}</a></h3>
      <p>${escapeHtml(p1.description)}</p>
      <p><sub>${lang1}${stars1}</sub></p>
    </td>`;
      let c2 = "";
      if (p2) {
        const lang2 = p2.language ? ` · <code>${escapeHtml(p2.language)}</code>` : "";
        const stars2 = p2.stars !== undefined ? ` · ★ ${p2.stars}` : "";
        c2 = `    <td width="50%" valign="top">
      <h3><a href="${escapeHtml(p2.url)}">${escapeHtml(p2.name)}</a></h3>
      <p>${escapeHtml(p2.description)}</p>
      <p><sub>${lang2}${stars2}</sub></p>
    </td>`;
      } else {
        c2 = `    <td width="50%" valign="top"></td>`;
      }
      rows.push(`  <tr>\n${c1}\n${c2}\n  </tr>`);
    }
    return `<h2>Projects</h2>\n<table width="100%">\n<tbody>\n${rows.join("\n")}\n</tbody>\n</table>`;
  }
  const head = withStars
    ? "<tr><th>Project</th><th>Description</th><th>Language</th><th>Stars</th></tr>"
    : "<tr><th>Project</th><th>Description</th><th>Language</th></tr>";
  const rows = data.projects
    .map((project) => {
      const language = project.language ? escapeHtml(project.language) : "not specified";
      const stars = withStars ? `<td>${project.stars !== undefined ? project.stars : "not specified"}</td>` : "";
      return `<tr><td><a href="${escapeHtml(project.url)}">${escapeHtml(project.name)}</a></td><td>${escapeHtml(project.description)}</td><td>${language}</td>${stars}</tr>`;
    })
    .join("\n");
  return `<h2>Projects</h2>\n<table>\n<thead>${head}</thead>\n<tbody>\n${rows}\n</tbody>\n</table>`;
}

function renderComponent(name, template, data, tokens, assets) {
  if (name === "banner") {
    for (const mode of ["light", "dark"]) {
      assets.push({
        path: `assets/banner-${mode}.svg`,
        contents: bannerSvg({
          tokens,
          themeName: template.theme,
          mode,
          style: template.banner,
          name: data.name,
          role: data.role,
        }),
      });
    }
    const roleText = data.role && data.role !== "{{role}}" ? `, ${data.role}` : "";
    const alt = escapeHtml(`Banner: ${data.name}${roleText}`);
    return `<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./assets/banner-dark.svg" />
  <source media="(prefers-color-scheme: light)" srcset="./assets/banner-light.svg" />
  <img alt="${alt}" src="./assets/banner-light.svg" />
</picture>`;
  }
  if (name === "identity") {
    const lines = [`<h1>${escapeHtml(data.name)}</h1>`];
    if (data.role) lines.push(paragraph(data.role));
    else lines.push(omitted("role", "missing field"));
    if (data.organization) lines.push(paragraph(data.organization));
    else lines.push(omitted("organization", "missing field"));
    if (data.location) lines.push(paragraph(data.location));
    else lines.push(omitted("location", "missing field"));
    return lines.join("\n");
  }
  if (name === "metrics") {
    if (!data.metrics || data.metrics.length === 0) return omitted("metrics", "empty or missing list");
    const width = `${Math.floor(100 / data.metrics.length)}%`;
    const cells = data.metrics
      .map((m) => {
        const detail = m.detail ? `<br/><small>${escapeHtml(m.detail)}</small>` : "";
        return `    <td width="${width}" align="center">\n      <h4>${escapeHtml(m.value)}</h4>\n      <p><strong>${escapeHtml(m.label)}</strong>${detail}</p>\n    </td>`;
      })
      .join("\n");
    return `<table width="100%">\n<tbody>\n  <tr>\n${cells}\n  </tr>\n</tbody>\n</table>`;
  }
  if (name === "prose") {
    if (!data.summary && !data.focus) return omitted("prose", "summary and focus missing");
    const lines = ["<h2>Overview</h2>"];
    if (data.summary) lines.push(paragraph(data.summary));
    if (data.focus) lines.push(paragraph(data.focus));
    return lines.join("\n");
  }
  if (name === "projects") return renderProjects(template, data);
  if (name === "stack") {
    if (!data.stack || data.stack.length === 0) return omitted("stack", "empty or missing list");
    const groups = data.stack
      .map((group) => `<li><strong>${escapeHtml(group.name)}</strong> — ${group.items.map((item) => escapeHtml(item)).join(", ")}</li>`)
      .join("\n");
    return `<h2>Stack</h2>\n<ul>\n${groups}\n</ul>`;
  }
  if (name === "tech-badges") {
    let items = [];
    if (Array.isArray(data.badges) && data.badges.length > 0) {
      items = data.badges;
    } else if (Array.isArray(data.stack)) {
      for (const group of data.stack) {
        if (Array.isArray(group.items)) items.push(...group.items);
      }
    }
    const unique = Array.from(new Set(items));
    if (unique.length === 0) return omitted("tech-badges", "empty or missing stack/badges");

    for (const mode of ["light", "dark"]) {
      assets.push({
        path: `assets/tech-badges-${mode}.svg`,
        contents: techBadgesSvg({
          tokens,
          themeName: template.theme,
          mode,
          items: unique,
          title: `Tech Badges: ${data.name || "Developer"}`,
        }),
      });
    }

    const altText = escapeHtml(`Tech Stack: ${unique.slice(0, 8).join(", ")}`);
    return `<h2>Technologies</h2>\n<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./assets/tech-badges-dark.svg" />
  <source media="(prefers-color-scheme: light)" srcset="./assets/tech-badges-light.svg" />
  <img alt="${altText}" src="./assets/tech-badges-light.svg" />
</picture>`;
  }
  if (name === "publications") {
    if (!data.publications || data.publications.length === 0) return omitted("publications", "empty or missing list");
    const rows = data.publications
      .map((item) => `<tr><td>${escapeHtml(item.year)}</td><td><a href="${escapeHtml(item.url)}">${escapeHtml(item.title)}</a></td><td>${escapeHtml(item.venue)}</td></tr>`)
      .join("\n");
    return `<h2>Publications</h2>\n<table>\n<thead><tr><th>Year</th><th>Title</th><th>Venue</th></tr></thead>\n<tbody>\n${rows}\n</tbody>\n</table>`;
  }
  if (name === "timeline") {
    if (!data.timeline || data.timeline.length === 0) return omitted("timeline", "empty or missing list");
    const items = data.timeline
      .map((item) => `<li><strong>${escapeHtml(item.period)}</strong> — ${escapeHtml(item.title)}<br/>${escapeHtml(item.detail)}</li>`)
      .join("\n");
    return `<h2>Timeline</h2>\n<ul>\n${items}\n</ul>`;
  }
  if (name === "checklist") {
    if (!data.checklist || data.checklist.length === 0) return omitted("checklist", "empty or missing list");
    const statusLabel = { done: "done", fait: "done", in_progress: "in progress", encours: "in progress", planned: "planned", prevu: "planned" };
    const items = data.checklist
      .map((item) => `<li><strong>${statusLabel[item.status]}</strong> — ${escapeHtml(item.label)}</li>`)
      .join("\n");
    return `<h2>Roadmap</h2>\n<ul>\n${items}\n</ul>`;
  }
  if (name === "pitch") {
    if (!data.pitch) return omitted("pitch", "missing block");
    return `<h2>Pitch</h2>\n${paragraph(data.pitch.problem)}\n${paragraph(data.pitch.offer)}\n${paragraph(data.pitch.proof)}`;
  }
  if (name === "principles") {
    if (!data.principles || data.principles.length === 0) return omitted("principles", "empty or missing list");
    const items = data.principles.map((item) => `<li>${escapeHtml(item)}</li>`).join("\n");
    return `<h2>Principles</h2>\n<ul>\n${items}\n</ul>`;
  }
  if (name === "links") {
    if (!data.links || data.links.length === 0) return omitted("links", "empty or missing list");
    const parts = data.links.map((item) => `<a href="${escapeHtml(item.url)}">${escapeHtml(item.label)}</a>`);
    return `<h2>Links</h2>\n<p>${parts.join(" · ")}</p>`;
  }
  if (name === "colophon") {
    return `<p><sub>Profile generated by ReadMy ${escapeHtml(template.id)} ${escapeHtml(template.version)}. Local SVG assets, zero third-party services.</sub></p>`;
  }
  fail("UNKNOWN_COMPONENT", name);
}

export function renderTemplate(templateInput, profileInput, tokens, registry) {
  const template = normalizeTemplate(templateInput, registry);
  if (!tokens.themes[template.theme]) fail("UNKNOWN_THEME", template.theme);
  const data = normalizeProfile(profileInput, template);
  const assets = [];
  const used = template.components.map((name) => `${name}@${registry.components[name].version}`);
  const parts = template.components.map((name) => renderComponent(name, template, data, tokens, assets));
  const markdown = `<!-- readmy:template=${template.id};version=${template.version};components=${used.join(",")} -->\n\n${parts.join("\n\n")}\n`;
  return { markdown, assets, template, data };
}
