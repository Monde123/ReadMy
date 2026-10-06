import { fail } from "./errors.js";
import { escapeHtml } from "./xml.js";
import { bannerSvg } from "./svg.js";

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
  "projects",
  "stack",
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
  projects: 8,
  publications: 12,
  timeline: 12,
  checklist: 20,
  principles: 8,
  links: 8,
  stack: 6,
  items: 12,
  audiences: 8,
  components: 16,
};

function rejectSecrets(value) {
  if (typeof value === "string" && SECRET.test(value)) {
    fail("SECRET_DETECTE", "un champ ressemble à un secret, rendu interrompu");
  }
}

function text(field, value, { required = false, max }) {
  if (value === undefined || value === null) {
    if (required) fail("CHAMP_MANQUANT", field);
    return null;
  }
  if (typeof value === "number" && Number.isInteger(value)) value = String(value);
  if (typeof value !== "string") fail("PROFIL_INVALIDE", `${field} doit être une chaîne`);
  rejectSecrets(value);
  if (value.length > max) fail("CHAMP_TROP_LONG", `${field} (${value.length} > ${max})`);
  if (value.trim() === "") {
    if (required) fail("CHAMP_VIDE", field);
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
    fail("URL_INVALIDE", field);
  }
  if (url.protocol !== "https:" || url.username || url.password) fail("URL_INVALIDE", field);
  return raw;
}

function linkUrl(field, value) {
  const raw = text(field, value, { required: true, max: LIMITS.url });
  let url;
  try {
    url = new URL(raw);
  } catch {
    fail("URL_INVALIDE", field);
  }
  if ((url.protocol !== "https:" && url.protocol !== "mailto:") || url.username || url.password) {
    fail("URL_INVALIDE", field);
  }
  return raw;
}

function listOf(field, value, limit) {
  if (value === undefined || value === null) return null;
  if (!Array.isArray(value)) fail("PROFIL_INVALIDE", `${field} doit être une liste`);
  if (value.length > limit) fail("LISTE_TROP_LONGUE", `${field} (${value.length} > ${limit})`);
  return value;
}

function assertOnlyKeys(source, allowed, code) {
  if (source === null || typeof source !== "object" || Array.isArray(source)) {
    fail(code, "objet attendu");
  }
  for (const key of Object.keys(source)) {
    if (!allowed.has(key)) fail(code, key);
  }
}

export function normalizeTemplate(template, registry) {
  assertOnlyKeys(template, TEMPLATE_KEYS, "TEMPLATE_CLE_INCONNUE");
  const id = text("id", template.id, { required: true, max: 42 });
  if (!/^[a-z][a-z0-9-]{1,40}$/.test(id)) fail("TEMPLATE_INVALIDE", "id");
  const version = text("version", template.version, { required: true, max: 16 });
  if (!/^\d+\.\d+\.\d+$/.test(version)) fail("TEMPLATE_INVALIDE", "version");
  const title = text("title", template.title, { required: true, max: 80 });
  const summary = text("summary", template.summary, { required: true, max: 400 });
  const audiences = listOf("audiences", template.audiences, LIST_LIMITS.audiences);
  if (!audiences || audiences.length === 0) fail("CHAMP_MANQUANT", "audiences");
  for (const audience of audiences) {
    text("audiences", audience, { required: true, max: 40 });
  }
  const theme = text("theme", template.theme, { required: true, max: 24 });
  const banner = text("banner", template.banner, { required: true, max: 24 });
  const projects = text("projects", template.projects, { required: true, max: 16 });
  if (projects !== "list" && projects !== "table") fail("TEMPLATE_INVALIDE", "projects");
  const components = listOf("components", template.components, LIST_LIMITS.components);
  if (!components || components.length === 0) fail("CHAMP_MANQUANT", "components");
  const seen = new Set();
  for (const component of components) {
    const name = text("components", component, { required: true, max: 32 });
    if (seen.has(name)) fail("COMPOSANT_DUPLIQUE", name);
    seen.add(name);
    if (!registry.components[name]) fail("COMPOSANT_INCONNU", name);
  }
  const requires = listOf("requires", template.requires, 8);
  if (!requires) fail("CHAMP_MANQUANT", "requires");
  for (const field of requires) text("requires", field, { required: true, max: 32 });
  return { id, version, title, summary, audiences, theme, banner, projects, components, requires };
}

