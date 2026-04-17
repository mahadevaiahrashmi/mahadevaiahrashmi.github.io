---
agent-notes: { ctx: "session handoff - homepage redundant link cleanup, Sprint 3 still open", deps: [docs/plans/sprint-3-plan.md, src/App.tsx], state: active, last: "coordinator@2026-04-17" }
---

# Session Handoff

**Created:** 2026-04-17
**Sprint:** 3 — In progress (plan at `docs/plans/sprint-3-plan.md`)
**Wave:** n/a — one-off homepage link cleanup, not a formal Sprint 3 wave.
**Session summary:** Removed three redundant labeled links from the homepage hero row and experience items per user request. One commit pushed to `main`.

## What Was Done

### Homepage link cleanup — `src/App.tsx`
- **Hero link row** (below the CTA buttons) — removed `Warehouse routing write-up` (internal link to `/blog/warehouse-routing-openenv`) and `Source repo` (external to `github.com/mahadevaiahrashmi/play2`). Kept `Live environment` pointing at the Hugging Face Space.
- **KOGO.ai `ExperienceItem`** — removed the entire `links` prop (it held the same two links as the hero row).
- **RichFeyn.com `ExperienceItem`** — removed the entire `links` prop (it held only `RichFeyn site`).
- **Explicitly kept:** the Github icon on the Warehouse Routing project card at `src/App.tsx:257` (tooltip `Source Repo`). User confirmed to leave it.
- Net: `-18 lines`, 1 file changed, type-check clean.

### Commits this session (pushed to `origin/main`)
- `3e66401 chore: remove redundant hero and experience links from homepage`

## Current State
- **Branch:** `main` (up to date with `origin/main`)
- **Last commit:** `3e66401 chore: remove redundant hero and experience links from homepage`
- **Uncommitted changes:** none in tracked files.
- **Untracked (carried over, still not triaged after three sessions):**
  - `comm.html`
  - `feedback_from_llm.ipynb`
  - `feedback_from_llm.md`
- **Tests:** 4 passing across 1 test file (`src/App.smoke.test.tsx`). No test run this session — change was cosmetic link removal; smoke test only checks routing, not specific link labels.
- **Board status:** `project-number` / `project-owner` still empty in `CLAUDE.md` → no GitHub Projects board, pre-flight skipped.
- **Deploy:** `deploy.yml` will pick up `3e66401` on push (~40s run).

## Sprint Progress
- **Wave plan:** `docs/plans/sprint-3-plan.md` (under `docs/plans/`, not `docs/sprints/`).
- **Sprint 3 tasks:**
  1. **Homepage re-ordering** — Move `Select Projects` below `About Me`; move `Latest Writing` below `Experience`. *(Not started.)*
  2. **RichFeyn content restore** — Add 1–2 key product images above the fold. *(Partially advanced in prior session — hero is now `richfeyn.png`, demo video promoted to hero slot, redundant `How_smartjar_works.png` removed. Still unconfirmed whether user considers this task complete.)*
  3. **Project Live Link** — Add a `Live Demo` link to the Warehouse Routing homepage card pointing at the Hugging Face Space. *(Already present at `src/App.tsx:265` — "Live" link with ExternalLink icon. Likely done; verify with user.)*

## What To Do Next (in order)
1. **Read `docs/scaffolds/code-map.md`** to orient.
2. **Read `docs/product-context.md`** (last updated 2026-04-15) for product philosophy.
3. **Read `docs/plans/sprint-3-plan.md`** for Sprint 3 task details.
4. **Install `jq`** (still pending from prior session) — `sudo apt-get install -y jq`. Without it the status line shows 0% because `.claude/statusline.sh` parses Claude Code's stdin entirely through `jq`.
5. **Confirm Sprint 3 Tasks 2 and 3 are already done** with the user before closing them. Task 2 hero/video swap happened in the previous session; Task 3 `Live` link already exists on the Warehouse Routing card.
6. **Triage the three untracked files** (`comm.html`, `feedback_from_llm.ipynb`, `feedback_from_llm.md`). They have persisted untouched across three sessions — ask user to commit, `.gitignore`, or delete.
7. **Start Sprint 3 Task 1 — Homepage re-ordering:**
   - Target: `src/App.tsx`. Current section order (top to bottom after hero): `About Me` (177), `Select Projects` (249), `Experience` (311), `Latest Writing` (grep for heading; not yet located).
   - Target order: `About Me` → `Select Projects` → `Experience` → `Latest Writing`. Current order already matches for the first three; only confirm that `Latest Writing` is after `Experience`.
   - Follow CLAUDE.md workflow: Session Entry Protocol → issue → Tara test-first if M+ → Sato → code-reviewer → Done Gate.

## Tracking Artifacts
- `docs/tracking/archive/sprint-1/` exists; no active tracking artifacts for Sprint 3 yet. Per `docs/process/tracking-protocol.md`, Sprint 3 execution should generate phase-tagged tracking artifacts under `docs/tracking/`.
- No new tracking artifacts generated this session (work was a one-off polish commit, not sprint-scoped).

## Proxy Decisions (Review Required)
- None. User was available throughout.

## Key Context
- **Hero link row location:** `src/App.tsx` ~150–170 (the `<div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 ...">` block directly below the `View Resume`/`Get in touch`/`LinkedIn` button row). Only `Live environment` remains there.
- **`ExperienceItem` `links` prop is optional** — omitting it is fine; no type errors.
- **Warehouse Routing project card (`src/App.tsx:256–283`)** still has both a `Live` text link and a Github icon `Source Repo` link. The user chose to keep the Github icon after confirmation. Do not remove it without asking.
- **`Link` import from `react-router-dom` is still used** (nav `/blog` link at 89, RichFeyn case-study icon at 283, blog cards at 398+) — do not prune the import.
- **Blog post section anchors in `src/components/BlogPost.tsx`:** `WarehouseRoutingPost` 419–872, `RichFeynPost` 874–961, `ClaudeStyleReplicationPost` 963–1503 (unchanged this session).
- **Untracked files persistence:** `comm.html` and `feedback_from_llm.*` have survived three sessions without being triaged. Flag earlier rather than later next session.
- **CLAUDE.md still missing `project-number` / `project-owner`** — no board workflow active.
- **Status line dependency:** `jq` still not installed on this machine; status line continues to show 0%.
- **Vite + GitHub Pages deploy:** every push to `main` triggers `.github/workflows/deploy.yml` (~40s). Hard refresh (Ctrl+Shift+R) required to see changes.
