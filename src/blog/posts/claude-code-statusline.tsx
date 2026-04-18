// agent-notes: { ctx: "Claude Code statusline blog post content", deps: ["../../components/blog-helpers"], state: active, last: "sato@2026-04-18", key: ["extracted from BlogPost.tsx for #29 split"] }
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { InlineCode, ClaudeCodeBlock } from "../../components/blog-helpers";

export default function StatuslinePost() {
  return (
    <>
      <h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight mb-6 leading-tight">
        Claude Code's Status Line, Explained — And How to Set It Up in 5 Minutes
      </h1>

      <p className="text-lg font-serif italic opacity-60 mb-12">
        Published: April 2026 | Reading Time: ~8 minutes
      </p>

      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        What is the status line?
      </h2>
      <p className="text-lg leading-relaxed opacity-90 mb-6 font-serif">
        If you use <strong>Claude Code</strong> — Anthropic's terminal-based coding assistant — there's a little strip of text that sits at the bottom of your terminal, just above where you type. That strip is called the <em>status line</em>. Out of the box it's pretty quiet. With a small one-time setup, it becomes the most useful piece of real estate in your terminal: it tells you which Claude model is answering you, how much of the conversation's memory you've used, and how close you are to Anthropic's usage limits.
      </p>
      <p className="text-lg leading-relaxed opacity-90 mb-6 font-serif">
        Think of it like the fuel gauge and trip meter on a car dashboard. You don't stare at it, but when something feels off — or when a bill arrives at the end of the month — you're very glad it was there. This post explains, in plain English, what each piece of the status line means, why you'd want one, and exactly how to install it on your computer. <strong>No bash experience required.</strong>
      </p>

      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        What you'll see when it's running
      </h2>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        Here's what one live line looks like:
      </p>
      <ClaudeCodeBlock title="example status line">
{`Opus 4.7 | portfolio@main (+42 -7) | 48k/200k (24%) | effort: med | 5h 31% @18:30 IST | 7d 62% @Apr 24, 09:00 IST`}
      </ClaudeCodeBlock>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        Read left-to-right, each piece is answering a question you'd otherwise have to stop and check:
      </p>
      <ul className="list-disc pl-6 mb-6 space-y-2 text-lg leading-relaxed opacity-90 font-serif">
        <li><strong>Opus 4.7</strong> — "Which Claude model am I talking to?" Opus is the most capable and the most expensive; Sonnet is the everyday workhorse; Haiku is the fastest and cheapest. A glance here prevents you from racking up Opus bills on a task Sonnet could've handled.</li>
        <li><strong>portfolio@main (+42 -7)</strong> — "Which folder am I in, and which branch of my code?" The numbers in brackets are the lines you've added and deleted since your last save. If you expected a tiny change and the number looks huge, that's your cue to stop and look.</li>
        <li><strong>48k/200k (24%)</strong> — "How full is the conversation's short-term memory?" Claude can only remember so many words at once. When this bar climbs past 80% or so, responses start getting slower and older details can fall out. The percentage goes green → yellow → orange → red as it fills up.</li>
        <li><strong>effort: med</strong> — "How hard is Claude thinking?" A setting you control. <em>Low</em> is snappy, <em>medium</em> is the default, <em>max</em> is the deep-thinking mode (and the most expensive). If you see <em>max</em> in red when you weren't expecting it, you know to switch back.</li>
        <li><strong>5h 31% @18:30 IST</strong> — "How close am I to Anthropic's five-hour usage limit, and when does it reset?" Anthropic's plans have rolling five-hour and seven-day quotas. This tells you "you've used 31%; the window resets at 6:30 PM your time."</li>
        <li><strong>7d 62% @Apr 24, 09:00 IST</strong> — same thing, but for the weekly quota. If this is high and it's only Tuesday, you probably want to slow down or switch to a cheaper model.</li>
      </ul>
      <p className="text-lg leading-relaxed opacity-90 mb-6 font-serif">
        That's it. One line, six numbers, no jargon — but collectively they answer the "is everything okay?" question in a way no popup or settings panel can.
      </p>

      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        Why bother?
      </h2>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        Three concrete wins, each of which pays for the setup time many times over:
      </p>
      <ul className="list-disc pl-6 mb-6 space-y-2 text-lg leading-relaxed opacity-90 font-serif">
        <li><strong>You catch the expensive-model mistake.</strong> It's easy to leave a session running on Opus after a heavy task and forget to switch back. The model name on the status line is a passive reminder every time you glance down.</li>
        <li><strong>You don't commit to the wrong branch.</strong> Working on three features in parallel? The branch name and diff counts are right there. An unfamiliar branch name is a hard stop.</li>
        <li><strong>You see limits before you hit them.</strong> Running out of your weekly quota an hour before a deadline is a particular kind of awful. A yellow 7-day number on a Tuesday is an early warning.</li>
      </ul>

      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        Set it up in 5 minutes
      </h2>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        The status line is a small script called <InlineCode>statusline.sh</InlineCode>, written by <a href="https://github.com/daniel3303/ClaudeCodeStatusLine" target="_blank" rel="noopener noreferrer" className="text-anthropic-accent hover:underline">Daniel Oh</a> and freely available on GitHub. You'll do four things: install one helper tool, download the script, tell Claude Code to use it, and restart.
      </p>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        Open a terminal. Copy-paste each block; don't worry about understanding every character.
      </p>

      <h3 className="text-xl font-serif font-medium mt-8 mb-4 text-anthropic-accent">
        Step 1 — Install <InlineCode>jq</InlineCode> (a tiny helper)
      </h3>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        The script uses a small utility called <InlineCode>jq</InlineCode> to read JSON. Most computers don't have it preinstalled. Run the line that matches your operating system:
      </p>
      <ClaudeCodeBlock title="install jq">
{`# macOS (requires Homebrew — brew.sh)
brew install jq

# Ubuntu, Debian, or WSL on Windows
sudo apt install -y jq

# Fedora
sudo dnf install -y jq`}
      </ClaudeCodeBlock>

      <h3 className="text-xl font-serif font-medium mt-8 mb-4 text-anthropic-accent">
        Step 2 — Download the script
      </h3>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        Save the script into Claude Code's config folder (<InlineCode>~/.claude/</InlineCode>) and mark it executable:
      </p>
      <ClaudeCodeBlock title="download statusline.sh">
{`mkdir -p ~/.claude
curl -L -o ~/.claude/statusline.sh \\
  https://raw.githubusercontent.com/daniel3303/ClaudeCodeStatusLine/main/statusline.sh
chmod +x ~/.claude/statusline.sh`}
      </ClaudeCodeBlock>

      <h3 className="text-xl font-serif font-medium mt-8 mb-4 text-anthropic-accent">
        Step 3 — Tell Claude Code to use it
      </h3>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        Open the file <InlineCode>~/.claude/settings.json</InlineCode> in any text editor. If the file doesn't exist yet, create a new one. Add the following block:
      </p>
      <ClaudeCodeBlock title="~/.claude/settings.json">
{`{
  "statusLine": {
    "type": "command",
    "command": "~/.claude/statusline.sh"
  }
}`}
      </ClaudeCodeBlock>
      <p className="text-lg leading-relaxed opacity-90 mb-6 font-serif">
        If your <InlineCode>settings.json</InlineCode> already has other settings inside the outer braces, just add the <InlineCode>statusLine</InlineCode> block as another entry (don't forget the comma between entries).
      </p>

      <h3 className="text-xl font-serif font-medium mt-8 mb-4 text-anthropic-accent">
        Step 4 — Restart Claude Code
      </h3>
      <p className="text-lg leading-relaxed opacity-90 mb-6 font-serif">
        Close your Claude Code session with <InlineCode>Ctrl+C</InlineCode> (or by typing <InlineCode>/exit</InlineCode>) and start it again. You should now see the full status line at the bottom of your terminal. If you do, you're done — skip to the timezone section if you want the time in something other than UTC.
      </p>

      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        Show reset times in your own timezone
      </h2>
      <p className="text-lg leading-relaxed opacity-90 mb-6 font-serif">
        By default the script shows reset times in UTC, which means mental arithmetic every time you want to know when your quota comes back. Luckily, fixing that is one line of editing.
      </p>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        Open <InlineCode>~/.claude/statusline.sh</InlineCode> in a text editor and search for <InlineCode>TZ=</InlineCode>. You'll find several lines that look like this:
      </p>
      <ClaudeCodeBlock title="before">
{`formatted=$(TZ=UTC date -d "@$epoch" +"%H:%M" ...)`}
      </ClaudeCodeBlock>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        Replace <InlineCode>UTC</InlineCode> with your own <em>IANA timezone name</em>. Some common ones:
      </p>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse font-serif">
          <thead>
            <tr className="bg-anthropic-text/5">
              <th className="p-3 border border-anthropic-text/10 font-bold text-left">Where you are</th>
              <th className="p-3 border border-anthropic-text/10 font-bold text-left">Replace UTC with</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="p-3 border border-anthropic-text/10">India</td><td className="p-3 border border-anthropic-text/10"><InlineCode>Asia/Kolkata</InlineCode></td></tr>
            <tr><td className="p-3 border border-anthropic-text/10">US East (New York)</td><td className="p-3 border border-anthropic-text/10"><InlineCode>America/New_York</InlineCode></td></tr>
            <tr><td className="p-3 border border-anthropic-text/10">US West (San Francisco)</td><td className="p-3 border border-anthropic-text/10"><InlineCode>America/Los_Angeles</InlineCode></td></tr>
            <tr><td className="p-3 border border-anthropic-text/10">UK</td><td className="p-3 border border-anthropic-text/10"><InlineCode>Europe/London</InlineCode></td></tr>
            <tr><td className="p-3 border border-anthropic-text/10">Central Europe</td><td className="p-3 border border-anthropic-text/10"><InlineCode>Europe/Berlin</InlineCode></td></tr>
            <tr><td className="p-3 border border-anthropic-text/10">Japan</td><td className="p-3 border border-anthropic-text/10"><InlineCode>Asia/Tokyo</InlineCode></td></tr>
            <tr><td className="p-3 border border-anthropic-text/10">Sydney</td><td className="p-3 border border-anthropic-text/10"><InlineCode>Australia/Sydney</InlineCode></td></tr>
          </tbody>
        </table>
      </div>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        So for someone in Bengaluru, the line becomes:
      </p>
      <ClaudeCodeBlock title="after">
{`formatted=$(TZ=Asia/Kolkata date -d "@$epoch" +"%H:%M" ...)`}
      </ClaudeCodeBlock>
      <p className="text-lg leading-relaxed opacity-90 mb-6 font-serif">
        Replace <strong>every</strong> <InlineCode>TZ=UTC</InlineCode> in the file the same way (your editor's "Find & Replace" button makes this painless). Save the file, restart Claude Code, and reset times now read in your local clock. That's also the only change that ships in <a href="https://github.com/mahadevaiahrashmi/mahadevaiahrashmi.github.io/blob/main/.claude/statusline.sh" target="_blank" rel="noopener noreferrer" className="text-anthropic-accent hover:underline">the Kolkata-pinned version</a> on this site — a single find-and-replace, nothing more.
      </p>
      <p className="text-lg leading-relaxed opacity-90 mb-6 font-serif">
        <em>Behind the scenes:</em> Anthropic sends reset times as UTC timestamps (for example, <InlineCode>2026-04-18T13:00:00Z</InlineCode>). The <InlineCode>TZ=...</InlineCode> prefix tells the computer "convert this UTC time into <em>this</em> timezone before printing." So <InlineCode>13:00 UTC</InlineCode> prints as <InlineCode>18:30</InlineCode> in Kolkata, <InlineCode>09:00</InlineCode> in New York, or <InlineCode>14:00</InlineCode> in London — same instant, local clock. No math on your end.
      </p>

      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        If something looks wrong
      </h2>
      <ul className="list-disc pl-6 mb-6 space-y-3 text-lg leading-relaxed opacity-90 font-serif">
        <li><strong>The status line is blank.</strong> Make sure the script is marked executable (<InlineCode>chmod +x ~/.claude/statusline.sh</InlineCode>) and that the path in <InlineCode>settings.json</InlineCode> matches where you saved it.</li>
        <li><strong>It says <InlineCode>jq: command not found</InlineCode>.</strong> <InlineCode>jq</InlineCode> didn't install. Re-run Step 1 for your operating system.</li>
        <li><strong>The 5h / 7d numbers show a dash (<InlineCode>-</InlineCode>).</strong> Claude Code hasn't yet sent the usage data this session; it usually fills in after the first message. If it stays blank, you may be on an older Claude Code version — run <InlineCode>claude-code --version</InlineCode> and update.</li>
        <li><strong>The times look wrong by several hours.</strong> Double-check the timezone name — IANA zone names are case-sensitive and use underscores (e.g. <InlineCode>America/New_York</InlineCode>, not <InlineCode>America/new_york</InlineCode> or <InlineCode>New York</InlineCode>).</li>
        <li><strong>Colours don't show on Windows.</strong> Plain PowerShell doesn't render ANSI colours by default. Use Windows Terminal or WSL instead.</li>
      </ul>

      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        That's it
      </h2>
      <p className="text-lg leading-relaxed opacity-90 mb-6 font-serif">
        Five minutes of setup gives you a dashboard that runs silently at the bottom of every Claude Code session. You'll stop wondering which model you're on, stop accidentally committing on the wrong branch, and never again be surprised by a quota that ran out an hour before your deadline. The script is tiny, auditable, and works on macOS, Linux, and Windows (via WSL).
      </p>
      <p className="text-lg leading-relaxed opacity-90 mb-6 font-serif">
        If you tweak it — a different colour scheme, an extra field, a shorter format — the script is plain text and easy to experiment with. Change something, save, restart Claude Code, and watch the line update. That's the whole feedback loop.
      </p>

      <div className="mt-16 pt-8 border-t border-anthropic-text/10 opacity-60 text-sm font-serif">
        <p className="font-bold mb-4 font-serif">Resources:</p>
        <ul className="space-y-2 font-serif">
          <li><a href="https://github.com/daniel3303/ClaudeCodeStatusLine" className="hover:text-anthropic-accent underline">Daniel Oh — ClaudeCodeStatusLine (upstream)</a></li>
          <li><a href="https://docs.claude.com/en/docs/claude-code/statusline" className="hover:text-anthropic-accent underline">Claude Code — Statusline Documentation</a></li>
          <li><a href="https://docs.claude.com/en/docs/claude-code/settings" className="hover:text-anthropic-accent underline">Claude Code — Settings & <InlineCode>~/.claude/settings.json</InlineCode></a></li>
        </ul>
        <p className="mt-8 italic font-serif">Disclaimer: statusline.sh behaviour and the Claude Code JSON schema are accurate as of April 2026. The upstream project evolves quickly — check the repo for the current version.</p>
      </div>
    </>
  );
}
