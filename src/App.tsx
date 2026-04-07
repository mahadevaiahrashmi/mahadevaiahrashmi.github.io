/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import {
  Mail,
  Linkedin,
  Github,
  ChevronRight,
  ExternalLink,
  MapPin,
  BookOpen,
  Briefcase,
  Cpu,
  Heart,
  Instagram,
  Twitter,
  FileText,
  Brain,
  BarChart3,
  Layers,
  Code,
  TrendingUp
} from "lucide-react";

const ExperienceItem = ({ title, company, period, impact, description, links }: any) => (
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
    <div className="text-lg font-serif italic mb-4 opacity-80">{company}</div>
    {impact && (
      <div className="flex items-center gap-2 mb-4 text-anthropic-accent font-sans text-sm uppercase tracking-widest">
        <TrendingUp size={14} />
        <span>{impact}</span>
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

export default function App() {
  return (
    <div className="min-h-screen selection:bg-anthropic-accent/20">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-anthropic-bg/80 backdrop-blur-sm border-b border-anthropic-text/5">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-serif text-xl font-medium tracking-tight">Rashmi M.</span>
          <div className="flex gap-8 text-sm font-sans uppercase tracking-widest opacity-60">
            <a href="#about" className="hover:opacity-100 transition-opacity">About</a>
            <a href="#expertise" className="hover:opacity-100 transition-opacity">Expertise</a>
            <a href="#experience" className="hover:opacity-100 transition-opacity">Experience</a>
            <a href="#projects" className="hover:opacity-100 transition-opacity">Projects</a>
            <a href="#blog" className="hover:opacity-100 transition-opacity">Blog</a>
            <a href="#contact" className="hover:opacity-100 transition-opacity">Contact</a>
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
          >
            <h1 className="text-6xl md:text-8xl font-serif font-light tracking-tight mb-8 leading-[1.1]">
              Building the future <br />
              <span className="italic">through AI & Data.</span>
            </h1>
            <div className="max-w-3xl">
              <p className="text-xl md:text-2xl font-serif leading-relaxed opacity-80 mb-4">
                I am Rashmi Mahadevaiah — an AI/ML Engineer and Product Leader with 13+ years of experience
                shipping data-driven products across financial services, e-commerce, IoT, and SaaS.
              </p>
              <p className="text-lg font-serif leading-relaxed opacity-70 mb-4">
                I build and deploy production AI systems using Large Language Models (LLMs), Natural Language Processing (NLP),
                Retrieval-Augmented Generation (RAG), and agentic AI architectures. My work spans the full ML lifecycle —
                from exploratory data science and statistical modeling to building end-to-end machine learning pipelines,
                NL2SQL interfaces, and multi-agent orchestration systems.
              </p>
              <p className="text-lg font-serif leading-relaxed opacity-70 mb-8">
                I bring deep technical expertise in Python, deep learning, computer vision, and predictive analytics,
                combined with product management experience that translates complex AI capabilities into measurable
                business outcomes — including 25% customer acquisition growth, 18% retention improvement, and $6M+ revenue impact.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="mailto:mahadevaiah.rashmi@gmail.com"
                  className="px-6 py-3 bg-anthropic-text text-anthropic-bg rounded-full font-sans text-sm uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  <Mail size={16} /> Get in touch
                </a>
                <a
                  href="https://www.linkedin.com/in/rashmimahadevaiah/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-anthropic-text/20 rounded-full font-sans text-sm uppercase tracking-widest hover:bg-anthropic-text/5 transition-colors flex items-center gap-2"
                >
                  <Linkedin size={16} /> LinkedIn
                </a>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-anthropic-accent text-anthropic-accent rounded-full font-sans text-sm uppercase tracking-widest hover:bg-anthropic-accent hover:text-white transition-all flex items-center gap-2"
                >
                  <FileText size={16} /> View Resume
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* What I Bring — Pillars */}
        <section id="expertise" className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-4xl font-serif italic">What I Bring</h2>
            <div className="h-[1px] flex-1 bg-anthropic-text/10" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain size={28} />,
                title: "AI & ML Engineering",
                description: "Production systems built with LLMs, NLP, RAG, agentic AI, computer vision, and deep learning. Hands-on with Python, TensorFlow, PyTorch, and end-to-end ML pipeline deployment.",
                keywords: ["LLMs", "NLP", "RAG", "Agentic AI", "Deep Learning", "Computer Vision", "Python"]
              },
              {
                icon: <Briefcase size={28} />,
                title: "Product Leadership",
                description: "13+ years translating AI capabilities into product strategy. Experience leading cross-functional teams, defining roadmaps, and shipping data products that drive measurable business growth.",
                keywords: ["Product Management", "Roadmaps", "Go-to-Market", "Cross-functional"]
              },
              {
                icon: <BarChart3 size={28} />,
                title: "Data Strategy",
                description: "End-to-end data science — from statistical modeling and predictive analytics to NL2SQL, sentiment analysis, and building analytics platforms that democratize data access.",
                keywords: ["Data Science", "NL2SQL", "Predictive Analytics", "Statistical Modeling"]
              }
            ].map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 border border-anthropic-text/10 rounded-2xl"
              >
                <div className="text-anthropic-accent mb-4">{pillar.icon}</div>
                <h3 className="text-2xl font-serif font-medium mb-4">{pillar.title}</h3>
                <p className="text-lg font-serif leading-relaxed opacity-70 mb-6">{pillar.description}</p>
                <div className="flex flex-wrap gap-2">
                  {pillar.keywords.map(kw => (
                    <span key={kw} className="px-3 py-1 bg-anthropic-text/5 rounded-md text-xs font-sans uppercase tracking-wider">
                      {kw}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
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
              period="Oct 2014 — Feb 2015"
              impact="Drove fashion vertical to $6M monthly revenue"
              description={[
                "Developed promo code and cashback rule engines using data analytics and Python for the Fashion vertical, driving categories to reach $6M monthly revenue through data-driven pricing strategies."
              ]}
            />

            <ExperienceItem
              title="Algorithm Engineer"
              company="KLA Corporation"
              period="Mar 2011 — Mar 2013"
              impact="Improved defect capture rate from 80% to 90% — eliminated manual inspection"
              description={[
                "Built image processing and computer vision products for semiconductor wafer inspection using signal processing and machine learning algorithms, increasing defect capture rates from 80% to 90% and eliminating manual inspection workflows."
              ]}
            />
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-4xl font-serif italic">Blog</h2>
            <div className="h-[1px] flex-1 bg-anthropic-text/10" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "The Rise of Agentic AI in Enterprise Workflows",
                date: "March 2026",
                excerpt: "Exploring how autonomous agents are transforming CRM integration and sales pipeline monitoring.",
                category: "AI Strategy"
              },
              {
                title: "NLP for Wholesale Banking: Lessons from Axis Bank",
                date: "January 2026",
                excerpt: "A deep dive into using N-gram methods and NER for customer acquisition and attrition prediction.",
                category: "Data Science"
              },
              {
                title: "Building Asimov: A Modular Data Science Platform",
                date: "November 2025",
                excerpt: "Technical insights into creating NL2SQL interfaces for streamlined business analytics.",
                category: "Engineering"
              },
              {
                title: "The Future of IoT in the Smart Kitchen",
                date: "September 2025",
                excerpt: "How AI-powered cart generators are simplifying household inventory management.",
                category: "IoT"
              }
            ].map((post, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group p-8 border border-anthropic-text/10 rounded-2xl hover:border-anthropic-accent/30 transition-colors cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-sans uppercase tracking-widest text-anthropic-accent">{post.category}</span>
                  <span className="text-xs font-sans uppercase tracking-widest opacity-40">{post.date}</span>
                </div>
                <h3 className="text-2xl font-serif font-medium mb-4 group-hover:text-anthropic-accent transition-colors">{post.title}</h3>
                <p className="text-lg font-serif opacity-70 leading-relaxed mb-6">{post.excerpt}</p>
                <div className="flex items-center gap-2 text-sm font-sans uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                  Read Article <ChevronRight size={14} />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects Placeholder Section */}
        <section id="projects" className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-4xl font-serif italic">Projects</h2>
            <div className="h-[1px] flex-1 bg-anthropic-text/10" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Asimov — AI Data Science Platform",
                tags: ["LLMs", "NL2SQL", "Python", "Agentic AI"],
                description: "Modular AI-powered analytics platform enabling business users to query databases using natural language, with automated statistical analysis and visualization agents.",
                status: "Case study coming soon"
              },
              {
                title: "AI Sales Lead Pipeline",
                tags: ["RAG", "LLMs", "OCR", "MCP"],
                description: "Multi-agent system using Retrieval-Augmented Generation and web search workflows to process, enrich, and score sales leads at scale for enterprise clients.",
                status: "Case study coming soon"
              },
              {
                title: "Smart Catalogue — Computer Vision for SMEs",
                tags: ["Computer Vision", "Image Captioning", "Deep Learning"],
                description: "AI product transforming phone camera images into professional product catalogue visuals using semantic analysis and image captioning models.",
                status: "Case study coming soon"
              },
              {
                title: "NLP Customer Intelligence — Axis Bank",
                tags: ["NLP", "NER", "Text Mining", "Machine Learning"],
                description: "Data science system using Named Entity Recognition and N-gram models to predict customer attrition, identify competitor relationships, and drive targeted acquisition campaigns.",
                status: "Case study coming soon"
              }
            ].map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 border border-anthropic-text/10 rounded-2xl"
              >
                <h3 className="text-2xl font-serif font-medium mb-3">{project.title}</h3>
                <p className="text-lg font-serif leading-relaxed opacity-70 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-anthropic-text/5 rounded-md text-xs font-sans uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-xs font-sans uppercase tracking-widest text-anthropic-accent">{project.status}</span>
              </motion.div>
            ))}
          </div>
        </section>

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

