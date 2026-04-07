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
  Calendar,
  Award,
  BookOpen,
  Briefcase,
  Cpu,
  Heart,
  Instagram,
  Twitter,
  FileText
} from "lucide-react";

const ExperienceItem = ({ title, company, period, description, links }: any) => (
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
            <a href="#experience" className="hover:opacity-100 transition-opacity">Experience</a>
            <a href="#blog" className="hover:opacity-100 transition-opacity">Blog</a>
            <a href="#education" className="hover:opacity-100 transition-opacity">Education</a>
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
            <div className="max-w-2xl">
              <p className="text-xl md:text-2xl font-serif leading-relaxed opacity-80 mb-8">
                I am Rashmi Mahadevaiah, an AI/ML Engineer and Product Leader with 13 years of experience 
                in product management, data science, and building agentic solutions. 
                I specialize in LLMs, NLP, and transforming complex data into strategic insights.
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
              description={[
                "Built AI agents with LLMs for OCR, RAG, MCP, and web search workflows to process sales leads and map parent company hierarchies.",
                "Developed 'Asimov', an AI-powered data science platform streamlining analytics via NL2SQL with modular agents for statistical analysis and visualization.",
                "Created AI solutions for call center log analysis and automated sales improvement plans for the automotive sector."
              ]}
            />

            <ExperienceItem 
              title="Co-Founder"
              company="RichFeyn.com"
              period="Aug 2021 — Jul 2024"
              description={[
                "Launched an AI product transforming phone camera images into professional catalogue visuals for SMEs using Semantic analysis and Image Captioning.",
                "Developed an IoT-based smart jar with auto-reordering functionality, featuring an AI-powered cart generator based on text prompts.",
                "Built cross-platform mobile applications to track inventory and automate orders for busy households."
              ]}
            />

            <ExperienceItem 
              title="Senior Manager — Data Science"
              company="Axis Bank"
              period="Apr 2017 — Dec 2020"
              description={[
                "Led data science initiatives for wholesale banking, increasing new customer acquisition by 25% through sector-wise NLP campaigns.",
                "Predicted high-value customer attrition using NLP text mining, increasing retention by 18% and balances by 10%.",
                "Identified competitor bank users using Named Entity Recognition (NER) to map supply chain positions and increase wallet share."
              ]}
            />

            <ExperienceItem 
              title="Senior Business Analyst"
              company="Tata Consulting Services"
              period="Jul 2015 — Mar 2017"
              description={[
                "Built automated web crawlers and scrapers to identify leads, decreasing lead activation time by 50% using topic mining NLP techniques.",
                "Optimized search results for a US Airline firm and built predictive maintenance models for medical equipment manufacturers.",
                "Developed battery degradation models for Japanese EV firms to formulate improved warranty services.",
                "Published White Paper: 'Transforming social media marketing by analyzing weather patterns and twitter activity using sentiment analysis'."
              ]}
            />

            <ExperienceItem 
              title="Associate — Fashion Business Analytics"
              company="Snapdeal"
              period="Oct 2014 — Feb 2015"
              description={[
                "Developed promo code and cashback rule engines for the Fashion vertical, driving categories to reach $6M monthly revenue."
              ]}
            />

            <ExperienceItem 
              title="Algorithm Engineer"
              company="KLA Corporation"
              period="Mar 2011 — Mar 2013"
              description={[
                "Built image processing products for semiconductor wafer inspection, increasing defect capture rates from 80% to 90% and eliminating manual inspection."
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

        {/* Interests & Skills */}
        <section className="grid md:grid-cols-2 gap-12 mb-32">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-serif italic">Core Skills</h2>
              <div className="h-[1px] flex-1 bg-anthropic-text/10" />
            </div>
            <div className="flex flex-wrap gap-2">
              {["LLMs", "NLP", "RAG", "Product Management", "Data Science", "AI Agents", "Python", "Machine Learning", "IoT", "NL2SQL"].map(skill => (
                <span key={skill} className="px-4 py-2 bg-anthropic-text/5 rounded-lg text-sm font-sans uppercase tracking-wider">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
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

