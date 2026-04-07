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
  Briefcase,
  Cpu,
  Heart,
  Instagram,
  Twitter,
  FileText
} from "lucide-react";

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

export default function App() {
  return (
    <div className="min-h-screen selection:bg-anthropic-accent/20">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-anthropic-bg/80 backdrop-blur-sm border-b border-anthropic-text/5">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-serif text-xl font-medium tracking-tight">Rashmi Mahadevaiah</span>
          <div className="flex gap-8 text-sm font-sans uppercase tracking-widest opacity-60">
            <a href="#about" className="hover:opacity-100 transition-opacity">About</a>
            <a href="#experience" className="hover:opacity-100 transition-opacity">Experience</a>
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

