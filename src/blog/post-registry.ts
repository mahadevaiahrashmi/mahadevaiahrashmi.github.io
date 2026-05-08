// agent-notes: { ctx: "slug-to-component registry for blog posts; sole import surface for the router", deps: ["./posts/*"], state: active, last: "sato@2026-05-08", key: ["split from BlogPost.tsx to satisfy react-refresh/only-export-components; also the single place to wire a new post into routing"] }
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
import VteamHybridCheatsheetPost from "./posts/vteam-hybrid-cheatsheet";
import DiscomfortAsCompassPost from "./posts/discomfort-as-compass";
import SoftwareErasPost from "./posts/software-eras";
import ShankaracharyaIllusionCompassionPost from "./posts/shankaracharya-illusion-compassion";
import ProcessIsThePrizePost from "./posts/process-is-the-prize";
import AiIsSuppandiPost from "./posts/ai-is-suppandi";
import FloorAndCeilingPost from "./posts/floor-and-ceiling";
import BuildItBreakItHireItPost from "./posts/build-it-break-it-hire-it";
import SubstrateIsPretrainingPost from "./posts/substrate-is-pre-training";
import RemainingHumanBottleneckPost from "./posts/remaining-human-bottleneck";

export const postContentBySlug: Record<string, ComponentType> = {
  "warehouse-routing-openenv": WarehouseRoutingPost,
  "openenv-play2-setup": OpenEnvPlay2SetupPost,
  "build-warehouse-routing-openenv": BuildWarehouseRoutingPost,
  "richfeyn-smart-jar": RichFeynPost,
  "claude-style-replication": ClaudeStyleReplicationPost,
  "claude-code-statusline": StatuslinePost,
  "vteam-hybrid-cheatsheet": VteamHybridCheatsheetPost,
  "discomfort-as-compass": DiscomfortAsCompassPost,
  "software-eras": SoftwareErasPost,
  "shankaracharya-illusion-compassion": ShankaracharyaIllusionCompassionPost,
  "process-is-the-prize": ProcessIsThePrizePost,
  "ai-is-suppandi": AiIsSuppandiPost,
  "floor-and-ceiling": FloorAndCeilingPost,
  "build-it-break-it-hire-it": BuildItBreakItHireItPost,
  "substrate-is-pre-training": SubstrateIsPretrainingPost,
  "remaining-human-bottleneck": RemainingHumanBottleneckPost,
};
