// The /work page, reconceived as a personal map (owner-directed): not a project
// index (work experience already lives in the homepage `uptime --career`), but
// what pulls me — three children off "ishan": curiosity · obsessions · convictions.
// Projects are woven in as `evidence` links (every project page is reachable from
// here), never re-indexed. Copy is first-person rephrasing of grounded content in
// knowledge.ts / lab.ts / deepdives.ts — no new claims.
import { MindSectionSchema, type MindSection } from "./schema";

export const mind: MindSection[] = [
  {
    id: "curiosity",
    label: "curiosity/",
    descriptor: "what I explore",
    command: "cat ~/curiosity",
    items: [
      {
        name: "retrieval",
        detail:
          "Tree-structured & agentic RAG (PageIndex) — moving past vector-only. Reads more like how you'd actually search a codebase or a textbook.",
        evidence: [{ label: "pdfsage", slug: "pdfsage" }],
      },
      {
        name: "agent-tooling",
        detail:
          "Running agentic coding tools (Conductor, Superset) against real PRs to see which loop converges — Cursor stays the daily driver. The 'agent reads a repo and writes its scaffolding' idea started early.",
        evidence: [{ label: "repomaster", slug: "repomaster" }],
      },
      {
        name: "the-model-layer",
        detail:
          "Karpathy's nanochat lineage — single-GPU, a reference for what 'tiny but real' looks like down at the model layer.",
      },
      {
        name: "agent-boxes",
        detail:
          "Hermes & OpenClaw on a Hostinger VPS, kept alive to watch where production-grade loops degrade: tool-loop convergence, memory bleed, behaviour under sustained load.",
      },
    ],
  },
  {
    id: "obsessions",
    label: "obsessions/",
    descriptor: "what I can't put down",
    command: "ls -t ~/obsessions",
    items: [
      {
        name: "agent-memory",
        detail:
          "Procedural memory (AST-indexed) vs episodic (vector-backed) — the two halves coding agents need. Retrieval precision beats recall when a human gates the library.",
        evidence: [{ label: "skillforge", slug: "skillforge" }],
      },
      {
        name: "harness-engineering",
        detail:
          "Wiring evals & guardrails into the LLM workflow itself, not bolted on after. Open question: pre-tool, post-tool, or a separate critic agent?",
      },
      {
        name: "multi-agent-orchestration",
        detail:
          "Agent boundaries that follow output artifacts, not 'roles' — most of the work is contracts between agents and retry semantics.",
        evidence: [
          { label: "autodocxpdf", slug: "autodocxpdf" },
          { label: "market-research", slug: "market-research" },
        ],
      },
      {
        name: "production-under-limits",
        detail:
          "The agentic frontier has to sit on real free-tier limits — I'm drawn to designs where the limit becomes an architecture input, not a wall.",
        evidence: [{ label: "autodocxpdf", slug: "autodocxpdf" }],
      },
    ],
  },
  {
    id: "convictions",
    label: "convictions/",
    descriptor: "what shipping taught me",
    command: "git log --oneline ~/convictions",
    items: [
      {
        name: "rate-limits-are-architecture",
        detail:
          "Rate limits are an architecture input, not an ops nuisance — the cheapest request is the one you never make. Reduce calls; don't just pace them.",
        evidence: [{ label: "autodocxpdf", slug: "autodocxpdf" }],
      },
      {
        name: "concurrency-is-layered",
        detail:
          "Three overlapping concurrency controls aren't paranoia — each fails differently (lock TTL expiry vs txn serialization vs lost update). Audit trails are cheap early, impossible to retrofit honestly.",
        evidence: [
          { label: "ticketflow", slug: "ticketflow" },
          { label: "irctc", slug: "irctc" },
        ],
      },
      {
        name: "agents-follow-artifacts",
        detail:
          "Agent boundaries should follow output artifacts (report sections), not 'roles'. BYOK shapes architecture — no server-side key custody simplifies everything.",
        evidence: [{ label: "market-research", slug: "market-research" }],
      },
      {
        name: "constraint-is-style",
        detail:
          "No build step forces the discipline frameworks let you skip — separation of content from layout, by hand.",
        evidence: [{ label: "ai-bubble", slug: "ai-bubble" }],
      },
    ],
  },
].map((s) => MindSectionSchema.parse(s));
