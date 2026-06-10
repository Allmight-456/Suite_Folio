// The Strip (DESIGN-SPEC §3.3) — frames per CONTENT.md §3.
// Frames whose assets don't exist yet are commented with TODO(owner) per ASSETS.md;
// only currently-available imagery ships. Duotone treatment is CSS (D3-A) so the
// natural-color variant stays a one-variable toggle.
import { FrameSchema, type Frame } from "./schema";

export const frames: Frame[] = [
  {
    src: "/images/strip-bengaluru-raw.jpg",
    alt: "Ishan Kumar, candid photo, Bengaluru office",
    caption: "bengaluru, 2025",
    width: 1170,
    height: 1558,
  },
  // TODO(owner): TicketFlow booking-flow terminal screenshot — `the last seat problem, 2025`
  // TODO(build M2): AutoDocxPdf mermaid architecture PNG — `four agents, one pipeline, 2025`
  {
    src: "/images/strip-office-raw.png",
    alt: "Ishan Kumar, headshot",
    caption: "office hours, 2026",
    width: 2048,
    height: 2048,
  },
  // TODO(build M2): AI_Bubble site preview — `a quiet warning, 2026`
  // TODO(owner): htop/agent-box screenshot from Hostinger VPS — `hermes, still running, 2026`
  // TODO(owner, optional): RGIPT campus photo — `where it started, 2021`
  // TODO(build M2): SkillForge AST-retrieval sketch — `procedural memory, 2026`
].map((f) => FrameSchema.parse(f));
