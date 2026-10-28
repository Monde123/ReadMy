import { fail } from "./errors.js";

const FRAGILE_HOSTS = [
  { host: "img.shields.io", label: "Shields.io Badges", risk: "Network dependency & latency" },
  { host: "vercel.app", label: "Vercel Readme Widgets", risk: "Quota exhaustion & downtime" },
  { host: "herokuapp.com", label: "Heroku Free Apps", risk: "Deprecations & 404/503 errors" },
  { host: "skillicons.dev", label: "Skill Icons CDN", risk: "Third-party CDN availability" },
  { host: "komarev.com", label: "Profile View Counter", risk: "Counter exploits & outage risk" },
  { host: "github-readme-stats", label: "GitHub Readme Stats", risk: "GitHub API rate-limiting" },
  { host: "github-profile-trophy", label: "GitHub Profile Trophy", risk: "Unreliable third-party server" },
  { host: "demolab.com", label: "Demolab Activity Graph", risk: "Ephemeral external hosting" },
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
      // Try next branch
    }
  }
  return null;
}

export function auditReadme(markdown, username) {
  if (!markdown || markdown.trim() === "") {
    return {
      score: 10,
      grade: "F",
      issues: ["No profile README found (the <user>/<user> repo is empty or missing)."],
      fragileImages: [],
      stats: { totalImages: 0, fragileCount: 0, hasDarkModeSupport: false },
      recommendation: "Generate a complete profile now with 'readmy init'.",
    };
  }

  const issues = [];
  const fragileFound = [];
  let score = 100;

  // 1. Third-party host detection
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
      issues.push(`${matches.length} widget(s) depending on '${item.label}' (${item.risk}).`);
    }
  }

  // 2. Dark mode support detection
  const hasPicture = /<picture\b/i.test(markdown) && /prefers-color-scheme/i.test(markdown);
  const totalImages = (markdown.match(/<img\b|!\[[^\]]*\]\(/gi) || []).length;

  if (totalImages > 0 && !hasPicture) {
    score -= 15;
    issues.push("No dark mode support detected: images and badges may be unreadable in Dark Mode.");
  }

  // 3. Missing alt tag detection
  const imgTagsWithoutAlt = markdown.match(/<img\b(?![^>]*\balt=)[^>]*>/gi) || [];
  const mdImgWithoutAlt = markdown.match(/!\[\s*\]\(/g) || [];
  const altMissing = imgTagsWithoutAlt.length + mdImgWithoutAlt.length;

  if (altMissing > 0) {
    score -= 10;
    issues.push(`${altMissing} image(s) missing 'alt' text (non-compliant with WCAG accessibility).`);
  }

  // Clamp score between 5 and 100
  score = Math.max(5, Math.min(100, score));

  let grade = "A";
  if (score < 50) grade = "F";
  else if (score < 70) grade = "C";
  else if (score < 85) grade = "B";

  let recommendation = "Your profile is already clean and durable.";
  if (score < 70) {
    recommendation = `Replace your ${fragileFound.length} third-party services with local SVGs for a permanent, unbreakable profile.`;
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
    ` PROFILE DURABILITY & HEALTH AUDIT: @${audit.username || "user"}`,
    `═══════════════════════════════════════════════════════════════════`,
    `\nDurability Score: [${bar}] ${audit.score}/100 (Grade: ${audit.grade})\n`,
  ];

  if (audit.issues.length === 0) {
    lines.push(`✓ Excellent! No fragile third-party services detected.`);
    lines.push(`✓ Your profile is immune to remote outages.`);
  } else {
    lines.push(`Fragility points detected:`);
    for (const issue of audit.issues) {
      lines.push(`  ⚠ ${issue}`);
    }
  }

  lines.push(`\nStrategic recommendation:`);
  lines.push(`  → ${audit.recommendation}`);
  lines.push(`\n═══════════════════════════════════════════════════════════════════\n`);

  return lines.join("\n");
}
