// agent-notes: { ctx: "regression guard: blogPosts slugs match postContentBySlug keys and each post renders cleanly", deps: ["src/blog/posts.ts", "src/blog/post-registry.ts", "react-router-dom", "@testing-library/react"], state: active, last: "tara@2026-04-18", key: ["protects #29 split of BlogPost.tsx from slug drift and render-time regressions"] }
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createElement } from "react";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { blogPosts } from "./posts";
import { postContentBySlug } from "./post-registry";

describe("blog post registry", () => {
  it("has a rendered component for every blogPosts entry and vice versa", () => {
    const metadataSlugs = blogPosts.map((p) => p.slug).sort();
    const registrySlugs = Object.keys(postContentBySlug).sort();

    expect(registrySlugs).toEqual(metadataSlugs);
  });
});

describe("blog post component render safety", () => {
  afterEach(() => {
    cleanup();
  });

  const entries = Object.entries(postContentBySlug);

  it.each(entries)("mounts %s without throwing", (_slug, Component) => {
    expect(() =>
      render(createElement(MemoryRouter, null, createElement(Component))),
    ).not.toThrow();
  });
});
