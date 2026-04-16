/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useEffect, type ComponentType } from "react";
import { Link, useParams } from "react-router-dom";
import { blogPosts } from "../blog/posts";
import ThemeToggle from "./ThemeToggle";

const CodeBlock = ({ children }: { children: string }) => (
  <div className="my-6 bg-anthropic-text/5 border border-anthropic-text/10 rounded-lg p-4 overflow-x-auto">
    <pre className="text-sm font-mono leading-relaxed whitespace-pre">{children}</pre>
  </div>
);

const Card = ({ emoji, title, color, question, code, outcome, insight }: {
  emoji: string;
  title: string;
  color: string;
  question: string;
  code: string;
  outcome: string;
  insight: string;
}) => (
  <div className="flex-1 min-w-[240px] bg-anthropic-text/[0.03] border border-anthropic-text/10 rounded-xl p-5">
    <div className="text-center mb-4">
      <span className="text-2xl block mb-2">{emoji}</span>
      <span className={`font-semibold text-sm ${color}`}>{title}</span>
    </div>
    <div className="text-xs opacity-60 text-center mb-4 h-9 flex items-center justify-center">
      <em>{question}</em>
    </div>
    <div className="bg-anthropic-bg border border-anthropic-text/10 rounded-lg p-3 text-xs font-mono leading-relaxed h-[150px] overflow-auto whitespace-pre">
      {code}
    </div>
    <div className={`mt-3 text-sm font-semibold h-6 ${color}`}>{outcome}</div>
    <div className="text-xs opacity-60 mt-2 pt-2 border-t border-anthropic-text/10 leading-relaxed h-14">
      {insight}
    </div>
  </div>
);

const ColdOpenPanel = ({ title, subtitle, children, verdict, verdictColor }: {
  title: string;
  subtitle: string;
  children: string;
  verdict: string;
  verdictColor: string;
}) => (
  <div className="flex-1 min-w-[340px] bg-anthropic-text/[0.03] border border-anthropic-text/10 rounded-xl p-5">
    <h3 className="text-sm font-medium mb-1">{title}</h3>
    <div className="text-xs opacity-60 mb-3"><em>{subtitle}</em></div>
    <pre className="text-xs font-mono leading-relaxed bg-anthropic-bg border border-anthropic-text/10 rounded-lg p-3 h-[220px] overflow-y-auto whitespace-pre">{children}</pre>
    <div className={`mt-3 text-sm font-semibold ${verdictColor}`}>{verdict}</div>
  </div>
);

