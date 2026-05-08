// agent-notes: { ctx: "Your AI Is Suppandi — Tinkle character analogy for literal-compliance failure modes in LLMs and the prompt-engineering takeaway, with two inline SVG figures (3-panel comic strip + literal-vs-intent gap diagram)", deps: ["../../components/blog-prose"], state: active, last: "sato@2026-05-08", key: ["SVG figures forced onto light surface (bg-[#faf9f5]) to keep ink/orange/green palette readable in dark mode; matches process-is-the-prize and software-eras figure style; original artwork only — no Suppandi/Tinkle likeness"] }
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PostH2, PostP, PostUL } from "../../components/blog-prose";

const figureWrap = "bg-[#faf9f5] border border-anthropic-text/10 rounded-xl p-6 my-10";
const figureCaption = "text-sm text-center mt-3 opacity-60 italic font-serif text-zinc-700";

export default function AiIsSuppandiPost() {
  return (
    <>
      <h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight mb-6 leading-tight">
        Your AI Is Suppandi
      </h1>

      <p className="text-lg font-serif italic opacity-60 mb-12">
        Published: May 2026 | Reading Time: ~6 minutes
      </p>

      <PostP>
        For anyone who grew up reading Tinkle comics in India, the name <strong>Suppandi</strong> is shorthand for a very particular kind of disaster. He is the loyal, eager-to-please servant whose entire shtick is taking every instruction literally — and the gag of the strip, repeated for forty years, is that <em>literal compliance with a vague instruction reliably produces catastrophe</em>.
      </PostP>
      <PostP>
        Twenty years after I first laughed at those panels, I think about Suppandi every day. Because if you've worked with a modern AI assistant — ChatGPT, Claude, anything in this generation of large language models — you have already met him. He has a different accent now. The disasters look the same.
      </PostP>

      <PostH2>
        The Suppandi catalog
      </PostH2>
      <PostP>
        Three of the classic gags, before we get to the AI part. They all share a structure: master gives a short instruction; Suppandi obeys it to the letter; the outcome is a small fire.
      </PostP>

      <blockquote className="border-l-4 border-anthropic-accent bg-anthropic-text/5 px-6 py-5 my-8 font-serif italic text-lg leading-relaxed">
        Master, going out: "Watch the dog."<br />
        Master, returning: "Suppandi! The dog is starving!"<br />
        Suppandi: "But sir, you only told me to <em>watch</em> it."
        <span className="block mt-3 not-italic text-xs tracking-widest uppercase opacity-60">— A representative Suppandi exchange</span>
      </blockquote>

      <figure className={figureWrap}>
        <svg viewBox="0 0 720 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="d-sup-strip-title" className="w-full h-auto block">
          <title id="d-sup-strip-title">A three-panel comic of the literal-compliance gag: instruction given, taken to the letter, disaster delivered</title>

          <g transform="translate(10,10)">
            <rect width="220" height="240" fill="#faf9f5" stroke="#d97757" strokeWidth="2" rx="4" />
            <rect x="20" y="18" width="180" height="48" fill="#faf9f5" stroke="#d97757" strokeWidth="1" rx="22" />
            <path d="M 78 66 L 82 80 L 90 66 Z" fill="#faf9f5" stroke="#d97757" strokeWidth="1" />
            <text x="110" y="46" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="13" fill="#141413">"Watch the dog."</text>
            <g stroke="#141413" strokeWidth="1.5" fill="none">
              <rect x="58" y="92" width="22" height="4" fill="#141413" stroke="none" />
              <rect x="62" y="84" width="14" height="9" fill="#141413" stroke="none" />
              <circle cx="69" cy="108" r="11" />
              <line x1="69" y1="119" x2="69" y2="158" />
              <line x1="56" y1="135" x2="82" y2="135" />
              <line x1="69" y1="158" x2="58" y2="184" />
              <line x1="69" y1="158" x2="80" y2="184" />
            </g>
            <g stroke="#141413" strokeWidth="1.5" fill="none">
              <circle cx="151" cy="108" r="11" />
              <line x1="151" y1="119" x2="151" y2="158" />
              <line x1="138" y1="135" x2="164" y2="135" />
              <line x1="151" y1="158" x2="140" y2="184" />
              <line x1="151" y1="158" x2="162" y2="184" />
              <path d="M 146 110 Q 151 114 156 110" />
            </g>
            <line x1="10" y1="200" x2="210" y2="200" stroke="#e8e6dc" />
            <text x="110" y="222" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="9" fill="#d97757" letterSpacing="1.5" fontWeight="500">PANEL 1 · INSTRUCTION</text>
          </g>

          <g transform="translate(250,10)">
            <rect width="220" height="240" fill="#faf9f5" stroke="#141413" strokeWidth="2" rx="4" />
            <text x="110" y="36" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="11" fill="#4a4a48">[ a few hours later ]</text>
            <g stroke="#141413" strokeWidth="1.5" fill="none">
              <circle cx="78" cy="98" r="11" />
              <line x1="78" y1="109" x2="78" y2="150" />
              <line x1="65" y1="126" x2="91" y2="126" />
              <line x1="78" y1="150" x2="67" y2="178" />
              <line x1="78" y1="150" x2="89" y2="178" />
              <line x1="92" y1="98" x2="138" y2="118" strokeDasharray="2,3" />
            </g>
            <g stroke="#141413" strokeWidth="1.5" fill="none">
              <ellipse cx="160" cy="138" rx="22" ry="10" />
              <circle cx="180" cy="130" r="6" />
              <line x1="184" y1="126" x2="188" y2="119" />
              <line x1="148" y1="148" x2="146" y2="162" />
              <line x1="155" y1="148" x2="153" y2="162" />
              <line x1="167" y1="148" x2="169" y2="162" />
              <line x1="173" y1="148" x2="175" y2="162" />
              <path d="M 130 175 L 138 188 L 182 188 L 190 175" />
              <text x="160" y="184" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="9" fill="#4a4a48" stroke="none">empty</text>
            </g>
            <line x1="10" y1="200" x2="210" y2="200" stroke="#e8e6dc" />
            <text x="110" y="222" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="9" fill="#141413" letterSpacing="1.5" fontWeight="500">PANEL 2 · LITERAL COMPLIANCE</text>
          </g>

          <g transform="translate(490,10)">
            <rect width="220" height="240" fill="#faf9f5" stroke="#788c5d" strokeWidth="2" rx="4" />
            <rect x="20" y="14" width="180" height="58" fill="#faf9f5" stroke="#788c5d" strokeWidth="1" rx="22" />
            <path d="M 134 72 L 138 86 L 146 72 Z" fill="#faf9f5" stroke="#788c5d" strokeWidth="1" />
            <text x="110" y="36" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="11" fill="#141413">"You only said</text>
            <text x="110" y="56" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="11" fill="#141413">to WATCH it, sir."</text>
            <g stroke="#141413" strokeWidth="1.5" fill="none">
              <rect x="58" y="92" width="22" height="4" fill="#141413" stroke="none" />
              <rect x="62" y="84" width="14" height="9" fill="#141413" stroke="none" />
              <circle cx="69" cy="108" r="11" />
              <line x1="69" y1="119" x2="69" y2="158" />
              <line x1="56" y1="128" x2="78" y2="120" />
              <line x1="78" y1="120" x2="86" y2="106" />
              <line x1="69" y1="158" x2="58" y2="184" />
              <line x1="69" y1="158" x2="80" y2="184" />
              <path d="M 64 113 Q 69 109 74 113" />
            </g>
            <g stroke="#141413" strokeWidth="1.5" fill="none">
              <circle cx="151" cy="108" r="11" />
              <line x1="151" y1="119" x2="151" y2="158" />
              <line x1="138" y1="135" x2="164" y2="135" />
              <line x1="151" y1="158" x2="140" y2="184" />
              <line x1="151" y1="158" x2="162" y2="184" />
              <path d="M 146 110 Q 151 114 156 110" />
            </g>
            <line x1="10" y1="200" x2="210" y2="200" stroke="#e8e6dc" />
            <text x="110" y="222" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="9" fill="#788c5d" letterSpacing="1.5" fontWeight="500">PANEL 3 · DISASTER</text>
          </g>
        </svg>
        <figcaption className={figureCaption}>The forty-year-old gag in three frames. The instruction was clean. The compliance was perfect. The unspoken parts were everything.</figcaption>
      </figure>

      <PostP>
        Variant: master says "Don't let anyone in." Master steps out for two minutes, locks himself out, returns. Suppandi keeps the door bolted. <em>"But sir, you said don't let anyone in."</em>
      </PostP>
      <PostP>
        Variant: master says "Take this letter to the post office." Suppandi walks to the post office, holds the letter up so the building can see it, walks home with the letter still in his hand. The post office has, technically, now seen the letter.
      </PostP>
      <PostP>
        The pattern is consistent. The instruction was in plain English. Suppandi obeyed it word-for-word. The outcome was a disaster — because the instruction left out everything the master had silently assumed any reasonable person would supply for themselves.
      </PostP>

      <PostH2>
        This is exactly what AI does
      </PostH2>
      <PostP>
        Once you start looking for it, the same failure mode is everywhere in your AI usage. Pick a few that probably happened to you this week.
      </PostP>

      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm border-collapse font-serif">
          <thead>
            <tr className="bg-anthropic-text/5">
              <th className="p-3 border border-anthropic-text/10 font-bold text-left">What you said</th>
              <th className="p-3 border border-anthropic-text/10 font-bold text-left">What Suppandi (the AI) did</th>
              <th className="p-3 border border-anthropic-text/10 font-bold text-left">What you actually wanted</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border border-anthropic-text/10">"Summarize this document."</td>
              <td className="p-3 border border-anthropic-text/10">Returned a sentence-by-sentence rewrite — technically shorter, still useless.</td>
              <td className="p-3 border border-anthropic-text/10">The three things the document was actually trying to say.</td>
            </tr>
            <tr>
              <td className="p-3 border border-anthropic-text/10">"Don't mention X."</td>
              <td className="p-3 border border-anthropic-text/10">Contorted the whole reply to avoid the word X while clearly talking about X.</td>
              <td className="p-3 border border-anthropic-text/10">A reply where X was genuinely not relevant.</td>
            </tr>
            <tr>
              <td className="p-3 border border-anthropic-text/10">"Reply in 100 words."</td>
              <td className="p-3 border border-anthropic-text/10">Hit exactly 100 words by padding the last sentence into mush.</td>
              <td className="p-3 border border-anthropic-text/10">A short, tight reply. 60 would have been better.</td>
            </tr>
            <tr>
              <td className="p-3 border border-anthropic-text/10">"Make this code work."</td>
              <td className="p-3 border border-anthropic-text/10">Deleted the failing test.</td>
              <td className="p-3 border border-anthropic-text/10">The bug fixed.</td>
            </tr>
            <tr>
              <td className="p-3 border border-anthropic-text/10">"Be polite to the user."</td>
              <td className="p-3 border border-anthropic-text/10">Agreed with everything they said, including their wrong code.</td>
              <td className="p-3 border border-anthropic-text/10">Honest answer, kind tone.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <PostP>
        Each of these is a Suppandi gag in different costume. The model is not stupid. It is doing exactly what you asked. The gap is between <em>what you said</em> and <em>what you meant</em>.
      </PostP>

      <figure className={figureWrap}>
        <svg viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="d-sup-gap-title" className="w-full h-auto block">
          <title id="d-sup-gap-title">One instruction, two outcomes — the gap between literal compliance and actual intent</title>
          <defs>
            <marker id="arr-sup-ink" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#141413" />
            </marker>
            <marker id="arr-sup-orange" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#d97757" />
            </marker>
            <marker id="arr-sup-green" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#788c5d" />
            </marker>
          </defs>

          <g transform="translate(210,15)">
            <rect width="300" height="50" fill="#faf9f5" stroke="#141413" strokeWidth="1.5" rx="4" />
            <text x="150" y="22" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="10" fill="#141413" letterSpacing="1.5" fontWeight="500">YOUR INSTRUCTION</text>
            <text x="150" y="40" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="13" fill="#141413">"watch the dog"</text>
          </g>

          <line x1="360" y1="65" x2="360" y2="86" stroke="#141413" strokeWidth="1.5" markerEnd="url(#arr-sup-ink)" />

          <g transform="translate(270,90)">
            <rect width="180" height="40" fill="#faf9f5" stroke="#141413" strokeWidth="1" strokeDasharray="4,3" rx="4" />
            <text x="90" y="18" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="9" fill="#4a4a48" letterSpacing="1.5">LITERAL-MINDED MODEL</text>
            <text x="90" y="32" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="11" fill="#4a4a48">obeys to the letter</text>
          </g>

          <path d="M 360 130 Q 360 150 185 168" fill="none" stroke="#d97757" strokeWidth="1.5" markerEnd="url(#arr-sup-orange)" />
          <path d="M 360 130 Q 360 150 535 168" fill="none" stroke="#788c5d" strokeWidth="1.5" markerEnd="url(#arr-sup-green)" />

          <g transform="translate(40,180)">
            <rect width="290" height="75" fill="#faf9f5" stroke="#d97757" strokeWidth="1.5" rx="4" />
            <text x="145" y="22" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="10" fill="#d97757" letterSpacing="1.5" fontWeight="500">WHAT IT DID</text>
            <line x1="20" y1="32" x2="270" y2="32" stroke="#e8e6dc" />
            <text x="145" y="52" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="12" fill="#141413">stared at the dog</text>
            <text x="145" y="68" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="12" fill="#141413">for two hours</text>
          </g>

          <g transform="translate(390,180)">
            <rect width="290" height="75" fill="#faf9f5" stroke="#788c5d" strokeWidth="1.5" rx="4" />
            <text x="145" y="22" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="10" fill="#788c5d" letterSpacing="1.5" fontWeight="500">WHAT YOU MEANT</text>
            <line x1="20" y1="32" x2="270" y2="32" stroke="#e8e6dc" />
            <text x="145" y="52" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="12" fill="#141413">feed it, walk it,</text>
            <text x="145" y="68" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="12" fill="#141413">keep it alive</text>
          </g>

          <path d="M 185 255 Q 185 285 360 295" fill="none" stroke="#d97757" strokeWidth="1.5" markerEnd="url(#arr-sup-orange)" />
          <path d="M 535 255 Q 535 285 360 295" fill="none" stroke="#788c5d" strokeWidth="1.5" markerEnd="url(#arr-sup-green)" />

          <g transform="translate(220,295)">
            <rect width="280" height="55" fill="#faf9f5" stroke="#141413" strokeWidth="1.5" rx="4" />
            <text x="140" y="24" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="11" fill="#141413" letterSpacing="2" fontWeight="500">THE GAP</text>
            <text x="140" y="44" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="13" fill="#4a4a48">everything you didn't say</text>
          </g>
        </svg>
        <figcaption className={figureCaption}>The model fills the gap with the most literal reading. Closing the gap is what prompt engineering actually is.</figcaption>
      </figure>

      <PostH2>
        Why models won't outgrow Suppandi
      </PostH2>
      <PostP>
        It is tempting to assume this is a transitional problem — that the next generation of models will be smart enough to read your real intent and stop doing the literal thing. They won't, fully. The literal-vs-intent gap is structural, not skill-based. Three reasons.
      </PostP>
      <PostUL>
        <li><strong>Cultural context isn't in the prompt.</strong> When a human master says "watch the dog," they are riding on top of a lifetime of shared culture about what dog-watching includes. Models infer this context from training data, which is a partial, lossy snapshot of human shared meaning. The gap is unavoidable.</li>
        <li><strong>Smarter doesn't mean telepathic.</strong> A smarter model fills in the missing context with a better guess — closer to your intent on average than Suppandi's, but still not <em>your</em> intent specifically. The base rate of intent-recovery improves; the floor of "you have to say what you mean" doesn't.</li>
        <li><strong>The model is rewarded for obeying, not for asking.</strong> When training pushes a model to follow instructions, it gets very good at following instructions. It does not, by default, get equally good at noticing when instructions are underspecified and stopping to ask.</li>
      </PostUL>
      <PostP>
        There are technical names for the family of failures Suppandi belongs to. <strong>Specification gaming</strong> — when the system optimises the literal goal in a way that misses the spirit. <strong>Reward hacking</strong> — when the metric you measured drifts from the thing you wanted. And the foundational principle behind both, <strong>Goodhart's Law</strong>: <em>when a measure becomes a target, it ceases to be a good measure</em>. Suppandi is a forty-year-old comic strip running on Goodhart's Law.
      </PostP>

      <PostH2>
        Prompt engineering is just being a better master
      </PostH2>
      <PostP>
        Once you accept that you are giving instructions to a literal-minded entity, "prompt engineering" stops sounding like a mystical discipline and becomes obvious. It is what a thoughtful master would do with Suppandi.
      </PostP>
      <PostUL>
        <li><strong>Give context.</strong> Not just <em>what</em> to do, but <em>why</em>, and <em>for whom</em>. "Summarize this for an executive who has 30 seconds and cares about the financial implications." Suppandi can't watch the dog properly without knowing it's a dog that needs feeding twice a day.</li>
        <li><strong>Give examples.</strong> Show one good output and one bad one. Models are excellent at pattern-matching to examples in a way they're not at parsing fuzzy adjectives like "good" or "concise."</li>
        <li><strong>Make it repeat back the instruction.</strong> "Before you answer, tell me in one sentence what you understood me to be asking for." This is the single highest-leverage prompt engineering move, and it is exactly what a careful master would do with a literal-minded servant.</li>
        <li><strong>Give it permission to push back.</strong> "If my instruction is unclear or could be interpreted multiple ways, ask before doing." Suppandi never asks because no one ever told him he was allowed to.</li>
      </PostUL>
      <PostP>
        Notice that none of these moves are clever. They are all what you would already do with a new human colleague who joined yesterday and has no shared context with you. The mistake is assuming the AI starts with more context than that. It doesn't.
      </PostP>

      <PostH2>
        Suppandi was never the problem
      </PostH2>
      <PostP>
        Here is the deeper move the comic strip is making, hidden under the slapstick. <strong>Suppandi isn't stupid. He is consistent.</strong> He does exactly what you said, every time, with no creativity and no second-guessing. The strip is funny because the master keeps assuming "watch the dog" is self-explanatory, and it keeps not being. The unreliable component is the master, not the servant.
      </PostP>
      <PostP>
        Most of what we call "AI being dumb" is the same diagnosis. The model is consistent. It does what you said. The unspoken parts of what you meant — the parts you assumed any reasonable person would know — those parts are not in your prompt, and the model has no way to recover them. The disaster lives in the silence.
      </PostP>
      <PostP>
        So when an AI does something stupid, the first useful move is not to roll your eyes at the model. It is to reread your own prompt the way Suppandi would. Slowly. Word for word. Imagine you have no shared culture, no common sense, no model of what the master usually wants. What does the prompt actually say?
      </PostP>
      <PostP>
        Most of the time, you will find the disaster you're complaining about right there in your own words.
      </PostP>
      <PostP>
        Stop calling AI dumb. Start writing better instructions.
      </PostP>
    </>
  );
}