const FIELD_COMPONENT = {
  summary: "prose",
  focus: "prose",
  projects: "projects",
  stack: "stack",
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
  assertOnlyKeys(profile, PROFILE_KEYS, "PROFIL_CLE_INCONNUE");
  for (const [field, component] of Object.entries(FIELD_COMPONENT)) {
    if (profile[field] !== undefined && profile[field] !== null && !template.components.includes(component)) {
      fail("SECTION_NON_AFFICHEE", `${field} exige le composant ${component}`);
    }
  }
  const data = {};
  for (const field of template.requires) {
    if (profile[field] === undefined || profile[field] === null || String(profile[field]).trim() === "") {
      if (profile[field] === undefined || profile[field] === null) fail("CHAMP_MANQUANT", field);
      fail("CHAMP_VIDE", field);
    }
  }
  data.name = text("name", profile.name, { required: template.requires.includes("name") || template.components.includes("banner") || template.components.includes("identity"), max: LIMITS.name });
  data.role = text("role", profile.role, { required: template.requires.includes("role") || template.components.includes("banner"), max: LIMITS.role });
  data.summary = text("summary", profile.summary, { max: LIMITS.summary });
  data.focus = text("focus", profile.focus, { max: LIMITS.focus });
  data.location = text("location", profile.location, { max: LIMITS.location });
  data.organization = text("organization", profile.organization, { max: LIMITS.organization });

  const projects = listOf("projects", profile.projects, LIST_LIMITS.projects);
  data.projects = projects
    ? projects.map((item, index) => {
        if (item === null || typeof item !== "object" || Array.isArray(item)) fail("PROFIL_INVALIDE", `projects[${index}]`);
        assertOnlyKeys(item, new Set(["name", "url", "description", "language", "stars"]), "PROFIL_CLE_INCONNUE");
        const project = {
          name: text("projects.name", item.name, { required: true, max: LIMITS.name }),
          url: httpsUrl("projects.url", item.url),
          description: text("projects.description", item.description, { required: true, max: LIMITS.description }),
        };
        project.language = text("projects.language", item.language, { max: LIMITS.item });
        if (item.stars !== undefined && item.stars !== null) {
          if (typeof item.stars !== "number" || !Number.isInteger(item.stars) || item.stars < 0 || item.stars > 1_000_000_000) {
            fail("PROFIL_INVALIDE", "projects.stars");
          }
          project.stars = item.stars;
        }
        return project;
      })
    : null;

  const stack = listOf("stack", profile.stack, LIST_LIMITS.stack);
  data.stack = stack
    ? stack.map((group, index) => {
        if (group === null || typeof group !== "object" || Array.isArray(group)) fail("PROFIL_INVALIDE", `stack[${index}]`);
        assertOnlyKeys(group, new Set(["name", "items"]), "PROFIL_CLE_INCONNUE");
        const items = listOf("stack.items", group.items, LIST_LIMITS.items);
        if (!items || items.length === 0) fail("CHAMP_VIDE", "stack.items");
        return {
          name: text("stack.name", group.name, { required: true, max: LIMITS.item }),
          items: items.map((item) => text("stack.items", item, { required: true, max: LIMITS.item })),
        };
      })
    : null;

  const publications = listOf("publications", profile.publications, LIST_LIMITS.publications);
  data.publications = publications
    ? publications.map((item, index) => {
        assertOnlyKeys(item, new Set(["year", "title", "venue", "url"]), "PROFIL_CLE_INCONNUE");
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
        assertOnlyKeys(item, new Set(["period", "title", "detail"]), "PROFIL_CLE_INCONNUE");
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
        assertOnlyKeys(item, new Set(["label", "status"]), "PROFIL_CLE_INCONNUE");
        const status = text("checklist.status", item.status, { required: true, max: 16 });
        if (!["fait", "encours", "prevu"].includes(status)) fail("STATUT_INVALIDE", status);
        return { label: text("checklist.label", item.label, { required: true, max: LIMITS.label }), status };
      })
    : null;

  if (profile.pitch !== undefined && profile.pitch !== null) {
    if (typeof profile.pitch !== "object" || Array.isArray(profile.pitch)) fail("PROFIL_INVALIDE", "pitch");
    assertOnlyKeys(profile.pitch, new Set(["problem", "offer", "proof"]), "PROFIL_CLE_INCONNUE");
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
        assertOnlyKeys(item, new Set(["label", "url"]), "PROFIL_CLE_INCONNUE");
        return {
          label: text("links.label", item.label, { required: true, max: LIMITS.label }),
          url: linkUrl("links.url", item.url),
        };
      })
    : null;
  return data;
}

