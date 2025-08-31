# AI Prompt Toolkit — React Mobile Prototype

Use these prompts with ChatGPT or GitHub Copilot **(agent mode preferred)**.  
They MUST follow our repo rules in **`.github/copilot-instructions.md`**:
- **GPT-4.1** for **image understanding / design extraction**
- **GPT-5-mini (preview)** for **code generation / refactors**
- React + Vite, **CSS Modules**, **design tokens** in `src/styles/tokens.css`
- **Mobile-first**, **accessible (WCAG AA)**, **token-driven** UI

> Tip for Copilot Chat:  
> **“Load and follow `.github/copilot-instructions.md` for all tasks in this repo.”**

---

## 0) Master Chained Prompt (Agent Mode — Image → React Code → Validate → PR)

**Purpose:** One-shot flow: analyze image → generate React code + CSS Modules → validate → PR note.  
**Standards:** React (Vite), CSS Modules, tokens, a11y — per `.github/copilot-instructions.md`.

```
Context:
- Follow `.github/copilot-instructions.md`.
- Use GPT-4.1 for image analysis; GPT-5-mini (preview) for code.

Inputs:
- Design image: <attach PNG/JPG/SVG> (mobile target width 375px).

Steps:
1) [GPT-4.1] Analyze the image:
   - Output a concise spec: layout hierarchy (header/hero/cards/nav), color palette (HEX), typography (font sizes/weights/line-heights), spacing scale, component inventory.

2) [GPT-5-mini] Generate React code (Vite assumed):
   Create/update these files with React + CSS Modules:
   - `index.html`: ensure `<meta name="viewport" content="width=device-width, initial-scale=1" />`
   - `src/styles/tokens.css`: define/extend tokens (colors/spacing/typography/radius/shadows/motion) with comments
   - `src/styles/globals.css`: base/reset + helpers (no hard-coded design values)
   - `src/components/<Component>.tsx` + `src/components/<Component>.module.css`: semantic HTML, mobile-first styles using tokens
   - `src/App.tsx` (or route files): compose the page using components
   Requirements:
   - Mobile-first, no horizontal scroll @375px
   - Touch targets ≥ 40px
   - Token-driven: **no hard-coded colors/sizes** in component CSS
   - Accessibility: landmarks (`header/nav/main/footer`), correct heading order, visible focus, aria-label for icon-only buttons

3) Validate & fix (quick pass):
   - Report pass/fail for: viewport meta, no horizontal scroll @375px, touch target sizes, basic a11y.
   - Provide a token hygiene check:
     `grep -nRE '#[0-9A-Fa-f]{3,8}\b' src | grep -v tokens.css`

4) PR metadata:
   - Output the PR note line:
   - Provide the acceptance checklist block per `.github/copilot-instructions.md`.

5) Notes:
   - List tokens added/updated and why.
   - Mention any approximations (e.g., font fallback).

Deliverables:
- Jist of contents for created/changed files.
```

---

## 1) Image → React Code (Focused Page Generation)

```
Follow `.github/copilot-instructions.md`.

Task:
- Analyze the attached design with **GPT-4.1**.
- Generate React + CSS Modules with **GPT-5-mini (preview)**.

Create/update:
- `index.html`: include `<meta name="viewport" content="width=device-width, initial-scale=1" />`
- `src/styles/tokens.css`: add/reuse tokens (colors, spacing, typography) with comments
- `src/styles/globals.css`: base/reset + helpers only
- `src/components/<Component>.tsx` + `src/components/<Component>.module.css`: semantic, accessible, mobile-first
- `src/App.tsx`: assemble the layout

Rules:
- No horizontal scroll @375px; touch targets ≥ 40px
- **Token-driven**: no hard-coded colors/sizes in components
- Accessibility: landmarks, heading order, visible focus, aria-label for icon-only buttons

Deliver:
- Full code for all changed files
- List the tokens used/added and rationale
- PR note line and acceptance checklist
```

---

## 2) New React Component (Standards-Compliant)

```
Create a new React component per `.github/copilot-instructions.md` (React + CSS Modules + tokens + a11y).

Inputs:
- Component name: <Name>
- Purpose: <what it does>
- Props (typed): <props>

Deliverables:
- `src/components/<Name>.tsx`: semantic HTML, default export, a11y attributes
- `src/components/<Name>.module.css`: mobile-first, token-driven; low specificity, no `!important`
- Example usage snippet for `src/App.tsx`


Constraints:
- **No hard-coded colors/sizes** (use tokens)
- Accessible focus states; aria-labels for icon-only controls
```