function WarehouseRoutingPost() {
  return (
    <>
      <h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight mb-6 leading-tight">
        Warehouse Routing OpenEnv: Why a 70B Llama Plays a Pick-and-Pack Tour Like a Random Walk
      </h1>

      <p className="text-lg font-serif italic opacity-60 mb-12">
        An OpenEnv-compatible gridworld for multi-stop AMR routing, an honest baseline, and a diagnosis of why prompting alone isn't enough.
      </p>

      {/* Cold Open */}
      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        Oracle vs Frontier Llama, Cold
      </h2>

      <div className="flex gap-4 my-6 flex-wrap">
        <ColdOpenPanel
          title="Oracle (Held-Karp + A*)"
          subtitle="Easy tier · 8×8 grid · 3 SKUs · 64-step budget"
          verdict="9 episodes · mean_score 1.000 · mastered easy + medium + hard"
          verdictColor="text-green-600"
        >
{`(+) Compute optimal tour over SKUs (Held-Karp)
(+) Route between stops with A* (obstacle-aware)
(+) Replay the move sequence: E S E S S S E E ...
(+) Visit SKU 1 → SKU 2 → SKU 3 → return to warehouse
(+) done · all SKUs visited · robot at base`}
        </ColdOpenPanel>

        <ColdOpenPanel
          title="Llama 3.3 70B (Groq, zero-shot)"
          subtitle="Same env. Same tier. Same step budget."
          verdict="3 episodes · mean_score 0.000 · success_rate 0.00"
          verdictColor="text-red-500"
        >
{`(-) N  reward=-0.06 error=invalid_move   ← already at row 0
(-) N  reward=-0.06 error=invalid_move
(-) N  reward=-0.06 error=invalid_move
(-) N  ×35 in a row, all invalid_move
(-) ...
(-) E W E W E W ...  ← variation 3, 64 steps oscillating
(-) budget exhausted · 0 SKUs visited`}
        </ColdOpenPanel>
      </div>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        Both agents face the same task: visit every SKU on a small grid and return to the warehouse, in fewer steps than the optimal tour allows. The oracle solves it perfectly because it has a TSP solver and an A* path planner. Llama 3.3 70B, given the same observation as JSON each turn and asked for a single letter (N/S/E/W), bumps the north wall 35 times in a row in one episode and oscillates east-west for 64 straight steps in another. Both fail with score 0.000.
      </p>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        This isn't a story about a small open model being weak. It's a story about <em className="opacity-70">statelessness</em>. The model is asked to plan a multi-step route through a bare JSON snapshot of the world. It has no memory of which moves it just tried, no record of which walls it just hit, and no scratchpad to plan a tour. Frontier prompting, with a frontier model, scores zero.
      </p>

      {/* The Gap */}
      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        The Gap
      </h2>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        Classical TSP solvers — Held-Karp, Lin-Kernighan, Concorde — are decades-old and effectively perfect on small instances. If you hand a model the SKU coordinates, the obstacles, and the warehouse, you don't need a language model at all; you call <code className="bg-anthropic-text/5 px-1.5 py-0.5 rounded text-sm font-mono">python_tsp</code> and you're done. That's exactly what our oracle does, which is why it scores 1.000.
      </p>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        But the OpenEnv hackathon premise — and the more interesting research question — is different: <em className="opacity-70">can a language model, exposed only to a grid observation each turn, learn to plan and execute a multi-stop route?</em> Not by being handed a TSP solver, but by reasoning over partial observations, action feedback, and accumulated reward.
      </p>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        warehouse-routing-openenv is built to answer that question. The agent sees the grid, picks a single move, gets feedback, and iterates. No coordinates are pre-summarized. No "legal moves" hint is provided. The only escape from a wall is to remember you just hit it.
      </p>

      {/* What a Warehouse Robot Actually Does */}
      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        What a Warehouse Robot Actually Does
      </h2>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        An autonomous mobile robot in a fulfillment center has a deceptively simple loop: pick up packing material at the warehouse, drive to each SKU pick location in some order, then return to the packing station. The hard part is the ordering — visiting <code className="bg-anthropic-text/5 px-1.5 py-0.5 rounded text-sm font-mono">n</code> SKUs has <code className="bg-anthropic-text/5 px-1.5 py-0.5 rounded text-sm font-mono">n!</code> possible tours, and the floor is full of static obstacles (shelves, conveyors, charging stations) that constrain which paths are even possible.
      </p>

      <p className="text-lg leading-relaxed opacity-90 mb-4">warehouse-routing-openenv distills this to a 2D gridworld:</p>

      <ul className="list-disc pl-6 mb-6 space-y-2 text-lg leading-relaxed opacity-90">
        <li><strong>Warehouse</strong> — the packing station, where every episode begins and must end</li>
        <li><strong>SKUs</strong> — pick locations to visit (1 on easy, more on medium/hard)</li>
        <li><strong>Obstacles</strong> — blocked cells that force the agent to plan around them</li>
        <li><strong>Step budget</strong> — a hard cap; running out is a failure</li>
      </ul>

      <p className="text-lg leading-relaxed opacity-90 mb-4">The agent picks one of four moves per turn:</p>

      <CodeBlock>
{`Action(move="N")  # north (row - 1)
Action(move="S")  # south (row + 1)
Action(move="E")  # east  (col + 1)
Action(move="W")  # west  (col - 1)`}
      </CodeBlock>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        That's the entire action space. No tools, no SQL, no JOINs — just spatial reasoning under partial information.
      </p>

      {/* Built on OpenEnv */}
      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        Built on OpenEnv
      </h2>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        <a href="https://github.com/meta-pytorch/OpenEnv" target="_blank" rel="noopener noreferrer" className="text-anthropic-accent hover:underline inline-flex items-center gap-1">
          OpenEnv <ExternalLink size={14} />
        </a> provides a Gymnasium-style HTTP contract for agentic RL environments. The interface is small and well-defined:
      </p>

      <ul className="list-disc pl-6 mb-6 space-y-2 text-lg leading-relaxed opacity-90">
        <li><code className="bg-anthropic-text/5 px-1.5 py-0.5 rounded text-sm font-mono">POST /reset</code> — start a new episode, return the initial observation</li>
        <li><code className="bg-anthropic-text/5 px-1.5 py-0.5 rounded text-sm font-mono">POST /step</code> — execute one action, return observation + reward + done flag</li>
        <li><code className="bg-anthropic-text/5 px-1.5 py-0.5 rounded text-sm font-mono">GET /state</code> — session metadata (episode id, step count)</li>
      </ul>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        warehouse-routing wraps a Pydantic-typed environment in a FastAPI shim, ships as a Docker image, and runs on Hugging Face Spaces. Pydantic enforces typed contracts at every boundary so a malformed action returns 422, never silent corruption:
      </p>

      <CodeBlock>
{`env = WarehouseRoutingEnvironment()
obs = env.reset()
# obs.tier="easy"  obs.sku_locations=[(3,2),(7,7),(4,4)]  obs.robot_pos=(0,0)

obs = env.step(Action(move="E"))
# obs.robot_pos=(0,1)  reward=-0.01  done=false`}
      </CodeBlock>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        On top of this, we mount a self-contained SVG grid viewer at <code className="bg-anthropic-text/5 px-1.5 py-0.5 rounded text-sm font-mono">/ui</code>: vanilla JS, no Gradio, no extra deps. It polls <code className="bg-anthropic-text/5 px-1.5 py-0.5 rounded text-sm font-mono">/state</code>, calls <code className="bg-anthropic-text/5 px-1.5 py-0.5 rounded text-sm font-mono">/reset</code> and <code className="bg-anthropic-text/5 px-1.5 py-0.5 rounded text-sm font-mono">/step</code> via fetch, and renders the warehouse, SKUs (visited and not), obstacles, robot, and a breadcrumb trail. You can drive an episode with the on-screen d-pad or your arrow keys.
      </p>

      {/* Reward Architecture */}
      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        Reward Architecture
      </h2>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        Three components combine on every step. The constants live in <code className="bg-anthropic-text/5 px-1.5 py-0.5 rounded text-sm font-mono">reward.py</code> and are deliberately small so the shaping doesn't dominate the terminal score:
      </p>

      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-anthropic-text/5">
              <th className="text-left p-3 border border-anthropic-text/10 font-medium">Component</th>
              <th className="text-left p-3 border border-anthropic-text/10 font-medium">Signal</th>
              <th className="text-left p-3 border border-anthropic-text/10 font-medium">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border border-anthropic-text/10"><strong>Step cost</strong></td>
              <td className="p-3 border border-anthropic-text/10">Charged on every move (valid or not)</td>
              <td className="p-3 border border-anthropic-text/10 text-red-500">−0.01</td>
            </tr>
            <tr className="bg-anthropic-text/[0.02]">
              <td className="p-3 border border-anthropic-text/10"><strong>Invalid penalty</strong></td>
              <td className="p-3 border border-anthropic-text/10">Added when the move is blocked (wall, obstacle, off-grid)</td>
              <td className="p-3 border border-anthropic-text/10 text-red-500">−0.05</td>
            </tr>
            <tr>
              <td className="p-3 border border-anthropic-text/10"><strong>SKU visit bonus</strong></td>
              <td className="p-3 border border-anthropic-text/10">Granted the first time the agent reaches a SKU cell</td>
              <td className="p-3 border border-anthropic-text/10 text-green-600">+0.10</td>
            </tr>
            <tr className="bg-anthropic-text/[0.02]">
              <td className="p-3 border border-anthropic-text/10"><strong>Terminal (success)</strong></td>
              <td className="p-3 border border-anthropic-text/10">Held-Karp optimal length divided by agent's step count</td>
              <td className="p-3 border border-anthropic-text/10 text-green-600">optimal / steps</td>
            </tr>
            <tr>
              <td className="p-3 border border-anthropic-text/10"><strong>Terminal (failure)</strong></td>
              <td className="p-3 border border-anthropic-text/10">Budget exhausted without visiting all SKUs and returning</td>
              <td className="p-3 border border-anthropic-text/10 text-red-500">−0.20</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        The terminal bonus is the load-bearing piece. Because it scales as <code className="bg-anthropic-text/5 px-1.5 py-0.5 rounded text-sm font-mono">optimal_length / agent_steps</code>, an agent that takes the optimal tour scores exactly 1.0; an agent that takes twice as many steps scores 0.5; an agent that fails scores below zero. This is the same ratio the grader uses for the final episode score, so the RL signal and the leaderboard metric are aligned by construction.
      </p>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        The shaped pieces (step cost, invalid penalty, SKU bonus) provide dense feedback during the episode without overwhelming the terminal. Crucially, the invalid penalty is small enough (−0.05) that a model wall-bumping for 35 turns isn't catastrophic in raw reward — but it's catastrophic in <em className="opacity-70">opportunity cost</em>, because every wasted step is a step closer to budget exhaustion.
      </p>

      {/* Curriculum */}
      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        Curriculum: Easy → Medium → Hard
      </h2>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        warehouse-routing ships with a deterministic curriculum runner. The agent starts on Easy (small grid, few SKUs, no obstacles) and must master a tier — three successful variations in a row — before the runner promotes it to Medium and then Hard. Within a tier, every variation is generated from a deterministic seed so runs are reproducible.
      </p>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        Critically, <strong>tier transitions happen between episodes, not within</strong>. One episode is bound to one tier. The agent doesn't escalate mid-tour; it has to demonstrate mastery before the runner makes the world harder. The curriculum is a real curriculum, not a difficulty knob.
      </p>

      {/* Baselines */}
      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        Baselines
      </h2>

      <p className="text-lg leading-relaxed opacity-90 mb-6">Three policies frame the learning space:</p>

      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-anthropic-text/5">
              <th className="text-left p-3 border border-anthropic-text/10 font-medium">Policy</th>
              <th className="text-left p-3 border border-anthropic-text/10 font-medium">mean_score</th>
              <th className="text-left p-3 border border-anthropic-text/10 font-medium">success_rate</th>
              <th className="text-left p-3 border border-anthropic-text/10 font-medium">n</th>
              <th className="text-left p-3 border border-anthropic-text/10 font-medium">Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-green-500/10">
              <td className="p-3 border border-anthropic-text/10 font-semibold">Oracle (Held-Karp + A*)</td>
              <td className="p-3 border border-anthropic-text/10 text-green-600 font-semibold">1.000</td>
              <td className="p-3 border border-anthropic-text/10 text-green-600">1.00</td>
              <td className="p-3 border border-anthropic-text/10">9</td>
              <td className="p-3 border border-anthropic-text/10">Mastered easy + medium + hard</td>
            </tr>
            <tr className="bg-red-500/10">
              <td className="p-3 border border-anthropic-text/10 font-semibold">Llama 3.3 70B (Groq, zero-shot)</td>
              <td className="p-3 border border-anthropic-text/10 text-red-500">0.000</td>
              <td className="p-3 border border-anthropic-text/10 text-red-500">0.00</td>
              <td className="p-3 border border-anthropic-text/10">3</td>
              <td className="p-3 border border-anthropic-text/10">Easy only — never advanced</td>
            </tr>
            <tr>
              <td className="p-3 border border-anthropic-text/10 font-semibold">Random (uniform N/S/E/W)</td>
              <td className="p-3 border border-anthropic-text/10 text-red-500">0.000</td>
              <td className="p-3 border border-anthropic-text/10 text-red-500">0.00</td>
              <td className="p-3 border border-anthropic-text/10">9</td>
              <td className="p-3 border border-anthropic-text/10">Curriculum never promotes past easy</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        The result that should jump out: a 70B frontier instruction-tuned model and a uniform random policy score the same. That's a strong claim and it deserves an explanation, which is the next section.
      </p>

      {/* What the Llama Baseline Did Wrong */}
      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        What the Llama Baseline Did Wrong
      </h2>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        We ran <code className="bg-anthropic-text/5 px-1.5 py-0.5 rounded text-sm font-mono">inference.py</code> against Groq's <code className="bg-anthropic-text/5 px-1.5 py-0.5 rounded text-sm font-mono">llama-3.3-70b-versatile</code> with the default prompt: a system message describing the task and the current observation as JSON. Three failure modes accounted for the 0.000 score.
      </p>

      <div className="flex gap-4 my-6 flex-wrap">
        <Card
          emoji="🧱"
          title="Wall Bumping"
          color="text-red-500"
          question='"Visit all SKUs and return to base"'
          outcome="35 wasted steps · budget burned · 0 SKUs"
          insight='Robot was at row 0. Model kept choosing N for 35 turns despite getting invalid_move back every time.'
          code={`step 9:  N  invalid_move
step 10: N  invalid_move
step 11: N  invalid_move
... 35 N's in a row ...
step 43: N  invalid_move
step 44: S  -0.01  ← finally not N`}
        />
        <Card
          emoji="🔁"
          title="Oscillation"
          color="text-orange-500"
          question='"Visit all SKUs and return to base"'
          outcome="64 steps · 0 spatial progress"
          insight="Pure E↔W ping-pong for 64 straight steps. Model has no memory that it just made the inverse move last turn."
          code={`step 1: E
step 2: W
step 3: E
step 4: W
... 60 more E↔W swaps ...
step 64: E  done · score 0.000`}
        />
        <Card
          emoji="🪞"
          title="No Memory"
          color="text-blue-500"
          question="Why both above happen"
          outcome="stateless prompt → repeating choice"
          insight="Each turn is independent. No move history, no last reward, no error trace. The model isn't 'wrong' — it can't learn from feedback it never sees."
          code={`user: { "robot_pos": {"row":0,"col":0},
         "sku_locations": [...],
         "obstacles": [],
         "visited": [false,false,false],
         "tier": "easy" }
assistant: N
(next turn, identical context)
user: { "robot_pos": {"row":0,"col":0}, ...
assistant: N`}
        />
      </div>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        The third card is the diagnosis. The first two are symptoms. Our default <code className="bg-anthropic-text/5 px-1.5 py-0.5 rounded text-sm font-mono">OpenAIPolicy.choose</code> sends only the current observation, asks for a single letter, and gets one. The model has no scratchpad and no view of its own past moves. Even Llama 3.3 70B, which has no trouble doing this kind of reasoning when shown context, can't recover from feedback it isn't shown.
      </p>

      {/* The Learning Space */}
      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        The Learning Space
      </h2>

      <p className="text-lg leading-relaxed opacity-90 mb-6">The interesting region is between the two zero-scoring baselines and the perfect oracle:</p>

      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-anthropic-text/5">
              <th className="text-left p-3 border border-anthropic-text/10 font-medium">Policy</th>
              <th className="text-left p-3 border border-anthropic-text/10 font-medium">Reward source</th>
              <th className="text-left p-3 border border-anthropic-text/10 font-medium">Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border border-anthropic-text/10">Random</td>
              <td className="p-3 border border-anthropic-text/10">Uniform N/S/E/W, no model</td>
              <td className="p-3 border border-anthropic-text/10 text-red-500">0.000</td>
            </tr>
            <tr className="bg-red-500/10">
              <td className="p-3 border border-anthropic-text/10">Llama 3.3 70B (zero-shot, no history)</td>
              <td className="p-3 border border-anthropic-text/10">Stateless prompt</td>
              <td className="p-3 border border-anthropic-text/10 text-red-500">0.000</td>
            </tr>
            <tr>
              <td className="p-3 border border-anthropic-text/10">?</td>
              <td className="p-3 border border-anthropic-text/10">Llama + move history + error feedback</td>
              <td className="p-3 border border-anthropic-text/10 italic opacity-70">open question</td>
            </tr>
            <tr className="bg-anthropic-text/[0.02]">
              <td className="p-3 border border-anthropic-text/10">?</td>
              <td className="p-3 border border-anthropic-text/10">Llama + history + chain-of-thought</td>
              <td className="p-3 border border-anthropic-text/10 italic opacity-70">open question</td>
            </tr>
            <tr>
              <td className="p-3 border border-anthropic-text/10">?</td>
              <td className="p-3 border border-anthropic-text/10">Small open model + GRPO on this env</td>
              <td className="p-3 border border-anthropic-text/10 italic opacity-70">open question</td>
            </tr>
            <tr className="bg-green-500/10">
              <td className="p-3 border border-anthropic-text/10 font-semibold">Oracle</td>
              <td className="p-3 border border-anthropic-text/10">Held-Karp + A*</td>
              <td className="p-3 border border-anthropic-text/10 text-green-600 font-semibold">1.000</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        The point of the environment isn't to crown a winner. It's to surface what's missing in a direct prompt-the-model setup, and to give a reproducible substrate for testing fixes. The three open questions above are the obvious next experiments.
      </p>

      {/* Next Steps */}
      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        Next Steps
      </h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-serif font-medium mb-3">Prompt history.</h3>
          <p className="text-lg leading-relaxed opacity-90">
            The smallest, cheapest fix: include the last <em className="opacity-70">k</em> moves, the last reward, and any error string in the user message. Both wall-bumping and oscillation are <em className="opacity-70">caused</em> by the model not seeing this; both should disappear when it does. Tracked as <a href="https://github.com/mahadevaiahrashmi/play2/issues/26" target="_blank" rel="noopener noreferrer" className="text-anthropic-accent hover:underline inline-flex items-center gap-1">issue #26 <ExternalLink size={14} /></a>. Expected: easy-tier mean_score ≥ 0.30 from history alone, no other changes.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-serif font-medium mb-3">Chain-of-thought before action.</h3>
          <p className="text-lg leading-relaxed opacity-90">
            Raise <code className="bg-anthropic-text/5 px-1.5 py-0.5 rounded text-sm font-mono">max_tokens</code> from 4 to ~200 and let the model reason about which direction makes spatial sense before emitting the letter. Larger models often plan a multi-step route in the scratchpad and then execute it. This is layered on top of history, not instead of it.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-serif font-medium mb-3">Train a small open model with GRPO.</h3>
          <p className="text-lg leading-relaxed opacity-90">
            The reward function is already shaped for RL: dense step-level signal, terminal aligned with the leaderboard score, deterministic curriculum. The natural next experiment is to take a 0.5–1.5B model, SFT-warm-start it on a few oracle trajectories, then run GRPO over the curriculum. We have not done this yet — that would be a follow-up post with real numbers, not a hand-wave.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-serif font-medium mb-3">Harder tiers and obstacles.</h3>
          <p className="text-lg leading-relaxed opacity-90">
            Easy tier is intentionally trivial so failures of the sort above are obvious. Medium and Hard tiers add more SKUs and obstacle density, which is where the spatial-planning bottleneck becomes hard even with history. The curriculum is set up to gate progression on real mastery rather than just episode count, so unstable policies can't sneak past Easy.
          </p>
        </div>
      </div>

      {/* Try It Yourself */}
      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        Try It Yourself
      </h2>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        The environment runs on Hugging Face Spaces as a Docker image. The default <code className="bg-anthropic-text/5 px-1.5 py-0.5 rounded text-sm font-mono">/web</code> route was the openenv-stock Gradio interface; we re-pointed the App tab to <code className="bg-anthropic-text/5 px-1.5 py-0.5 rounded text-sm font-mono">/ui</code>, our SVG grid viewer, so the landing page shows the world directly:
      </p>

      <ul className="list-disc pl-6 mb-6 space-y-3 text-lg leading-relaxed opacity-90">
        <li>
          <strong>Live environment</strong>: <a href="https://huggingface.co/spaces/Rashmi-mahadevaiah/drone" target="_blank" rel="noopener noreferrer" className="text-anthropic-accent hover:underline inline-flex items-center gap-1">huggingface.co/spaces/Rashmi-mahadevaiah/drone <ExternalLink size={14} /></a> — drive an episode in your browser
        </li>
        <li>
          <strong>Direct grid viewer</strong>: <a href="https://rashmi-mahadevaiah-drone.hf.space/ui" target="_blank" rel="noopener noreferrer" className="text-anthropic-accent hover:underline inline-flex items-center gap-1">rashmi-mahadevaiah-drone.hf.space/ui <ExternalLink size={14} /></a> — the SVG UI without the HF wrapper
        </li>
        <li>
          <strong>Inference baseline</strong>: <code className="bg-anthropic-text/5 px-1.5 py-0.5 rounded text-sm font-mono">python inference.py --max-variations 3</code> with <code className="bg-anthropic-text/5 px-1.5 py-0.5 rounded text-sm font-mono">GROQ_API_KEY</code> set reproduces the 0.000 result
        </li>
        <li>
          <strong>Source</strong>: <a href="https://github.com/mahadevaiahrashmi/play2" target="_blank" rel="noopener noreferrer" className="text-anthropic-accent hover:underline inline-flex items-center gap-1">github.com/mahadevaiahrashmi/play2 <ExternalLink size={14} /></a> — full source, ADRs, and tracking artifacts
        </li>
      </ul>

      {/* Discussion */}
      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        Discussion
      </h2>

      <div className="space-y-6">
        <div>
          <p className="text-lg leading-relaxed opacity-90 mb-3">
            <strong>Stateless prompts have a ceiling, and it's lower than people think.</strong> A 70B instruction-tuned model is more than capable of solving an 8×8 TSP with three stops <em className="opacity-70">given the right context</em>. The same model, exposed only to a JSON snapshot per turn with no memory across turns, scores zero. The model's parameter count is not the constraint here; the I/O contract is. This generalizes beyond gridworlds: any agentic environment that re-issues the same observation when the agent fails to make progress will see this exact failure mode.
          </p>
        </div>
        <div>
          <p className="text-lg leading-relaxed opacity-90 mb-3">
            <strong>Honest baselines beat optimistic ones.</strong> It would have been easy to write this post around a "Llama solves the easy tier" headline by quietly adding a "you just bumped a wall" hint to the prompt. We didn't, because the interesting result is what the model does with the stock contract, not what it does with a workaround. The 0.000 baseline is the artifact future improvements will be measured against.
          </p>
        </div>
        <div>
          <p className="text-lg leading-relaxed opacity-90 mb-3">
            <strong>The environment is the contribution.</strong> warehouse-routing-openenv doesn't depend on which model or which RL algorithm you bring. The action space, reward function, and curriculum are designed to be measurable, reproducible, and small enough to iterate on. The oracle gives you a tight upper bound, the random policy gives you a tight lower bound, and the LLM baseline tells you the gap is real.
          </p>
        </div>
      </div>

      <p className="text-base opacity-60 mt-12 pt-6 border-t border-anthropic-text/10">
        <em>Style and format gratefully adapted from <a href="https://huggingface.co/spaces/hjerpe/sqlenv-blog" target="_blank" rel="noopener noreferrer" className="text-anthropic-accent hover:underline inline-flex items-center gap-1">hjerpe/sqlenv-blog <ExternalLink size={14} /></a>.</em>
      </p>
    </>
  );
}

