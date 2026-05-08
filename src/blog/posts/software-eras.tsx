// agent-notes: { ctx: "Software 1.0/2.0/3.0 essay (Karpathy eras) blog post content with 3 inline SVG diagrams", deps: ["../../components/blog-prose"], state: active, last: "sato@2026-05-08", key: ["SVG figures forced onto light surface (bg-[#faf9f5]) so hard-coded ink/orange/green palette stays readable in dark mode"] }
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PostH2, PostP } from "../../components/blog-prose";

const figureWrap = "bg-[#faf9f5] border border-anthropic-text/10 rounded-xl p-6 my-10";
const figureCaption = "text-sm text-center mt-3 opacity-60 italic font-serif text-zinc-700";

export default function SoftwareErasPost() {
  return (
    <>
      <h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight mb-6 leading-tight">
        Software 1.0, 2.0, 3.0 — how we tell computers what to do is changing fast
      </h1>

      <p className="text-lg font-serif italic opacity-60 mb-12">
        Published: May 2026 | Reading Time: ~7 minutes
      </p>

      <PostP>
        If you've ever watched someone "talk" to an AI like ChatGPT and felt a quiet shock at how natural it looked, you're not alone. What you were watching wasn't just a clever chatbot. It was a glimpse of a third way of programming computers — one that didn't really exist five years ago.
      </PostP>
      <PostP>
        The AI researcher Andrej Karpathy has a useful way of describing this shift. He says we've moved through three eras of software: <strong>Software 1.0, Software 2.0, and now Software 3.0</strong>. Each era changes who gets to program, and what skill matters most. Here's the plain-English version, no jargon required.
      </PostP>

      <PostH2>
        <span className="text-anthropic-accent mr-3 font-medium">1.0</span>We write the recipe
      </PostH2>
      <PostP>
        For most of computing history, programming has meant one thing: a human writes instructions in a language the computer understands, line by line.
      </PostP>
      <PostP>
        Think of it as writing a recipe. To bake a cake, you don't just tell someone "make cake" — you say <em>take 200g flour, add two eggs, whisk for three minutes, bake at 180°C for 25 minutes</em>. Every step has to be spelled out. If you forget to mention the oven, the cake never bakes.
      </PostP>
      <PostP>
        That's Software 1.0. The bank app that calculates your interest, the cab booking flow on Uber, the spreadsheet you use to track your budget — all of them were typed out by humans, one careful instruction at a time. It works, and it's reliable. But it's slow to build, and the computer is only ever as clever as the recipe you wrote down.
      </PostP>

      <figure className={figureWrap}>
        <svg viewBox="0 0 720 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="d1-title" className="w-full h-auto block">
          <title id="d1-title">Software 1.0 — human writes step-by-step instructions</title>
          <defs>
            <marker id="arr1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#d97757" />
            </marker>
          </defs>
          <g transform="translate(60,80)">
            <circle cx="40" cy="20" r="18" fill="none" stroke="#141413" strokeWidth="1.5" />
            <path d="M 10 90 Q 40 50 70 90" fill="none" stroke="#141413" strokeWidth="1.5" />
            <text x="40" y="120" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="11" fill="#4a4a48" letterSpacing="1.5">YOU</text>
          </g>
          <line x1="155" y1="120" x2="225" y2="120" stroke="#d97757" strokeWidth="1.5" markerEnd="url(#arr1)" />
          <text x="190" y="108" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="10" fill="#b0aea5" letterSpacing="1.2">WRITE</text>
          <g transform="translate(240,55)">
            <rect width="220" height="135" fill="#faf9f5" stroke="#141413" strokeWidth="1.2" rx="3" />
            <text x="14" y="26" fontFamily="Poppins, sans-serif" fontSize="11" fill="#4a4a48" letterSpacing="1.5">INSTRUCTIONS</text>
            <line x1="14" y1="36" x2="206" y2="36" stroke="#e8e6dc" />
            <text x="14" y="58" fontFamily="Lora, serif" fontSize="12" fill="#141413">1. Take 200g flour</text>
            <text x="14" y="78" fontFamily="Lora, serif" fontSize="12" fill="#141413">2. Add two eggs</text>
            <text x="14" y="98" fontFamily="Lora, serif" fontSize="12" fill="#141413">3. Whisk for 3 minutes</text>
            <text x="14" y="118" fontFamily="Lora, serif" fontSize="12" fill="#141413">4. Bake at 180°C…</text>
          </g>
          <line x1="475" y1="120" x2="545" y2="120" stroke="#d97757" strokeWidth="1.5" markerEnd="url(#arr1)" />
          <text x="510" y="108" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="10" fill="#b0aea5" letterSpacing="1.2">RUN</text>
          <g transform="translate(560,70)">
            <rect width="110" height="80" fill="none" stroke="#141413" strokeWidth="1.5" rx="4" />
            <line x1="0" y1="62" x2="110" y2="62" stroke="#141413" strokeWidth="1.2" />
            <circle cx="14" cy="74" r="2" fill="#d97757" />
            <rect x="40" y="95" width="30" height="14" fill="none" stroke="#141413" strokeWidth="1.2" />
            <line x1="25" y1="113" x2="85" y2="113" stroke="#141413" strokeWidth="1.2" />
            <text x="55" y="138" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="11" fill="#4a4a48" letterSpacing="1.5">COMPUTER</text>
          </g>
        </svg>
        <figcaption className={figureCaption}>Software 1.0 — you spell out every step. The computer follows it literally.</figcaption>
      </figure>

      <PostH2>
        <span className="text-anthropic-accent mr-3 font-medium">2.0</span>We curate the examples, the machine learns the recipe
      </PostH2>
      <PostP>
        Around 2012, something shifted. Instead of writing the rules, programmers started letting the computer figure out the rules from examples.
      </PostP>
      <PostP>
        Imagine you wanted a program that could tell a cat from a dog. In Software 1.0 you'd try to write rules — <em>cats have pointy ears, dogs have floppy ears</em> — and you'd quickly realise it's hopeless. There are too many exceptions. So instead, you show a neural network thousands of labelled photos. It studies them, gradually adjusts millions of tiny internal dials, and slowly learns what "cat" and "dog" actually look like.
      </PostP>
      <PostP>
        In this world, the programmer's job changes. You're no longer writing the recipe. You're <strong>curating the cookbook</strong> — choosing what data to feed in, what shape of network to use, and what goal to optimise for. The neural network discovers the recipe on its own.
      </PostP>
      <PostP>
        This is what powers Netflix recommendations, Google Photos finding pictures of your dog, your bank's fraud alerts, and Tesla's self-driving system. It's far more powerful than 1.0 for messy, real-world tasks. But it still demands specialist skills, expensive computers, and patience — training a model can take days.
      </PostP>

      <figure className={figureWrap}>
        <svg viewBox="0 0 720 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="d2-title" className="w-full h-auto block">
          <title id="d2-title">Software 2.0 — neural network learns from labelled examples</title>
          <defs>
            <marker id="arr2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#d97757" />
            </marker>
          </defs>
          <g transform="translate(40,55)">
            <text x="65" y="-12" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="11" fill="#4a4a48" letterSpacing="1.5">EXAMPLES</text>
            <g fontFamily="Lora, serif" fontSize="10" fill="#141413">
              <rect x="0" y="0" width="58" height="42" fill="#faf9f5" stroke="#141413" strokeWidth="1" />
              <text x="29" y="26" textAnchor="middle">cat</text>
              <rect x="68" y="0" width="58" height="42" fill="#faf9f5" stroke="#141413" strokeWidth="1" />
              <text x="97" y="26" textAnchor="middle">dog</text>
              <rect x="0" y="50" width="58" height="42" fill="#faf9f5" stroke="#141413" strokeWidth="1" />
              <text x="29" y="76" textAnchor="middle">dog</text>
              <rect x="68" y="50" width="58" height="42" fill="#faf9f5" stroke="#141413" strokeWidth="1" />
              <text x="97" y="76" textAnchor="middle">cat</text>
              <rect x="0" y="100" width="58" height="42" fill="#faf9f5" stroke="#141413" strokeWidth="1" />
              <text x="29" y="126" textAnchor="middle">cat</text>
              <rect x="68" y="100" width="58" height="42" fill="#faf9f5" stroke="#141413" strokeWidth="1" />
              <text x="97" y="126" textAnchor="middle">dog</text>
            </g>
          </g>
          <line x1="180" y1="120" x2="245" y2="120" stroke="#d97757" strokeWidth="1.5" markerEnd="url(#arr2)" />
          <text x="212" y="108" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="10" fill="#b0aea5" letterSpacing="1.2">FEED IN</text>
          <g transform="translate(265,55)">
            <text x="90" y="-12" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="11" fill="#4a4a48" letterSpacing="1.5">NEURAL NETWORK</text>
            <g stroke="#b0aea5" strokeWidth="0.6">
              <line x1="20" y1="20" x2="80" y2="20" /><line x1="20" y1="20" x2="80" y2="60" /><line x1="20" y1="20" x2="80" y2="100" /><line x1="20" y1="20" x2="80" y2="140" />
              <line x1="20" y1="60" x2="80" y2="20" /><line x1="20" y1="60" x2="80" y2="60" /><line x1="20" y1="60" x2="80" y2="100" /><line x1="20" y1="60" x2="80" y2="140" />
              <line x1="20" y1="100" x2="80" y2="20" /><line x1="20" y1="100" x2="80" y2="60" /><line x1="20" y1="100" x2="80" y2="100" /><line x1="20" y1="100" x2="80" y2="140" />
              <line x1="20" y1="140" x2="80" y2="20" /><line x1="20" y1="140" x2="80" y2="60" /><line x1="20" y1="140" x2="80" y2="100" /><line x1="20" y1="140" x2="80" y2="140" />
              <line x1="80" y1="20" x2="160" y2="60" /><line x1="80" y1="20" x2="160" y2="100" />
              <line x1="80" y1="60" x2="160" y2="60" /><line x1="80" y1="60" x2="160" y2="100" />
              <line x1="80" y1="100" x2="160" y2="60" /><line x1="80" y1="100" x2="160" y2="100" />
              <line x1="80" y1="140" x2="160" y2="60" /><line x1="80" y1="140" x2="160" y2="100" />
            </g>
            <g fill="#faf9f5" stroke="#141413" strokeWidth="1.2">
              <circle cx="20" cy="20" r="6" /><circle cx="20" cy="60" r="6" /><circle cx="20" cy="100" r="6" /><circle cx="20" cy="140" r="6" />
              <circle cx="80" cy="20" r="6" /><circle cx="80" cy="60" r="6" /><circle cx="80" cy="100" r="6" /><circle cx="80" cy="140" r="6" />
              <circle cx="160" cy="60" r="6" fill="#d97757" stroke="#d97757" />
              <circle cx="160" cy="100" r="6" fill="#d97757" stroke="#d97757" />
            </g>
          </g>
          <line x1="450" y1="120" x2="515" y2="120" stroke="#d97757" strokeWidth="1.5" markerEnd="url(#arr2)" />
          <text x="482" y="108" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="10" fill="#b0aea5" letterSpacing="1.2">LEARNS</text>
          <g transform="translate(530,75)">
            <rect width="160" height="92" fill="#faf9f5" stroke="#141413" strokeWidth="1.2" rx="3" />
            <text x="80" y="22" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="10" fill="#4a4a48" letterSpacing="1.5">TRAINED MODEL</text>
            <line x1="14" y1="32" x2="146" y2="32" stroke="#e8e6dc" />
            <text x="80" y="56" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="13" fill="#141413">"this is a cat"</text>
            <text x="80" y="76" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="13" fill="#141413">"this is a dog"</text>
          </g>
        </svg>
        <figcaption className={figureCaption}>Software 2.0 — you curate examples. The network discovers the rules itself.</figcaption>
      </figure>

      <PostH2>
        <span className="text-anthropic-accent mr-3 font-medium">3.0</span>We just say what we want
      </PostH2>
      <PostP>
        Then came large language models — ChatGPT, Claude, Gemini — and a third way of programming arrived almost overnight.
      </PostP>
      <PostP>
        In Software 3.0, you don't write code, and you don't curate datasets. You just <strong>ask, in plain English</strong>. <em>"Summarise this document."</em> <em>"Find me flights to Lisbon under ₹40,000 next month."</em> <em>"Look at this spreadsheet and tell me which customers are about to leave."</em>
      </PostP>
      <PostP>
        What's surprising is what happens behind the scenes. The LLM reads your request, interprets the intent, looks around its digital environment — files, websites, tools — performs the work, checks its own output, and debugs itself in a loop if something goes wrong. It does the back-and-forth a thoughtful human assistant would do, but in seconds.
      </PostP>
      <PostP>
        You no longer have to spell out the details. You don't need to know whether the answer should be a SQL query, a Python script, or a web search — the model picks. You just need to know how to phrase the question well, and what context to paste in: a screenshot, a paragraph from an email, a link, a sample row of data.
      </PostP>
      <PostP>
        That's the new skill. Programming, increasingly, is the art of writing a clear request and giving the model the right context.
      </PostP>

      <figure className={figureWrap}>
        <svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="d3-title" className="w-full h-auto block">
          <title id="d3-title">Software 3.0 — natural language prompt, LLM interprets and acts in a loop</title>
          <defs>
            <marker id="arr3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#d97757" />
            </marker>
            <marker id="arr3-soft" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#788c5d" />
            </marker>
          </defs>
          <g transform="translate(30,110)">
            <circle cx="30" cy="20" r="16" fill="none" stroke="#141413" strokeWidth="1.5" />
            <path d="M 5 80 Q 30 45 55 80" fill="none" stroke="#141413" strokeWidth="1.5" />
            <text x="30" y="105" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="11" fill="#4a4a48" letterSpacing="1.5">YOU</text>
          </g>
          <g transform="translate(95,80)">
            <rect width="200" height="60" fill="#faf9f5" stroke="#141413" strokeWidth="1.2" rx="6" />
            <path d="M 12 60 L 22 70 L 28 60 z" fill="#faf9f5" stroke="#141413" strokeWidth="1.2" />
            <text x="100" y="28" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="13" fill="#141413">"find which customers</text>
            <text x="100" y="46" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="13" fill="#141413">are about to leave."</text>
          </g>
          <line x1="300" y1="160" x2="335" y2="160" stroke="#d97757" strokeWidth="1.5" markerEnd="url(#arr3)" />
          <g transform="translate(340,55)">
            <rect width="240" height="210" fill="#faf9f5" stroke="#141413" strokeWidth="1.5" rx="4" />
            <text x="120" y="22" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="11" fill="#4a4a48" letterSpacing="1.5">LARGE LANGUAGE MODEL</text>
            <line x1="14" y1="32" x2="226" y2="32" stroke="#e8e6dc" />
            <g fontFamily="Poppins, sans-serif" fontSize="10" fill="#141413" letterSpacing="0.5">
              <rect x="30" y="50" width="80" height="28" fill="#faf9f5" stroke="#788c5d" strokeWidth="1.2" rx="3" />
              <text x="70" y="68" textAnchor="middle">interpret</text>
              <rect x="130" y="50" width="80" height="28" fill="#faf9f5" stroke="#788c5d" strokeWidth="1.2" rx="3" />
              <text x="170" y="68" textAnchor="middle">look at env</text>
              <rect x="130" y="105" width="80" height="28" fill="#faf9f5" stroke="#788c5d" strokeWidth="1.2" rx="3" />
              <text x="170" y="123" textAnchor="middle">act / compute</text>
              <rect x="30" y="105" width="80" height="28" fill="#faf9f5" stroke="#788c5d" strokeWidth="1.2" rx="3" />
              <text x="70" y="123" textAnchor="middle">check + fix</text>
            </g>
            <g stroke="#788c5d" strokeWidth="1.2" fill="none">
              <line x1="110" y1="64" x2="130" y2="64" markerEnd="url(#arr3-soft)" />
              <line x1="170" y1="78" x2="170" y2="105" markerEnd="url(#arr3-soft)" />
              <line x1="130" y1="119" x2="110" y2="119" markerEnd="url(#arr3-soft)" />
              <line x1="70" y1="105" x2="70" y2="78" markerEnd="url(#arr3-soft)" />
            </g>
            <text x="120" y="160" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="11" fill="#b0aea5">debugs in a loop until it works</text>
            <line x1="40" y1="178" x2="200" y2="178" stroke="#e8e6dc" />
            <text x="120" y="196" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="10" fill="#4a4a48" letterSpacing="1.2">DIGITAL INFORMATION SPACE</text>
          </g>
          <line x1="585" y1="160" x2="620" y2="160" stroke="#d97757" strokeWidth="1.5" markerEnd="url(#arr3)" />
          <g transform="translate(625,125)">
            <rect width="80" height="70" fill="#faf9f5" stroke="#141413" strokeWidth="1.2" rx="3" />
            <text x="40" y="22" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="10" fill="#4a4a48" letterSpacing="1.5">RESULT</text>
            <line x1="10" y1="30" x2="70" y2="30" stroke="#e8e6dc" />
            <text x="40" y="48" textAnchor="middle" fontFamily="Lora, serif" fontSize="11" fill="#141413">a list,</text>
            <text x="40" y="62" textAnchor="middle" fontFamily="Lora, serif" fontSize="11" fill="#141413">a chart…</text>
          </g>
        </svg>
        <figcaption className={figureCaption}>Software 3.0 — you describe what you want. The model figures out how.</figcaption>
      </figure>

      <PostH2>
        So what does this mean for the rest of us?
      </PostH2>
      <PostP>
        The biggest change isn't technical. It's <strong>who gets to program</strong>.
      </PostP>
      <PostP>
        Software 1.0 was the world of computer science graduates. Software 2.0 was the world of data scientists. Software 3.0 is open to anyone who can describe what they want clearly. A lawyer can build a contract reviewer. A small-business owner can build a customer-support assistant. A teacher can build a personalised tutor. None of them write code.
      </PostP>
      <PostP>
        That doesn't make traditional programming obsolete. The cake still has to bake somewhere — Software 1.0 and 2.0 quietly run inside Software 3.0. But the centre of gravity is shifting. The most valuable skill is no longer just <em>how</em> to type the instructions. It's knowing what's worth asking for, and how to describe it well enough that the machine can do the rest.
      </PostP>
      <PostP>
        If you've ever written a really good email — clear ask, the right context, just enough background — you already have half the skill.
      </PostP>
    </>
  );
}
