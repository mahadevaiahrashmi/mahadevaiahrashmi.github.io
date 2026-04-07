---
agent-notes: { ctx: "sprint 1 retrospective", deps: [docs/plans/sprint-1-plan.md, docs/tracking/2026-04-07-portfolio-website-discovery.md], state: complete, last: "grace@2026-04-07" }
---

# Sprint 1 Retrospective

**Date:** 2026-04-07
**Sprint Goal:** Make the portfolio website ATS-optimized and recruiter-compelling for product-focused ML roles.

## What Went Well

- **Fast delivery:** All 3 sprint items completed in a single session.
- **Clear vision:** User had strong clarity on audience (recruiters), signals (technical + product + business), and constraints (no theme changes).
- **Build pipeline:** GitHub Actions deployment works reliably — push to main, site goes live.
- **Backup strategy:** v1 branch created before any changes, preserving rollback path.

## What Could Be Better

- **Kickoff ceremony was skipped by user request.** The full discovery workflow was interrupted because the user wanted to ship fast. This is fine for this project's scope, but the abbreviated process meant no ADRs, no formal threat model, and no test strategy execution.
- **No project board until late in sprint.** Board was created after all work was done, so status tracking was retroactive rather than real-time.
- **Token scope issue delayed board creation.** The `project` scope wasn't available initially, requiring a mid-session auth refresh.
- **Multiple revision cycles on content.** Blog/Projects sections were added then removed — could have been avoided by confirming scope more tightly upfront.

## What We Learned

- For a static portfolio site with a single developer, heavy process (ADRs, threat models, TDD) adds friction without proportional value. The user prefers speed.
- ATS keyword optimization is a concrete, testable requirement — good forcing function for content decisions.
- User provides feedback iteratively (add this, now remove that) — keep changes atomic and easy to revert.

## Architecture Gate Compliance

- **ADRs created this sprint:** 0 (none of the template ADRs 0001/0002 are relevant to this project)
- **ADRs requiring Wei debate:** 0
- **Architectural decisions made without ADRs:** 1 — chose React+Vite+Tailwind for GitHub Pages (inherited from info/ folder, not a new decision). No ADR warranted since this was user-provided code, not a technology selection.
- **Assessment:** No gaps. Architecture gate is not applicable for content-only changes to an existing static site.

## Board Compliance

- **Items following full status flow:** 0/3 — all sprint:1 items were created retroactively as Done. No items transitioned through In Progress → In Review → Done.
- **Reason:** Board was created after sprint work was complete.
- **Action:** For sprint 2, create issues BEFORE starting work and transition statuses in real-time.

## Operational Baseline Audit — Sprint 1

### Ines: Operational Concerns

| Concern | Status | Finding |
|---------|--------|---------|
| Logging | N/A | Static site, no server-side logging applicable |
| Error UX | N/A | No user input, no error states |
| Debug support | N/A | Static site with no runtime logic |
| Config health | Foundation | No config needed; Vite config is minimal and correct |
| Graceful degradation | N/A | No external API calls |

### Diego: README 5-Minute Test

- **Result:** Pass
- **Execution-verified:** `npm install`, `npm run dev`, `npm run build` all succeed
- **Read-verified:** Deploy instructions (push to main triggers GitHub Actions)
- **Issues found:** None

### Dani: Visual Smoke Test

- **Pages checked:** / (single-page app)
- **Console errors:** None
- **Visual issues:** None observed — site renders correctly with all sections
- **Note:** Dev server was running at localhost:3000 during development; build verified via `vite build`

## Metrics

| Metric | Value |
|--------|-------|
| Issues planned | 3 |
| Issues completed | 3 |
| Issues carried forward | 0 |
| Commits | 4 |
| Process-improvement issues | 1 (board compliance) |