function RichFeynPost() {
  return (
    <>
      <h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight mb-6 leading-tight">
        RichFeyn: Building the Smartest Kitchen
      </h1>

      <p className="text-lg font-serif italic opacity-60 mb-12">
        Automating the repetitive to make room for what matters.
      </p>

      <div className="my-12">
        <img 
          src="/blog-assets/richfeyn/Smart_jar.png" 
          alt="RichFeyn Smart Jar" 
          className="w-full rounded-2xl shadow-xl border border-anthropic-text/10"
        />
        <p className="text-sm opacity-50 mt-4 text-center italic">The RichFeyn Smart Jar: Your kitchen, automated.</p>
      </div>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        In the fast-paced world of modern living, time is the most precious commodity. Yet, we still spend hours every month on the most repetitive of tasks: checking kitchen supplies, writing shopping lists, and hopping between multiple delivery apps.
      </p>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        <strong>RichFeyn</strong> was founded with a single, powerful mission: to redefine what's possible by streamlining and automating these daily routines. Our flagship product, the <strong>Smart Jar</strong>, is the first step toward a truly autonomous kitchen.
      </p>

      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        Never Run Out Again
      </h2>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        The RichFeyn Smart Jar isn't just a container; it's an intelligent inventory management system. By combining custom IoT hardware with computer vision and natural language processing, we created a device that knows exactly how much you have left and knows exactly when to get more.
      </p>

      <div className="grid md:grid-cols-2 gap-8 my-12">
        <div className="space-y-6">
          <div className="p-6 bg-anthropic-text/5 border border-anthropic-text/10 rounded-xl">
            <h3 className="font-serif text-xl mb-2">Save Time</h3>
            <p className="opacity-80">No more manual inventory checks or list-making. The system handles the "what" and "when" of your kitchen supplies.</p>
          </div>
          <div className="p-6 bg-anthropic-text/5 border border-anthropic-text/10 rounded-xl">
            <h3 className="font-serif text-xl mb-2">Zero Stress</h3>
            <p className="opacity-80">Just-in-time delivery ensures your staples arrive exactly when you need them, not when you've already run out mid-recipe.</p>
          </div>
          <div className="p-6 bg-anthropic-text/5 border border-anthropic-text/10 rounded-xl">
            <h3 className="font-serif text-xl mb-2">One-Time Setup</h3>
            <p className="opacity-80">Configure your preferred retailers and time slots once, then let the automation take over.</p>
          </div>
        </div>
        <div className="flex items-center">
          <img 
            src="/blog-assets/richfeyn/How_smartjar_works.png" 
            alt="How it works" 
            className="rounded-xl shadow-lg border border-anthropic-text/10"
          />
        </div>
      </div>

      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        The Technology Behind the Jar
      </h2>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        Building a "set and forget" experience required a sophisticated tech stack. We utilized <strong>Computer Vision</strong> to accurately track inventory levels without requiring user input. Our backend uses <strong>NLP</strong> to process restocking prompts and interface with various grocery retailers autonomously.
      </p>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        Whether it's transforming phone camera images into professional visuals for SMEs or building cross-platform mobile apps with Python and React Native to automate household orders, RichFeyn has always been about applying cutting-edge AI to real-world problems.
      </p>

      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        See It In Action
      </h2>
      
      <div className="my-12">
        <video 
          controls 
          className="w-full rounded-2xl shadow-lg border border-anthropic-text/10"
        >
          <source src="/blog-assets/richfeyn/Richfeyn_demo_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <p className="text-sm opacity-50 mt-4 text-center italic">A quick demonstration of the RichFeyn Smart Jar ecosystem.</p>
      </div>

      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        The Future of Living
      </h2>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        RichFeyn is more than a smart jar company. It's a partner in simplifying and enhancing everyday life. We believe that by automating the mundane, we empower people to thrive in a fast-paced world and focus on what truly matters.
      </p>
    </>
  );
}

