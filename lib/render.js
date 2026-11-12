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
  "layout",
  "identity_variant",
  "metrics_variant",
  "prose_variant",
  "projects_variant",
  "stack_variant",
  "publications_variant",
  "timeline_variant",
  "checklist_variant",
  "pitch_variant",
  "principles_variant",
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
  const layout = template.layout ? text("layout", template.layout, { required: false, max: 40 }) : null;
  const identity_variant = template.identity_variant ? text("identity_variant", template.identity_variant, { required: false, max: 40 }) : null;
  const metrics_variant = template.metrics_variant ? text("metrics_variant", template.metrics_variant, { required: false, max: 40 }) : null;
  const prose_variant = template.prose_variant ? text("prose_variant", template.prose_variant, { required: false, max: 40 }) : null;
  const projects_variant = template.projects_variant ? text("projects_variant", template.projects_variant, { required: false, max: 40 }) : null;
  const stack_variant = template.stack_variant ? text("stack_variant", template.stack_variant, { required: false, max: 40 }) : null;
  const publications_variant = template.publications_variant ? text("publications_variant", template.publications_variant, { required: false, max: 40 }) : null;
  const timeline_variant = template.timeline_variant ? text("timeline_variant", template.timeline_variant, { required: false, max: 40 }) : null;
  const checklist_variant = template.checklist_variant ? text("checklist_variant", template.checklist_variant, { required: false, max: 40 }) : null;
  const pitch_variant = template.pitch_variant ? text("pitch_variant", template.pitch_variant, { required: false, max: 40 }) : null;
  const principles_variant = template.principles_variant ? text("principles_variant", template.principles_variant, { required: false, max: 40 }) : null;

  return {
    id,
    version,
    title,
    summary,
    audiences,
    theme,
    banner,
    projects,
    components,
    requires,
    layout,
    identity_variant,
    metrics_variant,
    prose_variant,
    projects_variant,
    stack_variant,
    publications_variant,
    timeline_variant,
    checklist_variant,
    pitch_variant,
    principles_variant,
  };
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

// =============================================================================
// PROJECTS COMPONENT VARIANTS
// =============================================================================

function renderProjectsRpg(template, data) {
  const rows = [];
  for (let i = 0; i < data.projects.length; i += 2) {
    const p1 = data.projects[i];
    const p2 = data.projects[i + 1];
    const lang1 = p1.language ? ` · <code>${escapeHtml(p1.language)}</code>` : "";
    const stars1 = p1.stars !== undefined ? ` · ★ ${p1.stars} Gold` : "";
    const c1 = `    <td width="50%" valign="top">
      <h3>⚔️ <a href="${escapeHtml(p1.url)}">${escapeHtml(p1.name)}</a></h3>
      <p><b>[Relic / Spell]</b> ${escapeHtml(p1.description)}</p>
      <p><sub>${lang1}${stars1}</sub></p>
    </td>`;
    let c2 = "";
    if (p2) {
      const lang2 = p2.language ? ` · <code>${escapeHtml(p2.language)}</code>` : "";
      const stars2 = p2.stars !== undefined ? ` · ★ ${p2.stars} Gold` : "";
      c2 = `    <td width="50%" valign="top">
      <h3>🔮 <a href="${escapeHtml(p2.url)}">${escapeHtml(p2.name)}</a></h3>
      <p><b>[Ancient Tome]</b> ${escapeHtml(p2.description)}</p>
      <p><sub>${lang2}${stars2}</sub></p>
    </td>`;
    } else {
      c2 = `    <td width="50%" valign="top"></td>`;
    }
    rows.push(`  <tr>\n${c1}\n${c2}\n  </tr>`);
  }
  return `<h2>Grimoire of Spells &amp; Legendary Relics</h2>\n<table width="100%">\n<tbody>\n${rows.join("\n")}\n</tbody>\n</table>`;
}

function renderProjectsRootkit(template, data) {
  const rows = [];
  for (let i = 0; i < data.projects.length; i += 2) {
    const p1 = data.projects[i];
    const p2 = data.projects[i + 1];
    const lang1 = p1.language ? ` · <code>${escapeHtml(p1.language)}</code>` : "";
    const stars1 = p1.stars !== undefined ? ` · ★ ${p1.stars}` : "";
    const c1 = `    <td width="50%" valign="top">
      <h3><code>[ROOTKIT]</code> <a href="${escapeHtml(p1.url)}">${escapeHtml(p1.name)}</a></h3>
      <blockquote>${escapeHtml(p1.description)}</blockquote>
      <p><sub>${lang1}${stars1} · <code>DEFCON_TALK_VERIFIED</code></sub></p>
    </td>`;
    let c2 = "";
    if (p2) {
      const lang2 = p2.language ? ` · <code>${escapeHtml(p2.language)}</code>` : "";
      const stars2 = p2.stars !== undefined ? ` · ★ ${p2.stars}` : "";
      c2 = `    <td width="50%" valign="top">
      <h3><code>[DAEMON]</code> <a href="${escapeHtml(p2.url)}">${escapeHtml(p2.name)}</a></h3>
      <blockquote>${escapeHtml(p2.description)}</blockquote>
      <p><sub>${lang2}${stars2} · <code>HARDWARE_VERIFIED</code></sub></p>
    </td>`;
    } else {
      c2 = `    <td width="50%" valign="top"></td>`;
    }
    rows.push(`  <tr>\n${c1}\n${c2}\n  </tr>`);
  }
  return `<h2>Exploits &amp; System Penetrations</h2>\n<table width="100%">\n<tbody>\n${rows.join("\n")}\n</tbody>\n</table>`;
}

