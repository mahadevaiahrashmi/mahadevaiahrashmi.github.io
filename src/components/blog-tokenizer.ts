// agent-notes: { ctx: "tokenizer + color-class rules for blog code snippets", deps: [], state: active, last: "sato@2026-04-18", key: ["split from blog-helpers.tsx to satisfy react-refresh/only-export-components"] }
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const TOKENIZER =
  /(\s+|"[^"]*"|'[^']*'|\{\{[^}]*\}\}|\$[A-Z_][A-Z0-9_]*|~\/[\w./-]+|[\w.-]+\.(?:md|toml|ts|tsx|js|jsx|json|sh|py|txt)|\/[a-z][\w-]*|#[^\n]*|[=:|]|\{|\}|\[|\]|\(|\)|<|>|\/)/;

export const tokenClass = (token: string) => {
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
