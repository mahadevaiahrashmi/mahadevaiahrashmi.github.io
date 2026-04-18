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
];
