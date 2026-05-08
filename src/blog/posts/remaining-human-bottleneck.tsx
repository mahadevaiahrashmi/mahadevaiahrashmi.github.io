// agent-notes: { ctx: "The Remaining Human Bottleneck — essay on what's left for humans once agents do the typing: what to build, why, how to direct, the durable role of taste, oversight, and underlying understanding, with one inline SVG figure (concentric rings of work)", deps: ["../../components/blog-prose"], state: active, last: "sato@2026-05-08", key: ["SVG figure forced onto light surface (bg-[#faf9f5]) to keep ink/orange/green palette readable in dark mode; matches floor-and-ceiling and ai-is-suppandi figure style; closing punchline: outsource thinking, not understanding"] }
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PostH2, PostP, PostUL } from "../../components/blog-prose";

const figureWrap = "bg-[#faf9f5] border border-anthropic-text/10 rounded-xl p-6 my-10";
const figureCaption = "text-sm text-center mt-3 opacity-60 italic font-serif text-zinc-700";

export default function RemainingHumanBottleneckPost() {
  return (
    <>
      <h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight mb-6 leading-tight">
        The Remaining Human Bottleneck
      </h1>

      <p className="text-lg font-serif italic opacity-60 mb-12">
        Published: May 2026 | Reading Time: ~6 minutes
      </p>

      <PostP>
        Agents got fast. The keyboard is no longer the rate-limiting step in any kind of software work. A team of agents on a strong harness will produce more code in an afternoon than a careful human could write in a week, and most of it will compile, most of it will pass tests, and most of it will look — at first glance — like the work of a thoughtful engineer.
      </PostP>
      <PostP>
        Which raises the obvious question. If the typing is solved, what is the human still doing? The honest answer is: three things that the model isn't yet allowed to decide on its own, and one thing that even agents at their best need a human to keep doing. The first three are the bottleneck. The fourth is the reason the bottleneck is durable.
      </PostP>

      <PostH2>
        What to build
      </PostH2>
      <PostP>
        Every agent is downstream of a brief. Until somebody — a human — states what we are trying to build, no model can grade itself, no test can be written, no architecture can be sketched. The brief is upstream of every signal the model uses to know it's making progress. No brief, no progress.
      </PostP>
      <PostP>
        And the brief is not "make a good thing." A useful brief is specific: <em>what's the user trying to do, in what context, with what constraints, and what does done look like.</em> An LLM cannot answer those questions for you, because answering them requires knowing your customers, your business, your runway, your team, your taste, and your constraints — none of which are in the model's training data.
      </PostP>
      <PostP>
        The skill of writing a good brief used to be lumped in with "product management" and treated as a soft, almost-clerical activity that real engineers tolerated. It is now upstream of everything. If you can't articulate what you want, no fleet of agents will produce it for you.
      </PostP>

      <PostH2>
        Why it's worth building
      </PostH2>
      <PostP>
        One layer up from <em>what to build</em> is <em>why</em>. This is the question almost no team takes seriously enough. Agents will happily build whatever you ask. They are completely indifferent to whether the thing is worth existing. ROI, strategy, opportunity cost, "should we even be in this market" — these are pure judgment calls, and the model has no opinion on them that you should trust.
      </PostP>
      <PostP>
        The danger of cheap typing is that it lets you build a lot of things that should not have been built. The brief is technically achievable. The agents execute. The system ships. And six months later you realise you spent a quarter of your team's attention on a feature nobody wanted, because it was trivially easy to ask for and the agent never pushed back. <em>Cheap building does not protect you from building the wrong thing.</em> If anything, it makes it more dangerous.
      </PostP>
      <PostP>
        The "why" question stays human. It has to. Strategic judgment is not in the substrate — and even if a future model were trained to be excellent at it, you would still want a human standing behind the call, because the consequences land on humans.
      </PostP>

      <PostH2>
        How to direct
      </PostH2>
      <PostP>
        Once you know what to build and why, the next bottleneck is direction. How do you get a fleet of agents to produce <em>this</em> system, the one you actually want, with the constraints that matter, in a way you can review?
      </PostP>
      <PostP>
        The shape of this work is different from old-school engineering. You are not typing the code; you are writing the spec, the tests, the architecture sketch, the review comment. Each of those is now the load-bearing artifact in a way it wasn't before. A slightly vague brief used to be fine because the engineer typing the code would supply the missing context from their own experience. A slightly vague brief now produces vague code, in volume, very fast. The vagueness compounds.
      </PostP>
      <PostP>
        Concretely, directing well looks like:
      </PostP>
      <PostUL>
        <li><strong>Engineer the spec with the agent.</strong> Spend a real conversation pinning the brief down. Get the agent to ask back the things you didn't say. Iterate the spec until what's on the page is what's in your head.</li>
        <li><strong>Have the agent document as it goes.</strong> The documentation is part of the deliverable, not something you write afterward. It's also the cheapest review surface — you can read the doc faster than the diff and catch most of the misunderstandings.</li>
        <li><strong>Hold a clear definition of "done."</strong> Tests passing isn't done. Demoable isn't done. The brief was satisfied — that's done. If "done" lives in your head, it doesn't exist.</li>
        <li><strong>Don't run on plan mode alone.</strong> A planning conversation is useful for ten minutes. After that, you need the agent doing the work, you need to be reading what it produces, and you need to course-correct as it goes. Plans that are not held against reality go stale fast.</li>
      </PostUL>

      <figure className={figureWrap}>
        <svg viewBox="0 0 720 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="d-rhb-rings-title" className="w-full h-auto block">
          <title id="d-rhb-rings-title">Concentric rings of software work, with outer rings handed to agents and the inner core staying human</title>

          <g transform="translate(360, 190)">
            <circle r="160" fill="#faf9f5" stroke="#d97757" strokeWidth="1" strokeDasharray="3,3" opacity="0.7" />
            <circle r="120" fill="#faf9f5" stroke="#d97757" strokeWidth="1.2" />
            <circle r="80" fill="#faf9f5" stroke="#788c5d" strokeWidth="1.5" />
            <circle r="40" fill="#faf9f5" stroke="#141413" strokeWidth="2" />

            <text x="0" y="-145" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="9" fill="#d97757" letterSpacing="1.5" fontStyle="italic">typing · syntax · boilerplate</text>
            <text x="0" y="-105" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="9" fill="#d97757" letterSpacing="1.5" fontWeight="500">AGENTS DO IT</text>

            <text x="0" y="-65" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="9" fill="#788c5d" letterSpacing="1.5" fontWeight="500">SHARED</text>
            <text x="0" y="-50" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="9" fill="#4a4a48">orchestration · review · spec</text>

            <text x="0" y="-12" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="10" fill="#141413" letterSpacing="2" fontWeight="500">HUMAN</text>
            <text x="0" y="4" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="11" fill="#141413">what · why</text>
            <text x="0" y="20" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="11" fill="#141413">how to direct</text>
          </g>

          <g transform="translate(20, 30)">
            <text x="0" y="0" fontFamily="Poppins, sans-serif" fontSize="10" fill="#141413" letterSpacing="1.5" fontWeight="500">THE RINGS</text>
            <text x="0" y="20" fontFamily="Lora, serif" fontSize="10" fill="#4a4a48" fontStyle="italic">outer rings: typing,</text>
            <text x="0" y="34" fontFamily="Lora, serif" fontSize="10" fill="#4a4a48" fontStyle="italic">syntax, debugging</text>
            <text x="0" y="56" fontFamily="Lora, serif" fontSize="10" fill="#4a4a48" fontStyle="italic">middle rings: review,</text>
            <text x="0" y="70" fontFamily="Lora, serif" fontSize="10" fill="#4a4a48" fontStyle="italic">spec, oversight</text>
            <text x="0" y="92" fontFamily="Lora, serif" fontSize="10" fill="#4a4a48" fontStyle="italic">inner core: intent,</text>
            <text x="0" y="106" fontFamily="Lora, serif" fontSize="10" fill="#4a4a48" fontStyle="italic">value, judgment</text>
          </g>

          <g transform="translate(560, 30)">
            <text x="0" y="0" fontFamily="Poppins, sans-serif" fontSize="10" fill="#141413" letterSpacing="1.5" fontWeight="500">THE TIDE</text>
            <text x="0" y="20" fontFamily="Lora, serif" fontSize="10" fill="#4a4a48" fontStyle="italic">outer rings move</text>
            <text x="0" y="34" fontFamily="Lora, serif" fontSize="10" fill="#4a4a48" fontStyle="italic">outward fastest</text>
            <text x="0" y="56" fontFamily="Lora, serif" fontSize="10" fill="#4a4a48" fontStyle="italic">middle rings move</text>
            <text x="0" y="70" fontFamily="Lora, serif" fontSize="10" fill="#4a4a48" fontStyle="italic">slowly, partially</text>
            <text x="0" y="92" fontFamily="Lora, serif" fontSize="10" fill="#4a4a48" fontStyle="italic">inner core stays</text>
            <text x="0" y="106" fontFamily="Lora, serif" fontSize="10" fill="#4a4a48" fontStyle="italic">where it is</text>
          </g>
        </svg>
        <figcaption className={figureCaption}>Software work in concentric rings. The outer ones — typing, syntax, debugging — are leaving us. The inner core — what to build, why, how to direct — is exactly where humans still earn their seat.</figcaption>
      </figure>

      <PostH2>
        What might leave the bottleneck
      </PostH2>
      <PostP>
        Honest aside. Some of the things we currently call "human" might leak out of the bottleneck over time. Two candidates worth watching.
      </PostP>
      <PostP>
        <strong>Aesthetic taste</strong> — what makes a system feel clean, what makes a UI feel right. If you can build a graders for these (humans rating outputs, models imitating those ratings), RL can push models toward the rated behaviour. We are partway there for code style and a long way there for visual design. It's not unreasonable to expect the model to develop something that functions like taste, on average, even if the underlying mechanism is just a learned distribution over what high-rated work looks like.
      </PostP>
      <PostP>
        <strong>Architectural judgment</strong> — what's a good factoring, where do the seams go, when does an abstraction earn its keep. Harder, because the verifier is more delayed (you only know if the architecture was right when the system has to change six months later) but not impossible. Long-horizon RL on real codebases could plausibly chip at this over the next few years.
      </PostP>
      <PostP>
        I don't say this to give up on those skills. I say it because being honest about which parts of "the human bottleneck" might shrink helps you focus on the parts that won't.
      </PostP>

      <PostH2>
        What can't leave
      </PostH2>
      <PostP>
        Two things stay human, and they stay human for a different reason than the rest.
      </PostP>
      <PostP>
        <strong>Oversight.</strong> Somebody has to be responsible. Somebody has to read the diff, look at the deployment, smell the brittleness, decide whether to ship. The agent will not catch its own most dangerous failure modes — by definition, the failures it would catch are the ones it would already have prevented. Oversight is not just review; it's accountability. The signature on the commit. Who is on the hook when this breaks at three in the morning. That role is structural, not skill-based, and it does not move.
      </PostP>
      <PostP>
        <strong>Underlying understanding.</strong> You need to know what the system is actually doing under the hood — not at the level of memorising syntax, but at the level of <em>this is copying memory around when it doesn't need to</em>, or <em>this is making N database calls when one would do</em>, or <em>this is a O(n²) loop hiding inside an innocent-looking helper</em>. The agent will write working code without understanding any of this. You need to understand it, because at scale or under stress these are the things that matter, and the agent has no native way to notice them.
      </PostP>
      <PostP>
        Underlying understanding is also what lets you spec well, review well, and direct well. The spec gets sharper because you know what's expensive. The review catches things because you know what to look for. The direction is precise because you know what the agent will trip over if you're not specific. Without it, you are not directing — you are typing instructions to an entity smarter than you about a system you don't actually understand. That ends badly.
      </PostP>

      <PostH2>
        Outsource thinking, not understanding
      </PostH2>
      <PostP>
        Here is the punchline, and it is the most important sentence in this essay.
      </PostP>
      <blockquote className="border-l-4 border-anthropic-accent bg-anthropic-text/5 px-6 py-5 my-8 font-serif italic text-lg leading-relaxed">
        You can outsource thinking. You cannot outsource understanding.
        <span className="block mt-3 not-italic text-xs tracking-widest uppercase opacity-60">— the durable bottleneck</span>
      </blockquote>
      <PostP>
        The model can do an enormous amount of the cognitive work — the drafting, the sketching, the considering of options, the writing of the code. That is "thinking" in its everyday sense, and it is genuinely outsourceable, and the people who try to keep doing it themselves will be slow.
      </PostP>
      <PostP>
        But understanding — the deep, internal, lived-in version where you know how the thing works, where its weaknesses are, what would surprise you, what wouldn't — that is yours. If you don't understand the domain, you cannot direct an agent in it. You cannot tell whether the agent's output is correct. You cannot decide what to ship. You become the weak link in your own system, and the agents will run circles around you in a direction you cannot evaluate.
      </PostP>
      <PostP>
        This is why the durable advice is the same advice that good engineers always gave each other, just under more pressure. <em>Know what your tools are doing. Read the code. Build small things from scratch sometimes. Don't paste in libraries you wouldn't be able to write yourself.</em> None of this is about typing. It's about keeping the part of you that understands alive, while the part of you that types fades into the background.
      </PostP>
      <PostP>
        That part of you is the bottleneck. It is also the entire point.
      </PostP>
    </>
  );
}
