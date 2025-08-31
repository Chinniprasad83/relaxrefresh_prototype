# RelaxRefresh Prototype — React conversion

This repository was converted from a static prototype into a minimal Vite + React app so you can iterate on components faster.

What changed
- Project scaffold: Vite + React (files under `src/`).
- Existing CSS (`css/*.css`) is imported by the React entry so tokens and styles are preserved.
- A simple `Login` component was created at `src/components/Login.jsx` (mocked behavior — no backend).

Quick start (PowerShell)

```powershell
Set-Location -Path 'd:\shadrisolutions\relaxrefresh_prototype'
npm install
npm run dev
```

Open the printed local URL (usually http://localhost:5173) and verify at 375px width in DevTools.

Build and preview

```powershell
npm run build
npm run preview
```

Notes
- Accessibility: `index.html` keeps the viewport meta and the app includes a skip link and landmark elements.
- Tokens: continue to use CSS custom properties inside `css/base.css`.
- If you want TypeScript or additional tooling (eslint, prettier), I can add them as a follow-up.

AI conversion note
- AI-assisted conversion: created React scaffold, preserved CSS, and added small accessible component wrappers.
