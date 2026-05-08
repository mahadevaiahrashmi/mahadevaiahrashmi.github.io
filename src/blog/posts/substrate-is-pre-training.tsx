// agent-notes: { ctx: "The Substrate Is Pre-training — plain-English unpacking of Karpathy's framing that LLMs are statistical simulation circuits with RL bolted on, jagged frontier, treat as tool, with two inline SVG figures (substrate stack + jagged capability bars)", deps: ["../../components/blog-prose"], state: active, last: "sato@2026-05-08", key: ["SVG figures forced onto light surface (bg-[#faf9f5]) to keep ink/orange/green palette readable in dark mode; matches floor-and-ceiling and ai-is-suppandi figure style"] }
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PostH2, PostP, PostUL } from "../../components/blog-prose";

const figureWrap = "bg-[#faf9f5] border border-anthropic-text/10 rounded-xl p-6 my-10";
const figureCaption = "text-sm text-center mt-3 opacity-60 italic font-serif text-zinc-700";

export default function SubstrateIsPretrainingPost() {
  return (
    <>
      <h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight mb-6 leading-tight">
        The Substrate Is Pre-training
      </h1>

      <p className="text-lg font-serif italic opacity-60 mb-12">
        Published: May 2026 | Reading Time: ~7 minutes
      </p>

      <PostP>
        Andrej Karpathy has a line that has been rattling around my head for months. He describes today's AI systems as <em>statistical simulation circuits where the substrate is pre-training, and reinforcement learning is bolted on top.</em> It is one sentence, and once you really hear it, a lot of confusing things about modern AI stop being confusing.
      </PostP>
      <PostP>
        Most of the public discourse about these models — are they conscious, do they understand, will they take over — runs aground because it skips over what they actually <em>are</em>. The Karpathy framing is a useful corrective. Let me unpack it slowly, the way I wish someone had explained it to me when I was first trying to figure out what was going on.
      </PostP>

      <PostH2>
        Two words: substrate and pre-training
      </PostH2>
      <PostP>
        <strong>Substrate</strong> is the foundation. The base material something is built on. A house has a concrete substrate. A plant has a soil substrate. Whatever you build on top, it inherits the limits and shape of the thing underneath.
      </PostP>
      <PostP>
        <strong>Pre-training</strong> is the long, expensive first phase of building a modern language model. The model reads a few trillion tokens of text — books, papers, websites, code, transcripts, the public internet — and is asked, over and over, to predict the next word in the sequence. Nothing more. The model gets better at that one prediction task, and in the process, it builds an enormous internal map of how language tends to flow: grammar, common phrasings, factual associations, rhetorical structures, even reasoning styles.
      </PostP>
      <PostP>
        Put those together and Karpathy's claim becomes precise. <em>The foundation of today's AI is the statistical pattern-matching that fell out of predicting the next word, billions of times, across the readable internet.</em> The "brain" you talk to in the chat window is, at its base, those patterns.
      </PostP>

      <PostH2>
        And then RL is bolted on top
      </PostH2>
      <PostP>
        Pre-training alone gives you an unruly, sometimes brilliant, often offensive autocomplete. The model has read everything, and will happily continue any text you give it — including things you do not want it to continue. So the labs add a second, smaller, more deliberate layer on top: <strong>reinforcement learning</strong>. The model is shown which kinds of completions humans (or graders, or rules, or other models) prefer, and is nudged toward producing those.
      </PostP>
      <PostP>
        That is the layer that turns the unruly autocomplete into something that introduces itself politely, follows instructions, refuses bad requests, and tries to be useful. RL is not the foundation. It is the polish. A thin coat of social training painted onto a much larger, much messier statistical mass.
      </PostP>

      <figure className={figureWrap}>
        <svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="d-sub-stack-title" className="w-full h-auto block">
          <title id="d-sub-stack-title">A layer-cake diagram showing pre-training as the large statistical substrate and RL as a thin polish layer on top, producing the visible chatbot behaviour</title>
          <defs>
            <marker id="arr-sub-ink" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#141413" />
            </marker>
          </defs>

          <g transform="translate(140, 30)">
            <rect width="440" height="40" fill="#faf9f5" stroke="#141413" strokeWidth="1.5" rx="4" />
            <text x="220" y="18" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="10" fill="#141413" letterSpacing="2" fontWeight="500">WHAT YOU SEE</text>
            <text x="220" y="33" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="11" fill="#4a4a48">a polite, helpful chat assistant</text>
          </g>

          <line x1="360" y1="80" x2="360" y2="100" stroke="#141413" strokeWidth="1.2" strokeDasharray="2,3" />

          <g transform="translate(140, 100)">
            <rect width="440" height="46" fill="#faf9f5" stroke="#788c5d" strokeWidth="1.5" rx="4" />
            <text x="220" y="20" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="10" fill="#788c5d" letterSpacing="1.5" fontWeight="500">RL · "BOLTED ON TOP"</text>
            <text x="220" y="38" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="11" fill="#141413">helpfulness · instruction-following · refusal</text>
          </g>

          <line x1="360" y1="156" x2="360" y2="176" stroke="#141413" strokeWidth="1.2" strokeDasharray="2,3" />

          <g transform="translate(80, 176)">
            <rect width="560" height="120" fill="#faf9f5" stroke="#d97757" strokeWidth="1.8" rx="4" />
            <text x="280" y="22" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="11" fill="#d97757" letterSpacing="2" fontWeight="500">PRE-TRAINING · THE SUBSTRATE</text>
            <line x1="40" y1="32" x2="520" y2="32" stroke="#e8e6dc" />
            <text x="280" y="56" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="12" fill="#141413">trillions of tokens · next-token prediction</text>
            <text x="280" y="76" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="12" fill="#141413">grammar · facts · phrasings · reasoning styles</text>
            <text x="280" y="98" textAnchor="middle" fontFamily="Lora, serif" fontSize="11" fill="#4a4a48">a massive statistical map of how human text tends to flow</text>
            <text x="280" y="114" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="9" fill="#d97757" letterSpacing="1.5" fontWeight="500">no understanding required to be in here</text>
          </g>
        </svg>
        <figcaption className={figureCaption}>The big block does the work. The thin block on top makes it presentable. The chat window only shows you the topmost layer.</figcaption>
      </figure>

      <PostH2>
        Frontier labs are giant RL environments
      </PostH2>
      <PostP>
        If pre-training is read-the-internet, RL is sit-in-school. The labs design tasks where the model attempts something, and a verifier — a unit test, a math grader, a human, or another model — produces a reward. Right answer, plus one. Wrong answer, minus one. The model nudges its weights in the direction that earns more pluses next time.
      </PostP>
      <PostP>
        This works spectacularly well in domains where the verifier is sharp and cheap. Math problems are like that — either the answer matches or it doesn't. Code is like that — either the test passes or it doesn't. Logic puzzles, formal proofs, structured games — all of these have crisp reward signals, so the RL signal is loud, and the model improves visibly. <strong>Capability peaks where verification is easy.</strong>
      </PostP>
      <PostP>
        It works less well in domains where the verifier is fuzzy — taste, ethics, original research, novel insight, long-horizon planning. In those domains there's no automatic grader. Humans can rate, but humans are slow and inconsistent. So the RL signal is weak, the model improves more slowly, and capability lags. That mismatch is one of the most important things to understand about why these models are good at what they're good at.
      </PostP>

      <PostH2>
        The jagged frontier
      </PostH2>
      <PostP>
        The result is what people have started calling <strong>jagged capability</strong>. The model is genuinely brilliant at some tasks and surprisingly poor at others, with no smooth gradient between them. It can prove a hard theorem and then fail at a piece of common sense a six-year-old would handle. It can write a beautiful poem and then mis-add three small numbers.
      </PostP>
      <PostP>
        Once you have the substrate-and-RL framing, the jaggedness stops being mysterious. There are two reasons it shows up.
      </PostP>
      <PostUL>
        <li><strong>The labs choose the data distribution.</strong> They prioritise what to train on by ROI — what their customers ask for, what's publishable, what's measurable. Domains inside that distribution get a lot of attention; domains outside get whatever crumbs leaked into the pre-training corpus. There is no universal teacher. There is a small group of labs making prioritisation decisions, and you are at the mercy of those decisions.</li>
        <li><strong>Verifiability shapes the polish.</strong> RL rewards what can be graded. Math and code can be graded. Strategic judgment, aesthetic taste, original synthesis — much harder. The polish layer disproportionately strengthens the verifiable skills. The unverifiable ones drift.</li>
      </PostUL>
      <PostP>
        That's why the jaggedness lines up the way it does. The peaks tend to be in domains the labs invested in <em>and</em> that admit a sharp verifier. The valleys tend to be in domains the labs deprioritised, or that admit no clean verifier, or both.
      </PostP>

      <figure className={figureWrap}>
        <svg viewBox="0 0 720 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="d-sub-jagged-title" className="w-full h-auto block">
          <title id="d-sub-jagged-title">Capability bars across domains, peaking in math and code, dipping in common sense and original synthesis</title>
          <defs>
            <linearGradient id="grad-sub-orange" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#d97757" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#d97757" stopOpacity="0.85" />
            </linearGradient>
          </defs>

          <line x1="60" y1="240" x2="680" y2="240" stroke="#141413" strokeWidth="1" />
          <line x1="60" y1="60" x2="60" y2="240" stroke="#141413" strokeWidth="1" />

          <text x="40" y="68" textAnchor="end" fontFamily="Poppins, sans-serif" fontSize="9" fill="#4a4a48" letterSpacing="1.2">HIGH</text>
          <text x="40" y="244" textAnchor="end" fontFamily="Poppins, sans-serif" fontSize="9" fill="#4a4a48" letterSpacing="1.2">LOW</text>

          <text transform="rotate(-90)" x="-150" y="22" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="10" fill="#141413" letterSpacing="2" fontWeight="500">CAPABILITY</text>

          <g>
            <rect x="90" y="80" width="60" height="160" fill="url(#grad-sub-orange)" stroke="#d97757" strokeWidth="1" />
            <text x="120" y="258" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="10" fill="#141413">math</text>
            <text x="120" y="270" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="9" fill="#788c5d">verifiable</text>
          </g>

          <g>
            <rect x="170" y="92" width="60" height="148" fill="url(#grad-sub-orange)" stroke="#d97757" strokeWidth="1" />
            <text x="200" y="258" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="10" fill="#141413">code</text>
            <text x="200" y="270" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="9" fill="#788c5d">verifiable</text>
          </g>

          <g>
            <rect x="250" y="135" width="60" height="105" fill="url(#grad-sub-orange)" stroke="#d97757" strokeWidth="1" />
            <text x="280" y="258" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="10" fill="#141413">writing</text>
            <text x="280" y="270" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="9" fill="#4a4a48">fuzzy</text>
          </g>

          <g>
            <rect x="330" y="155" width="60" height="85" fill="url(#grad-sub-orange)" stroke="#d97757" strokeWidth="1" />
            <text x="360" y="258" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="10" fill="#141413">planning</text>
            <text x="360" y="270" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="9" fill="#4a4a48">fuzzy</text>
          </g>

          <g>
            <rect x="410" y="190" width="60" height="50" fill="url(#grad-sub-orange)" stroke="#d97757" strokeWidth="1" />
            <text x="440" y="258" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="10" fill="#141413">common sense</text>
            <text x="440" y="270" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="9" fill="#4a4a48">fuzzy · OOD</text>
          </g>

          <g>
            <rect x="490" y="105" width="60" height="135" fill="url(#grad-sub-orange)" stroke="#d97757" strokeWidth="1" />
            <text x="520" y="258" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="10" fill="#141413">SQL</text>
            <text x="520" y="270" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="9" fill="#788c5d">verifiable</text>
          </g>

          <g>
            <rect x="570" y="200" width="60" height="40" fill="url(#grad-sub-orange)" stroke="#d97757" strokeWidth="1" />
            <text x="600" y="258" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="10" fill="#141413">novel synthesis</text>
            <text x="600" y="270" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="9" fill="#4a4a48">no verifier</text>
          </g>

          <text x="370" y="50" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="11" fill="#4a4a48">capability peaks where verification is easy and the lab invested</text>
        </svg>
        <figcaption className={figureCaption}>The jagged frontier. Tall bars where the verifier is sharp and the labs invested. Short bars where neither is true.</figcaption>
      </figure>

      <PostH2>
        Working with a jagged tool
      </PostH2>
      <PostP>
        There is no manual for the jaggedness. The labs do not publish a per-domain capability map. You discover the peaks and valleys by using the tool and noticing what works. That is unusual for software — most tools have a documented surface, and you stay inside it. With LLMs, the surface is mottled, and the documentation is the conversation you just had.
      </PostP>
      <PostP>
        A few practical moves help.
      </PostP>
      <PostUL>
        <li><strong>Stay in the loop.</strong> Treat the model as a tool, not a colleague. Watch what it produces. Notice when the output smells off. The "off" is usually a signal that you've stepped into a valley.</li>
        <li><strong>Keep a mental map of the peaks.</strong> Math, structured code, well-trodden tasks — those are the slopes you can ski down fast. Original synthesis, taste, long-horizon planning, anything genuinely out-of-distribution — those need more of your attention and more verification.</li>
        <li><strong>If the domain is verifiable but out-of-distribution, build the RL.</strong> You can sometimes drag a model up a valley by constructing examples and fine-tuning. It's expensive, but it's a knob you have.</li>
        <li><strong>If the domain is not verifiable, expect to do the verification yourself.</strong> The model can draft, but you have to grade. There's no way around the grading; the labs can't grade what nobody can grade.</li>
      </PostUL>

      <PostH2>
        Ghosts, not animals
      </PostH2>
      <PostP>
        The other Karpathy line worth keeping is that these systems are <em>ghosts</em>, not animals. Animals are shaped by evolution and biology — they have bodies, drives, real continuity, real curiosity, real fear. They got smart by surviving. LLMs got "smart" by absorbing the textual residue of animals that were doing all of that, and learning to imitate it. They are simulations of intelligence, not instances of it. The thing on the other side of the chat window is closer to a haunted library than a creature.
      </PostP>
      <PostP>
        This isn't a metaphor that diminishes them. A ghostly statistical engine that has read everything humans ever wrote is still genuinely useful, sometimes startling, occasionally beautiful. But it explains why they can be brilliant in one breath and embarrassing in the next: there is no continuous mind underneath, only a probability distribution over what a competent human <em>would</em> say next, sampled through the polish layer the lab installed.
      </PostP>
      <PostP>
        Once you really hold this picture, you stop being surprised by either the brilliance or the cliff-fall stupidity. You expect both. You use the tool for the slopes it can ski and you grade the output for the slopes it can't. You stop asking it to understand. You ask it to produce — and you do the understanding yourself.
      </PostP>
      <PostP>
        The substrate is pre-training. The polish is RL. Everything else is you.
      </PostP>
    </>
  );
}
