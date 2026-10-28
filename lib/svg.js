import { escapeHtml } from "./xml.js";
import { fail } from "./errors.js";

const STYLES = new Set(["rule", "terminal", "masthead", "sheet", "cyber-hud", "blueprint", "retro-ascii"]);

function fontSize(text, large, small, threshold) {
  return text.length > threshold ? small : large;
}

export function bannerSvg({ tokens, themeName, mode, style, name, role }) {
  if (!STYLES.has(style)) fail("UNKNOWN_BANNER", String(style));
  const theme = tokens.themes[themeName]?.[mode];
  if (!theme) fail("UNKNOWN_THEME", `${themeName}/${mode}`);
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
  <text x="74" y="38" text-anchor="middle" fill="${theme.accent}" font-family="${safeFont}" font-size="10" font-weight="bold" letter-spacing="2">PROFILE</text>
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
  <text x="36" y="${nameY}" fill="${theme.muted}" font-family="${safeFont}" font-size="12" letter-spacing="1">NAME</text>
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

// Vector icon definitions for local tech badges (16x16 view coordinate space)
const BADGE_ICONS = {
  rust: (color) => `<path d="M8 1a7 7 0 0 0-4.7 12.2l1.3-1A5.4 5.4 0 0 1 2.7 8a5.3 5.3 0 0 1 8.6-4.1l1.3-1A7 7 0 0 0 8 1zm0 3.3a3.7 3.7 0 1 0 0 7.4 3.7 3.7 0 0 0 0-7.4z" fill="${color}"/>`,
  python: (color) => `<path d="M7.8 1.5c-2.4 0-2.2 1-2.2 1v1.1h4.5v.7H4.5S2 4.1 2 6.5s2.2 2.3 2.2 2.3h1.3v-.6c0-.8.7-1.4 1.5-1.4h4.4c.7 0 1.3-.6 1.3-1.3V3.6s.2-2.1-2.4-2.1H7.8zm-1.6 1a.6.6 0 1 1 0 1.2.6.6 0 0 1 0-1.2zm2 12c2.4 0 2.2-1 2.2-1v-1.1H5.9v-.7h5.6s2.5.2 2.5-2.2-2.2-2.3-2.2-2.3h-1.3v.6c0 .8-.7 1.4-1.5 1.4H4.6c-.7 0-1.3.6-1.3 1.3v2.9s-.2 2.1 2.4 2.1h2.5zm1.6-1a.6.6 0 1 1 0-1.2.6.6 0 0 1 0 1.2z" fill="${color}"/>`,
  go: (color) => `<path d="M2 7.5a2.5 2.5 0 0 1 4.3-1.7l-1 .8A1.3 1.3 0 1 0 5.4 9H8V7.5H6.8v-1H9v3.7H5.4A2.5 2.5 0 0 1 2 7.5zm8 0a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0zm3.8 0a1.3 1.3 0 1 0-2.6 0 1.3 1.3 0 0 0 2.6 0z" fill="${color}"/>`,
  golang: (color) => BADGE_ICONS.go(color),
  typescript: (color) => `<rect x="1.5" y="1.5" width="13" height="13" rx="2" fill="none" stroke="${color}" stroke-width="1.2"/><path d="M4 6.5h3.6m-1.8 0v5.5m3.7-2c.4.6 1.1 1 1.8 1 .8 0 1.3-.4 1.3-.9 0-1.2-3.1-.7-3.1-2.5 0-.8.6-1.3 1.6-1.3.7 0 1.3.3 1.7.7" fill="none" stroke="${color}" stroke-width="1.2" stroke-linecap="round"/>`,
  javascript: (color) => `<rect x="1.5" y="1.5" width="13" height="13" rx="2" fill="none" stroke="${color}" stroke-width="1.2"/><path d="M5.5 8.5v2.2c0 .8-.5 1.3-1.3 1.3-.5 0-1-.2-1.2-.5m6.5-2.7c.4.5 1 1 1.7 1 .8 0 1.3-.4 1.3-1 0-1.2-3-.7-3-2.5 0-.8.6-1.3 1.6-1.3.7 0 1.2.3 1.6.7" fill="none" stroke="${color}" stroke-width="1.2" stroke-linecap="round"/>`,
  docker: (color) => `<path d="M1 9.5c.3 2.5 2.3 4.5 5 4.5 4.2 0 6.5-2.7 7.5-6.5-1-.2-2 .3-2.5.8-.8-.4-1.8-.4-2.6 0V7.5H3.6v2H1zm4.5-5h1.8v1.6H5.5V4.5zm2.4 0h1.8v1.6H7.9V4.5zm-4.8 2.2h1.8v1.6H3.1V6.7zm2.4 0h1.8v1.6H5.5V6.7zm2.4 0h1.8v1.6H7.9V6.7z" fill="${color}"/>`,
  linux: (color) => `<path d="M8 1.5c-1.8 0-2.8 1.8-2.8 3.5 0 .8.2 1.8.6 2.5C4.3 8.3 3 10.3 3 12.5c0 1.4 1 2 2.5 2 1.3 0 1.8-.7 2.5-.7s1.2.7 2.5.7c1.5 0 2.5-.6 2.5-2 0-2.2-1.3-4.2-2.8-5 .4-.7.6-1.7.6-2.5 0-1.7-1-3.5-2.8-3.5zm-1 3.5a.6.6 0 1 1 0-1.2.6.6 0 0 1 0 1.2zm2 0a.6.6 0 1 1 0-1.2.6.6 0 0 1 0 1.2z" fill="${color}"/>`,
  react: (color) => `<ellipse cx="8" cy="8" rx="6.5" ry="2.5" fill="none" stroke="${color}" stroke-width="1" transform="rotate(30 8 8)"/><ellipse cx="8" cy="8" rx="6.5" ry="2.5" fill="none" stroke="${color}" stroke-width="1" transform="rotate(90 8 8)"/><ellipse cx="8" cy="8" rx="6.5" ry="2.5" fill="none" stroke="${color}" stroke-width="1" transform="rotate(150 8 8)"/><circle cx="8" cy="8" r="1.3" fill="${color}"/>`,
  kubernetes: (color) => `<polygon points="8,1.5 14,4.8 14,11.2 8,14.5 2,11.2 2,4.8" fill="none" stroke="${color}" stroke-width="1.2"/><circle cx="8" cy="8" r="2.2" fill="none" stroke="${color}" stroke-width="1"/><line x1="8" y1="5.8" x2="8" y2="2" stroke="${color}" stroke-width="1"/><line x1="9.9" y1="9.1" x2="13.2" y2="11" stroke="${color}" stroke-width="1"/><line x1="6.1" y1="9.1" x2="2.8" y2="11" stroke="${color}" stroke-width="1"/>`,
  k8s: (color) => BADGE_ICONS.kubernetes(color),
  git: (color) => `<path d="M13.5 7.2l-4.7-4.7a1.2 1.2 0 0 0-1.7 0L5.7 4l2 2a1.4 1.4 0 0 1 1.7 1.7l1.9 1.9a1.4 1.4 0 1 1-.8.8l-1.8-1.8v3.2a1.4 1.4 0 1 1-1.2 0V7.8a1.4 1.4 0 0 1-.7-1.8L4.8 4 2.5 6.3a1.2 1.2 0 0 0 0 1.7l4.7 4.7a1.2 1.2 0 0 0 1.7 0l4.6-4.6a1.2 1.2 0 0 0 0-1.7z" fill="${color}"/>`,
  postgresql: (color) => `<ellipse cx="8" cy="5" rx="5.5" ry="2" fill="none" stroke="${color}" stroke-width="1.2"/><path d="M2.5 5v3c0 1.1 2.5 2 5.5 2s5.5-.9 5.5-2V5m-11 3v3c0 1.1 2.5 2 5.5 2s5.5-.9 5.5-2V8" fill="none" stroke="${color}" stroke-width="1.2"/>`,
  postgres: (color) => BADGE_ICONS.postgresql(color),
  swift: (color) => `<path d="M13.5 13.5C9.5 14 5 10.5 3 6c1.5 2 3.5 3.5 6 3.5-2-1.5-3-3.5-3-5.5 3 3 7 4 8.5 3.5-1.5 1-2.5 2.5-1 6z" fill="${color}"/>`,
  cpp: (color) => `<path d="M7 5.5a3 3 0 1 0 0 5 3 3 0 0 0 0-5zm3 1.5v2m-1-1h2m3-1v2m-1-1h2" fill="none" stroke="${color}" stroke-width="1.2" stroke-linecap="round"/>`,
  "c++": (color) => BADGE_ICONS.cpp(color),
  c: (color) => `<path d="M10 5a4 4 0 1 0 0 6" fill="none" stroke="${color}" stroke-width="1.4" stroke-linecap="round"/>`,
  database: (color) => `<ellipse cx="8" cy="4.5" rx="5" ry="2" fill="none" stroke="${color}" stroke-width="1.2"/><path d="M3 4.5v7c0 1.1 2.2 2 5 2s5-.9 5-2v-7" fill="none" stroke="${color}" stroke-width="1.2"/>`,
  figma: (color) => `<path d="M5 1.5a2.5 2.5 0 0 1 2.5 2.5v2.5H5a2.5 2.5 0 1 1 0-5zm3.5 0H11a2.5 2.5 0 1 1 0 5H8.5v-5zm0 5H11a2.5 2.5 0 1 1 0 5H8.5v-5zm-3.5 0H7.5V9a2.5 2.5 0 1 1-2.5-2.5zm3.5 2.5H11a2.5 2.5 0 1 1-2.5 2.5V9z" fill="${color}"/>`,
  css: (color) => `<path d="M3 1.5l1 11.5 4 1.5 4-1.5 1-11.5H3zm8 3.5H6.2l.2 2h4.4l-.4 4.5-2.2.7-2.2-.7-.1-1.5h1.4l.1.5.8.2.8-.2.2-2H5.1L4.7 3.5h7.5l-.2 1.5z" fill="${color}"/>`,
  html: (color) => `<path d="M3 1.5l1 11.5 4 1.5 4-1.5 1-11.5H3zm8 3.5H6.2l.1 1.8h4.5l-.4 4.7-2.4.7-2.4-.7-.2-1.8h1.4l.1.7 1.1.3 1.1-.3.2-2.1H5l-.4-5h6.6l-.2 1.4z" fill="${color}"/>`,
  kafka: (color) => `<path d="M8 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-4.5 5a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm9 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM8 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" fill="${color}"/><path d="M7 5.5l-2.5 2.5m4-2.5l2.5 2.5m-2.5 5.5l2.5-2.5m-4 0L4.5 10.5" stroke="${color}" stroke-width="1.2" fill="none"/>`,
  redis: (color) => `<path d="M8 2l6 3.5-6 3.5-6-3.5L8 2zm-6 5.5l6 3.5 6-3.5v2l-6 3.5-6-3.5v-2zm0 3.5l6 3.5 6-3.5v2l-6 3.5-6-3.5v-2z" fill="none" stroke="${color}" stroke-width="1.2"/>`,
  pytorch: (color) => `<path d="M9.5 2.5a4.5 4.5 0 0 0-4 6.7L3.5 11.2a1 1 0 1 0 1.4 1.4l1.9-1.9A4.5 4.5 0 1 0 9.5 2.5zm1.5 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" fill="${color}"/>`,
  cuda: (color) => `<path d="M8 2.5C4.4 2.5 1.5 5.4 1.5 9c0 1.9.8 3.6 2.1 4.8l1.4-1.4A5 5 0 0 1 3.5 9c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5c0 1.4-.6 2.6-1.6 3.4l1.4 1.4A6.9 6.9 0 0 0 14.5 9c0-3.6-2.9-6.5-6.5-6.5z" fill="${color}"/>`,
  wasm: (color) => `<rect x="1.5" y="2.5" width="13" height="11" rx="2" fill="none" stroke="${color}" stroke-width="1.2"/><path d="M4 6.5l1.2 4 1-3.2 1 3.2 1.2-4m1.8 1.5c.3-.5.8-.8 1.4-.8.7 0 1.2.4 1.2 1 0 1-2 .7-2 1.8 0 .6.5 1 1.2 1 .5 0 1-.3 1.3-.7" fill="none" stroke="${color}" stroke-width="1.2" stroke-linecap="round"/>`,
  neovim: (color) => `<path d="M3.5 2.5l5.5 11h2.5l-5.5-11H3.5zm5 0l4 11h-2l-4-11h2zm-4 1.5h1.8v7.5H4.5V4zm7 0h1.8v7.5h-1.8V4z" fill="${color}"/>`,
  haskell: (color) => `<path d="M2.5 2.5l3.5 5.5-3.5 5.5h2l2.5-3.9 2.5 3.9h2l-3.5-5.5 3.5-5.5h-2L6.5 6.4 4.5 2.5h-2zm7 4.5h4v1.5h-4V7zm1 3h3v1.5h-3v-1.5z" fill="${color}"/>`,
  duckdb: (color) => `<path d="M8 2.5a3 3 0 0 0-3 3c0 .8.3 1.5.8 2C4.3 8.3 3 10 3 12a1.5 1.5 0 0 0 1.5 1.5h7a3.5 3.5 0 0 0 3.5-3.5c0-1.8-1.2-3.3-2.8-3.7A3 3 0 0 0 8 2.5zm2.5 2.5a.6.6 0 1 1 0 1.2.6.6 0 0 1 0-1.2z" fill="${color}"/>`,
  java: (color) => `<path d="M4 6h7a2 2 0 0 1 2 2v2a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8a2 2 0 0 1 2-2zm7 1.5v2.5h1a1 1 0 0 0 1-1V8.5a1 1 0 0 0-1-1h-1zM6 2.5c.5.5.5 1.2 0 1.7m3-1.7c.5.5.5 1.2 0 1.7" fill="none" stroke="${color}" stroke-width="1.2" stroke-linecap="round"/>`,
  kotlin: (color) => `<path d="M14 14H2V2h12l-6 6 6 6zM2 8l6-6H2v6z" fill="${color}"/>`,
  flutter: (color) => `<path d="M8.8 2L3 7.8l2.1 2.1L13 2H8.8zm0 5.4L5.6 10.6l3.2 3.2 4.2-4.2-4.2-4.2zm-2.1 5.3l-2.1-2.1L3 12.2 4.7 14h4.2l-2.2-2.2z" fill="${color}"/>`,
  dart: (color) => `<path d="M2.5 7.5L8.5 1.5H13v4.5L7 12 2.5 7.5zm4 4.5l-2 2.5H11l2.5-2.5H6.5z" fill="${color}"/>`,
  android: (color) => `<path d="M4.5 7a3.5 3.5 0 0 1 7 0H4.5zM3.5 8h9v4.5a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1V8zm2.5-4l-.8-1.5m4.6 1.5l.8-1.5" stroke="${color}" stroke-width="1.2" stroke-linecap="round" fill="none"/><circle cx="6" cy="6" r=".6" fill="${color}"/><circle cx="10" cy="6" r=".6" fill="${color}"/>`,
  apple: (color) => `<path d="M10.2 1.5c0 1-.8 1.8-1.7 1.8-.1-1 .8-1.8 1.7-1.8zm2.3 8.3c-.3.7-.7 1.4-1.2 2-.7.9-1.5 1.7-2.6 1.7-1 0-1.4-.6-2.5-.6-1.2 0-1.6.6-2.5.6-1.1 0-1.9-.9-2.7-2-1.5-2.2-1.7-5.3-.2-7.3.7-1 1.9-1.7 3.1-1.7 1.1 0 1.9.6 2.6.6.7 0 1.8-.7 3.1-.6 1.2.1 2.2.7 2.8 1.6-1 .6-1.6 1.7-1.6 3 0 1.5.8 2.6 1.7 3.3z" fill="${color}"/>`,
  vue: (color) => `<path d="M1.5 2.5h3L8 8.2l3.5-5.7h3L8 13.5 1.5 2.5zm4 0L8 6.8l2.5-4.3H8L5.5 2.5z" fill="${color}"/>`,
  nextjs: (color) => `<circle cx="8" cy="8" r="6.5" fill="none" stroke="${color}" stroke-width="1.2"/><path d="M5.5 5.5v5m0-5h1.2l4.3 5m-1.5-5v3.2" stroke="${color}" stroke-width="1.2" stroke-linecap="round"/>`,
  svelte: (color) => `<path d="M11.5 3.5c-1.8-1-4.2-.4-5.2 1.4L4.7 7.8c-.8 1.4-.4 3.2 1 4 1.1.6 2.4.5 3.3-.2l1.6-2.7c.3-.5 1-.7 1.5-.4.5.3.7 1 .4 1.5l-1.6 2.7c-1.5 2.5-4.7 3.4-7.2 1.9-2.5-1.5-3.4-4.7-1.9-7.2l1.6-2.9C4.9 2 8.1 1.1 10.6 2.6l.9.5-1.2 2c-.4-.7-1.2-1.1-2-1.1" fill="${color}"/>`,
  tailwind: (color) => `<path d="M4.5 8c.8-1.5 2-2 3.5-1.5 1 .3 1.7 1 2.5 1.8 1.3 1.3 2.8 1.8 4.5.7-1 1.7-2.3 2.2-3.8 1.7-1-.3-1.7-1-2.5-1.8C7.4 7.6 5.9 7 4.5 8zm-3 4c.8-1.5 2-2 3.5-1.5 1 .3 1.7 1 2.5 1.8 1.3 1.3 2.8 1.8 4.5.7-1 1.7-2.3 2.2-3.8 1.7-1-.3-1.7-1-2.5-1.8C4.4 11.6 2.9 11 1.5 12z" fill="${color}"/>`,
};

function normalizeIconKey(raw) {
  const key = String(raw).toLowerCase().replace(/[^a-z0-9+]/g, "");
  if (key === "c++" || key.startsWith("c++") || key.startsWith("cpp")) return "cpp";
  if (key === "golang") return "go";
  if (key === "postgres") return "postgresql";
  if (key === "k8s") return "kubernetes";
  if (key === "html5") return "html";
  if (key === "css3") return "css";
  if (key === "webassembly") return "wasm";
  if (key === "nvim") return "neovim";
  if (key.startsWith("cuda")) return "cuda";
  if (key.startsWith("python")) return "python";
  if (key === "ios") return "apple";
  if (key === "vuejs") return "vue";
  if (key === "next") return "nextjs";
  if (key === "tailwindcss") return "tailwind";
  return key;
}

export function techBadgesSvg({ tokens, themeName = "paper", mode = "light", items = [], title = "Tech Stack" }) {
  const theme = tokens.themes[themeName]?.[mode];
  if (!theme) fail("UNKNOWN_THEME", `${themeName}/${mode}`);
  const font = tokens.type.sans;
  const safeFont = escapeHtml(font);
  const width = 880;

  const badgeHeight = 28;
  const paddingX = 24;
  const paddingY = 18;
  const gapX = 8;
  const gapY = 8;

  let currentX = paddingX;
  let currentY = paddingY;
  const badgesList = [];

  for (const item of items) {
    const rawName = typeof item === "string" ? item : (item?.name || String(item));
    const label = escapeHtml(rawName.trim());
    if (!label) continue;

    const iconKey = normalizeIconKey(rawName);
    const iconRenderer = BADGE_ICONS[iconKey];
    const hasIcon = Boolean(iconRenderer);

    // Approximate width: text length * 7.5 + icon padding + edge padding
    const textWidth = Math.round(rawName.trim().length * 7.5);
    const badgeWidth = Math.max(64, textWidth + (hasIcon ? 34 : 26));

    if (currentX + badgeWidth > width - paddingX) {
      currentX = paddingX;
      currentY += badgeHeight + gapY;
    }

    const iconMarkup = hasIcon
      ? `<g transform="translate(${currentX + 8}, ${currentY + 6})">${iconRenderer(theme.accent)}</g>`
      : `<circle cx="${currentX + 13}" cy="${currentY + 14}" r="3" fill="${theme.accent}"/>`;

    const textX = currentX + (hasIcon ? 28 : 20);
    const textY = currentY + 18;

    badgesList.push(`
    <g class="badge">
      <rect x="${currentX}" y="${currentY}" width="${badgeWidth}" height="${badgeHeight}" rx="6" fill="${theme.bg}" stroke="${theme.line}" stroke-width="1.2"/>
      ${iconMarkup}
      <text x="${textX}" y="${textY}" fill="${theme.text}" font-family="${safeFont}" font-size="11" font-weight="600">${label}</text>
    </g>`);

    currentX += badgeWidth + gapX;
  }

  const totalHeight = Math.max(76, currentY + badgeHeight + paddingY);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${totalHeight}" viewBox="0 0 ${width} ${totalHeight}" role="img">
  <title>${escapeHtml(title)}</title>
  <rect width="${width}" height="${totalHeight}" fill="${theme.bg}" rx="8"/>
  <rect x="0.5" y="0.5" width="${width - 1}" height="${totalHeight - 1}" rx="7.5" fill="none" stroke="${theme.line}" stroke-width="1"/>
  ${badgesList.join("")}
</svg>
`;
}
