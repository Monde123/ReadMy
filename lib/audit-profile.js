import { fail } from "./errors.js";

const FRAGILE_HOSTS = [
  { host: "img.shields.io", label: "Shields.io Badges", risk: "Dépendance réseau & ralentissement" },
  { host: "vercel.app", label: "Vercel Readme Widgets", risk: "Pannes de quotas & extinction de serveur" },
  { host: "herokuapp.com", label: "Heroku Free Apps", risk: "Fin des offres gratuites & pannes 404/503" },
  { host: "skillicons.dev", label: "Skill Icons CDN", risk: "Disponibilité CDN externe non garantie" },
  { host: "komarev.com", label: "Profile View Counter", risk: "Piratage de compteurs & indisponibilité" },
  { host: "github-readme-stats", label: "GitHub Readme Stats", risk: "Rate-limiting de l'API GitHub" },
  { host: "github-profile-trophy", label: "GitHub Profile Trophy", risk: "Serveur tiers non garanti" },
  { host: "demolab.com", label: "Demolab Activity Graph", risk: "Hébergement externe éphémère" },
];

export async function fetchCurrentReadme(username) {
  const branches = ["main", "master"];
  for (const branch of branches) {
    try {
      const url = `https://raw.githubusercontent.com/${encodeURIComponent(username)}/${encodeURIComponent(username)}/${branch}/README.md`;
      const res = await fetch(url, { headers: { "User-Agent": "ReadMy-Audit-Engine" } });
      if (res.ok) {
        return { text: await res.text(), branch };
      }
    } catch {
      // Branche suivante
    }
  }
  return null;
}

export function auditReadme(markdown, username) {
  if (!markdown || markdown.trim() === "") {
    return {
      score: 10,
      grade: "F",
      issues: ["Aucun README de profil trouvé (le dépôt <user>/<user> est vide ou absent)."],
      fragileImages: [],
      stats: { totalImages: 0, fragileCount: 0, hasDarkModeSupport: false },
      recommendation: "Générez un profil complet dès maintenant avec 'readmy init'.",
    };
  }

  const issues = [];
  const fragileFound = [];
  let score = 100;

  // 1. Détection des hôtes tiers
  for (const item of FRAGILE_HOSTS) {
    const pattern = new RegExp(`https?://[^)"'\\s]*${item.host.replace(".", "\\.")}[^)"'\\s]*`, "gi");
    const matches = markdown.match(pattern) || [];
    if (matches.length > 0) {
      fragileFound.push({
        host: item.host,
        label: item.label,
        risk: item.risk,
        occurrences: matches.length,
      });
      score -= Math.min(30, matches.length * 8);
      issues.push(`${matches.length} widget(s) dépendant de '${item.label}' (${item.risk}).`);
    }
  }

  // 2. Détection du support Dark Mode
  const hasPicture = /<picture\b/i.test(markdown) && /prefers-color-scheme/i.test(markdown);
  const totalImages = (markdown.match(/<img\b|!\[[^\]]*\]\(/gi) || []).length;

  if (totalImages > 0 && !hasPicture) {
    score -= 15;
    issues.push("Aucun support du mode sombre détecté : les images et badges peuvent être illisibles en Dark Mode.");
  }

  // 3. Détection des balises alt manquantes
  const imgTagsWithoutAlt = markdown.match(/<img\b(?![^>]*\balt=)[^>]*>/gi) || [];
  const mdImgWithoutAlt = markdown.match(/!\[\s*\]\(/g) || [];
  const altMissing = imgTagsWithoutAlt.length + mdImgWithoutAlt.length;

  if (altMissing > 0) {
    score -= 10;
    issues.push(`${altMissing} image(s) sans texte alternatif 'alt' (non-conforme accessibilité WCAG).`);
  }

  // Plafonner le score entre 0 et 100
  score = Math.max(5, Math.min(100, score));

  let grade = "A";
  if (score < 50) grade = "F";
  else if (score < 70) grade = "C";
  else if (score < 85) grade = "B";

  let recommendation = "Votre profil est déjà propre et durable.";
  if (score < 70) {
    recommendation = `Remplacez vos ${fragileFound.length} services tiers par des SVG locaux et gagnez un profil indestructible sur le long terme.`;
  }

  return {
    username,
    score,
    grade,
    issues,
    fragileFound,
    stats: {
      totalImages,
      fragileCount: fragileFound.reduce((acc, curr) => acc + curr.occurrences, 0),
      hasDarkModeSupport: hasPicture,
    },
    recommendation,
  };
}

export function formatAuditReport(audit) {
  const barLength = 20;
  const filled = Math.round((audit.score / 100) * barLength);
  const bar = "■".repeat(filled) + "□".repeat(barLength - filled);

  const lines = [
    `\n═══════════════════════════════════════════════════════════════════`,
    ` AUDIT DE DURABILITÉ & SANTÉ DU PROFIL : @${audit.username || "utilisateur"}`,
    `═══════════════════════════════════════════════════════════════════`,
    `\nScore de Durabilité : [${bar}] ${audit.score}/100 (Note : ${audit.grade})\n`,
  ];

  if (audit.issues.length === 0) {
    lines.push(`✓ Excellent ! Aucun service tiers fragile détecté.`);
    lines.push(`✓ Votre profil ne risque pas de casser.`);
  } else {
    lines.push(`Points de fragilité détectés :`);
    for (const issue of audit.issues) {
      lines.push(`  ⚠ ${issue}`);
    }
  }

  lines.push(`\nRecommandation stratégique :`);
  lines.push(`  → ${audit.recommendation}`);
  lines.push(`\n═══════════════════════════════════════════════════════════════════\n`);

  return lines.join("\n");
}
