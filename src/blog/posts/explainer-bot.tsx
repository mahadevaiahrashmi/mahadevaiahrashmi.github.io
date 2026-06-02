// agent-notes: { ctx: "Explainer Bot project case-study blog post content", deps: ["../../components/blog-prose"], state: active, last: "sato@2026-06-02", key: ["draft case study; recruiter-facing framing for Applied AI/ML + AI PM roles; facts sourced from github.com/mahadevaiahrashmi/explainer-bot README"] }
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PostH2, PostP, PostUL, PostOL } from "../../components/blog-prose";

export default function ExplainerBotPost() {
  return (
    <>
      <h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight mb-6 leading-tight">
        Explainer Bot: From Rough Notes to a Narrated Video
      </h1>

      <p className="text-lg font-serif italic opacity-60 mb-12">
        Rough points in, a finished explainer video out — scripted and storyboarded by an LLM, narrated in your own voice.
      </p>

      <PostP>
        A good explainer video is several jobs stacked on top of each other: write a script, storyboard the slides, record a clean voiceover, and edit it all together. Each is a skill, each takes time, and the friction is exactly why most rough ideas never become anything watchable. <strong>Explainer Bot</strong> removes the parts a machine does well and keeps the one part that should stay human — your voice. It's inspired by the 3Blue1Brown style: short slides, vivid analogies, a genuine sense of wonder.
      </PostP>

      <PostH2>How the Pipeline Works</PostH2>

      <PostP>
        The system runs in three stages, each producing an artifact you can inspect and correct before moving on — not one opaque "make me a video" button:
      </PostP>

      <PostOL>
        <li><strong>Script + critique.</strong> An LLM turns your rough points into a segmented script, then critiques its own draft to sharpen it before going further.</li>
        <li><strong>Slides.</strong> It designs one HTML slide per segment. You preview each in an iframe, edit the HTML directly in a textarea, and re-render to update the image — full control without leaving the tool.</li>
        <li><strong>Cue video.</strong> The slides are assembled into a cue video plus a <code>script.txt</code>. You record audio for each slide in your own voice, drop the files into an <code>audio/</code> folder, and the bot renders the final <code>video.mp4</code>.</li>
      </PostOL>

      <div className="grid md:grid-cols-3 gap-6 my-12">
        <div className="p-6 bg-anthropic-text/5 border border-anthropic-text/10 rounded-xl">
          <h3 className="font-serif text-xl mb-2">Your voice</h3>
          <p className="opacity-80">No synthetic narration. The bot builds a cue video so you record the voiceover yourself — authenticity over a robotic read.</p>
        </div>
        <div className="p-6 bg-anthropic-text/5 border border-anthropic-text/10 rounded-xl">
          <h3 className="font-serif text-xl mb-2">Editable slides</h3>
          <p className="opacity-80">Slides are HTML you can preview and edit in place, then re-render — the AI drafts, you keep the last word.</p>
        </div>
        <div className="p-6 bg-anthropic-text/5 border border-anthropic-text/10 rounded-xl">
          <h3 className="font-serif text-xl mb-2">Web or terminal</h3>
          <p className="opacity-80">Every stage is available from both a web UI and a terminal UI, with three swappable LLM backends behind them.</p>
        </div>
      </div>

      <PostH2>The Applied-AI Decisions</PostH2>

      <PostP>
        The hard part of a creative-generation pipeline isn't getting a model to produce <em>something</em> — it's keeping a human in the loop at the moments that matter, so the output is theirs and not the model's.
      </PostP>

      <PostUL>
        <li><strong>Keep the human voice.</strong> The obvious shortcut is text-to-speech. This tool deliberately doesn't — it produces a cue video, teleprompter-style, so the creator narrates in their own voice. A product judgment that trades convenience for authenticity.</li>
        <li><strong>Inspect-and-edit between stages.</strong> Script, slides, and cue video are each a reviewable, editable artifact. Generation you can correct mid-pipeline beats generation you can only accept or reject.</li>
        <li><strong>Self-critique for quality.</strong> The script stage drafts and then critiques itself before producing slides — a cheap, effective way to raise output quality without a human in the first loop.</li>
        <li><strong>Backend-agnostic.</strong> It auto-detects and runs against Claude CLI, a local Ollama server, or a provider-agnostic LLM CLI — no single-vendor lock-in.</li>
      </PostUL>

      <PostH2>Why It Matters</PostH2>

      <PostP>
        As a product, it removes the production bottleneck between having an idea and having something worth sharing — while keeping the creator's voice and final say. As an engineering artifact, it's a working multi-stage generation pipeline with human-in-the-loop checkpoints, self-critique, and a pluggable model layer. Built in Python on FastAPI and Pydantic, with both a web and a terminal interface.
      </PostP>
    </>
  );
}
