// agent-notes: { ctx: "Claude style replication blog post content", deps: ["../../components/blog-helpers"], state: active, last: "sato@2026-04-18", key: ["extracted from BlogPost.tsx for #29 split"] }
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { InlineCode, ClaudeCodeBlock } from "../../components/blog-helpers";

export default function ClaudeStyleReplicationPost() {
  return (
    <>
      <h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight mb-6 leading-tight">
        Teach Your AI Coding Helper Three Different Voices
      </h1>

      <p className="text-lg font-serif italic opacity-60 mb-12">
        Published: April 2026 | Reading Time: ~8 minutes
      </p>

      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        The idea in one paragraph
      </h2>
      <p className="text-lg leading-relaxed opacity-90 mb-6 font-serif">
        AI coding assistants that run in your terminal — like <strong>Claude Code</strong> (from Anthropic), <strong>Gemini CLI</strong> (from Google), and <strong>Codex CLI</strong> (from OpenAI) — are basically "chat with an AI that can also read and write the files on your laptop." A useful feature Anthropic shipped early is a <em>voice switcher</em>: a single command lets you tell Claude "just do it, no chatter" or "explain your thinking as you go" or "teach me — make me write the code myself." The other two tools don't ship this feature by default. The good news: you can add it yourself in about five minutes of copy-paste. This post shows you how, in plain language.
      </p>

      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        What are these three voices?
      </h2>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        Claude Code calls them <em>output styles</em>. Here's what the menu looks like inside Claude Code:
      </p>
      <ClaudeCodeBlock title="Output style" plain>
{`1. Default     Claude completes coding tasks efficiently and provides concise responses
2. Explanatory Claude explains its implementation choices and codebase patterns
3. Learning    Claude pauses and asks you to write small pieces of code for hands-on practice`}
      </ClaudeCodeBlock>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        Think of these as three moods you can put your helper in, depending on what you're doing:
      </p>
      <ul className="list-disc pl-6 mb-6 space-y-2 text-lg leading-relaxed opacity-90 font-serif">
        <li><strong>Default</strong> — the quick, efficient mode. You say "add dark mode to the settings page"; it adds dark mode. Minimal chatter. Best when you know exactly what you want and just need it done.</li>
        <li><strong>Explanatory</strong> — the thoughtful colleague mode. Same task, but the helper explains <em>why</em> it picked a particular approach, what trade-offs matter, and how the change fits the rest of the codebase. Best when you're learning a new project or reviewing unfamiliar code.</li>
        <li><strong>Learning</strong> — the patient tutor mode. The helper breaks the task into bite-sized pieces, explains one piece, then <em>stops</em> and asks you to write that piece yourself. It reviews your attempt and guides you to the next step. Best when you want to genuinely improve your skills, not just get the job done.</li>
      </ul>
      <p className="text-lg leading-relaxed opacity-90 mb-6 font-serif">
        Inside Claude Code you switch modes with <InlineCode>/output-style explanatory</InlineCode> (or similar). Gemini and Codex don't have a button like this. So what we're going to do is create our own version — three little "presets" you can summon with a short command.
      </p>

      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        When to use which voice — a cheat sheet
      </h2>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse font-serif">
          <thead>
            <tr className="bg-anthropic-text/5">
              <th className="p-3 border border-anthropic-text/10 font-bold text-left">Style</th>
              <th className="p-3 border border-anthropic-text/10 font-bold text-left">Behavior</th>
              <th className="p-3 border border-anthropic-text/10 font-bold text-left">Best For</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border border-anthropic-text/10 font-bold">Default</td>
              <td className="p-3 border border-anthropic-text/10 text-red-500 font-semibold">Fast, concise, task-focused responses</td>
              <td className="p-3 border border-anthropic-text/10">Quick iterations, experienced developers</td>
            </tr>
            <tr className="bg-anthropic-text/[0.02]">
              <td className="p-3 border border-anthropic-text/10 font-bold">Explanatory</td>
              <td className="p-3 border border-anthropic-text/10 text-orange-500 font-semibold">Explains reasoning, patterns, trade-offs</td>
              <td className="p-3 border border-anthropic-text/10">Learning codebases, code reviews, documentation</td>
            </tr>
            <tr>
              <td className="p-3 border border-anthropic-text/10 font-bold">Learning</td>
              <td className="p-3 border border-anthropic-text/10 text-blue-500 font-semibold">Interactive mentor: pauses, asks you to code, gives feedback</td>
              <td className="p-3 border border-anthropic-text/10">Hands-on practice, teaching, skill-building</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        Set it up in Gemini CLI
      </h2>
      <p className="text-lg leading-relaxed opacity-90 mb-6 font-serif">
        Gemini CLI has a really handy feature: you can invent your own <strong>slash commands</strong>. <InlineCode>/explain</InlineCode> and <InlineCode>/learn</InlineCode> don't exist by default — but after this setup, they will, and they'll do exactly what their names suggest.
      </p>
      <p className="text-lg leading-relaxed opacity-90 mb-6 font-serif">
        Each command lives as a small file in a folder Gemini watches. The file just holds a short note saying "when this command is used, behave this way." No programming, no bash. Ready? Open your terminal and follow along.
      </p>

      <h3 className="text-xl font-serif font-medium mt-8 mb-4 text-anthropic-accent">Step 1 — Make the folder where commands live</h3>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        Copy-paste this and press Enter. It creates an empty folder inside your home directory called <InlineCode>.gemini/commands</InlineCode>:
      </p>
      <ClaudeCodeBlock title="create the folder">{`mkdir -p ~/.gemini/commands`}</ClaudeCodeBlock>

      <h3 className="text-xl font-serif font-medium mt-8 mb-4 text-anthropic-accent">Step 2 — Create three tiny files, one per voice</h3>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-semibold font-serif">Each file is a few lines of plain text. Create them one at a time in any text editor (VS Code, TextEdit, Notepad — anything). Save each one into the folder you just made, with the exact filename shown below.</p>

      <div className="space-y-8 font-serif">
        <div>
          <h4 className="text-sm font-serif uppercase tracking-widest opacity-60 mb-2 font-bold underline">~/.gemini/commands/default.toml</h4>
          <ClaudeCodeBlock title="default.toml">
{`description = "Default concise and efficient mode"
prompt = """
You are now in Default mode (Claude Code style).
Complete the following coding task efficiently with concise responses:

{{args}}

No unnecessary explanations unless asked.
"""`}
          </ClaudeCodeBlock>
        </div>

        <div>
          <h4 className="text-sm font-serif uppercase tracking-widest opacity-60 mb-2 font-bold underline">~/.gemini/commands/explain.toml</h4>
          <ClaudeCodeBlock title="explain.toml">
{`description = "Explanatory mode: explains choices and patterns"
prompt = """
You are now in Explanatory mode.

Task: {{args}}

For this task:
- Think step-by-step and explain your reasoning clearly.
- Describe implementation choices, why you picked certain patterns, trade-offs, and how it fits the codebase.
- Provide educational insights.
- Then implement the changes only after I confirm.

Be thorough but not overly verbose.
"""`}
          </ClaudeCodeBlock>
        </div>

        <div>
          <h4 className="text-sm font-serif uppercase tracking-widest opacity-60 mb-2 font-bold underline">~/.gemini/commands/learn.toml</h4>
          <ClaudeCodeBlock title="learn.toml">
{`description = "Learning/Mentor mode: hands-on interactive practice"
prompt = """
You are now in Learning mode (mentor/tutor style).

Task: {{args}}

For this task:
- Break it into small, clear steps.
- Explain the concept or next piece.
- Pause and explicitly ask ME to write the small code snippet myself.
- Review my code, Calvert feedback, and guide me to the next step.
- Only write/implement code yourself if I explicitly ask.

Act like a patient coding instructor for hands-on learning.
"""`}
          </ClaudeCodeBlock>
        </div>
      </div>

      <p className="p-4 bg-anthropic-accent/5 border-l-4 border-anthropic-accent my-6 italic opacity-90 font-serif">
        What is <InlineCode>{"{{args}}"}</InlineCode>? It's a placeholder. Whatever you type after the command name gets slotted in. So typing <InlineCode>/explain refactor the login page</InlineCode> sends your task ("refactor the login page") into that slot, and the voice preset wraps around it.
      </p>

      <h3 className="text-xl font-serif font-medium mt-8 mb-4 text-anthropic-accent">Step 3 — Try them out</h3>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        Start Gemini CLI (just type <InlineCode>gemini</InlineCode>) and try any of these:
      </p>
      <ClaudeCodeBlock title="example — try these inside Gemini CLI">
{`/explain refactor the payment service to use async/await
/learn implement user sign-up with email verification
/default add a dark-mode toggle to the settings panel`}
      </ClaudeCodeBlock>
      <p className="text-lg leading-relaxed opacity-90 mb-6 font-serif">
        That's it — you now have three voices. Switch anytime mid-conversation. If a command is unrecognised, type <InlineCode>/commands reload</InlineCode> to make Gemini pick up the new files.
      </p>

      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        Set it up in Codex CLI
      </h2>
      <p className="text-lg leading-relaxed opacity-90 mb-6 font-serif">
        Codex CLI takes a slightly different approach: instead of slash commands, it has <strong>profiles</strong>. A profile is a named bundle of settings — think of it like switching between "work email" and "personal email" on your phone. We'll create three profiles, one per voice, and switch between them with a flag.
      </p>

      <h3 className="text-xl font-serif font-medium mt-8 mb-4 text-anthropic-accent">Step 1 — Edit Codex's settings file</h3>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        Codex keeps its settings in <InlineCode>~/.codex/config.toml</InlineCode>. If the file doesn't exist yet, create it. Open it in a text editor and paste this in:
      </p>
      <ClaudeCodeBlock title="config.toml">
{`[profiles.default]
personality = "pragmatic"
approval_mode = "auto"

[profiles.explanatory]
personality = "friendly"
approval_mode = "auto"

[profiles.learning]
personality = "friendly"
approval_mode = "read-only"`}
      </ClaudeCodeBlock>

      <p className="text-lg leading-relaxed opacity-90 mb-6 font-serif">
        What you just did: told Codex "here are three named setups." <InlineCode>personality</InlineCode> controls the tone. <InlineCode>approval_mode</InlineCode> controls whether Codex auto-applies changes (<InlineCode>auto</InlineCode>) or only suggests them (<InlineCode>read-only</InlineCode>). The learning profile uses <InlineCode>read-only</InlineCode> on purpose — you're the one writing code in that mode, not Codex.
      </p>

      <h3 className="text-xl font-serif font-medium mt-8 mb-4 text-anthropic-accent">Step 2 — Add the "how to behave" notes per project</h3>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">Profiles set the tone, but we also want Codex to follow specific instructions in each mode. Codex reads a file called <InlineCode>AGENTS.md</InlineCode> from your project folder and treats it like a standing brief. Create the following short Markdown files in the root of any project where you want these voices available:</p>

      <div className="space-y-8 font-serif">
        <div>
          <h4 className="text-sm font-serif uppercase tracking-widest opacity-60 mb-2 font-bold underline font-serif">AGENTS-explain.md</h4>
          <ClaudeCodeBlock title="AGENTS-explain.md" plain>
{`You are now in Explanatory mode.

User task: $TASK

For this task:
- Think step-by-step and explain your reasoning clearly.
- Describe implementation choices, patterns, trade-offs, and codebase fit.
- Provide educational insights.
- Then implement only after I confirm.`}
          </ClaudeCodeBlock>
        </div>

        <div>
          <h4 className="text-sm font-serif uppercase tracking-widest opacity-60 mb-2 font-bold underline font-serif">AGENTS-learn.md</h4>
          <ClaudeCodeBlock title="AGENTS-learn.md" plain>
{`You are now in Learning/Mentor mode.

User task: $TASK

For this task:
- Break it into small steps.
- Explain the concept, then ask ME to write the code myself.
- Review my code, give feedback, and guide iteratively.
- Only implement if I explicitly ask.`}
          </ClaudeCodeBlock>
        </div>
      </div>

      <h3 className="text-xl font-serif font-medium mt-8 mb-4 text-anthropic-accent">Step 3 — Start Codex in the voice you want</h3>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        Launch Codex with a profile flag, and it'll use that voice for the whole session:
      </p>
      <ClaudeCodeBlock title="pick your voice">
{`# Explanatory mode — ask Codex to explain before doing
codex --profile explanatory

# Learning mode — Codex teaches, you write
codex --profile learning

# Default mode — fast and quiet
codex --profile default`}
      </ClaudeCodeBlock>
      <p className="p-4 bg-anthropic-accent/5 border-l-4 border-anthropic-accent my-6 italic opacity-90 font-serif">
        Inside a Codex session, you can also switch mid-conversation with <InlineCode>/profile explanatory</InlineCode> (no restart required).
      </p>

      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        Want to skip all the typing? Use a one-click script
      </h2>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        If creating each file manually sounds tedious, the scripts below create everything for you in one go. Each one is a small shell script — just three steps:
      </p>
      <ol className="list-decimal pl-6 mb-6 space-y-1 text-lg leading-relaxed opacity-90 font-serif">
        <li>Create a new file called <InlineCode>setup-cli-styles.sh</InlineCode></li>
        <li>Paste the contents of the relevant script below</li>
        <li>Run <InlineCode>bash setup-cli-styles.sh</InlineCode> from your terminal</li>
      </ol>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        Everything else is taken care of. You can safely re-run the script if something goes wrong — it'll overwrite the files with fresh copies.
      </p>

      <h3 className="text-xl font-serif font-medium mt-8 mb-4 text-anthropic-accent text-center font-serif">Gemini CLI Setup Script</h3>
      <ClaudeCodeBlock title="Gemini Setup Script (Bash)">
{`mkdir -p ~/.gemini/commands && cat > ~/.gemini/commands/default.toml << 'EOF'
description = "Default concise and efficient mode"
prompt = """
You are now in Default mode (Claude Code style).
Complete the following coding task efficiently with concise responses:

{{args}}

No unnecessary explanations unless asked.
"""
EOF

cat > ~/.gemini/commands/explain.toml << 'EOF'
description = "Explanatory mode: explains choices and patterns"
prompt = """
You are now in Explanatory mode.

Task: {{args}}

For this task:
- Think step-by-step and explain your reasoning clearly.
- Describe implementation choices, why you picked certain patterns, trade-offs, and how it fits the codebase.
- Provide educational insights.
- Then implement the changes only after I confirm.

Be thorough but not overly verbose.
"""
EOF

cat > ~/.gemini/commands/learn.toml << 'EOF'
description = "Learning/Mentor mode: hands-on interactive practice"
prompt = """
You are now in Learning mode (mentor/tutor style).

Task: {{args}}

For this task:
- Break it into small, clear steps.
- Explain the concept or next piece.
- Pause and explicitly ask ME to write the small code snippet myself.
- Review my code, give constructive feedback, and guide me to the next step.
- Only write/implement code yourself if I explicitly ask.

Act like a patient coding instructor for hands-on learning.
"""
EOF

echo "Gemini CLI styles installed. Run /commands reload to activate."`}
      </ClaudeCodeBlock>

      <h3 className="text-xl font-serif font-medium mt-8 mb-4 text-anthropic-accent text-center font-serif">Codex CLI Setup Script</h3>
      <ClaudeCodeBlock title="Codex Setup Script (Bash)" codexScript>
{`# Create Codex config directory and backup existing config
mkdir -p ~/.codex
[ -f ~/.codex/config.toml ] && cp ~/.codex/config.toml ~/.codex/config.toml.bak

# Write the main config with three profiles
cat > ~/.codex/config.toml << 'EOF'
[profiles.default]
personality = "pragmatic"
approval_mode = "auto"
system_prompt = "You are a concise, efficient coding assistant. Complete tasks with minimal explanation unless asked."

[profiles.explanatory]
personality = "friendly"
approval_mode = "auto"
system_prompt = "You are an explanatory coding assistant. Always think step-by-step, explain your reasoning, describe implementation choices, patterns, and trade-offs before implementing."

[profiles.learning]
personality = "friendly"
approval_mode = "read-only"
system_prompt = "You are a patient coding mentor. Break tasks into small steps, explain concepts, then ask the user to write code themselves. Review their work and provide constructive feedback. Only implement code if explicitly requested."

[defaults]
profile = "default"
EOF

# Create project-level AGENTS.md templates
cat > AGENTS-explain.md << 'EOF'
# Explanatory Mode Guidelines
You are now in Explanatory mode.
User task: $TASK
For this task:
- Think step-by-step and explain your reasoning clearly.
- Describe implementation choices, why you picked certain patterns, trade-offs, and how it fits the codebase.
- Provide educational insights and reference relevant documentation.
- Then implement the changes only after I confirm.
EOF

cat > AGENTS-learn.md << 'EOF'
# Learning Mode Guidelines
You are now in Learning/Mentor mode.
User task: $TASK
For this task:
- Break it into small, manageable steps.
- Explain the concept or principle behind the next piece.
- Pause and explicitly ask ME to write the small code snippet myself.
- Review my code, give constructive feedback, and guide me to the next step.
- Only write or implement code yourself if I explicitly ask.
EOF

cat > AGENTS-default.md << 'EOF'
# Default Mode Guidelines
You are now in Default mode.
User task: $TASK
For this task:
- Complete the coding task efficiently with concise responses.
- Provide only essential explanations unless asked for more detail.
- Focus on delivering working, well-structured code.
- Assume I am an experienced developer who values speed and precision.
EOF

echo "Codex CLI styles installed successfully.
Usage:
  1. Switch styles: codex --profile [default|explanatory|learning]
  2. Add AGENTS-*.md files to your project root for persistent context"`}
      </ClaudeCodeBlock>

      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10 font-serif">
        How to run the script step by step
      </h2>
      <ol className="list-decimal pl-6 mb-6 space-y-2 text-lg leading-relaxed opacity-90 font-serif">
        <li><strong>Create an empty file</strong> called <InlineCode>setup-cli-styles.sh</InlineCode> — in any text editor, on your Desktop, or wherever is convenient.</li>
        <li><strong>Copy the relevant script above</strong> (Gemini or Codex) and paste it into that file. Save.</li>
        <li><strong>Open a terminal</strong> and navigate to the file's folder (for example, <InlineCode>cd ~/Desktop</InlineCode> if you saved it there).</li>
        <li><strong>Run it</strong> by typing: <InlineCode>bash setup-cli-styles.sh</InlineCode></li>
        <li><strong>Check the result</strong>. For Gemini, type <InlineCode>ls ~/.gemini/commands/</InlineCode> — you should see three files. For Codex, type <InlineCode>cat ~/.codex/config.toml</InlineCode> — you should see the three profiles.</li>
        <li><strong>Use it</strong>. Start Gemini with <InlineCode>gemini</InlineCode> and run <InlineCode>/commands reload</InlineCode>; start Codex with <InlineCode>codex --profile explanatory</InlineCode>.</li>
      </ol>

      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10 font-serif">
        Which tool should you use?
      </h2>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse font-serif">
          <thead>
            <tr className="bg-anthropic-text/5">
              <th className="p-3 border border-anthropic-text/10 font-bold text-left">Feature</th>
              <th className="p-3 border border-anthropic-text/10 font-bold text-left">Gemini CLI</th>
              <th className="p-3 border border-anthropic-text/10 font-bold text-left">Codex CLI</th>
              <th className="p-3 border border-anthropic-text/10 font-bold text-left">Claude Code</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border border-anthropic-text/10 font-bold">Built-in toggle</td>
              <td className="p-3 border border-anthropic-text/10">No (but easy to add)</td>
              <td className="p-3 border border-anthropic-text/10">No (profiles)</td>
              <td className="p-3 border border-anthropic-text/10">Yes, native menu</td>
            </tr>
            <tr className="bg-anthropic-text/[0.02]">
              <td className="p-3 border border-anthropic-text/10 font-bold">Command args</td>
              <td className="p-3 border border-anthropic-text/10">Yes, {"{{args}}"}</td>
              <td className="p-3 border border-anthropic-text/10">Requires profile</td>
              <td className="p-3 border border-anthropic-text/10">Yes, built-in</td>
            </tr>
            <tr>
              <td className="p-3 border border-anthropic-text/10 font-bold">Context files</td>
              <td className="p-3 border border-anthropic-text/10">Yes, GEMINI.md</td>
              <td className="p-3 border border-anthropic-text/10">Yes, AGENTS.md</td>
              <td className="p-3 border border-anthropic-text/10">Yes, system prompts</td>
            </tr>
            <tr className="bg-anthropic-text/[0.02]">
              <td className="p-3 border border-anthropic-text/10 font-bold">Ecosystem</td>
              <td className="p-3 border border-anthropic-text/10">Free and open</td>
              <td className="p-3 border border-anthropic-text/10">OpenAI-dependent</td>
              <td className="p-3 border border-anthropic-text/10">Anthropic-only</td>
            </tr>
            <tr>
              <td className="p-3 border border-anthropic-text/10 font-bold">Learning focus</td>
              <td className="p-3 border border-anthropic-text/10">Highly conversational</td>
              <td className="p-3 border border-anthropic-text/10">Great read-only mode</td>
              <td className="p-3 border border-anthropic-text/10">Purpose-built</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="p-6 bg-slate-50 dark:bg-anthropic-text/5 border border-slate-200 dark:border-anthropic-text/10 rounded-xl my-12 font-serif text-center">
        <strong className="text-anthropic-accent block mb-2 font-bold font-serif">Quick picks:</strong>
        <ul className="list-disc pl-6 space-y-2 opacity-90 font-semibold font-serif text-left inline-block">
          <li>Want it to feel closest to Claude Code? <strong>Gemini CLI</strong> — the slash commands behave almost identically.</li>
          <li>Already use ChatGPT or prefer OpenAI? <strong>Codex CLI</strong> — the profile system is simple and robust.</li>
          <li>Genuinely learning, not just getting a task done? Both work; Gemini tends to feel a little more teacher-like in Learning mode.</li>
        </ul>
      </div>

      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10 font-serif">
        If something goes wrong
      </h2>
      <div className="space-y-6 font-serif">
        <div>
          <h3 className="text-lg font-bold mb-2 text-anthropic-accent underline font-serif">Gemini CLI</h3>
          <ul className="list-disc pl-6 space-y-1 opacity-80 font-serif">
            <li><strong>"Command not recognised."</strong> First, run <InlineCode>/commands reload</InlineCode> inside Gemini. If that doesn't work, your version may want commands under <InlineCode>~/.config/gemini/commands/</InlineCode> instead of <InlineCode>~/.gemini/commands/</InlineCode> — check which folder exists on your system.</li>
            <li><strong>Running on Windows?</strong> The setup script uses Unix-style file-creation tricks. Run it inside WSL (Windows Subsystem for Linux) or Git Bash. In plain PowerShell it won't work.</li>
            <li><strong>"Permission denied" when running the script.</strong> Add <InlineCode>bash </InlineCode> at the start: <InlineCode>bash setup-cli-styles.sh</InlineCode>. That avoids needing to mark the file executable.</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2 text-anthropic-accent underline font-serif">Codex CLI</h3>
          <ul className="list-disc pl-6 space-y-1 opacity-80 font-serif">
            <li><strong>Profile seems to be ignored.</strong> Open <InlineCode>~/.codex/config.toml</InlineCode> and double-check there are no missing quote marks or stray characters. Every setting needs quotes around the value.</li>
            <li><strong>AGENTS.md not picked up.</strong> Make sure the file sits in the top folder of your project (the same folder your code lives in), and that it's named exactly <InlineCode>AGENTS.md</InlineCode> with that capitalisation.</li>
            <li><strong>"Read-only" mode doesn't exist.</strong> Older Codex versions call it <InlineCode>ask</InlineCode>. If <InlineCode>"read-only"</InlineCode> throws an error, change it to <InlineCode>"ask"</InlineCode>.</li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10 font-serif">
        That's it — you've got three voices
      </h2>
      <p className="text-lg leading-relaxed opacity-90 mb-6 font-serif">
        Claude Code got this feature first, but after a few minutes of setup, Gemini and Codex match it. The real benefit isn't the feature itself — it's the reminder that these tools are genuinely customisable. You're not locked into whatever mood the vendor decided was the default. If you want your coding helper to pause and teach you, just tell it to. Save that instruction as a command or a profile, and never re-type it.
      </p>
      <p className="text-lg leading-relaxed opacity-90 mb-6 font-serif">
        Start in whichever voice fits today's task, switch when the task changes. The whole point of a voice switcher is that no single voice is right all the time.
      </p>

      <div className="mt-16 pt-8 border-t border-anthropic-text/10 opacity-60 text-sm font-serif">
        <p className="font-bold mb-4 font-serif">Resources:</p>
        <ul className="space-y-2 font-serif">
          <li><a href="https://ai.google.dev/gemini-api/docs" className="hover:text-anthropic-accent underline">Gemini CLI Documentation</a></li>
          <li><a href="https://github.com/openai/codex-cli" className="hover:text-anthropic-accent underline">Codex CLI GitHub Repository</a></li>
          <li><a href="https://www.anthropic.com/claude-code" className="hover:text-anthropic-accent underline">Claude Code Announcement</a></li>
        </ul>
        <p className="mt-8 italic font-serif">Disclaimer: Tool features and configurations are accurate as of April 2026. Always check official documentation for updates.</p>
      </div>
    </>
  );
}
