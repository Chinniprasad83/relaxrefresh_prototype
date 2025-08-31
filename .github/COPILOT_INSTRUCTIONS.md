# Copilot Instructions — React Mobile Prototype

These instructions define the **defaults, standards, and review checks** for using GitHub Copilot (and similar assistants) in this repository.  
**Goal:** Build a **mobile-first** React prototype for the browser with **accessible**, **token-driven** UI and **minimal dependencies**.

---

## ✅ Scope & Tech
- **App type:** React SPA prototype (no backend; mock/local data).
- **Build tooling:** Vite or CRA (default to **Vite** if starting fresh).
- **Styling:** **CSS Modules** with **design tokens** (CSS custom properties) in `src/styles/tokens.css`.
- **Routing:** `react-router` (optional; only if needed).
- **State:** React hooks + context where appropriate (avoid large state libs).
- **Data:** Local JSON or mock service modules (no remote calls unless explicitly requested).

---

## 🤖 Model & Agent Policy
- **Image understanding / design extraction:** **GPT-4.1**.
- **Code generation & refactors:** **GPT-5-mini (preview)** in **agent mode**.
- **Fallback:** If GPT-5-mini is unavailable, use GPT-4.1 for code and **note this in the PR**.

**PR note examples**
```
AI-generated: gpt-5-mini (preview)
AI-generated: gpt-4.1 (image analysis) + gpt-5-mini (code)
AI-generated: gpt-4.1 fallback — reason: mini unavailable
```

---

## 📱 Mobile-First Requirements
- Default breakpoint: **375px** width (use DevTools device toolbar).
- **Viewport meta** must exist in `index.html`:
  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  ```
- No horizontal scroll at 375px.
- **Touch targets ≥ 40px** (height/width).
- Use CSS **container queries** or **min-width media queries** only as needed (progressive enhancement).

---

## 🎨 Design Tokens (`src/styles/tokens.css`)
- Define all theme values as custom properties on `:root`:
  - Colors: `--color-*`
  - Spacing: `--space-1` … `--space-10`
  - Typography: `--font-size-*`, `--line-*`
  - Radius: `--radius-*`
  - Shadows: `--shadow-*`
  - Motion: `--duration-*`, `--easing-*`
- **Never hard-code** colors/sizes in components. Extend tokens instead and document additions with brief comments.

Example:
```css
:root {
  --color-bg: #0b0c10;
  --color-surface: #121317;
  --color-text: #e6e6e6;
  --color-accent: #4cc9f0;

  --space-1: 4px;  --space-2: 8px;  --space-3: 12px;  --space-4: 16px;
  --radius-2: 12px;

  --font-size-1: 12px; --font-size-2: 14px; --font-size-3: 16px; --font-size-4: 18px;
  --line-1: 1.35; --line-2: 1.5;

  --duration-fast: 120ms; --duration-base: 200ms;
  --easing-standard: cubic-bezier(.2,.8,.2,1);
}
```

---

## ♿ Accessibility Standards
- Semantic structure: `<header>`, `<nav>`, `<main id="main">`, `<footer>`.
- Add a **skip link** at top of the page:  
  `<a class="skip-link" href="#main">Skip to content</a>`
- **Visible focus** styles for all interactive elements (no outline removal).
- Icon-only buttons require `aria-label`.
- Don’t rely on **color alone** to convey meaning; use text/icons.
- Aim for **WCAG AA** contrast; verify pairs used in components.

---

## 🧩 React Component Conventions
- One component per file; **export default** the main component.
- Use **CSS Modules**: `Component.module.css`.
- Keep specificity low; avoid `!important`.
- Props are typed (TypeScript recommended) and validated.
- No inline styles for tokenized values; use classes + tokens.
- Accessibility attributes near the element they affect (e.g., `aria-live="polite"` for live regions).

Component skeleton:
```tsx
// src/components/Card.tsx
import styles from './Card.module.css';

type CardProps = { title: string; children: React.ReactNode; };

export default function Card({ title, children }: CardProps) {
  return (
    <section className={styles.card} aria-labelledby="card-title">
      <h2 id="card-title" className={styles.title}>{title}</h2>
      <div className={styles.body}>{children}</div>
    </section>
  );
}
```

---

## 🧪 Validation & PR Checklist
**Include this checklist in every PR that uses AI output.**

- [ ] PR note includes model(s) (see examples above).
- [ ] Viewport meta present.
- [ ] No horizontal scroll at 375px.
- [ ] Touch targets ≥ 40px.
- [ ] Tokens used for colors/spacing/typography; **no hard-coded** values.
- [ ] Headings in logical order; landmarks present.
- [ ] Focus styles visible; icon buttons have `aria-label`.
- [ ] Light performance/a11y pass (Lighthouse or DevTools): no major regressions.
- [ ] New/changed files include a **one-line comment** stating **AI-generated** and **why**.

Quick local checks:
```bash
# Start dev server (Vite)
npm run dev
# Build & preview
npm run build && npm run preview
```
Optional headless Lighthouse:
```bash
npx lighthouse http://localhost:5173 --only-categories=accessibility,performance --chrome-flags="--headless"
```
Token hygiene (find hardcoded colors):
```bash
grep -nRE '#[0-9A-Fa-f]{3,8}\b' src | grep -v tokens.css
```

---

## ⚡ Performance Guidance
- Prefer **CSS transforms** over layout-thrashing properties for animations.
- Wrap motion in `@media (prefers-reduced-motion: no-preference)`.
- Avoid re-rendering large lists; memoize items or use keys carefully.
- Pre-size images/media to prevent layout shift (CLS).
- Defer non-critical JS (`import()` dynamic splitting if needed).

---

## 🔄 Data & State
- Keep mock data in `src/data/*.ts`.
- Derive UI state from props/context; avoid global singletons.
- Side effects isolated in hooks (`useEffect`), with proper cleanup.

---

## 🖼️ Image-to-Code Workflow (Agent Mode)
When an image mock (PNG/JPG/SVG) or Figma export is provided:

1) **Analyze with GPT-4.1**  
   Extract layout, color palette (HEX), font sizes/weights, spacing scale, and component list.

2) **Generate with GPT-5-mini**  
   - Produce React components + CSS Modules using tokens.
   - Add `<meta name="viewport">`, ensure 375px correctness.
   - Enforce accessibility and focus styles.

3) **Document**  
   - In the PR, include the model note and the image filename.  
   - If new tokens were added, document them in `tokens.css` with comments.

---

## 🧰 File Layout (Suggested)
```
src/
  main.tsx
  App.tsx
  routes/              # optional
  components/
    Card.tsx
    Card.module.css
  styles/
    tokens.css         # design tokens only
    globals.css        # resets, base elements, helpers
  data/
    mock-sessions.ts
index.html
```

---

## 🛡️ Security & Privacy (Prototype)
- No PII; only local mock data.
- Do not add 3rd-party scripts without approval.
- If using web fonts, prefer local bundling over remote CDNs.

---

## 🧭 When Unsure
Prefer **minimal, mobile-first, token-aligned, accessible** solutions.  
Leave a **short comment** in code describing intent or assumptions.

---
