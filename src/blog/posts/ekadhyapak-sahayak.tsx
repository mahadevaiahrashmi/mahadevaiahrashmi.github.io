// agent-notes: { ctx: "OneTeacher project case-study blog post", deps: ["../../components/blog-prose"], state: active, last: "2026-09-20", key: ["case study; multi-grade FLN offline AI for single-teacher schools"] }
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PostH2, PostP, PostUL, PostOL } from "../../components/blog-prose";

export default function OneTeacherPost() {
  return (
    <>
      <h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight mb-6 leading-tight">
        OneTeacher: One Teacher, Many Grades, One AI Companion
      </h1>

      <p className="text-lg font-serif italic opacity-60 mb-12">
        An offline-first teaching assistant for single-teacher multi-grade primary schools — differentiated plans, FLN oral checks, and timetables. English, Tamil, Telugu, Kannada, Malayalam, Hindi.
      </p>

      <PostP>
        In a large share of Indian government primary schools, one teacher runs Grades 1 through 5 in the same room. Attendance, mid-day meal, blackboard work, and NIPUN Bharat FLN goals all sit on the same pair of shoulders. Differentiation — the idea that Class 1 and Class 5 should not do the same task on the same topic — is the first thing that collapses under that load.
      </PostP>

      <PostP>
        <strong>OneTeacher</strong> is a deliberately small tool for that reality. It is a single HTML file. The teacher enters the topic, the grades present, the subject, and the language preference (English, Tamil, Telugu, Kannada, Malayalam, Hindi, or bilingual). One click produces an optimized prompt. That prompt is pasted into a free AI the teacher already uses — Grok, Gemini, or ChatGPT. The output is a multi-grade lesson plan, differentiated worksheets, an FLN oral check, a realistic timetable, or a full-day package. The teacher reviews before anything reaches the children.
      </PostP>

      <PostH2>Built for Constraints, Not Ideal Conditions</PostH2>

      <PostP>
        Most education-tech assumes reliable connectivity, one device per teacher, and single-grade classrooms. Single-teacher schools often have none of those. The product decisions follow from that:
      </PostP>

      <PostUL>
        <li><strong>Offline-first.</strong> Static templates work with no internet. The AI path only needs a moment of connectivity to paste a prompt.</li>
        <li><strong>No install, no login.</strong> One file. Any phone or laptop browser. No app store, no account, no student data.</li>
        <li><strong>Multi-grade as the unit of design.</strong> Parallel activities for lower and higher grades are the default.</li>
        <li><strong>Teacher remains the expert.</strong> The system generates; the teacher accepts, edits, or discards.</li>
        <li><strong>Language inclusive.</strong> Built for South India and beyond — Tamil, Telugu, Kannada, Malayalam, Hindi, and English.</li>
      </PostUL>

      <div className="grid md:grid-cols-3 gap-6 my-12">
        <div className="p-6 bg-anthropic-text/5 border border-anthropic-text/10 rounded-xl">
          <h3 className="font-serif text-xl mb-2">Multi-grade native</h3>
          <p className="opacity-80">One topic becomes parallel activities for Grades 1–5, with a clear map of where the teacher’s attention should sit.</p>
        </div>
        <div className="p-6 bg-anthropic-text/5 border border-anthropic-text/10 rounded-xl">
          <h3 className="font-serif text-xl mb-2">FLN-aware</h3>
          <p className="opacity-80">Quick oral assessments designed to run in 8–10 minutes while other groups work — aligned with NIPUN Bharat practice.</p>
        </div>
        <div className="p-6 bg-anthropic-text/5 border border-anthropic-text/10 rounded-xl">
          <h3 className="font-serif text-xl mb-2">Low materials</h3>
          <p className="opacity-80">Blackboard, chalk, notebooks, oral work. Print is optional, not assumed.</p>
        </div>
      </div>

      <PostH2>What It Generates</PostH2>

      <PostOL>
        <li><strong>Multi-grade lesson plan</strong> — common introduction, differentiated main activities, peer learning, quick check, realistic homework.</li>
        <li><strong>Differentiated worksheets</strong> — three levels from the same concept, short enough for half a page.</li>
        <li><strong>Story + questions</strong> — local-context story with graded follow-ups.</li>
        <li><strong>Daily timetable</strong> — period-wise plan for one room and one adult.</li>
        <li><strong>FLN oral test</strong> — progressive questions and what “good” vs “needs support” looks like.</li>
        <li><strong>Blackboard ideas</strong> — chalk-only drawings and how different grades interact with the same board.</li>
        <li><strong>Parent note</strong> — short message for diary or WhatsApp, in the language you choose.</li>
        <li><strong>Full-day package</strong> — end-to-end materials for one topic.</li>
      </PostOL>

      <PostH2>The Applied-AI Decisions</PostH2>

      <PostP>
        The interesting work is not “call an LLM.” It is prompt design under severe product constraints: multi-grade pedagogy, FLN, low materials, and a teacher who may only have a few minutes and intermittent signal.
      </PostP>

      <PostUL>
        <li><strong>Prompt as product.</strong> The HTML app is a structured prompt factory so generic chat models behave like a multi-grade specialist.</li>
        <li><strong>No proprietary model required.</strong> Free tools the teacher already opens are enough.</li>
        <li><strong>Offline path always available.</strong> When the network is down, static templates still give a checklist, oral questions, and group ideas.</li>
      </PostUL>

      <PostH2>Documents & Demo</PostH2>

      <PostP>
        Full product definition and materials are public:
      </PostP>

      <PostUL>
        <li>
          <strong>Product Requirements Document (PRD)</strong> —{" "}
          <a href="https://github.com/mahadevaiahrashmi/EkAdhyapak-Sahayak/blob/main/PRD.md" target="_blank" rel="noopener noreferrer" className="text-anthropic-accent hover:underline">
            PRD on GitHub
          </a>
        </li>
        <li>
          <strong>Investor pitch deck</strong> —{" "}
          <a href="https://github.com/mahadevaiahrashmi/EkAdhyapak-Sahayak/raw/main/EkAdhyapak_Sahayak_Investor_Pitch.pptx" target="_blank" rel="noopener noreferrer" className="text-anthropic-accent hover:underline">
            Download PPTX
          </a>
        </li>
        <li>
          <strong>Live tool</strong> —{" "}
          <a href="https://cdn.jsdelivr.net/gh/mahadevaiahrashmi/EkAdhyapak-Sahayak@main/index.html" target="_blank" rel="noopener noreferrer" className="text-anthropic-accent hover:underline">
            Open OneTeacher
          </a>
        </li>
        <li>
          <strong>Source</strong> —{" "}
          <a href="https://github.com/mahadevaiahrashmi/EkAdhyapak-Sahayak" target="_blank" rel="noopener noreferrer" className="text-anthropic-accent hover:underline">
            github.com/mahadevaiahrashmi/EkAdhyapak-Sahayak
          </a>
        </li>
      </PostUL>

      <PostH2>Why It Matters</PostH2>

      <PostP>
        As a product, it targets a structural gap: single-teacher multi-grade classrooms that existing platforms only partially serve — including in Tamil Nadu, Andhra Pradesh, Telangana, Karnataka, and Kerala. As an engineering artifact, it is a case study in constraint-driven AI product design: offline-first delivery, prompt engineering as the core product surface, and an explicit refusal to invent a student-facing stack that schools cannot support.
      </PostP>
    </>
  );
}
