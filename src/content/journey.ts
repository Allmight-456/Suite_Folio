// Homepage Journey panels (owner-directed: replace the two click-through doors
// with a pinned horizontal-scroll that surfaces experience + work + interests on
// first look). All copy is sourced — role bullets from CONTENT.md §6, projects
// from projects.ts, interests from lab.ts. No new claims.
import { projects } from "./projects";

// Role bullets — CONTENT.md §6 (resume v5 phrasing, inside the facts registry).
// Grouped by employer since the timeline now spans two: an unlabelled flat list
// would silently attribute Rayvector's backend work to Emergent.
// TODO(owner): the Emergent bullets are the FDE side only — owner said more
// detail will follow as the role develops (2026-08-14). Extend, don't invent.
// Each role leads with ONE line that can be read at a glance — the previous
// shape was seven full-sentence bullets nobody finishes (owner, 2026-08-14).
// `summary` is the hook; `bullets` are fragments, not prose; `logo` renders a
// side rail (certs/skills placement), which is why only Emergent carries one.
export const roleHighlights = [
  {
    at: "Emergent",
    period: "aug 2026 → present",
    summary:
      "I build the customer's application on Emergent's AI harness — then keep it alive.",
    bullets: [
      "full-stack customer builds, forward-deployed",
      "bug fixes across Emergent's own app + client apps",
      "Kubernetes · Grafana · Redash · PostHog",
    ],
    logo: "emergent",
  },
  {
    at: "Rayvector",
    period: "may 2025 → jul 2026",
    summary:
      "Production backends for a multinational client — and the zero-downtime migration underneath them.",
    bullets: [
      "FastAPI: JWT auth, cursor pagination, Redis caching",
      "Firebase → PostgreSQL migration, zero downtime",
      "Docker on an Azure VM behind Nginx, two live envs",
      "Voting Platform REST API on AWS EC2 + PostgreSQL",
    ],
  },
] as const;

// Headline projects for the Journey "shipped" panel; the full set lives in the
// /work index. Filter (not re-list) so order + copy stay single-sourced.
// Chosen for RANGE, not recency: a shipped agent, agent tooling, and a
// production Go backend. Amadeus and SkillForge are the same lineage
// (procedural memory for coding agents) so they never headline together —
// back-to-back they read as one project listed twice (owner, 2026-08-14).
const HEADLINE = ["rasputin-loop", "amadeus", "ticketflow"] as const;
export const headlineProjects = projects.filter((p) =>
  (HEADLINE as readonly string[]).includes(p.slug),
);

// Panel headers — each opens with a shell command so the section reads as a
// terminal session, not a carousel. Bodies render in components/journey.
export const journeyPanels = [
  {
    id: "experience",
    tag: "career",
    cmd: "uptime --career",
    title: "On the clock",
    blurb: "Production backends at Rayvector; now forward-deployed at Emergent.",
  },
  {
    id: "work",
    tag: "shipped",
    cmd: "ls ./shipped",
    title: "What I've shipped",
    blurb: "Agents, harnesses and backends that held under their constraints.",
  },
  {
    id: "agentic",
    tag: "agents",
    cmd: "tail -f ~/agents/*.log",
    title: "Where I'm digging",
    blurb: "Agent loops, memory, retrieval, evals — off prod, on purpose.",
  },
  {
    id: "more",
    tag: "home",
    cmd: "cd ~ && open .",
    title: "Go deeper",
    blurb: "The full index, the git log, and a way to reach me.",
  },
] as const;

export type JourneyPanel = (typeof journeyPanels)[number];
