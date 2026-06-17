# CONTENT.md — Copy Bible

Every word on the site comes from here. Edit here first, code second.
**Facts registry at the bottom is the boundary of what may be claimed.**

## 1. Hero

- eyebrow (mono): `backend & ai engineer` (was "genai" — owner future-proofed 2026-06-16)
- name: `ISHAN KUMAR`
- subline (mono): `bengaluru, india · utc+5:30`
- live chip (from now.log, fallback static): `▸ currently building — SkillForge`
- nav (persistent, compact): `work · lab · now · resume · contact`

## 2. Message block (the signature statement)

> I build **production** backends and **agentic** systems — FastAPI and Go services
> for multinational clients, RAG pipelines that survive **free-tier rate limits**,
> and migrations that ship with **zero downtime**. Then I run long-horizon agent
> infrastructure to study where the loops **break**.

(bold = `--volt` spans). Closing motif: `ishan@prod:~$ ▮`

## 3. The Strip — frames & captions (mono, Lando format)

| # | Frame | Caption |
|---|---|---|
| 1 | Photo: IMG_1547 (real selfie, treated/duotone) | `bengaluru, 2025` |
| 2 | Terminal screenshot: TicketFlow booking-flow logs | `the last seat problem, 2025` |
| 3 | AutoDocxPdf mermaid architecture diagram (from repo) | `four agents, one pipeline, 2025` |
| 4 | Photo: IMG_6075 (headshot, treated) | `office hours, 2026` |
| 5 | Screenshot: AI_Bubble editorial site | `a quiet warning, 2026` |
| 6 | htop/agent-box screenshot from Hostinger VPS | `hermes, still running, 2026` |
| 7 | RGIPT / campus photo (owner to supply, optional) | `where it started, 2021` |
| 8 | SkillForge AST-retrieval sketch (Excalidraw) | `procedural memory, 2026` |

## 4. Two worlds

- **ON PROD** — `Production systems, migrations, and the constraints they survived.` → /work
- **OFF PROD** — `Agent boxes, evals, experiments — and what breaks at 3am.` → /lab

## 5. Hall of Fame cards (name / year / stat / one-liner)

1. **SkillForge** · 2026 · `~3000 → ~80 tokens (~50×)` ·
   Procedural memory for AI coding agents — distills LLM bug-fixes into reusable
   Claude Skill files via AST-based retrieval and human-gated approval. *(WIP)*
2. **AutoDocxPdf** · 2025 · `12 req/min under a 15 RPM ceiling` ·
   4-agent pipeline that turns any repo into DOCX/PDF documentation — content,
   screenshots, Mermaid diagrams, assembly. Dockerized; in daily internal use.
3. **TicketFlow** · 2025 · `0 double-bookings by design` ·
   Concurrent ticket-booking API in Go — Redis lock + SELECT FOR UPDATE + optimistic
   version check, immutable audit trail, JWT RBAC.
4. **Market Research AI** · 2025 · `~95% of the research loop automated` ·
   Multi-agent LangChain pipeline scanning 1000+ data points into company reports
   and proposals. BYOK model.
5. **AI_Bubble** · 2026 · `0 dependencies, 1 page, 7 sections` ·
   A designed editorial knowledge base on AI valuations vs. historical bubbles —
   vanilla ES modules, print stylesheet, a11y-audited.
