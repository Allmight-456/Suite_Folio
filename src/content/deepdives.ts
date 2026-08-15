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
  // Sourced from the repo READMEs (github.com/Allmight-456/{Rasputin_Loop,
  // Amadeus_Skill}), read 2026-08-14. No placings claimed: Slack's challenge did
  // not go Ishan's way and Build Week results were still pending (owner, 2026-08-14).
  "rasputin-loop": {
    slug: "rasputin-loop",
    what: "A Slack-native agent built on Strands and running on MiniMax M3. @mention it (or /loop) and a single agent loop thinks, optionally calls a tool, and replies in-thread — reading attached files, remembering what matters, and running several distinct Slack apps from one process.",
    constraint:
      "One brain, or a router? The obvious build is an intent parser dispatching to handlers. That fails the moment a request straddles two intents. The bet here: no parser, no command router, no extraction pipeline — one agent decides, and everything else is a tool it can reach for.",
    gitLog: [
      "Episodic memory in SQLite, each entry stamped with who/where/when and re-injected with provenance — the agent is its own filter: saves signal, skips chit-chat, de-dupes.",
      "Hybrid recall over libSQL/Turso: FTS5 lexical + local `fastembed` vectors fused by Reciprocal Rank Fusion — no embedding API key in the loop.",
      "Guardrails inside the loop, not bolted on: tool-call caps, repeat limits, a token budget, and a risky-Slack-method blocklist.",
      "`loop-eval` runs a golden set through the real agent and gates on regressions; per-interaction telemetry and per-step traces persist to SQLite.",
      "Jira auto-triage: bug reports detected in-thread → title/priority/assignee extracted → confirmed with the user → ticket created, with @mention → Slack email → Jira account ID routing.",
    ],
    learnt:
      "A single loop with good tools beats a router with good intentions — the routing logic you don't write is the routing logic that can't be wrong. Provenance on a memory is what makes it safe to re-inject; an unstamped memory is a rumour.",
  },
  amadeus: {
    slug: "amadeus",
    what: "A local-first procedural-memory compiler for coding harnesses. It captures a Codex run a human explicitly opted into, helps that human turn a successful run into a compact skill or a deterministic script, and saves the result as a reviewable preview. Ships as a CLI, a project-scoped MCP server and a local dashboard.",
    constraint:
      "Nothing may activate itself. A skill library that auto-promotes what looks successful is a library that quietly poisons every future run — so the preview/active boundary is enforced structurally: a `reviewed_preview` candidate is excluded from retrieval entirely, and only a passing matched evaluation plus a named human promotion installs the frozen package.",
    gitLog: [
      "Capture starts only on an explicit --consent, scoped to that one session; model reasoning is excluded and API-key variables are stripped from the child environment.",
      "Redaction before persistence — API keys, tokens, passwords, auth headers and private-key blocks replaced with a marker; user patterns rejected if they use lookarounds, backreferences or nested repetition.",
      "Authoring removes known no-ops and duplicate lines, validates safe regex, and enforces a 500-line hard limit with a 120-line compactness warning.",
      "Retrieval abstains unless the top match clears both a score threshold and a margin over the runner-up; only the winning skill's body enters the managed prompt, never the candidate store.",
      "Capture sits behind a HarnessAdapter interface — Codex is the only live adapter today, and the README says so rather than claiming portability it hasn't tested.",
    ],
    learnt:
      "Governance is the product. The interesting part wasn't generating skills — it was the boundary that stops a plausible one from being used: consent to capture, a named reviewer with a written rationale, and retrieval that abstains rather than guesses.",
  },
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
