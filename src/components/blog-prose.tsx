// agent-notes: { ctx: "shared prose primitives for blog posts (H2/H3/P/UL/OL)", deps: [], state: active, last: "sato@2026-04-18", key: ["extracted from posts/*.tsx for #28 to dedupe Tailwind class strings"] }
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// The `className` prop is APPENDED to each primitive's base class string — it
// cannot override the base. Tags needing a different margin/spacing (e.g.
// `mb-4` instead of `mb-6`, `space-y-1` instead of `space-y-2`) stay as raw
// Tailwind in the post files and will not match these primitives. Introduce a
// variant prop (e.g. `dense`, `spacing`) here before trying to migrate them.

import type { ReactNode } from "react";

type ProseProps = {
  children: ReactNode;
  className?: string;
};

const join = (base: string, extra?: string) =>
  extra ? `${base} ${extra}` : base;

export const PostH2 = ({ children, className }: ProseProps) => (
  <h2
    className={join(
      "text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10",
      className,
    )}
  >
    {children}
  </h2>
);

export const PostH3 = ({ children, className }: ProseProps) => (
  <h3
    className={join(
      "text-xl font-serif font-medium mt-8 mb-4 text-anthropic-accent",
      className,
    )}
  >
    {children}
  </h3>
);

export const PostP = ({ children, className }: ProseProps) => (
  <p
    className={join(
      "text-lg leading-relaxed opacity-90 mb-6 font-serif",
      className,
    )}
  >
    {children}
  </p>
);

export const PostUL = ({ children, className }: ProseProps) => (
  <ul
    className={join(
      "list-disc pl-6 mb-6 space-y-2 text-lg leading-relaxed opacity-90 font-serif",
      className,
    )}
  >
    {children}
  </ul>
);

export const PostOL = ({ children, className }: ProseProps) => (
  <ol
    className={join(
      "list-decimal pl-6 mb-6 space-y-2 text-lg leading-relaxed opacity-90 font-serif",
      className,
    )}
  >
    {children}
  </ol>
);
