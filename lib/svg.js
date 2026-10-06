import { escapeHtml } from "./xml.js";
import { fail } from "./errors.js";

const STYLES = new Set(["rule", "terminal", "masthead", "sheet"]);

function fontSize(text, large, small, threshold) {
  return text.length > threshold ? small : large;
}

export function bannerSvg({ tokens, themeName, mode, style, name, role }) {
  if (!STYLES.has(style)) fail("BANNIERE_INCONNUE", String(style));
  const theme = tokens.themes[themeName]?.[mode];
  if (!theme) fail("THEME_INCONNU", `${themeName}/${mode}`);
  const font = style === "terminal" ? tokens.type.mono : tokens.type.sans;
  const title = escapeHtml(`${name} — ${role}`);
  const safeName = escapeHtml(name);
  const safeRole = escapeHtml(role);
  const safeFont = escapeHtml(font);
  const width = 880;
  const height = 140;
  let body = "";
  if (style === "rule") {
    const nameSize = fontSize(name, 32, 22, 32);
    const roleSize = fontSize(role, 16, 13, 70);
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
  <text x="32" y="110" fill="${theme.muted}" font-family="${safeFont}" font-size="${fontSize(role, 16, 13, 70)}">${safeRole}</text>`;
  } else {
    body = `
  <text x="32" y="40" fill="${theme.muted}" font-family="${safeFont}" font-size="13">NOM</text>
  <text x="140" y="40" fill="${theme.text}" font-family="${safeFont}" font-size="${fontSize(name, 18, 14, 48)}">${safeName}</text>
  <text x="32" y="72" fill="${theme.muted}" font-family="${safeFont}" font-size="13">ROLE</text>
  <text x="140" y="72" fill="${theme.text}" font-family="${safeFont}" font-size="${fontSize(role, 18, 14, 60)}">${safeRole}</text>
  <line x1="32" y1="96" x2="848" y2="96" stroke="${theme.line}" stroke-width="2"/>
  <text x="32" y="122" fill="${theme.accent}" font-family="${safeFont}" font-size="13">READMY · SVG LOCAL</text>`;
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img">
  <title>${title}</title>
  <rect width="${width}" height="${height}" fill="${theme.bg}"/>${body}
</svg>
`;
}
