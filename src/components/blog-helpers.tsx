// agent-notes: { ctx: "shared blog post components (InlineCode, ClaudeCodeBlock, Card, ColdOpenPanel)", deps: ["motion/react", "lucide-react", "./blog-tokenizer"], state: active, last: "sato@2026-04-19", key: ["extracted from BlogPost.tsx for #29 split; Card/ColdOpenPanel live here for uniform import paths across posts; noLineNumbers prop suppresses gutter numbering"] }
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Check, Copy, Download, ChevronDown, ChevronRight, WrapText } from "lucide-react";
import { useState, type ReactNode } from "react";
import { TOKENIZER, tokenClass } from "./blog-tokenizer";

export const InlineCode = ({ children }: { children: string }) => {
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

export const ClaudeCodeBlock = ({
  children,
  title,
  language = "toml",
  plain = false,
  codexScript = false,
  noLineNumbers = false,
}: {
  children: string;
  title?: string;
  language?: string;
  plain?: boolean;
  codexScript?: boolean;
  noLineNumbers?: boolean;
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
          {!noLineNumbers && (
            <span className="table-cell pr-6 text-right text-zinc-400 dark:text-zinc-500 select-none w-10 font-mono text-xs">
              {lineIndex + 1}
            </span>
          )}
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

export const Card = ({ emoji, title, color, question, code, outcome, insight }: {
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

export const ColdOpenPanel = ({ title, subtitle, children, verdict, verdictColor }: {
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