function ClaudeStyleReplicationPost() {
  return (
    <>
      <h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight mb-6 leading-tight">
        Replicating Claude Code's Communication Styles in Gemini CLI & Codex CLI: A Complete Guide
      </h1>

      <p className="text-lg font-serif italic opacity-60 mb-12">
        A guide to custom slash commands, profiles, and configuration scripts.
      </p>

      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        Introduction
      </h2>
      <p className="text-lg leading-relaxed opacity-90 mb-6">
        If you have used <strong>Claude Code</strong> from Anthropic, you have likely appreciated its elegant communication style selector:
      </p>
      <CodeBlock>
{`1. Default     Claude completes coding tasks efficiently and provides concise responses
2. Explanatory Claude explains its implementation choices and codebase patterns  
3. Learning    Claude pauses and asks you to write small pieces of code for hands-on practice`}
      </CodeBlock>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        But what if you prefer <strong>Gemini CLI</strong> or <strong>Codex CLI</strong>? Do they offer similar flexibility?
      </p>
      <p className="text-lg leading-relaxed opacity-90 mb-6 font-semibold">
        Short answer: Not natively, but with a little setup, you can replicate (and even enhance) these styles in both tools.
      </p>

      <p className="text-lg leading-relaxed opacity-90 mb-4">In this guide, you will learn:</p>
      <ul className="list-disc pl-6 mb-6 space-y-2 text-lg leading-relaxed opacity-90">
        <li>Mimic all three styles in <strong>Gemini CLI</strong></li>
        <li>Achieve the same in <strong>Codex CLI</strong></li>
        <li>Ready-to-copy configuration files and one-command setup scripts</li>
      </ul>

      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        Understanding the Three Styles
      </h2>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-anthropic-text/5">
              <th className="text-left p-3 border border-anthropic-text/10 font-medium">Style</th>
              <th className="text-left p-3 border border-anthropic-text/10 font-medium">Behavior</th>
              <th className="text-left p-3 border border-anthropic-text/10 font-medium">Best For</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border border-anthropic-text/10 font-semibold">Default</td>
              <td className="p-3 border border-anthropic-text/10 text-red-500">Fast, concise, task-focused</td>
              <td className="p-3 border border-anthropic-text/10">Quick iterations</td>
            </tr>
            <tr className="bg-anthropic-text/[0.02]">
              <td className="p-3 border border-anthropic-text/10 font-semibold">Explanatory</td>
              <td className="p-3 border border-anthropic-text/10 text-orange-500">Explains reasoning, patterns</td>
              <td className="p-3 border border-anthropic-text/10">Learning codebases</td>
            </tr>
            <tr>
              <td className="p-3 border border-anthropic-text/10 font-semibold">Learning</td>
              <td className="p-3 border border-anthropic-text/10 text-blue-500">Interactive mentor: pauses, asks you to code</td>
              <td className="p-3 border border-anthropic-text/10">Hands-on practice</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        Gemini CLI Setup
      </h2>
      <p className="text-lg leading-relaxed opacity-90 mb-6">
        Gemini CLI shines with its support for <strong>custom slash commands</strong> and <strong>GEMINI.md</strong> persistent context files.
      </p>

      <h3 className="text-xl font-serif font-medium mt-8 mb-4">Step 1: Create the Commands Directory</h3>
      <CodeBlock>{`mkdir -p ~/.gemini/commands`}</CodeBlock>

      <h3 className="text-xl font-serif font-medium mt-8 mb-4">Step 2: Create Configuration Files</h3>
      <p className="text-lg leading-relaxed opacity-90 mb-4">
        Create TOML files inside <code className="bg-anthropic-text/5 px-1.5 py-0.5 rounded text-sm font-mono">~/.gemini/commands/</code>:
      </p>

      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-sans uppercase tracking-widest opacity-60 mb-2">default.toml</h4>
          <CodeBlock>
{`description = "Default concise and efficient mode"
prompt = """
You are now in Default mode (Claude Code style).
Complete the following coding task efficiently with concise responses:

{{args}}

No unnecessary explanations unless asked.
"""`}
          </CodeBlock>
        </div>

        <div>
          <h4 className="text-sm font-sans uppercase tracking-widest opacity-60 mb-2">explain.toml</h4>
          <CodeBlock>
{`description = "Explanatory mode: explains choices and patterns"
prompt = """
You are now in Explanatory mode.

Task: {{args}}

For this task:
- Think step-by-step and explain your reasoning clearly.
- Describe implementation choices, trade-offs, and patterns.
- Then implement only after I confirm.
"""`}
          </CodeBlock>
        </div>
      </div>

      <h3 className="text-xl font-serif font-medium mt-8 mb-4">Step 3: Use Your New Commands</h3>
      <CodeBlock>
{`/explain refactor the payment service to use async/await
/learn implement JWT authentication
/default add dark mode toggle`}
      </CodeBlock>

      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        Codex CLI Setup
      </h2>
      <p className="text-lg leading-relaxed opacity-90 mb-6">
        Codex CLI uses <strong>profiles</strong>, <strong>personalities</strong>, and <strong>AGENTS.md</strong> files for customization.
      </p>

      <h3 className="text-xl font-serif font-medium mt-8 mb-4">Step 1: Update Your Config</h3>
      <CodeBlock>
{`[profiles.default]
personality = "pragmatic"
approval_mode = "auto"

[profiles.explanatory]
personality = "friendly"
approval_mode = "auto"

[profiles.learning]
personality = "friendly"
approval_mode = "read-only"`}
      </CodeBlock>

      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        Final Thoughts
      </h2>
      <p className="text-lg leading-relaxed opacity-90 mb-6 text-center italic">
        "You do not need to switch tools to get the workflow you want. With a few config files and smart prompting, you can tailor any AI coding assistant to your learning style, team workflow, or project needs."
      </p>
    </>
  );
}

