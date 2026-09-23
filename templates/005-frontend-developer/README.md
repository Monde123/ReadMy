<!-- READMY_TEMPLATE: 005-frontend-developer -->
<div align="center">

# Morgan Riley
### Staff Frontend Architect & Design Systems Engineer

Building accessible, high-performance web interfaces with atomic design systems and sub-millisecond interaction latency.

<p>
  <img src="https://img.shields.io/badge/Architecture-Bento_UI-6366f1?style=flat-square&logo=react&logoColor=white" alt="Bento UI" />
  <img src="https://img.shields.io/badge/Focus-React_19_•_TypeScript_5-3b82f6?style=flat-square&logo=typescript&logoColor=white" alt="Stack" />
  <img src="https://img.shields.io/badge/Accessibility-WCAG_2.2_AAA-10b981?style=flat-square&logo=w3c&logoColor=white" alt="WCAG AAA" />
  <img src="https://img.shields.io/badge/Location-Stockholm,_Sweden-475569?style=flat-square&logo=googlemaps&logoColor=white" alt="Location" />
</p>

</div>

---

## 🍱 Architecture & Performance Bento Grid

<table width="100%">
  <tr>
    <!-- Bento Cell 1: Core Identity & Focus (Large Span) -->
    <td width="65%" colspan="2" valign="top">
      <h3>🎨 Design Engineering Philosophy</h3>
      <p>
        I bridge the boundary between product design tokens and production-grade frontend infrastructure. Interfaces should feel immediate before they feel complex.
      </p>
      <ul>
        <li><strong>Design Tokens & Primitives:</strong> Zero-runtime CSS-in-JS, fluid typography scales, strict contrast ratios.</li>
        <li><strong>Interaction Fidelity:</strong> Micro-animations tuned to natural spring physics with zero layout thrashing.</li>
        <li><strong>Resilience:</strong> Fault-tolerant error boundaries with graceful degradation for unstable networks.</li>
      </ul>
    </td>
    <!-- Bento Cell 2: Key Telemetry Metrics -->
    <td width="35%" valign="top">
      <h3>⚡ Telemetry</h3>
      <table width="100%">
        <tr>
          <td align="center"><strong>Lighthouse</strong><br/><code>100 / 100</code></td>
          <td align="center"><strong>Component Tests</strong><br/><code>99.4% Cov</code></td>
        </tr>
        <tr>
          <td align="center"><strong>Bundle Budget</strong><br/><code>&lt; 38kb gzip</code></td>
          <td align="center"><strong>Core Web Vitals</strong><br/><code>INP &lt; 40ms</code></td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <!-- Bento Cell 3: Live Component Primitive Demo -->
    <td width="50%" valign="top">
      <h3>🧩 Interactive Primitive: Command Palette</h3>
      <p>Accessible, keyboard-first shortcut runner inspired by modern IDE interfaces.</p>
      <details>
        <summary><strong>▶ Click to Inspect Component Architecture</strong></summary>
        <br/>
        <ul>
          <li><strong>Keyboard Navigation:</strong> Trap focus, <code>Cmd+K</code> shortcut listener, ARIA <code>combobox</code> role.</li>
          <li><strong>Fuzzy Search:</strong> Bitap matching algorithm with sub-5ms lookup across 10,000 items.</li>
          <li><strong>Virtualization:</strong> Windowed list rendering DOM nodes only in active viewport.</li>
        </ul>
        <pre><code>&lt;CommandDialog open={isOpen} onOpenChange={setIsOpen}&gt;
  &lt;CommandInput placeholder="Search actions..." /&gt;
  &lt;CommandList&gt;
    &lt;CommandGroup heading="Recent Actions"&gt;
      &lt;CommandItem&gt;Deploy to Staging&lt;/CommandItem&gt;
    &lt;/CommandGroup&gt;
  &lt;/CommandList&gt;
&lt;/CommandDialog&gt;</code></pre>
      </details>
    </td>
    <!-- Bento Cell 4: Tech Ecosystem -->
    <td width="50%" colspan="2" valign="top">
      <h3>🛠️ Production Frontend Toolchain</h3>
      <p>
        <img src="https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React" />
        <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
        <img src="https://img.shields.io/badge/Next.js_15-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js" />
        <img src="https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind" />
      </p>
      <p>
        <img src="https://img.shields.io/badge/Storybook_8-FF4785?style=flat-square&logo=storybook&logoColor=white" alt="Storybook" />
        <img src="https://img.shields.io/badge/Playwright-2EAD33?style=flat-square&logo=playwright&logoColor=white" alt="Playwright" />
        <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
        <img src="https://img.shields.io/badge/Radix_UI-161618?style=flat-square&logo=radixui&logoColor=white" alt="Radix" />
      </p>
      <small>Continuous integration with automated visual regression tests on every push.</small>
    </td>
  </tr>
</table>

---

## 📦 Selected Design Systems & Web Products

<table width="100%">
  <tr>
    <td width="50%" valign="top">
      <h3>🌐 <a href="#primitives">Prism Design System</a></h3>
      <p><em>Enterprise multi-brand design system powering 28 production web applications.</em></p>
      <ul>
        <li>80+ accessible primitives compliant with WCAG 2.2 AAA.</li>
        <li>Automated Figma to code token synchronization pipeline.</li>
        <li>Zero breaking changes across 4 major releases.</li>
      </ul>
      <p>
        <img src="https://img.shields.io/badge/React-blue?style=flat-square" alt="React" />
        <img src="https://img.shields.io/badge/Tokens-Figma_API-purple?style=flat-square" alt="Tokens" />
        <img src="https://img.shields.io/badge/Version-v4.2.0-emerald?style=flat-square" alt="v4.2.0" />
      </p>
    </td>
    <td width="50%" valign="top">
      <h3>📊 <a href="#metrics">Pulse Dashboard</a></h3>
      <p><em>High-frequency telemetry interface rendering 100k data points with Canvas and WebGL.</em></p>
      <ul>
        <li>Smooth 60fps pan and zoom under high data density.</li>
        <li>Custom accessible chart descriptions for screen readers.</li>
        <li>Sub-second initial paint on 3G connections.</li>
      </ul>
      <p>
        <img src="https://img.shields.io/badge/Canvas_API-orange?style=flat-square" alt="Canvas" />
        <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square" alt="TS" />
        <img src="https://img.shields.io/badge/Status-Production-success?style=flat-square" alt="Prod" />
      </p>
    </td>
  </tr>
</table>

---

<div align="center">

### 🤝 Let's Collaborate on Accessible Interfaces

[Portfolio Website](https://example.design) • [GitHub](https://github.com/example-user) • [Design System Notes](https://example.com/blog) • [Email](mailto:morgan@example.design)

> *"Good design is like a clean window pane: you notice the view, not the glass."*

</div>
