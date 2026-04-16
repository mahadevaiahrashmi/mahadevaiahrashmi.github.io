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
    slug: "claude-style-replication",
    title: "Replicating Claude Code's Communication Styles",
    subtitle: "A Complete Guide for Gemini CLI & Codex CLI",
    date: "2026-04-16",
    readTime: "8 min read",
    tags: ["Claude Code", "Gemini CLI", "Codex CLI", "Guide"],
    excerpt:
      "Learn how to mimic Claude Code's elegant communication styles in Gemini and Codex CLI using custom slash commands, profiles, and configuration scripts.",
  },
];