const postContentBySlug: Record<string, ComponentType> = {
  "warehouse-routing-openenv": WarehouseRoutingPost,
  "richfeyn-smart-jar": RichFeynPost,
  "claude-style-replication": ClaudeStyleReplicationPost,
};

function setMetaByName(name: string, content: string) {
  let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function setMetaByProperty(property: string, content: string) {
  let tag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function setCanonical(url: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", url);
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);
  const Content = post ? postContentBySlug[post.slug] : null;

  useEffect(() => {
    const defaultTitle = "Rashmi Mahadevaiah | AI/ML Engineer & Product Leader";
    const defaultDescription =
      "Rashmi Mahadevaiah — AI/ML Engineer & Product Leader with 13+ years in LLMs, NLP, RAG, agentic AI, data science, and product management. IIT Madras alumni.";
    const previousTitle = document.title;
    const previousCanonical = (document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null)?.href;
    const previousLd = document.getElementById("article-ld-json");

    if (!post || !Content) {
      document.title = "Post not found | Rashmi Mahadevaiah";
      setMetaByName("description", defaultDescription);
      setCanonical(`${window.location.origin}/blog`);
      return () => {
        document.title = previousTitle;
        if (previousCanonical) setCanonical(previousCanonical);
      };
    }

    const url = `${window.location.origin}/blog/${post.slug}`;
    const title = `${post.title}: ${post.subtitle} | Rashmi Mahadevaiah`;
    const description = post.excerpt;

    document.title = title;
    setMetaByName("description", description);
    setCanonical(url);
    setMetaByProperty("og:type", "article");
    setMetaByProperty("og:title", title);
    setMetaByProperty("og:description", description);
    setMetaByProperty("og:url", url);
    setMetaByName("twitter:card", "summary_large_image");
    setMetaByName("twitter:title", title);
    setMetaByName("twitter:description", description);

    if (previousLd) {
      previousLd.remove();
    }
    const articleLd = document.createElement("script");
    articleLd.id = "article-ld-json";
    articleLd.type = "application/ld+json";
    articleLd.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: `${post.title}: ${post.subtitle}`,
      description,
      datePublished: post.date,
      dateModified: post.date,
      author: {
        "@type": "Person",
        name: "Rashmi Mahadevaiah",
      },
      mainEntityOfPage: url,
      url,
      keywords: post.tags.join(", "),
    });
    document.head.appendChild(articleLd);

    return () => {
      document.title = previousTitle || defaultTitle;
      setMetaByName("description", defaultDescription);
      if (previousCanonical) {
        setCanonical(previousCanonical);
      } else {
        setCanonical(window.location.origin);
      }
      const currentLd = document.getElementById("article-ld-json");
      if (currentLd) {
        currentLd.remove();
      }
    };
  }, [post, Content]);

  if (!post || !Content) {
    return (
      <div className="min-h-screen selection:bg-anthropic-accent/20">
        <nav className="fixed top-0 w-full z-50 bg-anthropic-bg/80 backdrop-blur-sm border-b border-anthropic-text/5">
          <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link to="/" className="font-serif text-xl font-medium tracking-tight hover:opacity-80 transition-opacity">
              Rashmi Mahadevaiah
            </Link>
            <div className="flex gap-4 sm:gap-8 text-[11px] sm:text-sm font-sans uppercase tracking-[0.14em] sm:tracking-widest opacity-60 whitespace-nowrap">
              <Link to="/" className="hover:opacity-100 transition-opacity">Home</Link>
              <Link to="/blog" className="hover:opacity-100 transition-opacity">Blog</Link>
              <a href="/#contact" className="hover:opacity-100 transition-opacity">Contact</a>
            </div>
          </div>
        </nav>
        <main className="max-w-5xl mx-auto px-6 pt-32 pb-24 text-center">
          <h1 className="text-4xl font-serif font-light mb-6">Post not found</h1>
          <Link to="/blog" className="text-anthropic-accent hover:underline">← Back to blog</Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen selection:bg-anthropic-accent/20">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-anthropic-bg/80 backdrop-blur-sm border-b border-anthropic-text/5 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="font-serif text-xl font-medium tracking-tight hover:opacity-80 transition-opacity">
            Rashmi Mahadevaiah
          </Link>
          <div className="flex items-center gap-4 sm:gap-8 text-[11px] sm:text-sm font-sans uppercase tracking-[0.14em] sm:tracking-widest opacity-60 whitespace-nowrap">
            <Link to="/" className="hover:opacity-100 transition-opacity">Home</Link>
            <Link to="/blog" className="hover:opacity-100 transition-opacity">Blog</Link>
            <a href="/#contact" className="hover:opacity-100 transition-opacity">Contact</a>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-24">
        {/* Back link & meta */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-sans uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity mb-6">
            <ArrowLeft size={14} /> Back to blog
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-anthropic-text/5 rounded-md text-xs font-sans uppercase tracking-wider opacity-70"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 text-sm font-sans opacity-50 mb-6">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
        </motion.div>

        {/* Post content */}
        <Content />
      </main>

      <footer className="max-w-5xl mx-auto px-6 py-12 border-t border-anthropic-text/5 flex flex-col md:flex-row justify-between items-center gap-4 opacity-40 text-xs font-sans uppercase tracking-[0.2em]">
        <span>© 2026 Rashmi Mahadevaiah</span>
        <span>Built with precision and care</span>
      </footer>
    </div>
  );
}
