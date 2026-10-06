# ReadMy — Image Policy

## Objective

Images are allowed because they can improve visual identity, but they must support—not replace—the written content.

## Accepted image roles

- decorative headers and footers;
- technology icons and badges;
- separators;
- template previews;
- contribution or activity charts;
- neutral illustrations and placeholders.

## Standard requirements

Every image must:

- have a clear purpose;
- include meaningful alternative text;
- avoid personal or identifying content;
- be documented when hosted externally;
- have a local or text-based alternative when practical.

Example:

```markdown
<img src="../../assets/banners/default-banner.svg" alt="Decorative blue gradient profile banner" />
```

## External resources

External image services must be listed in `catalog/image-sources.yml` with their provider, URL, role, parameters, and replacement guidance.

## Accessibility

- Do not put essential facts only inside an image.
- Keep decorative animation moderate.
- Prefer sufficient color contrast.
- Use empty alternative text only for purely decorative images.
- Keep badges understandable through nearby text or grouped labels.

## Priority order

1. local SVG or image asset;
2. local optimized placeholder;
3. documented external service;
4. undocumented remote image only as a last resort.

Personal photos, avatars, certificates, and identifiable screenshots are not permitted in anonymized templates.