function omitted(section, reason) {
  return `<!-- section:${section} omise : ${reason} -->`;
}

function paragraph(value) {
  return `<p>${escapeHtml(value)}</p>`;
}

function renderProjects(template, data) {
  if (!data.projects || data.projects.length === 0) return omitted("projets", "liste vide ou absente");
  const withStars = data.projects.some((project) => project.stars !== undefined);
  if (template.projects === "list") {
    const items = data.projects
      .map((project) => {
        const language = project.language ? ` · ${escapeHtml(project.language)}` : "";
        const stars = project.stars !== undefined ? ` · ${project.stars} étoiles` : "";
        return `<li><a href="${escapeHtml(project.url)}">${escapeHtml(project.name)}</a> — ${escapeHtml(project.description)}${language}${stars}</li>`;
      })
      .join("\n");
    return `<h2>Projets</h2>\n<ul>\n${items}\n</ul>`;
  }
  const head = withStars
    ? "<tr><th>Projet</th><th>Description</th><th>Langage</th><th>Étoiles</th></tr>"
    : "<tr><th>Projet</th><th>Description</th><th>Langage</th></tr>";
  const rows = data.projects
    .map((project) => {
      const language = project.language ? escapeHtml(project.language) : "non indiqué";
      const stars = withStars ? `<td>${project.stars !== undefined ? project.stars : "non indiqué"}</td>` : "";
      return `<tr><td><a href="${escapeHtml(project.url)}">${escapeHtml(project.name)}</a></td><td>${escapeHtml(project.description)}</td><td>${language}</td>${stars}</tr>`;
    })
    .join("\n");
  return `<h2>Projets</h2>\n<table>\n<thead>${head}</thead>\n<tbody>\n${rows}\n</tbody>\n</table>`;
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
    const alt = escapeHtml(`Bandeau : ${data.name}, ${data.role}`);
    return `<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./assets/banner-dark.svg" />
  <source media="(prefers-color-scheme: light)" srcset="./assets/banner-light.svg" />
  <img alt="${alt}" src="./assets/banner-light.svg" />
</picture>`;
  }
  if (name === "identity") {
    const lines = [`<h1>${escapeHtml(data.name)}</h1>`];
    if (data.role) lines.push(paragraph(data.role));
    else lines.push(omitted("role", "champ absent"));
    if (data.organization) lines.push(paragraph(data.organization));
    else lines.push(omitted("organisation", "champ absent"));
    if (data.location) lines.push(paragraph(data.location));
    else lines.push(omitted("lieu", "champ absent"));
    return lines.join("\n");
  }
  if (name === "prose") {
    if (!data.summary && !data.focus) return omitted("prose", "résumé et focus absents");
    const lines = ["<h2>En bref</h2>"];
    if (data.summary) lines.push(paragraph(data.summary));
    if (data.focus) lines.push(paragraph(data.focus));
    return lines.join("\n");
  }
  if (name === "projects") return renderProjects(template, data);
  if (name === "stack") {
    if (!data.stack || data.stack.length === 0) return omitted("stack", "liste vide ou absente");
    const groups = data.stack
      .map((group) => `<li><strong>${escapeHtml(group.name)}</strong> — ${group.items.map((item) => escapeHtml(item)).join(", ")}</li>`)
      .join("\n");
    return `<h2>Stack</h2>\n<ul>\n${groups}\n</ul>`;
  }
  if (name === "publications") {
    if (!data.publications || data.publications.length === 0) return omitted("publications", "liste vide ou absente");
    const rows = data.publications
      .map((item) => `<tr><td>${escapeHtml(item.year)}</td><td><a href="${escapeHtml(item.url)}">${escapeHtml(item.title)}</a></td><td>${escapeHtml(item.venue)}</td></tr>`)
      .join("\n");
    return `<h2>Publications</h2>\n<table>\n<thead><tr><th>Année</th><th>Titre</th><th>Support</th></tr></thead>\n<tbody>\n${rows}\n</tbody>\n</table>`;
  }
  if (name === "timeline") {
    if (!data.timeline || data.timeline.length === 0) return omitted("parcours", "liste vide ou absente");
    const items = data.timeline
      .map((item) => `<li><strong>${escapeHtml(item.period)}</strong> — ${escapeHtml(item.title)}<br/>${escapeHtml(item.detail)}</li>`)
      .join("\n");
    return `<h2>Parcours</h2>\n<ul>\n${items}\n</ul>`;
  }
  if (name === "checklist") {
    if (!data.checklist || data.checklist.length === 0) return omitted("feuille", "liste vide ou absente");
    const statusLabel = { fait: "fait", encours: "en cours", prevu: "prévu" };
    const items = data.checklist
      .map((item) => `<li><strong>${statusLabel[item.status]}</strong> — ${escapeHtml(item.label)}</li>`)
      .join("\n");
    return `<h2>Feuille de route</h2>\n<ul>\n${items}\n</ul>`;
  }
  if (name === "pitch") {
    if (!data.pitch) return omitted("pitch", "bloc absent");
    return `<h2>Offre</h2>\n${paragraph(data.pitch.problem)}\n${paragraph(data.pitch.offer)}\n${paragraph(data.pitch.proof)}`;
  }
  if (name === "principles") {
    if (!data.principles || data.principles.length === 0) return omitted("principes", "liste vide ou absente");
    const items = data.principles.map((item) => `<li>${escapeHtml(item)}</li>`).join("\n");
    return `<h2>Principes</h2>\n<ul>\n${items}\n</ul>`;
  }
  if (name === "links") {
    if (!data.links || data.links.length === 0) return omitted("liens", "liste vide ou absente");
    const parts = data.links.map((item) => `<a href="${escapeHtml(item.url)}">${escapeHtml(item.label)}</a>`);
    return `<h2>Liens</h2>\n<p>${parts.join(" · ")}</p>`;
  }
  if (name === "colophon") {
    return `<p><sub>Profil généré par ReadMy ${escapeHtml(template.id)} ${escapeHtml(template.version)}. Images SVG locales, aucun service tiers.</sub></p>`;
  }
  fail("COMPOSANT_INCONNU", name);
}

export function renderTemplate(templateInput, profileInput, tokens, registry) {
  const template = normalizeTemplate(templateInput, registry);
  if (!tokens.themes[template.theme]) fail("THEME_INCONNU", template.theme);
  const data = normalizeProfile(profileInput, template);
  const assets = [];
  const used = template.components.map((name) => `${name}@${registry.components[name].version}`);
  const parts = template.components.map((name) => renderComponent(name, template, data, tokens, assets));
  const markdown = `<!-- readmy:template=${template.id};version=${template.version};composants=${used.join(",")} -->\n\n${parts.join("\n\n")}\n`;
  return { markdown, assets, template, data };
}
