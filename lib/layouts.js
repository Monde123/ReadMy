import { fail } from "./errors.js";
import { escapeHtml } from "./xml.js";
import { bannerSvg } from "./svg.js";

const RENDERERS = {
  editorial,
  rfc,
  tui,
  roadmap,
  bibliography,
  pitch,
  briefing,
  chronicle,
  desk,
  studio,
};

export const LAYOUTS = new Set(["stack", ...Object.keys(RENDERERS)]);

function omitted(section, reason) {
  return `<!-- section:${section} omise : ${reason} -->`;
}

function paragraph(value) {
  return `<p>${escapeHtml(value)}</p>`;
}

function pre(value) {
  return `<pre>${escapeHtml(value)}</pre>`;
}

function colophon(template) {
  return `<p><sub>Profil généré par ReadMy ${escapeHtml(template.id)} ${escapeHtml(template.version)}. Images SVG locales, aucun service tiers.</sub></p>`;
}

function has(template, name) {
  return template.components.includes(name);
}

function pushBanner(template, data, tokens, assets) {
  if (!has(template, "banner")) return "";
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

function linksLine(data) {
  if (!data.links || data.links.length === 0) return omitted("liens", "liste vide ou absente");
  const parts = data.links.map((item) => `<a href="${escapeHtml(item.url)}">${escapeHtml(item.label)}</a>`);
  return `<p>${parts.join(" · ")}</p>`;
}

function proseParagraphs(data) {
  if (!data.summary && !data.focus) return omitted("prose", "résumé et focus absents");
  const lines = [];
  if (data.summary) lines.push(paragraph(data.summary));
  if (data.focus) lines.push(paragraph(data.focus));
  return lines.join("\n\n");
}

function projectMeta(project) {
  const bits = [];
  if (project.language) bits.push(escapeHtml(project.language));
  if (project.stars !== undefined) bits.push(`${project.stars} étoiles`);
  return bits.join(" · ");
}

function projectBits(project) {
  return [escapeHtml(project.description), projectMeta(project)].filter(Boolean).join(" · ");
}

function statusLabel(status) {
  return { fait: "fait", encours: "en cours", prevu: "prévu" }[status];
}

function editorial(template, data, tokens, assets) {
  const parts = [];
  const banner = pushBanner(template, data, tokens, assets);
  if (banner) parts.push(banner);
  if (has(template, "identity")) {
    parts.push(`<h1>${escapeHtml(data.name)}</h1>`);
    if (data.role) parts.push(`<p><em>${escapeHtml(data.role)}</em></p>`);
    else parts.push(omitted("role", "champ absent"));
    if (data.organization) parts.push(paragraph(data.organization));
    if (data.location) parts.push(paragraph(data.location));
  }
  if (has(template, "prose")) parts.push(proseParagraphs(data));
  parts.push("<hr/>");
  if (has(template, "projects")) {
    if (!data.projects || data.projects.length === 0) {
      parts.push(`<h2>Sélection</h2>\n\n${omitted("projets", "liste vide ou absente")}`);
    } else {
      const cards = data.projects.map(
        (project) => `<p><a href="${escapeHtml(project.url)}">${escapeHtml(project.name)}</a><br/>${projectBits(project)}</p>`,
      );
      parts.push(`<h2>Sélection</h2>\n\n${cards.join("\n\n")}`);
    }
  }
  parts.push("<hr/>");
  if (has(template, "links")) parts.push(linksLine(data));
  if (has(template, "colophon")) parts.push(colophon(template));
  return parts.join("\n\n");
}

function rfc(template, data, tokens, assets) {
  const parts = [];
  const banner = pushBanner(template, data, tokens, assets);
  if (banner) parts.push(banner);
  const mast = ["FICHE TECHNIQUE                                          FORMAT RFC", data.name, data.role];
  if (data.organization) mast.push(`Organisation : ${data.organization}`);
  if (data.location) mast.push(`Lieu : ${data.location}`);
  parts.push(pre(mast.join("\n")));
  parts.push(`<h1>${escapeHtml(data.name)}</h1>`);
  let section = 0;
  const heading = (title) => {
    section += 1;
    return `<h2>${section}. ${title}</h2>`;
  };
  if (has(template, "prose")) {
    parts.push(heading("Résumé"));
    if (!data.summary && !data.focus) parts.push(omitted("prose", "résumé et focus absents"));
    else {
      if (data.summary) parts.push(`<blockquote>${paragraph(data.summary)}</blockquote>`);
      if (data.focus) parts.push(paragraph(data.focus));
    }
  }
  if (has(template, "stack")) {
    parts.push(heading("Paramètres"));
    if (!data.stack || data.stack.length === 0) parts.push(omitted("stack", "liste vide ou absente"));
    else {
      const rows = data.stack
        .map((group) => `<tr><td>${escapeHtml(group.name)}</td><td>${group.items.map((item) => escapeHtml(item)).join(", ")}</td></tr>`)
        .join("\n");
      parts.push(`<table>\n<thead><tr><th>Paramètre</th><th>Valeur</th></tr></thead>\n<tbody>\n${rows}\n</tbody>\n</table>`);
    }
  }
  if (has(template, "principles")) {
    parts.push(heading("Invariants"));
    if (!data.principles || data.principles.length === 0) parts.push(omitted("principes", "liste vide ou absente"));
    else parts.push(`<ol>\n${data.principles.map((item) => `<li>${escapeHtml(item)}</li>`).join("\n")}\n</ol>`);
  }
  if (has(template, "projects")) {
    parts.push(heading("Systèmes de référence"));
    if (!data.projects || data.projects.length === 0) parts.push(omitted("projets", "liste vide ou absente"));
    else {
      const cells = data.projects.map((project) => {
        const extra = [];
        if (project.language) extra.push(escapeHtml(project.language));
        if (project.stars !== undefined) extra.push(`${project.stars} étoiles`);
        const meta = extra.length > 0 ? `<p>${extra.join(" · ")}</p>` : "";
        return `<td valign="top"><h3><a href="${escapeHtml(project.url)}">${escapeHtml(project.name)}</a></h3><p>${escapeHtml(project.description)}</p>${meta}</td>`;
      });
      const rows = [];
      for (let index = 0; index < cells.length; index += 2) {
        rows.push(`<tr>${cells[index]}${cells[index + 1] ?? "<td></td>"}</tr>`);
      }
      parts.push(`<table>\n${rows.join("\n")}\n</table>`);
    }
  }
  if (has(template, "links")) {
    parts.push(heading("Correspondance"));
    parts.push(linksLine(data));
  }
  if (has(template, "colophon")) parts.push(colophon(template));
  return parts.join("\n\n");
}

function tui(template, data, tokens, assets) {
  const parts = [];
  const banner = pushBanner(template, data, tokens, assets);
  if (banner) parts.push(banner);
  const lines = ["$ whoami", `${data.name} — ${data.role}`, ""];
  if (data.organization) lines.push(`org=${data.organization}`);
  if (data.location) lines.push(`lieu=${data.location}`);
  if (data.organization || data.location) lines.push("");
  if (has(template, "prose")) {
    lines.push("$ cat a-propos.txt");
    if (!data.summary && !data.focus) lines.push(omitted("prose", "résumé et focus absents"));
    if (data.summary) lines.push(data.summary);
    if (data.focus) lines.push(data.focus);
    lines.push("");
  }
  if (has(template, "projects")) {
    lines.push("$ ls projets/");
    if (!data.projects || data.projects.length === 0) {
      lines.push(omitted("projets", "liste vide ou absente"));
    } else {
      for (const project of data.projects) {
        const meta = [project.language, project.stars !== undefined ? `${project.stars} étoiles` : null].filter(Boolean).join("  ");
        lines.push(meta ? `${project.name}  ${meta}` : project.name);
        lines.push(`  ${project.description}`);
        lines.push(`  ${project.url}`);
      }
    }
    lines.push("");
  }
  if (has(template, "stack")) {
    lines.push("$ printenv STACK");
    if (!data.stack || data.stack.length === 0) lines.push(omitted("stack", "liste vide ou absente"));
    else {
      for (const group of data.stack) lines.push(`${group.name}=${group.items.join(",")}`);
    }
    lines.push("");
  }
  if (has(template, "links")) {
    lines.push("$ links");
    if (!data.links || data.links.length === 0) lines.push(omitted("liens", "liste vide ou absente"));
    else {
      for (const item of data.links) lines.push(`${item.label}  ${item.url}`);
    }
    lines.push("");
  }
  lines.push("$ exit 0");
  parts.push(pre(lines.join("\n")));
  if (has(template, "colophon")) parts.push(colophon(template));
  return parts.join("\n\n");
}

function roadmap(template, data, tokens, assets) {
  const parts = [];
  const banner = pushBanner(template, data, tokens, assets);
  if (banner) parts.push(banner);
  if (has(template, "identity")) {
    parts.push(`<h1>${escapeHtml(data.name)}</h1>`);
    parts.push(paragraph(data.role));
    if (data.organization) parts.push(paragraph(data.organization));
    if (data.location) parts.push(paragraph(data.location));
  }
  if (has(template, "prose")) {
    parts.push("<h2>Où j'en suis</h2>");
    parts.push(proseParagraphs(data));
  }
  if (has(template, "checklist")) {
    parts.push("<h2>Jalons</h2>");
    if (!data.checklist || data.checklist.length === 0) parts.push(omitted("feuille", "liste vide ou absente"));
    else {
      const rows = data.checklist
        .map((item) => `<tr><td>${escapeHtml(statusLabel(item.status))}</td><td>${escapeHtml(item.label)}</td></tr>`)
        .join("\n");
      parts.push(`<table>\n<thead><tr><th>Statut</th><th>Jalon</th></tr></thead>\n<tbody>\n${rows}\n</tbody>\n</table>`);
    }
  }
  if (has(template, "projects")) {
    parts.push("<h2>Atelier</h2>");
    if (!data.projects || data.projects.length === 0) parts.push(omitted("projets", "liste vide ou absente"));
    else {
      parts.push(
        data.projects
          .map((project) => {
            const meta = projectMeta(project);
            const metaLine = meta ? `\n<p>${meta}</p>` : "";
            return `<h3><a href="${escapeHtml(project.url)}">${escapeHtml(project.name)}</a></h3>\n${paragraph(project.description)}${metaLine}`;
          })
          .join("\n\n"),
      );
    }
  }
  if (has(template, "stack")) {
    parts.push("<h2>Outils en cours</h2>");
    if (!data.stack || data.stack.length === 0) parts.push(omitted("stack", "liste vide ou absente"));
    else {
      parts.push(
        data.stack
          .map((group) => `<p><strong>${escapeHtml(group.name)}</strong> — ${group.items.map((item) => escapeHtml(item)).join(", ")}</p>`)
          .join("\n"),
      );
    }
  }
  if (has(template, "links")) {
    parts.push("<h2>Suivi</h2>");
    parts.push(linksLine(data));
  }
  if (has(template, "colophon")) parts.push(colophon(template));
  return parts.join("\n\n");
}

function bibliography(template, data, tokens, assets) {
  const parts = [];
  const banner = pushBanner(template, data, tokens, assets);
  if (banner) parts.push(banner);
  parts.push("<p><em>Page de recherche</em></p>");
  if (has(template, "identity")) {
    parts.push(`<h1>${escapeHtml(data.name)}</h1>`);
    parts.push(paragraph(data.role));
    if (data.organization) parts.push(paragraph(data.organization));
    if (data.location) parts.push(paragraph(data.location));
  }
  if (has(template, "prose")) {
    parts.push("<h2>Question</h2>");
    parts.push(proseParagraphs(data));
  }
  if (has(template, "publications")) {
    parts.push("<h2>Bibliographie</h2>");
    if (!data.publications || data.publications.length === 0) parts.push(omitted("publications", "liste vide ou absente"));
    else {
      const items = data.publications
        .map(
          (item) =>
            `<li>${escapeHtml(item.year)}. <a href="${escapeHtml(item.url)}">${escapeHtml(item.title)}</a>. <em>${escapeHtml(item.venue)}</em>.</li>`,
        )
        .join("\n");
      parts.push(`<ol>\n${items}\n</ol>`);
    }
  }
  if (has(template, "projects")) {
    parts.push("<h2>Artefacts</h2>");
    if (!data.projects || data.projects.length === 0) parts.push(omitted("projets", "liste vide ou absente"));
    else {
      parts.push(
        data.projects
          .map((project) => `<p><a href="${escapeHtml(project.url)}">${escapeHtml(project.name)}</a> — ${projectBits(project)}</p>`)
          .join("\n"),
      );
    }
  }
  if (has(template, "links")) {
    parts.push("<h2>Adresses</h2>");
    parts.push(linksLine(data));
  }
  if (has(template, "colophon")) parts.push(colophon(template));
  return parts.join("\n\n");
}

function pitch(template, data, tokens, assets) {
  const parts = [];
  const banner = pushBanner(template, data, tokens, assets);
  if (banner) parts.push(banner);
  if (has(template, "identity")) {
    parts.push(`<h1>${escapeHtml(data.name)}</h1>`);
    parts.push(paragraph(data.role));
    if (data.organization) parts.push(paragraph(data.organization));
    if (data.location) parts.push(paragraph(data.location));
  }
  let slide = 0;
  const slideHeading = (title) => {
    slide += 1;
    return `<h2>${String(slide).padStart(2, "0")} — ${title}</h2>`;
  };
  if (has(template, "pitch")) {
    parts.push(slideHeading("Problème"));
    parts.push(data.pitch ? paragraph(data.pitch.problem) : omitted("pitch", "bloc absent"));
    parts.push(slideHeading("Offre"));
    parts.push(data.pitch ? paragraph(data.pitch.offer) : omitted("pitch", "bloc absent"));
    parts.push(slideHeading("Preuve"));
    parts.push(data.pitch ? paragraph(data.pitch.proof) : omitted("pitch", "bloc absent"));
  }
  if (has(template, "projects")) {
    parts.push(slideHeading("Dépôt"));
    if (!data.projects || data.projects.length === 0) parts.push(omitted("projets", "liste vide ou absente"));
    else {
      parts.push(
        data.projects
          .map((project) => `<p><a href="${escapeHtml(project.url)}">${escapeHtml(project.name)}</a> — ${projectBits(project)}</p>`)
          .join("\n"),
      );
    }
  }
  if (has(template, "links")) {
    parts.push(slideHeading("Contact"));
    parts.push(linksLine(data));
  }
  if (has(template, "colophon")) parts.push(colophon(template));
  return parts.join("\n\n");
}

function briefing(template, data, tokens, assets) {
  const parts = [];
  const banner = pushBanner(template, data, tokens, assets);
  if (banner) parts.push(banner);
  const mast = ["DIFFUSION : DÉFENSIVE", "CLASSEMENT : PUBLIC", "OBJET : durcissement et divulgation", `${data.name} — ${data.role}`];
  if (data.organization) mast.push(`Organisation : ${data.organization}`);
  parts.push(pre(mast.join("\n")));
  parts.push(`<h1>${escapeHtml(data.name)}</h1>`);
  parts.push("<p>Cette note décrit un périmètre de défense. Elle ne contient pas de procédure d'attaque.</p>");
  if (has(template, "prose")) {
    parts.push("<h2>Périmètre</h2>");
    parts.push(proseParagraphs(data));
  }
  if (has(template, "principles")) {
    parts.push("<h2>Principes de défense</h2>");
    if (!data.principles || data.principles.length === 0) parts.push(omitted("principes", "liste vide ou absente"));
    else parts.push(`<ol>\n${data.principles.map((item) => `<li>${escapeHtml(item)}</li>`).join("\n")}\n</ol>`);
  }
  if (has(template, "projects")) {
    parts.push("<h2>Travaux de durcissement</h2>");
    if (!data.projects || data.projects.length === 0) parts.push(omitted("projets", "liste vide ou absente"));
    else {
      parts.push(
        data.projects
          .map((project) => `<h3><a href="${escapeHtml(project.url)}">${escapeHtml(project.name)}</a></h3>\n${paragraph(project.description)}`)
          .join("\n\n"),
      );
    }
  }
  if (has(template, "links")) {
    parts.push("<h2>Divulgation coordonnée</h2>");
    parts.push("<p>Écris ici comment te signaler un problème. Décris le canal et le délai d'accusé, pas la manière de reproduire une attaque.</p>");
    parts.push(linksLine(data));
  }
  if (has(template, "colophon")) parts.push(colophon(template));
  return parts.join("\n\n");
}

function chronicle(template, data, tokens, assets) {
  const parts = [];
  const banner = pushBanner(template, data, tokens, assets);
  if (banner) parts.push(banner);
  if (has(template, "identity")) {
    parts.push(`<h1>${escapeHtml(data.name)}</h1>`);
    parts.push(paragraph(data.role));
    if (data.organization) parts.push(paragraph(data.organization));
    if (data.location) parts.push(paragraph(data.location));
  }
  if (has(template, "prose")) {
    parts.push("<h2>Fil</h2>");
    parts.push(proseParagraphs(data));
  }
  if (has(template, "timeline")) {
    parts.push("<h2>Chronique</h2>");
    if (!data.timeline || data.timeline.length === 0) parts.push(omitted("parcours", "liste vide ou absente"));
    else {
      parts.push(
        data.timeline
          .map((item) => `<h3>${escapeHtml(item.period)} — ${escapeHtml(item.title)}</h3>\n${paragraph(item.detail)}`)
          .join("\n\n"),
      );
    }
  }
  if (has(template, "projects")) {
    parts.push("<h2>Chapitre en cours</h2>");
    if (!data.projects || data.projects.length === 0) parts.push(omitted("projets", "liste vide ou absente"));
    else {
      parts.push(
        data.projects
          .map((project) => `<h3><a href="${escapeHtml(project.url)}">${escapeHtml(project.name)}</a></h3>\n${paragraph(project.description)}`)
          .join("\n\n"),
      );
    }
  }
  if (has(template, "links")) {
    parts.push("<h2>Suite</h2>");
    parts.push(linksLine(data));
  }
  if (has(template, "colophon")) parts.push(colophon(template));
  return parts.join("\n\n");
}

function desk(template, data, tokens, assets) {
  const parts = [];
  const banner = pushBanner(template, data, tokens, assets);
  if (banner) parts.push(banner);
  if (has(template, "identity")) {
    parts.push(`<h1>${escapeHtml(data.name)}</h1>`);
    parts.push(paragraph(data.role));
    if (data.organization) parts.push(paragraph(data.organization));
    if (data.location) parts.push(paragraph(data.location));
  }
  if (has(template, "prose")) {
    parts.push("<h2>Tenue</h2>");
    parts.push(proseParagraphs(data));
  }
  if (has(template, "projects")) {
    parts.push("<h2>Bureau</h2>");
    if (!data.projects || data.projects.length === 0) parts.push(omitted("projets", "liste vide ou absente"));
    else {
      const rows = data.projects
        .map((project) => {
          const language = project.language ? escapeHtml(project.language) : "non indiqué";
          const stars = project.stars !== undefined ? ` · ${project.stars} étoiles` : "";
          return `<tr><td><a href="${escapeHtml(project.url)}">${escapeHtml(project.name)}</a></td><td>${escapeHtml(project.description)}</td><td>${language}${stars}</td></tr>`;
        })
        .join("\n");
      parts.push(`<table>\n<thead><tr><th>Dépôt</th><th>Engagement</th><th>Langage</th></tr></thead>\n<tbody>\n${rows}\n</tbody>\n</table>`);
    }
  }
  if (has(template, "principles")) {
    parts.push("<h2>Règles de maintenance</h2>");
    if (!data.principles || data.principles.length === 0) parts.push(omitted("principes", "liste vide ou absente"));
    else parts.push(`<ol>\n${data.principles.map((item) => `<li>${escapeHtml(item)}</li>`).join("\n")}\n</ol>`);
  }
  if (has(template, "links")) {
    parts.push("<h2>File d'accueil</h2>");
    parts.push(linksLine(data));
  }
  if (has(template, "colophon")) parts.push(colophon(template));
  return parts.join("\n\n");
}

function studio(template, data, tokens, assets) {
  const parts = [];
  const banner = pushBanner(template, data, tokens, assets);
  if (banner) parts.push(banner);
  parts.push("<p><em>Atelier</em></p>");
  if (has(template, "identity")) {
    parts.push(`<h1>${escapeHtml(data.name)}</h1>`);
    parts.push(paragraph(data.role));
    if (data.organization) parts.push(paragraph(data.organization));
    if (data.location) parts.push(paragraph(data.location));
  }
  if (has(template, "prose")) {
    parts.push("<h2>Intention</h2>");
    parts.push(proseParagraphs(data));
  }
  if (has(template, "stack")) {
    parts.push("<h2>Matières</h2>");
    if (!data.stack || data.stack.length === 0) parts.push(omitted("stack", "liste vide ou absente"));
    else {
      parts.push(
        data.stack
          .map((group) => `<p><strong>${escapeHtml(group.name)}</strong> — ${group.items.map((item) => escapeHtml(item)).join(", ")}</p>`)
          .join("\n"),
      );
    }
  }
  if (has(template, "projects")) {
    parts.push("<h2>Mur d'atelier</h2>");
    if (!data.projects || data.projects.length === 0) parts.push(omitted("projets", "liste vide ou absente"));
    else {
      parts.push(
        data.projects
          .map((project, index) => {
            const number = String(index + 1).padStart(2, "0");
            return `<h3>Planche ${number} — ${escapeHtml(project.name)}</h3>\n${paragraph(project.description)}\n<p><a href="${escapeHtml(project.url)}">${escapeHtml(project.url)}</a>${project.language ? ` · ${escapeHtml(project.language)}` : ""}</p>\n<hr/>`;
          })
          .join("\n\n"),
      );
    }
  }
  if (has(template, "links")) {
    parts.push("<h2>Visite</h2>");
    parts.push(linksLine(data));
  }
  if (has(template, "colophon")) parts.push(colophon(template));
  return parts.join("\n\n");
}

export function renderLayout(template, data, tokens, assets) {
  const render = RENDERERS[template.layout];
  if (!render) fail("TEMPLATE_INVALIDE", "layout");
  return render(template, data, tokens, assets);
}
