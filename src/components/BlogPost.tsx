/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { ArrowLeft, ExternalLink, Check, Copy, Download, ChevronDown, ChevronRight, WrapText } from "lucide-react";
import { useEffect, useState, type ComponentType, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { blogPosts } from "../blog/posts";
import ThemeToggle from "./ThemeToggle";

const CodeBlock = ({ children, title, variant = "default" }: { children: string; title?: string; variant?: "default" | "grok" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([children], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = title ? title.toLowerCase().replace(/\s+/g, "-") + ".txt" : "snippet.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const isGrok = variant === "grok";

  return (
    <div className={`my-6 border rounded-lg overflow-hidden ${
      isGrok 
        ? "bg-[#0d1117] border-gray-800 shadow-2xl" 
        : "bg-anthropic-text/5 border-anthropic-text/10"
    }`}>
      {title && (
        <div className={`flex items-center justify-between px-4 py-2 border-b ${
          isGrok 
            ? "bg-[#161b22] border-gray-800 text-gray-300" 
            : "bg-anthropic-text/[0.02] border-anthropic-text/10 text-anthropic-text"
        }`}>
          <span className={`text-xs font-sans font-bold uppercase tracking-wider ${isGrok ? "opacity-100" : "opacity-60"}`}>
            {title}
          </span>
          <div className="flex items-center gap-3">
            <button onClick={handleCopy} className="opacity-50 hover:opacity-100 transition-opacity flex items-center justify-center" aria-label="Copy to clipboard" title="Copy code">
              {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
            </button>
            <button onClick={handleDownload} className="opacity-50 hover:opacity-100 transition-opacity flex items-center justify-center" aria-label="Download snippet" title="Download text">
              <Download size={14} />
            </button>
          </div>
        </div>
      )}
      <div className="p-4 overflow-x-auto">
        <pre className={`text-sm font-mono leading-relaxed whitespace-pre ${
          isGrok ? "text-[#e6edf3]" : "text-anthropic-text"
        }`}>{children}</pre>
      </div>
    </div>
  );
};

const TOKENIZER =
  /(\s+|"[^"]*"|'[^']*'|\{\{[^}]*\}\}|\$[A-Z_][A-Z0-9_]*|~\/[\w./-]+|[\w.-]+\.(?:md|toml|ts|tsx|js|jsx|json|sh|py|txt)|\/[a-z][\w-]*|#[^\n]*|[=:|]|\{|\}|\[|\]|\(|\)|<|>|\/)/;

const tokenClass = (token: string) => {
  const trimmed = token.trim();
  if (/^#{2,}\s/.test(trimmed)) return "text-zinc-900 dark:text-white font-medium";
  if (/^["'].*["']$/.test(trimmed)) return "text-emerald-700 dark:text-emerald-400";
  if (token.startsWith("{{") || /^\$[A-Z_]/.test(token))
    return "text-rose-700 dark:text-rose-400 bg-zinc-200 dark:bg-zinc-800/80 px-1.5 py-0.5 rounded font-medium";
  if (token.startsWith("~/") || /\.(md|toml|ts|tsx|jsx?|json|sh|py|txt)$/.test(token))
    return "text-indigo-700 dark:text-indigo-400";
  if (token.startsWith("#")) return "text-lime-700 dark:text-lime-400";
  if (token.length > 1 && token.startsWith("/")) return "text-orange-600 dark:text-orange-400";
  if (token === "=" || token === ":") return "text-violet-700 dark:text-violet-400";
  if (/^\d+\.?\d*$/.test(trimmed)) return "text-cyan-700 dark:text-cyan-400";
  if (token.includes(".") && !token.includes(" ")) return "text-sky-700 dark:text-sky-400";
  if (["default", "explanatory", "learning", "friendly", "pragmatic"].includes(trimmed.toLowerCase()))
    return "text-amber-700 dark:text-amber-400";
  if (["if", "const", "export", "import", "function", "return", "for", "while"].includes(trimmed))
    return "text-fuchsia-700 dark:text-fuchsia-400";
  if (/^[A-Z]/.test(trimmed)) return "text-blue-700 dark:text-blue-400";
  return "text-zinc-800 dark:text-zinc-200";
};

const InlineCode = ({ children }: { children: string }) => {
  const tokens = children.split(TOKENIZER).filter(Boolean);
  return (
    <code className="font-mono bg-anthropic-text/5 px-1.5 py-0.5 rounded text-sm">
      {tokens.map((token, i) => (
        <span key={i} className={tokenClass(token)}>
          {token}
        </span>
      ))}
    </code>
  );
};

const ClaudeCodeBlock = ({
  children,
  title,
  language = "toml",
  plain = false,
  codexScript = false,
}: {
  children: string;
  title?: string;
  language?: string;
  plain?: boolean;
  codexScript?: boolean;
}) => {
  const [copied, setCopied] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [wrap, setWrap] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(children.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([children], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = title ? title.toLowerCase().replace(/\s+/g, "-") + ".txt" : "snippet.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const highlightCode = (text: string) => {
    const lines = text.trim().split("\n");

    if (plain) {
      return lines.map((line, lineIndex) => (
        <div
          key={lineIndex}
          className="table-row group-hover:bg-zinc-200/50 dark:group-hover:bg-zinc-900/50 transition-colors"
        >
          <span className="table-cell pr-6 text-right text-zinc-400 dark:text-zinc-500 select-none w-10 font-mono text-xs">
            {lineIndex + 1}
          </span>
          <span className="table-cell font-mono text-sm leading-relaxed break-all text-zinc-800 dark:text-zinc-200">
            {line || "\u00A0"}
          </span>
        </div>
      ));
    }

    const tokenizer = TOKENIZER;

    const rowWrap = (lineIndex: number, content: ReactNode) => (
      <div
        key={lineIndex}
        className="table-row group-hover:bg-zinc-200/50 dark:group-hover:bg-zinc-900/50 transition-colors"
      >
        <span className="table-cell pr-6 text-right text-zinc-400 dark:text-zinc-500 select-none w-10 font-mono text-xs">
          {lineIndex + 1}
        </span>
        <span className="table-cell font-mono text-sm leading-relaxed break-all">
          {content}
        </span>
      </div>
    );

    const PINK = "text-[#ff69b4]";
    const GREEN = "text-emerald-700 dark:text-emerald-400";

    if (codexScript) {
      type Dir = "normal" | "pink" | "green" | "echo-start" | "plain";
      const dirs: Dir[] = [];
      let state: "neutral" | "prompt" | "echo" | "plain" = "neutral";

      for (const line of lines) {
        const trimmed = line.trim();
        if (state === "plain") {
          if (trimmed === "EOF") {
            dirs.push("normal");
            state = "neutral";
          } else {
            dirs.push("plain");
          }
        } else if (state === "neutral") {
          if (/^echo\s+"/.test(trimmed)) {
            dirs.push("echo-start");
            state = /"\s*$/.test(trimmed.slice(5)) ? "neutral" : "echo";
          } else if (/^You are now in (Explanatory|Learning|Default)/.test(trimmed)) {
            dirs.push("plain");
            state = "plain";
          } else {
            dirs.push("normal");
          }
        } else {
          dirs.push("green");
          if (/"\s*$/.test(trimmed)) state = "neutral";
        }
      }

      return lines.map((line, lineIndex) => {
        const dir = dirs[lineIndex];
        if (dir === "pink") {
          return rowWrap(
            lineIndex,
            <span className={PINK}>{line || "\u00A0"}</span>,
          );
        }
        if (dir === "green") {
          return rowWrap(
            lineIndex,
            <span className={GREEN}>{line || "\u00A0"}</span>,
          );
        }
        if (dir === "plain") {
          return rowWrap(
            lineIndex,
            <span className="text-zinc-800 dark:text-zinc-200">{line || "\u00A0"}</span>,
          );
        }
        if (dir === "echo-start") {
          const match = line.match(/^(\s*echo\s+)(.*)$/);
          if (match) {
            const [, prefix, rest] = match;
            return rowWrap(
              lineIndex,
              <>
                {prefix.split(tokenizer).filter(Boolean).map((token, ti) => (
                  <span key={`p-${ti}`} className={tokenClass(token)}>
                    {token}
                  </span>
                ))}
                <span className={GREEN}>{rest}</span>
              </>,
            );
          }
        }
        const tokens = line.split(tokenizer).filter(Boolean);
        return rowWrap(
          lineIndex,
          tokens.length
            ? tokens.map((token, ti) => (
                <span key={ti} className={tokenClass(token)}>
                  {token}
                </span>
              ))
            : "\u00A0",
        );
      });
    }

    let insideTriple = false;

    return lines.map((line, lineIndex) => {
      const parts = line.split(/(""")/);
      const segments: { text: string; inTriple: boolean }[] = [];
      for (const part of parts) {
        if (part === "") continue;
        if (part === '"""') {
          segments.push({ text: part, inTriple: true });
          insideTriple = !insideTriple;
        } else {
          segments.push({ text: part, inTriple: insideTriple });
        }
      }
      if (segments.length === 0) {
        segments.push({ text: line, inTriple: insideTriple });
      }

      return rowWrap(
        lineIndex,
        segments.map((seg, segIdx) => {
          if (seg.inTriple) {
            return (
              <span key={segIdx} className={PINK}>
                {seg.text}
              </span>
            );
          }
          const tokens = seg.text.split(tokenizer).filter(Boolean);
          return tokens.map((token, tokenIndex) => (
            <span key={`${segIdx}-${tokenIndex}`} className={tokenClass(token)}>
              {token}
            </span>
          ));
        }),
      );
    });
  };

  return (
    <div className="relative group my-6 rounded-2xl overflow-hidden border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 shadow-xl">
      <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-300 dark:border-zinc-800">
        <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono tracking-tight">
          {(title ?? language).toUpperCase()}
        </span>

        <div className="flex items-center gap-1">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setWrap((v) => !v)}
            className={`flex items-center px-2 py-1 text-xs transition-all rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 ${
              wrap
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
            aria-label={wrap ? "Disable word wrap" : "Enable word wrap"}
            title={wrap ? "Disable word wrap" : "Enable word wrap"}
          >
            <WrapText className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCollapsed((v) => !v)}
            className="flex items-center px-2 py-1 text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800"
            aria-label={collapsed ? "Expand code" : "Collapse code"}
            title={collapsed ? "Expand" : "Collapse"}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={copyToClipboard}
            className="flex items-center gap-1.5 px-3 py-1 text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800"
            aria-label="Copy to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" /> Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" /> Copy
              </>
            )}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            className="flex items-center px-2 py-1 text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800"
            aria-label="Download snippet"
            title="Download text"
          >
            <Download className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {!collapsed && (
        <pre
          className={`p-5 font-mono text-[15px] leading-[1.65] text-zinc-800 dark:text-zinc-200 ${
            wrap ? "whitespace-pre-wrap" : "overflow-x-auto"
          }`}
        >
          <code className={`table w-full ${wrap ? "table-fixed" : ""}`}>
            {highlightCode(children)}
          </code>
        </pre>
      )}
    </div>
  );
};

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
        Classical TSP solvers — Held-Karp, Lin-Kernighan, Concorde — are decades-old and effectively perfect on small instances. If you hand a model the SKU coordinates, the obstacles, and the warehouse, you don't need a language model at all; you call <InlineCode>python_tsp</InlineCode> and you're done. That's exactly what our oracle does, which is why it scores 1.000.
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

      <CodeBlock title="Action Space (Python)">
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
        <li><InlineCode>POST /reset</InlineCode> — start a new episode, return the initial observation</li>
        <li><InlineCode>POST /step</InlineCode> — execute one action, return observation + reward + done flag</li>
        <li><InlineCode>GET /state</InlineCode> — session metadata (episode id, step count)</li>
      </ul>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        warehouse-routing wraps a Pydantic-typed environment in a FastAPI shim, ships as a Docker image, and runs on Hugging Face Spaces. Pydantic enforces typed contracts at every boundary so a malformed action returns 422, never silent corruption:
      </p>

      <CodeBlock title="Pydantic Environment API (Python)">
{`env = WarehouseRoutingEnvironment()
obs = env.reset()
# obs.tier="easy"  obs.sku_locations=[(3,2),(7,7),(4,4)]  obs.robot_pos=(0,0)

obs = env.step(Action(move="E"))
# obs.robot_pos=(0,1)  reward=-0.01  done=false`}
      </CodeBlock>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        On top of this, we mount a self-contained SVG grid viewer at <InlineCode>/ui</InlineCode>: vanilla JS, no Gradio, no extra deps. It polls <InlineCode>/state</InlineCode>, calls <InlineCode>/reset</InlineCode> and <InlineCode>/step</InlineCode> via fetch, and renders the warehouse, SKUs (visited and not), obstacles, robot, and a breadcrumb trail. You can drive an episode with the on-screen d-pad or your arrow keys.
      </p>

      {/* Reward Architecture */}
      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        Reward Architecture
      </h2>

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
      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        Try It Yourself
      </h2>

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
        <video
          controls
          className="w-full rounded-2xl shadow-lg border border-anthropic-text/10"
        >
          <source src="/blog-assets/richfeyn/Richfeyn_demo_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <p className="text-sm opacity-50 mt-4 text-center italic">A quick demonstration of the RichFeyn Smart Jar ecosystem.</p>
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

      <div className="grid md:grid-cols-3 gap-6 my-12">
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
        <img
          src="/blog-assets/richfeyn.png"
          alt="RichFeyn Smart Jar"
          className="w-full rounded-2xl shadow-xl border border-anthropic-text/10"
        />
        <p className="text-sm opacity-50 mt-4 text-center italic">The RichFeyn Smart Jar: Your kitchen, automated.</p>
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
        Teach Your AI Coding Helper Three Different Voices
      </h1>

      <p className="text-lg font-serif italic opacity-60 mb-12">
        Published: April 2026 | Reading Time: ~8 minutes
      </p>

      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        The idea in one paragraph
      </h2>
      <p className="text-lg leading-relaxed opacity-90 mb-6 font-serif">
        AI coding assistants that run in your terminal — like <strong>Claude Code</strong> (from Anthropic), <strong>Gemini CLI</strong> (from Google), and <strong>Codex CLI</strong> (from OpenAI) — are basically "chat with an AI that can also read and write the files on your laptop." A useful feature Anthropic shipped early is a <em>voice switcher</em>: a single command lets you tell Claude "just do it, no chatter" or "explain your thinking as you go" or "teach me — make me write the code myself." The other two tools don't ship this feature by default. The good news: you can add it yourself in about five minutes of copy-paste. This post shows you how, in plain language.
      </p>

      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        What are these three voices?
      </h2>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        Claude Code calls them <em>output styles</em>. Here's what the menu looks like inside Claude Code:
      </p>
      <ClaudeCodeBlock title="Output style" plain>
{`1. Default     Claude completes coding tasks efficiently and provides concise responses
2. Explanatory Claude explains its implementation choices and codebase patterns
3. Learning    Claude pauses and asks you to write small pieces of code for hands-on practice`}
      </ClaudeCodeBlock>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        Think of these as three moods you can put your helper in, depending on what you're doing:
      </p>
      <ul className="list-disc pl-6 mb-6 space-y-2 text-lg leading-relaxed opacity-90 font-serif">
        <li><strong>Default</strong> — the quick, efficient mode. You say "add dark mode to the settings page"; it adds dark mode. Minimal chatter. Best when you know exactly what you want and just need it done.</li>
        <li><strong>Explanatory</strong> — the thoughtful colleague mode. Same task, but the helper explains <em>why</em> it picked a particular approach, what trade-offs matter, and how the change fits the rest of the codebase. Best when you're learning a new project or reviewing unfamiliar code.</li>
        <li><strong>Learning</strong> — the patient tutor mode. The helper breaks the task into bite-sized pieces, explains one piece, then <em>stops</em> and asks you to write that piece yourself. It reviews your attempt and guides you to the next step. Best when you want to genuinely improve your skills, not just get the job done.</li>
      </ul>
      <p className="text-lg leading-relaxed opacity-90 mb-6 font-serif">
        Inside Claude Code you switch modes with <InlineCode>/output-style explanatory</InlineCode> (or similar). Gemini and Codex don't have a button like this. So what we're going to do is create our own version — three little "presets" you can summon with a short command.
      </p>

      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        When to use which voice — a cheat sheet
      </h2>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse font-serif">
          <thead>
            <tr className="bg-anthropic-text/5">
              <th className="p-3 border border-anthropic-text/10 font-bold text-left">Style</th>
              <th className="p-3 border border-anthropic-text/10 font-bold text-left">Behavior</th>
              <th className="p-3 border border-anthropic-text/10 font-bold text-left">Best For</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border border-anthropic-text/10 font-bold">Default</td>
              <td className="p-3 border border-anthropic-text/10 text-red-500 font-semibold">Fast, concise, task-focused responses</td>
              <td className="p-3 border border-anthropic-text/10">Quick iterations, experienced developers</td>
            </tr>
            <tr className="bg-anthropic-text/[0.02]">
              <td className="p-3 border border-anthropic-text/10 font-bold">Explanatory</td>
              <td className="p-3 border border-anthropic-text/10 text-orange-500 font-semibold">Explains reasoning, patterns, trade-offs</td>
              <td className="p-3 border border-anthropic-text/10">Learning codebases, code reviews, documentation</td>
            </tr>
            <tr>
              <td className="p-3 border border-anthropic-text/10 font-bold">Learning</td>
              <td className="p-3 border border-anthropic-text/10 text-blue-500 font-semibold">Interactive mentor: pauses, asks you to code, gives feedback</td>
              <td className="p-3 border border-anthropic-text/10">Hands-on practice, teaching, skill-building</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        Set it up in Gemini CLI
      </h2>
      <p className="text-lg leading-relaxed opacity-90 mb-6 font-serif">
        Gemini CLI has a really handy feature: you can invent your own <strong>slash commands</strong>. <InlineCode>/explain</InlineCode> and <InlineCode>/learn</InlineCode> don't exist by default — but after this setup, they will, and they'll do exactly what their names suggest.
      </p>
      <p className="text-lg leading-relaxed opacity-90 mb-6 font-serif">
        Each command lives as a small file in a folder Gemini watches. The file just holds a short note saying "when this command is used, behave this way." No programming, no bash. Ready? Open your terminal and follow along.
      </p>

      <h3 className="text-xl font-serif font-medium mt-8 mb-4 text-anthropic-accent">Step 1 — Make the folder where commands live</h3>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        Copy-paste this and press Enter. It creates an empty folder inside your home directory called <InlineCode>.gemini/commands</InlineCode>:
      </p>
      <ClaudeCodeBlock title="create the folder">{`mkdir -p ~/.gemini/commands`}</ClaudeCodeBlock>

      <h3 className="text-xl font-serif font-medium mt-8 mb-4 text-anthropic-accent">Step 2 — Create three tiny files, one per voice</h3>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-semibold font-serif">Each file is a few lines of plain text. Create them one at a time in any text editor (VS Code, TextEdit, Notepad — anything). Save each one into the folder you just made, with the exact filename shown below.</p>

      <div className="space-y-8 font-serif">
        <div>
          <h4 className="text-sm font-serif uppercase tracking-widest opacity-60 mb-2 font-bold underline">~/.gemini/commands/default.toml</h4>
          <ClaudeCodeBlock title="default.toml">
{`description = "Default concise and efficient mode"
prompt = """
You are now in Default mode (Claude Code style).
Complete the following coding task efficiently with concise responses:

{{args}}

No unnecessary explanations unless asked.
"""`}
          </ClaudeCodeBlock>
        </div>

        <div>
          <h4 className="text-sm font-serif uppercase tracking-widest opacity-60 mb-2 font-bold underline">~/.gemini/commands/explain.toml</h4>
          <ClaudeCodeBlock title="explain.toml">
{`description = "Explanatory mode: explains choices and patterns"
prompt = """
You are now in Explanatory mode.

Task: {{args}}

For this task:
- Think step-by-step and explain your reasoning clearly.
- Describe implementation choices, why you picked certain patterns, trade-offs, and how it fits the codebase.
- Provide educational insights.
- Then implement the changes only after I confirm.

Be thorough but not overly verbose.
"""`}
          </ClaudeCodeBlock>
        </div>

        <div>
          <h4 className="text-sm font-serif uppercase tracking-widest opacity-60 mb-2 font-bold underline">~/.gemini/commands/learn.toml</h4>
          <ClaudeCodeBlock title="learn.toml">
{`description = "Learning/Mentor mode: hands-on interactive practice"
prompt = """
You are now in Learning mode (mentor/tutor style).

Task: {{args}}

For this task:
- Break it into small, clear steps.
- Explain the concept or next piece.
- Pause and explicitly ask ME to write the small code snippet myself.
- Review my code, Calvert feedback, and guide me to the next step.
- Only write/implement code yourself if I explicitly ask.

Act like a patient coding instructor for hands-on learning.
"""`}
          </ClaudeCodeBlock>
        </div>
      </div>

      <p className="p-4 bg-anthropic-accent/5 border-l-4 border-anthropic-accent my-6 italic opacity-90 font-serif">
        What is <InlineCode>{"{{args}}"}</InlineCode>? It's a placeholder. Whatever you type after the command name gets slotted in. So typing <InlineCode>/explain refactor the login page</InlineCode> sends your task ("refactor the login page") into that slot, and the voice preset wraps around it.
      </p>

      <h3 className="text-xl font-serif font-medium mt-8 mb-4 text-anthropic-accent">Step 3 — Try them out</h3>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        Start Gemini CLI (just type <InlineCode>gemini</InlineCode>) and try any of these:
      </p>
      <ClaudeCodeBlock title="example — try these inside Gemini CLI">
{`/explain refactor the payment service to use async/await
/learn implement user sign-up with email verification
/default add a dark-mode toggle to the settings panel`}
      </ClaudeCodeBlock>
      <p className="text-lg leading-relaxed opacity-90 mb-6 font-serif">
        That's it — you now have three voices. Switch anytime mid-conversation. If a command is unrecognised, type <InlineCode>/commands reload</InlineCode> to make Gemini pick up the new files.
      </p>

      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        Set it up in Codex CLI
      </h2>
      <p className="text-lg leading-relaxed opacity-90 mb-6 font-serif">
        Codex CLI takes a slightly different approach: instead of slash commands, it has <strong>profiles</strong>. A profile is a named bundle of settings — think of it like switching between "work email" and "personal email" on your phone. We'll create three profiles, one per voice, and switch between them with a flag.
      </p>

      <h3 className="text-xl font-serif font-medium mt-8 mb-4 text-anthropic-accent">Step 1 — Edit Codex's settings file</h3>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        Codex keeps its settings in <InlineCode>~/.codex/config.toml</InlineCode>. If the file doesn't exist yet, create it. Open it in a text editor and paste this in:
      </p>
      <ClaudeCodeBlock title="config.toml">
{`[profiles.default]
personality = "pragmatic"
approval_mode = "auto"

[profiles.explanatory]
personality = "friendly"
approval_mode = "auto"

[profiles.learning]
personality = "friendly"
approval_mode = "read-only"`}
      </ClaudeCodeBlock>

      <p className="text-lg leading-relaxed opacity-90 mb-6 font-serif">
        What you just did: told Codex "here are three named setups." <InlineCode>personality</InlineCode> controls the tone. <InlineCode>approval_mode</InlineCode> controls whether Codex auto-applies changes (<InlineCode>auto</InlineCode>) or only suggests them (<InlineCode>read-only</InlineCode>). The learning profile uses <InlineCode>read-only</InlineCode> on purpose — you're the one writing code in that mode, not Codex.
      </p>

      <h3 className="text-xl font-serif font-medium mt-8 mb-4 text-anthropic-accent">Step 2 — Add the "how to behave" notes per project</h3>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">Profiles set the tone, but we also want Codex to follow specific instructions in each mode. Codex reads a file called <InlineCode>AGENTS.md</InlineCode> from your project folder and treats it like a standing brief. Create the following short Markdown files in the root of any project where you want these voices available:</p>

      <div className="space-y-8 font-serif">
        <div>
          <h4 className="text-sm font-serif uppercase tracking-widest opacity-60 mb-2 font-bold underline font-serif">AGENTS-explain.md</h4>
          <ClaudeCodeBlock title="AGENTS-explain.md" plain>
{`You are now in Explanatory mode.

User task: $TASK

For this task:
- Think step-by-step and explain your reasoning clearly.
- Describe implementation choices, patterns, trade-offs, and codebase fit.
- Provide educational insights.
- Then implement only after I confirm.`}
          </ClaudeCodeBlock>
        </div>

        <div>
          <h4 className="text-sm font-serif uppercase tracking-widest opacity-60 mb-2 font-bold underline font-serif">AGENTS-learn.md</h4>
          <ClaudeCodeBlock title="AGENTS-learn.md" plain>
{`You are now in Learning/Mentor mode.

User task: $TASK

For this task:
- Break it into small steps.
- Explain the concept, then ask ME to write the code myself.
- Review my code, give feedback, and guide iteratively.
- Only implement if I explicitly ask.`}
          </ClaudeCodeBlock>
        </div>
      </div>

      <h3 className="text-xl font-serif font-medium mt-8 mb-4 text-anthropic-accent">Step 3 — Start Codex in the voice you want</h3>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        Launch Codex with a profile flag, and it'll use that voice for the whole session:
      </p>
      <ClaudeCodeBlock title="pick your voice">
{`# Explanatory mode — ask Codex to explain before doing
codex --profile explanatory

# Learning mode — Codex teaches, you write
codex --profile learning

# Default mode — fast and quiet
codex --profile default`}
      </ClaudeCodeBlock>
      <p className="p-4 bg-anthropic-accent/5 border-l-4 border-anthropic-accent my-6 italic opacity-90 font-serif">
        Inside a Codex session, you can also switch mid-conversation with <InlineCode>/profile explanatory</InlineCode> (no restart required).
      </p>

      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        Want to skip all the typing? Use a one-click script
      </h2>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        If creating each file manually sounds tedious, the scripts below create everything for you in one go. Each one is a small shell script — just three steps:
      </p>
      <ol className="list-decimal pl-6 mb-6 space-y-1 text-lg leading-relaxed opacity-90 font-serif">
        <li>Create a new file called <InlineCode>setup-cli-styles.sh</InlineCode></li>
        <li>Paste the contents of the relevant script below</li>
        <li>Run <InlineCode>bash setup-cli-styles.sh</InlineCode> from your terminal</li>
      </ol>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        Everything else is taken care of. You can safely re-run the script if something goes wrong — it'll overwrite the files with fresh copies.
      </p>

      <h3 className="text-xl font-serif font-medium mt-8 mb-4 text-anthropic-accent text-center font-serif">Gemini CLI Setup Script</h3>
      <ClaudeCodeBlock title="Gemini Setup Script (Bash)">
{`mkdir -p ~/.gemini/commands && cat > ~/.gemini/commands/default.toml << 'EOF'
description = "Default concise and efficient mode"
prompt = """
You are now in Default mode (Claude Code style).
Complete the following coding task efficiently with concise responses:

{{args}}

No unnecessary explanations unless asked.
"""
EOF

cat > ~/.gemini/commands/explain.toml << 'EOF'
description = "Explanatory mode: explains choices and patterns"
prompt = """
You are now in Explanatory mode.

Task: {{args}}

For this task:
- Think step-by-step and explain your reasoning clearly.
- Describe implementation choices, why you picked certain patterns, trade-offs, and how it fits the codebase.
- Provide educational insights.
- Then implement the changes only after I confirm.

Be thorough but not overly verbose.
"""
EOF

cat > ~/.gemini/commands/learn.toml << 'EOF'
description = "Learning/Mentor mode: hands-on interactive practice"
prompt = """
You are now in Learning mode (mentor/tutor style).

Task: {{args}}

For this task:
- Break it into small, clear steps.
- Explain the concept or next piece.
- Pause and explicitly ask ME to write the small code snippet myself.
- Review my code, give constructive feedback, and guide me to the next step.
- Only write/implement code yourself if I explicitly ask.

Act like a patient coding instructor for hands-on learning.
"""
EOF

echo "Gemini CLI styles installed. Run /commands reload to activate."`}
      </ClaudeCodeBlock>

      <h3 className="text-xl font-serif font-medium mt-8 mb-4 text-anthropic-accent text-center font-serif">Codex CLI Setup Script</h3>
      <ClaudeCodeBlock title="Codex Setup Script (Bash)" codexScript>
{`# Create Codex config directory and backup existing config
mkdir -p ~/.codex
[ -f ~/.codex/config.toml ] && cp ~/.codex/config.toml ~/.codex/config.toml.bak

# Write the main config with three profiles
cat > ~/.codex/config.toml << 'EOF'
[profiles.default]
personality = "pragmatic"
approval_mode = "auto"
system_prompt = "You are a concise, efficient coding assistant. Complete tasks with minimal explanation unless asked."

[profiles.explanatory]
personality = "friendly"
approval_mode = "auto"
system_prompt = "You are an explanatory coding assistant. Always think step-by-step, explain your reasoning, describe implementation choices, patterns, and trade-offs before implementing."

[profiles.learning]
personality = "friendly"
approval_mode = "read-only"
system_prompt = "You are a patient coding mentor. Break tasks into small steps, explain concepts, then ask the user to write code themselves. Review their work and provide constructive feedback. Only implement code if explicitly requested."

[defaults]
profile = "default"
EOF

# Create project-level AGENTS.md templates
cat > AGENTS-explain.md << 'EOF'
# Explanatory Mode Guidelines
You are now in Explanatory mode.
User task: $TASK
For this task:
- Think step-by-step and explain your reasoning clearly.
- Describe implementation choices, why you picked certain patterns, trade-offs, and how it fits the codebase.
- Provide educational insights and reference relevant documentation.
- Then implement the changes only after I confirm.
EOF

cat > AGENTS-learn.md << 'EOF'
# Learning Mode Guidelines
You are now in Learning/Mentor mode.
User task: $TASK
For this task:
- Break it into small, manageable steps.
- Explain the concept or principle behind the next piece.
- Pause and explicitly ask ME to write the small code snippet myself.
- Review my code, give constructive feedback, and guide me to the next step.
- Only write or implement code yourself if I explicitly ask.
EOF

cat > AGENTS-default.md << 'EOF'
# Default Mode Guidelines
You are now in Default mode.
User task: $TASK
For this task:
- Complete the coding task efficiently with concise responses.
- Provide only essential explanations unless asked for more detail.
- Focus on delivering working, well-structured code.
- Assume I am an experienced developer who values speed and precision.
EOF

echo "Codex CLI styles installed successfully.
Usage:
  1. Switch styles: codex --profile [default|explanatory|learning]
  2. Add AGENTS-*.md files to your project root for persistent context"`}
      </ClaudeCodeBlock>

      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10 font-serif">
        How to run the script step by step
      </h2>
      <ol className="list-decimal pl-6 mb-6 space-y-2 text-lg leading-relaxed opacity-90 font-serif">
        <li><strong>Create an empty file</strong> called <InlineCode>setup-cli-styles.sh</InlineCode> — in any text editor, on your Desktop, or wherever is convenient.</li>
        <li><strong>Copy the relevant script above</strong> (Gemini or Codex) and paste it into that file. Save.</li>
        <li><strong>Open a terminal</strong> and navigate to the file's folder (for example, <InlineCode>cd ~/Desktop</InlineCode> if you saved it there).</li>
        <li><strong>Run it</strong> by typing: <InlineCode>bash setup-cli-styles.sh</InlineCode></li>
        <li><strong>Check the result</strong>. For Gemini, type <InlineCode>ls ~/.gemini/commands/</InlineCode> — you should see three files. For Codex, type <InlineCode>cat ~/.codex/config.toml</InlineCode> — you should see the three profiles.</li>
        <li><strong>Use it</strong>. Start Gemini with <InlineCode>gemini</InlineCode> and run <InlineCode>/commands reload</InlineCode>; start Codex with <InlineCode>codex --profile explanatory</InlineCode>.</li>
      </ol>

      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10 font-serif">
        Which tool should you use?
      </h2>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse font-serif">
          <thead>
            <tr className="bg-anthropic-text/5">
              <th className="p-3 border border-anthropic-text/10 font-bold text-left">Feature</th>
              <th className="p-3 border border-anthropic-text/10 font-bold text-left">Gemini CLI</th>
              <th className="p-3 border border-anthropic-text/10 font-bold text-left">Codex CLI</th>
              <th className="p-3 border border-anthropic-text/10 font-bold text-left">Claude Code</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border border-anthropic-text/10 font-bold">Built-in toggle</td>
              <td className="p-3 border border-anthropic-text/10">No (but easy to add)</td>
              <td className="p-3 border border-anthropic-text/10">No (profiles)</td>
              <td className="p-3 border border-anthropic-text/10">Yes, native menu</td>
            </tr>
            <tr className="bg-anthropic-text/[0.02]">
              <td className="p-3 border border-anthropic-text/10 font-bold">Command args</td>
              <td className="p-3 border border-anthropic-text/10">Yes, {"{{args}}"}</td>
              <td className="p-3 border border-anthropic-text/10">Requires profile</td>
              <td className="p-3 border border-anthropic-text/10">Yes, built-in</td>
            </tr>
            <tr>
              <td className="p-3 border border-anthropic-text/10 font-bold">Context files</td>
              <td className="p-3 border border-anthropic-text/10">Yes, GEMINI.md</td>
              <td className="p-3 border border-anthropic-text/10">Yes, AGENTS.md</td>
              <td className="p-3 border border-anthropic-text/10">Yes, system prompts</td>
            </tr>
            <tr className="bg-anthropic-text/[0.02]">
              <td className="p-3 border border-anthropic-text/10 font-bold">Ecosystem</td>
              <td className="p-3 border border-anthropic-text/10">Free and open</td>
              <td className="p-3 border border-anthropic-text/10">OpenAI-dependent</td>
              <td className="p-3 border border-anthropic-text/10">Anthropic-only</td>
            </tr>
            <tr>
              <td className="p-3 border border-anthropic-text/10 font-bold">Learning focus</td>
              <td className="p-3 border border-anthropic-text/10">Highly conversational</td>
              <td className="p-3 border border-anthropic-text/10">Great read-only mode</td>
              <td className="p-3 border border-anthropic-text/10">Purpose-built</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="p-6 bg-slate-50 dark:bg-anthropic-text/5 border border-slate-200 dark:border-anthropic-text/10 rounded-xl my-12 font-serif text-center">
        <strong className="text-anthropic-accent block mb-2 font-bold font-serif">Quick picks:</strong>
        <ul className="list-disc pl-6 space-y-2 opacity-90 font-semibold font-serif text-left inline-block">
          <li>Want it to feel closest to Claude Code? <strong>Gemini CLI</strong> — the slash commands behave almost identically.</li>
          <li>Already use ChatGPT or prefer OpenAI? <strong>Codex CLI</strong> — the profile system is simple and robust.</li>
          <li>Genuinely learning, not just getting a task done? Both work; Gemini tends to feel a little more teacher-like in Learning mode.</li>
        </ul>
      </div>

      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10 font-serif">
        If something goes wrong
      </h2>
      <div className="space-y-6 font-serif">
        <div>
          <h3 className="text-lg font-bold mb-2 text-anthropic-accent underline font-serif">Gemini CLI</h3>
          <ul className="list-disc pl-6 space-y-1 opacity-80 font-serif">
            <li><strong>"Command not recognised."</strong> First, run <InlineCode>/commands reload</InlineCode> inside Gemini. If that doesn't work, your version may want commands under <InlineCode>~/.config/gemini/commands/</InlineCode> instead of <InlineCode>~/.gemini/commands/</InlineCode> — check which folder exists on your system.</li>
            <li><strong>Running on Windows?</strong> The setup script uses Unix-style file-creation tricks. Run it inside WSL (Windows Subsystem for Linux) or Git Bash. In plain PowerShell it won't work.</li>
            <li><strong>"Permission denied" when running the script.</strong> Add <InlineCode>bash </InlineCode> at the start: <InlineCode>bash setup-cli-styles.sh</InlineCode>. That avoids needing to mark the file executable.</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2 text-anthropic-accent underline font-serif">Codex CLI</h3>
          <ul className="list-disc pl-6 space-y-1 opacity-80 font-serif">
            <li><strong>Profile seems to be ignored.</strong> Open <InlineCode>~/.codex/config.toml</InlineCode> and double-check there are no missing quote marks or stray characters. Every setting needs quotes around the value.</li>
            <li><strong>AGENTS.md not picked up.</strong> Make sure the file sits in the top folder of your project (the same folder your code lives in), and that it's named exactly <InlineCode>AGENTS.md</InlineCode> with that capitalisation.</li>
            <li><strong>"Read-only" mode doesn't exist.</strong> Older Codex versions call it <InlineCode>ask</InlineCode>. If <InlineCode>"read-only"</InlineCode> throws an error, change it to <InlineCode>"ask"</InlineCode>.</li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10 font-serif">
        That's it — you've got three voices
      </h2>
      <p className="text-lg leading-relaxed opacity-90 mb-6 font-serif">
        Claude Code got this feature first, but after a few minutes of setup, Gemini and Codex match it. The real benefit isn't the feature itself — it's the reminder that these tools are genuinely customisable. You're not locked into whatever mood the vendor decided was the default. If you want your coding helper to pause and teach you, just tell it to. Save that instruction as a command or a profile, and never re-type it.
      </p>
      <p className="text-lg leading-relaxed opacity-90 mb-6 font-serif">
        Start in whichever voice fits today's task, switch when the task changes. The whole point of a voice switcher is that no single voice is right all the time.
      </p>

      <div className="mt-16 pt-8 border-t border-anthropic-text/10 opacity-60 text-sm font-serif">
        <p className="font-bold mb-4 font-serif">Resources:</p>
        <ul className="space-y-2 font-serif">
          <li><a href="https://ai.google.dev/gemini-api/docs" className="hover:text-anthropic-accent underline">Gemini CLI Documentation</a></li>
          <li><a href="https://github.com/openai/codex-cli" className="hover:text-anthropic-accent underline">Codex CLI GitHub Repository</a></li>
          <li><a href="https://www.anthropic.com/claude-code" className="hover:text-anthropic-accent underline">Claude Code Announcement</a></li>
        </ul>
        <p className="mt-8 italic font-serif">Disclaimer: Tool features and configurations are accurate as of April 2026. Always check official documentation for updates.</p>
      </div>
    </>
  );
}

function StatuslinePost() {
  return (
    <>
      <h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight mb-6 leading-tight">
        Claude Code's Status Line, Explained — And How to Set It Up in 5 Minutes
      </h1>

      <p className="text-lg font-serif italic opacity-60 mb-12">
        Published: April 2026 | Reading Time: ~8 minutes
      </p>

      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        What is the status line?
      </h2>
      <p className="text-lg leading-relaxed opacity-90 mb-6 font-serif">
        If you use <strong>Claude Code</strong> — Anthropic's terminal-based coding assistant — there's a little strip of text that sits at the bottom of your terminal, just above where you type. That strip is called the <em>status line</em>. Out of the box it's pretty quiet. With a small one-time setup, it becomes the most useful piece of real estate in your terminal: it tells you which Claude model is answering you, how much of the conversation's memory you've used, and how close you are to Anthropic's usage limits.
      </p>
      <p className="text-lg leading-relaxed opacity-90 mb-6 font-serif">
        Think of it like the fuel gauge and trip meter on a car dashboard. You don't stare at it, but when something feels off — or when a bill arrives at the end of the month — you're very glad it was there. This post explains, in plain English, what each piece of the status line means, why you'd want one, and exactly how to install it on your computer. <strong>No bash experience required.</strong>
      </p>

      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        What you'll see when it's running
      </h2>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        Here's what one live line looks like:
      </p>
      <CodeBlock title="example status line">
{`Opus 4.7 | portfolio@main (+42 -7) | 48k/200k (24%) | effort: med | 5h 31% @18:30 IST | 7d 62% @Apr 24, 09:00 IST`}
      </CodeBlock>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        Read left-to-right, each piece is answering a question you'd otherwise have to stop and check:
      </p>
      <ul className="list-disc pl-6 mb-6 space-y-2 text-lg leading-relaxed opacity-90 font-serif">
        <li><strong>Opus 4.7</strong> — "Which Claude model am I talking to?" Opus is the most capable and the most expensive; Sonnet is the everyday workhorse; Haiku is the fastest and cheapest. A glance here prevents you from racking up Opus bills on a task Sonnet could've handled.</li>
        <li><strong>portfolio@main (+42 -7)</strong> — "Which folder am I in, and which branch of my code?" The numbers in brackets are the lines you've added and deleted since your last save. If you expected a tiny change and the number looks huge, that's your cue to stop and look.</li>
        <li><strong>48k/200k (24%)</strong> — "How full is the conversation's short-term memory?" Claude can only remember so many words at once. When this bar climbs past 80% or so, responses start getting slower and older details can fall out. The percentage goes green → yellow → orange → red as it fills up.</li>
        <li><strong>effort: med</strong> — "How hard is Claude thinking?" A setting you control. <em>Low</em> is snappy, <em>medium</em> is the default, <em>max</em> is the deep-thinking mode (and the most expensive). If you see <em>max</em> in red when you weren't expecting it, you know to switch back.</li>
        <li><strong>5h 31% @18:30 IST</strong> — "How close am I to Anthropic's five-hour usage limit, and when does it reset?" Anthropic's plans have rolling five-hour and seven-day quotas. This tells you "you've used 31%; the window resets at 6:30 PM your time."</li>
        <li><strong>7d 62% @Apr 24, 09:00 IST</strong> — same thing, but for the weekly quota. If this is high and it's only Tuesday, you probably want to slow down or switch to a cheaper model.</li>
      </ul>
      <p className="text-lg leading-relaxed opacity-90 mb-6 font-serif">
        That's it. One line, six numbers, no jargon — but collectively they answer the "is everything okay?" question in a way no popup or settings panel can.
      </p>

      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        Why bother?
      </h2>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        Three concrete wins, each of which pays for the setup time many times over:
      </p>
      <ul className="list-disc pl-6 mb-6 space-y-2 text-lg leading-relaxed opacity-90 font-serif">
        <li><strong>You catch the expensive-model mistake.</strong> It's easy to leave a session running on Opus after a heavy task and forget to switch back. The model name on the status line is a passive reminder every time you glance down.</li>
        <li><strong>You don't commit to the wrong branch.</strong> Working on three features in parallel? The branch name and diff counts are right there. An unfamiliar branch name is a hard stop.</li>
        <li><strong>You see limits before you hit them.</strong> Running out of your weekly quota an hour before a deadline is a particular kind of awful. A yellow 7-day number on a Tuesday is an early warning.</li>
      </ul>

      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        Set it up in 5 minutes
      </h2>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        The status line is a small script called <InlineCode>statusline.sh</InlineCode>, written by <a href="https://github.com/daniel3303/ClaudeCodeStatusLine" target="_blank" rel="noopener noreferrer" className="text-anthropic-accent hover:underline">Daniel Oh</a> and freely available on GitHub. You'll do four things: install one helper tool, download the script, tell Claude Code to use it, and restart.
      </p>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        Open a terminal. Copy-paste each block; don't worry about understanding every character.
      </p>

      <h3 className="text-xl font-serif font-medium mt-8 mb-4 text-anthropic-accent">
        Step 1 — Install <InlineCode>jq</InlineCode> (a tiny helper)
      </h3>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        The script uses a small utility called <InlineCode>jq</InlineCode> to read JSON. Most computers don't have it preinstalled. Run the line that matches your operating system:
      </p>
      <CodeBlock title="install jq">
{`# macOS (requires Homebrew — brew.sh)
brew install jq

# Ubuntu, Debian, or WSL on Windows
sudo apt install -y jq

# Fedora
sudo dnf install -y jq`}
      </CodeBlock>

      <h3 className="text-xl font-serif font-medium mt-8 mb-4 text-anthropic-accent">
        Step 2 — Download the script
      </h3>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        Save the script into Claude Code's config folder (<InlineCode>~/.claude/</InlineCode>) and mark it executable:
      </p>
      <CodeBlock title="download statusline.sh">
{`mkdir -p ~/.claude
curl -L -o ~/.claude/statusline.sh \\
  https://raw.githubusercontent.com/daniel3303/ClaudeCodeStatusLine/main/statusline.sh
chmod +x ~/.claude/statusline.sh`}
      </CodeBlock>

      <h3 className="text-xl font-serif font-medium mt-8 mb-4 text-anthropic-accent">
        Step 3 — Tell Claude Code to use it
      </h3>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        Open the file <InlineCode>~/.claude/settings.json</InlineCode> in any text editor. If the file doesn't exist yet, create a new one. Add the following block:
      </p>
      <CodeBlock title="~/.claude/settings.json">
{`{
  "statusLine": {
    "type": "command",
    "command": "~/.claude/statusline.sh"
  }
}`}
      </CodeBlock>
      <p className="text-lg leading-relaxed opacity-90 mb-6 font-serif">
        If your <InlineCode>settings.json</InlineCode> already has other settings inside the outer braces, just add the <InlineCode>statusLine</InlineCode> block as another entry (don't forget the comma between entries).
      </p>

      <h3 className="text-xl font-serif font-medium mt-8 mb-4 text-anthropic-accent">
        Step 4 — Restart Claude Code
      </h3>
      <p className="text-lg leading-relaxed opacity-90 mb-6 font-serif">
        Close your Claude Code session with <InlineCode>Ctrl+C</InlineCode> (or by typing <InlineCode>/exit</InlineCode>) and start it again. You should now see the full status line at the bottom of your terminal. If you do, you're done — skip to the timezone section if you want the time in something other than UTC.
      </p>

      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        Show reset times in your own timezone
      </h2>
      <p className="text-lg leading-relaxed opacity-90 mb-6 font-serif">
        By default the script shows reset times in UTC, which means mental arithmetic every time you want to know when your quota comes back. Luckily, fixing that is one line of editing.
      </p>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        Open <InlineCode>~/.claude/statusline.sh</InlineCode> in a text editor and search for <InlineCode>TZ=</InlineCode>. You'll find several lines that look like this:
      </p>
      <CodeBlock title="before">
{`formatted=$(TZ=UTC date -d "@$epoch" +"%H:%M" ...)`}
      </CodeBlock>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        Replace <InlineCode>UTC</InlineCode> with your own <em>IANA timezone name</em>. Some common ones:
      </p>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse font-serif">
          <thead>
            <tr className="bg-anthropic-text/5">
              <th className="p-3 border border-anthropic-text/10 font-bold text-left">Where you are</th>
              <th className="p-3 border border-anthropic-text/10 font-bold text-left">Replace UTC with</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="p-3 border border-anthropic-text/10">India</td><td className="p-3 border border-anthropic-text/10"><InlineCode>Asia/Kolkata</InlineCode></td></tr>
            <tr><td className="p-3 border border-anthropic-text/10">US East (New York)</td><td className="p-3 border border-anthropic-text/10"><InlineCode>America/New_York</InlineCode></td></tr>
            <tr><td className="p-3 border border-anthropic-text/10">US West (San Francisco)</td><td className="p-3 border border-anthropic-text/10"><InlineCode>America/Los_Angeles</InlineCode></td></tr>
            <tr><td className="p-3 border border-anthropic-text/10">UK</td><td className="p-3 border border-anthropic-text/10"><InlineCode>Europe/London</InlineCode></td></tr>
            <tr><td className="p-3 border border-anthropic-text/10">Central Europe</td><td className="p-3 border border-anthropic-text/10"><InlineCode>Europe/Berlin</InlineCode></td></tr>
            <tr><td className="p-3 border border-anthropic-text/10">Japan</td><td className="p-3 border border-anthropic-text/10"><InlineCode>Asia/Tokyo</InlineCode></td></tr>
            <tr><td className="p-3 border border-anthropic-text/10">Sydney</td><td className="p-3 border border-anthropic-text/10"><InlineCode>Australia/Sydney</InlineCode></td></tr>
          </tbody>
        </table>
      </div>
      <p className="text-lg leading-relaxed opacity-90 mb-4 font-serif">
        So for someone in Bengaluru, the line becomes:
      </p>
      <CodeBlock title="after">
{`formatted=$(TZ=Asia/Kolkata date -d "@$epoch" +"%H:%M" ...)`}
      </CodeBlock>
      <p className="text-lg leading-relaxed opacity-90 mb-6 font-serif">
        Replace <strong>every</strong> <InlineCode>TZ=UTC</InlineCode> in the file the same way (your editor's "Find & Replace" button makes this painless). Save the file, restart Claude Code, and reset times now read in your local clock. That's also the only change that ships in <a href="https://github.com/mahadevaiahrashmi/mahadevaiahrashmi.github.io/blob/main/.claude/statusline.sh" target="_blank" rel="noopener noreferrer" className="text-anthropic-accent hover:underline">the Kolkata-pinned version</a> on this site — a single find-and-replace, nothing more.
      </p>
      <p className="text-lg leading-relaxed opacity-90 mb-6 font-serif">
        <em>Behind the scenes:</em> Anthropic sends reset times as UTC timestamps (for example, <InlineCode>2026-04-18T13:00:00Z</InlineCode>). The <InlineCode>TZ=...</InlineCode> prefix tells the computer "convert this UTC time into <em>this</em> timezone before printing." So <InlineCode>13:00 UTC</InlineCode> prints as <InlineCode>18:30</InlineCode> in Kolkata, <InlineCode>09:00</InlineCode> in New York, or <InlineCode>14:00</InlineCode> in London — same instant, local clock. No math on your end.
      </p>

      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        If something looks wrong
      </h2>
      <ul className="list-disc pl-6 mb-6 space-y-3 text-lg leading-relaxed opacity-90 font-serif">
        <li><strong>The status line is blank.</strong> Make sure the script is marked executable (<InlineCode>chmod +x ~/.claude/statusline.sh</InlineCode>) and that the path in <InlineCode>settings.json</InlineCode> matches where you saved it.</li>
        <li><strong>It says <InlineCode>jq: command not found</InlineCode>.</strong> <InlineCode>jq</InlineCode> didn't install. Re-run Step 1 for your operating system.</li>
        <li><strong>The 5h / 7d numbers show a dash (<InlineCode>-</InlineCode>).</strong> Claude Code hasn't yet sent the usage data this session; it usually fills in after the first message. If it stays blank, you may be on an older Claude Code version — run <InlineCode>claude-code --version</InlineCode> and update.</li>
        <li><strong>The times look wrong by several hours.</strong> Double-check the timezone name — IANA zone names are case-sensitive and use underscores (e.g. <InlineCode>America/New_York</InlineCode>, not <InlineCode>America/new_york</InlineCode> or <InlineCode>New York</InlineCode>).</li>
        <li><strong>Colours don't show on Windows.</strong> Plain PowerShell doesn't render ANSI colours by default. Use Windows Terminal or WSL instead.</li>
      </ul>

      <h2 className="text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10">
        That's it
      </h2>
      <p className="text-lg leading-relaxed opacity-90 mb-6 font-serif">
        Five minutes of setup gives you a dashboard that runs silently at the bottom of every Claude Code session. You'll stop wondering which model you're on, stop accidentally committing on the wrong branch, and never again be surprised by a quota that ran out an hour before your deadline. The script is tiny, auditable, and works on macOS, Linux, and Windows (via WSL).
      </p>
      <p className="text-lg leading-relaxed opacity-90 mb-6 font-serif">
        If you tweak it — a different colour scheme, an extra field, a shorter format — the script is plain text and easy to experiment with. Change something, save, restart Claude Code, and watch the line update. That's the whole feedback loop.
      </p>

      <div className="mt-16 pt-8 border-t border-anthropic-text/10 opacity-60 text-sm font-serif">
        <p className="font-bold mb-4 font-serif">Resources:</p>
        <ul className="space-y-2 font-serif">
          <li><a href="https://github.com/daniel3303/ClaudeCodeStatusLine" className="hover:text-anthropic-accent underline">Daniel Oh — ClaudeCodeStatusLine (upstream)</a></li>
          <li><a href="https://docs.claude.com/en/docs/claude-code/statusline" className="hover:text-anthropic-accent underline">Claude Code — Statusline Documentation</a></li>
          <li><a href="https://docs.claude.com/en/docs/claude-code/settings" className="hover:text-anthropic-accent underline">Claude Code — Settings & <InlineCode>~/.claude/settings.json</InlineCode></a></li>
        </ul>
        <p className="mt-8 italic font-serif">Disclaimer: statusline.sh behaviour and the Claude Code JSON schema are accurate as of April 2026. The upstream project evolves quickly — check the repo for the current version.</p>
      </div>
    </>
  );
}

const postContentBySlug: Record<string, ComponentType> = {
  "warehouse-routing-openenv": WarehouseRoutingPost,
  "richfeyn-smart-jar": RichFeynPost,
  "claude-style-replication": ClaudeStyleReplicationPost,
  "claude-code-statusline": StatuslinePost,
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
    <div className="min-h-screen selection:bg-anthropic-accent/20 font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-anthropic-bg/80 backdrop-blur-sm border-b border-anthropic-text/5 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="font-serif text-xl font-medium tracking-tight hover:opacity-80 transition-opacity">
            Rashmi Mahadevaiah
          </Link>
          <div className="flex gap-4 sm:gap-8 text-[11px] sm:text-sm font-sans uppercase tracking-[0.14em] sm:tracking-widest opacity-60 whitespace-nowrap">
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
