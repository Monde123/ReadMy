import { escapeHtml } from "./xml.js";
import { fail } from "./errors.js";

const STYLES = new Set(["rule", "terminal", "masthead", "sheet", "cyber-hud", "blueprint", "retro-ascii"]);

function fontSize(text, large, small, threshold) {
  return text.length > threshold ? small : large;
}

export function bannerSvg({ tokens, themeName, mode, style, name, role }) {
  if (!STYLES.has(style)) fail("BANNIERE_INCONNUE", String(style));
  const theme = tokens.themes[themeName]?.[mode];
  if (!theme) fail("THEME_INCONNU", `${themeName}/${mode}`);
  const font = (style === "terminal" || style === "cyber-hud" || style === "retro-ascii") ? tokens.type.mono : tokens.type.sans;
  const hasRole = Boolean(role && role !== "{{role}}" && role.trim() !== "");
  const title = escapeHtml(hasRole ? `${name} — ${role}` : name);
  const safeName = escapeHtml(name);
  const safeRole = escapeHtml(hasRole ? role : "");
  const safeFont = escapeHtml(font);
  const width = 880;
  const height = 140;

  let body = "";
  let defs = "";

  if (style === "rule") {
    const nameSize = fontSize(name, 32, 22, 32);
    const roleSize = fontSize(role || "", 16, 13, 70);
    defs = `
  <defs>
    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="${theme.line}" stroke-width="0.75" opacity="0.4"/>
    </pattern>
  </defs>`;
    const roleMarkup = hasRole
      ? `<text x="36" y="94" fill="${theme.muted}" font-family="${safeFont}" font-size="${roleSize}">${safeRole}</text>`
      : "";
    const nameY = hasRole ? 60 : 76;
    body = `
  <rect width="${width}" height="${height}" fill="url(#grid)"/>
  <rect x="36" y="24" width="8" height="8" fill="${theme.accent}"/>
  <text x="54" y="32" fill="${theme.muted}" font-family="${safeFont}" font-size="11" letter-spacing="1.5">PROFILE // LOCAL SVG</text>
  <text x="36" y="${nameY}" fill="${theme.text}" font-family="${safeFont}" font-size="${nameSize}" font-weight="bold">${safeName}</text>
  ${roleMarkup}
  <line x1="36" y1="116" x2="844" y2="116" stroke="${theme.accent}" stroke-width="3"/>
  <line x1="36" y1="122" x2="200" y2="122" stroke="${theme.line}" stroke-width="1.5"/>`;
  } else if (style === "terminal") {
    const roleMarkup = hasRole ? ` — ${safeRole}` : "";
    const promptText = escapeHtml(`${name}${roleMarkup}`);
    defs = `
  <defs>
    <filter id="shadow" x="-2%" y="-2%" width="104%" height="108%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000000" flood-opacity="0.15"/>
    </filter>
  </defs>`;
    body = `
  <rect x="16" y="16" width="848" height="108" rx="8" fill="${theme.bg}" stroke="${theme.line}" stroke-width="1.5" filter="url(#shadow)"/>
  <line x1="16" y1="46" x2="864" y2="46" stroke="${theme.line}" stroke-width="1"/>
  <circle cx="36" cy="31" r="5" fill="#ff5f56"/>
  <circle cx="52" cy="31" r="5" fill="#ffbd2e"/>
  <circle cx="68" cy="31" r="5" fill="#27c93f"/>
  <text x="440" y="35" text-anchor="middle" fill="${theme.muted}" font-family="${safeFont}" font-size="11">bash — 80x24</text>
  <text x="36" y="74" fill="${theme.accent}" font-family="${safeFont}" font-size="14" font-weight="bold">$ whoami</text>
  <text x="36" y="100" fill="${theme.text}" font-family="${safeFont}" font-size="${fontSize(promptText, 17, 13, 44)}">${promptText}</text>
  <rect x="836" y="90" width="8" height="12" fill="${theme.accent}" opacity="0.8"/>`;
  } else if (style === "masthead") {
    const nameY = hasRole ? 74 : 88;
    const roleMarkup = hasRole
      ? `<text x="36" y="108" fill="${theme.muted}" font-family="${safeFont}" font-size="${fontSize(role, 16, 13, 70)}">${safeRole}</text>`
      : "";
    body = `
  <rect x="36" y="24" width="76" height="20" rx="3" fill="none" stroke="${theme.accent}" stroke-width="1.5"/>
  <text x="74" y="38" text-anchor="middle" fill="${theme.accent}" font-family="${safeFont}" font-size="10" font-weight="bold" letter-spacing="2">PROFIL</text>
  <text x="36" y="${nameY}" fill="${theme.text}" font-family="${safeFont}" font-size="${fontSize(name, 36, 24, 28)}" font-weight="bold">${safeName}</text>
  ${roleMarkup}
  <circle cx="836" cy="70" r="16" fill="none" stroke="${theme.line}" stroke-width="2"/>
  <circle cx="836" cy="70" r="8" fill="${theme.accent}" opacity="0.5"/>`;
  } else if (style === "sheet") {
    const roleLine = hasRole
      ? `  <text x="36" y="76" fill="${theme.muted}" font-family="${safeFont}" font-size="12" letter-spacing="1">ROLE</text>
  <text x="120" y="76" fill="${theme.text}" font-family="${safeFont}" font-size="${fontSize(role, 17, 14, 60)}">${safeRole}</text>`
      : "";
    const nameY = hasRole ? 44 : 58;
    body = `
  <path d="M 24 34 L 24 24 L 34 24" fill="none" stroke="${theme.accent}" stroke-width="2"/>
  <path d="M 856 34 L 856 24 L 846 24" fill="none" stroke="${theme.accent}" stroke-width="2"/>
  <path d="M 24 106 L 24 116 L 34 116" fill="none" stroke="${theme.accent}" stroke-width="2"/>
  <path d="M 856 106 L 856 116 L 846 116" fill="none" stroke="${theme.accent}" stroke-width="2"/>
  <text x="36" y="${nameY}" fill="${theme.muted}" font-family="${safeFont}" font-size="12" letter-spacing="1">NOM</text>
  <text x="120" y="${nameY}" fill="${theme.text}" font-family="${safeFont}" font-size="${fontSize(name, 20, 15, 48)}" font-weight="bold">${safeName}</text>
${roleLine}
  <line x1="36" y1="96" x2="844" y2="96" stroke="${theme.line}" stroke-width="1.5" stroke-dasharray="4 4"/>
  <text x="36" y="122" fill="${theme.accent}" font-family="${safeFont}" font-size="11" letter-spacing="1">ENGINEERING SHEET · LOCAL ASSET</text>`;
  } else if (style === "cyber-hud") {
    const nameY = hasRole ? 64 : 78;
    const roleMarkup = hasRole
      ? `<text x="36" y="98" fill="${theme.accent}" font-family="${safeFont}" font-size="14" letter-spacing="1">&gt; ${safeRole}</text>`
      : "";
    defs = `
  <defs>
    <pattern id="scanlines" width="10" height="4" patternUnits="userSpaceOnUse">
      <line x1="0" y1="2" x2="10" y2="2" stroke="${theme.line}" stroke-width="0.5" opacity="0.3"/>
    </pattern>
  </defs>`;
    body = `
  <rect width="${width}" height="${height}" fill="url(#scanlines)"/>
  <polygon points="16,34 34,16 846,16 864,34 864,122 846,140 16,140" fill="none" stroke="${theme.accent}" stroke-width="1.5"/>
  <rect x="24" y="24" width="6" height="6" fill="${theme.accent}"/>
  <text x="38" y="30" fill="${theme.muted}" font-family="${safeFont}" font-size="10" letter-spacing="2">HUD // NODE-ALPHA // SECTOR-07</text>
  <text x="840" y="30" text-anchor="end" fill="${theme.accent}" font-family="${safeFont}" font-size="10">DEFCON 5 · ONLINE</text>
  <text x="36" y="${nameY}" fill="${theme.text}" font-family="${safeFont}" font-size="${fontSize(name, 28, 20, 32)}" font-weight="bold">${safeName}</text>
  ${roleMarkup}
  <line x1="36" y1="118" x2="844" y2="118" stroke="${theme.line}" stroke-width="1"/>
  <circle cx="830" cy="118" r="4" fill="${theme.accent}"/>`;
  } else if (style === "blueprint") {
    defs = `
  <defs>
    <pattern id="bp-grid" width="24" height="24" patternUnits="userSpaceOnUse">
      <path d="M 24 0 L 0 0 0 24" fill="none" stroke="${theme.line}" stroke-width="0.75" opacity="0.5"/>
      <path d="M 12 0 L 12 24 M 0 12 L 24 12" fill="none" stroke="${theme.line}" stroke-width="0.25" opacity="0.25"/>
    </pattern>
  </defs>`;
    const roleMarkup = hasRole
      ? `<text x="36" y="96" fill="${theme.muted}" font-family="${safeFont}" font-size="14">SPEC: ${safeRole}</text>`
      : "";
    const nameY = hasRole ? 64 : 78;
    body = `
  <rect width="${width}" height="${height}" fill="url(#bp-grid)"/>
  <rect x="20" y="16" width="840" height="108" fill="none" stroke="${theme.accent}" stroke-width="1.5"/>
  <text x="36" y="34" fill="${theme.accent}" font-family="${safeFont}" font-size="10" letter-spacing="1.5">SYS ARCHITECTURE BLUEPRINT · REV 2.0</text>
  <text x="840" y="34" text-anchor="end" fill="${theme.muted}" font-family="${safeFont}" font-size="10">SCALE: 1:1</text>
  <text x="36" y="${nameY}" fill="${theme.text}" font-family="${safeFont}" font-size="${fontSize(name, 28, 20, 32)}" font-weight="bold">${safeName}</text>
  ${roleMarkup}
  <rect x="680" y="86" width="170" height="32" fill="${theme.bg}" stroke="${theme.line}" stroke-width="1"/>
  <text x="690" y="106" fill="${theme.muted}" font-family="${safeFont}" font-size="10">APPROVED // READMY</text>`;
  } else {
    // retro-ascii style
    const roleMarkup = hasRole
      ? `<text x="36" y="96" fill="${theme.accent}" font-family="${safeFont}" font-size="14">&gt;&gt; ${safeRole}</text>`
      : "";
    const nameY = hasRole ? 64 : 78;
    body = `
  <rect x="16" y="16" width="848" height="108" rx="4" fill="${theme.bg}" stroke="${theme.line}" stroke-width="2"/>
  <text x="36" y="36" fill="${theme.muted}" font-family="${safeFont}" font-size="12">╔═[ RETRO STATION 64K ]═══════════════════════════════════════════════╗</text>
  <text x="36" y="${nameY}" fill="${theme.text}" font-family="${safeFont}" font-size="${fontSize(name, 26, 18, 36)}" font-weight="bold">${safeName}</text>
  ${roleMarkup}
  <text x="36" y="118" fill="${theme.muted}" font-family="${safeFont}" font-size="12">╚══════════════════════════════════════════════════════════════════════╝</text>`;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img">
  <title>${title}</title>${defs}
  <rect width="${width}" height="${height}" fill="${theme.bg}"/>${body}
</svg>
`;
}
