---
agent-notes: { ctx: "test strategy for static portfolio site", deps: [docs/plans/sprint-1-plan.md], state: active, last: "tara@2026-04-07" }
---

# Test Strategy

## Approach
This is a static React site with no business logic, no API calls, no user input.

## Testing Levels
- **Build verification:** `npm run build` succeeds with no errors
- **Lint check:** `npm run lint` (tsc --noEmit) passes
- **Visual verification:** Manual check that site renders correctly
- **ATS verification:** Manual review of text content for keyword coverage

## Not Applicable
- Unit tests (no testable logic)
- Integration tests (no backend)
- E2E tests (static content only, no interactions beyond navigation)

## Future (Sprint 2+)
- If blog or interactive features are added, revisit test strategy
