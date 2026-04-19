// agent-notes: { ctx: "vteam-hybrid cheatsheet blog post content", deps: ["../../components/blog-helpers", "../../components/blog-prose"], state: active, last: "sato@2026-04-19", key: ["7 phases + agent roster + command routing as a single reference post; composite invocation pattern section uses Architecture Gate; appendix covers 15 less-frequent commands and code-reviewer composite"] }
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { InlineCode, ClaudeCodeBlock } from "../../components/blog-helpers";
import { PostH2, PostH3, PostP, PostUL } from "../../components/blog-prose";

export default function VteamHybridCheatsheetPost() {
  return (
    <>
      <h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight mb-6 leading-tight">
        The vteam-hybrid Cheatsheet
      </h1>

      <p className="text-lg font-serif italic opacity-60 mb-12">
        Published: April 2026 | Reading Time: ~7 minutes
      </p>

      <PostH2>
        What is vteam-hybrid?
      </PostH2>
      <PostP>
        <strong>vteam-hybrid</strong> is the team methodology wired into every Claude Code project in this repo. Instead of one fixed org chart that tries to fit every situation, it picks from <strong>seven different team shapes</strong> depending on what you're doing — brainstorming an idea, making an architectural call, writing code, reviewing a pull request, chasing a bug. Each shape has a lead, a supporting cast, and a single rule about how hand-offs happen.
      </PostP>
      <PostP>
        You don't need to memorize any of it to <em>use</em> Claude Code — the coordinator picks the right team for you. But knowing the shapes makes two things much easier: you can nudge Claude toward the right mode ("let's do a code review on this", "challenge this architecture"), and you can read a session transcript without wondering why four different agents just showed up. That's the entire point of this cheatsheet.
      </PostP>

      <PostH2>
        The seven phases, at a glance
      </PostH2>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse font-serif">
          <thead>
            <tr className="bg-anthropic-text/5">
              <th className="p-3 border border-anthropic-text/10 font-bold text-left">Phase</th>
              <th className="p-3 border border-anthropic-text/10 font-bold text-left">When to use it</th>
              <th className="p-3 border border-anthropic-text/10 font-bold text-left">Lead</th>
              <th className="p-3 border border-anthropic-text/10 font-bold text-left">Team shape</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="p-3 border border-anthropic-text/10">1. Discovery</td><td className="p-3 border border-anthropic-text/10">Vague idea, new feature request</td><td className="p-3 border border-anthropic-text/10">Cam</td><td className="p-3 border border-anthropic-text/10">Blackboard (open brainstorm)</td></tr>
            <tr><td className="p-3 border border-anthropic-text/10">2. Architecture</td><td className="p-3 border border-anthropic-text/10">A real design decision is on the table</td><td className="p-3 border border-anthropic-text/10">Archie</td><td className="p-3 border border-anthropic-text/10">Ensemble + Wei debate</td></tr>
            <tr><td className="p-3 border border-anthropic-text/10">3. Implementation</td><td className="p-3 border border-anthropic-text/10">Writing code for a known task</td><td className="p-3 border border-anthropic-text/10">Tara → Sato</td><td className="p-3 border border-anthropic-text/10">TDD pipeline (red-green-refactor)</td></tr>
            <tr><td className="p-3 border border-anthropic-text/10">4. Parallel Work</td><td className="p-3 border border-anthropic-text/10">3+ independent items can move at once</td><td className="p-3 border border-anthropic-text/10">Grace</td><td className="p-3 border border-anthropic-text/10">Market (self-claim)</td></tr>
            <tr><td className="p-3 border border-anthropic-text/10">5. Code Review</td><td className="p-3 border border-anthropic-text/10">Reviewing a change set</td><td className="p-3 border border-anthropic-text/10">Vik + Tara + Pierrot</td><td className="p-3 border border-anthropic-text/10">Three parallel lenses</td></tr>
            <tr><td className="p-3 border border-anthropic-text/10">6. Debugging</td><td className="p-3 border border-anthropic-text/10">A bug needs chasing</td><td className="p-3 border border-anthropic-text/10">Sato</td><td className="p-3 border border-anthropic-text/10">Blackboard (shared investigation)</td></tr>
            <tr><td className="p-3 border border-anthropic-text/10">7. Human Interaction</td><td className="p-3 border border-anthropic-text/10">The human needs to decide something</td><td className="p-3 border border-anthropic-text/10">Cam</td><td className="p-3 border border-anthropic-text/10">Single point of contact</td></tr>
          </tbody>
        </table>
      </div>
      <PostP>
        Phases can <em>nest</em>. Parallel Work is usually several Implementation pipelines running at once. A Code Review that spots a bug pops into Debugging and comes back. Any phase can pause to ask the human a question — that's Phase 7.
      </PostP>

      <PostH2>
        The agent roster (keep this open while you work)
      </PostH2>
      <PostP>
        vteam-hybrid uses <strong>18 agents</strong>, down from the 32 of the original V-Team. Each one owns a capability, not a job title — so "Archie" is architecture + schema + API contracts, not three separate personas. Here are the ones you'll reach for most:
      </PostP>
      <PostUL>
        <li><strong>Cam</strong> — your human interface. Probes, clarifies, translates. The default whenever a request is fuzzy.</li>
        <li><strong>Pat</strong> — product owner. Writes acceptance criteria, sets priorities, speaks for the human in proxy mode.</li>
        <li><strong>Archie</strong> — lead architect. Writes ADRs. Handles system design, data schemas, and API contracts as one capability.</li>
        <li><strong>Tara</strong> — the red phase of TDD. Writes failing tests first and owns coverage quality.</li>
        <li><strong>Sato</strong> — the green/refactor phase. Implements, refactors, chases bugs. The most-invoked agent.</li>
        <li><strong>Vik</strong> — simplicity reviewer. Flags over-engineering, premature abstractions, pattern drift.</li>
        <li><strong>Pierrot</strong> — security + compliance. Has veto power on both.</li>
        <li><strong>Grace</strong> — sprint coordinator. Distributes parallel work, owns board status, runs ceremonies.</li>
        <li><strong>Wei</strong> — devil's advocate. Mandatory challenger on every architecture decision. You invoke Wei when the team is agreeing too fast.</li>
        <li><strong>Ines</strong> — DevOps / SRE / chaos. Owns everything between <InlineCode>git push</InlineCode> and production.</li>
        <li><strong>Dani</strong> — design + UX + accessibility. Any frontend change triggers Dani review.</li>
        <li><strong>Diego</strong> — technical writer. If it's not documented, it doesn't exist.</li>
        <li><strong>Debra</strong> — data science and ML. Also the debugging contributor for data-shaped bugs.</li>
        <li><strong>Prof</strong> — read-only explainer. Teaches the "why" without touching code.</li>
        <li><strong>User Chorus</strong> — a panel of user archetypes for usability feedback.</li>
        <li><strong>Cloud Architect / CostGuard / NetDiag</strong> — three cloud specialists that adapt to AWS, Azure, or GCP automatically.</li>
      </PostUL>
      <PostP>
        A single rule that catches most mistakes: <em>when the human says "invoke the team" or names a persona, spawn that persona as a subagent.</em> Your own inline reasoning is not a substitute for actually running Vik, or Tara, or Wei. Doing the work yourself when an agent was asked for is a process violation.
      </PostP>

      <PostH2>
        Composite invocation patterns
      </PostH2>
      <PostP>
        Some of the most valuable work in vteam-hybrid doesn't come from any single agent — it comes from a fixed <em>combination</em> of agents invoked together, with a specific protocol for how they interact. These are called <strong>composite invocation patterns</strong>. The <InlineCode>code-reviewer</InlineCode> agent is one: it bundles Vik + Tara + Pierrot (and Archie, when the diff touches shared types) into three or four parallel review lenses, then synthesizes their findings by severity.
      </PostP>
      <PostP>
        But the pattern you'll use more often — and the one worth understanding deeply — is the <strong>Architecture Gate</strong>.
      </PostP>

      <PostH3>
        Example: the Architecture Gate
      </PostH3>
      <PostP>
        Whenever a real design decision is on the table (picking a framework, choosing a data model, committing to an integration pattern), vteam-hybrid refuses to move to implementation until the decision has been recorded <em>and adversarially challenged</em>. The gate is a four-agent composite:
      </PostP>
      <PostUL>
        <li><strong>Archie</strong> — proposes the design and writes an ADR in <InlineCode>docs/adrs/</InlineCode>.</li>
        <li><strong>Wei</strong> — challenges it. Invoked as a <em>standalone</em> subagent, not inlined. Skipping Wei is a process violation.</li>
        <li><strong>Vik</strong> — checks the proposed architecture for over-engineering and premature abstraction.</li>
        <li><strong>Pierrot</strong> — flags the security surface: new attack vectors, auth changes, data-exposure risks.</li>
      </PostUL>
      <PostP>
        What makes it a <em>composite pattern</em> and not just "four agents running" is the protocol — specifically, the <strong>adversarial debate</strong> between Archie and Wei, run for at least two rounds:
      </PostP>
      <PostUL>
        <li><strong>Round 1 — Opening.</strong> Archie presents the ADR. Wei, Vik, and Pierrot each produce their independent critiques in parallel.</li>
        <li><strong>Round 2 — Response.</strong> Wei's critique goes back to Archie: "Wei raised X, Y, Z. Respond to each." Archie must address every point — either update the ADR, acknowledge the risk, or push back with reasoning.</li>
        <li><strong>Round 3 — Final word (optional).</strong> If Wei's concerns aren't adequately answered, one more rebuttal round. Capped at three.</li>
        <li><strong>Resolution.</strong> The coordinator summarizes: which points were resolved, which remain as acknowledged risks, and what changed in the ADR. The debate is tracked in <InlineCode>docs/tracking/YYYY-MM-DD-&lt;topic&gt;-debate.md</InlineCode>.</li>
      </PostUL>
      <PostP>
        The gate only clears when (a) the ADR is marked Accepted, (b) Wei has actually been invoked and the debate is tracked, and (c) the human approves. The <em>composite</em> part is what matters: running Archie alone produces confident-sounding architecture that hasn't been stress-tested; running Wei alone produces critique with no design to critique. You need both, in the right order, with the response round in between. That's the pattern.
      </PostP>
      <PostP>
        Other composite patterns worth knowing: the <strong>Discovery Blackboard</strong> (Cam + Pat + Dani + Wei + User Chorus contributing to a shared plan document), the <strong>Pre-release Gate</strong> (Pierrot + Diego + Ines + Vik debating Sato as defender), and the <strong>Scope Reduction Gate</strong> (Wei + Cam + Grace + human approval before any planned feature can be demoted). Each one combines specific agents with a specific interaction protocol — that's the shape of a composite.
      </PostP>

      <PostH2>
        The commands you'll actually type
      </PostH2>
      <PostP>
        vteam-hybrid ships about 25 slash commands. You only need six of them for 80% of sessions:
      </PostP>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse font-serif">
          <thead>
            <tr className="bg-anthropic-text/5">
              <th className="p-3 border border-anthropic-text/10 font-bold text-left">Command</th>
              <th className="p-3 border border-anthropic-text/10 font-bold text-left">What it does</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="p-3 border border-anthropic-text/10"><InlineCode>/plan</InlineCode></td><td className="p-3 border border-anthropic-text/10">Produces an implementation plan with sequencing, risks, scope. Run this before any non-trivial task.</td></tr>
            <tr><td className="p-3 border border-anthropic-text/10"><InlineCode>/tdd</InlineCode></td><td className="p-3 border border-anthropic-text/10">Strict red-green-refactor on a defined task. Tara writes the failing test, Sato makes it pass.</td></tr>
            <tr><td className="p-3 border border-anthropic-text/10"><InlineCode>/code-review</InlineCode></td><td className="p-3 border border-anthropic-text/10">Runs Vik + Tara + Pierrot in parallel on the current changes, then synthesizes findings.</td></tr>
            <tr><td className="p-3 border border-anthropic-text/10"><InlineCode>/adr</InlineCode></td><td className="p-3 border border-anthropic-text/10">Writes an Architecture Decision Record from a template. Use this before implementing anything with a pending design question.</td></tr>
            <tr><td className="p-3 border border-anthropic-text/10"><InlineCode>/handoff</InlineCode></td><td className="p-3 border border-anthropic-text/10">Packages the session state into a markdown note so the next session (or another person) can pick up cleanly.</td></tr>
            <tr><td className="p-3 border border-anthropic-text/10"><InlineCode>/sprint-boundary</InlineCode></td><td className="p-3 border border-anthropic-text/10">Mandatory end-of-sprint ceremony: retro + sweep + gate checks. Run when all sprint items are done or deferred.</td></tr>
          </tbody>
        </table>
      </div>
      <PostP>
        The other nineteen commands live in the appendix at the bottom — grouped by purpose so you can skim for the one you want.
      </PostP>

      <PostH2>
        The three non-negotiable rules
      </PostH2>
      <PostP>
        Everything else in the methodology is a default you can push on. These three aren't:
      </PostP>

      <PostH3>
        1. Session Entry Protocol — before you write a line of code
      </PostH3>
      <PostP>
        At the start of any coding session, answer three questions <strong>in order</strong>:
      </PostP>
      <PostUL>
        <li><strong>Does a work item exist for this?</strong> If no, create one (Pat + Grace).</li>
        <li><strong>Is there an architectural decision embedded in this work?</strong> If yes, Architecture Gate first — Archie writes an ADR, Wei challenges it, human approves. No ADR means no implementation.</li>
        <li><strong>Am I about to write implementation code?</strong> If yes, Tara writes failing tests first.</li>
      </PostUL>
      <PostP>
        A detailed plan from the human is <em>input</em> to this protocol, not a bypass of it. "Just do it" is not a valid override — the protocol exists because skipping it is how projects drift into unreviewed architectural commitments.
      </PostP>

      <PostH3>
        2. The Done Gate — before you close a work item
      </PostH3>
      <PostP>
        Every work item moves through three board states in this exact order: <strong>In Progress → In Review → Done</strong>. Skipping "In Review" is a process violation. Before the item closes, it clears the 15-point Done Gate checklist (tests, docs, agent-notes updated, conventional commit, code-review findings addressed, etc.). The full list lives at <InlineCode>docs/process/done-gate.md</InlineCode>.
      </PostP>

      <PostH3>
        3. Agent-Notes on every non-excluded file
      </PostH3>
      <PostP>
        Every source file carries a one-line header describing its purpose, direct dependencies, state, and who touched it last. The format adapts to the file type (YAML frontmatter for markdown, a comment line for code):
      </PostP>
      <ClaudeCodeBlock title="example: src/blog/posts/example.tsx">
{`// agent-notes: { ctx: "example post body", deps: ["../../components/blog-prose"], state: active, last: "sato@2026-04-19" }`}
      </ClaudeCodeBlock>
      <PostP>
        The <InlineCode>ctx</InlineCode> stays under 10 words. The <InlineCode>deps</InlineCode> list is direct dependencies only, not transitive. Every edit bumps the <InlineCode>last</InlineCode> field. The payoff: the next agent (or you, a month later) can decide whether to open the file without reading it.
      </PostP>

      <PostH2>
        A five-step typical day
      </PostH2>
      <PostP>
        Here's what a healthy sprint day actually looks like, mapped to the phases and commands above:
      </PostP>
      <PostUL>
        <li><strong>Pick an issue.</strong> Move it from "Ready" to "In Progress" on the board <em>before</em> writing any code.</li>
        <li><strong>Run <InlineCode>/plan</InlineCode>.</strong> Get a sequenced plan; check for embedded architectural decisions. If you find one, stop and run the Architecture Gate.</li>
        <li><strong>Run <InlineCode>/tdd</InlineCode>.</strong> Tara writes the failing test as a standalone agent, Sato makes it pass, Sato refactors, Tara verifies.</li>
        <li><strong>Commit.</strong> One commit per issue, conventional message (<InlineCode>feat:</InlineCode>, <InlineCode>fix:</InlineCode>, <InlineCode>chore:</InlineCode>…), ending with <InlineCode>Closes #N</InlineCode>. Then move the issue to "In Review".</li>
        <li><strong>Run <InlineCode>/code-review</InlineCode>.</strong> Address every Critical and Important finding. Once clean, walk the Done Gate checklist, move to "Done", push. Start the next issue.</li>
      </PostUL>
      <PostP>
        That's one item, one cycle. Repeat until the sprint is empty, then run <InlineCode>/sprint-boundary</InlineCode>.
      </PostP>

      <PostH2>
        Appendix: commands and agents you'll meet less often
      </PostH2>
      <PostP>
        The six commands above cover most daily work. The rest are specialist tools — you'll only reach for them in specific situations, but when you need them you really need them.
      </PostP>

      <PostH3>
        Session and workflow helpers
      </PostH3>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse font-serif">
          <thead>
            <tr className="bg-anthropic-text/5">
              <th className="p-3 border border-anthropic-text/10 font-bold text-left">Command</th>
              <th className="p-3 border border-anthropic-text/10 font-bold text-left">Use when</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="p-3 border border-anthropic-text/10"><InlineCode>/kickoff</InlineCode></td><td className="p-3 border border-anthropic-text/10">Full 5-phase setup for a brand-new repo (30-60 min).</td></tr>
            <tr><td className="p-3 border border-anthropic-text/10"><InlineCode>/quickstart</InlineCode></td><td className="p-3 border border-anthropic-text/10">5-minute onboarding; skips the full kickoff ceremony.</td></tr>
            <tr><td className="p-3 border border-anthropic-text/10"><InlineCode>/resume</InlineCode></td><td className="p-3 border border-anthropic-text/10">Recover context from a prior session's handoff note.</td></tr>
            <tr><td className="p-3 border border-anthropic-text/10"><InlineCode>/doctor</InlineCode></td><td className="p-3 border border-anthropic-text/10">Read-only health check of the vteam setup (8 diagnostics).</td></tr>
            <tr><td className="p-3 border border-anthropic-text/10"><InlineCode>/retro</InlineCode></td><td className="p-3 border border-anthropic-text/10">Lessons-learned pass on finished work; files findings as issues.</td></tr>
            <tr><td className="p-3 border border-anthropic-text/10"><InlineCode>/whatsit</InlineCode></td><td className="p-3 border border-anthropic-text/10">Explain or discover a concept, library, or technology.</td></tr>
          </tbody>
        </table>
      </div>

      <PostH3>
        Design and review variants
      </PostH3>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse font-serif">
          <thead>
            <tr className="bg-anthropic-text/5">
              <th className="p-3 border border-anthropic-text/10 font-bold text-left">Command</th>
              <th className="p-3 border border-anthropic-text/10 font-bold text-left">Use when</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="p-3 border border-anthropic-text/10"><InlineCode>/design</InlineCode></td><td className="p-3 border border-anthropic-text/10">You want two or three sacrificial concepts before committing to a direction.</td></tr>
            <tr><td className="p-3 border border-anthropic-text/10"><InlineCode>/review</InlineCode></td><td className="p-3 border border-anthropic-text/10">Guided human-review walkthrough (distinct from <InlineCode>/code-review</InlineCode>, which is the agent composite).</td></tr>
          </tbody>
        </table>
      </div>

      <PostH3>
        Scaffolding and environment
      </PostH3>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse font-serif">
          <thead>
            <tr className="bg-anthropic-text/5">
              <th className="p-3 border border-anthropic-text/10 font-bold text-left">Command</th>
              <th className="p-3 border border-anthropic-text/10 font-bold text-left">Use when</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="p-3 border border-anthropic-text/10"><InlineCode>/scaffold-static-site</InlineCode></td><td className="p-3 border border-anthropic-text/10">GitHub Pages or other static-site repo setup.</td></tr>
            <tr><td className="p-3 border border-anthropic-text/10"><InlineCode>/scaffold-web-monorepo</InlineCode></td><td className="p-3 border border-anthropic-text/10">Web or mobile monorepo scaffold.</td></tr>
            <tr><td className="p-3 border border-anthropic-text/10"><InlineCode>/scaffold-cli</InlineCode></td><td className="p-3 border border-anthropic-text/10">Command-line tool scaffold.</td></tr>
            <tr><td className="p-3 border border-anthropic-text/10"><InlineCode>/scaffold-ai-tool</InlineCode></td><td className="p-3 border border-anthropic-text/10">AI or data-centric tool scaffold.</td></tr>
            <tr><td className="p-3 border border-anthropic-text/10"><InlineCode>/devcontainer</InlineCode></td><td className="p-3 border border-anthropic-text/10">Add a reproducible dev-container setup to the repo.</td></tr>
            <tr><td className="p-3 border border-anthropic-text/10"><InlineCode>/pin-versions</InlineCode></td><td className="p-3 border border-anthropic-text/10">Tighten and pin dependency / tool versions; updates SBOM.</td></tr>
            <tr><td className="p-3 border border-anthropic-text/10"><InlineCode>/sync-template</InlineCode></td><td className="p-3 border border-anthropic-text/10">Pull newer vteam-hybrid template mechanics into an in-flight repo.</td></tr>
            <tr><td className="p-3 border border-anthropic-text/10"><InlineCode>/sync-ghcp</InlineCode></td><td className="p-3 border border-anthropic-text/10">Map <InlineCode>.claude</InlineCode> agents and commands to GitHub Copilot format.</td></tr>
          </tbody>
        </table>
      </div>

      <PostH3>
        Cloud deployment reviews
      </PostH3>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse font-serif">
          <thead>
            <tr className="bg-anthropic-text/5">
              <th className="p-3 border border-anthropic-text/10 font-bold text-left">Command</th>
              <th className="p-3 border border-anthropic-text/10 font-bold text-left">Use when</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="p-3 border border-anthropic-text/10"><InlineCode>/aws-review</InlineCode></td><td className="p-3 border border-anthropic-text/10">Multi-lens AWS deployment-readiness review.</td></tr>
            <tr><td className="p-3 border border-anthropic-text/10"><InlineCode>/azure-review</InlineCode></td><td className="p-3 border border-anthropic-text/10">Multi-lens Azure deployment-readiness review.</td></tr>
            <tr><td className="p-3 border border-anthropic-text/10"><InlineCode>/gcp-review</InlineCode></td><td className="p-3 border border-anthropic-text/10">Multi-lens GCP deployment-readiness review.</td></tr>
            <tr><td className="p-3 border border-anthropic-text/10"><InlineCode>/cloud-update</InlineCode></td><td className="p-3 border border-anthropic-text/10">Refresh the cloud-landscape research files under <InlineCode>docs/research/</InlineCode>.</td></tr>
          </tbody>
        </table>
      </div>

      <PostH3>
        The composite agent
      </PostH3>
      <PostP>
        One agent was skipped in the main roster because it's a <em>composite invocation pattern</em>, not a single persona:
      </PostP>
      <PostUL>
        <li><strong>code-reviewer</strong> — bundles Vik (simplicity), Tara (test coverage), Pierrot (security), and Archie (architectural conformance, when the diff touches shared types) into parallel review lenses. Invoked by <InlineCode>/code-review</InlineCode> or directly when you want all lenses at once. The synthesis step — ranking findings by severity and flagging blocking concerns — is part of the pattern.</li>
      </PostUL>

      <PostH2>
        What to read next
      </PostH2>
      <PostP>
        This post is the map. The territory lives in the repo under <InlineCode>docs/</InlineCode>:
      </PostP>
      <PostUL>
        <li><InlineCode>docs/methodology/phases.md</InlineCode> — full spec for all seven phases, including the phase-selection flowchart and the nesting rules.</li>
        <li><InlineCode>docs/methodology/personas.md</InlineCode> — the full 18-agent roster with invocation triggers and absorbed-persona notes.</li>
        <li><InlineCode>docs/process/team-governance.md</InlineCode> — debate protocol, Architecture Gate rules, voice conventions, when to invoke whom.</li>
        <li><InlineCode>docs/process/done-gate.md</InlineCode> — the 15-item checklist every work item clears before closing.</li>
        <li><InlineCode>docs/process/command-agent-cheat-sheet.md</InlineCode> — a terse routing table for all 25 commands and 18 agents.</li>
        <li><InlineCode>docs/adrs/template/0003-hybrid-team-architecture.md</InlineCode> — the ADR that motivates the whole methodology, including why the agent count went from 32 to 18.</li>
      </PostUL>
      <PostP>
        The goal of vteam-hybrid isn't to be strict for strictness's sake — it's to make sure the things that <em>only</em> get caught by adversarial review (over-engineered abstractions, missing tests, unexamined architectural drift) actually get caught, every time, without you having to remember them. The phases are the scaffolding. The commands are the muscle memory. The three non-negotiables are the guardrails.
      </PostP>

      <div className="mt-16 pt-8 border-t border-anthropic-text/10 opacity-60 text-sm font-serif">
        <p className="font-bold mb-4 font-serif">Resources:</p>
        <ul className="space-y-2 font-serif">
          <li><InlineCode>docs/methodology/phases.md</InlineCode> — phase spec</li>
          <li><InlineCode>docs/methodology/personas.md</InlineCode> — agent roster</li>
          <li><InlineCode>docs/process/team-governance.md</InlineCode> — governance</li>
          <li><InlineCode>docs/process/done-gate.md</InlineCode> — done-gate checklist</li>
          <li><InlineCode>docs/process/command-agent-cheat-sheet.md</InlineCode> — command routing</li>
        </ul>
        <p className="mt-8 italic font-serif">All paths are relative to the repo root. The methodology evolves — check the ADRs in <InlineCode>docs/adrs/</InlineCode> for the latest on phase definitions and agent consolidation.</p>
      </div>
    </>
  );
}
