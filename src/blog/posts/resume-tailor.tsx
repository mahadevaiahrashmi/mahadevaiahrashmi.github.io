// agent-notes: { ctx: "Resume Tailor project case-study blog post content", deps: ["../../components/blog-prose"], state: active, last: "sato@2026-06-02", key: ["draft case study; recruiter-facing framing for Applied AI/ML + AI PM roles; facts sourced from github.com/mahadevaiahrashmi/resume-tailor README"] }
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PostH2, PostP, PostUL, PostOL } from "../../components/blog-prose";

export default function ResumeTailorPost() {
  return (
    <>
      <h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight mb-6 leading-tight">
        Resume Tailor: One Resume, Tuned for Every Role
      </h1>

      <p className="text-lg font-serif italic opacity-60 mb-12">
        A local-first web app that tailors your resume and cover letter to a job description — five AI engines, one interface, zero invented facts.
      </p>

      <PostP>
        Every applicant knows the tax: the same resume, copy-pasted into a hundred portals, quietly ignored because it never speaks the language of the specific role. Tailoring each submission by hand — surfacing the relevant work, mirroring the posting's vocabulary, leading with the impact that hiring manager cares about — is twenty minutes of fiddly editing per application. <strong>Resume Tailor</strong> collapses it: paste a job description and your current resume, pick an AI engine, and get back a tailored, one-page resume <em>and</em> a matching cover letter, as both Word and PDF.
      </PostP>

      <PostP>
        One constraint shaped every decision. The tool reframes and re-emphasizes what is already in your resume — it is instructed never to invent employers, dates, degrees, metrics, or skills. Honesty first, because it's a document you'll be held to in the interview.
      </PostP>

      <PostH2>Five Engines, One Interface</PostH2>

      <PostP>
        The most deliberate design choice is that the model is swappable. The same workflow runs against any of five backends, so the user trades off privacy, cost, and quality on their terms:
      </PostP>

      <PostUL>
        <li><strong>Ollama</strong> and an offline <strong>Mock</strong> engine keep your text entirely on your machine — nothing leaves the laptop.</li>
        <li><strong>Claude CLI</strong>, <strong>Gemini CLI</strong>, and <strong>OpenRouter</strong> reach for higher quality when privacy isn't the priority.</li>
        <li>A per-engine model picker adapts to whatever you've chosen — listing your installed Ollama models, or letting you type any custom model id.</li>
      </PostUL>

      <PostP>
        The app adds no telemetry and stores no API keys. That privacy-or-quality dial is a product decision as much as an engineering one — it meets a privacy-conscious job seeker and a quality-maximizing one with the same tool.
      </PostP>

      <div className="grid md:grid-cols-3 gap-6 my-12">
        <div className="p-6 bg-anthropic-text/5 border border-anthropic-text/10 rounded-xl">
          <h3 className="font-serif text-xl mb-2">Grounded</h3>
          <p className="opacity-80">Re-orders and rephrases real experience. It will not invent a job, a degree, or a number you didn't give it.</p>
        </div>
        <div className="p-6 bg-anthropic-text/5 border border-anthropic-text/10 rounded-xl">
          <h3 className="font-serif text-xl mb-2">Local or hosted</h3>
          <p className="opacity-80">Run it fully offline with Ollama or the mock, or reach for a hosted model when you want more quality. Your call, every run.</p>
        </div>
        <div className="p-6 bg-anthropic-text/5 border border-anthropic-text/10 rounded-xl">
          <h3 className="font-serif text-xl mb-2">Print-ready</h3>
          <p className="opacity-80">Four downloads per run — resume and cover letter, each as PDF and Word — with typography auto-shrunk to guarantee one page.</p>
        </div>
      </div>

      <PostH2>The Output Is the Product</PostH2>

      <PostP>
        A tailored resume that spills onto a second page or arrives in the wrong format is a tailored resume that gets discarded. So the generation step is only half the job; the rendering is the other half:
      </PostP>

      <PostOL>
        <li><strong>Guaranteed one page.</strong> The PDF renderer auto-shrinks typography until both the resume and cover letter fit a single A4 page — no manual reformatting.</li>
        <li><strong>Both formats, every time.</strong> Each run produces four files: resume PDF, resume Word, cover letter PDF, cover letter Word — whatever the portal asks for.</li>
        <li><strong>Live preview.</strong> You see the resume and cover letter rendered before you download, so there are no surprises.</li>
      </PostOL>

      <PostH2>The Applied-AI Decisions</PostH2>

      <PostP>
        The interesting engineering here isn't "call an LLM" — it's keeping a generative model honest and keeping the system portable across very different models.
      </PostP>

      <PostUL>
        <li><strong>Grounding over generation.</strong> A naive "rewrite my resume for this job" prompt will happily add skills you never claimed, because that maximizes apparent fit. The rewrite is constrained to your real experience instead — reframing, never authoring.</li>
        <li><strong>One interface over five backends.</strong> Local Ollama, a CLI tool, and a hosted API are wildly different runtimes. Abstracting them behind a single engine interface is what lets the same workflow serve every privacy and quality preference.</li>
        <li><strong>Robust by default.</strong> The offline mock engine is always available, so the app demos and previews its layout instantly even with no model installed.</li>
      </PostUL>

      <PostH2>Why It Matters</PostH2>

      <PostP>
        As a product, it targets a problem every job seeker has and most tolerate badly. As an engineering artifact, it's a compact demonstration of production-grade LLM application work: a pluggable model abstraction, privacy-aware design, careful document generation, and the grounding discipline that keeps a generative feature trustworthy. Built in Python on FastAPI, runnable on your laptop in a single command.
      </PostP>
    </>
  );
}
