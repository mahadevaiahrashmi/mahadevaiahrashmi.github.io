---
agent-notes: { ctx: "test strategy for static portfolio site", deps: [docs/plans/sprint-1-plan.md], state: active, last: "tara@2026-04-07" }
---

# Test Strategy

## Approach
This is a static React site with light client-side routing, blog rendering, and deploy-specific routing behavior.

## Testing Levels
- **Build verification:** `npm run build` succeeds with no errors
- **Lint check:** `npm run lint` runs ESLint with zero warnings
- **Type check:** `npm run typecheck` runs `tsc --noEmit`
- **Smoke check:** `npm run smoke` runs lint, typecheck, route tests, and production build
- **Visual verification:** Manual check that site renders correctly
- **ATS verification:** Manual review of text content for keyword coverage

## Not Applicable
- Integration tests (no backend)
- Full E2E tests (routing smoke coverage is enough for the current surface)

## Future
- Add browser-level deploy checks if the blog grows beyond static article pages
