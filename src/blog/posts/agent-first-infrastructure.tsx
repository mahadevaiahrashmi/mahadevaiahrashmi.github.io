// agent-notes: { ctx: "Agent-First Infrastructure — essay on designing systems for a world where agents are primary users: sensors/actuators decomposition, legibility, my-agent-talks-to-your-agent, with one inline SVG figure (sensors+actuators+agents+inter-org handshake stack)", deps: ["../../components/blog-prose"], state: active, last: "sato@2026-05-08", key: ["SVG figure forced onto light surface (bg-[#faf9f5]) to keep ink/orange/green palette readable in dark mode; matches floor-and-ceiling and ai-is-suppandi figure style"] }
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PostH2, PostP, PostUL } from "../../components/blog-prose";

const figureWrap = "bg-[#faf9f5] border border-anthropic-text/10 rounded-xl p-6 my-10";
const figureCaption = "text-sm text-center mt-3 opacity-60 italic font-serif text-zinc-700";

export default function AgentFirstInfrastructurePost() {
  return (
    <>
      <h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight mb-6 leading-tight">
        Agent-First Infrastructure
      </h1>

      <p className="text-lg font-serif italic opacity-60 mb-12">
        Published: May 2026 | Reading Time: ~7 minutes
      </p>

      <PostP>
        Most of the software infrastructure built in the last two decades was designed for two kinds of users: humans staring at screens, and other programs your team controls end-to-end. The architecture, the docs, the API surfaces, the data structures — all of them assume one of those two consumers. Both assumptions are about to age badly.
      </PostP>
      <PostP>
        The next generation of systems will spend most of their time being used by agents. Not the team's own programs, and not humans behind a browser. <em>Agents.</em> Yours, your customers', your suppliers', and increasingly agents owned by people you have never met, calling your system on behalf of someone they've never met either. Most teams have not felt this shift yet. The teams that build for it now will be a tier ahead by the time the rest of the industry notices.
      </PostP>

      <PostH2>
        What agent-first actually means
      </PostH2>
      <PostP>
        It is tempting to read "agent-first" as "we wrapped our existing CRUD API in an LLM tool layer." That is not it. That is agent-aftermarket — a thin chat skin glued onto a system that was designed for humans clicking buttons. The skin works for demos and breaks under real use, because every assumption underneath was wrong: pagination shaped for human eyes, error messages meant to be read by a person, authentication assuming a session-based browser flow, rate limits tuned to a typing human rather than a tireless agent.
      </PostP>
      <PostP>
        Agent-first means the consumer is, by default, a model. Every API, every data structure, every protocol is designed assuming whoever is calling it can read documentation but does not have human intuition, can do a hundred parallel calls but does not enjoy retrying ambiguous errors, can handle structured data but is easily confused by HTML soup. You are no longer building for the eye. You are building for the parser.
      </PostP>

      <PostH2>
        Decompose the world into sensors and actuators
      </PostH2>
      <PostP>
        The cleanest mental move I've seen for designing agent-native systems is to stop thinking in terms of <em>features</em> and start thinking in terms of <em>sensors and actuators.</em> Every workload your system performs is, fundamentally, one of two things. It either reads some part of the world (a sensor) or changes some part of the world (an actuator). That's it. Click "place order" — that's an actuator. Look at recent orders — that's a sensor. Search the catalog — sensor. Adjust inventory — actuator.
      </PostP>
      <PostP>
        The reason this decomposition matters for agents is that an agent is, in essence, a thing that composes sensors and actuators in service of a goal. <em>Read the calendar. If there's a free slot, send a confirmation. Otherwise propose alternatives.</em> That's three sensor-and-actuator calls and a bit of logic. If your platform exposes its surface area as a clear catalog of sensors and actuators — well-named, well-typed, well-described — agents can compose on top of it without much custom integration. If your platform exposes its surface area as a UI flow with twenty-eight buttons, agents have to reverse-engineer what each button does before they can do anything useful.
      </PostP>
      <PostUL>
        <li><strong>Sensors</strong> are read-only. They have stable shapes. They are safe to call repeatedly. They should be cheap, fast, and pure.</li>
        <li><strong>Actuators</strong> change the world. They have idempotency keys. They have explicit pre- and post-conditions. They should be hard to call by accident, and easy to call by intent.</li>
        <li>The catalog of sensors and actuators is the agent-facing API. Everything else — the UI, the dashboards, the cron jobs — is a particular composition of that catalog.</li>
      </PostUL>
      <PostP>
        Once you start designing this way, the resulting system is a much better fit for both human and agent use. The dashboards your team loves are just compositions of sensors. The automations are compositions of actuators. The agent doing a customer support workflow is also just a composition. The system stops being a forest of bespoke endpoints and starts being a vocabulary.
      </PostP>

      <PostH2>
        Legibility — write data structures the model can read
      </PostH2>
      <PostP>
        The other half of agent-first design is making your data <em>legible</em> to a model. Humans tolerate cleverness in data — implicit conventions, magic strings, fields whose meaning you have to derive from context. Models do not. A field called <code>status</code> with values <code>"A"</code>, <code>"B"</code>, and <code>"C"</code> is fine for a database that nobody outside your team reads. It is poison for an agent calling your API for the first time.
      </PostP>
      <PostP>
        Legible data structures share a few traits. They self-describe — a field called <code>order_status</code> with values <code>"pending"</code>, <code>"paid"</code>, <code>"shipped"</code> tells the agent what it is, so the agent doesn't have to guess. They have explicit schemas — every endpoint comes with a JSON Schema or equivalent that the agent can read at runtime. They prefer enumerated, controlled vocabularies over free text. They include the units. They timestamp things in ISO-8601, not in whichever format the original developer happened to like. They avoid clever in-band signalling — no <code>"id": -1 means anonymous</code>, no <code>"phone": ""</code> meaning unsubscribed.
      </PostP>
      <PostP>
        None of this is new advice; it is the same advice good API designers have given for twenty years. The difference is that for twenty years, the advice was a nice-to-have because the consumer was a human reading docs at their own pace. Now the consumer is a model that is going to call your API ten thousand times in parallel and act on whatever shape the response comes back in. Sloppy data structures don't just annoy developers anymore; they actively miscalibrate agent behaviour at scale.
      </PostP>

      <figure className={figureWrap}>
        <svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="d-afi-stack-title" className="w-full h-auto block">
          <title id="d-afi-stack-title">A stack with the world at the bottom, sensors and actuators above it, an agent composing them, and an agent-to-agent handshake at the top</title>
          <defs>
            <marker id="arr-afi-orange" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#d97757" />
            </marker>
            <marker id="arr-afi-green" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#788c5d" />
            </marker>
            <marker id="arr-afi-ink" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#141413" />
            </marker>
          </defs>

          <g transform="translate(120, 30)">
            <rect width="220" height="60" fill="#faf9f5" stroke="#d97757" strokeWidth="1.5" rx="4" />
            <text x="110" y="22" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="10" fill="#d97757" letterSpacing="1.5" fontWeight="500">MY AGENT</text>
            <text x="110" y="40" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="11" fill="#141413">on my behalf</text>
            <text x="110" y="54" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="10" fill="#4a4a48">"book a flight, under $400"</text>
          </g>

          <g transform="translate(380, 30)">
            <rect width="220" height="60" fill="#faf9f5" stroke="#788c5d" strokeWidth="1.5" rx="4" />
            <text x="110" y="22" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="10" fill="#788c5d" letterSpacing="1.5" fontWeight="500">YOUR AGENT</text>
            <text x="110" y="40" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="11" fill="#141413">on the airline's behalf</text>
            <text x="110" y="54" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="10" fill="#4a4a48">"sell capacity, fill seats"</text>
          </g>

          <path d="M 340 60 L 380 60" fill="none" stroke="#141413" strokeWidth="1.5" markerEnd="url(#arr-afi-ink)" />
          <path d="M 380 70 L 340 70" fill="none" stroke="#141413" strokeWidth="1.5" markerEnd="url(#arr-afi-ink)" />
          <text x="360" y="98" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="9" fill="#4a4a48">protocol</text>

          <line x1="490" y1="90" x2="490" y2="118" stroke="#788c5d" strokeWidth="1.5" markerEnd="url(#arr-afi-green)" />

          <g transform="translate(380, 120)">
            <rect width="220" height="60" fill="#faf9f5" stroke="#141413" strokeWidth="1.5" rx="4" />
            <text x="110" y="22" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="10" fill="#141413" letterSpacing="1.5" fontWeight="500">AGENT</text>
            <text x="110" y="40" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="11" fill="#4a4a48">composes sensors</text>
            <text x="110" y="54" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="11" fill="#4a4a48">and actuators</text>
          </g>

          <line x1="430" y1="180" x2="430" y2="208" stroke="#141413" strokeWidth="1.2" strokeDasharray="2,3" />
          <line x1="550" y1="180" x2="550" y2="208" stroke="#141413" strokeWidth="1.2" strokeDasharray="2,3" />

          <g transform="translate(380, 210)">
            <rect width="100" height="60" fill="#faf9f5" stroke="#d97757" strokeWidth="1.5" rx="4" />
            <text x="50" y="22" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="9" fill="#d97757" letterSpacing="1.5" fontWeight="500">SENSORS</text>
            <text x="50" y="40" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="10" fill="#141413">read-only</text>
            <text x="50" y="54" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="9" fill="#4a4a48">"what is the case?"</text>
          </g>

          <g transform="translate(500, 210)">
            <rect width="100" height="60" fill="#faf9f5" stroke="#788c5d" strokeWidth="1.5" rx="4" />
            <text x="50" y="22" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="9" fill="#788c5d" letterSpacing="1.5" fontWeight="500">ACTUATORS</text>
            <text x="50" y="40" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="10" fill="#141413">change-the-world</text>
            <text x="50" y="54" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="9" fill="#4a4a48">"do this thing"</text>
          </g>

          <line x1="430" y1="270" x2="430" y2="298" stroke="#d97757" strokeWidth="1.2" strokeDasharray="2,3" markerEnd="url(#arr-afi-orange)" />
          <line x1="550" y1="270" x2="550" y2="298" stroke="#788c5d" strokeWidth="1.2" strokeDasharray="2,3" markerEnd="url(#arr-afi-green)" />

          <g transform="translate(280, 300)">
            <rect width="320" height="60" fill="#faf9f5" stroke="#141413" strokeWidth="1.8" rx="4" />
            <text x="160" y="22" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="11" fill="#141413" letterSpacing="2" fontWeight="500">THE WORLD</text>
            <text x="160" y="40" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="11" fill="#4a4a48">inventory · calendar · ledger · catalog</text>
            <text x="160" y="54" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="10" fill="#4a4a48">database, file system, external APIs</text>
          </g>

          <g transform="translate(20, 200)">
            <text x="0" y="0" fontFamily="Poppins, sans-serif" fontSize="10" fill="#141413" letterSpacing="1.5" fontWeight="500">LEGIBILITY</text>
            <text x="0" y="20" fontFamily="Lora, serif" fontSize="10" fill="#4a4a48" fontStyle="italic">explicit schemas</text>
            <text x="0" y="34" fontFamily="Lora, serif" fontSize="10" fill="#4a4a48" fontStyle="italic">named values</text>
            <text x="0" y="48" fontFamily="Lora, serif" fontSize="10" fill="#4a4a48" fontStyle="italic">stable shapes</text>
            <text x="0" y="62" fontFamily="Lora, serif" fontSize="10" fill="#4a4a48" fontStyle="italic">idempotency keys</text>
            <text x="0" y="76" fontFamily="Lora, serif" fontSize="10" fill="#4a4a48" fontStyle="italic">no in-band signalling</text>
          </g>

          <g transform="translate(20, 320)">
            <rect width="180" height="40" fill="#faf9f5" stroke="#141413" strokeWidth="1" strokeDasharray="3,3" rx="4" />
            <text x="90" y="18" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="9" fill="#141413" letterSpacing="1.5" fontWeight="500">AUTH · CAPABILITY</text>
            <text x="90" y="32" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="9" fill="#4a4a48">on whose behalf, with what scope</text>
          </g>
          <line x1="200" y1="338" x2="278" y2="338" stroke="#141413" strokeWidth="1" strokeDasharray="3,3" markerEnd="url(#arr-afi-ink)" />
        </svg>
        <figcaption className={figureCaption}>The world at the bottom. Sensors and actuators in the middle. Agents composing them. And, increasingly, your agent talking directly to mine on the top floor.</figcaption>
      </figure>

      <PostH2>
        My agent talks to your agent
      </PostH2>
      <PostP>
        The third leg of agent-first design is the most interesting one, because it doesn't exist yet at scale and it's coming fast: protocols where my agent talks directly to your agent, on behalf of the two of us, without either of us in the loop.
      </PostP>
      <PostP>
        The use cases are easy to imagine and harder to build. My agent wants to book a flight under four hundred dollars; the airline's agent wants to fill that empty seat. They negotiate. My agent wants to know whether your warehouse can fulfill an order in two days; your agent wants to know whether mine can pay net-30. They negotiate. The thing they're doing is not "calling an API." It's a structured conversation between two systems, each pursuing a goal on behalf of a principal, with some protocol in between to keep the conversation honest.
      </PostP>
      <PostP>
        That protocol is what's missing today. It needs to handle a small set of hard things: <em>who is this agent acting on behalf of, what scope of authority do they have, how do we authenticate that, how do we negotiate disagreement, how do we settle, how do we audit afterward.</em> These are not new questions — humans solved them through contracts and lawyers — but the answers need to be encodable in a way two agents can execute in milliseconds. We are roughly where TCP/IP was in 1985: many partial standards, no clear winner, a quiet sense that the eventual standard will be enormously valuable.
      </PostP>
      <PostP>
        If you are building infrastructure now, you can't wait for the standard. But you can stop assuming that the consumer of your system is always a developer reading docs. Some of your traffic in five years will be other people's agents, and they will arrive at your endpoint with no human in the loop, expecting to read your schema, evaluate your terms, place a transaction, and leave. The teams whose systems can answer that visit gracefully will win the cross-org agent traffic that's about to flood the internet.
      </PostP>

      <PostH2>
        What to do this quarter
      </PostH2>
      <PostP>
        Concrete moves, none of them exotic.
      </PostP>
      <PostUL>
        <li><strong>Catalog your sensors and actuators.</strong> Make a literal list. What does your system read from the world? What does it change? Each entry should have a name, a description in plain English, a schema, and a one-line statement of what calling it costs. If the list is too long to fit on a page, the surface is too cluttered, and that's the first thing to fix.</li>
        <li><strong>Make every internal API agent-callable.</strong> Generate a machine-readable schema. Document every parameter. Add idempotency to mutating endpoints. Return errors that an agent can act on, not error pages a human has to interpret.</li>
        <li><strong>Decide your authentication story for agents acting on someone's behalf.</strong> OAuth-style flows mostly assume a human in the middle. You will need a model where an agent presents a capability token saying "I am acting for X, with scope Y, until time Z." Get ahead of that, even if your first version is crude.</li>
        <li><strong>Stop fighting the agent skin.</strong> If your customers are wrapping your product in their own agent, that is a feature, not a problem. Help them. The teams that resist this are the ones whose systems become hostile to the actual usage pattern of the next decade.</li>
      </PostUL>

      <PostH2>
        The question to keep asking
      </PostH2>
      <PostP>
        Every design decision in an agent-first system can be checked against a single, slightly uncomfortable question.
      </PostP>
      <blockquote className="border-l-4 border-anthropic-accent bg-anthropic-text/5 px-6 py-5 my-8 font-serif italic text-lg leading-relaxed">
        If my user was a model, would my system make sense to it?
        <span className="block mt-3 not-italic text-xs tracking-widest uppercase opacity-60">— the agent-first sanity check</span>
      </blockquote>
      <PostP>
        If the answer is yes, the human-facing UI on top will be fine — humans, after all, mostly want the same things models want from a system: clear names, predictable behaviour, no surprises. If the answer is no, you are about to find out the hard way that a quiet revolution is happening on your traffic graph, and the new majority of your users isn't reading your docs the way you expected.
      </PostP>
      <PostP>
        The world is being parsed now, not just read. Build accordingly.
      </PostP>
    </>
  );
}
