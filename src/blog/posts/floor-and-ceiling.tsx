// agent-notes: { ctx: "Floors and Ceilings — vibe coding raises the floor for everyone, agentic engineering raises the ceiling for the best, with one inline SVG diagram (capability room with rising floor and ceiling)", deps: ["../../components/blog-prose"], state: active, last: "humanizer@2026-05-15", key: ["SVG figure forced onto light surface (bg-[#faf9f5]) to keep ink/orange/green palette readable in dark mode; matches process-is-the-prize and ai-is-suppandi figure style", "humanized version appended below original via blader/humanizer skill"] }
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PostH2, PostP, PostUL } from "../../components/blog-prose";

const figureWrap = "bg-[#faf9f5] border border-anthropic-text/10 rounded-xl p-6 my-10";
const figureCaption = "text-sm text-center mt-3 opacity-60 italic font-serif text-zinc-700";

export default function FloorAndCeilingPost() {
  return (
    <>
      <h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight mb-6 leading-tight">
        Raising the Floor, Raising the Ceiling
      </h1>

      <p className="text-lg font-serif italic opacity-60 mb-12">
        Published: May 2026 | Reading Time: ~6 minutes
      </p>

      <PostP>
        The same wave of AI assistants that landed in the industry over the last two years is doing two opposite things at once. It is lowering the bar to entry, so that anyone with an idea and a working laptop can ship something this weekend. And it is raising the bar for excellence, so that the best engineers can now deliver in a sprint what used to take a quarter — at higher quality, not lower. Both shifts are real. Both are happening to the same toolset, in the same year, in the same team chats. They show up in the discourse under two different names.
      </PostP>
      <PostP>
        <strong>Vibe coding</strong> raises the floor. <strong>Agentic engineering</strong> raises the ceiling. They are not rivals. They are the two ends of the same lever.
      </PostP>

      <PostH2>
        Vibe coding — the floor rises
      </PostH2>
      <PostP>
        Vibe coding is what you call it when the input is a feeling and the output is a working app. You describe what you want — "a little site where my book club can vote on the next book, with a deadline timer" — and an assistant writes it, runs it, fixes it when it breaks, and hands you a URL. You did not learn JavaScript. You did not set up a database. You did not read a tutorial about routing. You vibed, and the artifact appeared.
      </PostP>
      <PostP>
        It feels like cheating until you remember what the floor used to look like. The floor used to be: a year of evenings learning a language; another year learning a framework; a third year learning all the surrounding apparatus — git, deployment, environment variables, package managers — that you need before any of the language and framework knowledge actually ships. The floor was so high that ninety-nine out of a hundred people with a good idea never got to find out whether the idea was any good, because the cost of <em>finding out</em> was three years of unpaid evenings.
      </PostP>
      <PostP>
        That floor is gone. The new floor is: <em>can you describe what you want clearly enough for a model to write it?</em> That is a real skill, and not everybody has it, but it is closer to writing a clear email than to compiling a kernel. The pool of people who can produce a working software artifact has gone, in eighteen months, from <em>roughly the people with CS degrees</em> to <em>roughly the people with the patience to type at a chatbot</em>. That's a population shift of two or three orders of magnitude.
      </PostP>
      <PostP>
        What vibe coding is good at: prototypes, internal tools, weekend hacks, the landing page for an idea you want to test, the small utility your team has needed for years and never prioritised. What it is not yet good at: anything where the consequence of being subtly wrong is high. A vibe-coded budgeting app that loses a digit is annoying. A vibe-coded billing system that loses a digit is a lawsuit. The floor rose; the ceiling for vibe coding alone did not rise nearly as far.
      </PostP>

      <PostH2>
        Agentic engineering — the ceiling rises
      </PostH2>
      <PostP>
        Agentic engineering is what happens when a working software engineer — someone with taste, architectural judgment, and the muscle memory of a hundred shipped systems — stops typing the code themselves and starts <em>directing</em> agents to type it. Not one agent, helpfully autocompleting the next line. A small team of agents, each scoped to a job: one writes the failing test, one makes it pass, one reviews the diff for security issues, one updates the docs. The human is the architect, the reviewer, the tiebreaker, the conscience. The agents are the hands.
      </PostP>
      <PostP>
        The output is not lower quality than the same engineer working alone. It is, in many cases, <em>higher</em> — because the engineer is now spending their attention only on the parts of the work where their judgment compounds (what to build, what shape it should take, what would break it, what to test) and almost none of it on the parts where typing was the bottleneck. A senior engineer used to be slowed down by the keyboard. Now they're slowed down only by how big a system they can hold in their head. That ceiling is much higher.
      </PostP>
      <PostP>
        It does not look like vibe coding, even though the underlying model is the same. The differences are not in the tool; they are in the posture.
      </PostP>
      <PostUL>
        <li><strong>Tests come first, by hand or by agent under instruction.</strong> The agent doesn't get to decide what "done" means. The human writes (or has another agent write) a failing test that pins down the contract; only then does any agent get to make it pass.</li>
        <li><strong>Architecture is decided before any code lands.</strong> An ADR, a sketch on paper, a fifteen-minute conversation — something. The agent writes inside the lines drawn by a human who has been burned before by what happens when those lines aren't drawn.</li>
        <li><strong>Every diff is reviewed.</strong> Often by another agent in another role, with the human as the final reader. Vibe coding accepts whatever lands. Agentic engineering treats the agent's first draft as a draft.</li>
        <li><strong>The human is responsible for what ships.</strong> Not "the model wrote it." The human directed the model, reviewed the output, and put their name on the commit. The accountability does not change.</li>
      </PostUL>
      <PostP>
        The slogan: <em>go far, very fast, without breaking things</em>. The "without breaking things" is doing the work in that sentence. Anyone can go fast by typing into a chatbot and shipping the first thing it produces. Going fast <em>and</em> not breaking things is the entire game, and that is what agentic engineering is for.
      </PostP>

      <figure className={figureWrap}>
        <svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="d-fc-room-title" className="w-full h-auto block">
          <title id="d-fc-room-title">A vertical capability axis with the old floor and ceiling rising to a new floor (vibe coding) and a new ceiling (agentic engineering)</title>
          <defs>
            <marker id="arr-fc-orange" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#d97757" />
            </marker>
            <marker id="arr-fc-green" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#788c5d" />
            </marker>
          </defs>

          <text transform="rotate(-90)" x="-220" y="32" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="10" fill="#141413" letterSpacing="2" fontWeight="500">WHAT YOU CAN SHIP</text>

          <line x1="180" y1="120" x2="480" y2="120" stroke="#4a4a48" strokeDasharray="4,3" strokeWidth="1" />
          <text x="186" y="115" fontFamily="Lora, serif" fontStyle="italic" fontSize="10" fill="#4a4a48">old ceiling — best human, alone</text>

          <line x1="180" y1="40" x2="480" y2="40" stroke="#788c5d" strokeWidth="1.8" />
          <text x="186" y="34" fontFamily="Poppins, sans-serif" fontSize="10" fill="#788c5d" letterSpacing="0.5" fontWeight="500">new ceiling — best human + agents</text>

          <line x1="180" y1="340" x2="480" y2="340" stroke="#4a4a48" strokeDasharray="4,3" strokeWidth="1" />
          <text x="186" y="356" fontFamily="Lora, serif" fontStyle="italic" fontSize="10" fill="#4a4a48">old floor — years of training</text>

          <line x1="180" y1="260" x2="480" y2="260" stroke="#d97757" strokeWidth="1.8" />
          <text x="186" y="276" fontFamily="Poppins, sans-serif" fontSize="10" fill="#d97757" letterSpacing="0.5" fontWeight="500">new floor — describe what you want</text>

          <line x1="155" y1="338" x2="155" y2="266" stroke="#d97757" strokeWidth="1.5" markerEnd="url(#arr-fc-orange)" />
          <line x1="155" y1="118" x2="155" y2="46" stroke="#788c5d" strokeWidth="1.5" markerEnd="url(#arr-fc-green)" />

          <rect x="180" y="40" width="300" height="220" fill="none" stroke="#141413" strokeWidth="0.5" strokeDasharray="2,3" opacity="0.35" />
          <text x="330" y="158" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="11" fill="#141413" opacity="0.7">the room of</text>
          <text x="330" y="174" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="11" fill="#141413" opacity="0.7">what's possible</text>

          <g transform="translate(510, 20)">
            <rect width="200" height="62" fill="#faf9f5" stroke="#788c5d" strokeWidth="1.5" rx="4" />
            <text x="100" y="22" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="10" fill="#788c5d" letterSpacing="1.5" fontWeight="500">AGENTIC ENGINEERING</text>
            <text x="100" y="42" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="11" fill="#141413">raises the ceiling</text>
            <text x="100" y="56" textAnchor="middle" fontFamily="Lora, serif" fontSize="9" fill="#4a4a48">for the best — go further, faster</text>
          </g>

          <g transform="translate(510, 240)">
            <rect width="200" height="62" fill="#faf9f5" stroke="#d97757" strokeWidth="1.5" rx="4" />
            <text x="100" y="22" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="10" fill="#d97757" letterSpacing="1.5" fontWeight="500">VIBE CODING</text>
            <text x="100" y="42" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="11" fill="#141413">raises the floor</text>
            <text x="100" y="56" textAnchor="middle" fontFamily="Lora, serif" fontSize="9" fill="#4a4a48">for everyone — anyone can build</text>
          </g>
        </svg>
        <figcaption className={figureCaption}>Same tools, two ends of the lever. The bar to entry drops; the bar to excellence rises. The room in between is where most software now lives.</figcaption>
      </figure>

      <PostH2>
        Same tools, different posture
      </PostH2>
      <PostP>
        The thing worth noticing is that the underlying model is the same in both cases. A non-engineer pasting an idea into Claude or Cursor or Lovable, and a staff engineer running three Claude Code sessions with a written-down architecture and a TDD discipline, are both calling the same family of large language models. The model is doing roughly the same thing on its end. What differs is everything around it — the human's vocabulary, the human's standards, the structures the human builds for the agent to operate inside, the review the human applies before anything ships.
      </PostP>
      <PostP>
        That is why the gap widens rather than closing. Vibe coding is bottlenecked by what the user can describe; once you can describe a working app, you can describe a working app, and the next year of model improvements only saves you a few rounds of "no, more like this." Agentic engineering is bottlenecked by how big and complicated a system the engineer can hold in their head and orchestrate cleanly — and <em>that</em> ceiling moves with practice, with taste, and with every sharper tool the model gets. The floor rises a little more each year. The ceiling rises faster.
      </PostP>

      <PostH2>
        Where most of us live
      </PostH2>
      <PostP>
        Most working software people are not pure vibe coders and not yet full agentic engineers. They are somewhere on the line between the two, moving toward the ceiling at whatever rate their job and their curiosity allow. The skill that mattered for the last two decades — <em>can you write the code yourself</em> — is still useful but is no longer the differentiator. The skill that matters now is two skills, and they don't always travel together.
      </PostP>
      <PostUL>
        <li><strong>Can you describe what you want clearly enough that a competent agent can build it?</strong> This is what gets you onto the floor. Most people without engineering backgrounds underestimate how hard this is and overestimate how hard learning it would be.</li>
        <li><strong>Can you tell whether what the agent built is any good?</strong> This is what raises you toward the ceiling. It is the thing the agents cannot do for you. Taste, architectural judgment, the smell of a brittle abstraction, the instinct that says "this will fall over the first time it sees real traffic" — none of this is in the model. It is in you, or it is not in the room.</li>
      </PostUL>
      <PostP>
        The first skill is enough to ship a side project. Both skills, together, are what a software career now looks like.
      </PostP>

      <PostH2>
        Don't pick a side
      </PostH2>
      <PostP>
        It's tempting to read the floor-and-ceiling framing as a fight — pure vibe coders versus serious engineers, masses versus pros, easy mode versus hard mode. It isn't. Vibe coding is how more good ideas get to find out whether they're any good, which is an unambiguous gift to the field. Agentic engineering is how the people who already knew how to build serious systems start building systems that wouldn't have been buildable by a small team a year ago, which is also a gift. The bar to entry dropping does not threaten the bar to excellence. They are happening on the same lever, in the same year, by the same tools.
      </PostP>
      <PostP>
        Lower the floor for whoever is trying to get in. Raise the ceiling for whoever has been here the longest. Pay attention to the room in between, because that is where almost all the software in the next ten years is going to be written.
      </PostP>

      <hr className="my-16 border-anthropic-text/10" />

      <PostH2>Humanized version</PostH2>

      <p className="text-sm font-serif italic opacity-60 mb-8">
        The same essay, rewritten with the blader/humanizer skill — same argument, fewer AI tells, more voice.
      </p>

      <PostP>
        Two things are happening to software work at the same time, and people keep arguing about them as if they were one thing. The bar to get in has dropped. The bar to do excellent work has gone up. Same models, same tools, same year. I keep seeing teams pick a side and miss that both shifts are real and both matter.
      </PostP>
      <PostP>
        Vibe coding raises the floor. Agentic engineering raises the ceiling. They&apos;re two ends of one lever.
      </PostP>

      <PostH2>Vibe coding, or the floor rises</PostH2>
      <PostP>
        Vibe coding is when the input is a feeling and the output is a working app. You type, &quot;I want a little site where my book club votes on the next book, with a countdown timer.&quot; An assistant writes it, runs it, fixes the parts that break, gives you a URL. You did not learn JavaScript. You did not set up a database. You did not pick a router. You vibed, and the thing showed up.
      </PostP>
      <PostP>
        It feels like cheating, and then I remember what the floor used to be. A year of evenings on a language. Another on a framework. A third on git, deploys, env vars, package managers, the whole apparatus you need before any of the first two years pays off. Ninety-nine out of a hundred people with a good idea never found out if their idea was any good, because finding out cost three years of unpaid evenings. That floor is gone.
      </PostP>
      <PostP>
        The new floor is: can you describe what you want clearly enough for a model to build it? That&apos;s a real skill. Not everyone has it. But it&apos;s closer to writing a clear email than to compiling a kernel. In eighteen months the pool of people who can ship a working software artifact went from roughly the CS-degree population to roughly the people patient enough to type at a chatbot. Two or three orders of magnitude.
      </PostP>
      <PostP>
        What vibe coding handles well: prototypes, internal tools, weekend hacks, the landing page for an idea you want to test, the little utility your team has wanted for three years and never prioritised. What it doesn&apos;t handle yet: anything where being subtly wrong has real consequences. A vibe-coded budgeting app that loses a digit is annoying. A vibe-coded billing system that loses a digit is a lawsuit. The floor rose. The ceiling, for vibe coding alone, did not rise nearly as far.
      </PostP>

      <PostH2>Agentic engineering, or the ceiling rises</PostH2>
      <PostP>
        Agentic engineering is what happens when a working engineer (someone with taste, architectural judgment, and the muscle memory of a hundred shipped systems) stops typing the code and starts directing agents to type it. Not one agent autocompleting the next line. A small team of agents, each scoped to a job. One writes the failing test. One makes it pass. One reviews the diff for security issues. One updates the docs. The human is architect, reviewer, tiebreaker, conscience. The agents are hands.
      </PostP>
      <PostP>
        The output is not lower quality than the same engineer working alone. Often it&apos;s higher. The engineer now spends attention only on the parts where their judgment compounds: what to build, what shape it should take, what would break it, what to test. Almost none on the parts where typing was the bottleneck. Senior engineers used to be slowed down by the keyboard. Now they&apos;re slowed down only by how big a system they can hold in their head. That ceiling is much higher.
      </PostP>
      <PostP>
        It doesn&apos;t look like vibe coding, even though the underlying model is the same. The difference isn&apos;t in the tool. It&apos;s in the posture.
      </PostP>
      <PostUL>
        <li><strong>Tests come first.</strong> By hand, or by an agent under instruction. The agent doesn&apos;t get to decide what &quot;done&quot; means. A failing test pins down the contract before any agent gets to make it pass.</li>
        <li><strong>Architecture is decided before code lands.</strong> An ADR, a sketch on a napkin, a fifteen-minute conversation. Something. The agent writes inside lines drawn by a human who has been burned before by what happens when those lines aren&apos;t drawn.</li>
        <li><strong>Every diff is reviewed.</strong> Often by another agent in another role, with the human as the final reader. Vibe coding accepts whatever lands. Agentic engineering treats the agent&apos;s first draft as a draft.</li>
        <li><strong>The human is responsible for what ships.</strong> Not &quot;the model wrote it.&quot; The human directed the model, reviewed the output, and put their name on the commit. Accountability doesn&apos;t change.</li>
      </PostUL>
      <PostP>
        My slogan for this: go far, very fast, without breaking things. The &quot;without breaking things&quot; part does the work in that sentence. Anyone can go fast by shipping the first thing a chatbot produces. Going fast and not breaking things is the whole game, and that&apos;s what agentic engineering is for.
      </PostP>

      <PostH2>Same tools, different posture</PostH2>
      <PostP>
        Notice that the underlying model is the same in both cases. A non-engineer pasting an idea into Claude or Cursor or Lovable, and a staff engineer running three Claude Code sessions against a written-down architecture with TDD discipline, are calling the same family of large language models. The model is doing roughly the same thing on its end. What differs is everything around it. The human&apos;s vocabulary. The human&apos;s standards. The structures the human builds for the agent to operate inside. The review the human applies before anything ships.
      </PostP>
      <PostP>
        That&apos;s why the gap widens instead of closing. Vibe coding is limited by what the user can describe. Once you can describe a working app, you can describe a working app, and the next year of model improvements only saves you a few rounds of &quot;no, more like this.&quot; Agentic engineering is limited by how big a system the engineer can hold in their head and orchestrate cleanly, and that ceiling moves with practice, with taste, and with every sharper tool the model gets. The floor rises a little each year. The ceiling rises faster.
      </PostP>

      <PostH2>Where most of us live</PostH2>
      <PostP>
        Most working software people aren&apos;t pure vibe coders, and aren&apos;t yet full agentic engineers. We&apos;re somewhere on the line between them, moving toward the ceiling at whatever rate the job and the curiosity allow. The skill that mattered for the last two decades, can you write the code yourself, is still useful but is no longer the differentiator. The skill that matters now is two skills, and they don&apos;t always travel together.
      </PostP>
      <PostUL>
        <li><strong>Can you describe what you want clearly enough that a competent agent can build it?</strong> This gets you onto the floor. People without engineering backgrounds tend to underestimate how hard this is, and overestimate how hard learning it would be.</li>
        <li><strong>Can you tell whether what the agent built is any good?</strong> This is what raises you toward the ceiling. It&apos;s the thing agents can&apos;t do for you. Taste, architectural judgment, the smell of a brittle abstraction, the instinct that says &quot;this will fall over the first time it sees real traffic.&quot; None of that is in the model. It&apos;s in you, or it&apos;s not in the room.</li>
      </PostUL>
      <PostP>
        The first skill is enough to ship a side project. Both skills together is what a software career looks like now.
      </PostP>

      <PostH2>Don&apos;t pick a side</PostH2>
      <PostP>
        I keep hearing the floor-and-ceiling story told as a fight. Pure vibe coders versus serious engineers. Masses versus pros. Easy mode versus hard mode. It isn&apos;t a fight. Vibe coding means more good ideas get to find out whether they&apos;re any good, which is a gift to the field. Agentic engineering means people who already knew how to build serious systems are now building systems that a small team couldn&apos;t have shipped a year ago, which is also a gift. The bar to entry dropping does not threaten the bar to excellence. Both are happening on the same lever, in the same year, by the same tools.
      </PostP>
      <PostP>
        Lower the floor for whoever is trying to get in. Raise the ceiling for whoever has been here the longest. Pay attention to the room in between, because that is where almost all the software of the next ten years gets written.
      </PostP>
    </>
  );
}
