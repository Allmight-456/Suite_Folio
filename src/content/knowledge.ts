// Work beyond personal repos + learnings, for the explorable terminal index.
// Client work = role bullets from CONTENT.md §6 (facts registry). Field notes =
// now.log study themes + per-project lessons surfaced as standalone insights.
// No invented claims.

export type WorkRow = {
  name: string;
  meta: string; // mono right-column livery
  detail: string; // expanded body
  href?: string; // projects link to deep-dives; field notes/client may have none
  tag?: string; // e.g. "wip"
};

export type WorkGroup = {
  dir: string; // terminal "directory" name
  note?: string; // parenthetical after the dir
  rows: WorkRow[];
};

// Client / professional work — Rayvector (CONTENT.md §6 role bullets).
const client: WorkGroup = {
  dir: "client/",
  note: "rayvector · production",
  rows: [
    {
      name: "plot-management-api",
      meta: "fastapi · jwt · redis",
      detail:
        "Production FastAPI backend for a Plot Management System (multinational client): JWT auth, cursor-based pagination, Redis caching.",
    },
    {
      name: "firebase→postgres",
      meta: "zero downtime · 2025",
      detail:
        "Full Firebase→PostgreSQL migration with zero downtime — APIs, schema, and cloud infra redesigned in place.",
    },
    {
      name: "azure-deploys",
      meta: "docker · nginx · ci/cd",
      detail:
        "Dockerized services on an Azure VM behind Nginx; DNS and pipelines for two live environments.",
    },
    {
      name: "voting-platform-api",
      meta: "aws ec2 · postgres",
      detail:
        "Voting Platform REST API on AWS EC2 with PostgreSQL — full CRUD, in production.",
    },
  ],
};

// Field notes — now.log study themes + per-project lessons. Things known/tracked,
// not shipped as products. Present-tense, honestly hedged.
const fieldNotes: WorkGroup = {
  dir: "field-notes/",
  note: "off prod · what I'm learning",
  rows: [
    {
      name: "harness-engineering",
      meta: "evals in-loop",
      detail:
        "Wiring guardrails and evals into the LLM workflow itself, not bolted on after. Open question: pre-tool, post-tool, or a separate critic agent?",
    },
    {
      name: "agent-memory",
      meta: "mem0 vs ast",
      detail:
        "Episodic memory (mem0, vector-backed) remembers what happened; procedural memory (SkillForge, AST-indexed) remembers how to do things — two halves of the same problem.",
    },
    {
      name: "tree-retrieval",
      meta: "pageindex",
      detail:
        "PageIndex and tree-structured retrieval — moving past vector-only RAG. Reads more like how you'd actually search a codebase or a textbook.",
    },
    {
      name: "agent-boxes",
      meta: "hermes · openclaw",
      detail:
        "Long-running agent boxes on a Hostinger VPS, kept alive to watch where production-grade loops degrade: tool-loop convergence, memory bleed, behaviour under sustained load.",
    },
    {
      name: "tooling",
      meta: "conductor · superset",
      detail:
        "Running agentic coding tools against real PRs to see which loop converges. Cursor stays the daily driver; these are the challengers.",
    },
    // per-project lessons surfaced as standalone insights
    {
      name: "lesson: rate-limits-as-architecture",
      meta: "from autodocxpdf",
      detail:
        "Rate limits are an architecture input, not an ops nuisance — the cheapest request is the one you never make. Reduce calls; don't just pace them.",
    },
    {
      name: "lesson: layered-concurrency",
      meta: "from ticketflow",
      detail:
        "Three overlapping concurrency controls aren't paranoia — each fails differently (lock TTL expiry vs. txn serialization vs. lost update). Audit trails are cheap early, impossible to retrofit honestly.",
    },
    {
      name: "lesson: artifact-shaped-agents",
      meta: "from market-research",
      detail:
        "Agent boundaries should follow output artifacts (report sections), not 'roles'. BYOK shapes architecture — no server-side key custody simplifies everything.",
    },
  ],
};

export const clientWork = client;
export const fieldNotesGroup = fieldNotes;
