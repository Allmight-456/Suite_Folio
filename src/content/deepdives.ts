// Deep-dive narratives (PROJECT-DEEP-DIVES.md). "gitLog" lines are paraphrased
// from real changelogs/READMEs in handoff/research/ — TODO(M3 verify): replace
// with verbatim `git log` excerpts once repos are cloned locally.

export type DeepDive = {
  slug: string;
  what: string;
  constraint: string;
  gitLog: string[];
  learnt: string;
};

export const deepDives: Record<string, DeepDive> = {
  autodocxpdf: {
    slug: "autodocxpdf",
    what: "Autonomous Docker-based documentation generator: feed it a Repomix context file, a Gemini key, and live app URLs → it produces professional DOCX/PDF with AI content, code/app screenshots, and Mermaid architecture diagrams.",
    constraint:
      "Gemini free tier = 15 requests/minute. A full doc run needs dozens of calls (plan, sections, screenshot targets, diagrams). v1.0 hit 429s constantly. The fix became the project's real engineering content.",
    gitLog: [
      "v1.2.2 — intelligent rate limiting: default delay 2s→5s (12 req/min, under the 15 RPM ceiling), per-request-type delays, per-minute counter, exponential backoff on 429s.",
      "v1.2.2 — section-count optimization (9–15 by project size), max 8 screenshots with priority selection, max 3 diagrams — reduce calls, don't just pace them.",
      "v1.2.4 — Docker: container restart loops fixed (restart policy 'no'); ChromeDriver/Chromium mismatch solved using the system ChromeDriver from apt.",
      "v1.2.5 — TOC, hyperlinks, contributor metadata; docs rewrite that corrected its own claims (Flash-Lite not Pro; Selenium for screenshots, Puppeteer only inside mermaid-cli).",
    ],
    learnt:
      "Rate limits are an architecture input, not an ops nuisance — the cheapest request is the one you never make. Multi-agent isn't glamour: it's mostly contracts between agents and retry semantics. And honest docs are a feature.",
  },
  skillforge: {
    slug: "skillforge",
    what: "A procedural memory layer for AI coding agents. When an LLM fixes a bug, the fix-pattern is distilled into a reusable Claude Skill file; AST-based retrieval surfaces it next time the same error class appears; a human gates what enters the library (MCP-served).",
    constraint:
      "Context cost. Re-deriving a known fix burns ~3000 tokens of exploration; retrieving the distilled skill costs ~80. Target: ~50× reduction on repeat-class errors.",
    gitLog: [
      "Episodic memory (mem0-style, vector-backed) remembers what happened; procedural memory remembers how to do things — SkillForge bets coding agents need the second kind.",
      "Indexed by code structure (AST) rather than embedding similarity; AST node-type + error-class is a surprisingly strong retrieval key.",
      "Findings from the Hermes/OpenClaw long-running boxes (tool-loop convergence, memory bleed) feed the design.",
    ],
    learnt:
      "Retrieval precision beats recall when a human gates the library. Mode-collapse in eval consensus is the open problem. (WIP — present tense by design.)",
  },
  ticketflow: {
    slug: "ticketflow",
    what: "Concurrent event-management & ticket-booking REST API in Go, Clean Architecture (domain / repository / service / handler), chi + pgx + go-redis, versioned migrations, zerolog, ~15MB multi-stage Docker image.",
    constraint:
      "The last-seat problem — simultaneous purchases of the final ticket. The booking flow is a 10-step sequence: Redis distributed lock → PostgreSQL SELECT FOR UPDATE → optimistic version check. Every write lands in an immutable JSONB audit log.",
    gitLog: [
      "Redis distributed lock + SELECT FOR UPDATE + optimistic version check; cancellation restores inventory.",
      "Immutable JSONB audit log — field-level diffs, actor ID, client IP.",
      "Redis sliding-window Lua rate limiting (100 req/min/IP); batch creation of 50 events in one atomic round-trip via pgx Batch.",
      "JWT HS256 RBAC — user reads/books, admin writes; passwords bcrypt-hashed.",
    ],
    learnt:
      "Three overlapping concurrency controls aren't paranoia — each fails differently (lock TTL expiry vs. txn serialization vs. lost update). Audit trails are cheap to add early, impossible to retrofit honestly.",
  },
  "market-research": {
    slug: "market-research",
    what: "Multi-agent LangChain + Gemini pipeline (BYOK) scanning 1000+ data points on the AI/LLM market into company reports and investment proposals; ~95% of the manual research loop automated. (Forked base, substantially extended.)",
    constraint:
      "First contact with multi-agent orchestration: where do agent boundaries belong? The answer that worked — follow output artifacts (report sections), not 'roles'.",
    gitLog: [
      "Automated market research via a web-browser tool; AI use-case generation; resource discovery.",
      "Final proposal generation summarizing research, use cases, and resources.",
      "BYOK model — no server-side key custody simplifies the whole architecture.",
    ],
    learnt:
      "Agent boundaries should follow output artifacts, not roles. BYOK shapes architecture — no key custody simplifies everything.",
  },
  "ai-bubble": {
    slug: "ai-bubble",
    what: "A single-page editorial knowledge base comparing the 2026 AI boom to historical asset bubbles. Vanilla ES modules, zero dependencies, content as a single typed CONTENT object, tokens in :root, IntersectionObserver nav + counters, print stylesheet, reduced-motion support, a11y-checked contrast.",
    constraint:
      "No build step. The constraint is the style: discipline that frameworks let you skip — separation of content from layout, by hand.",
    gitLog: [
      "All copy lives in content.js as a single exported CONTENT object; layout/styles pick up changes on reload.",
      "Design tokens in :root (Renaissance palette + one neon --alarm-pink).",
      "IntersectionObserver nav + counters, print stylesheet, reduced-motion support.",
    ],
    learnt:
      "Constraint as style: no build step forces discipline frameworks let you skip. Editorial sites are state machines too (active section, counters, print).",
  },
};
