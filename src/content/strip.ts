// The Strip (DESIGN-SPEC §3.3) — frames per CONTENT.md §3.
// Frames whose assets don't exist yet are commented with TODO(owner) per ASSETS.md;
// only currently-available imagery ships. Duotone treatment is CSS (D3-A) so the
// natural-color variant stays a one-variable toggle.
import { FrameSchema, type Frame } from "./schema";

// `kind` lets the Strip render photos (duotone) vs schematic frames (the
// machine imagery) differently. Schematic frames are drawn as SVG until the
// owner supplies the real screenshots (ASSETS.md to-capture list).
export type StripFrame = Frame & { kind: "photo" | "schematic"; schematic?: string };

export const frames: StripFrame[] = [
  {
    kind: "photo",
    src: "/images/strip-bengaluru.jpg",
    alt: "Ishan Kumar, candid photo, Bengaluru office",
    caption: "bengaluru, 2025",
    width: 826,
    height: 1100,
  },
  {
    kind: "schematic",
    schematic: "pipeline",
    src: "",
    alt: "Schematic: four-agent documentation pipeline",
    caption: "four agents, one pipeline, 2025",
    width: 900,
    height: 1100,
  },
  {
    kind: "photo",
    src: "/images/strip-office.jpg",
    alt: "Ishan Kumar, headshot",
    caption: "office hours, 2026",
    width: 1100,
    height: 1100,
  },
  {
    kind: "schematic",
    schematic: "lock",
    src: "",
    alt: "Schematic: the last-seat concurrency lock flow",
    caption: "the last seat problem, 2025",
    width: 900,
    height: 1100,
  },
  {
    kind: "schematic",
    schematic: "ast",
    src: "",
    alt: "Schematic: AST-based procedural memory retrieval",
    caption: "procedural memory, 2026",
    width: 900,
    height: 1100,
  },
  // TODO(owner): real screenshots replace schematic frames as captured —
  //   TicketFlow logs, htop/agent-box (hermes, still running, 2026),
  //   AI_Bubble preview (a quiet warning, 2026), RGIPT campus (where it started, 2021).
].map(
  (f): StripFrame => ({
    ...FrameSchema.parse(f),
    kind: f.kind as "photo" | "schematic",
    schematic: f.schematic,
  }),
);
