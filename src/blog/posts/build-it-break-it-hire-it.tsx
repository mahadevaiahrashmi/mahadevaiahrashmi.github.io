// agent-notes: { ctx: "Build It, Break It, Hire It — essay arguing LeetCode hiring is obsolete and the new test is a real five-day deployment under load and a red-team agent attack, with one inline SVG diagram (build → deploy → attack → verdict pipeline)", deps: ["../../components/blog-prose"], state: active, last: "sato@2026-05-08", key: ["SVG figure forced onto light surface (bg-[#faf9f5]) to keep ink/orange/green palette readable in dark mode; matches floor-and-ceiling and ai-is-suppandi figure style"] }
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PostH2, PostP, PostUL } from "../../components/blog-prose";

const figureWrap = "bg-[#faf9f5] border border-anthropic-text/10 rounded-xl p-6 my-10";
const figureCaption = "text-sm text-center mt-3 opacity-60 italic font-serif text-zinc-700";

export default function BuildItBreakItHireItPost() {
  return (
    <>
      <h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight mb-6 leading-tight">
        Build It, Break It, Hire It
      </h1>

      <p className="text-lg font-serif italic opacity-60 mb-12">
        Published: May 2026 | Reading Time: ~7 minutes
      </p>

      <PostP>
        Day one of the new job. Your manager hands you a Jira board with two hundred screens to refactor, three production incidents from the weekend, and a fleet of Claude Code sessions you're expected to run in parallel. The morning standup is twelve people, half of whom now refer to "their agents" in the possessive. Welcome to the team.
      </PostP>
      <PostP>
        The interview that got you here was: invert a binary tree on a whiteboard. In forty-five minutes. Without using any tool a working engineer would actually use. While someone watched you type.
      </PostP>
      <PostP>
        Something is broken in this picture, and most companies haven't admitted it out loud yet.
      </PostP>

      <PostH2>
        What the puzzle was actually measuring
      </PostH2>
      <PostP>
        Let me steelman the LeetCode interview before I bury it. Coding puzzles, done well, measured something real: can you reason about a small problem under time pressure, get to a working solution, communicate your thinking, and not crumble when the question gets harder. They were a proxy for "can you write code at all," and during the era when writing code was the actual bottleneck of the job, the proxy was tight enough to be useful.
      </PostP>
      <PostP>
        That era is over. The proxy is loose now — and getting looser every quarter.
      </PostP>
      <PostP>
        A senior engineer in 2026 doesn't spend their day typing. They spend their day choosing what to build, sketching the shape of the system, scoping work to a team of agents, reviewing what those agents produce, and making a hundred small judgment calls about which of the model's plausible-looking outputs is actually correct. Typing — the thing the puzzle measured — is the cheapest part of the day. When the proxy stops correlating with the job, the proxy starts filtering for the wrong people. You select for candidates who optimised hard for the puzzle. You don't select for the people who can ship.
      </PostP>

      <PostH2>
        The new test
      </PostH2>
      <PostP>
        Replace it with this. Hand the candidate a real brief.
      </PostP>
      <blockquote className="border-l-4 border-anthropic-accent bg-anthropic-text/5 px-6 py-5 my-8 font-serif italic text-lg leading-relaxed">
        Build a secure e-commerce platform — call it a Walmart clone, an Amazon clone, doesn't matter. Real catalog, real cart, real checkout, real auth, real order history. You have five days. You can use any AI agents you want — Claude, Codex, Cursor, your own custom rig. You have a small cloud budget. Deploy it. Send us the URL.
        <span className="block mt-3 not-italic text-xs tracking-widest uppercase opacity-60">— the new interview brief</span>
      </blockquote>
      <PostP>
        That's the build phase. Let the candidate use whatever agents they want. The agents are not cheating; the agents are part of the test. We are not measuring whether the candidate can write code without help. We are measuring whether the candidate can direct a team of agents, in five days, to produce a system you would not be embarrassed to put in front of a paying customer.
      </PostP>
      <PostP>
        Then comes the part the puzzle has no answer for.
      </PostP>

      <PostH2>
        The break phase
      </PostH2>
      <PostP>
        When the deadline closes, the candidate's deployment goes live in a sandbox. We point two streams of traffic at it.
      </PostP>
      <PostP>
        The first is <strong>simulated load</strong> — ten thousand synthetic shoppers, scripted to do realistic things. Browse the catalog. Search. Add to cart. Abandon the cart. Come back an hour later. Apply a coupon. Check out. Refund. The traffic isn't malicious; it's just a Tuesday afternoon at a working store. We watch what falls over: the search index when the catalog grows, the checkout queue under contention, the database under a flash sale, the auth flow when a thousand users try to log in at once.
      </PostP>
      <PostP>
        The second is <strong>a red team of attacker agents.</strong> A fleet — ten or so — of strong, recent models running on the highest reasoning settings, each pointed at the deployment with a single instruction: <em>break this</em>. They try the catalog of things attackers always try, and they try them in parallel: SQL injection, auth bypass, IDOR, broken access control, race conditions in the checkout, prompt-injection through the product reviews if there's an LLM in the loop, abuse of the password-reset flow, scraping the entire catalog through the search API, exhausting the cloud budget through a runaway endpoint. The agents are not bored. They are not constrained by office hours. They iterate.
      </PostP>
      <PostP>
        Five days of build. One day of attack. The score is on the wall.
      </PostP>

      <figure className={figureWrap}>
        <svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="d-bbh-title" className="w-full h-auto block">
          <title id="d-bbh-title">A pipeline showing the new interview: candidate plus agents build a deployment, which is then attacked by simulated load and a red team, producing a hire/no-hire verdict</title>
          <defs>
            <marker id="arr-bbh-orange" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#d97757" />
            </marker>
            <marker id="arr-bbh-ink" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#141413" />
            </marker>
            <marker id="arr-bbh-green" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#788c5d" />
            </marker>
          </defs>

          <g transform="translate(220, 20)">
            <rect width="280" height="70" fill="#faf9f5" stroke="#d97757" strokeWidth="1.5" rx="4" />
            <text x="140" y="22" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="10" fill="#d97757" letterSpacing="1.5" fontWeight="500">BUILD · 5 DAYS</text>
            <line x1="20" y1="32" x2="260" y2="32" stroke="#e8e6dc" />
            <text x="140" y="50" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="11" fill="#141413">candidate directs a team of agents</text>
            <text x="140" y="64" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="10" fill="#4a4a48">"build a secure storefront"</text>
          </g>

          <line x1="360" y1="92" x2="360" y2="116" stroke="#d97757" strokeWidth="1.5" markerEnd="url(#arr-bbh-orange)" />

          <g transform="translate(260, 120)">
            <rect width="200" height="100" fill="#faf9f5" stroke="#141413" strokeWidth="2" rx="4" />
            <text x="100" y="22" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="11" fill="#141413" letterSpacing="2" fontWeight="500">DEPLOYMENT</text>
            <line x1="20" y1="32" x2="180" y2="32" stroke="#e8e6dc" />
            <text x="100" y="56" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="11" fill="#4a4a48">catalog · cart · checkout</text>
            <text x="100" y="74" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="11" fill="#4a4a48">auth · orders · admin</text>
            <text x="100" y="92" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="9" fill="#141413" letterSpacing="1.5" fontWeight="500">live URL</text>
          </g>

          <g transform="translate(20, 135)">
            <rect width="200" height="70" fill="#faf9f5" stroke="#141413" strokeWidth="1" strokeDasharray="4,3" rx="4" />
            <text x="100" y="22" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="10" fill="#141413" letterSpacing="1.5" fontWeight="500">SIMULATED LOAD</text>
            <line x1="20" y1="32" x2="180" y2="32" stroke="#e8e6dc" />
            <text x="100" y="50" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="11" fill="#4a4a48">10,000 synthetic users</text>
            <text x="100" y="64" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="10" fill="#4a4a48">browse · cart · check out</text>
          </g>

          <line x1="220" y1="170" x2="258" y2="170" stroke="#141413" strokeWidth="1.5" markerEnd="url(#arr-bbh-ink)" />

          <g transform="translate(500, 135)">
            <rect width="200" height="70" fill="#faf9f5" stroke="#141413" strokeWidth="1" strokeDasharray="4,3" rx="4" />
            <text x="100" y="22" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="10" fill="#141413" letterSpacing="1.5" fontWeight="500">RED TEAM</text>
            <line x1="20" y1="32" x2="180" y2="32" stroke="#e8e6dc" />
            <text x="100" y="50" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="11" fill="#4a4a48">10 attacker agents</text>
            <text x="100" y="64" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="10" fill="#4a4a48">"break this"</text>
          </g>

          <line x1="500" y1="170" x2="462" y2="170" stroke="#141413" strokeWidth="1.5" markerEnd="url(#arr-bbh-ink)" />

          <line x1="360" y1="222" x2="360" y2="254" stroke="#141413" strokeWidth="1.5" />

          <path d="M 360 254 L 180 290" fill="none" stroke="#788c5d" strokeWidth="1.5" markerEnd="url(#arr-bbh-green)" />
          <path d="M 360 254 L 540 290" fill="none" stroke="#d97757" strokeWidth="1.5" markerEnd="url(#arr-bbh-orange)" />

          <g transform="translate(40, 300)">
            <rect width="280" height="100" fill="#faf9f5" stroke="#788c5d" strokeWidth="1.5" rx="4" />
            <text x="140" y="22" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="10" fill="#788c5d" letterSpacing="1.5" fontWeight="500">SURVIVES</text>
            <line x1="20" y1="32" x2="260" y2="32" stroke="#e8e6dc" />
            <text x="140" y="55" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="11" fill="#4a4a48">auth held · cart consistent</text>
            <text x="140" y="73" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="11" fill="#4a4a48">budget bounded · alerts fired</text>
            <text x="140" y="92" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="10" fill="#788c5d" letterSpacing="2" fontWeight="500">→ HIRE</text>
          </g>

          <g transform="translate(400, 300)">
            <rect width="280" height="100" fill="#faf9f5" stroke="#d97757" strokeWidth="1.5" rx="4" />
            <text x="140" y="22" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="10" fill="#d97757" letterSpacing="1.5" fontWeight="500">BREAKS</text>
            <line x1="20" y1="32" x2="260" y2="32" stroke="#e8e6dc" />
            <text x="140" y="55" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="11" fill="#4a4a48">SQL injection lands</text>
            <text x="140" y="73" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontSize="11" fill="#4a4a48">cloud bill explodes</text>
            <text x="140" y="92" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="10" fill="#d97757" letterSpacing="2" fontWeight="500">→ DON'T</text>
          </g>
        </svg>
        <figcaption className={figureCaption}>The puzzle had no answer for what comes after the deployment goes live. The new interview is the part of the job the puzzle skipped.</figcaption>
      </figure>

      <PostH2>
        What surviving actually means
      </PostH2>
      <PostP>
        The candidate doesn't have to write a perfect system. Nobody can in five days. The question is narrower and more honest: when the load and the red team show up, <em>what happens?</em>
      </PostP>
      <PostP>
        The strong candidates' deployments wobble in interesting ways. The auth scheme holds up. The checkout is rate-limited. The cloud bill is bounded by a budget alarm that fires before anything goes catastrophic. The race conditions in the cart are handled by a database transaction that the candidate clearly thought about. There's a logging trail you can read after the fact. There are alerts. There are graceful degradations — the catalog still browses when the recommendation engine falls over.
      </PostP>
      <PostP>
        The weak candidates' deployments fail in less interesting ways. The first SQL injection lands and the agents have admin. The cart double-charges under load and there's no idempotency key. The database password is in the GitHub history. The site goes down at two hundred concurrent users and the candidate has no idea why because there is no logging anywhere. The cloud bill quietly hits four figures during the attack window because the candidate's agents auto-deployed a serverless function with no rate limit.
      </PostP>
      <PostP>
        Both kinds of candidates used the same models, the same tools, the same five days. The difference is what they thought to ask the agents to do, what they thought to ask the agents to <em>not</em> do, and what they reviewed before they shipped.
      </PostP>

      <PostH2>
        What the test is filtering for
      </PostH2>
      <PostP>
        The puzzle filtered for typing fluency. The new test filters for a different list, and it's the list that matches the actual job.
      </PostP>
      <PostUL>
        <li><strong>Taste.</strong> Which decisions matter? Where do you spend your five days? The candidate who spent day one writing a clever search algorithm and never got to checkout failed before the red team arrived.</li>
        <li><strong>Defensive instinct.</strong> Did you think about what an attacker would try, before the attacker showed up? The puzzle never asked this question. The job asks it constantly.</li>
        <li><strong>Agent orchestration.</strong> Did you scope work to your agents in a way that made their output reviewable, or did you let them write three thousand lines of unread code in the first hour?</li>
        <li><strong>Reading code under pressure.</strong> When the build is failing on day three, can you find the bug in the LLM-written code, or do you ask the model to "fix it" and pray?</li>
        <li><strong>Architectural judgment.</strong> Where did you put the auth boundary? Where did you put the rate limit? Where did you put the audit log? An agent will not put any of these things in by default. They are in the system because the human told the agent to put them in.</li>
        <li><strong>Honesty under fire.</strong> When the red team breaks something, does the candidate explain what happened, or hand-wave it? You learn a lot from the post-mortem conversation. You learn nothing from the puzzle.</li>
      </PostUL>
      <PostP>
        None of these are in a LeetCode question. All of them are in the job.
      </PostP>

      <PostH2>
        The objections
      </PostH2>
      <PostP>
        <strong>"This takes too long for an interview."</strong> It takes longer than a forty-five-minute puzzle and shorter than the six rounds of behavioural and system design that big companies already run. Net time, it's roughly the same. You're swapping low-signal hours for high-signal hours.
      </PostP>
      <PostP>
        <strong>"It's not fair to juniors."</strong> The five-day brief is calibrated. A junior isn't expected to ship the same thing a staff engineer ships. They are expected to ship the right thing for their level — a smaller scope, fewer features, but a system that doesn't fall over the first time a red-team agent looks at it. A junior who can already do this is a junior worth hiring on day one.
      </PostP>
      <PostP>
        <strong>"The candidates will game it."</strong> You can't game a deployment that ten attacker agents are actively breaking. You either built something that survives the day or you didn't. Most other interview formats — the take-home, the system design, the behavioural — are easier to game than this one.
      </PostP>
      <PostP>
        <strong>"It's expensive."</strong> Cloud costs for the test environment, model costs for the red team. A few hundred dollars per candidate, maybe. The cost of hiring a strong engineer who can't actually do the job is six figures. The cost of hiring a weak one is sometimes the company.
      </PostP>

      <PostH2>
        The bar moved
      </PostH2>
      <PostP>
        The puzzle measured a craft that working engineers no longer practice. The new test measures the craft they actually practice every day — directing agents, defending systems, surviving production. It is a strictly more honest test, because it is exactly the job.
      </PostP>
      <PostP>
        If you are still hiring on inverted binary trees, you are hiring for a role that doesn't exist in your company anymore. If you are interviewing somewhere that asks you to invert one, ask the interviewer what their actual senior engineers do this week, and notice the gap.
      </PostP>
      <PostP>
        Build it. Break it. Hire whoever is still standing.
      </PostP>
    </>
  );
}
