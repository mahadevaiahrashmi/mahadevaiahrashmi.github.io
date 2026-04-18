// agent-notes: { ctx: "pin exact className output for blog-prose primitives", deps: ["src/components/blog-prose.tsx", "@testing-library/react"], state: active, last: "tara@2026-04-18", key: ["protects #28 from silent class-string drift; fails if a primitive's base tokens change"] }
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { PostH2, PostH3, PostP, PostUL, PostOL } from "./blog-prose";

const H2_BASE = "text-2xl font-serif font-medium mt-12 mb-6 pb-2 border-b border-anthropic-text/10";
const H3_BASE = "text-xl font-serif font-medium mt-8 mb-4 text-anthropic-accent";
const P_BASE = "text-lg leading-relaxed opacity-90 mb-6 font-serif";
const UL_BASE = "list-disc pl-6 mb-6 space-y-2 text-lg leading-relaxed opacity-90 font-serif";
const OL_BASE = "list-decimal pl-6 mb-6 space-y-2 text-lg leading-relaxed opacity-90 font-serif";

describe("blog-prose primitive className output", () => {
  it("PostH2 renders with the exact base class string", () => {
    const { container } = render(<PostH2>x</PostH2>);
    expect(container.querySelector("h2")?.className).toBe(H2_BASE);
  });

  it("PostH3 renders with the exact base class string", () => {
    const { container } = render(<PostH3>x</PostH3>);
    expect(container.querySelector("h3")?.className).toBe(H3_BASE);
  });

  it("PostP renders with the exact base class string", () => {
    const { container } = render(<PostP>x</PostP>);
    expect(container.querySelector("p")?.className).toBe(P_BASE);
  });

  it("PostUL renders with the exact base class string", () => {
    const { container } = render(<PostUL>x</PostUL>);
    expect(container.querySelector("ul")?.className).toBe(UL_BASE);
  });

  it("PostOL renders with the exact base class string", () => {
    const { container } = render(<PostOL>x</PostOL>);
    expect(container.querySelector("ol")?.className).toBe(OL_BASE);
  });

  it("appends caller className rather than replacing the base", () => {
    const { container } = render(<PostP className="text-center">x</PostP>);
    expect(container.querySelector("p")?.className).toBe(`${P_BASE} text-center`);
  });
});
