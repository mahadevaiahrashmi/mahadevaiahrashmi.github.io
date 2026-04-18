// agent-notes: { ctx: "slug-to-component registry for blog posts; sole import surface for the router", deps: ["./posts/*"], state: active, last: "sato@2026-04-18", key: ["split from BlogPost.tsx to satisfy react-refresh/only-export-components; also the single place to wire a new post into routing"] }
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ComponentType } from "react";
import WarehouseRoutingPost from "./posts/warehouse-routing-openenv";
import OpenEnvPlay2SetupPost from "./posts/openenv-play2-setup";
import BuildWarehouseRoutingPost from "./posts/build-warehouse-routing-openenv";
import RichFeynPost from "./posts/richfeyn-smart-jar";
import ClaudeStyleReplicationPost from "./posts/claude-style-replication";
import StatuslinePost from "./posts/claude-code-statusline";

export const postContentBySlug: Record<string, ComponentType> = {
  "warehouse-routing-openenv": WarehouseRoutingPost,
  "openenv-play2-setup": OpenEnvPlay2SetupPost,
  "build-warehouse-routing-openenv": BuildWarehouseRoutingPost,
  "richfeyn-smart-jar": RichFeynPost,
  "claude-style-replication": ClaudeStyleReplicationPost,
  "claude-code-statusline": StatuslinePost,
};
