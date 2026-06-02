---
agent-notes: { ctx: "local dev run/stop guide for the portfolio site", deps: [package.json, vite.config.ts], state: active, last: "sato@2026-06-02" }
---

# Run / Stop the App Locally

Quick reference for running this portfolio site (Vite + React 19) on your own machine.

## Prerequisites

- **Node.js 18+** (20+ recommended) and **npm** — check with `node -v` and `npm -v`.
- Dependencies installed once: `npm install` (uses `package-lock.json`).

## Run (development)

```bash
npm run dev
```

- Serves at **http://localhost:3000** with hot-reload (edits appear instantly).
- Bound to `0.0.0.0`, so it's also reachable from other devices on your network at `http://<your-LAN-ip>:3000`.
- Leave this terminal open while you work.

## Stop

- **Foreground** (the usual case): press **`Ctrl+C`** in the terminal running `npm run dev`.
- **Background / stuck process** (port still busy after closing the terminal): kill whatever holds port 3000 — on macOS:

  ```bash
  lsof -ti tcp:3000 | xargs kill      # graceful
  lsof -ti tcp:3000 | xargs kill -9   # force, if it won't die
  ```

## Preview the production build

Builds the optimized bundle and serves it exactly as GitHub Pages will:

```bash
npm run build      # outputs to dist/
npm run preview    # serves dist/ at http://localhost:4173
```

Stop `preview` the same way as `dev` (`Ctrl+C`, or kill port **4173**).

## Verify before pushing

Run the full gate (lint + typecheck + tests + build) — this is what catches breakage before it reaches CI:

```bash
npm run smoke
```

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `Port 3000 is already in use` | Stop the old process (`lsof -ti tcp:3000 \| xargs kill`), or run on another port: `npm run dev -- --port=3001`. |
| Blank page / stale assets | Hard-refresh the browser, or clear the build: `npm run clean` then rebuild. |
| Dependency or build errors after a pull | Reinstall: `rm -rf node_modules && npm install`. |

## Command reference

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start dev server on port 3000 (hot-reload). |
| `npm run build` | Production build into `dist/`. |
| `npm run preview` | Serve the built `dist/` on port 4173. |
| `npm run lint` | ESLint (zero warnings allowed). |
| `npm run typecheck` | TypeScript type check (`tsc --noEmit`). |
| `npm run test` | Run the test suite once (Vitest). |
| `npm run smoke` | lint + typecheck + test + build, in sequence. |
| `npm run clean` | Remove the `dist/` build output. |
