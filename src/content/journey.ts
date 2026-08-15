// Homepage Journey panels (owner-directed: replace the two click-through doors
// with a pinned horizontal-scroll that surfaces experience + work + interests on
// first look). All copy is sourced — role bullets from CONTENT.md §6, projects
// from projects.ts, interests from lab.ts. No new claims.
import { projects } from "./projects";

// Role bullets — CONTENT.md §6 (resume v5 phrasing, inside the facts registry).
// Grouped by employer since the timeline now spans two: an unlabelled flat list
// would silently attribute Rayvector's backend work to Emergent.
// TODO(owner): the Emergent bullets cover the reliability + customer side only —
// owner said more detail follows as the role develops. Extend, don't invent.
// Each role leads with ONE line that can be read at a glance — the previous
// shape was seven full-sentence bullets nobody finishes (owner, 2026-08-14).
// `summary` is the hook; `bullets` are fragments, not prose.
//
// The Emergent line is framed by what the AI Agent Reliability team actually
// does — agents produce a first version, and the job is the distance between
// that and software a customer can depend on. It deliberately does NOT use the
// industry label for this shape of role: owner-directed 2026-08-15, that term
// appears nowhere on the site, in the README, or in this repo's copy.
export const roleHighlights = [
  {
    at: "Emergent",
    period: "aug 2026 → present",
    summary:
      "Agents write the first version. I make it survive contact with real customers — and answer for it when it doesn't.",
    bullets: [
      "AI Agent Reliability — support and engineering",
      "full-stack builds on the Emergent platform",
      "bug fixes across Emergent's own app + client apps",
      "Kubernetes · Grafana · Redash · PostHog",
    ],
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

// The career block's brand mark. It belongs to the BLOCK, not to a single role:
// owner wants it centred against both cards as a section anchor (2026-08-15),
// so it is not a per-role field. Only Emergent has a mark; the Rayvector card is
// attributed by its own label, so nothing here implies the mark covers both.
export const careerMark = { kind: "emergent", label: "Emergent" } as const;

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
    blurb: "Production backends at Rayvector; agent reliability at Emergent.",
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
