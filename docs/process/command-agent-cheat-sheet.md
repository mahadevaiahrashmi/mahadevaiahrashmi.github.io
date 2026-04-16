---
agent-notes:
  ctx: "quick command and agent routing guide"
  deps: [.claude/agents/, .claude/commands/, docs/process/team-governance.md]
  state: active
  last: "codex@2026-04-16"
---

# Command And Agent Cheat Sheet

Use this as the fast routing guide for the local `.claude` workflow in this repo.

## Commands

| Command | Use it when |
|---|---|
| `plan` | You need an implementation plan, sequencing, risks, or scope breakdown. |
| `kickoff` | The repo is still early-stage and needs project setup and process initialization. |
| `resume` | You need to recover context from prior work and current repo state. |
| `tdd` | You want strict red-green-refactor implementation. |
| `code-review` | You want a multi-lens review of current changes. |
| `review` | You want a review workflow on current work or a change set. |
| `adr` | A significant architecture or tooling decision needs to be recorded. |
| `doctor` | You want a read-only health check of the repo's vteam setup. |
| `design` | You want multiple solution directions before implementation starts. |
| `handoff` | Work needs to be packaged clearly for another contributor or future session. |
| `retro` | A completed chunk of work needs lessons learned and process feedback captured. |
| `sprint-boundary` | End-of-sprint governance, retro, and gate checks need to run. |
| `scaffold-static-site` | You want to set up a GitHub Pages/static site repo. |
| `scaffold-web-monorepo` | You want a web or mobile monorepo scaffold. |
| `scaffold-cli` | You want a CLI project scaffold. |
| `scaffold-ai-tool` | You want an AI-oriented tool or app scaffold. |
| `devcontainer` | The repo needs a reproducible dev container setup. |
| `pin-versions` | Dependency or tool versions need to be tightened and pinned. |
| `sync-template` | You want to pull newer template mechanics into this repo. |
| `sync-ghcp` | You want `.claude` agents and commands mapped to GitHub Copilot format. |
| `aws-review` | You want AWS deployment-readiness review. |
| `azure-review` | You want Azure deployment-readiness review. |
| `gcp-review` | You want GCP deployment-readiness review. |
| `cloud-update` | Cloud landscape research files need to be refreshed. |
| `whatsit` | You want a concept or technology explained or researched. |

## Agents

| Agent | Use it when |
|---|---|
| `sato` | Production code, refactors, and bug fixes need implementation. |
| `tara` | Failing tests need to be written first or coverage needs improvement. |
| `archie` | Architecture, schema, API contract, or ADR-quality tradeoff analysis is needed. |
| `code-reviewer` | You want a combined maintainability, testing, security, and architecture review. |
| `vik` | You want a deep simplicity and maintainability review on critical paths. |
| `pierrot` | You need a security, compliance, dependency, or attack-surface lens. |
| `dani` | You need UX or design exploration before committing to an approach. |
| `cam` | The request is vague and needs clarification or structured user review. |
| `pat` | Requirements, acceptance criteria, or prioritization need to be shaped. |
| `grace` | Sprint tracking, coordination, or workflow governance is the main need. |
| `ines` | DevOps, CI/CD, infrastructure, or operational changes are involved. |
| `debra` | The task is debugging, diagnosis, or root-cause analysis. |
| `diego` | Documentation, DevEx, or knowledge-transfer work is needed. |
| `prof` | The goal is explanation and understanding rather than code changes. |
| `user-chorus` | You want feedback from multiple user archetypes. |
| `wei` | The team needs assumptions challenged before locking a direction. |
| `cloud-architect` | Cloud architecture or service selection needs review. |
| `cloud-costguard` | Cloud cost and pricing risk need review. |
| `cloud-netdiag` | Cloud networking or deployment-readiness constraints need diagnosis. |

## Fast Defaults

- Building or fixing code: `tara` then `sato`, or use `tdd`.
- Reviewing changes: `code-review` or `code-reviewer`.
- Unsure what to build: `cam` or `plan`.
- Making a big technical choice: `archie` plus `adr`.
- Everyone agrees too quickly: `wei`.
- Working on infrastructure or cloud: `ines` or the cloud agents.
- Explaining code or concepts: `prof` or `whatsit`.
