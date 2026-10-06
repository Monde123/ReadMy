import { escapeHtml } from "./xml.js";
import { fail } from "./errors.js";

const STYLES = new Set([
  "rule",
  "terminal",
  "masthead",
  "sheet",
  "rfc",
  "steps",
  "cite",
  "slides",
  "stamp",
  "spine",
  "desk",
  "frame",
]);

const HEIGHT = {
  rule: 140,
  terminal: 140,
  masthead: 140,
  sheet: 140,
  rfc: 140,
  steps: 168,
  cite: 156,
  slides: 160,
  stamp: 148,
  spine: 156,
  desk: 140,
  frame: 156,
};

function fontSize(text, large, small, threshold) {
  return text.length > threshold ? small : large;
}

export function bannerSvg({ tokens, themeName, mode, style, name, role }) {
  if (!STYLES.has(style)) fail("BANNIERE_INCONNUE", String(style));
  const theme = tokens.themes[themeName]?.[mode];
  if (!theme) fail("THEME_INCONNU", `${themeName}/${mode}`);
  const font = style === "terminal" || style === "rfc" ? tokens.type.mono : tokens.type.sans;
  const title = escapeHtml(`${name} — ${role}`);
  const safeName = escapeHtml(name);
  const safeRole = escapeHtml(role);
  const safeFont = escapeHtml(font);
  const width = 880;
  const height = HEIGHT[style];
  const nameSize = fontSize(name, 32, 22, 32);
  const roleSize = fontSize(role, 16, 13, 70);
  let body = "";
  if (style === "rule") {
    body = `
  <text x="32" y="62" fill="${theme.text}" font-family="${safeFont}" font-size="${nameSize}">${safeName}</text>
  <text x="32" y="96" fill="${theme.muted}" font-family="${safeFont}" font-size="${roleSize}">${safeRole}</text>
  <line x1="32" y1="116" x2="848" y2="116" stroke="${theme.accent}" stroke-width="4"/>`;
  } else if (style === "terminal") {
    body = `
  <rect x="16" y="16" width="848" height="108" rx="10" fill="${theme.bg}" stroke="${theme.line}" stroke-width="2"/>
  <circle cx="40" cy="40" r="5" fill="${theme.accent}"/>
  <circle cx="58" cy="40" r="5" fill="${theme.muted}"/>
  <circle cx="76" cy="40" r="5" fill="${theme.line}"/>
  <text x="32" y="72" fill="${theme.muted}" font-family="${safeFont}" font-size="15">$ whoami</text>
  <text x="32" y="100" fill="${theme.text}" font-family="${safeFont}" font-size="${fontSize(`${name} ${role}`, 18, 13, 42)}">${safeName} — ${safeRole}</text>`;
  } else if (style === "masthead") {
    body = `
  <text x="32" y="36" fill="${theme.accent}" font-family="${safeFont}" font-size="13" letter-spacing="2">PROFIL</text>
  <text x="32" y="78" fill="${theme.text}" font-family="${safeFont}" font-size="${fontSize(name, 36, 24, 28)}">${safeName}</text>
  <text x="32" y="110" fill="${theme.muted}" font-family="${safeFont}" font-size="${roleSize}">${safeRole}</text>`;
  } else if (style === "sheet") {
    body = `
  <text x="32" y="40" fill="${theme.muted}" font-family="${safeFont}" font-size="13">NOM</text>
  <text x="140" y="40" fill="${theme.text}" font-family="${safeFont}" font-size="${fontSize(name, 18, 14, 48)}">${safeName}</text>
  <text x="32" y="72" fill="${theme.muted}" font-family="${safeFont}" font-size="13">ROLE</text>
  <text x="140" y="72" fill="${theme.text}" font-family="${safeFont}" font-size="${fontSize(role, 18, 14, 60)}">${safeRole}</text>
  <line x1="32" y1="96" x2="848" y2="96" stroke="${theme.line}" stroke-width="2"/>
  <text x="32" y="122" fill="${theme.accent}" font-family="${safeFont}" font-size="13">READMY · SVG LOCAL</text>`;
  } else if (style === "rfc") {
    body = `
  <text x="32" y="36" fill="${theme.accent}" font-family="${safeFont}" font-size="13">FICHE · RFC</text>
  <line x1="32" y1="48" x2="848" y2="48" stroke="${theme.accent}" stroke-width="2"/>
  <text x="32" y="88" fill="${theme.text}" font-family="${safeFont}" font-size="${fontSize(name, 28, 18, 36)}">${safeName}</text>
  <text x="32" y="116" fill="${theme.muted}" font-family="${safeFont}" font-size="${roleSize}">${safeRole}</text>`;
  } else if (style === "steps") {
    body = `
  <line x1="80" y1="44" x2="800" y2="44" stroke="${theme.line}" stroke-width="2"/>
  <circle cx="80" cy="44" r="10" fill="${theme.accent}"/>
  <circle cx="440" cy="44" r="10" fill="${theme.bg}" stroke="${theme.accent}" stroke-width="3"/>
  <circle cx="800" cy="44" r="10" fill="${theme.bg}" stroke="${theme.muted}" stroke-width="3"/>
  <text x="80" y="72" fill="${theme.text}" font-family="${safeFont}" font-size="13">fait</text>
  <text x="440" y="72" fill="${theme.text}" font-family="${safeFont}" font-size="13">en cours</text>
  <text x="800" y="72" fill="${theme.muted}" font-family="${safeFont}" font-size="13">prévu</text>
  <text x="32" y="118" fill="${theme.text}" font-family="${safeFont}" font-size="${fontSize(name, 28, 18, 36)}">${safeName}</text>
  <text x="32" y="148" fill="${theme.muted}" font-family="${safeFont}" font-size="${roleSize}">${safeRole}</text>`;
  } else if (style === "cite") {
    body = `
  <text x="32" y="32" fill="${theme.accent}" font-family="${safeFont}" font-size="13" letter-spacing="2">RECHERCHE</text>
  <line x1="32" y1="42" x2="220" y2="42" stroke="${theme.accent}" stroke-width="1"/>
  <line x1="32" y1="48" x2="220" y2="48" stroke="${theme.accent}" stroke-width="1"/>
  <text x="32" y="96" fill="${theme.text}" font-family="${safeFont}" font-size="${fontSize(name, 34, 22, 28)}">${safeName}</text>
  <text x="32" y="128" fill="${theme.muted}" font-family="${safeFont}" font-size="${roleSize}">${safeRole}</text>`;
  } else if (style === "slides") {
    body = `
  <text x="28" y="108" fill="${theme.accent}" font-family="${safeFont}" font-size="72">01</text>
  <text x="210" y="78" fill="${theme.text}" font-family="${safeFont}" font-size="${fontSize(name, 32, 20, 28)}">${safeName}</text>
  <text x="210" y="112" fill="${theme.muted}" font-family="${safeFont}" font-size="${roleSize}">${safeRole}</text>`;
  } else if (style === "stamp") {
    body = `
  <rect x="24" y="20" width="832" height="108" fill="none" stroke="${theme.accent}" stroke-width="3"/>
  <rect x="34" y="30" width="812" height="88" fill="none" stroke="${theme.line}" stroke-width="1"/>
  <text x="52" y="62" fill="${theme.accent}" font-family="${safeFont}" font-size="13">DIFFUSION DÉFENSIVE</text>
  <text x="52" y="96" fill="${theme.text}" font-family="${safeFont}" font-size="${fontSize(`${name} ${role}`, 22, 16, 40)}">${safeName} — ${safeRole}</text>`;
  } else if (style === "spine") {
    body = `
  <line x1="36" y1="16" x2="36" y2="140" stroke="${theme.accent}" stroke-width="4"/>
  <circle cx="36" cy="36" r="6" fill="${theme.accent}"/>
  <circle cx="36" cy="84" r="6" fill="${theme.bg}" stroke="${theme.accent}" stroke-width="2"/>
  <circle cx="36" cy="128" r="6" fill="${theme.bg}" stroke="${theme.muted}" stroke-width="2"/>
  <text x="64" y="78" fill="${theme.text}" font-family="${safeFont}" font-size="${fontSize(name, 30, 20, 32)}">${safeName}</text>
  <text x="64" y="110" fill="${theme.muted}" font-family="${safeFont}" font-size="${roleSize}">${safeRole}</text>`;
  } else if (style === "desk") {
    body = `
  <text x="32" y="28" fill="${theme.muted}" font-family="${safeFont}" font-size="12">DÉPÔT</text>
  <text x="320" y="28" fill="${theme.muted}" font-family="${safeFont}" font-size="12">ENGAGEMENT</text>
  <text x="640" y="28" fill="${theme.muted}" font-family="${safeFont}" font-size="12">LANGAGE</text>
  <line x1="32" y1="40" x2="848" y2="40" stroke="${theme.line}" stroke-width="2"/>
  <text x="32" y="86" fill="${theme.text}" font-family="${safeFont}" font-size="${fontSize(name, 28, 18, 36)}">${safeName}</text>
  <text x="32" y="116" fill="${theme.muted}" font-family="${safeFont}" font-size="${roleSize}">${safeRole}</text>`;
  } else {
    body = `
  <rect x="20" y="16" width="840" height="124" fill="none" stroke="${theme.line}" stroke-width="2"/>
  <rect x="28" y="24" width="824" height="108" fill="none" stroke="${theme.accent}" stroke-width="1"/>
  <text x="48" y="84" fill="${theme.text}" font-family="${safeFont}" font-size="${fontSize(name, 32, 20, 32)}">${safeName}</text>
  <text x="48" y="114" fill="${theme.muted}" font-family="${safeFont}" font-size="${roleSize}">${safeRole}</text>`;
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img">
  <title>${title}</title>
  <rect width="${width}" height="${height}" fill="${theme.bg}"/>${body}
</svg>
`;
}