---

## 3) Responsive Enhancement (React + CSS Modules)

```
Improve responsiveness while preserving mobile-first defaults per `.github/copilot-instructions.md`.

Task:
- Keep 375px mobile baseline unchanged.
- Add min-width media queries for 768px and 1024px in the relevant `.module.css` files.
- Increase grid columns, adjust gaps/typography using tokens.
- Ensure a11y & focus styles remain clear.

Deliverables:
- Updated CSS Modules with breakpoint sections
- Short notes describing changes per breakpoint
- Validation: confirm no horizontal scroll at 375/768/1024px
```

---

## 4) Accessibility Audit & Fixes (React)

```
Audit the provided React (TSX + CSS Modules) for accessibility per `.github/copilot-instructions.md`.

Check:
- Landmarks: <header>, <nav>, <main id="main">, <footer>, and a “Skip to content” link
- Heading hierarchy (h1..h3 logical)
- Visible focus styles on all actionable elements
- aria-labels for icon-only buttons/controls
- Contrast AA for text and UI controls (use tokens)

Deliver:
- Issue list with minimal diffs/snippets to fix
- Updated TSX/CSS that preserves token usage
- Re-run quick checklist and mark pass/fail
```

---

## 5) Refactor to Tokens (Remove Hard-Coded Values)

```
Refactor components to use tokens per `.github/copilot-instructions.md`.

Steps:
1) Show matches:
   `grep -nRE '#[0-9A-Fa-f]{3,8}\b' src | grep -v tokens.css`
   `grep -nRE '\b(\\d+(\.\\d+)?)(px|rem|em)\b' src/components | head -n 50`  # sample scan
2) Propose new/updated tokens in `src/styles/tokens.css` with brief comments.
3) Replace literals in `.module.css` using CSS variables; keep specificity low; avoid `!important`.
4) Update TSX if class names/structure change.

Deliverables:
- Token additions/edits with comments
- Updated component CSS/TSX snippets
- Short rationale of changes
```

---

## 6) Performance & Motion Pass (React)

```
Do a performance/motion pass per `.github/copilot-instructions.md`.

Checklist:
- Replace layout-thrashing animations with transform/opacity
- Wrap animations in `@media (prefers-reduced-motion: no-preference)`
- Pre-size images/media to reduce layout shift (CLS)
- Memoize heavy lists/components if needed; use stable keys

Deliverables:
- Updated CSS/TSX snippets
- Before/after notes with reasoning
```

---

## 7) PR Metadata & Acceptance Checklist (Generator)

```
Generate PR metadata per `.github/copilot-instructions.md`.

Inputs:
- Models used (e.g., gpt-4.1 + gpt-5-mini)
- Design file (if any): <filename or N/A>

Output:
- PR note line:
  AI-generated: <models> — design: <file-or-N/A>
- Acceptance Checklist:
  - [ ] Viewport meta present
  - [ ] No horizontal scroll @375px
  - [ ] Touch targets ≥ 40px
  - [ ] Token-driven (no hard-coded values in components)
  - [ ] Headings/landmarks correct; visible focus; aria-labels for icons
  - [ ] A11y/perf quick pass (no major issues)
  - [ ] AI rationale comment added to changed files
```

---

## 8) Quick Start & Local Checks (React + Vite)

Use in chats to remind or automate local checks (per `.github/copilot-instructions.md`):

```
# Dev server (Vite)
npm run dev

# Build & preview
npm run build && npm run preview

# Headless Lighthouse (adjust port if needed)
npx lighthouse http://localhost:5173 --only-categories=accessibility,performance --chrome-flags="--headless"

# Token hygiene: find hard-coded colors (ignore tokens.css)
grep -nRE '#[0-9A-Fa-f]{3,8}\b' src | grep -v tokens.css
```

---

## Notes
- If **GPT-5-mini** is unavailable, use **GPT-4.1** for code and document the fallback in the PR note.
- Always attach the design image when using image-to-code prompts.
- Keep changes small and focused; explain assumptions in brief code comments.
