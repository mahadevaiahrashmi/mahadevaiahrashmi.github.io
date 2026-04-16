/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { blogPosts } from "../blog/posts";
import ThemeToggle from "./ThemeToggle";

export default function BlogList() {
  return (
    <div className="min-h-screen selection:bg-anthropic-accent/20">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-anthropic-bg/80 backdrop-blur-sm border-b border-anthropic-text/5 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="font-serif text-xl font-medium tracking-tight hover:opacity-80 transition-opacity">
            Rashmi Mahadevaiah
          </Link>
          <div className="flex items-center gap-4 sm:gap-8 text-[11px] sm:text-sm font-sans uppercase tracking-[0.14em] sm:tracking-widest opacity-60 whitespace-nowrap">
            <Link to="/" className="hover:opacity-100 transition-opacity">Home</Link>
            <Link to="/blog" className="hover:opacity-100 transition-opacity">Blog</Link>
            <a href="/#contact" className="hover:opacity-100 transition-opacity">Contact</a>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-8">
            <Link to="/" className="opacity-60 hover:opacity-100 transition-opacity">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-5xl md:text-6xl font-serif font-light tracking-tight">Blog</h1>
          </div>
          <p className="text-xl font-serif leading-relaxed opacity-70 max-w-2xl">
            Thoughts, experiments, and deep dives on AI/ML engineering, agentic systems, and building production data products.
          </p>
        </motion.div>

        {/* Posts List */}
        <div className="space-y-8">
          {blogPosts.map((post, idx) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="block p-8 border border-anthropic-text/10 rounded-2xl hover:border-anthropic-accent/30 hover:bg-anthropic-text/[0.02] transition-all group"
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-anthropic-text/5 rounded-md text-xs font-sans uppercase tracking-wider opacity-70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-3xl font-serif font-medium mb-2 group-hover:text-anthropic-accent transition-colors">
                  {post.title}
                </h2>
                <p className="text-lg font-serif italic opacity-60 mb-4">{post.subtitle}</p>
                <p className="text-base leading-relaxed opacity-80 mb-4">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-sm font-sans opacity-50">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </main>

      <footer className="max-w-5xl mx-auto px-6 py-12 border-t border-anthropic-text/5 flex flex-col md:flex-row justify-between items-center gap-4 opacity-40 text-xs font-sans uppercase tracking-[0.2em]">
        <span>© 2026 Rashmi Mahadevaiah</span>
        <span>Built with precision and care</span>
      </footer>
    </div>
  );
}
