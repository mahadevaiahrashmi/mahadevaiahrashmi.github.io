---
agent-notes: { ctx: "Sprint 2 retrospective - content and themeing", deps: [CLAUDE.md], state: active, last: "coordinator@2026-04-16" }
---

# Sprint 2 Retrospective

**Date:** 2026-04-16
**Sprint:** 2
**Scope:** Content additions (RichFeyn blog) and Dark Mode implementation.

## 1. What went well?
- **Efficient content extraction:** Extracted product narrative and video from the provided `richfeyn/` assets seamlessly.
- **Robust Dark Mode implementation:** Integrated CSS variables and a persistence layer (`localStorage`) with a blocking `<script>` in `index.html` to prevent FOUC.
- **CI/CD Fix:** Identified and resolved a hanging test script in `package.json` that was blocking the Done Gate hook.

## 2. What was harder than expected?
- **GitHub Pages Routing:** Validating deep links via `curl` produced misleading 404s due to the SPA redirection hack.
- **Workspace Cleanup Friction:** Accidental deletion of untracked files (`richfeyn/`, `.codex/`) due to aggressive cleanup without explicit confirmation for each path.

## 3. Recurring patterns or friction points?
- **Untracked artifact management:** Handling large asset folders that are processed but not meant for version control requires more careful confirmation before deletion.

## 4. Engaged Personas
- **Sato (Implementation):** Led the implementations of the blog post and theme toggle.
- **Dani (Design):** Reviewed contrast and layout for the dark theme.
- **Vik (Code Review):** Validated build, lint, and typecheck status.

## 5. Architecture Gate Audit
- **Decisions made:** Integrated dark mode via CSS variables.
- **ADRs created:** None this sprint. (Decision was straightforward style-level change).

## 6. Actions for Process Improvement
- **Issue created:** "Process: Confirm untracked file deletion individually" to prevent accidental data loss.

## 7. Operational Baseline Audit
- **Logging:** N/A (Frontend only).
- **Error UX:** Actionable 404 redirection in place.
- **Config:** No `.env` changes required.

## 8. Visual Smoke Test (Dani)
- **Routes checked:** `/`, `/blog`, `/blog/richfeyn-smart-jar`, `/blog/warehouse-routing-openenv`.
- **Results:** Rendering correctly in both Light and Dark modes. Navigation links confirmed.
