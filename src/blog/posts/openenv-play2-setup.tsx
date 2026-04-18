// agent-notes: { ctx: "OpenEnv play2 setup walkthrough blog post content", deps: ["react-router-dom", "../../components/blog-helpers", "../../components/blog-prose"], state: active, last: "sato@2026-04-18", key: ["extracted from BlogPost.tsx for #29 split; prose primitives applied #28"] }
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from "react-router-dom";
import { InlineCode, ClaudeCodeBlock } from "../../components/blog-helpers";
import { PostH2, PostP, PostUL, PostOL } from "../../components/blog-prose";

export default function OpenEnvPlay2SetupPost() {
  return (
    <>
      <h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight mb-6 leading-tight">
        Run the Warehouse Robot Experiment on Your Own Computer
      </h1>

      <p className="text-lg font-serif italic opacity-60 mb-12">
        A plain-English walkthrough of the OpenEnv setup in the <InlineCode>play2</InlineCode> repository — with every copy-paste command explained, and what to do if something breaks.
      </p>

      <PostH2>
        What this post is about
      </PostH2>
      <PostP>
        There's a little experiment on GitHub called <a href="https://github.com/mahadevaiahrashmi/play2" target="_blank" rel="noopener noreferrer" className="text-anthropic-accent hover:underline">play2</a>. It creates a small fake warehouse on your computer, puts a pretend robot in it, and lets an AI try to pick up packages from three different shelves. If you'd like the research background — why a state-of-the-art AI ties with random guessing on this task — the <Link to="/blog/warehouse-routing-openenv" className="text-anthropic-accent hover:underline">technical write-up</Link> has the numbers. This post is the how-to: how to get the whole thing running on your own laptop in about fifteen minutes.
      </PostP>
      <PostP>
        <strong>No Python, Docker, or command-line experience is assumed.</strong> Each step below has a plain explanation of what it does and why. If a command feels scary, you can skim the explanation first and come back to run it.
      </PostP>

      <PostH2>
        What is OpenEnv, in one paragraph?
      </PostH2>
      <PostP>
        <strong>OpenEnv</strong> is a free, open standard — made by Meta's PyTorch team — for describing "little worlds" that AI models can practice in. A world could be a game, a puzzle, a maze, a warehouse, or a simulated web browser. The standard says: <em>every world must answer three simple requests</em> — "start a new round," "take this action," and "tell me what's going on." As long as a world answers those three requests in a standard way, any AI can be dropped into it, tested, and compared fairly. Think of OpenEnv as a <strong>plug shape</strong> that lets different AIs and different worlds click into each other.
      </PostP>
      <PostP>
        The <InlineCode>play2</InlineCode> repository is one such world: a tiny warehouse where a robot has to visit three shelves and return home, built to the OpenEnv plug shape.
      </PostP>

      <PostH2>
        What you'll end up with
      </PostH2>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        By the end of this walk-through:
      </p>
      <PostUL>
        <li>A folder on your laptop with the full warehouse environment source code.</li>
        <li>A small program running on your own machine that you can open in a browser and poke with commands.</li>
        <li>The ability to run the same test an AI would run — and see it pass or fail with your own eyes.</li>
        <li>(Optional) A published copy on <strong>Hugging Face Spaces</strong> so the world can use it without installing anything.</li>
      </PostUL>

      <PostH2>
        What you need installed first
      </PostH2>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        Three pieces of free software. If you already have them, skip ahead. If not, follow the links — each one is a standard installer for your operating system:
      </p>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse font-serif">
          <thead>
            <tr className="bg-anthropic-text/5">
              <th className="p-3 border border-anthropic-text/10 font-bold text-left">Tool</th>
              <th className="p-3 border border-anthropic-text/10 font-bold text-left">What it's for</th>
              <th className="p-3 border border-anthropic-text/10 font-bold text-left">Where to get it</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border border-anthropic-text/10"><strong>Git</strong></td>
              <td className="p-3 border border-anthropic-text/10">Downloads the project from GitHub</td>
              <td className="p-3 border border-anthropic-text/10"><a href="https://git-scm.com/downloads" target="_blank" rel="noopener noreferrer" className="text-anthropic-accent hover:underline">git-scm.com/downloads</a></td>
            </tr>
            <tr>
              <td className="p-3 border border-anthropic-text/10"><strong>Python 3.12+</strong></td>
              <td className="p-3 border border-anthropic-text/10">The language the simulator is written in</td>
              <td className="p-3 border border-anthropic-text/10"><a href="https://www.python.org/downloads/" target="_blank" rel="noopener noreferrer" className="text-anthropic-accent hover:underline">python.org/downloads</a></td>
            </tr>
            <tr>
              <td className="p-3 border border-anthropic-text/10"><strong>Docker Desktop</strong></td>
              <td className="p-3 border border-anthropic-text/10">Packages the environment into a tidy container that runs the same way on every machine</td>
              <td className="p-3 border border-anthropic-text/10"><a href="https://www.docker.com/products/docker-desktop/" target="_blank" rel="noopener noreferrer" className="text-anthropic-accent hover:underline">docker.com/products/docker-desktop</a></td>
            </tr>
          </tbody>
        </table>
      </div>
      <PostP>
        After installing, you can check each one is working by opening a terminal (Terminal on Mac, PowerShell or Windows Terminal on Windows) and running:
      </PostP>
      <ClaudeCodeBlock title="check the tools are installed">
{`git --version
python --version
docker --version`}
      </ClaudeCodeBlock>
      <PostP>
        You should see three lines, each with a version number. If any of them say "command not found" or similar, the corresponding install didn't finish — retry that one before moving on.
      </PostP>

      <PostH2>
        Step 1 — Download the project
      </PostH2>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        "Cloning" a repository just means copying all of its files from GitHub to your computer. Pick a place you'll remember (your Documents folder, Desktop, wherever) and run:
      </p>
      <ClaudeCodeBlock title="download the code">
{`git clone https://github.com/mahadevaiahrashmi/play2.git
cd play2`}
      </ClaudeCodeBlock>
      <PostP>
        The first line makes a folder called <InlineCode>play2</InlineCode> full of project files. The second line steps inside that folder — everything from here on happens inside it.
      </PostP>

      <PostH2>
        Step 2 — Install the project's ingredients
      </PostH2>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        Like a recipe, the project needs a handful of ingredients (other small Python packages). The shortcut way uses a fast installer called <InlineCode>uv</InlineCode>; the long way uses Python's built-in <InlineCode>pip</InlineCode>. Pick whichever one works on your machine:
      </p>
      <ClaudeCodeBlock title="fast path (recommended)">
{`# installs uv itself — one time only
pip install uv

# installs all the ingredients for the project
uv sync`}
      </ClaudeCodeBlock>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        If <InlineCode>uv sync</InlineCode> fails for any reason, use the plain-pip alternative:
      </p>
      <ClaudeCodeBlock title="plain-pip alternative">
{`pip install -e ".[dev]"`}
      </ClaudeCodeBlock>
      <PostP>
        Either command should finish in under a minute. When it's done, the project is wired up and ready to run.
      </PostP>

      <PostH2>
        Step 3 — Run the built-in sanity checks
      </PostH2>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        Good software includes its own tests — a set of small, automatic checks that confirm everything works. Run them now:
      </p>
      <ClaudeCodeBlock title="run the tests">
{`pytest`}
      </ClaudeCodeBlock>
      <PostP>
        You should see a block of green dots and a line ending in <InlineCode>passed</InlineCode>. The project ships with 73 tests covering the grid rules, the path-planning math, the scoring, and the server — if they all pass, you know your copy of the code is in a healthy state.
      </PostP>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        While you're here, do one more quick check that doesn't need an AI — a <em>dry run</em> where the robot just takes random moves:
      </p>
      <ClaudeCodeBlock title="dry-run with random moves">
{`python inference.py --dry-run --max-variations 5`}
      </ClaudeCodeBlock>
      <PostP>
        You'll see five short reports scroll by. Most of them will end with <InlineCode>success=false</InlineCode> and <InlineCode>score=0.000</InlineCode> — that's expected. A random walker almost never solves the task. What you're confirming is that the simulator runs end-to-end without crashing.
      </PostP>

      <PostH2>
        Step 4 — Start the environment as a real web service
      </PostH2>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        So far the environment only exists inside Python scripts. The OpenEnv standard expects it to be a little web service that answers HTTP requests. Docker makes this one-line easy — it bundles the simulator, its Python version, and everything else into a single package that runs the same way on any computer:
      </p>
      <ClaudeCodeBlock title="build & run the container">
{`docker build -t warehouse-routing:dev .
docker run --rm -p 8000:8000 warehouse-routing:dev`}
      </ClaudeCodeBlock>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        Translation:
      </p>
      <PostUL>
        <li><strong>First line</strong> — packages the project into a Docker "image" and labels it <InlineCode>warehouse-routing:dev</InlineCode>. Takes a minute or two the first time.</li>
        <li><strong>Second line</strong> — starts that image as a running program, and tells your laptop "whenever someone asks port 8000, send the question inside this program."</li>
      </PostUL>
      <PostP>
        Leave this terminal window open. The environment is now live at <InlineCode>http://localhost:8000</InlineCode>.
      </PostP>

      <PostH2>
        Step 5 — Poke it and see it respond
      </PostH2>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        Open a <strong>second</strong> terminal window (keep Step 4 running in the first). Try these two commands:
      </p>
      <ClaudeCodeBlock title="reset the world and take one step">
{`# start a fresh episode
curl -X POST http://localhost:8000/reset \\
  -H 'content-type: application/json' -d '{}'

# move the robot one square east
curl -X POST http://localhost:8000/step \\
  -H 'content-type: application/json' \\
  -d '{"action":{"move":"E"}}'`}
      </ClaudeCodeBlock>
      <PostP>
        The first command says "give me a new warehouse layout." The server replies with a block of JSON describing the grid — where the shelves are, where the obstacles are, where the robot starts. The second command says "move the robot east one cell" and hands you back an updated snapshot plus a tiny reward number. You've just driven the world by hand, the same way an AI would.
      </PostP>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        There's also a friendlier browser view. Visit this URL in your normal web browser while the container is running:
      </p>
      <ClaudeCodeBlock title="browser view">
{`http://localhost:8000/ui`}
      </ClaudeCodeBlock>
      <PostP>
        You'll see the warehouse as a drawn grid — shelves, obstacles, the robot — and on-screen arrow buttons (or your keyboard arrows) for driving. Try solving an easy layout yourself. You'll likely manage it in under ten moves — which is the whole point of the experiment.
      </PostP>

      <PostH2>
        Step 6 (optional) — Let an AI play
      </PostH2>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        This part needs a free Hugging Face account and an API token (sign up at <a href="https://huggingface.co/join" target="_blank" rel="noopener noreferrer" className="text-anthropic-accent hover:underline">huggingface.co/join</a>, then grab a token from your account settings).
      </p>
      <ClaudeCodeBlock title="point at an AI and run it">
{`export API_BASE_URL="https://router.huggingface.co/v1"
export MODEL_NAME="Qwen/Qwen2.5-72B-Instruct"
export HF_TOKEN="hf_your_token_here"
python inference.py`}
      </ClaudeCodeBlock>
      <PostP>
        The first three lines tell your computer <em>which AI to use</em> and <em>how to log in</em>. The fourth line runs the test — the AI is asked to drive the robot, one move at a time, across several warehouse layouts. You'll see its moves stream by on screen, and a final summary line with a score between 0.000 and 1.000. (If that score is 0.000, you've reproduced the main finding from the <Link to="/blog/warehouse-routing-openenv" className="text-anthropic-accent hover:underline">research write-up</Link>.)
      </PostP>

      <PostH2>
        Step 7 (optional) — Publish to Hugging Face Spaces
      </PostH2>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        If you'd like your copy of the environment available to anyone with a browser — not just on your laptop — Hugging Face Spaces hosts it for free. The short version:
      </p>
      <PostOL>
        <li>On <a href="https://huggingface.co/new-space" target="_blank" rel="noopener noreferrer" className="text-anthropic-accent hover:underline">huggingface.co/new-space</a>, create a new Space. Pick <strong>Docker</strong> as the SDK and <strong>Blank</strong> as the template.</li>
        <li>Follow the "clone and push" instructions that Hugging Face shows you — they copy your local code into the Space.</li>
        <li>Wait two or three minutes for the build to finish. Your Space is now live at <InlineCode>https://&lt;your-username&gt;-&lt;space-name&gt;.hf.space</InlineCode>.</li>
      </PostOL>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        Before announcing it, run the project's own submission check — it verifies your hosted Space actually answers requests correctly:
      </p>
      <ClaudeCodeBlock title="validate a hosted space">
{`./validate-submission.sh https://<your-space>.hf.space`}
      </ClaudeCodeBlock>
      <PostP>
        Three green ticks and you're done.
      </PostP>

      <PostH2>
        If something goes wrong
      </PostH2>
      <ul className="list-disc pl-6 mb-6 space-y-3 text-lg leading-relaxed opacity-90 font-serif">
        <li><strong>"<InlineCode>git: command not found</InlineCode>" or similar.</strong> Git didn't install. Reopen your terminal after installing, or restart your computer.</li>
        <li><strong>"<InlineCode>python: command not found</InlineCode>" but only on Windows.</strong> Windows sometimes installs it as <InlineCode>python3</InlineCode>. Swap any <InlineCode>python</InlineCode> in the commands above for <InlineCode>python3</InlineCode>.</li>
        <li><strong><InlineCode>uv sync</InlineCode> or <InlineCode>pip install</InlineCode> fails with a compiler error.</strong> Your Python is probably older than 3.12. Reinstall the latest Python from the link in the prerequisites table.</li>
        <li><strong>Docker says "Cannot connect to the Docker daemon."</strong> Docker Desktop isn't running. Open it from your Applications folder (Mac) or Start menu (Windows) and wait for the little whale icon to turn steady green.</li>
        <li><strong>Port 8000 is already in use.</strong> Another program is squatting on it. Change the <InlineCode>-p 8000:8000</InlineCode> to <InlineCode>-p 8080:8000</InlineCode> (or any unused number) and visit the new port in your browser.</li>
        <li><strong>The AI step returns an error about a token.</strong> Your <InlineCode>HF_TOKEN</InlineCode> didn't export. In the same terminal as Step 6, run <InlineCode>echo $HF_TOKEN</InlineCode> — if nothing comes back, redo the <InlineCode>export HF_TOKEN=...</InlineCode> line.</li>
        <li><strong>Everything installed, but the tests fail.</strong> That's unusual. Open an issue on the <a href="https://github.com/mahadevaiahrashmi/play2/issues" target="_blank" rel="noopener noreferrer" className="text-anthropic-accent hover:underline">play2 issue tracker</a> with the failure output and your OS version.</li>
      </ul>

      <PostH2>
        What you've actually done
      </PostH2>
      <PostP>
        In about fifteen minutes: downloaded a real research project, installed it, confirmed it works with 73 automatic tests, started it as a live web service, and — optionally — handed the steering wheel to an AI. The same setup a researcher would use, running on your own laptop, with every piece auditable and tweakable.
      </PostP>
      <PostP>
        If you'd like to read about <em>why</em> the AI tends to fail at this task — with the research numbers, failure modes, and reward design — the <Link to="/blog/warehouse-routing-openenv" className="text-anthropic-accent hover:underline">technical deep-dive</Link> picks the story up from here. The environment is now yours to experiment with.
      </PostP>

      <div className="mt-16 pt-8 border-t border-anthropic-text/10 opacity-60 text-sm font-serif">
        <p className="font-bold mb-4 font-serif">Resources:</p>
        <ul className="space-y-2 font-serif">
          <li><a href="https://github.com/mahadevaiahrashmi/play2" target="_blank" rel="noopener noreferrer" className="hover:text-anthropic-accent underline">play2 — the repository you just set up</a></li>
          <li><a href="https://github.com/meta-pytorch/OpenEnv" target="_blank" rel="noopener noreferrer" className="hover:text-anthropic-accent underline">OpenEnv — the standard this environment follows</a></li>
          <li><a href="https://huggingface.co/spaces/Rashmi-mahadevaiah/drone" target="_blank" rel="noopener noreferrer" className="hover:text-anthropic-accent underline">A live copy on Hugging Face Spaces (no install needed)</a></li>
          <li><a href="https://docs.docker.com/get-started/" target="_blank" rel="noopener noreferrer" className="hover:text-anthropic-accent underline">Docker — beginner-friendly getting-started guide</a></li>
        </ul>
      </div>
    </>
  );
}
