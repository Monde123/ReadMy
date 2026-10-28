import { fail } from "./errors.js";
import { renderTemplate } from "./render.js";

const ADAPTER_PROJECT_CAP = 4;

function provenance(field, source, reason) {
  return reason ? { field, source, reason } : { field, source };
}

export function adaptProfile({ template, github, consent, overrides, tokens, registry }) {
  if (!template || typeof template !== "object" || !Array.isArray(template.components)) {
    fail("UNKNOWN_TEMPLATE", "template missing or incomplete");
  }
  if (github === null || typeof github !== "object" || Array.isArray(github)) {
    fail("INCOMPLETE_PROFILE", "expected github object");
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
    notes.push(provenance("consent", "default", "missing object, documented default is false for all four keys"));
  }
  if (typeof consentInput !== "object" || Array.isArray(consentInput)) {
    fail("INVALID_PROFILE", "consent");
  }
  for (const key of Object.keys(resolvedConsent)) {
    if (consentInput[key] === undefined) {
      if (consent) notes.push(provenance(`consent.${key}`, "default", "missing key, documented default false"));
    } else if (typeof consentInput[key] !== "boolean") {
      fail("INVALID_PROFILE", `consent.${key}`);
    } else {
      resolvedConsent[key] = consentInput[key];
      notes.push(provenance(`consent.${key}`, "user"));
    }
  }
  const userOverrides = overrides ?? {};
  if (typeof userOverrides !== "object" || Array.isArray(userOverrides)) fail("INVALID_PROFILE", "overrides");

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
    fail("INCOMPLETE_PROFILE", "name and login missing");
  }

  if (typeof userOverrides.role === "string") {
    profile.role = userOverrides.role;
    notes.push(provenance("role", "user"));
  } else if (template.components.includes("banner") || template.requires?.includes("role")) {
    profile.role = "{{role}}";
    placeholders.push("role");
    warnings.push("missing role: placeholder {{role}}, no title invented");
    notes.push(provenance("role", "placeholder"));
  }

  if (typeof userOverrides.summary === "string") {
    if (userOverrides.summary.trim() === "") fail("EMPTY_FIELD", "overrides.summary");
    profile.summary = userOverrides.summary;
    notes.push(provenance("summary", "user"));
  } else if (!template.components.includes("prose")) {
    notes.push(provenance("summary", "omitted", "prose component absent from template"));
  } else if (typeof github.bio === "string" && github.bio.trim() !== "") {
    profile.summary = github.bio;
    notes.push(provenance("summary", "github.bio"));
  } else {
    placeholders.push("bio");
    warnings.push("missing bio: prose section omitted");
    notes.push(provenance("summary", "omitted", "github.bio empty"));
  }

  if (resolvedConsent.showLocation && typeof github.location === "string" && github.location.trim() !== "") {
    profile.location = github.location;
    notes.push(provenance("location", "github.location"));
  } else {
    notes.push(provenance("location", "omitted", resolvedConsent.showLocation ? "github.location empty" : "consent.showLocation=false"));
  }

  if (resolvedConsent.showCompany && typeof github.company === "string" && github.company.trim() !== "") {
    profile.organization = github.company;
    notes.push(provenance("organization", "github.company"));
  } else {
    notes.push(provenance("organization", "omitted", resolvedConsent.showCompany ? "github.company empty" : "consent.showCompany=false"));
  }

  if (!Array.isArray(github.repos)) fail("INVALID_PROFILE", "repos must be a list");
  const knownNames = new Set();
  const accepted = [];
  for (const repo of github.repos) {
    if (repo === null || typeof repo !== "object" || Array.isArray(repo)) fail("INCOMPLETE_REPO", "invalid entry");
    if (typeof repo.name !== "string" || repo.name.trim() === "") fail("INCOMPLETE_REPO", "name");
    if (typeof repo.html_url !== "string" || repo.html_url.trim() === "") fail("INCOMPLETE_REPO", "html_url");
    if (typeof repo.fork !== "boolean") fail("INCOMPLETE_REPO", "fork");
    knownNames.add(repo.name);
    if (repo.fork) continue;
    const description = typeof repo.description === "string" && repo.description.trim() !== ""
      ? repo.description
      : "No public description.";
    const project = {
      name: repo.name,
      url: repo.html_url,
      description,
    };
    if (typeof repo.language === "string" && repo.language.trim() !== "") project.language = repo.language;
    if (repo.stargazers_count !== undefined && repo.stargazers_count !== null) {
      if (typeof repo.stargazers_count !== "number" || !Number.isInteger(repo.stargazers_count) || repo.stargazers_count < 0) {
        fail("INVALID_PROFILE", "stargazers_count");
      }
      project.stars = repo.stargazers_count;
    }
    accepted.push(project);
  }
  accepted.sort((left, right) => (right.stars ?? -1) - (left.stars ?? -1) || left.name.localeCompare(right.name));

  let projects;
  if (Array.isArray(userOverrides.projects)) {
    projects = userOverrides.projects.map((item) => {
      if (!item || typeof item.name !== "string") fail("INCOMPLETE_REPO", "override");
      if (!knownNames.has(item.name)) {
        warnings.push(`untracked project: ${item.name} — verify not fabricated`);
      }
      notes.push(provenance(`projects.${item.name}`, "user"));
      return item;
    });
  } else {
    projects = accepted.slice(0, ADAPTER_PROJECT_CAP);
    notes.push(provenance("projects", "github.repos", `cap ${ADAPTER_PROJECT_CAP}, forks excluded`));
    if (accepted.length > ADAPTER_PROJECT_CAP) {
      warnings.push(`omitted repositories exceeding cap: ${accepted.length - ADAPTER_PROJECT_CAP}`);
    }
    if (projects.length === 0) {
      placeholders.push("projects");
      warnings.push("no un-forked public repositories found");
    }
  }
  if (projects.length > 0 && template.components.includes("projects")) profile.projects = projects;
  else if (projects.length > 0) {
    warnings.push("projects ignored: projects component absent from template");
    notes.push(provenance("projects", "omitted", "projects component absent"));
  }

  const languages = [];
  for (const project of projects) {
    if (project.language && !languages.includes(project.language)) languages.push(project.language);
  }
  if (languages.length > 0 && template.components.includes("stack")) {
    profile.stack = [{ name: "Languages", items: languages }];
    notes.push(provenance("stack", "github.repos.language"));
  } else if (!template.components.includes("stack")) {
    notes.push(provenance("stack", "omitted", "stack component absent from template"));
  } else {
    notes.push(provenance("stack", "omitted", "no public languages found"));
  }

  if (Array.isArray(userOverrides.badges) && template.components.includes("tech-badges")) {
    profile.badges = userOverrides.badges;
    notes.push(provenance("badges", "user"));
  }

  const links = [];
  if (typeof github.login === "string" && /^[A-Za-z0-9-]+$/.test(github.login)) {
    links.push({ label: "GitHub", url: `https://github.com/${github.login}` });
    notes.push(provenance("links.github", "github.login"));
  }
  if (typeof github.blog === "string" && github.blog.trim() !== "") {
    try {
      const blog = new URL(github.blog);
      if (blog.protocol === "https:") links.push({ label: "Website", url: github.blog });
      else warnings.push("blog ignored: URL is not https");
    } catch {
      warnings.push("blog ignored: URL is not https");
    }
  }
  if (resolvedConsent.showEmail) {
    const email = typeof userOverrides.email === "string" ? userOverrides.email : github.email;
    if (typeof email === "string" && email.trim() !== "") {
      const trimmed = email.trim();
      if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(trimmed)) {
        fail("INVALID_IDENTIFIER", "email");
      }
      links.push({ label: "Email", url: `mailto:${trimmed}` });
      notes.push(provenance("email", "user-or-github"));
    } else {
      warnings.push("email requested but missing");
      notes.push(provenance("email", "omitted", "missing value"));
    }
  } else {
    notes.push(provenance("email", "omitted", "consent.showEmail=false"));
  }
  if (resolvedConsent.showSocial && typeof github.twitter_username === "string" && github.twitter_username.trim() !== "") {
    if (!/^[A-Za-z0-9_]{1,15}$/.test(github.twitter_username)) fail("INVALID_IDENTIFIER", "twitter_username");
    links.push({ label: "X", url: `https://x.com/${github.twitter_username}` });
    notes.push(provenance("social", "github.twitter_username"));
  } else {
    notes.push(provenance("social", "omitted", "consent.showSocial=false or handle missing"));
  }

  if (Array.isArray(userOverrides.links)) {
    for (const link of userOverrides.links) {
      if (link && typeof link.label === "string" && typeof link.url === "string") {
        if (!link.url.startsWith("https://") && !link.url.startsWith("mailto:")) {
          fail("INVALID_URL", link.url);
        }
        links.push(link);
        notes.push(provenance(`links.${link.label}`, "user"));
      }
    }
  }

  if (links.length > 0 && template.components.includes("links")) profile.links = links;
  else if (links.length > 0) {
    warnings.push("links ignored: links component absent from template");
    notes.push(provenance("links", "omitted", "links component absent"));
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
