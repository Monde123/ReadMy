import { fail } from "./errors.js";
import { renderTemplate } from "./render.js";

const ADAPTER_PROJECT_CAP = 4;

function provenance(field, source, reason) {
  return reason ? { field, source, reason } : { field, source };
}

export function adaptProfile({ template, github, consent, overrides, tokens, registry }) {
  if (!template || typeof template !== "object" || !Array.isArray(template.components)) {
    fail("TEMPLATE_INCONNU", "template absent ou incomplet");
  }
  if (github === null || typeof github !== "object" || Array.isArray(github)) {
    fail("PROFIL_INCOMPLET", "objet github attendu");
  }
  const notes = [];
  const warnings = [];
  const placeholders = [];
  const resolvedConsent = {
    showLocation: false,
    showEmail: false,
    showCompany: false,
    showSocial: false,
  };
  const consentInput = consent ?? {};
  if (consent === undefined || consent === null) {
    notes.push(provenance("consent", "defaut", "objet absent, défaut documenté false pour les quatre clés"));
  }
  if (typeof consentInput !== "object" || Array.isArray(consentInput)) {
    fail("PROFIL_INVALIDE", "consent");
  }
  for (const key of Object.keys(resolvedConsent)) {
    if (consentInput[key] === undefined) {
      if (consent) notes.push(provenance(`consent.${key}`, "defaut", "clé absente, défaut documenté false"));
    } else if (typeof consentInput[key] !== "boolean") {
      fail("PROFIL_INVALIDE", `consent.${key}`);
    } else {
      resolvedConsent[key] = consentInput[key];
      notes.push(provenance(`consent.${key}`, "user"));
    }
  }
  const userOverrides = overrides ?? {};
  if (typeof userOverrides !== "object" || Array.isArray(userOverrides)) fail("PROFIL_INVALIDE", "overrides");

  const profile = {};
  if (typeof userOverrides.name === "string") {
    profile.name = userOverrides.name;
    notes.push(provenance("name", "user"));
  } else if (typeof github.name === "string" && github.name.trim() !== "") {
    profile.name = github.name;
    notes.push(provenance("name", "github.name"));
  } else if (typeof github.login === "string" && github.login.trim() !== "") {
    profile.name = github.login;
    notes.push(provenance("name", "github.login"));
  } else {
    fail("PROFIL_INCOMPLET", "name et login absents");
  }

  if (typeof userOverrides.role === "string") {
    profile.role = userOverrides.role;
    notes.push(provenance("role", "user"));
  } else if (template.components.includes("banner") || template.requires?.includes("role")) {
    profile.role = "{{role}}";
    placeholders.push("role");
    warnings.push("role absent : placeholder {{role}}, aucun intitulé inventé");
    notes.push(provenance("role", "placeholder"));
  }

  if (typeof userOverrides.summary === "string") {
    if (userOverrides.summary.trim() === "") fail("CHAMP_VIDE", "overrides.summary");
    profile.summary = userOverrides.summary;
    notes.push(provenance("summary", "user"));
  } else if (!template.components.includes("prose")) {
    notes.push(provenance("summary", "omis", "composant prose absent du gabarit"));
  } else if (typeof github.bio === "string" && github.bio.trim() !== "") {
    profile.summary = github.bio;
    notes.push(provenance("summary", "github.bio"));
  } else {
    placeholders.push("bio");
    warnings.push("bio absente : section prose omise");
    notes.push(provenance("summary", "omis", "github.bio vide"));
  }

  if (resolvedConsent.showLocation && typeof github.location === "string" && github.location.trim() !== "") {
    profile.location = github.location;
    notes.push(provenance("location", "github.location"));
  } else {
    notes.push(provenance("location", "omis", resolvedConsent.showLocation ? "github.location vide" : "consentement.showLocation=false"));
  }

  if (resolvedConsent.showCompany && typeof github.company === "string" && github.company.trim() !== "") {
    profile.organization = github.company;
    notes.push(provenance("organization", "github.company"));
  } else {
    notes.push(provenance("organization", "omis", resolvedConsent.showCompany ? "github.company vide" : "consentement.showCompany=false"));
  }

  if (!Array.isArray(github.repos)) fail("PROFIL_INVALIDE", "repos doit être une liste");
  const knownNames = new Set();
  const accepted = [];
  for (const repo of github.repos) {
    if (repo === null || typeof repo !== "object" || Array.isArray(repo)) fail("DEPOT_INCOMPLET", "entrée invalide");
    if (typeof repo.name !== "string" || repo.name.trim() === "") fail("DEPOT_INCOMPLET", "name");
    if (typeof repo.html_url !== "string" || repo.html_url.trim() === "") fail("DEPOT_INCOMPLET", "html_url");
    if (typeof repo.fork !== "boolean") fail("DEPOT_INCOMPLET", "fork");
    knownNames.add(repo.name);
    if (repo.fork) continue;
    const description = typeof repo.description === "string" && repo.description.trim() !== ""
      ? repo.description
      : "Sans description publique.";
    const project = {
      name: repo.name,
      url: repo.html_url,
      description,
    };
    if (typeof repo.language === "string" && repo.language.trim() !== "") project.language = repo.language;
    if (repo.stargazers_count !== undefined && repo.stargazers_count !== null) {
      if (typeof repo.stargazers_count !== "number" || !Number.isInteger(repo.stargazers_count) || repo.stargazers_count < 0) {
        fail("PROFIL_INVALIDE", "stargazers_count");
      }
      project.stars = repo.stargazers_count;
    }
    accepted.push(project);
  }
  accepted.sort((left, right) => (right.stars ?? -1) - (left.stars ?? -1) || left.name.localeCompare(right.name));

  let projects;
  if (Array.isArray(userOverrides.projects)) {
    projects = userOverrides.projects.map((item) => {
      if (!item || typeof item.name !== "string") fail("DEPOT_INCOMPLET", "override");
      if (!knownNames.has(item.name)) {
        warnings.push(`projet hors GitHub public : ${item.name} — confirmer qu'il ne s'agit pas d'une invention`);
      }
      notes.push(provenance(`projects.${item.name}`, "user"));
      return item;
    });
  } else {
    projects = accepted.slice(0, ADAPTER_PROJECT_CAP);
    notes.push(provenance("projects", "github.repos", `plafond ${ADAPTER_PROJECT_CAP}, forks exclus`));
    if (accepted.length > ADAPTER_PROJECT_CAP) {
      warnings.push(`dépôts non retenus : ${accepted.length - ADAPTER_PROJECT_CAP}`);
    }
    if (projects.length === 0) {
      placeholders.push("projects");
      warnings.push("aucun dépôt public non forké");
    }
  }
  if (projects.length > 0 && template.components.includes("projects")) profile.projects = projects;
  else if (projects.length > 0) {
    warnings.push("projets ignorés : composant projects absent du gabarit");
    notes.push(provenance("projects", "omis", "composant projects absent"));
  }

  const languages = [];
  for (const project of projects) {
    if (project.language && !languages.includes(project.language)) languages.push(project.language);
  }
  if (languages.length > 0 && template.components.includes("stack")) {
    profile.stack = [{ name: "Langages", items: languages }];
    notes.push(provenance("stack", "github.repos.language"));
  } else if (!template.components.includes("stack")) {
    notes.push(provenance("stack", "omis", "composant stack absent du gabarit"));
  } else {
    notes.push(provenance("stack", "omis", "aucun langage public"));
  }

  const links = [];
  if (typeof github.login === "string" && /^[A-Za-z0-9-]+$/.test(github.login)) {
    links.push({ label: "GitHub", url: `https://github.com/${github.login}` });
    notes.push(provenance("links.github", "github.login"));
  }
  if (typeof github.blog === "string" && github.blog.trim() !== "") {
    try {
      const blog = new URL(github.blog);
      if (blog.protocol === "https:") links.push({ label: "Site", url: github.blog });
      else warnings.push("blog ignoré : URL non https");
    } catch {
      warnings.push("blog ignoré : URL non https");
    }
  }
  if (resolvedConsent.showEmail) {
    const email = typeof userOverrides.email === "string" ? userOverrides.email : github.email;
    if (typeof email === "string" && email.trim() !== "") {
      const trimmed = email.trim();
      if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(trimmed)) {
        fail("IDENTIFIANT_INVALIDE", "email");
      }
      links.push({ label: "Email", url: `mailto:${trimmed}` });
      notes.push(provenance("email", "user-ou-github"));
    } else {
      warnings.push("email demandé mais absent");
      notes.push(provenance("email", "omis", "valeur absente"));
    }
  } else {
    notes.push(provenance("email", "omis", "consentement.showEmail=false"));
  }
  if (resolvedConsent.showSocial && typeof github.twitter_username === "string" && github.twitter_username.trim() !== "") {
    if (!/^[A-Za-z0-9_]{1,15}$/.test(github.twitter_username)) fail("IDENTIFIANT_INVALIDE", "twitter_username");
    links.push({ label: "X", url: `https://x.com/${github.twitter_username}` });
    notes.push(provenance("social", "github.twitter_username"));
  } else {
    notes.push(provenance("social", "omis", "consentement.showSocial=false ou identifiant absent"));
  }
  if (links.length > 0 && template.components.includes("links")) profile.links = links;
  else if (links.length > 0) {
    warnings.push("liens ignorés : composant links absent du gabarit");
    notes.push(provenance("links", "omis", "composant links absent"));
  }

  const rendered = renderTemplate(template, profile, tokens, registry);
  return {
    profile,
    markdown: rendered.markdown,
    assets: rendered.assets,
    provenance: notes,
    placeholders,
    warnings,
  };
}
