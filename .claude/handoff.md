---
agent-notes: { ctx: "session handoff - 2026-04-18 tech-debt batch (#29/#28/#30/#31) + project board wire-up", deps: [CLAUDE.md, src/components/BlogPost.tsx, src/blog/post-metadata.ts, src/blog/post-registry.ts], state: active, last: "coordinator@2026-04-18" }
---

# Session Handoff

**Created:** 2026-04-18
**Sprint:** No active sprint. Sprint 3 closed informally in prior sessions. Sprint 4 not yet planned.
**Wave:** n/a — this session executed the open tech-debt backlog as a batch, then wired in the project board.
**Session summary:** Shipped four tech-debt issues as sequential single-issue commits (#29 split, #28 prose extraction, #30 smoke-test selector fix, #31 posts.ts rename), then wired the existing "Portfolio Website" GitHub Project (#2) into `CLAUDE.md` and backfilled #25–#31 onto the board.

## What Was Done

### Issue #29 — Split `BlogPost.tsx` into per-slug files (commit `5dec568`)
- Shrank `src/components/BlogPost.tsx` from 2,673 → 207 lines (router + meta helpers only).
- Extracted 6 post components to `src/blog/posts/<slug>.tsx` (one per blog post).
- Moved the slug→component map out to `src/blog/post-registry.ts` to satisfy `react-refresh/only-export-components`.
- Split shared code-block token regex into `src/components/blog-tokenizer.ts` for the same lint reason.
- Added regression test `src/blog/posts.registry.test.ts`: slug-drift check + `it.each` mount smoke across all 6 post components.

### Issue #28 — Extract shared prose primitives (commit `3827b1f`)
- New module `src/components/blog-prose.tsx`: `PostH2`, `PostH3`, `PostP`, `PostUL`, `PostOL`. Append-only `className` contract (caller extras concatenated after base; never replace).
- Pinned each primitive's exact class string in `src/components/blog-prose.test.tsx` (6 tests) — catches accidental class-string drift.
- Migrated all 6 post files to import the primitives. Byte-faithful content preserved.

### Issue #30 — Fix ambiguous smoke-test link selector (commit `25e2060`)
- `src/App.smoke.test.tsx` "renders blog index" now queries by `href="/blog/warehouse-routing-openenv"` instead of title regex (two posts matched the old regex once `build-warehouse-routing-openenv` landed).

### Issue #31 — Rename `posts.ts` → `post-metadata.ts` (commit `731161f`)
- Eliminates `src/blog/posts.ts` vs. `src/blog/posts/` naming collision. Updated imports in `App.tsx`, `BlogList.tsx`, `BlogPost.tsx`, `posts.registry.test.ts`.

### Board wire-up (commit `544e9c5`)
- Discovered the GitHub Project "Portfolio Website" (#2, owner `mahadevaiahrashmi`) already existed with all 5 required statuses configured.
- Populated `CLAUDE.md` tracking block with project-number, project-owner, project-node-id, status-field-id, and all 5 status option IDs (eliminates per-session field-list lookups).
- Added #25, #26, #27 to the board as **Backlog**.
- Backfilled #28, #29, #30, #31 to the board as **Done** for history.

## Current State
- **Branch:** `main` — clean, in sync with `origin/main`.
- **Last commit:** `544e9c5 chore: wire Portfolio Website project board into CLAUDE.md`.
- **Uncommitted changes:** none.
- **Tests:** 17 passing across 3 test files (`blog-prose.test.tsx` 6, `App.smoke.test.tsx` 4, `posts.registry.test.ts` 7).
- **Board status:** 22 items on project #2. 19 Done + 3 Backlog (#25, #26, #27). Pre-flight check now passes — Grace can issue transitions directly using the cached IDs in `CLAUDE.md`.

## Sprint Progress
- **Wave plan:** none. `docs/sprints/` does not exist; prior plans lived in `docs/plans/` and are all closed.
- **Current wave:** n/a.
- **Issues completed this session:** #29, #28, #30, #31.
- **Issues remaining:** #25, #26, #27 (all Backlog, all open).
- **Next wave / Sprint 4:** not yet planned. User was offered Sprint 4 kickoff at end of session but handed off instead.

## What To Do Next (in order)
1. **Read `docs/scaffolds/code-map.md`** (per `CLAUDE.md` first-line directive) to orient on package layout. Note: `src/components/BlogPost.tsx` is now a router shell (207 lines); post bodies live in `src/blog/posts/*.tsx`; metadata in `src/blog/post-metadata.ts`; slug→component map in `src/blog/post-registry.ts`. Any future code-map update should reflect this.
2. **Read `docs/product-context.md`** (last updated 2026-04-07 by pat) for product philosophy — conservative scope appetite, no theme/style/font/color changes, ATS-parseable text is a hard requirement.
3. **Sprint 4 planning / `/sprint-boundary`.** Board is now wired, pre-flight passes. The three open Backlog issues ready to be pulled into Sprint 4:
   - **#25** — UX: Re-order homepage sections for better conversion
   - **#26** — CONTENT: Restore hero images to RichFeyn blog
   - **#27** — UX: Add Live Demo link to Warehouse Routing card
   Run `/sprint-boundary` to close Sprint 3 formally and scope Sprint 4, OR pick one of the three issues directly and execute under the per-item workflow (Session Entry Protocol still applies: Pat+Grace check, Architecture Gate if any decision, Tara tests first).
4. **Per-item workflow reminder** (now that the board is live): before writing any code for an issue, move it **Backlog → Ready → In Progress** on the board (cached option IDs are in `CLAUDE.md`). After commit, move to **In Review** for the 3-lens review, then **Done** after the Done Gate. Skipping "In Review" is a process violation per `CLAUDE.md`.
5. **Optional cleanup:** the `agent-notes` comment on `src/components/BlogPost.tsx:1` still references `posts.registry.test.ts` via a path in its key — verify it still accurately describes the file after the #29/#31 moves. Low priority.

## Tracking Artifacts
- `docs/tracking/archive/sprint-1/2026-04-07-portfolio-website-discovery.md` — archive only.
- No new tracking artifacts produced this session (tech-debt batch did not require phase artifacts).
- `docs/product-context.md` — last updated 2026-04-07 by pat.

## Proxy Decisions (Review Required)
- None. User was available throughout.

## Key Context
- **Board IDs are cached in `CLAUDE.md:101-109`.** Don't re-run `gh project field-list` every session — read from there. If the board is ever recreated, the cached IDs become stale and must be refreshed.
- **Blog architecture is now modular.** Adding a new post = (1) append entry to `src/blog/post-metadata.ts`, (2) create `src/blog/posts/<slug>.tsx` using the `blog-prose` primitives + `blog-helpers` components, (3) register in `src/blog/post-registry.ts`. The `posts.registry.test.ts` drift test will fail if steps 1 and 3 don't match.
- **Shared prose primitives (`blog-prose.tsx`) use append-only `className`.** Caller extras are concatenated after the base string, never replace it. Tests pin the exact class strings — edits there require matching test updates.
- **`blog-tokenizer.ts` exists only to satisfy `react-refresh/only-export-components`.** Don't re-merge its exports back into `blog-helpers.tsx`.
- **`postContentBySlug` lives in `post-registry.ts`, not `BlogPost.tsx`.** Same reason — mixing a constant export with a component export in one module trips the lint rule.
- **Smoke tests:** `App.smoke.test.tsx` queries blog links by `href` attribute, not by text — don't regress this (see #30).
- **Commit pattern this session:** one issue per commit, message ends with `Closes #N`, `Co-Authored-By: Claude Opus 4.7`. All pushed to `main`; GitHub Pages auto-deploys via `.github/workflows/deploy.yml` (~40s).
- **Test command:** `npm test` runs vitest in watch-free mode in this environment. Full suite ~13s.
