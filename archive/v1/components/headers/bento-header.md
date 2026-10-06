# Bento Header with KPI Chips

A modern modular bento-style header organizing identity, real-time availability, geographic base, and core impact metrics into clean structural cards.

## Preview & Markdown Snippet

```markdown
<!-- READMY_COMPONENT: bento-header -->
<table width="100%">
  <tr>
    <td width="65%" valign="top">
      <h1>👋 Hello, I'm <samp>Jordan Vance</samp></h1>
      <p><strong>Senior Product Engineer & Design Systems Architect</strong></p>
      <p>Bridging the seam between high-fidelity interaction design and robust frontend engineering. Specializing in component libraries, accessibility compliance, and sub-millisecond web performance.</p>
      <p>
        <img src="https://img.shields.io/badge/Status-Shipping_v3.0-0ea5e9?style=flat-square&logo=git&logoColor=white" alt="Status" />
        <img src="https://img.shields.io/badge/Location-Paris,_France-475569?style=flat-square&logo=googlemaps&logoColor=white" alt="Location" />
        <img src="https://img.shields.io/badge/Focus-React_19_•_TypeScript-64748b?style=flat-square" alt="Focus" />
      </p>
    </td>
    <td width="35%" valign="middle" align="center">
      <table width="100%">
        <tr>
          <td align="center"><strong>Active Users</strong><br/><code>120K+ MAU</code></td>
          <td align="center"><strong>OSS Stars</strong><br/><code>2.4K ⭐</code></td>
        </tr>
        <tr>
          <td align="center"><strong>Production Uptime</strong><br/><code>99.98%</code></td>
          <td align="center"><strong>Perf Score</strong><br/><code>100/100 ⚡</code></td>
        </tr>
      </table>
    </td>
  </tr>
</table>
<!-- END_READMY_COMPONENT -->
```

## Customization Guide

- Replace `Jordan Vance` with your full name.
- Customize the 4 KPI matrix cells (e.g. `OSS Downloads`, `Articles Published`, `Years XP`).
- Update Shields.io badges with your real location, working status, and primary tech stack.

## Theme Compatibility

- Uses semantic HTML `<table>` supported natively across GitHub desktop and mobile apps.
- Fully responsive; table cells stack or scroll gracefully on small screens without breaking text wrapping.