function renderProjectsSre(template, data) {
  const rows = [];
  for (let i = 0; i < data.projects.length; i += 2) {
    const p1 = data.projects[i];
    const p2 = data.projects[i + 1];
    const lang1 = p1.language ? ` · <code>${escapeHtml(p1.language)}</code>` : "";
    const stars1 = p1.stars !== undefined ? ` · ★ ${p1.stars}` : "";
    const c1 = `    <td width="50%" valign="top">
      <h3>🛡️ <a href="${escapeHtml(p1.url)}">${escapeHtml(p1.name)}</a></h3>
      <p>${escapeHtml(p1.description)}</p>
      <p><sub><code>10M pps filtered</code>${lang1}${stars1}</sub></p>
    </td>`;
    let c2 = "";
    if (p2) {
      const lang2 = p2.language ? ` · <code>${escapeHtml(p2.language)}</code>` : "";
      const stars2 = p2.stars !== undefined ? ` · ★ ${p2.stars}` : "";
      c2 = `    <td width="50%" valign="top">
      <h3>⚡ <a href="${escapeHtml(p2.url)}">${escapeHtml(p2.name)}</a></h3>
      <p>${escapeHtml(p2.description)}</p>
      <p><sub><code>4.5k QPS commit rate</code>${lang2}${stars2}</sub></p>
    </td>`;
    } else {
      c2 = `    <td width="50%" valign="top"></td>`;
    }
    rows.push(`  <tr>\n${c1}\n${c2}\n  </tr>`);
  }
  return `<h2>Distributed Engines in Production</h2>\n<table width="100%">\n<tbody>\n${rows.join("\n")}\n</tbody>\n</table>`;
}

function renderProjectsCreator(template, data) {
  const rows = [];
  for (let i = 0; i < data.projects.length; i += 2) {
    const p1 = data.projects[i];
    const p2 = data.projects[i + 1];
    const lang1 = p1.language ? ` · <code>${escapeHtml(p1.language)}</code>` : "";
    const stars1 = p1.stars !== undefined ? ` · ★ ${p1.stars}` : "";
    const c1 = `    <td width="50%" valign="top">
      <h3>✦ <a href="${escapeHtml(p1.url)}">${escapeHtml(p1.name)}</a></h3>
      <p>${escapeHtml(p1.description)}</p>
      <p><sub><kbd>View Live Demo</kbd>${lang1}${stars1}</sub></p>
    </td>`;
    let c2 = "";
    if (p2) {
      const lang2 = p2.language ? ` · <code>${escapeHtml(p2.language)}</code>` : "";
      const stars2 = p2.stars !== undefined ? ` · ★ ${p2.stars}` : "";
      c2 = `    <td width="50%" valign="top">
      <h3>✦ <a href="${escapeHtml(p2.url)}">${escapeHtml(p2.name)}</a></h3>
      <p>${escapeHtml(p2.description)}</p>
      <p><sub><kbd>Interactive Preview</kbd>${lang2}${stars2}</sub></p>
    </td>`;
    } else {
      c2 = `    <td width="50%" valign="top"></td>`;
    }
    rows.push(`  <tr>\n${c1}\n${c2}\n  </tr>`);
  }
  return `<h2>Selected Digital Works</h2>\n<table width="100%">\n<tbody>\n${rows.join("\n")}\n</tbody>\n</table>`;
}

function renderProjectsMaintainer(template, data) {
  const rows = data.projects
    .map((p, idx) => {
      const policy = idx === 0 ? "PR Reviews within 48h" : "Zero breaking changes";
      const status = "🟢 ACTIVE";
      const role = idx === 0 ? "Lead Maintainer" : "Author / Owner";
      const stars = p.stars !== undefined ? `★ ${p.stars}` : "not specified";
      return `  <tr><td><strong><a href="${escapeHtml(p.url)}">${escapeHtml(p.name)}</a></strong></td><td><code>${role}</code></td><td>${stars}</td><td>${policy}</td><td align="center">${status}</td></tr>`;
    })
    .join("\n");
  return `<h2>Open Source Repository Triage &amp; Governance</h2>\n<table width="100%">\n<thead><tr><th>Repository</th><th>Role</th><th>Stars</th><th>Triage Policy</th><th>Status</th></tr></thead>\n<tbody>\n${rows}\n</tbody>\n</table>`;
}

function renderProjectsFrontend(template, data) {
  const rows = [];
  if (data.projects.length > 0) {
    const p1 = data.projects[0];
    const p2 = data.projects[1];
    const lang1 = p1.language ? `<kbd>${escapeHtml(p1.language)}</kbd>` : "";
    const stars1 = p1.stars !== undefined ? ` · ★ ${p1.stars}` : "";
    const row1 = `  <tr>
    <td width="60%" rowspan="2" valign="top">
      <h3>🎨 <a href="${escapeHtml(p1.url)}">${escapeHtml(p1.name)}</a></h3>
      <p>${escapeHtml(p1.description)}</p>
      <p>${lang1} <kbd>Design Tokens</kbd> <kbd>WAI-ARIA</kbd><br/><sub>${stars1} · 100% Core Web Vitals compliant</sub></p>
    </td>
    <td width="40%" valign="top">
      <h4>⚡ Core Web Vitals</h4>
      <code>LCP: 0.6s  [GOOD]</code><br/>
      <code>INP: 24ms  [GOOD]</code><br/>
      <code>CLS: 0.001 [GOOD]</code>
    </td>
  </tr>
  <tr>
    <td width="40%" valign="top">
      <h4>🧪 Token Pipeline</h4>
      <code>Style Dictionary 4.0</code><br/>
      <code>OKLCH Color Palettes</code><br/>
      <code>Fluid Type Clamps</code>
    </td>
  </tr>`;
    rows.push(row1);
    if (p2) {
      const lang2 = p2.language ? `<kbd>${escapeHtml(p2.language)}</kbd>` : "";
      const stars2 = p2.stars !== undefined ? ` · ★ ${p2.stars}` : "";
      const row2 = `  <tr>
    <td colspan="2" valign="top">
      <h3>🚀 <a href="${escapeHtml(p2.url)}">${escapeHtml(p2.name)}</a></h3>
      <p>${escapeHtml(p2.description)}</p>
      <p>${lang2} <kbd>Headless UI</kbd>${stars2}</p>
    </td>
  </tr>`;
      rows.push(row2);
    }
  }
  return `<h2>Bento Architecture &amp; Component Systems</h2>\n<table width="100%">\n<tbody>\n${rows.join("\n")}\n</tbody>\n</table>`;
}

function renderProjectsList(template, data) {
  const items = data.projects
    .map((project) => {
      const language = project.language ? ` · ${escapeHtml(project.language)}` : "";
      const stars = project.stars !== undefined ? ` · ${project.stars} stars` : "";
      return `<li><a href="${escapeHtml(project.url)}">${escapeHtml(project.name)}</a> — ${escapeHtml(project.description)}${language}${stars}</li>`;
    })
    .join("\n");
  return `<h2>Projects</h2>\n<ul>\n${items}\n</ul>`;
}

