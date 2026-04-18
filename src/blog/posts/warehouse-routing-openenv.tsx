// agent-notes: { ctx: "Warehouse Routing OpenEnv blog post content", deps: ["lucide-react", "../../components/blog-helpers", "../../components/blog-prose"], state: active, last: "sato@2026-04-18", key: ["extracted from BlogPost.tsx for #29 split; prose primitives applied #28"] }
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ExternalLink } from "lucide-react";
import { InlineCode, ClaudeCodeBlock, Card, ColdOpenPanel } from "../../components/blog-helpers";
import { PostH2 } from "../../components/blog-prose";

export default function WarehouseRoutingPost() {
  return (
    <>
      <h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight mb-6 leading-tight">
        Warehouse Routing OpenEnv: Why a 70B Llama Plays a Pick-and-Pack Tour Like a Random Walk
      </h1>

      <p className="text-lg font-serif italic opacity-60 mb-12">
        An OpenEnv-compatible gridworld for multi-stop AMR routing, an honest baseline, and a diagnosis of why prompting alone isn't enough.
      </p>

      {/* Cold Open */}
      <PostH2>
        Oracle vs Frontier Llama, Cold
      </PostH2>

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
      <PostH2>
        The Gap
      </PostH2>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        Classical TSP solvers — Held-Karp, Lin-Kernighan, Concorde — are decades-old and effectively perfect on small instances. If you hand a model the SKU coordinates, the obstacles, and the warehouse, you don't need a language model at all; you call <InlineCode>python_tsp</InlineCode> and you're done. That's exactly what our oracle does, which is why it scores 1.000.
      </p>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        But the OpenEnv hackathon premise — and the more interesting research question — is different: <em className="opacity-70">can a language model, exposed only to a grid observation each turn, learn to plan and execute a multi-stop route?</em> Not by being handed a TSP solver, but by reasoning over partial observations, action feedback, and accumulated reward.
      </p>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        warehouse-routing-openenv is built to answer that question. The agent sees the grid, picks a single move, gets feedback, and iterates. No coordinates are pre-summarized. No "legal moves" hint is provided. The only escape from a wall is to remember you just hit it.
      </p>

      {/* What a Warehouse Robot Actually Does */}
      <PostH2>
        What a Warehouse Robot Actually Does
      </PostH2>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        An autonomous mobile robot in a fulfillment center has a deceptively simple loop: pick up packing material at the warehouse, drive to each SKU pick location in some order, then return to the packing station. The hard part is the ordering — visiting <InlineCode>n</InlineCode> SKUs has <InlineCode>n!</InlineCode> possible tours, and the floor is full of static obstacles (shelves, conveyors, charging stations) that constrain which paths are even possible.
      </p>

      <p className="text-lg leading-relaxed opacity-90 mb-4">warehouse-routing-openenv distills this to a 2D gridworld:</p>

      <ul className="list-disc pl-6 mb-6 space-y-2 text-lg leading-relaxed opacity-90">
        <li><strong>Warehouse</strong> — the packing station, where every episode begins and must end</li>
        <li><strong>SKUs</strong> — pick locations to visit (1 on easy, more on medium/hard)</li>
        <li><strong>Obstacles</strong> — blocked cells that force the agent to plan around them</li>
        <li><strong>Step budget</strong> — a hard cap; running out is a failure</li>
      </ul>

      <p className="text-lg leading-relaxed opacity-90 mb-4">The agent picks one of four moves per turn:</p>

      <ClaudeCodeBlock title="Action Space (Python)">
{`Action(move="N")  # north (row - 1)
Action(move="S")  # south (row + 1)
Action(move="E")  # east  (col + 1)
Action(move="W")  # west  (col - 1)`}
      </ClaudeCodeBlock>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        That's the entire action space. No tools, no SQL, no JOINs — just spatial reasoning under partial information.
      </p>

      {/* Built on OpenEnv */}
      <PostH2>
        Built on OpenEnv
      </PostH2>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        <a href="https://github.com/meta-pytorch/OpenEnv" target="_blank" rel="noopener noreferrer" className="text-anthropic-accent hover:underline inline-flex items-center gap-1">
          OpenEnv <ExternalLink size={14} />
        </a> provides a Gymnasium-style HTTP contract for agentic RL environments. The interface is small and well-defined:
      </p>

      <ul className="list-disc pl-6 mb-6 space-y-2 text-lg leading-relaxed opacity-90">
        <li><InlineCode>POST /reset</InlineCode> — start a new episode, return the initial observation</li>
        <li><InlineCode>POST /step</InlineCode> — execute one action, return observation + reward + done flag</li>
        <li><InlineCode>GET /state</InlineCode> — session metadata (episode id, step count)</li>
      </ul>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        warehouse-routing wraps a Pydantic-typed environment in a FastAPI shim, ships as a Docker image, and runs on Hugging Face Spaces. Pydantic enforces typed contracts at every boundary so a malformed action returns 422, never silent corruption:
      </p>

      <ClaudeCodeBlock title="Pydantic Environment API (Python)">
{`env = WarehouseRoutingEnvironment()
obs = env.reset()
# obs.tier="easy"  obs.sku_locations=[(3,2),(7,7),(4,4)]  obs.robot_pos=(0,0)

obs = env.step(Action(move="E"))
# obs.robot_pos=(0,1)  reward=-0.01  done=false`}
      </ClaudeCodeBlock>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        On top of this, we mount a self-contained SVG grid viewer at <InlineCode>/ui</InlineCode>: vanilla JS, no Gradio, no extra deps. It polls <InlineCode>/state</InlineCode>, calls <InlineCode>/reset</InlineCode> and <InlineCode>/step</InlineCode> via fetch, and renders the warehouse, SKUs (visited and not), obstacles, robot, and a breadcrumb trail. You can drive an episode with the on-screen d-pad or your arrow keys.
      </p>

      {/* Reward Architecture */}
      <PostH2>
        Reward Architecture
      </PostH2>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        Three components combine on every step. The constants live in <InlineCode>reward.py</InlineCode> and are deliberately small so the shaping doesn't dominate the terminal score:
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
        The terminal bonus is the load-bearing piece. Because it scales as <InlineCode>optimal_length / agent_steps</InlineCode>, an agent that takes the optimal tour scores exactly 1.0; an agent that takes twice as many steps scores 0.5; an agent that fails scores below zero. This is the same ratio the grader uses for the final episode score, so the RL signal and the leaderboard metric are aligned by construction.
      </p>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        The shaped pieces (step cost, invalid penalty, SKU bonus) provide dense feedback during the episode without overwhelming the terminal. Crucially, the invalid penalty is small enough (−0.05) that a model wall-bumping for 35 turns isn't catastrophic in raw reward — but it's catastrophic in <em className="opacity-70">opportunity cost</em>, because every wasted step is a step closer to budget exhaustion.
      </p>

      {/* Curriculum */}
      <PostH2>
        Curriculum: Easy → Medium → Hard
      </PostH2>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        warehouse-routing ships with a deterministic curriculum runner. The agent starts on Easy (small grid, few SKUs, no obstacles) and must master a tier — three successful variations in a row — before the runner promotes it to Medium and then Hard. Within a tier, every variation is generated from a deterministic seed so runs are reproducible.
      </p>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        Critically, <strong>tier transitions happen between episodes, not within</strong>. One episode is bound to one tier. The agent doesn't escalate mid-tour; it has to demonstrate mastery before the runner makes the world harder. The curriculum is a real curriculum, not a difficulty knob.
      </p>

      {/* Baselines */}
      <PostH2>
        Baselines
      </PostH2>

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
      <PostH2>
        What the Llama Baseline Did Wrong
      </PostH2>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        We ran <InlineCode>inference.py</InlineCode> against Groq's <InlineCode>llama-3.3-70b-versatile</InlineCode> with the default prompt: a system message describing the task and the current observation as JSON. Three failure modes accounted for the 0.000 score.
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
        The third card is the diagnosis. The first two are symptoms. Our default <InlineCode>OpenAIPolicy.choose</InlineCode> sends only the current observation, asks for a single letter, and gets one. The model has no scratchpad and no view of its own past moves. Even Llama 3.3 70B, which has no trouble doing this kind of reasoning when shown context, can't recover from feedback it isn't shown.
      </p>

      {/* The Learning Space */}
      <PostH2>
        The Learning Space
      </PostH2>

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
      <PostH2>
        Next Steps
      </PostH2>

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
            Raise <InlineCode>max_tokens</InlineCode> from 4 to ~200 and let the model reason about which direction makes spatial sense before emitting the letter. Larger models often plan a multi-step route in the scratchpad and then execute it. This is layered on top of history, not instead of it.
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
      <PostH2>
        Try It Yourself
      </PostH2>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        The environment runs on Hugging Face Spaces as a Docker image. The default <InlineCode>/web</InlineCode> route was the openenv-stock Gradio interface; we re-pointed the App tab to <InlineCode>/ui</InlineCode>, our SVG grid viewer, so the landing page shows the world directly:
      </p>

      <ul className="list-disc pl-6 mb-6 space-y-3 text-lg leading-relaxed opacity-90">
        <li>
          <strong>Live environment</strong>: <a href="https://huggingface.co/spaces/Rashmi-mahadevaiah/drone" target="_blank" rel="noopener noreferrer" className="text-anthropic-accent hover:underline inline-flex items-center gap-1">huggingface.co/spaces/Rashmi-mahadevaiah/drone <ExternalLink size={14} /></a> — drive an episode in your browser
        </li>
        <li>
          <strong>Direct grid viewer</strong>: <a href="https://rashmi-mahadevaiah-drone.hf.space/ui" target="_blank" rel="noopener noreferrer" className="text-anthropic-accent hover:underline inline-flex items-center gap-1">rashmi-mahadevaiah-drone.hf.space/ui <ExternalLink size={14} /></a> — the SVG UI without the HF wrapper
        </li>
        <li>
          <strong>Inference baseline</strong>: <InlineCode>python inference.py --max-variations 3</InlineCode> with <InlineCode>GROQ_API_KEY</InlineCode> set reproduces the 0.000 result
        </li>
        <li>
          <strong>Source</strong>: <a href="https://github.com/mahadevaiahrashmi/play2" target="_blank" rel="noopener noreferrer" className="text-anthropic-accent hover:underline inline-flex items-center gap-1">github.com/mahadevaiahrashmi/play2 <ExternalLink size={14} /></a> — full source, ADRs, and tracking artifacts
        </li>
      </ul>

      {/* Discussion */}
      <PostH2>
        Discussion
      </PostH2>

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
