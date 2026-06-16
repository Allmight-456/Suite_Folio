// Homepage Journey panels (owner-directed: replace the two click-through doors
// with a pinned horizontal-scroll that surfaces experience + work + interests on
// first look). All copy is sourced — role bullets from CONTENT.md §6, projects
// from projects.ts, interests from lab.ts. No new claims.
import { projects } from "./projects";

// Role bullets — CONTENT.md §6 (resume v5 phrasing, inside the facts registry).
export const roleBullets = [
  "Production FastAPI backend for a Plot Management System (multinational client): JWT auth, cursor-based pagination, Redis caching.",
  "Full Firebase→PostgreSQL migration with zero downtime — APIs, schema, and cloud infra redesigned in place.",
  "Dockerized services on an Azure VM behind Nginx; DNS and pipelines for two live environments.",
  "Voting Platform REST API on AWS EC2 with PostgreSQL — full CRUD, in production.",
] as const;

// Headline projects for the Journey "shipped" panel; the full set lives in the
// /work index. Filter (not re-list) so order + copy stay single-sourced.
const HEADLINE = ["skillforge", "autodocxpdf", "ticketflow"] as const;
export const headlineProjects = projects.filter((p) =>
  (HEADLINE as readonly string[]).includes(p.slug),
);

// Panel headers — each opens with a shell command so the section reads as a
// terminal session, not a carousel. Bodies render in components/journey.
export const journeyPanels = [
  {
    id: "experience",
    cmd: "uptime --career",
    title: "On the clock",
    blurb: "~1 year shipping production backends — Rayvector, Bengaluru.",
  },
  {
    id: "work",
    cmd: "ls ./shipped",
    title: "What I've shipped",
    blurb: "Systems that survived the constraints they were built under.",
  },
  {
    id: "agentic",
    cmd: "tail -f ~/agents/*.log",
    title: "Where I'm digging",
    blurb: "Agent loops, memory, retrieval, evals — off prod, on purpose.",
  },
  {
    id: "more",
    cmd: "cd ~ && open .",
    title: "Go deeper",
    blurb: "The full index, the git log, and a way to reach me.",
  },
] as const;

export type JourneyPanel = (typeof journeyPanels)[number];