6. Older work — promoted 2026-06-17 from a link rail to real lightweight `/work/[slug]`
   pages (summary + stack + repo link). Copy grounded in PROJECT-DEEP-DIVES.md "Older work
   rail" + research/pdfsage_readme. **Years approximate (2024) — owner to verify.**
   - **PDFSage** · ~2024 · `FAISS · Gemini Q&A` · RAG over PDFs — chunk+embed with Google
     Generative AI, FAISS vector search, conversational Q&A. Streamlit backend, Next.js frontend.
   - **RepoMaster** · ~2024 · `repo → scaffolding` · AI scaffolding: generates README /
     Dockerfile / docker-compose from a repo URL (the idea AutoDocxPdf later matured).
   - **irctc-api** · ~2024 · `atomic bookings` · Train-reservation REST API in Express +
     PostgreSQL; atomic transactions under concurrent bookings (TicketFlow's first attempt).

## 6. Experience (compact timeline, /work top or footer of home)

```
sept 2025 – present    SWE-1 · Rayvector Technologies · Bengaluru
may 2025  – aug 2025   SWE Intern · Rayvector Technologies
nov 2024  – jan 2025   Software Developer (Intern) · Sambin Technologies
dec 2021  – june 2025  B.Tech CSE · RGIPT
```
Role bullets (use on /work, max 4 — resume v5 phrasing):
- Production FastAPI backend for a Plot Management System (multinational client):
  JWT auth, cursor-based pagination, Redis caching.
- Full Firebase→PostgreSQL migration with zero downtime: APIs, schema, cloud infra redesigned.
- Dockerized services on Azure VM behind Nginx; DNS + pipelines for two live environments.
- Voting Platform REST API on AWS EC2 with PostgreSQL, full CRUD in production.

## 7. /lab content blocks (from now.log themes — keep present-tense, hedged honestly)

> **/work is now the personal "What Pulls Me" page (2026-06-17):** an ER diagram (root
> `ishan` → curiosity · obsessions · convictions) + a terminal that types a command per
> section and lays out its items. It is NOT a project index or a résumé — work experience
> lives in the homepage `uptime --career`. Projects appear only as `↳ evidence` links woven
> into the relevant curiosity/obsession/conviction (every project page stays reachable).
> Source: `src/content/mind.ts` (first-person rephrasing of the blocks below + the lessons).

- **Agent boxes** — Hermes & OpenClaw, self-hosted on a Hostinger VPS, kept alive to
  watch where production-grade agent loops degrade: tool-loop convergence, memory
  bleed across runs, behavior under sustained load. Notes feed back into SkillForge.
- **Harness engineering** — wiring guardrails and evals *into* the LLM workflow, not
  bolting them on after. Open question: pre-tool, post-tool, or a separate critic agent?
- **Memory** — mem0 (episodic, vector-backed) vs SkillForge (procedural, AST-indexed):
  two halves of the same problem.
- **Retrieval** — PageIndex and tree-structured retrieval; past vector-only RAG.
- **Writing** — links: Hashnode (primary), LinkedIn, X.

## 8. Certifications & stack (footer-adjacent, mono table)

```
apr 2026   Google       Orchestrate Complex Multi-Agent Workflows   #23424455
apr 2026   Databricks   AI Agent Fundamentals                       #178739338
```
### Skills — grouped stack (owner-supplied 2026-06-17; source for `src/content/skills.ts`)

Rendered on the homepage as the terminal "skill --all" card (`components/stack`, which
replaced the marquee). Site accent only — never phosphor (quarantine holds). Sharpened
and enriched 2026-06-17 from the README knowledge base + project deep-dives; **niche /
depth items are painted in the accent**. All grounded — no invented capability.

- **Languages:** Python · TypeScript · JavaScript · SQL · *Go*
- **Frontend:** React · Next.js · Tailwind CSS · HTML/CSS · *accessibility (a11y ·
  reduced-motion · semantic)*
- **Backend & APIs:** FastAPI · Node.js · Express.js · GraphQL ·
  *REST design (versioning · pagination · idempotency)* · *Clean Architecture* ·
  JWT/RBAC · *distributed locking (Redis lock · SELECT FOR UPDATE · optimistic version)* ·
  *rate limiting (sliding-window · Redis + Lua)* · multi-tenancy
- **Cloud & DevOps:** AWS (EC2 · Lambda · S3 · IAM · API Gateway · CloudWatch) ·
  Azure (VM · Blob Storage · Flexible Server) · Docker · *multi-stage builds* · Nginx ·
  CI/CD · Linux
- **Databases & Caching:** PostgreSQL · MongoDB · Firebase Firestore ·
  Redis (caching · pub/sub · rate limiting) · *vector search (FAISS)* ·
  *indexing & query tuning* · *JSONB*
- **AI / ML:** *RAG pipelines* · LangChain · *multi-agent orchestration* ·
  *AST-based retrieval* · *procedural & episodic memory (SkillForge · mem0)* ·
  *MCP* · *Claude Skills* · *tree retrieval (PageIndex · agentic RAG)* ·
  *evals & guardrails* · Gemini API · OpenAI API
- **Security & Quality:** secure coding · *authN/authZ* · secrets management ·
  unit & integration testing · Jest · Pytest · Git
- **Tooling:** Git · Postman · *Repomix* · Puppeteer · Selenium · *mermaid-cli* ·
  *Claude Code* · Cursor

(Italic = `niche: true` in the data — rendered in `--volt-bright`.)

## 9. Footer

- Closing line (display type): **“The best resume is a git log.”**
- Links (mono): `email · linkedin · github · x · hashnode · resume.pdf`
- email: bhardwajishansingh@gmail.com · LinkedIn: /in/ishan-kumar- ·
  GitHub: Allmight-456 · X: @kuma10296
- last line: `© 2026 ishan kumar · next.js · view source`

## 10. FACTS REGISTRY — the hard boundary

May claim: ~1 year production experience (Rayvector, May 2025–present incl. internship);
multinational client; a prior Software Developer internship at Sambin Technologies
(Nov 2024–Jan 2025) — timeline mention only, no project claims or metrics;
zero-downtime Firebase→PostgreSQL migration; Azure VM + Nginx +
Docker deploys; AWS EC2 voting API; AutoDocxPdf v1.2.6, 4 agents, Gemini 2.5 Flash-Lite,
12 req/min throttle, in internal daily use; TicketFlow concurrency design (lock +
FOR UPDATE + optimistic version); SkillForge WIP ~50× token reduction target on
repeat-class errors; Market Research ~95% loop automation, 1000+ data points; the two
Apr 2026 certs above. Older personal repos (real, public on GitHub) — PDFSage (RAG over
PDFs, FAISS + Gemini), RepoMaster (repo→scaffolding generator), irctc-api (Express/Postgres
atomic-booking API) — may be described qualitatively; **their years are approximate (~2024),
flag as unverified, never attach metrics.**

May NOT claim: shipped customer *products* (AutoDocxPdf/SkillForge are internal/personal
infra); any Sambin Technologies *project work, deliverables, or metrics* (the internship
is a timeline line only — owner decision 2026-06-16); team leadership; uptime/scale
numbers not listed here; "expert" in anything. When unsure: omit.
