// agent-notes: { ctx: "Build-from-scratch warehouse routing OpenEnv tutorial blog post content", deps: ["lucide-react", "react-router-dom", "../../components/blog-helpers", "../../components/blog-prose"], state: active, last: "sato@2026-04-18", key: ["extracted from BlogPost.tsx for #29 split; prose primitives applied #28"] }
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { InlineCode, ClaudeCodeBlock } from "../../components/blog-helpers";
import { PostH2, PostP, PostUL, PostOL } from "../../components/blog-prose";

export default function BuildWarehouseRoutingPost() {
  return (
    <>
      <h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight mb-6 leading-tight">
        Build the Warehouse Robot Environment, From Scratch
      </h1>

      <p className="text-lg font-serif italic opacity-60 mb-12">
        How the <Link to="/blog/warehouse-routing-openenv" className="text-anthropic-accent hover:underline">Warehouse Routing OpenEnv</Link> was built — explained so a high schooler can read it, understand it, and build their own copy in an afternoon.
      </p>

      <PostH2>
        What you'll build, in one paragraph
      </PostH2>
      <PostP>
        A small Python project that draws a tiny warehouse on a grid, drops in a pretend robot, and turns the whole thing into a <strong>web service any AI can talk to</strong>. The AI sends "move north" or "move east" — your service moves the robot, hands back what it sees, and gives it a number that says "good job" or "bad idea." That's it. Five short files, around 150 lines of Python. The same shape that <a href="https://github.com/mahadevaiahrashmi/play2" target="_blank" rel="noopener noreferrer" className="text-anthropic-accent hover:underline">play2</a> uses for the real research — just trimmed down so you can read every line.
      </PostP>
      <PostP>
        <strong>What's assumed:</strong> you can install Python and you've typed at least one command into a terminal. That's all. We'll explain Pydantic, FastAPI, and the OpenEnv contract as they appear.
      </PostP>

      <PostH2>
        What is an "environment"?
      </PostH2>
      <PostP>
        Think of an <strong>environment</strong> the way a sports coach thinks about a <em>training ground</em>. The athlete (an AI) shows up and practices; the training ground decides what happens. The athlete punts the ball — the ground says where it lands. The athlete sinks a putt — the ground says "+1 point." The athlete trips over their own feet — the ground says "−1 point." After the session, the athlete (hopefully) plays better.
      </PostP>
      <PostP>
        Our training ground is a 6×6 warehouse. The athlete is some AI. What we're building is the <em>ground</em>: the rules of the world, the score-keeper, and the doorway the athlete walks through to use it.
      </PostP>

      <PostH2>
        Agent vs environment — the two roles
      </PostH2>
      <PostP>
        Two characters, that's it. The whole field of AI training pivots on the line between them, so it's worth getting the names straight up front.
      </PostP>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse font-serif">
          <thead>
            <tr className="bg-anthropic-text/5">
              <th className="p-3 border border-anthropic-text/10 font-bold text-left">Role</th>
              <th className="p-3 border border-anthropic-text/10 font-bold text-left">Job</th>
              <th className="p-3 border border-anthropic-text/10 font-bold text-left">In our project</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border border-anthropic-text/10"><strong>Agent</strong></td>
              <td className="p-3 border border-anthropic-text/10">Decides what to do next, given what it can see</td>
              <td className="p-3 border border-anthropic-text/10">Some AI somewhere — a Python script, a language model, a learned policy</td>
            </tr>
            <tr className="bg-anthropic-text/[0.02]">
              <td className="p-3 border border-anthropic-text/10"><strong>Environment</strong></td>
              <td className="p-3 border border-anthropic-text/10">Holds the world. Applies actions. Hands out observations and rewards.</td>
              <td className="p-3 border border-anthropic-text/10">The five files you're about to write</td>
            </tr>
          </tbody>
        </table>
      </div>
      <PostP>
        Crucially, <strong>they live on opposite sides of a wall</strong>. The agent never reaches into the environment to read its private variables; the environment never reads the agent's private thoughts. They only ever exchange two things — an observation and an action — through a fixed doorway. That doorway is what OpenEnv standardizes.
      </PostP>
      <PostP>
        Why be so strict? Because if an environment can be talked to in <em>exactly one way</em>, then any agent that knows that way can practice in any environment. Swap the warehouse for a chess board; swap the language model for a tiny neural network; the wall doesn't move. Standards make experiments comparable.
      </PostP>

      <PostH2>
        The reinforcement-learning loop, in plain English
      </PostH2>
      <PostP>
        Think about how you learned to ride a bike. Nobody handed you a manual. You wobbled, fell, got back up, leaned a different way, and slowly your brain figured out which moves kept you upright. That's <strong>reinforcement learning (RL)</strong> in one paragraph: try a thing, see what happens, get a feeling about how well that went, and over many tries, do more of what worked.
      </PostP>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        Formally, it's a four-step loop that repeats until the round is over:
      </p>
      <PostOL>
        <li><strong>Observe.</strong> The agent sees the current state of the world (where the robot is, where the shelves are, which ones are still unvisited).</li>
        <li><strong>Act.</strong> The agent picks an action from its allowed list (here: N, S, E, or W).</li>
        <li><strong>Receive.</strong> The environment applies the action and hands back a new observation, a reward number, and a "is the round over?" flag.</li>
        <li><strong>Learn (optional).</strong> If the agent is a learning algorithm, it updates its strategy: actions that led to high rewards get a bit more likely; actions that led to low rewards get a bit less likely.</li>
      </PostOL>
      <PostP>
        Repeat. Then repeat across thousands of rounds. The point of an environment is to make this loop <em>cheap</em>: a real warehouse robot can fall over a hundred times before lunch and break itself; a simulated robot can fall over a million times before lunch and just print a log line.
      </PostP>
      <PostP>
        A few words you'll see in any RL paper, all of which we just defined:
      </PostP>
      <PostUL>
        <li><strong>Episode</strong> — one round, from <InlineCode>reset</InlineCode> until <InlineCode>done=true</InlineCode>.</li>
        <li><strong>Policy</strong> — the agent's current strategy. "If I see X, do Y." For a language model, the policy is the model itself.</li>
        <li><strong>Return</strong> — the total reward an agent collects across one episode. Maximizing this, on average, is the whole goal.</li>
        <li><strong>Reward shaping</strong> — picking the small per-step rewards (like <InlineCode>−0.01</InlineCode> per move and <InlineCode>+0.10</InlineCode> per shelf visited) so the agent gets useful feedback before the round ends. Done badly, agents learn to game the shape rather than win the game; we'll see why this matters in <InlineCode>reward.py</InlineCode>.</li>
      </PostUL>
      <PostP>
        That's the conceptual backdrop. Now back to the contract that lets the agent and environment actually talk.
      </PostP>

      <PostH2>
        The three-rule contract OpenEnv asks for
      </PostH2>
      <PostP>
        <a href="https://github.com/meta-pytorch/OpenEnv" target="_blank" rel="noopener noreferrer" className="text-anthropic-accent hover:underline">OpenEnv</a> is Meta's standard for "training grounds." It only asks for three things, and every environment in the world has to answer them the same way:
      </PostP>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse font-serif">
          <thead>
            <tr className="bg-anthropic-text/5">
              <th className="p-3 border border-anthropic-text/10 font-bold text-left">Request</th>
              <th className="p-3 border border-anthropic-text/10 font-bold text-left">Plain English</th>
              <th className="p-3 border border-anthropic-text/10 font-bold text-left">Returns</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border border-anthropic-text/10"><InlineCode>POST /reset</InlineCode></td>
              <td className="p-3 border border-anthropic-text/10">Start a new round. Wipe the board.</td>
              <td className="p-3 border border-anthropic-text/10">An <em>observation</em> — what the world looks like right now</td>
            </tr>
            <tr className="bg-anthropic-text/[0.02]">
              <td className="p-3 border border-anthropic-text/10"><InlineCode>POST /step</InlineCode></td>
              <td className="p-3 border border-anthropic-text/10">Here's my move. Apply it.</td>
              <td className="p-3 border border-anthropic-text/10">A new observation, plus a <em>reward</em> number, plus a <em>done</em> flag</td>
            </tr>
            <tr>
              <td className="p-3 border border-anthropic-text/10"><InlineCode>GET /state</InlineCode></td>
              <td className="p-3 border border-anthropic-text/10">What round is this and how many moves so far?</td>
              <td className="p-3 border border-anthropic-text/10">A small status report</td>
            </tr>
          </tbody>
        </table>
      </div>
      <PostP>
        That's the entire contract. Any AI that knows OpenEnv can talk to any environment that follows it — your warehouse robot today, a chess board tomorrow, a fake browser the day after. The "plug shape" is the same.
      </PostP>

      <PostH2>
        The five-file game plan
      </PostH2>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        Each file has one job. Read top to bottom and the project unfolds in order:
      </p>
      <ClaudeCodeBlock title="project layout">
{`mini_warehouse/
  models.py     # what an Observation, Action, and Cell look like
  sim.py        # the rules of the world: how a move changes the grid
  reward.py     # the score-keeper
  env.py        # plug models + sim + reward into the OpenEnv shape
  server.py     # turn env.py into a real web service`}
      </ClaudeCodeBlock>
      <PostP>
        That's the same split <a href="https://github.com/mahadevaiahrashmi/play2/tree/main/src/warehouse_routing" target="_blank" rel="noopener noreferrer" className="text-anthropic-accent hover:underline">play2 uses in production</a> — they have a few extra files for harder grids, optimal-path math, and a curriculum, but the core is these five.
      </PostP>

      <PostH2>
        How the pieces fit together
      </PostH2>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        Same five files, drawn as a picture. The agent on the left is whatever AI you point at the service; the dashed box on the right is everything you're about to build:
      </p>
      <div className="my-8 flex justify-center">
        <svg viewBox="0 0 760 360" className="w-full max-w-3xl text-anthropic-text" role="img" aria-label="Architecture: AI agent talking over HTTP to a server containing env.py, sim.py, models.py, and reward.py">
          <defs>
            <marker id="bw-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" fillOpacity="0.6" />
            </marker>
            <marker id="bw-arrow-faint" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" fillOpacity="0.35" />
            </marker>
          </defs>

          {/* AI agent box */}
          <rect x="20" y="140" width="160" height="90" rx="10" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" />
          <text x="100" y="175" textAnchor="middle" fill="currentColor" fontFamily="serif" fontSize="16" fontWeight="500">AI agent</text>
          <text x="100" y="198" textAnchor="middle" fill="currentColor" fillOpacity="0.6" fontSize="11">script · LLM · learned</text>
          <text x="100" y="213" textAnchor="middle" fill="currentColor" fillOpacity="0.6" fontSize="11">policy</text>

          {/* Arrow agent -> server */}
          <line x1="180" y1="170" x2="280" y2="170" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.8" markerEnd="url(#bw-arrow)" />
          <text x="230" y="160" textAnchor="middle" fill="currentColor" fillOpacity="0.7" fontSize="11" fontFamily="ui-monospace, Menlo, monospace">POST /step</text>

          {/* Arrow server -> agent */}
          <line x1="280" y1="200" x2="180" y2="200" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.8" markerEnd="url(#bw-arrow)" />
          <text x="230" y="220" textAnchor="middle" fill="currentColor" fillOpacity="0.7" fontSize="11" fontFamily="ui-monospace, Menlo, monospace">obs + reward + done</text>

          {/* Server outer dashed box */}
          <rect x="280" y="40" width="460" height="290" rx="12" fill="currentColor" fillOpacity="0.02" stroke="#cc785c" strokeOpacity="0.55" strokeWidth="1.5" strokeDasharray="5 4" />
          <text x="510" y="62" textAnchor="middle" fill="currentColor" fillOpacity="0.65" fontSize="11" fontFamily="ui-sans-serif, system-ui" letterSpacing="2">YOUR WEB SERVICE — server.py</text>

          {/* env.py block (top, full width) */}
          <rect x="310" y="80" width="400" height="56" rx="8" fill="#10b981" fillOpacity="0.12" stroke="#10b981" strokeOpacity="0.7" strokeWidth="1.5" />
          <text x="510" y="105" textAnchor="middle" fill="currentColor" fontFamily="ui-monospace, Menlo, monospace" fontSize="13" fontWeight="600">env.py</text>
          <text x="510" y="124" textAnchor="middle" fill="currentColor" fillOpacity="0.75" fontSize="11">subclasses Environment · implements reset() and step()</text>

          {/* sim.py block (middle, full width) */}
          <rect x="310" y="155" width="400" height="56" rx="8" fill="#3b82f6" fillOpacity="0.12" stroke="#3b82f6" strokeOpacity="0.7" strokeWidth="1.5" />
          <text x="510" y="180" textAnchor="middle" fill="currentColor" fontFamily="ui-monospace, Menlo, monospace" fontSize="13" fontWeight="600">sim.py</text>
          <text x="510" y="199" textAnchor="middle" fill="currentColor" fillOpacity="0.75" fontSize="11">Grid · applies the move, checks walls, marks SKU visits</text>

          {/* models.py block (bottom-left) */}
          <rect x="310" y="230" width="190" height="80" rx="8" fill="#f59e0b" fillOpacity="0.12" stroke="#f59e0b" strokeOpacity="0.7" strokeWidth="1.5" />
          <text x="405" y="258" textAnchor="middle" fill="currentColor" fontFamily="ui-monospace, Menlo, monospace" fontSize="13" fontWeight="600">models.py</text>
          <text x="405" y="278" textAnchor="middle" fill="currentColor" fillOpacity="0.75" fontSize="11">Pydantic shapes:</text>
          <text x="405" y="294" textAnchor="middle" fill="currentColor" fillOpacity="0.75" fontSize="11">Cell · Observation · Action</text>

          {/* reward.py block (bottom-right) */}
          <rect x="520" y="230" width="190" height="80" rx="8" fill="#f43f5e" fillOpacity="0.12" stroke="#f43f5e" strokeOpacity="0.7" strokeWidth="1.5" />
          <text x="615" y="258" textAnchor="middle" fill="currentColor" fontFamily="ui-monospace, Menlo, monospace" fontSize="13" fontWeight="600">reward.py</text>
          <text x="615" y="278" textAnchor="middle" fill="currentColor" fillOpacity="0.75" fontSize="11">score-keeper:</text>
          <text x="615" y="294" textAnchor="middle" fill="currentColor" fillOpacity="0.75" fontSize="11">step cost · bonus · terminal</text>

          {/* Internal arrows: env -> sim, sim -> models, sim -> reward */}
          <line x1="510" y1="136" x2="510" y2="153" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.4" markerEnd="url(#bw-arrow-faint)" />
          <line x1="430" y1="211" x2="430" y2="228" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.4" markerEnd="url(#bw-arrow-faint)" />
          <line x1="590" y1="211" x2="590" y2="228" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.4" markerEnd="url(#bw-arrow-faint)" />
        </svg>
      </div>
      <PostP>
        Read the diagram top-down inside the dashed box: <strong>env.py</strong> sits on top because it's the public face — the OpenEnv contract. It delegates the actual move to <strong>sim.py</strong>, which uses the data shapes from <strong>models.py</strong> and asks <strong>reward.py</strong> for a number on the way out. The arrows on the left are the only thing the AI agent ever sees — pure HTTP, in and out.
      </PostP>

      <PostH2>
        Step 0 — Make a folder and install the ingredients
      </PostH2>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        You'll need <strong>Python 3.12 or newer</strong>. Check with <InlineCode>python --version</InlineCode>; if it's older, grab the latest from <a href="https://www.python.org/downloads/" target="_blank" rel="noopener noreferrer" className="text-anthropic-accent hover:underline">python.org/downloads</a>. Then in a terminal:
      </p>
      <ClaudeCodeBlock title="set up the project">
{`mkdir mini_warehouse
cd mini_warehouse
python -m venv .venv
source .venv/bin/activate     # on Windows: .venv\\Scripts\\activate
pip install pydantic fastapi uvicorn "openenv-core[core]>=0.2.2"`}
      </ClaudeCodeBlock>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        What each ingredient does:
      </p>
      <PostUL>
        <li><strong>pydantic</strong> — describes the shape of your data and yells loudly if anyone sends garbage. Like a bouncer for JSON.</li>
        <li><strong>fastapi</strong> — turns Python functions into web endpoints. Used internally by OpenEnv.</li>
        <li><strong>uvicorn</strong> — the actual web server that runs your FastAPI app.</li>
        <li><strong>openenv-core</strong> — Meta's library. Gives you a base class to fill in, then builds the standard <InlineCode>/reset</InlineCode>, <InlineCode>/step</InlineCode>, <InlineCode>/state</InlineCode> endpoints for free.</li>
      </PostUL>

      <PostH2>
        Step 1 — Describe the world (<InlineCode>models.py</InlineCode>)
      </PostH2>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        Before anything moves, we need to say <em>what the world looks like</em>. Three small data shapes:
      </p>
      <PostUL>
        <li><InlineCode>Cell</InlineCode> — a single grid square: a row and a column.</li>
        <li><InlineCode>Observation</InlineCode> — the snapshot the robot sees: grid size, where the warehouse is, where the SKUs are, where the robot is, which SKUs it's already visited.</li>
        <li><InlineCode>Action</InlineCode> — what the robot is allowed to do: move N, S, E, or W.</li>
      </PostUL>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        Pydantic lets us describe each shape in a few lines. The <InlineCode>Literal["N", "S", "E", "W"]</InlineCode> bit means "if anyone sends anything other than those four letters, reject it." That single line removes a whole category of bugs.
      </p>
      <ClaudeCodeBlock title="mini_warehouse/models.py">
{`from typing import Literal
from openenv.core.env_server.types import Action as _Action
from openenv.core.env_server.types import Observation as _Observation
from pydantic import BaseModel, Field

Move = Literal["N", "S", "E", "W"]


class Cell(BaseModel):
    row: int = Field(ge=0)
    col: int = Field(ge=0)


class Observation(_Observation):
    grid_rows: int = 6
    grid_cols: int = 6
    warehouse: Cell
    sku_locations: list[Cell]
    robot_pos: Cell
    visited: list[bool]
    steps_taken: int = 0
    step_budget: int = 40


class Action(_Action):
    move: Move`}
      </ClaudeCodeBlock>
      <PostP>
        We're inheriting <InlineCode>_Observation</InlineCode> and <InlineCode>_Action</InlineCode> from OpenEnv so our shapes plug into its server. Everything else is regular Pydantic. <InlineCode>Field(ge=0)</InlineCode> means "this number must be ≥ 0" — try sending a row of −5 and Pydantic returns a polite HTTP 422 instead of corrupting your state.
      </PostP>

      <PostH2>
        Step 2 — Make the world tick (<InlineCode>sim.py</InlineCode>)
      </PostH2>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        This file holds the rules of physics for our tiny warehouse. Given an action, it figures out where the robot ends up, whether the move was legal, and whether the round is over. No reward math, no AI — just bookkeeping.
      </p>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        The <InlineCode>OFFSETS</InlineCode> dictionary is the whole movement system in four lines: "N" = "row goes down by one," and so on. Then <InlineCode>step</InlineCode> applies the offset, checks for walls, marks any new SKU visit, and decides if the round is done.
      </p>
      <ClaudeCodeBlock title="mini_warehouse/sim.py">
{`from dataclasses import dataclass
from mini_warehouse.models import Action, Cell, Observation

OFFSETS = {"N": (-1, 0), "S": (1, 0), "E": (0, 1), "W": (0, -1)}


@dataclass
class StepResult:
    observation: Observation
    invalid: bool
    newly_visited: bool
    done: bool


class Grid:
    def __init__(self, obs: Observation) -> None:
        self.obs = obs
        self.skus = {(c.row, c.col): i for i, c in enumerate(obs.sku_locations)}

    def step(self, action: Action) -> StepResult:
        dr, dc = OFFSETS[action.move]
        new_row = self.obs.robot_pos.row + dr
        new_col = self.obs.robot_pos.col + dc
        steps = self.obs.steps_taken + 1
        out_of_bounds = not (0 <= new_row < self.obs.grid_rows and 0 <= new_col < self.obs.grid_cols)
        budget_done = steps >= self.obs.step_budget

        if out_of_bounds:
            self.obs = self.obs.model_copy(update={"steps_taken": steps, "done": budget_done})
            return StepResult(self.obs, invalid=True, newly_visited=False, done=budget_done)

        new_pos = Cell(row=new_row, col=new_col)
        visited = list(self.obs.visited)
        newly = False
        if (new_row, new_col) in self.skus:
            i = self.skus[(new_row, new_col)]
            if not visited[i]:
                visited[i] = True
                newly = True

        success = all(visited) and new_pos == self.obs.warehouse
        done = success or budget_done
        self.obs = self.obs.model_copy(
            update={"robot_pos": new_pos, "visited": visited, "steps_taken": steps, "done": done}
        )
        return StepResult(self.obs, invalid=False, newly_visited=newly, done=done)`}
      </ClaudeCodeBlock>
      <PostP>
        A few things worth pointing out: <InlineCode>model_copy(update=...)</InlineCode> creates a new Observation with some fields replaced — Pydantic objects are immutable on purpose, which means accidental edits become impossible. The "round is over" rule is "all SKUs visited <em>and</em> back at the warehouse." Going home before visiting everything doesn't count.
      </PostP>

      <PostH2>
        Step 3 — Score the robot (<InlineCode>reward.py</InlineCode>)
      </PostH2>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        After every move, the robot wants a number. A good number means "do more of that"; a bad one means "stop." Picking the right numbers is more art than science — too generous and the robot learns to stall for partial credit, too stingy and it never figures out what works. The play2 reward function uses four constants:
      </p>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse font-serif">
          <thead>
            <tr className="bg-anthropic-text/5">
              <th className="p-3 border border-anthropic-text/10 font-bold text-left">When</th>
              <th className="p-3 border border-anthropic-text/10 font-bold text-left">Number</th>
              <th className="p-3 border border-anthropic-text/10 font-bold text-left">Why</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border border-anthropic-text/10">Every step, no matter what</td>
              <td className="p-3 border border-anthropic-text/10 text-red-500 font-mono">−0.01</td>
              <td className="p-3 border border-anthropic-text/10">Time costs a little — discourages dawdling</td>
            </tr>
            <tr className="bg-anthropic-text/[0.02]">
              <td className="p-3 border border-anthropic-text/10">Move bumped a wall</td>
              <td className="p-3 border border-anthropic-text/10 text-red-500 font-mono">−0.05</td>
              <td className="p-3 border border-anthropic-text/10">A clear "that didn't work, try something else"</td>
            </tr>
            <tr>
              <td className="p-3 border border-anthropic-text/10">Visited a new SKU</td>
              <td className="p-3 border border-anthropic-text/10 text-green-600 font-mono">+0.10</td>
              <td className="p-3 border border-anthropic-text/10">A small treat each time you make real progress</td>
            </tr>
            <tr className="bg-anthropic-text/[0.02]">
              <td className="p-3 border border-anthropic-text/10">Round ends in success</td>
              <td className="p-3 border border-anthropic-text/10 text-green-600 font-mono">optimal / steps</td>
              <td className="p-3 border border-anthropic-text/10">Big payoff, scaled by how efficient you were</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        The "scaled big payoff" is the clever bit. If the robot solves the round in the same number of moves as the perfect solution, it scores <strong>1.0</strong>. If it takes twice as long, it scores <strong>0.5</strong>. So the AI doesn't just want to finish — it wants to finish <em>tidily</em>. Here it is in code:
      </p>
      <ClaudeCodeBlock title="mini_warehouse/reward.py">
{`from mini_warehouse.sim import StepResult


def compute_reward(result: StepResult, optimal_length: int) -> float:
    reward = -0.01                              # every step costs time
    if result.invalid:
        reward += -0.05                         # walls hurt
    if result.newly_visited:
        reward += 0.10                          # new SKU = treat
    if result.done:
        obs = result.observation
        success = all(obs.visited) and obs.robot_pos == obs.warehouse
        if success:
            reward += optimal_length / obs.steps_taken
        else:
            reward += -0.20                     # ran out of time
    return reward`}
      </ClaudeCodeBlock>
      <PostP>
        For our toy version, <InlineCode>optimal_length</InlineCode> can be a fixed number you compute once by hand for the layout — say <strong>10</strong> for the 6×6 grid below. The full play2 repo computes it on the fly using a classical algorithm called Held-Karp; you can read about that in the <Link to="/blog/warehouse-routing-openenv" className="text-anthropic-accent hover:underline">research write-up</Link>.
      </PostP>

      <PostH2>
        Step 4 — Plug into OpenEnv (<InlineCode>env.py</InlineCode>)
      </PostH2>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        OpenEnv gives us a base class called <InlineCode>Environment</InlineCode> with two empty methods: <InlineCode>reset</InlineCode> and <InlineCode>step</InlineCode>. We fill them in, and OpenEnv handles the HTTP plumbing.
      </p>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        Notice the awkward little global <InlineCode>_SESSION</InlineCode>: OpenEnv creates a fresh environment object for every request, so anything that needs to live <em>between</em> requests — the current grid, the current round — has to live outside the class. The play2 repo wraps this in a tidy dataclass; we'll keep it as two plain variables.
      </p>
      <ClaudeCodeBlock title="mini_warehouse/env.py">
{`from openenv.core.env_server.interfaces import Environment
from openenv.core.env_server.types import State
from uuid import uuid4
from mini_warehouse.models import Action, Cell, Observation
from mini_warehouse.reward import compute_reward
from mini_warehouse.sim import Grid

# fixed 6x6 layout: warehouse at (0,0), two shelves to visit
INITIAL = Observation(
    warehouse=Cell(row=0, col=0),
    sku_locations=[Cell(row=2, col=4), Cell(row=5, col=1)],
    robot_pos=Cell(row=0, col=0),
    visited=[False, False],
    done=False,
)
OPTIMAL_STEPS = 14   # the best a perfect player could do on this layout


_GRID: Grid | None = None
_STATE = State(episode_id=str(uuid4()), step_count=0)


class MiniWarehouseEnv(Environment):
    SUPPORTS_CONCURRENT_SESSIONS = False

    def reset(self) -> Observation:
        global _GRID, _STATE
        _GRID = Grid(INITIAL.model_copy())
        _STATE = State(episode_id=str(uuid4()), step_count=0)
        return _GRID.obs.model_copy(update={"reward": 0.0, "metadata": {}})

    def step(self, action: Action) -> Observation:
        global _GRID, _STATE
        if _GRID is None:
            raise RuntimeError("call /reset first")
        result = _GRID.step(action)
        reward = compute_reward(result, OPTIMAL_STEPS)
        _STATE.step_count += 1
        return result.observation.model_copy(update={"reward": reward, "metadata": {}})

    @property
    def state(self) -> State:
        return _STATE`}
      </ClaudeCodeBlock>
      <PostP>
        That's the entire OpenEnv adapter. Everything in <InlineCode>reset</InlineCode> and <InlineCode>step</InlineCode> is your own logic; the base class will take care of turning it into HTTP for you in the next file.
      </PostP>

      <PostH2>
        Step 5 — Serve it on the web (<InlineCode>server.py</InlineCode>)
      </PostH2>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        This is the part that turns five files of Python into a real web service. Eight lines:
      </p>
      <ClaudeCodeBlock title="mini_warehouse/server.py">
{`from openenv.core.env_server.http_server import create_app
from mini_warehouse.env import MiniWarehouseEnv
from mini_warehouse.models import Action, Observation

app = create_app(
    MiniWarehouseEnv,
    Action,
    Observation,
    env_name="mini_warehouse",
    max_concurrent_envs=1,
)`}
      </ClaudeCodeBlock>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        <InlineCode>create_app</InlineCode> takes our environment class plus our two data shapes and hands back a complete FastAPI app with <InlineCode>/reset</InlineCode>, <InlineCode>/step</InlineCode>, <InlineCode>/state</InlineCode>, plus <InlineCode>/schema</InlineCode> (auto-generated docs) and <InlineCode>/health</InlineCode> (a liveness ping). Now run it:
      </p>
      <ClaudeCodeBlock title="start the web service">
{`uvicorn mini_warehouse.server:app --host 0.0.0.0 --port 8000`}
      </ClaudeCodeBlock>
      <PostP>
        You should see a banner ending with <InlineCode>Application startup complete</InlineCode>. The training ground is live at <InlineCode>http://localhost:8000</InlineCode>. Leave it running.
      </PostP>

      <PostH2>
        Step 6 — Drive it with curl
      </PostH2>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        Open a <strong>second</strong> terminal. Reset the world and take one step east:
      </p>
      <ClaudeCodeBlock title="poke the running service">
{`# start a fresh round
curl -X POST http://localhost:8000/reset \\
  -H 'content-type: application/json' -d '{}'

# move the robot one square east
curl -X POST http://localhost:8000/step \\
  -H 'content-type: application/json' \\
  -d '{"action":{"move":"E"}}'`}
      </ClaudeCodeBlock>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        The first command hands back the starting observation. The second hands back a new observation showing the robot at <InlineCode>{`{"row":0,"col":1}`}</InlineCode> plus a reward of <InlineCode>-0.01</InlineCode>. Try a sequence and see if you can finish a round by hand:
      </p>
      <ClaudeCodeBlock title="solve it manually">
{`# E E E E S S          → reach the first SKU at (2,4)
# W W W S S S           → reach the second SKU at (5,1)
# N N N N N W           → return to the warehouse at (0,0)
# the last response will have done=true and a big positive reward`}
      </ClaudeCodeBlock>
      <PostP>
        That's it. You just played the game an AI would play, by hand, against your own server. Anything that can speak HTTP — a Python script, a curl loop, a 70-billion-parameter language model — can do exactly the same dance.
      </PostP>

      <PostH2>
        What you've actually built
      </PostH2>
      <PostP>
        A real OpenEnv environment. Not a demo, not a toy — the same plug shape that <a href="https://github.com/mahadevaiahrashmi/play2" target="_blank" rel="noopener noreferrer" className="text-anthropic-accent hover:underline">play2 ships to Hugging Face</a>. Five Python files, around 150 lines, doing five honest jobs: describe the world, run the rules, score the player, plug into the contract, serve it over the web.
      </PostP>
      <PostP>
        Take a moment for that. People have written entire research papers using environments smaller than this one.
      </PostP>

      <PostH2>
        Where the real play2 goes further
      </PostH2>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        Once your version runs, the play2 repo extends it in five directions. Each one is a single file you can read on its own:
      </p>
      <ul className="list-disc pl-6 mb-6 space-y-3 text-lg leading-relaxed opacity-90 font-serif">
        <li><strong>Random layouts</strong> (<InlineCode>tasks.py</InlineCode>) — the warehouse changes every round, generated from a seed so it's still reproducible. Same idea, just a coordinate generator on top.</li>
        <li><strong>Obstacles</strong> (<InlineCode>tasks.py</InlineCode> + <InlineCode>sim.py</InlineCode>) — blocked cells the robot has to plan around. A breadth-first search guarantees every shelf is still reachable.</li>
        <li><strong>Optimal-length math</strong> (<InlineCode>solver.py</InlineCode>) — instead of a hand-picked <InlineCode>OPTIMAL_STEPS = 14</InlineCode>, it computes the perfect tour using <em>Held-Karp</em> (a TSP solver) and <em>A*</em> (path planning around obstacles).</li>
        <li><strong>Curriculum</strong> (<InlineCode>curriculum.py</InlineCode>) — easy 8×8 grids with no obstacles, then medium 16×16 with some, then hard 24×24 with many. The runner only promotes the AI after three wins in a row at the current level.</li>
        <li><strong>A browser viewer</strong> (<InlineCode>server/ui.py</InlineCode>) — an SVG grid you can drive with arrow keys at <InlineCode>/ui</InlineCode>, no extra libraries.</li>
      </ul>
      <PostP>
        Add them one at a time. Each one is a self-contained idea, and your existing five files don't have to change much to absorb it.
      </PostP>

      <PostH2>
        If something goes wrong
      </PostH2>
      <ul className="list-disc pl-6 mb-6 space-y-3 text-lg leading-relaxed opacity-90 font-serif">
        <li><strong><InlineCode>ModuleNotFoundError: mini_warehouse</InlineCode>.</strong> Run uvicorn from the folder <em>above</em> <InlineCode>mini_warehouse/</InlineCode>, not from inside it. The dotted name <InlineCode>mini_warehouse.server</InlineCode> only works if Python can see the folder.</li>
        <li><strong>Pydantic complains "field required: warehouse".</strong> You probably forgot to send <InlineCode>{`-d '{}'`}</InlineCode> on a <InlineCode>/step</InlineCode> request, or the <InlineCode>action</InlineCode> wrapper. The body must look like <InlineCode>{`{"action":{"move":"E"}}`}</InlineCode>, not just <InlineCode>{`{"move":"E"}`}</InlineCode>.</li>
        <li><strong>Port 8000 is taken.</strong> Pass <InlineCode>--port 8080</InlineCode> (or any unused number) to uvicorn.</li>
        <li><strong>Reward looks wrong on success.</strong> Check that <InlineCode>OPTIMAL_STEPS</InlineCode> matches the layout you defined — for the 6×6 layout above with shelves at (2,4) and (5,1), 14 is honest. If you change the shelves, recompute it (or just use a constant like 10 to keep the math simple).</li>
        <li><strong>The server starts but <InlineCode>/step</InlineCode> 500s.</strong> Almost always "step before reset." Hit <InlineCode>/reset</InlineCode> first; the server tells you so in the traceback.</li>
      </ul>

      <PostH2>
        Where to go next
      </PostH2>
      <ul className="list-disc pl-6 mb-6 space-y-3 text-lg leading-relaxed opacity-90 font-serif">
        <li><Link to="/blog/openenv-play2-setup" className="text-anthropic-accent hover:underline">Run the full play2 experiment on your laptop</Link> — same shape as what you just built, plus the curriculum, the browser viewer, and an optional AI player. Fifteen minutes.</li>
        <li><Link to="/blog/warehouse-routing-openenv" className="text-anthropic-accent hover:underline">Why a 70B Llama plays this like a random walk</Link> — the research deep-dive. Honest baselines, failure modes, and what the next experiment should be.</li>
        <li><a href="https://github.com/mahadevaiahrashmi/play2" target="_blank" rel="noopener noreferrer" className="text-anthropic-accent hover:underline inline-flex items-center gap-1">github.com/mahadevaiahrashmi/play2 <ExternalLink size={14} /></a> — every file you just simplified, in its production form. Read alongside your own version; you'll recognize every piece.</li>
        <li><a href="https://github.com/meta-pytorch/OpenEnv" target="_blank" rel="noopener noreferrer" className="text-anthropic-accent hover:underline inline-flex items-center gap-1">github.com/meta-pytorch/OpenEnv <ExternalLink size={14} /></a> — the standard itself, with more example environments to read for inspiration.</li>
      </ul>

      <div className="mt-16 pt-8 border-t border-anthropic-text/10 opacity-60 text-sm font-serif">
        <p className="font-bold mb-4 font-serif">Resources:</p>
        <ul className="space-y-2 font-serif">
          <li><a href="https://github.com/mahadevaiahrashmi/play2" target="_blank" rel="noopener noreferrer" className="hover:text-anthropic-accent underline">play2 — the production warehouse environment</a></li>
          <li><a href="https://github.com/meta-pytorch/OpenEnv" target="_blank" rel="noopener noreferrer" className="hover:text-anthropic-accent underline">OpenEnv — the standard you just built against</a></li>
          <li><a href="https://docs.pydantic.dev/latest/" target="_blank" rel="noopener noreferrer" className="hover:text-anthropic-accent underline">Pydantic docs — for shaping data correctly</a></li>
          <li><a href="https://fastapi.tiangolo.com/" target="_blank" rel="noopener noreferrer" className="hover:text-anthropic-accent underline">FastAPI tutorial — for understanding what create_app generated</a></li>
        </ul>
      </div>
    </>
  );
}
