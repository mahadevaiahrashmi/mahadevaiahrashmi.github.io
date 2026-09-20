// agent-notes: { ctx: "blog post metadata (titles, slugs, tags, excerpts); bodies live in ./posts/*", deps: [], state: active, last: "2026-09-20", key: ["renamed from posts.ts in #31"] }
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
  unlisted?: boolean;
  draft?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "ekadhyapak-sahayak",
    title: "OneTeacher: One Teacher, Many Grades, One AI Companion",
    subtitle: "AI companion for single-teacher multi-grade primary schools — English, Tamil, Telugu, Kannada, Malayalam, Hindi",
    date: "2026-09-20",
    readTime: "7 min read",
    tags: ["Applied AI", "EdTech", "FLN", "Prompt Engineering", "HTML"],
    excerpt:
      "A single HTML file that turns one topic into multi-grade lesson plans, differentiated worksheets, and FLN oral assessments for government primary schools where one teacher handles Grades 1–5. Offline-first, teacher-in-control, multi-grade native — built for classrooms across India including South India.",
  },
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
    subtitle: "A plain-English walkthrough of the OpenEnv setup in the play2 repository",
    date: "2026-04-18",
    readTime: "10 min read",
    tags: ["OpenEnv", "Tutorial", "Setup", "Beginner"],
    excerpt: "The warehouse-robot-vs-AI experiment runs on your laptop in about fifteen minutes.",
    unlisted: true,
  },
  {
    slug: "build-warehouse-routing-openenv",
    title: "Build the Warehouse Robot Environment, From Scratch",
    subtitle: "How the Warehouse Routing OpenEnv was built",
    date: "2026-04-18",
    readTime: "14 min read",
    tags: ["OpenEnv", "Tutorial", "Build", "Beginner", "Python"],
    excerpt: "Five small Python files turn an empty folder into a real OpenEnv environment.",
    unlisted: true,
  },
  {
    slug: "richfeyn-smart-jar",
    title: "RichFeyn: Building the Smartest Kitchen",
    subtitle: "Automating the repetitive to make room for what matters",
    date: "2024-07-20",
    readTime: "8 min read",
    tags: ["IoT", "Computer Vision", "Startup", "Automation"],
    excerpt: "How we built a smart reordering system that tracks inventory and restocks kitchen supplies autonomously.",
  },
  {
    slug: "claude-code-statusline",
    title: "Claude Code's Status Line, Explained",
    subtitle: "A beginner-friendly tour of the little strip at the bottom of your terminal",
    date: "2026-04-18",
    readTime: "8 min read",
    tags: ["Claude Code", "Tutorial", "Developer Experience", "Setup"],
    excerpt: "What the status line shows and how to install it.",
  },
  {
    slug: "claude-style-replication",
    title: "Teach Your AI Coding Helper Three Different Voices",
    subtitle: "Default / Explain / Teach-me modes for Gemini CLI and Codex CLI",
    date: "2026-04-16",
    readTime: "8 min read",
    tags: ["Claude Code", "Gemini CLI", "Codex CLI", "Tutorial"],
    excerpt: "Give Gemini and Codex the same modes that Claude Code has.",
  },
  {
    slug: "vteam-hybrid-cheatsheet",
    title: "The vteam-hybrid Cheatsheet",
    subtitle: "Seven phases, eighteen agents, six commands",
    date: "2026-04-19",
    readTime: "7 min read",
    tags: ["Claude Code", "Methodology", "vteam-hybrid", "Reference"],
    excerpt: "The whole methodology on one page.",
  },
  {
    slug: "resume-tailor",
    title: "Resume Tailor: One Resume, Tuned for Every Role",
    subtitle: "A local-first web app that tailors your resume and cover letter",
    date: "2026-06-02",
    readTime: "6 min read",
    tags: ["Applied AI", "LLM", "FastAPI", "Python", "Document Generation"],
    excerpt: "Paste a job description and your resume, pick an AI engine, get a tailored one-page resume and cover letter.",
    draft: true,
  },
  {
    slug: "explainer-bot",
    title: "Explainer Bot: From Rough Notes to a Narrated Video",
    subtitle: "Rough points in, a finished explainer video out",
    date: "2026-06-02",
    readTime: "6 min read",
    tags: ["Applied AI", "LLM", "FastAPI", "Python", "Multimodal"],
    excerpt: "Hand it rough points, get back a 3Blue1Brown-style explainer video narrated in your own voice.",
    draft: true,
  },
];
