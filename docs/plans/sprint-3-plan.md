---
agent-notes: { ctx: "sprint 3 plan - UX and content polish (all tasks done)", deps: [CLAUDE.md], state: done, last: "coordinator@2026-04-17" }
---

# Sprint 3 Plan — UX & Conversion Polish

**Status:** Done (all tasks satisfied as of 2026-04-17).

**Goal:** Address PM and Recruiter review findings to improve site flow, reduce blog drop-off, and increase technical signal.

## Tasks
1. **Homepage Re-ordering:** Move "Select Projects" section up, immediately below "About Me". Move "Latest Writing" to be below "Experience". — **Done.** Current order in `src/App.tsx`: About Me (177) → Select Projects (249) → Experience (311) → Latest Writing (387). Matches target.
2. **RichFeyn Content Restore:** Add 1-2 key product images (Smart Jar hero, how it works) back to the blog post above the fold. — **Done (2026-04-17 prior session).** Hero swapped to `public/blog-assets/richfeyn.png`, demo video promoted to hero slot, redundant `How_smartjar_works.png` removed.
3. **Project Live Link:** Add a "Live Demo" action/link to the Warehouse Routing card on the homepage pointing to the Hugging Face Space. — **Done.** Live link present at `src/App.tsx:265` pointing to `https://rashmi-mahadevaiah-drone.hf.space/ui`.

## Execution Order
1 → 3 → 2

## Active Personas
- **Sato:** Implementation
- **Dani:** Visual review
- **Vik:** Validation