function renderProjectsCards(template, data) {
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

function renderProjectsTable(template, data) {
  const withStars = data.projects.some((project) => project.stars !== undefined);
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

const TEMPLATE_PROJECT_VARIANTS = {
  "033-dungeon-rpg-character-sheet": "rpg",
  "031-cyberpunk-netrunner": "rootkit",
  "014-neon-command-center": "sre",
  creator: "creator",
  maintainer: "maintainer",
  "005-frontend-developer": "frontend",
};

const PROJECTS_VARIANTS = {
  rpg: renderProjectsRpg,
  rootkit: renderProjectsRootkit,
  sre: renderProjectsSre,
  creator: renderProjectsCreator,
  maintainer: renderProjectsMaintainer,
  frontend: renderProjectsFrontend,
  cards: renderProjectsCards,
  list: renderProjectsList,
  table: renderProjectsTable,
};

function renderProjects(template, data) {
  if (!data.projects || data.projects.length === 0) return omitted("projects", "empty or missing list");
  const variantKey = template.projects_variant || TEMPLATE_PROJECT_VARIANTS[template.id] || template.projects || "table";
  const renderFn = PROJECTS_VARIANTS[variantKey] || PROJECTS_VARIANTS[template.projects] || renderProjectsTable;
  return renderFn(template, data);
}

// =============================================================================
// IDENTITY COMPONENT VARIANTS
// =============================================================================

function renderIdentityNetrunner(template, data) {
  return `<table width="100%">
<tbody>
  <tr>
    <td width="70%">
      <code>╔═══════════════════════════════════════════════════════════╗</code><br/>
      <code>║ NODE : ${escapeHtml(data.name)}            [DECK STATUS: ONLINE]   ║</code><br/>
      <code>║ CLASS: ${escapeHtml(data.role || "OFFENSIVE CYBERWARE ARCHITECT")}    ║</code><br/>
      <code>╚═══════════════════════════════════════════════════════════╝</code>
    </td>
    <td width="30%" align="right">
      <code>SIGNAL: 99.8% [SYNC]</code><br/>
      <code>NEURAL LINK: LOCKED</code><br/>
      <code>ICE STATUS: BREACHED</code>
    </td>
  </tr>
</tbody>
</table>
<h1>${escapeHtml(data.name)}</h1>
<p>${escapeHtml(data.role || "")}</p>`;
}

function renderIdentityRpg(template, data) {
  return `<pre><code>┌─────────────────────────────────────────────────────────────────────────────┐
│ CHARACTER: ${escapeHtml(data.name.toUpperCase())}              CLASS: LEVEL 80 ARCHMAGE │
│ RACE: OPEN-SOURCE GNOME                           ALIGNMENT: CHAOTIC LAWFUL │
│ HP: [████████████████████░░░░] 85/100             MANA: [████████████████████] 100/100 │
└─────────────────────────────────────────────────────────────────────────────┘</code></pre>
<h1>${escapeHtml(data.name)}</h1>
<p>${escapeHtml(data.role || "")}</p>`;
}

function renderIdentityFintech(template, data) {
  return `<pre><code>================================================================================
ACCOUNT AUDIT SPECIFICATION: LEDGER-FINTECH-V2
COMPLIANCE: SOC2 TYPE II · PCI-DSS LEVEL 1 · ISO 27001
SETTLEMENT TOLERANCE: ZERO FLOATING-POINT ERRORS (INTEGER-ONLY PRECISION)
================================================================================</code></pre>
<h1>${escapeHtml(data.name)}</h1>
<p>${escapeHtml(data.role || "")}</p>`;
}

function renderIdentityTerminal(template, data) {
  return `<pre><code>$ whoami
${escapeHtml(data.name)}

$ uptime
up 842 days, 14:02, 1 user, load average: 0.12, 0.08, 0.05

$ cat ~/.profile
NAME="${escapeHtml(data.name)}"
ROLE="${escapeHtml(data.role || "")}"
SHELL="/bin/zsh"</code></pre>
<h1>${escapeHtml(data.name)}</h1>
<p>${escapeHtml(data.role || "")}</p>`;
}

function renderIdentityEditorial(template, data) {
  return `<div align="center">
<h1>${escapeHtml(data.name)}</h1>
<p><em>THE TECHNICAL DISPATCH · VOL. IV · ${escapeHtml(data.role || "")}</em></p>
<hr width="30%"/>
</div>`;
}

function renderIdentityAcademic(template, data) {
  const lines = [
    `<h1>${escapeHtml(data.name)}</h1>`,
    `<p><strong>${escapeHtml(data.role || "")}</strong><br/><em>Laboratory for Scalable Computing</em></p>`,
  ];
  if (data.organization) lines.push(paragraph(data.organization));
  if (data.location) lines.push(paragraph(data.location));
  return lines.join("\n");
}

function renderIdentitySecurity(template, data) {
  return `<h1>${escapeHtml(data.name)}</h1>
<p>🛡️ Defensive Engineering &amp; Infrastructure Hardening</p>`;
}

function renderIdentityMinimal(template, data) {
  const lines = [`<h1>${escapeHtml(data.name)}</h1>`];
  if (data.role) lines.push(paragraph(data.role));
  else lines.push(omitted("role", "missing field"));
  if (data.organization) lines.push(paragraph(data.organization));
  else lines.push(omitted("organization", "missing field"));
  if (data.location) lines.push(paragraph(data.location));
  else lines.push(omitted("location", "missing field"));
  lines.push("<hr/>");
  return lines.join("\n");
}

function renderIdentityDefault(template, data) {
  const lines = [`<h1>${escapeHtml(data.name)}</h1>`];
  if (data.role) lines.push(paragraph(data.role));
  else lines.push(omitted("role", "missing field"));
  if (data.organization) lines.push(paragraph(data.organization));
  else lines.push(omitted("organization", "missing field"));
  if (data.location) lines.push(paragraph(data.location));
  else lines.push(omitted("location", "missing field"));
  return lines.join("\n");
}

const TEMPLATE_IDENTITY_VARIANTS = {
  "031-cyberpunk-netrunner": "netrunner",
  "033-dungeon-rpg-character-sheet": "rpg",
  "036-fintech-saas-builder": "fintech",
  terminal: "terminal",
  "013-magazine-editorial": "editorial",
  academic: "academic",
  security: "security",
  minimal: "minimal",
};

const IDENTITY_VARIANTS = {
  netrunner: renderIdentityNetrunner,
  rpg: renderIdentityRpg,
  fintech: renderIdentityFintech,
  terminal: renderIdentityTerminal,
  editorial: renderIdentityEditorial,
  academic: renderIdentityAcademic,
  security: renderIdentitySecurity,
  minimal: renderIdentityMinimal,
  default: renderIdentityDefault,
};

function renderIdentity(template, data) {
  const variantKey = template.identity_variant || TEMPLATE_IDENTITY_VARIANTS[template.id] || "default";
  const renderFn = IDENTITY_VARIANTS[variantKey] || IDENTITY_VARIANTS.default;
  return renderFn(template, data);
}

// =============================================================================
// METRICS COMPONENT VARIANTS
// =============================================================================

function renderMetricsSre(template, data) {
  const width = `${Math.floor(100 / data.metrics.length)}%`;
  const cells = data.metrics
    .map((m) => {
      const detail = m.detail ? `<br/><small>${escapeHtml(m.detail)}</small>` : "";
      return `    <td width="${width}" align="center">\n      <code>${escapeHtml(m.label).toUpperCase()}</code><br/>\n      <h4>${escapeHtml(m.value)}</h4>\n      <p><strong>${escapeHtml(m.label)}</strong>${detail}</p>\n    </td>`;
    })
    .join("\n");
  return `<table width="100%">\n<tbody>\n  <tr>\n${cells}\n  </tr>\n</tbody>\n</table>\n\n<pre><code>SYSTEM INTEGRITY MONITOR:\n[████████████████████████████████████████████████] 100% HEALTHY\nPOLICIES: ZERO-TOIL · AUTO-DRAIN · SEV-1 AUTO-TRIAGE · CHAOS-ENGINEERED</code></pre>`;
}

function renderMetricsRpg(template, data) {
  const statLabels = ["STR (RAM)", "DEX (Latency)", "CON (Uptime)", "INT (Algorithms)", "WIS (Arch)", "CHA (OpenSource)"];
  const cells = data.metrics
    .map((m, idx) => {
      const statLabel = statLabels[idx] || escapeHtml(m.label);
      return `    <td align="center">\n      <b>${escapeHtml(m.value)}</b><br/>\n      <small>${statLabel}</small>\n    </td>`;
    })
    .join("\n");
  const headers = data.metrics
    .map((m, idx) => `<th align="center">${statLabels[idx] || escapeHtml(m.label)}</th>`)
    .join("");
  return `<h2>Ability Scores &amp; Character Stats</h2>\n<table width="100%">\n<thead><tr>${headers}</tr></thead>\n<tbody>\n  <tr>\n${cells}\n  </tr>\n</tbody>\n</table>`;
}

function renderMetricsKpi(template, data) {
  const width = `${Math.floor(100 / data.metrics.length)}%`;
  const cells = data.metrics
    .map((m) => {
      const detail = m.detail ? `<br/><small>${escapeHtml(m.detail)}</small>` : "";
      return `    <td width="${width}" align="center">\n      <code>${escapeHtml(m.label).toUpperCase()}</code><br/>\n      <h4>${escapeHtml(m.value)}</h4>\n      <p><strong>${escapeHtml(m.label)}</strong>${detail}</p>\n    </td>`;
    })
    .join("\n");
  return `<table width="100%">\n<tbody>\n  <tr>\n${cells}\n  </tr>\n</tbody>\n</table>`;
}

function renderMetricsDefault(template, data) {
  const width = `${Math.floor(100 / data.metrics.length)}%`;
  const cells = data.metrics
    .map((m) => {
      const detail = m.detail ? `<br/><small>${escapeHtml(m.detail)}</small>` : "";
      return `    <td width="${width}" align="center">\n      <h4>${escapeHtml(m.value)}</h4>\n      <p><strong>${escapeHtml(m.label)}</strong>${detail}</p>\n    </td>`;
    })
    .join("\n");
  return `<table width="100%">\n<tbody>\n  <tr>\n${cells}\n  </tr>\n</tbody>\n</table>`;
}

const TEMPLATE_METRICS_VARIANTS = {
  "014-neon-command-center": "sre",
  "033-dungeon-rpg-character-sheet": "rpg",
  "024-pitch-deck": "kpi",
  "004-mobile-developer": "kpi",
  "036-fintech-saas-builder": "kpi",
};

const METRICS_VARIANTS = {
  sre: renderMetricsSre,
  rpg: renderMetricsRpg,
  kpi: renderMetricsKpi,
  default: renderMetricsDefault,
};

function renderMetrics(template, data) {
  if (!data.metrics || data.metrics.length === 0) return omitted("metrics", "empty or missing list");
  const variantKey = template.metrics_variant || TEMPLATE_METRICS_VARIANTS[template.id] || "default";
  const renderFn = METRICS_VARIANTS[variantKey] || METRICS_VARIANTS.default;
  return renderFn(template, data);
}

// =============================================================================
// PROSE COMPONENT VARIANTS
// =============================================================================

function renderProseAiPipeline(template, data) {
  const lines = [
    `<h2>Architecture &amp; Inference Pipeline</h2>`,
    `<pre><code>[PROMPT] ──▶ [Speculative Draft (1.2B)] ──▶ [Target Model (70B FP8)] ──▶ [vLLM Token Stream]\n                       │                              │\n                       ▼                              ▼\n                 H100 SRAM Hit                 Paged KV-Cache</code></pre>`,
    `<h2>Overview</h2>`,
  ];
  if (data.summary) lines.push(paragraph(data.summary));
  if (data.focus) lines.push(paragraph(data.focus));
  return lines.join("\n");
}

function renderProseStreamTopology(template, data) {
  const lines = [
    `<h2>Stream Architecture &amp; Topologies</h2>`,
    `<pre><code>STREAM TOPOLOGY:\n[IoT Edge Producers] ──▶ [Kafka Cluster (35 Partitions)] ──▶ [Flink Stateful Job] ──▶ [ClickHouse OLAP]\n                                                                        │\n                                                                        └──▶ [Prometheus Alerts]</code></pre>`,
    `<h2>Overview</h2>`,
  ];
  if (data.summary) lines.push(paragraph(data.summary));
  if (data.focus) lines.push(paragraph(data.focus));
  return lines.join("\n");
}

function renderProseSynthRack(template, data) {
  const lines = [
    `<h2>Eurorack Modular Signal Chain (19" Rack 3U 84HP)</h2>`,
    `<pre><code>[OSC 1: Sawtooth] ──▶ [Ladder Filter 24dB] ──▶ [VCA / ADSR] ──▶ [Stereo Delay] ──▶ OUT L/R\n       ◎ FREQ                  ◎ CUTOFF               ◎ LEVEL           ◎ FEEDBACK\n      [○] V/OCT               [○] CV IN              [○] GATE          [○] SYNC IN</code></pre>`,
    `<h2>Overview</h2>`,
  ];
  if (data.summary) lines.push(paragraph(data.summary));
  if (data.focus) lines.push(paragraph(data.focus));
  return lines.join("\n");
}

function renderProseAdvisoryMatrix(template, data) {
  const lines = [
    `<h2>Security Advisory Matrix</h2>`,
    `<table width="100%">\n<thead><tr><th>Advisory ID</th><th>Target Subsystem</th><th>Severity</th></tr></thead>\n<tbody>\n  <tr><td><code>CVE-2025-4412</code></td><td>Hypervisor VM Escape via MMIO Emulation</td><td><strong>9.8 CRITICAL</strong></td></tr>\n  <tr><td><code>CVE-2025-1889</code></td><td>Side-channel Key Leakage in Elliptic Primitives</td><td><strong>7.5 HIGH</strong></td></tr>\n  <tr><td><code>LAB-2026-001</code></td><td>Speculative Store Bypass in RISC-V SoC</td><td><strong>8.1 HIGH</strong></td></tr>\n</tbody>\n</table>`,
    `<h2>Overview</h2>`,
  ];
  if (data.summary) lines.push(paragraph(data.summary));
  if (data.focus) lines.push(paragraph(data.focus));
  return lines.join("\n");
}

function renderProseComplianceLedger(template, data) {
  const lines = [
    `<h2>Defensive Posture &amp; Compliance Ledger</h2>`,
    `<table width="100%">\n<thead><tr><th>Control Layer</th><th>Standard Specification</th><th>Operational Status</th></tr></thead>\n<tbody>\n  <tr><td><strong>Identity &amp; Access</strong></td><td>SPIFFE/SPIRE · OIDC Attestation</td><td><code>ENFORCED (100% MFA)</code></td></tr>\n  <tr><td><strong>Compute Hardening</strong></td><td>CIS Benchmark Level 2 · SELinux Enforcing</td><td><code>COMPLIANT</code></td></tr>\n  <tr><td><strong>Supply Chain</strong></td><td>SLSA Level 3 · Cosign Signed Artifacts</td><td><code>ACTIVE</code></td></tr>\n</tbody>\n</table>`,
    `<h2>Overview</h2>`,
  ];
  if (data.summary) lines.push(paragraph(data.summary));
  if (data.focus) lines.push(paragraph(data.focus));
  return lines.join("\n");
}

function renderProseTechSpec(template, data) {
  const lines = [
    `<h2>Technical Specification &amp; Production Ledger</h2>`,
    `<table width="100%">\n<thead><tr><th>Subsystem</th><th>Specification</th><th>Tolerance / Budget</th></tr></thead>\n<tbody>\n  <tr><td><strong>Execution Runtime</strong></td><td>Go 1.23, Rust 2024, Linux Kernel 6.8</td><td>Zero Panic Policy</td></tr>\n  <tr><td><strong>Availability Target</strong></td><td>99.99% Annual Production Uptime</td><td>52.6 min Error Budget</td></tr>\n  <tr><td><strong>Concurrency Model</strong></td><td>Lock-free Ring Buffers, Epoll Event Loop</td><td>Zero-allocation Hot Paths</td></tr>\n</tbody>\n</table>`,
    `<h2>Overview</h2>`,
  ];
  if (data.summary) lines.push(paragraph(data.summary));
  if (data.focus) lines.push(paragraph(data.focus));
  return lines.join("\n");
}

function renderProseEditorial(template, data) {
  const lines = [
    `<h2>Editorial Dispatch</h2>`,
    `<blockquote>${escapeHtml(data.summary || "")}</blockquote>`,
  ];
  if (data.focus) lines.push(`<p><em>${escapeHtml(data.focus)}</em></p>`);
  lines.push(`<div align="center">⁂</div>`);
  return lines.join("\n");
}

function renderProseNetrunner(template, data) {
  const lines = [
    `<h2>Deck Initialization &amp; Vectors</h2>`,
    `<blockquote>${escapeHtml(data.summary || "")}</blockquote>`,
  ];
  if (data.focus) lines.push(`<p><code>&gt;&gt; VECTORS:</code> ${escapeHtml(data.focus)}</p>`);
  return lines.join("\n");
}

function renderProseDefault(template, data) {
  const lines = ["<h2>Overview</h2>"];
  if (data.summary) lines.push(paragraph(data.summary));
  if (data.focus) lines.push(paragraph(data.focus));
  return lines.join("\n");
}

const TEMPLATE_PROSE_VARIANTS = {
  "003-ai-engineer": "ai-pipeline",
  "016-data-dashboard": "stream-topology",
  "034-audio-synth-rack": "synth-rack",
  "025-security-lab": "advisory-matrix",
  security: "compliance-ledger",
  engineer: "tech-spec",
  "013-magazine-editorial": "editorial",
  "031-cyberpunk-netrunner": "netrunner",
};

const PROSE_VARIANTS = {
  "ai-pipeline": renderProseAiPipeline,
  "stream-topology": renderProseStreamTopology,
  "synth-rack": renderProseSynthRack,
  "advisory-matrix": renderProseAdvisoryMatrix,
  "compliance-ledger": renderProseComplianceLedger,
  "tech-spec": renderProseTechSpec,
  editorial: renderProseEditorial,
  netrunner: renderProseNetrunner,
  default: renderProseDefault,
};

function renderProse(template, data) {
  if (!data.summary && !data.focus) return omitted("prose", "summary and focus missing");
  const variantKey = template.prose_variant || TEMPLATE_PROSE_VARIANTS[template.id] || "default";
  const renderFn = PROSE_VARIANTS[variantKey] || PROSE_VARIANTS.default;
  return renderFn(template, data);
}

// =============================================================================
// STACK COMPONENT VARIANTS
// =============================================================================

function renderStackTerminal(template, data) {
  const lines = data.stack.map((group) => `${group.name}: ${group.items.join(", ")}`);
  return `<h2>Stack</h2>\n<pre><code>$ echo $TECH_STACK\n${escapeHtml(lines.join("\n"))}</code></pre>`;
}

function renderStackNetrunner(template, data) {
  const g1 = data.stack[0] || { name: "Hardware Interface", items: [] };
  const g2 = data.stack[1] || { name: "Reverse Engineering Deck", items: [] };
  return `<h2>Cyberware &amp; Arsenal</h2>\n<table width="100%">\n<thead><tr><th align="left">${escapeHtml(g1.name)}</th><th align="left">${escapeHtml(g2.name)}</th></tr></thead>\n<tbody>\n  <tr>\n    <td valign="top">${g1.items.map((i) => `<code>${escapeHtml(i)}</code>`).join(" · ")}</td>\n    <td valign="top">${g2.items.map((i) => `<code>${escapeHtml(i)}</code>`).join(" · ")}</td>\n  </tr>\n</tbody>\n</table>`;
}

function renderStackMobileMatrix(template, data) {
  return `<h2>Native Mobile Engineering Matrix</h2>\n<table width="100%">\n<thead><tr><th>Platform</th><th>Core Runtime</th><th>Architecture</th></tr></thead>\n<tbody>\n  <tr><td><strong>Apple iOS</strong></td><td>Swift 6 · SwiftUI</td><td>Observation Framework · Metal Shaders</td></tr>\n  <tr><td><strong>Android</strong></td><td>Kotlin 2.0 · Jetpack Compose</td><td>Coroutines / Flow · Android NDK</td></tr>\n  <tr><td><strong>Cross-Core</strong></td><td>Kotlin Multiplatform (KMP)</td><td>Shared SQLite · SQLDelight</td></tr>\n</tbody>\n</table>`;
}

function renderStackFrontendBadges(template, data) {
  const badges = [];
  for (const group of data.stack) {
    for (const item of group.items) {
      badges.push(`<kbd>${escapeHtml(item)}</kbd>`);
    }
  }
  return `<h2>Frontend Engineering Stack</h2>\n<p>${badges.join(" · ")}</p>`;
}

function renderStackSynthModules(template, data) {
  return `<h2>Module Bay Specifications</h2>\n<table width="100%">\n<thead><tr><th>Module Bay</th><th>Hardware Spec</th><th>Patch Status</th></tr></thead>\n<tbody>\n  <tr><td><strong>Wavetable VCO Core</strong></td><td>Dual ARM Cortex-M7 DSP</td><td>🔴 PATCHED TO VCF</td></tr>\n  <tr><td><strong>State Variable VCF</strong></td><td>4-Pole OTA Resonant Analog</td><td>🟡 ATTENUATED</td></tr>\n  <tr><td><strong>Granular Cloud DSP</strong></td><td>SIMD Vectorized Delay Lines</td><td>🟢 READY</td></tr>\n</tbody>\n</table>`;
}

function renderStackAiTopology(template, data) {
  const g1 = data.stack[0] || { name: "Runtimes & Inference", items: [] };
  const g2 = data.stack[1] || { name: "Compute & Storage", items: [] };
  return `<h2>Stack Topology</h2>\n<table width="100%">\n<thead><tr><th width="50%">${escapeHtml(g1.name)}</th><th width="50%">${escapeHtml(g2.name)}</th></tr></thead>\n<tbody>\n  <tr>\n    <td valign="top">${g1.items.map((i) => `<code>${escapeHtml(i)}</code>`).join(" · ")}</td>\n    <td valign="top">${g2.items.map((i) => `<code>${escapeHtml(i)}</code>`).join(" · ")}</td>\n  </tr>\n</tbody>\n</table>`;
}

function renderStackDefault(template, data) {
  const groups = data.stack
    .map((group) => `<li><strong>${escapeHtml(group.name)}</strong> — ${group.items.map((item) => escapeHtml(item)).join(", ")}</li>`)
    .join("\n");
  return `<h2>Stack</h2>\n<ul>\n${groups}\n</ul>`;
}

const TEMPLATE_STACK_VARIANTS = {
  terminal: "terminal",
  "031-cyberpunk-netrunner": "netrunner",
  "004-mobile-developer": "mobile-matrix",
  "005-frontend-developer": "frontend-badges",
  "034-audio-synth-rack": "synth-modules",
  "003-ai-engineer": "ai-topology",
};

const STACK_VARIANTS = {
  terminal: renderStackTerminal,
  netrunner: renderStackNetrunner,
  "mobile-matrix": renderStackMobileMatrix,
  "frontend-badges": renderStackFrontendBadges,
  "synth-modules": renderStackSynthModules,
  "ai-topology": renderStackAiTopology,
  default: renderStackDefault,
};

function renderStack(template, data) {
  if (!data.stack || data.stack.length === 0) return omitted("stack", "empty or missing list");
  const variantKey = template.stack_variant || TEMPLATE_STACK_VARIANTS[template.id] || "default";
  const renderFn = STACK_VARIANTS[variantKey] || STACK_VARIANTS.default;
  return renderFn(template, data);
}

// =============================================================================
// TECH BADGES COMPONENT
// =============================================================================

function renderTechBadges(template, data, tokens, assets) {
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

// =============================================================================
// PUBLICATIONS COMPONENT VARIANTS
// =============================================================================

function renderPublicationsEditorial(template, data) {
  const items = data.publications
    .map((item) => `<li><strong><a href="${escapeHtml(item.url)}">${escapeHtml(item.title)}</a></strong> (${escapeHtml(item.year)})<br/><em>Published in ${escapeHtml(item.venue)}</em><br/><details><summary><small>Read Abstract &amp; Synopsis</small></summary><blockquote>Analysis and formal treatise published in ${escapeHtml(item.venue)}.</blockquote></details></li>`)
    .join("\n");
  return `<h2>Selected Essays &amp; Treatises</h2>\n<ol>\n${items}\n</ol>`;
}

function renderPublicationsAcademic(template, data) {
  const items = data.publications
    .map((item, idx) => `<li><strong>[${idx + 1}] <a href="${escapeHtml(item.url)}">${escapeHtml(item.title)}</a></strong> (${escapeHtml(item.year)})<br/><em>${escapeHtml(item.venue)}</em> · <code>DOI: 10.1145/${escapeHtml(item.year)}.001</code><br/><details><summary>Abstract</summary>Peer-reviewed paper presented at ${escapeHtml(item.venue)}.</details></li>`)
    .join("\n");
  return `<h2>Peer-Reviewed Publications &amp; Proceedings</h2>\n<ol>\n${items}\n</ol>`;
}

function renderPublicationsDefault(template, data) {
  const rows = data.publications
    .map((item) => `<tr><td>${escapeHtml(item.year)}</td><td><a href="${escapeHtml(item.url)}">${escapeHtml(item.title)}</a></td><td>${escapeHtml(item.venue)}</td></tr>`)
    .join("\n");
  return `<h2>Publications</h2>\n<table>\n<thead><tr><th>Year</th><th>Title</th><th>Venue</th></tr></thead>\n<tbody>\n${rows}\n</tbody>\n</table>`;
}

const TEMPLATE_PUBLICATIONS_VARIANTS = {
  "013-magazine-editorial": "editorial",
  academic: "academic",
};

const PUBLICATIONS_VARIANTS = {
  editorial: renderPublicationsEditorial,
  academic: renderPublicationsAcademic,
  default: renderPublicationsDefault,
};

function renderPublications(template, data) {
  if (!data.publications || data.publications.length === 0) return omitted("publications", "empty or missing list");
  const variantKey = template.publications_variant || TEMPLATE_PUBLICATIONS_VARIANTS[template.id] || "default";
  const renderFn = PUBLICATIONS_VARIANTS[variantKey] || PUBLICATIONS_VARIANTS.default;
  return renderFn(template, data);
}

// =============================================================================
// TIMELINE COMPONENT VARIANTS
// =============================================================================

function renderTimelineJourney(template, data) {
  const treeLines = data.timeline.map((item, idx) => {
    const isLast = idx === data.timeline.length - 1;
    const prefix = isLast ? "└──" : "├──";
    return `${item.period.padEnd(16)} ──▶ ${item.title}\n ${isLast ? " " : "│"}                  ${prefix} ${item.detail}`;
  });
  return `<h2>Chronological Journey &amp; Milestones</h2>\n<pre><code>${escapeHtml(treeLines.join("\n │\n"))}</code></pre>`;
}

function renderTimelineDefault(template, data) {
  const items = data.timeline
    .map((item) => `<li><strong>${escapeHtml(item.period)}</strong> — ${escapeHtml(item.title)}<br/>${escapeHtml(item.detail)}</li>`)
    .join("\n");
  return `<h2>Timeline</h2>\n<ul>\n${items}\n</ul>`;
}

const TEMPLATE_TIMELINE_VARIANTS = {
  journey: "journey",
};

const TIMELINE_VARIANTS = {
  journey: renderTimelineJourney,
  default: renderTimelineDefault,
};

function renderTimeline(template, data) {
  if (!data.timeline || data.timeline.length === 0) return omitted("timeline", "empty or missing list");
  const variantKey = template.timeline_variant || TEMPLATE_TIMELINE_VARIANTS[template.id] || "default";
  const renderFn = TIMELINE_VARIANTS[variantKey] || TIMELINE_VARIANTS.default;
  return renderFn(template, data);
}

// =============================================================================
// CHECKLIST COMPONENT VARIANTS
// =============================================================================

function renderChecklistNetrunner(template, data, statusLabel) {
  const items = data.checklist
    .map((item) => {
      const icon = item.status === "done" ? "[✓]" : item.status === "in_progress" ? "[⚡]" : "[⏳]";
      return `<li><code>${icon}</code> <strong>${statusLabel[item.status]}</strong> — ${escapeHtml(item.label)}</li>`;
    })
    .join("\n");
  return `<h2>Roadmap</h2>\n<details open>\n<summary><b>[+] DECRYPT RUNTIME LOGS &amp; PENETRATION ROADMAP</b></summary>\n<ul>\n${items}\n</ul>\n</details>`;
}

function renderChecklistRpg(template, data, statusLabel) {
  const items = data.checklist
    .map((item) => {
      const marker = item.status === "done" ? "[x]" : item.status === "in_progress" ? "[/]" : "[ ]";
      return `<li><strong>${marker}</strong> <i>(${statusLabel[item.status]})</i> ${escapeHtml(item.label)}</li>`;
    })
    .join("\n");
  return `<h2>Active Quests &amp; Dungeon Raids</h2>\n<ul>\n${items}\n</ul>`;
}

function renderChecklistCurriculum(template, data, statusLabel) {
  const items = data.checklist
    .map((item) => {
      const marker = item.status === "done" ? "[x]" : item.status === "in_progress" ? "[/]" : "[ ]";
      return `<li><strong>${marker}</strong> <code>${statusLabel[item.status]}</code> — ${escapeHtml(item.label)}</li>`;
    })
    .join("\n");
  return `<h2>Learning Curriculum &amp; Mastery Quests</h2>\n<ul>\n${items}\n</ul>`;
}

function renderChecklistDefault(template, data, statusLabel) {
  const items = data.checklist
    .map((item) => `<li><strong>${statusLabel[item.status]}</strong> — ${escapeHtml(item.label)}</li>`)
    .join("\n");
  return `<h2>Roadmap</h2>\n<ul>\n${items}\n</ul>`;
}

const TEMPLATE_CHECKLIST_VARIANTS = {
  "031-cyberpunk-netrunner": "netrunner",
  "033-dungeon-rpg-character-sheet": "rpg",
  student: "curriculum",
};

const CHECKLIST_VARIANTS = {
  netrunner: renderChecklistNetrunner,
  rpg: renderChecklistRpg,
  curriculum: renderChecklistCurriculum,
  default: renderChecklistDefault,
};

function renderChecklist(template, data) {
  if (!data.checklist || data.checklist.length === 0) return omitted("checklist", "empty or missing list");
  const statusLabel = { done: "done", fait: "done", in_progress: "in progress", encours: "in progress", planned: "planned", prevu: "planned" };
  const variantKey = template.checklist_variant || TEMPLATE_CHECKLIST_VARIANTS[template.id] || "default";
  const renderFn = CHECKLIST_VARIANTS[variantKey] || CHECKLIST_VARIANTS.default;
  return renderFn(template, data, statusLabel);
}

// =============================================================================
// PITCH COMPONENT VARIANTS
// =============================================================================

function renderPitchMatrix(template, data) {
  return `<h2>Investment Diligence &amp; Thesis</h2>\n<table width="100%">\n<thead><tr><th>The Market Friction</th><th>Our Architectural Solution</th><th>Empirical Validation</th></tr></thead>\n<tbody>\n  <tr>\n    <td valign="top">${escapeHtml(data.pitch.problem)}</td>\n    <td valign="top">${escapeHtml(data.pitch.offer)}</td>\n    <td valign="top">${escapeHtml(data.pitch.proof)}</td>\n  </tr>\n</tbody>\n</table>`;
}

function renderPitchFounder(template, data) {
  return `<h2>The Founder Manifesto</h2>\n<table width="100%">\n<tbody>\n  <tr>\n    <td width="33%" valign="top">\n      <h3>1. What We Reject</h3>\n      <p>${escapeHtml(data.pitch.problem)}</p>\n    </td>\n    <td width="33%" valign="top">\n      <h3>2. What We Build</h3>\n      <p>${escapeHtml(data.pitch.offer)}</p>\n    </td>\n    <td width="33%" valign="top">\n      <h3>3. Why Now</h3>\n      <p>${escapeHtml(data.pitch.proof)}</p>\n    </td>\n  </tr>\n</tbody>\n</table>`;
}

function renderPitchDefault(template, data) {
  return `<h2>Pitch</h2>\n${paragraph(data.pitch.problem)}\n${paragraph(data.pitch.offer)}\n${paragraph(data.pitch.proof)}`;
}

const TEMPLATE_PITCH_VARIANTS = {
  "024-pitch-deck": "matrix",
  founder: "founder",
};

const PITCH_VARIANTS = {
  matrix: renderPitchMatrix,
  founder: renderPitchFounder,
  default: renderPitchDefault,
};

function renderPitch(template, data) {
  if (!data.pitch) return omitted("pitch", "missing block");
  const variantKey = template.pitch_variant || TEMPLATE_PITCH_VARIANTS[template.id] || "default";
  const renderFn = PITCH_VARIANTS[variantKey] || PITCH_VARIANTS.default;
  return renderFn(template, data);
}

// =============================================================================
// PRINCIPLES COMPONENT VARIANTS
// =============================================================================

function renderPrinciplesPgp(template, data) {
  const items = data.principles.map((item) => `<li>${escapeHtml(item)}</li>`).join("\n");
  return `<h2>Security Governance &amp; PGP Coordination</h2>\n<details>\n<summary><b>🔑 RFC 9116 SECURITY DISCLOSURE POLICY &amp; PGP FINGERPRINT</b></summary>\n\n<pre><code>-----BEGIN PGP SIGNED MESSAGE-----\nHash: SHA512\n\nResponsible disclosure window: 90 days.\nPGP Fingerprint: 4E5A 910D 23B8 F41C 7A01  BB63 8C9E 31A0 FF45 99DE\nCoordination contact: security@example-lab.internal\n-----END PGP SIGNED MESSAGE-----</code></pre>\n</details>\n\n<ul>\n${items}\n</ul>`;
}

function renderPrinciplesDefault(template, data) {
  const items = data.principles.map((item) => `<li>${escapeHtml(item)}</li>`).join("\n");
  return `<h2>Principles</h2>\n<ul>\n${items}\n</ul>`;
}

const TEMPLATE_PRINCIPLES_VARIANTS = {
  "025-security-lab": "pgp",
};

const PRINCIPLES_VARIANTS = {
  pgp: renderPrinciplesPgp,
  default: renderPrinciplesDefault,
};

function renderPrinciples(template, data) {
  if (!data.principles || data.principles.length === 0) return omitted("principles", "empty or missing list");
  const variantKey = template.principles_variant || TEMPLATE_PRINCIPLES_VARIANTS[template.id] || "default";
  const renderFn = PRINCIPLES_VARIANTS[variantKey] || PRINCIPLES_VARIANTS.default;
  return renderFn(template, data);
}

// =============================================================================
// BANNER & OTHER COMPONENTS
// =============================================================================

function renderBanner(template, data, tokens, assets) {
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

function renderLinks(template, data) {
  if (!data.links || data.links.length === 0) return omitted("links", "empty or missing list");
  const parts = data.links.map((item) => `<a href="${escapeHtml(item.url)}">${escapeHtml(item.label)}</a>`);
  return `<h2>Links</h2>\n<p>${parts.join(" · ")}</p>`;
}

function renderColophon(template, data) {
  return `<p><sub>Profile generated by ReadMy ${escapeHtml(template.id)} ${escapeHtml(template.version)}. Local SVG assets, zero third-party services.</sub></p>`;
}

function renderComponent(name, template, data, tokens, assets) {
  if (name === "banner") return renderBanner(template, data, tokens, assets);
  if (name === "identity") return renderIdentity(template, data);
  if (name === "metrics") return renderMetrics(template, data);
  if (name === "prose") return renderProse(template, data);
  if (name === "projects") return renderProjects(template, data);
  if (name === "stack") return renderStack(template, data);
  if (name === "tech-badges") return renderTechBadges(template, data, tokens, assets);
  if (name === "publications") return renderPublications(template, data);
  if (name === "timeline") return renderTimeline(template, data);
  if (name === "checklist") return renderChecklist(template, data);
  if (name === "pitch") return renderPitch(template, data);
  if (name === "principles") return renderPrinciples(template, data);
  if (name === "links") return renderLinks(template, data);
  if (name === "colophon") return renderColophon(template, data);

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
