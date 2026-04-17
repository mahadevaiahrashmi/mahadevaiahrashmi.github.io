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
import { blogPosts } from "./blog/posts";
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
  const featuredPost = blogPosts[0];

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
                13 years. 6 companies. Production AI systems shipped — from statistical models at KLA to multi-agent orchestration at KOGO.ai.
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

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-sans uppercase tracking-widest opacity-60">
                <a
                  href="https://rashmi-mahadevaiah-drone.hf.space/ui"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:opacity-100 transition-opacity"
                >
                  Live environment <ExternalLink size={13} />
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
              I'm an IIT Madras alumnus who fell in love with making machines understand human language and behavior.
              My career started in semiconductor defect detection — teaching computers to see microscopic flaws in silicon wafers —
              and evolved into teaching large language models to reason, plan, and make decisions.
            </p>
            <p>
              I've spent the last 13+ years across the full ML lifecycle: from exploratory data science and statistical modeling
              at Axis Bank and TCS, to founding an AI startup (RichFeyn) that shipped three products across computer vision, IoT, and mobile,
              to building multi-agent AI orchestration systems at KOGO.ai that process thousands of sales leads autonomously.
            </p>
            <p>
              Outside of AI, I'm a yoga practitioner, a runner, and someone who believes the best products come from
              deep empathy for the people who use them — not from the technology itself.
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
            <h2 className="text-4xl font-serif italic">Select Projects</h2>
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
          </div>
        </section>

        {/* Experience Section */}
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

            <ExperienceItem
              title="Co-Founder & Technical Lead"
              company="RichFeyn.com"
              companyUrl="https://www.richfeyn.com/"
              period="Aug 2021 — Jul 2024"
              impact="Founded AI startup — shipped 3 products from 0→1 across computer vision, IoT, and mobile"
              description={[
                "Launched an AI product transforming phone camera images into professional catalogue visuals for SMEs using semantic analysis, image captioning, and computer vision models.",
                "Developed an IoT-based smart jar with auto-reordering functionality, featuring an AI-powered cart generator using natural language processing and text prompt understanding.",
                "Built cross-platform mobile applications with Python and React Native to track inventory and automate orders for busy households."
              ]}
            />

            <ExperienceItem
              title="Senior Manager — Data Science"
              company="Axis Bank"
              companyUrl="https://www.axis.bank.in/"
              period="Apr 2017 — Dec 2020"
              impact="25% new customer acquisition growth · 18% retention improvement · 10% balance increase"
              description={[
                "Led data science initiatives for wholesale banking, increasing new customer acquisition by 25% through sector-wise NLP campaigns using N-gram models and text classification.",
                "Built predictive models for high-value customer attrition using NLP text mining and machine learning, increasing retention by 18% and account balances by 10%.",
                "Identified competitor bank users using Named Entity Recognition (NER) and knowledge graphs to map supply chain positions and increase wallet share."
              ]}
            />

            <ExperienceItem
              title="Senior Business Analyst — Data Science"
              company="Tata Consultancy Services"
              companyUrl="https://www.tcs.com/"
              period="Jul 2015 — Mar 2017"
              impact="50% reduction in lead activation time · Published white paper on NLP + sentiment analysis"
              description={[
                "Built automated web crawlers and scrapers to identify leads, decreasing lead activation time by 50% using topic mining and NLP techniques with Python.",
                "Optimized search results for a US airline using information retrieval algorithms and built predictive maintenance models using machine learning for medical equipment manufacturers.",
                "Developed battery degradation models for Japanese EV firms using statistical modeling and time-series analysis to formulate improved warranty services.",
                "Published White Paper: 'Transforming social media marketing by analyzing weather patterns and Twitter activity using sentiment analysis and NLP'."
              ]}
            />

            <ExperienceItem
              title="Associate — Fashion Business Analytics"
              company="Snapdeal"
              companyUrl="https://www.snapdeal.com/"
              period="Oct 2014 — Feb 2015"
              impact="Drove fashion vertical to $6M monthly revenue"
              description={[
                "Developed promo code and cashback rule engines using data analytics and Python for the Fashion vertical, driving categories to reach $6M monthly revenue through data-driven pricing strategies."
              ]}
            />

            <ExperienceItem
              title="Algorithm Engineer"
              company="KLA Corporation"
              companyUrl="https://www.kla.com/"
              period="Mar 2011 — Mar 2013"
              impact="Improved defect capture rate from 80% to 90% — eliminated manual inspection"
              description={[
                "Built image processing and computer vision products for semiconductor wafer inspection using signal processing and machine learning algorithms, increasing defect capture rates from 80% to 90% and eliminating manual inspection workflows."
              ]}
            />
          </div>
        </section>

        {featuredPost && (
          <section id="writing" className="mb-32">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-4xl font-serif italic">Latest Writing</h2>
              <div className="h-[1px] flex-1 bg-anthropic-text/10" />
            </div>

            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Link
                to={`/blog/${featuredPost.slug}`}
                className="block border-y border-anthropic-text/10 py-8 hover:border-anthropic-accent/40 transition-colors group"
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  {featuredPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-anthropic-text/5 rounded-md text-xs font-sans uppercase tracking-wider opacity-70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-3xl md:text-4xl font-serif font-medium mb-3 group-hover:text-anthropic-accent transition-colors">
                  {featuredPost.title}
                </h3>
                <p className="text-xl font-serif italic opacity-60 mb-4">{featuredPost.subtitle}</p>
                <p className="text-lg leading-relaxed opacity-80 max-w-3xl mb-5">{featuredPost.excerpt}</p>
                <div className="inline-flex items-center gap-2 text-sm font-sans uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                  Read article <ExternalLink size={14} />
                </div>
              </Link>
            </motion.article>
          </section>
        )}

        {/* Education Section */}
        <section id="education" className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-4xl font-serif italic">Education</h2>
            <div className="h-[1px] flex-1 bg-anthropic-text/10" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center p-8 border border-anthropic-text/10 rounded-2xl"
          >
            <div>
              <h3 className="text-2xl font-serif font-medium mb-1">Bachelor of Technology in Electrical Engineering</h3>
              <p className="text-lg opacity-80">Indian Institute of Technology Madras</p>
            </div>
            <span className="text-sm font-sans uppercase tracking-widest opacity-60 mt-4 md:mt-0">Class of 2011</span>
          </motion.div>
        </section>

        {/* Technical Skills — Categorized */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-4xl font-serif italic">Technical Skills</h2>
            <div className="h-[1px] flex-1 bg-anthropic-text/10" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-sans uppercase tracking-widest opacity-60 mb-4">AI & Machine Learning</h3>
              <div className="flex flex-wrap gap-2">
                {["LLMs", "NLP", "RAG", "Agentic AI", "Deep Learning", "Computer Vision", "NER", "NL2SQL", "Sentiment Analysis", "Text Mining", "Image Captioning", "Predictive Modeling"].map(skill => (
                  <span key={skill} className="px-4 py-2 bg-anthropic-text/5 rounded-lg text-sm font-sans uppercase tracking-wider">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-sans uppercase tracking-widest opacity-60 mb-4">Languages & Tools</h3>
              <div className="flex flex-wrap gap-2">
                {["Python", "SQL", "TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "React", "Node.js", "Git", "Docker", "REST APIs"].map(skill => (
                  <span key={skill} className="px-4 py-2 bg-anthropic-text/5 rounded-lg text-sm font-sans uppercase tracking-wider">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-sans uppercase tracking-widest opacity-60 mb-4">Domain & Strategy</h3>
              <div className="flex flex-wrap gap-2">
                {["Product Management", "Data Science", "ML Pipelines", "IoT", "Financial Services", "E-Commerce", "Statistical Modeling", "A/B Testing", "Data Visualization"].map(skill => (
                  <span key={skill} className="px-4 py-2 bg-anthropic-text/5 rounded-lg text-sm font-sans uppercase tracking-wider">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Interests */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-serif italic">Interests</h2>
            <div className="h-[1px] flex-1 bg-anthropic-text/10" />
          </div>
          <div className="flex flex-wrap gap-6">
            {[
              { icon: <Heart size={18} />, label: "Yoga" },
              { icon: <Cpu size={18} />, label: "Running" },
              { icon: <BookOpen size={18} />, label: "Meditation" },
              { icon: <MapPin size={18} />, label: "Trekking" }
            ].map(interest => (
              <div key={interest.label} className="flex items-center gap-2 opacity-80">
                {interest.icon}
                <span className="font-serif text-lg">{interest.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 border-t border-anthropic-text/10 text-center">
          <h2 className="text-5xl md:text-7xl font-serif font-light mb-12">Let's connect.</h2>
          <div className="flex flex-col items-center gap-6">
            <a 
              href="mailto:mahadevaiah.rashmi@gmail.com" 
              className="text-2xl md:text-4xl font-serif italic hover:text-anthropic-accent transition-colors underline underline-offset-8 decoration-anthropic-text/10"
            >
              mahadevaiah.rashmi@gmail.com
            </a>
            <div className="flex gap-8 mt-8">
              <a href="https://www.linkedin.com/in/rashmimahadevaiah/" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity">
                <Linkedin size={24} />
              </a>
              <a href="https://github.com/mahadevaiahrashmi" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity">
                <Github size={24} />
              </a>
              <a href="https://twitter.com/rashmi_richfeyn" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity">
                <Twitter size={24} />
              </a>
              <a href="https://instagram.com/rashmi_mahadevaiah" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="max-w-5xl mx-auto px-6 py-12 border-t border-anthropic-text/5 flex flex-col md:flex-row justify-between items-center gap-4 opacity-40 text-xs font-sans uppercase tracking-[0.2em]">
        <span>© 2026 Rashmi Mahadevaiah</span>
        <span>Built with precision and care</span>
      </footer>
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
