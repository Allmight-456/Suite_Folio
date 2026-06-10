# PROJECT-DEEP-DIVES.md

Source-grounded narratives for /work/[slug]. "Git log says" excerpts are paraphrased
from real changelogs/READMEs pulled 2026-06-10 (raw files in handoff/research/).
The agent should `git clone` each repo locally and verify/extend excerpts from
actual `git log` before final copy — that richer pass needs repo access this
preparation environment didn't have (commit pages are bot-blocked; use local clones).

---

## /work/autodocxpdf — AutoDocxPdf (2025, v1.2.6, internal daily use)

**What:** Autonomous Docker-based documentation generator: feed it a Repomix context
file, a Gemini key, and live app URLs → it produces professional DOCX/PDF with AI
content, code/app screenshots, and Mermaid architecture diagrams.

**The constraint (the story):** Gemini free tier = 15 requests/minute. A full doc run
needs dozens of calls (plan, sections, screenshot targets, diagrams). v1.0 hit 429s
constantly. The fix became the project's real engineering content:

**What the git log says (changelog-derived):**
- v1.2.2 — intelligent rate limiting: default delay 2s→5s (12 req/min, safely under the
  15 RPM ceiling), per-request-type delays, per-minute request counter, exponential
  backoff on 429s. Also: section-count optimization (9–15 by project size), max 8
  screenshots with priority selection, max 3 diagrams — *reduce calls, don't just pace them*.
- v1.2.2/1.2.4 — Docker pain: container restart loops fixed (restart policy "no"),
  ChromeDriver/Chromium version mismatch solved by using the system ChromeDriver from apt.
- v1.2.5 — TOC, hyperlinks, contributor metadata; docs rewrite that *corrected its own
  claims* (Flash-Lite not Pro; Selenium for screenshots, Puppeteer only inside mermaid-cli).
- Architecture: GeminiDocAgent · ScreenshotAgent · MermaidAgent · DocumentAssembler
  under one orchestrator.

**What I learnt:** Rate limits are an architecture input, not an ops nuisance — the
cheapest request is the one you never make. Multi-agent ≠ glamour: it's mostly contracts
between agents and retry semantics. And honest docs are a feature: v1.2.5's biggest diff
was correcting the README's own inaccuracies.

---

## /work/skillforge — SkillForge (2026, WIP — flagship narrative)

**What:** A procedural memory layer for AI coding agents. When an LLM fixes a bug, the
fix-pattern is distilled into a reusable Claude Skill file; AST-based retrieval surfaces
it next time the same error class appears; a human gates what enters the library (MCP-served).

**The constraint:** Context cost. Re-deriving a known fix burns ~3000 tokens of
exploration; retrieving the distilled skill costs ~80. Target: ~50× reduction on
repeat-class errors.

**Why it's interesting (the /lab tie-in):** episodic memory (mem0-style, vector-backed)
remembers *what happened*; procedural memory remembers *how to do things*. SkillForge is
a bet that coding agents need the second kind, indexed by code structure (AST) rather
than embedding similarity. Findings from the Hermes/OpenClaw long-running boxes
(tool-loop convergence, memory bleed) feed the design.

**What I'm learning (present tense, it's WIP):** retrieval precision beats recall when a
human gates the library; AST node-type + error-class is a surprisingly strong key;
mode-collapse in eval consensus is the open problem.

---

## /work/ticketflow — TicketFlow (2025)

**What:** Concurrent event-management & ticket-booking REST API in Go, Clean Architecture
(domain / repository / service / handler), chi + pgx + go-redis, versioned migrations,
zerolog, ~15MB multi-stage Docker image.

**The constraint:** the last-seat problem — simultaneous purchases of the final ticket.
The booking flow is a 10-step belt-and-suspenders sequence: Redis distributed lock →
PostgreSQL `SELECT FOR UPDATE` → optimistic version check. Cancellation restores
inventory. Every write lands in an immutable JSONB audit log with field-level diffs,
actor ID, client IP. Redis sliding-window Lua rate limiting (100 req/min/IP). Batch
creation of 50 events in one atomic round-trip via pgx Batch.

**What I learnt:** Three overlapping concurrency controls aren't paranoia — each fails
differently (lock TTL expiry vs. txn serialization vs. lost update). Layered architecture
is compiler-enforceable in Go via `internal/`. Audit trails are cheap to add early,
impossible to retrofit honestly.

---

## /work/market-research — Market Research AI (2025)

**What:** Multi-agent LangChain + Gemini pipeline (BYOK) scanning 1000+ data points on
the GenAI/LLM market into company reports and investment proposals; ~95% of the manual
research loop automated. (Forked base, substantially extended — say so plainly on the page.)

**What I learnt:** First contact with multi-agent orchestration: agent boundaries should
follow *output artifacts* (report sections), not "roles". BYOK shapes architecture —
no server-side key custody simplifies everything.

---

## /work/ai-bubble — AI: A Quiet Warning (2026)

**What:** A single-page editorial knowledge base comparing the 2026 AI boom to historical
asset bubbles. Vanilla ES modules, zero dependencies, content as a single typed CONTENT
object, design tokens in :root, IntersectionObserver nav + counters, print stylesheet,
reduced-motion support, a11y-checked contrast.

**Why it's on a backend engineer's portfolio:** it proves design execution and content
architecture without a framework — the same separation-of-content-from-layout instinct
this portfolio itself uses. (Also: the BUILD_LOG.md habit — one line per build phase.)

**What I learnt:** Constraint as style: no build step forces discipline that frameworks
let you skip. Editorial sites are state machines too (active section, counters, print).

---

## Older work rail (one-liners, link-only)
- **RepoMaster** (2024–25) — AI scaffolding: README/Dockerfile/compose generation from a repo URL.
- **PDFSage** — PDF chatbot (RAG over documents).
- **irctc_api_express_postgres** — train-reservation REST API; atomic transactions
  against concurrent bookings (the TicketFlow idea, first attempt, in Express).

## Verification TODO for the build agent
1. `git clone` each repo; extract 3–5 strongest real commit messages per project for
   the "git log says" strips (verbatim, short).
2. Confirm SkillForge repo URL/visibility before linking (README links to profile, not repo).
3. Export one schematic SVG per project per DESIGN-SPEC §3.5.
