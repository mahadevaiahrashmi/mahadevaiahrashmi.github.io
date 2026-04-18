// agent-notes: { ctx: "blog post router; registry lives in ../blog/post-registry, post bodies in ../blog/posts/*", deps: ["motion/react", "lucide-react", "react-router-dom", "../blog/posts", "../blog/post-registry", "./ThemeToggle"], state: active, last: "sato@2026-04-18", key: ["#29 split: bodies extracted to per-slug files; registry moved out to satisfy react-refresh lint"] }
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { blogPosts } from "../blog/posts";
import { postContentBySlug } from "../blog/post-registry";
import ThemeToggle from "./ThemeToggle";

function setMetaByName(name: string, content: string) {
  let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function setMetaByProperty(property: string, content: string) {
  let tag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function setCanonical(url: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", url);
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);
  const Content = post ? postContentBySlug[post.slug] : null;

  useEffect(() => {
    const defaultTitle = "Rashmi Mahadevaiah | AI/ML Engineer & Product Leader";
    const defaultDescription =
      "Rashmi Mahadevaiah — AI/ML Engineer & Product Leader with 13+ years in LLMs, NLP, RAG, agentic AI, data science, and product management. IIT Madras alumni.";
    const previousTitle = document.title;
    const previousCanonical = (document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null)?.href;
    const previousLd = document.getElementById("article-ld-json");

    if (!post || !Content) {
      document.title = "Post not found | Rashmi Mahadevaiah";
      setMetaByName("description", defaultDescription);
      setCanonical(`${window.location.origin}/blog`);
      return () => {
        document.title = previousTitle;
        if (previousCanonical) setCanonical(previousCanonical);
      };
    }

    const url = `${window.location.origin}/blog/${post.slug}`;
    const title = `${post.title}: ${post.subtitle} | Rashmi Mahadevaiah`;
    const description = post.excerpt;

    document.title = title;
    setMetaByName("description", description);
    setCanonical(url);
    setMetaByProperty("og:type", "article");
    setMetaByProperty("og:title", title);
    setMetaByProperty("og:description", description);
    setMetaByProperty("og:url", url);
    setMetaByName("twitter:card", "summary_large_image");
    setMetaByName("twitter:title", title);
    setMetaByName("twitter:description", description);

    if (previousLd) {
      previousLd.remove();
    }
    const articleLd = document.createElement("script");
    articleLd.id = "article-ld-json";
    articleLd.type = "application/ld+json";
    articleLd.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: `${post.title}: ${post.subtitle}`,
      description,
      datePublished: post.date,
      dateModified: post.date,
      author: {
        "@type": "Person",
        name: "Rashmi Mahadevaiah",
      },
      mainEntityOfPage: url,
      url,
      keywords: post.tags.join(", "),
    });
    document.head.appendChild(articleLd);

    return () => {
      document.title = previousTitle || defaultTitle;
      setMetaByName("description", defaultDescription);
      if (previousCanonical) {
        setCanonical(previousCanonical);
      } else {
        setCanonical(window.location.origin);
      }
      const currentLd = document.getElementById("article-ld-json");
      if (currentLd) {
        currentLd.remove();
      }
    };
  }, [post, Content]);

  if (!post || !Content) {
    return (
      <div className="min-h-screen selection:bg-anthropic-accent/20">
        <nav className="fixed top-0 w-full z-50 bg-anthropic-bg/80 backdrop-blur-sm border-b border-anthropic-text/5">
          <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link to="/" className="font-serif text-xl font-medium tracking-tight hover:opacity-80 transition-opacity">
              Rashmi Mahadevaiah
            </Link>
            <div className="flex gap-4 sm:gap-8 text-[11px] sm:text-sm font-sans uppercase tracking-[0.14em] sm:tracking-widest opacity-60 whitespace-nowrap">
              <Link to="/" className="hover:opacity-100 transition-opacity">Home</Link>
              <Link to="/blog" className="hover:opacity-100 transition-opacity">Blog</Link>
              <a href="/#contact" className="hover:opacity-100 transition-opacity">Contact</a>
            </div>
          </div>
        </nav>
        <main className="max-w-5xl mx-auto px-6 pt-32 pb-24 text-center">
          <h1 className="text-4xl font-serif font-light mb-6">Post not found</h1>
          <Link to="/blog" className="text-anthropic-accent hover:underline">← Back to blog</Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen selection:bg-anthropic-accent/20 font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-anthropic-bg/80 backdrop-blur-sm border-b border-anthropic-text/5 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="font-serif text-xl font-medium tracking-tight hover:opacity-80 transition-opacity">
            Rashmi Mahadevaiah
          </Link>
          <div className="flex gap-4 sm:gap-8 text-[11px] sm:text-sm font-sans uppercase tracking-[0.14em] sm:tracking-widest opacity-60 whitespace-nowrap">
            <Link to="/" className="hover:opacity-100 transition-opacity">Home</Link>
            <Link to="/blog" className="hover:opacity-100 transition-opacity">Blog</Link>
            <a href="/#contact" className="hover:opacity-100 transition-opacity">Contact</a>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-24">
        {/* Back link & meta */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-sans uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity mb-6">
            <ArrowLeft size={14} /> Back to blog
          </Link>

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

          <div className="flex items-center gap-4 text-sm font-sans opacity-50 mb-6">
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
        </motion.div>

        {/* Post content */}
        <Content />
      </main>

      <footer className="max-w-5xl mx-auto px-6 py-12 border-t border-anthropic-text/5 flex flex-col md:flex-row justify-between items-center gap-4 opacity-40 text-xs font-sans uppercase tracking-[0.2em]">
        <span>© 2026 Rashmi Mahadevaiah</span>
        <span>Built with precision and care</span>
      </footer>
    </div>
  );
}
