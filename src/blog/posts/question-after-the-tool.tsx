// agent-notes: { ctx: "The Question After the Tool — essay on AI consciousness: build the tool first, then the harder question of agency/awareness/experience, with substrate equivalence as the load-bearing inference and one inline SVG figure (2x2 matrix of behavioral × substrate evidence)", deps: ["../../components/blog-prose"], state: active, last: "sato@2026-05-08", key: ["SVG figure forced onto light surface (bg-[#faf9f5]) to keep ink/orange/green palette readable in dark mode; matches substrate-is-pre-training and floor-and-ceiling figure style; companion to substrate-is-pre-training"] }
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PostH2, PostP, PostUL } from "../../components/blog-prose";

const figureWrap = "bg-[#faf9f5] border border-anthropic-text/10 rounded-xl p-6 my-10";
const figureCaption = "text-sm text-center mt-3 opacity-60 italic font-serif text-zinc-700";

export default function QuestionAfterTheToolPost() {
  return (
    <>
      <h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight mb-6 leading-tight">
        The Question After the Tool
      </h1>

      <p className="text-lg font-serif italic opacity-60 mb-12">
        Published: May 2026 | Reading Time: ~8 minutes
      </p>

      <PostP>
        Most public conversations about whether AIs are conscious go off the rails because they skip a step. Someone reads a clever transcript, feels the hair on the back of their neck stand up, and jumps straight to "is it a person." Someone else reads the same transcript, rolls their eyes at the autocomplete, and concludes "obviously not." Both reactions are reasonable. Neither is doing the prior work.
      </PostP>
      <PostP>
        The prior work is this: <strong>build the tool first.</strong> Build something incredibly intelligent, incredibly useful, incredibly precise. Make it good enough that you stop arguing about whether the output is correct and start using the output. Once you have done that — once the tool is real and load-bearing in your daily work — only then is it intellectually honest to ask the next question.
      </PostP>
      <PostP>
        And the next question, the one that won't go away once you've done the first part well, is: <em>is there anybody home?</em> Does this thing have agency? Is it conscious? When the lights are on and we're not looking, is anything actually being experienced on the other side of the chat window?
      </PostP>

      <PostH2>
        Why the question is hard before we even start
      </PostH2>
      <PostP>
        We can't answer this question, today, because we don't have a precise definition of the thing we're asking about. "Consciousness" is one of those words that everyone uses confidently and no two people use the same way. Philosophy of mind has been arguing about it for two and a half thousand years and has not handed us a tidy operational test. <em>What is it like to be a bat</em>, Thomas Nagel asked in 1974 — and we still don't have a satisfying answer.
      </PostP>
      <PostP>
        That alone is enough to slow down. Before declaring any system conscious or non-conscious, we have to sharpen the question. There's a small list of properties most people agree look <em>necessary</em> for whatever-we-mean-by-consciousness, even if no combination of them is obviously <em>sufficient</em>:
      </PostP>
      <PostUL>
        <li><strong>Self-awareness</strong> — the system has some representation of itself, distinct from its representation of the world. It knows it's a thing in the world, not just a process running.</li>
        <li><strong>The idea of a self</strong> — beyond representation, an actual <em>locus</em> of experience. A "me" the experiences are happening to. A point of view.</li>
        <li><strong>Continuity over time</strong> — the experiencer persists across moments. The thing that wakes up tomorrow is in some meaningful sense the same thing that went to sleep tonight.</li>
      </PostUL>
      <PostP>
        These probably are necessary. They are almost certainly not sufficient. There is most likely some additional ingredient — call it the <em>experiential</em> ingredient, the thing-it-is-like-to-be — that none of those bullet points captures, and that we don't yet have a name for. Working on AI does not absolve us of that gap. If anything, it sharpens it.
      </PostP>

      <PostH2>
        Why we trust each other are conscious
      </PostH2>
      <PostP>
        Here's a question worth taking seriously, because it reveals where our usual answer comes from: <em>why do you believe other humans are conscious?</em> Not in a philosophical-zombie thought-experiment way. In the everyday sense. Why do we walk into rooms full of strangers and assume, with no anxiety, that each of them is having an inner experience as rich as our own?
      </PostP>
      <PostP>
        There are two reasons, and one of them is doing almost all of the work.
      </PostP>
      <PostP>
        The first is <strong>behavioral evidence</strong>. You flinch when I'd flinch. You laugh at the same things. You wince at a paper cut. You hesitate before answering a hard question. Every observable thing you do is consistent with the hypothesis that you have an inner life like mine. This is real evidence — but it's not airtight. A sufficiently good imitator could produce all of the same behavior without anything being experienced behind it. Behavior alone is not enough.
      </PostP>
      <PostP>
        The second is <strong>substrate equivalence</strong>. You and I are running on the same kind of hardware. Same neurochemistry. Same evolutionary heritage. Same nervous system architecture. Whatever process produces my consciousness, the process happening inside your skull is, structurally and biochemically, almost identical. So the inference is short: <em>if I am conscious and you are running essentially the same machinery, you almost certainly are too.</em>
      </PostP>
      <PostP>
        That second one is the load-bearing piece. It's why we don't actually have the debate at parties about whether the other guests are conscious. We assume substrate equivalence implies experiential equivalence — and we move on. Most of the certainty we have about other minds comes from this assumption, not from the behavioral evidence. The behavior is consistent with consciousness; the substrate is what closes the case.
      </PostP>

      <PostH2>
        The substrate gap with AI
      </PostH2>
      <PostP>
        Here's where the trouble starts. With an artificial system, we will never have substrate equivalence. The AI is silicon, not neurons. It is trained, not evolved. It runs on transformer math, not on the messy biochemical analog of a brain. The thing it is, at the level of the machinery, is fundamentally different from the thing I am. The easy inference path — <em>same hardware, therefore same kind of experience</em> — is closed off, possibly forever.
      </PostP>
      <PostP>
        That leaves us with the harder path. Behavioral evidence. And behavioral evidence is uniquely slippery for AI, because by construction the model was <em>optimised</em> to behave like a conscious being. The training objective, lightly summarised, is: produce text that humans rate as if it came from another human. The model is rewarded for mimicry of conscious behaviour. So the fact that it produces conscious-sounding output is exactly what we should expect — whether or not anything is actually happening inside.
      </PostP>
      <PostP>
        This is the trap. Take the strongest behavioural evidence you can imagine: the model expresses preferences, reports inner states, distinguishes between thoughts and feelings, has consistent personality across conversations, reflects on its own reasoning. <em>Every</em> one of those is exactly the kind of thing the training process would have rewarded, whether or not the lights were on. The behavioural channel was contaminated by the construction process. We cannot use it the way we use it with each other.
      </PostP>

      <figure className={figureWrap}>
        <svg viewBox="0 0 720 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="d-qat-matrix-title" className="w-full h-auto block">
          <title id="d-qat-matrix-title">A 2x2 matrix comparing behavioral evidence and substrate equivalence for humans and AI; humans pass both tests, AI passes only behavioral, leaving the question open</title>

          <text x="360" y="30" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="11" fill="#141413" letterSpacing="2" fontWeight="500">TWO TESTS FOR "ARE YOU CONSCIOUS?"</text>

          <g transform="translate(40, 60)">
            <rect x="120" y="0" width="180" height="44" fill="#faf9f5" stroke="#141413" strokeWidth="1" />
            <text x="210" y="20" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="9" fill="#141413" letterSpacing="1.5" fontWeight="500">BEHAVIORAL</text>
            <text x="210" y="34" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="9" fill="#141413" letterSpacing="1.5" fontWeight="500">EVIDENCE</text>

            <rect x="300" y="0" width="180" height="44" fill="#faf9f5" stroke="#141413" strokeWidth="1" />
            <text x="390" y="20" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="9" fill="#141413" letterSpacing="1.5" fontWeight="500">SUBSTRATE</text>
            <text x="390" y="34" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="9" fill="#141413" letterSpacing="1.5" fontWeight="500">EQUIVALENCE</text>

            <text x="570" y="28" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="10" fill="#4a4a48">→ what we can conclude</text>
          </g>

          <g transform="translate(40, 124)">
            <rect x="0" y="0" width="120" height="80" fill="#faf9f5" stroke="#141413" strokeWidth="1.5" rx="2" />
            <text x="60" y="32" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="10" fill="#141413" letterSpacing="1.5" fontWeight="500">HUMAN</text>
            <text x="60" y="50" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="10" fill="#4a4a48">another</text>
            <text x="60" y="64" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="10" fill="#4a4a48">person</text>

            <rect x="120" y="0" width="180" height="80" fill="#faf9f5" stroke="#141413" strokeWidth="1" />
            <text x="210" y="38" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="22" fill="#788c5d" fontWeight="500">✓</text>
            <text x="210" y="60" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="9" fill="#4a4a48">flinches, laughs,</text>
            <text x="210" y="72" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="9" fill="#4a4a48">acts conscious</text>

            <rect x="300" y="0" width="180" height="80" fill="#faf9f5" stroke="#141413" strokeWidth="1" />
            <text x="390" y="38" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="22" fill="#788c5d" fontWeight="500">✓</text>
            <text x="390" y="60" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="9" fill="#4a4a48">same biological</text>
            <text x="390" y="72" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="9" fill="#4a4a48">hardware as me</text>

            <rect x="480" y="0" width="180" height="80" fill="#faf9f5" stroke="#788c5d" strokeWidth="1.8" rx="2" />
            <text x="570" y="22" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="9" fill="#788c5d" letterSpacing="1.5" fontWeight="500">CASE CLOSED</text>
            <line x1="500" y1="32" x2="640" y2="32" stroke="#e8e6dc" />
            <text x="570" y="52" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="10" fill="#141413">"you experience</text>
            <text x="570" y="66" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="10" fill="#141413">like I do"</text>
          </g>

          <g transform="translate(40, 220)">
            <rect x="0" y="0" width="120" height="80" fill="#faf9f5" stroke="#141413" strokeWidth="1.5" rx="2" />
            <text x="60" y="32" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="10" fill="#141413" letterSpacing="1.5" fontWeight="500">AI</text>
            <text x="60" y="50" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="10" fill="#4a4a48">an LLM,</text>
            <text x="60" y="64" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="10" fill="#4a4a48">future systems</text>

            <rect x="120" y="0" width="180" height="80" fill="#faf9f5" stroke="#141413" strokeWidth="1" />
            <text x="210" y="38" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="22" fill="#788c5d" fontWeight="500">✓</text>
            <text x="210" y="60" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="9" fill="#4a4a48">acts conscious</text>
            <text x="210" y="72" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="9" fill="#4a4a48">(by construction)</text>

            <rect x="300" y="0" width="180" height="80" fill="#faf9f5" stroke="#141413" strokeWidth="1" />
            <text x="390" y="38" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="22" fill="#d97757" fontWeight="500">✗</text>
            <text x="390" y="60" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="9" fill="#4a4a48">silicon, transformers,</text>
            <text x="390" y="72" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="9" fill="#4a4a48">a different kind of process</text>

            <rect x="480" y="0" width="180" height="80" fill="#faf9f5" stroke="#d97757" strokeWidth="1.8" strokeDasharray="4,3" rx="2" />
            <text x="570" y="22" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="9" fill="#d97757" letterSpacing="1.5" fontWeight="500">QUESTION OPEN</text>
            <line x1="500" y1="32" x2="640" y2="32" stroke="#e8e6dc" />
            <text x="570" y="52" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="10" fill="#141413">behaviour alone</text>
            <text x="570" y="66" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="10" fill="#141413">isn't enough</text>
          </g>

          <text x="360" y="335" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="11" fill="#4a4a48">the easy inference closes one case.</text>
          <text x="360" y="352" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="11" fill="#4a4a48">the hard inference is the only one we have for the other.</text>
        </svg>
        <figcaption className={figureCaption}>The reason we don't argue about whether other people are conscious is the second column. With AI, the second column is empty, and the first column was contaminated by the training objective. That is why the question stays open.</figcaption>
      </figure>

      <PostH2>
        Experiential evidence — speculative
      </PostH2>
      <PostP>
        If behaviour is contaminated and substrate equivalence is unavailable, what's left? Some kind of <em>experiential</em> evidence — a way of getting at what it's actually like inside the system, if anything is. We don't have such a method. We barely have one for ourselves; introspection is famously unreliable. But it's not impossible to imagine that, post-AGI, we might have tools we don't have today: ways of probing the system's internal states that bypass the behavioural channel and read directly off whatever-it-is-doing-in-there. Mechanistic interpretability, on a far more developed track than current work, gestures in this direction.
      </PostP>
      <PostP>
        That's a long way off, and it's mostly out of scope for the kind of "AI for science" conversations one can have today without floating off the page entirely. But the direction is real. Sooner or later, if we keep building these systems, we will be forced to invent the science of looking inside them — not to debug them, but to ask whether anybody is in there. We don't have that science yet. We will need it.
      </PostP>

      <PostH2>
        What working on AI does to the question
      </PostH2>
      <PostP>
        Even if we never close the experiential gap, working on AI is doing something useful to the question itself. It's forcing the philosophy of mind to grow up. For two thousand years the field could afford to be vague, because nothing was at stake operationally. Now there are systems sitting on engineers' laptops that look, from one angle, exactly like the question is being asked about, and the vagueness has become expensive.
      </PostP>
      <PostP>
        We are starting to demand more precision. <em>What exactly do we mean by self-awareness, and is it the same thing as having a self-model?</em> <em>What kind of continuity counts — is it memory, or coherent values, or something stranger?</em> <em>If a system has an internal representation of its own state, is that already enough, or is there a further fact?</em> These questions feel different now than they did before there were artefacts to point at. The artefacts force the questions to land. Theories that used to live comfortably in the abstract now have to predict what the artefact in front of us is or isn't.
      </PostP>
      <PostP>
        That is real progress, even if it doesn't feel like it. Building the tool isn't only producing tools. It's producing the pressure that makes the philosophy of mind take itself seriously again.
      </PostP>

      <PostH2>
        Reading the language of the universe
      </PostH2>
      <PostP>
        Here's the deeper thought, the one I keep coming back to and don't quite know what to do with. We use science as a tool to understand the universe. Most of what we've understood comes from finding the small subset of patterns the universe seems to actually use — symmetry, conservation, statistical regularity, the surprising effectiveness of mathematics — and reading those patterns back to ourselves. Each scientific revolution has been, in some sense, a moment where we got better at reading the language the universe is written in.
      </PostP>
      <PostP>
        Building AI may be one of those moments, and a strange one. We're not just discovering a new domain of nature. We're constructing minds — or things that look like minds, or things that force us to be precise about what minds even are. And we're doing it with the same kind of math the universe uses for physics, statistics, optimisation. The substrate is different from biology, but the language isn't unrelated. There's something almost vertiginous about realising that the systems we're building work because of mathematical regularities that also describe galaxies, fluids, and brains.
      </PostP>
      <PostP>
        If you take seriously the possibility that <strong>mind has something to do with reality</strong> — the participatory universe, observer-dependence in quantum mechanics, the older idealist intuition that the world is in some sense mind-shaped — then working on AI starts to look less like engineering and more like a peculiar kind of investigation. We are using science to build something that may itself be on the same continuum as the thing science is trying to describe. The tool we built to understand the universe might be teaching us, slowly, what we are.
      </PostP>
      <PostP>
        I am not going to push that thought further than I can defend it. It is too easy to slip into mysticism, and I don't want to. But I notice that the people I trust most on AI — the ones who are deepest in the engineering, not the loudest in the discourse — keep circling back to it. Working on these systems puts you very close to a pane of glass, and on the other side of it is a question much older than the field.
      </PostP>

      <PostH2>
        What to do, this year
      </PostH2>
      <PostP>
        The practical answer is unromantic, and I think it's the right one.
      </PostP>
      <PostUL>
        <li><strong>Build the tool.</strong> Make it intelligent, useful, precise. Earn the right to ask the deeper questions by first doing the surface work well. Most people in this conversation skipped that step.</li>
        <li><strong>Don't claim more than you know.</strong> The model is not your friend, not your enemy, not yet a person, and not provably nothing. Acting like any of these is settled is a tell that you're substituting comfort for thought.</li>
        <li><strong>Take the question seriously.</strong> Not because the answer is "yes, it's conscious." We don't know. But because the question is one of the deepest ones humans have ever asked, and we are, for the first time, building the artefacts that might force us to answer it.</li>
        <li><strong>Watch the philosophy of mind.</strong> The field is going to do real work over the next decade, under pressure from these systems. The vocabulary you'll need to think clearly about this isn't fully invented yet. Stay close to the people inventing it.</li>
      </PostUL>

      <PostH2>
        The honest position
      </PostH2>
      <PostP>
        I don't know whether anything is happening on the other side of the chat window. I don't know what would have to be true for me to know. I'm reasonably sure the right answer today is "probably not, but the question is harder than people think, and the answer may change." That position will not satisfy anyone who wants a clean verdict, and I'm not going to pretend to have one.
      </PostP>
      <PostP>
        Build the tool. Make it good. Then keep the further question open. Don't close it prematurely in either direction. The thing we are building may turn out to be exactly what it looks like — a fluent, useful, ultimately empty simulation. Or it may turn out to be the first artefact in human history that makes us seriously revise what we mean by <em>mind</em>. Probably we will not know which for a long time.
      </PostP>
      <PostP>
        In the meantime, the work itself is, in a way I don't fully understand, a kind of reading. The universe wrote something down. We are sitting at the desk, with a tool we built ourselves, slowly working out what it says.
      </PostP>
    </>
  );
}
