// agent-notes: { ctx: "blog post metadata (titles, slugs, tags, excerpts); bodies live in ./posts/*", deps: [], state: active, last: "sato@2026-05-08", key: ["renamed from posts.ts in #31 to avoid collision with the ./posts/ directory; unlisted=true hides from /blog index and homepage featured pick but keeps the slug routable at /blog/<slug>"] }
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  tags: string[];
  excerpt: string;
  /** When true, the post does not appear in /blog or as the homepage featured post,
   *  but remains accessible via direct URL at /blog/<slug>. */
  unlisted?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "warehouse-routing-openenv",
    title: "Warehouse Routing OpenEnv",
    subtitle: "Why a 70B Llama Plays a Pick-and-Pack Tour Like a Random Walk",
    date: "2025-04-15",
    readTime: "12 min read",
    tags: ["OpenEnv", "LLM", "RL", "Warehouse Routing"],
    excerpt:
      "An OpenEnv-compatible gridworld for multi-stop AMR routing, an honest baseline, and a diagnosis of why prompting alone isn't enough.",
  },
  {
    slug: "openenv-play2-setup",
    title: "Run the Warehouse Robot Experiment on Your Own Computer",
    subtitle: "A plain-English walkthrough of the OpenEnv setup in the play2 repository — prerequisites, install steps, a browser demo, and what to do if something breaks",
    date: "2026-04-18",
    readTime: "10 min read",
    tags: ["OpenEnv", "Tutorial", "Setup", "Beginner"],
    excerpt:
      "The warehouse-robot-vs-AI experiment runs on your laptop in about fifteen minutes. Here's what OpenEnv is, what the play2 repo does, and every copy-paste command you need — no prior Python, Docker, or bash knowledge required.",
    unlisted: true,
  },
  {
    slug: "build-warehouse-routing-openenv",
    title: "Build the Warehouse Robot Environment, From Scratch",
    subtitle: "How the Warehouse Routing OpenEnv was built — explained so a high schooler can read it, understand it, and build their own copy in an afternoon",
    date: "2026-04-18",
    readTime: "14 min read",
    tags: ["OpenEnv", "Tutorial", "Build", "Beginner", "Python"],
    excerpt:
      "Five small Python files turn an empty folder into a real OpenEnv environment that any AI can train in. Every line is explained — no prior Pydantic, FastAPI, or reinforcement learning knowledge assumed.",
    unlisted: true,
  },
  {
    slug: "richfeyn-smart-jar",
    title: "RichFeyn: Building the Smartest Kitchen",
    subtitle: "Automating the repetitive to make room for what matters",
    date: "2024-07-20",
    readTime: "8 min read",
    tags: ["IoT", "Computer Vision", "Startup", "Automation"],
    excerpt:
      "How we built a smart reordering system that tracks inventory and restocks kitchen supplies autonomously, saving hours of manual shopping every month.",
  },
  {
    slug: "claude-code-statusline",
    title: "Claude Code's Status Line, Explained",
    subtitle: "A beginner-friendly tour of the little strip at the bottom of your terminal, plus a 5-minute install",
    date: "2026-04-18",
    readTime: "8 min read",
    tags: ["Claude Code", "Tutorial", "Developer Experience", "Setup"],
    excerpt:
      "What the status line shows, why each number is worth a glance, and step-by-step instructions to install it on macOS, Linux, or Windows — no bash experience required.",
  },
  {
    slug: "claude-style-replication",
    title: "Teach Your AI Coding Helper Three Different Voices",
    subtitle: "A beginner-friendly guide to giving Gemini CLI and Codex CLI the same Default / Explain / Teach-me modes that Claude Code has",
    date: "2026-04-16",
    readTime: "8 min read",
    tags: ["Claude Code", "Gemini CLI", "Codex CLI", "Tutorial"],
    excerpt:
      "Claude Code lets you switch between concise, explanatory, and teaching modes with one command. Gemini and Codex don't — but with five minutes of copy-paste setup, they can. Plain-English walkthrough, no jargon.",
  },
  {
    slug: "vteam-hybrid-cheatsheet",
    title: "The vteam-hybrid Cheatsheet",
    subtitle: "Seven phases, eighteen agents, six commands you'll actually type — the whole methodology on one page",
    date: "2026-04-19",
    readTime: "7 min read",
    tags: ["Claude Code", "Methodology", "vteam-hybrid", "Reference"],
    excerpt:
      "vteam-hybrid picks a different team shape for every phase of development — discovery, architecture, TDD, review, debugging. Here's the whole methodology on one page: the phases, the agents, the commands, and the three non-negotiable rules.",
  },
  {
    slug: "discomfort-as-compass",
    title: "Discomfort as a Compass",
    subtitle: "What Anthony Jeselnik gets right about creative work — and why it travels well outside comedy",
    date: "2026-05-08",
    readTime: "6 min read",
    tags: ["Essay", "Craft", "Writing", "Creativity"],
    excerpt:
      "Anthony Jeselnik treats the flinch — that small voice saying don't go there — as a compass instead of a stop sign. The principle generalises to any creative work: the thing you're uncomfortable saying is the thing most worth figuring out how to say well.",
  },
  {
    slug: "software-eras",
    title: "Software 1.0, 2.0, 3.0",
    subtitle: "How we tell computers what to do is changing fast — a plain-English tour of the three eras of programming",
    date: "2026-05-08",
    readTime: "7 min read",
    tags: ["AI", "Essay", "Software", "Beginner"],
    excerpt:
      "Three eras of programming, no jargon: writing the recipe yourself, curating examples so a neural network can find the recipe, and now — just describing what you want and letting an LLM figure out how. With diagrams.",
  },
  {
    slug: "shankaracharya-illusion-compassion",
    title: "The Dream That Hurts",
    subtitle: "Adi Shankaracharya on why illusion demands compassion, not withdrawal",
    date: "2026-05-08",
    readTime: "5 min read",
    tags: ["Essay", "Philosophy", "Vedanta", "Reflection"],
    excerpt:
      "A seeker challenges Adi Shankaracharya: if the world is illusion, why help anyone? His answer reframes Advaita as the sharpest form of responsibility — not an excuse to withdraw, but a reason to act without attachment.",
  },
  {
    slug: "process-is-the-prize",
    title: "The Process Is the Prize",
    subtitle: "Carlos Alcaraz protects joy. Alysa Liu protects struggle. Two opposite temperaments, one shared insight about the work.",
    date: "2026-05-08",
    readTime: "7 min read",
    tags: ["Essay", "Sports", "Process", "Reflection"],
    excerpt:
      "Two world-class athletes, opposite emotional dialects. Alcaraz says fun is a weapon. Liu says struggle makes her alive. Read them side by side and they agree on the only thing that matters — neither is competing primarily to win.",
  },
  {
    slug: "ai-is-suppandi",
    title: "Your AI Is Suppandi",
    subtitle: "What a Tinkle comics character teaches us about prompt engineering — and the gap between what you say and what you mean",
    date: "2026-05-08",
    readTime: "6 min read",
    tags: ["AI", "Essay", "Prompt Engineering", "Alignment"],
    excerpt:
      "Suppandi obeys every instruction word-for-word and produces forty years of comedic disaster. Modern AI assistants do exactly the same thing — and the diagnosis isn't that the model is dumb. It's that the master is the unreliable component.",
  },
  {
    slug: "floor-and-ceiling",
    title: "Raising the Floor, Raising the Ceiling",
    subtitle: "Vibe coding lets anyone build. Agentic engineering lets the best build a tier higher than they ever could. Both are happening at once.",
    date: "2026-05-08",
    readTime: "6 min read",
    tags: ["AI", "Essay", "Agentic Engineering", "Vibe Coding"],
    excerpt:
      "The same wave of AI assistants is doing two opposite things at once — lowering the bar to entry so anyone can ship, and raising the bar for excellence so the best can ship a tier higher. Vibe coding raises the floor; agentic engineering raises the ceiling. They're two ends of the same lever.",
  },
  {
    slug: "build-it-break-it-hire-it",
    title: "Build It, Break It, Hire It",
    subtitle: "The LeetCode interview tested a job that no longer exists. The new test is a real project, real agents, and a red team that gets paid to break what you shipped.",
    date: "2026-05-08",
    readTime: "7 min read",
    tags: ["AI", "Essay", "Hiring", "Agentic Engineering"],
    excerpt:
      "Whiteboard puzzles measured typing under pressure on small instances — useful when typing was the bottleneck, obsolete now that the job is directing agents. Replace it with a real five-day brief, a real deployment, and a fleet of attacker agents told to break it. Hire whoever is still standing.",
  },
  {
    slug: "substrate-is-pre-training",
    title: "The Substrate Is Pre-training",
    subtitle: "Why today's AIs are statistical simulation circuits — not minds — and how that shapes what they're good at",
    date: "2026-05-08",
    readTime: "7 min read",
    tags: ["AI", "Essay", "LLM", "ML"],
    excerpt:
      "Plain-English unpacking of Karpathy's framing: pre-training is the substrate, RL is the polish bolted on top, capability peaks where verification is easy, and the jagged frontier you keep tripping over is exactly what the architecture predicts. Treat them as ghosts, not animals.",
  },
  {
    slug: "remaining-human-bottleneck",
    title: "The Remaining Human Bottleneck",
    subtitle: "What to build. Why it's worth building. How to direct the agents that build it. The three things you still can't outsource — and the one you must keep.",
    date: "2026-05-08",
    readTime: "6 min read",
    tags: ["AI", "Essay", "Agentic Engineering", "Craft"],
    excerpt:
      "Agents got fast. The keyboard is no longer the rate-limiting step. The bottleneck moved upstream — what to build, why, how to direct — and one thing underneath all of it that doesn't move: understanding. You can outsource thinking. You cannot outsource understanding.",
  },
  {
    slug: "agent-first-infrastructure",
    title: "Agent-First Infrastructure",
    subtitle: "How to design systems for a world where agents — yours, your customer's, and strangers' — are the primary users",
    date: "2026-05-08",
    readTime: "7 min read",
    tags: ["AI", "Essay", "Infrastructure", "Agentic Engineering"],
    excerpt:
      "Decompose every workload into sensors and actuators over the world. Make the data structures legible to a parser, not just an eye. Plan for my-agent-talks-to-your-agent across orgs. The teams that redesign for this now will be a tier ahead by the time the rest of the industry notices.",
  },
];
