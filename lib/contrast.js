import { fail } from "./errors.js";

function channel(hex, offset) {
  return Number.parseInt(hex.slice(offset, offset + 2), 16);
}

function linearize(value) {
  const channelUnit = value / 255;
  if (channelUnit <= 0.04045) return channelUnit / 12.92;
  return ((channelUnit + 0.055) / 1.055) ** 2.4;
}

export function relativeLuminance(color) {
  if (typeof color !== "string" || !/^#[0-9a-fA-F]{6}$/.test(color)) {
    fail("COULEUR_INVALIDE", "attendu #rrggbb sur six chiffres hexadécimaux");
  }
  const red = linearize(channel(color, 1));
  const green = linearize(channel(color, 3));
  const blue = linearize(channel(color, 5));
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

export function contrastRatio(foreground, background) {
  const foregroundLuminance = relativeLuminance(foreground);
  const backgroundLuminance = relativeLuminance(background);
  const lighter = Math.max(foregroundLuminance, backgroundLuminance);
  const darker = Math.min(foregroundLuminance, backgroundLuminance);
  return (lighter + 0.05) / (darker + 0.05);
}

export function assertTextContrast(pairs, minimum = 4.5) {
  const failures = [];
  for (const pair of pairs) {
    const ratio = contrastRatio(pair.foreground, pair.background);
    if (ratio < minimum) {
      failures.push(`${pair.name} ${pair.foreground} sur ${pair.background} = ${ratio.toFixed(2)}`);
    }
  }
  if (failures.length > 0) {
    fail("CONTRASTE_INSUFFISANT", failures.join("; "));
  }
}
