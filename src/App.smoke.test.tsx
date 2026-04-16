import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import App from "./App";

function renderAt(path: string) {
  window.history.pushState({}, "", path);
  return render(<App />);
}

describe("core route smoke tests", () => {
  beforeEach(() => {
    document.head.querySelector("#article-ld-json")?.remove();
  });

  it("renders home page", () => {
    renderAt("/");
    expect(screen.getByText("Rashmi Mahadevaiah")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Blog" })).toBeInTheDocument();
  });

  it("renders blog index", () => {
    renderAt("/blog");
    expect(screen.getByRole("heading", { name: "Blog" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Warehouse Routing OpenEnv/i })).toBeInTheDocument();
  });

  it("renders valid blog post", () => {
    renderAt("/blog/warehouse-routing-openenv");
    expect(
      screen.getByRole("heading", {
        name: /Warehouse Routing OpenEnv: Why a 70B Llama Plays a Pick-and-Pack Tour Like a Random Walk/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders fallback on invalid blog slug", () => {
    renderAt("/blog/not-a-real-post");
    expect(screen.getByRole("heading", { name: "Post not found" })).toBeInTheDocument();
  });
});
