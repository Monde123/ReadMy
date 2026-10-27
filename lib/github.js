import { fail } from "./errors.js";

const ROLE_PATTERNS = [
  /(?:senior|lead|staff|principal|junior)?\s*(?:software|systems?|backend|frontend|full-?stack|ml|ai|data|devops|cloud|security|platform|embedded)\s*(?:engineer|developer|architect|designer|researcher|operator|builder)/i,
  /(?:founder|co-founder|cto|ceo|tech\s*lead|engineering\s*manager|doctorant|chercheur|étudiant)/i,
];

export function inferRole(bio, topLanguages = []) {
  if (bio && typeof bio === "string") {
    for (const pattern of ROLE_PATTERNS) {
      const match = bio.match(pattern);
      if (match) return match[0].trim();
    }
    // Première phrase courte si elle ressemble à un titre
    const firstSentence = bio.split(/[.\n•|]/)[0].trim();
    if (firstSentence.length > 3 && firstSentence.length <= 50 && !firstSentence.includes("http")) {
      return firstSentence;
    }
  }

  // Déduction basée sur la stack dominante
  const top = topLanguages[0]?.name;
  if (top === "Rust" || top === "Go" || top === "C" || top === "C++") {
    return "Systems & Backend Software Engineer";
  }
  if (top === "Python" || top === "Jupyter Notebook") {
    return "AI & Data Systems Engineer";
  }
  if (top === "TypeScript" || top === "JavaScript" || top === "HTML" || top === "CSS") {
    return "Full-Stack Web Engineer";
  }
  if (top === "Swift" || top === "Kotlin" || top === "Dart") {
    return "Mobile Applications Developer";
  }

  return "Software Engineer";
}

export function computeTopLanguages(repos = []) {
  const counts = new Map();
  for (const repo of repos) {
    if (repo.language && typeof repo.language === "string") {
      counts.set(repo.language, (counts.get(repo.language) || 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function suggestTemplates({ github, topLanguages = [], inferredRole = "" }) {
  const suggestions = [];
  const textCorpus = `${github.bio || ""} ${github.name || ""} ${inferredRole} ${topLanguages.map((l) => l.name).join(" ")}`.toLowerCase();

  if (/ai|machine learning|llm|inference|cuda|pytorch|deep learning/.test(textCorpus)) {
    suggestions.push({
      id: "003-ai-engineer",
      reason: "Vos dépôts et votre profil portent sur l'IA, les modèles ou les calculs tensoriels.",
    });
  }
  if (/sre|devops|cloud|kubernetes|docker|ebpf|distributed|cluster/.test(textCorpus)) {
    suggestions.push({
      id: "014-neon-command-center",
      reason: "Forte composante d'infrastructure, de haute disponibilité et d'orchestration distribuée.",
    });
  }
  if (/security|hacker|cve|vuln|exploit|reverse|firmware/.test(textCorpus)) {
    suggestions.push({
      id: "031-cyberpunk-netrunner",
      reason: "Profil axé sur la sécurité offensive, l'audit de bas niveau et l'investigation.",
    });
  }
  if (/data|streaming|kafka|flink|clickhouse|olap|etl/.test(textCorpus)) {
    suggestions.push({
      id: "016-data-dashboard",
      reason: "Architecture de flux temps réel, stockage analytique et topologies de données.",
    });
  }
  if (/founder|startup|ceo|co-founder|saas|arr|mrr|business/.test(textCorpus)) {
    suggestions.push({
      id: "024-pitch-deck",
      reason: "Parfait pour valoriser une offre, des métriques de traction et une proposition de valeur.",
    });
  }

  // Fallbacks universels indispensables
  if (!suggestions.some((s) => s.id === "engineer")) {
    suggestions.push({
      id: "engineer",
      reason: "Fiche technique robuste et moderne avec cartes projets 2 colonnes.",
    });
  }
  if (!suggestions.some((s) => s.id === "minimal")) {
    suggestions.push({
      id: "minimal",
      reason: "Une page courte, sobre et élégante sans superflu.",
    });
  }
  if (!suggestions.some((s) => s.id === "terminal")) {
    suggestions.push({
      id: "terminal",
      reason: "Style console épuré pour les amoureux de la ligne de commande.",
    });
  }

  return suggestions.slice(0, 3);
}

export async function fetchGitHubProfile(username, token = process.env.GITHUB_TOKEN) {
  if (!username || typeof username !== "string" || username.trim() === "") {
    fail("ARGUMENT_INVALIDE", "identifiant GitHub manquant");
  }
  const cleanUser = username.trim();
  const headers = {
    "User-Agent": "ReadMy-CLI",
    "Accept": "application/vnd.github.v3+json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const userRes = await fetch(`https://api.github.com/users/${encodeURIComponent(cleanUser)}`, { headers });
  if (!userRes.ok) {
    if (userRes.status === 404) fail("PROFIL_INCONNU", `utilisateur GitHub '${cleanUser}' introuvable`);
    if (userRes.status === 403) fail("RATE_LIMIT", `limite API GitHub atteinte`);
    fail("API_GITHUB", `erreur HTTP ${userRes.status}`);
  }
  const user = await userRes.json();

  let repos = [];
  try {
    const reposRes = await fetch(
      `https://api.github.com/users/${encodeURIComponent(cleanUser)}/repos?sort=updated&per_page=100`,
      { headers },
    );
    if (reposRes.ok) {
      const rawRepos = await reposRes.json();
      repos = rawRepos
        .filter((r) => !r.fork)
        .sort((a, b) => b.stargazers_count - a.stargazers_count || a.name.localeCompare(b.name))
        .map((r) => ({
          name: r.name,
          html_url: r.html_url,
          description: r.description,
          language: r.language,
          stargazers_count: r.stargazers_count,
          fork: false,
        }));
    }
  } catch {
    // Si la liste des dépôts échoue, on continue avec le profil seul
  }

  const topLanguages = computeTopLanguages(repos);
  const inferredRole = inferRole(user.bio, topLanguages);
  const githubData = {
    login: user.login,
    name: user.name || user.login,
    bio: user.bio,
    company: user.company,
    blog: user.blog,
    location: user.location,
    email: user.email,
    twitter_username: user.twitter_username,
    repos,
  };

  const recommendations = suggestTemplates({
    github: githubData,
    topLanguages,
    inferredRole,
  });

  return {
    github: githubData,
    consent: {
      showLocation: false,
      showEmail: false,
      showCompany: false,
      showSocial: false,
    },
    overrides: {
      role: inferredRole,
    },
    meta: {
      topLanguages,
      inferredRole,
      recommendations,
    },
  };
}
