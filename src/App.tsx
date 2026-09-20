/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import {
  Mail,
  Linkedin,
  Github,
  ExternalLink,
  MapPin,
  BookOpen,
  Cpu,
  Heart,
  Instagram,
  Twitter,
  FileText,
  Brain,
  Rocket,
  Target
} from "lucide-react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { blogPosts } from "./blog/post-metadata";
import BlogList from "./components/BlogList";
import BlogPost from "./components/BlogPost";
import ThemeToggle from "./components/ThemeToggle";

const ExperienceItem = ({ title, company, companyUrl, period, impact, description, links }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="border-l border-anthropic-text/10 pl-8 pb-12 relative last:pb-0"
  >
    <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-anthropic-text/20" />
    <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
      <h3 className="text-2xl font-serif font-medium">{title}</h3>
      <span className="text-sm font-sans uppercase tracking-widest opacity-60">{period}</span>
    </div>
    <div className="text-lg font-serif italic mb-4 opacity-80">
      {companyUrl ? (
        <a href={companyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-anthropic-accent transition-colors">{company}</a>
      ) : company}
    </div>
    {impact && (
      <div className="mb-4 text-anthropic-accent font-sans text-sm uppercase tracking-widest">
        {impact}
      </div>
    )}
    <div className="space-y-3">
      {description.map((item: string, idx: number) => (
        <p key={idx} className="text-lg leading-relaxed opacity-90">
          {item}
        </p>
      ))}
    </div>
    {links && (
      <div className="mt-4 flex gap-4">
        {links.map((link: any, idx: number) => (
          <a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-sans hover:text-anthropic-accent transition-colors"
          >
            {link.label} <ExternalLink size={14} />
          </a>
        ))}
      </div>
    )}
  </motion.div>
);

function HomePage() {
  const featuredPost = blogPosts.find((p) => !p.unlisted && !p.draft) ?? blogPosts[0];

  return (
    <div className="min-h-screen selection:bg-anthropic-accent/20">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-anthropic-bg/80 backdrop-blur-sm border-b border-anthropic-text/5 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-serif text-xl font-medium tracking-tight">Rashmi Mahadevaiah</span>
          <div className="flex items-center gap-4 sm:gap-8 text-[11px] sm:text-sm font-sans uppercase tracking-[0.14em] sm:tracking-widest opacity-60 whitespace-nowrap">
            <a href="#about" className="hover:opacity-100 transition-opacity">About</a>
            <a href="#projects" className="hover:opacity-100 transition-opacity">Projects</a>
            <a href="#experience" className="hover:opacity-100 transition-opacity">Experience</a>
            <Link to="/blog" className="hover:opacity-100 transition-opacity">Blog</Link>
            <a href="#contact" className="hover:opacity-100 transition-opacity">Contact</a>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-24">
        {/* Hero Section */}
        <section id="about" className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row items-start gap-12 md:gap-16"
          >
            {/* Photo */}
            <div className="flex-shrink-0">
              <img
                src="/photo.jpg"
                alt="Rashmi Mahadevaiah"
                className="w-48 h-48 md:w-56 md:h-56 rounded-2xl object-cover shadow-lg"
              />
            </div>

            {/* Hero Content */}
            <div className="flex-1">
              <h1 className="text-5xl md:text-7xl font-serif font-light tracking-tight mb-4 leading-[1.15]">
                AI/ML Engineer <br />
                <span className="italic">& Product Leader.</span>
              </h1>
              <p className="text-xl font-serif leading-relaxed opacity-60 mb-8 max-w-xl">
                8 years. Production AI systems shipped — from statistical models at KLA to multi-agent orchestration at KOGO.ai.
              </p>

              {/* CTA Hierarchy */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 bg-anthropic-accent text-white rounded-full font-sans text-sm uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center gap-2 shadow-sm"
                >
                  <FileText size={16} /> View Resume
                </a>
                <a
                  href="mailto:mahadevaiah.rashmi@gmail.com"
                  className="px-6 py-3.5 border border-anthropic-text/20 rounded-full font-sans text-sm uppercase tracking-widest hover:bg-anthropic-text/5 transition-colors flex items-center gap-2"
                >
                  <Mail size={16} /> Get in touch
                </a>
                <a
                  href="https://www.linkedin.com/in/rashmimahadevaiah/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-sans opacity-50 hover:opacity-100 transition-opacity"
                >
                  <Linkedin size={16} /> LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* About Me Section */}
        <section id="about-me" className="mb-32">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-4xl font-serif italic">About Me</h2>
            <div className="h-[1px] flex-1 bg-anthropic-text/10" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl space-y-6 text-lg font-serif leading-relaxed opacity-80 mb-16"
          >
            <p>
              IIT Madras alumnus with 8+ years in AI/ML. Expertise in building LLMs and multi-agent systems that reason, plan, and act autonomously.
            </p>
            <p>
              Background: computer vision for semiconductor defect detection, statistical modeling at Axis Bank & TCS, founded RichFeyn (shipped CV/IoT/mobile AI products), and led multi-agent orchestration at KOGO.ai processing thousands of sales leads.
            </p>
            <p>
              Proven in delivering scalable production AI.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 border border-anthropic-text/10 rounded-2xl bg-anthropic-text/5"
            >
              <Brain className="mb-4 text-anthropic-accent" size={28} />
              <h3 className="text-xl font-serif font-medium mb-3">End-to-End ML Delivery</h3>
              <p className="opacity-80 leading-relaxed">
                From research and statistical models to deploying multi-agent LLM systems in production. I build robust architectures that scale.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-6 border border-anthropic-text/10 rounded-2xl bg-anthropic-text/5"
            >
              <Target className="mb-4 text-anthropic-accent" size={28} />
              <h3 className="text-xl font-serif font-medium mb-3">Product & Business Acumen</h3>
              <p className="opacity-80 leading-relaxed">
                Founded an AI startup with deep empathy for user needs. I bridge the gap between technical metrics and real business impact.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-6 border border-anthropic-text/10 rounded-2xl bg-anthropic-text/5"
            >
              <Rocket className="mb-4 text-anthropic-accent" size={28} />
              <h3 className="text-xl font-serif font-medium mb-3">Cross-Domain Adaptability</h3>
              <p className="opacity-80 leading-relaxed">
                Experience spanning computer vision, predictive analytics in banking, and agentic AI in SaaS. I adapt to solve the right problems.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-4xl font-serif italic">Projects</h2>
            <div className="h-[1px] flex-1 bg-anthropic-text/10" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group block border border-anthropic-text/10 rounded-2xl p-8 hover:border-anthropic-accent/40 transition-colors"
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-serif font-medium group-hover:text-anthropic-accent transition-colors">Warehouse Routing Agent</h3>
                <div className="flex gap-4">
                  <a href="https://rashmi-mahadevaiah-drone.hf.space/ui" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity flex items-center gap-1.5 text-xs font-sans uppercase tracking-widest" title="Live Demo">
                    Live <ExternalLink size={14} />
                  </a>
                  <a href="https://github.com/mahadevaiahrashmi/play2" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity" title="Source Repo">
                    <Github size={18} />
                  </a>
                </div>
              </div>
              <p className="text-lg leading-relaxed opacity-80 mb-6">
                An open-source RL environment simulating warehouse logistics, built to test multi-agent LLM planning and routing efficiency in constrained spaces.
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {["Python", "LLMs", "RAG", "Agentic AI"].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-anthropic-text/5 rounded-md text-xs font-sans uppercase tracking-wider opacity-70">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group block border border-anthropic-text/10 rounded-2xl p-8 hover:border-anthropic-accent/40 transition-colors"
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-serif font-medium group-hover:text-anthropic-accent transition-colors">RichFeyn Smart Jar</h3>
                <Link to="/blog/richfeyn-smart-jar" className="opacity-60 hover:opacity-100 transition-opacity" title="Case Study">
                  <ExternalLink size={18} />
                </Link>
              </div>
              <p className="text-lg leading-relaxed opacity-80 mb-6">
                IoT-enabled smart jar with an automated reordering system. Utilized CV for inventory tracking and NLP to process natural language restocking prompts.
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {["Computer Vision", "IoT", "NLP", "React Native"].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-anthropic-text/5 rounded-md text-xs font-sans uppercase tracking-wider opacity-70">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group block border border-anthropic-text/10 rounded-2xl p-8 hover:border-anthropic-accent/40 transition-colors"
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-serif font-medium group-hover:text-anthropic-accent transition-colors">Resume Tailor</h3>
                <div className="flex gap-4">
                  <a href="https://github.com/mahadevaiahrashmi/resume-tailor" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity" title="Source Repo">
                    <Github size={18} />
                  </a>
                  <Link to="/blog/resume-tailor" className="opacity-60 hover:opacity-100 transition-opacity flex items-center gap-1.5 text-xs font-sans uppercase tracking-widest" title="Case Study">
                    Case Study <ExternalLink size={14} />
                  </Link>
                </div>
              </div>
              <p className="text-lg leading-relaxed opacity-80 mb-6">
                A local-first web app that tailors your resume and cover letter to a job description — outputs one-page PDF and Word, runs against five swappable AI engines (local Ollama to hosted Claude), and is built to re-emphasize real experience, never invent it.
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {["Python", "FastAPI", "LLMs", "Ollama"].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-anthropic-text/5 rounded-md text-xs font-sans uppercase tracking-wider opacity-70">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group block border border-anthropic-text/10 rounded-2xl p-8 hover:border-anthropic-accent/40 transition-colors"
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-serif font-medium group-hover:text-anthropic-accent transition-colors">Explainer Bot</h3>
                <div className="flex gap-4">
                  <a href="https://github.com/mahadevaiahrashmi/explainer-bot" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity" title="Source Repo">
                    <Github size={18} />
                  </a>
                  <Link to="/blog/explainer-bot" className="opacity-60 hover:opacity-100 transition-opacity flex items-center gap-1.5 text-xs font-sans uppercase tracking-widest" title="Case Study">
                    Case Study <ExternalLink size={14} />
                  </Link>
                </div>
              </div>
              <p className="text-lg leading-relaxed opacity-80 mb-6">
                Turns rough points into a 3Blue1Brown-style explainer video — an LLM writes and self-critiques the script and designs editable HTML slides, then assembles a cue video you narrate in your own voice. Web and terminal UIs, three swappable model backends.
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {["Python", "FastAPI", "LLMs", "Multimodal"].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-anthropic-text/5 rounded-md text-xs font-sans uppercase tracking-wider opacity-70">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="group block border border-anthropic-text/10 rounded-2xl p-8 hover:border-anthropic-accent/40 transition-colors"
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-serif font-medium group-hover:text-anthropic-accent transition-colors">EkAdhyapak Sahayak</h3>
                <div className="flex gap-4">
                  <a href="https://github.com/mahadevaiahrashmi/EkAdhyapak-Sahayak" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity flex items-center gap-1.5 text-xs font-sans uppercase tracking-widest" title="Live Demo / Source">
                    Live <ExternalLink size={14} />
                  </a>
                  <a href="https://github.com/mahadevaiahrashmi/EkAdhyapak-Sahayak" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity" title="Source Repo">
                    <Github size={18} />
                  </a>
                </div>
              </div>
              <p className="text-lg leading-relaxed opacity-80 mb-6">
                Offline-first AI teaching assistant for single-teacher multi-grade government primary schools. Generates differentiated lesson plans, worksheets, FLN oral assessments and daily timetables — designed for low-resource Indian classrooms.
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {["HTML", "Prompt Engineering", "EdTech", "FLN"].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-anthropic-text/5 rounded-md text-xs font-sans uppercase tracking-wider opacity-70">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Experience Section - remaining content truncated in this call for length; full file will be restored */}
        <section id="experience" className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-4xl font-serif italic">Experience</h2>
            <div className="h-[1px] flex-1 bg-anthropic-text/10" />
          </div>
          <div className="space-y-4">
            <ExperienceItem
              title="AI/ML Engineer"
              company="KOGO.ai"
              companyUrl="https://kogo.ai/"
              period="Jan 2025 — Jul 2025"
              impact="Built multi-agent AI systems processing 1000s of sales leads via LLM-powered pipelines"
              description={[
                "Designed and deployed AI agents using Large Language Models (LLMs) for OCR, Retrieval-Augmented Generation (RAG), Model Context Protocol (MCP), and web search workflows to process sales leads and map parent company hierarchies.",
                "Developed 'Asimov', an AI-powered data science platform streamlining business analytics via NL2SQL with modular agents for statistical analysis, data visualization, and automated reporting.",
                "Created AI solutions using NLP and machine learning for call center log analysis and automated sales improvement plans for the automotive sector."
              ]}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </BrowserRouter>
  );
}
