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

Updated 2026-08-14 for the Emergent move — the previous version stopped at
"backends + agent loops" and read a year out of date:

> I ship **production** backends — Go and FastAPI under real rate limits,
> migrations with **zero downtime**. Now I'm **forward-deployed**: whole
> applications built on an AI harness, with the customer in the room. Same job
> either way — run the **loop** until it **breaks**, then own what broke.

(bold = `--volt` spans). Closing motif: `ishan@prod:~$ ▮`

Everywhere this identity is repeated, and which must move together:
`content/site.ts` (`hero`, `message`, `whoami`), `app/layout.tsx` (metadata
title + description), `components/ui/JsonLd.tsx` (`jobTitle`, `knowsAbout`),
`app/opengraph-image.tsx` (alt), `lib/nowlog.ts` (chip fallback), and the
GitHub profile README's `$ whoami` block.

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
6. **Rasputin_Loop** · 2026 · `one agent loop, no router` ·
   Slack-native agent on a single Strands loop — no intent parser, no command router.
   Provenance-stamped episodic memory, hybrid RAG, runtime MCP tools, Jira auto-triage;
   several Slack apps from one process. Provenance line: *Built for the Slack Agent
   Builder Challenge · submitted jul 2026* (see §10 — submission only, no placing).
7. **Amadeus** · 2026 · `nothing activates itself` · *(WIP)*
   An evaluation control plane for agent skills — captures a consented Codex run,
   compiles it into a reviewed candidate, and refuses to activate anything a named
   human hasn't promoted; retrieval abstains rather than guess. Provenance line:
   *Built for OpenAI Build Week · submitted jul 2026* (see §10 — submission only,
   results were not out).

   > **Amadeus and SkillForge are the same lineage** (procedural memory for coding
   > agents) and must never be presented side by side — back-to-back they read as
   > one project listed twice (owner, 2026-08-14). SkillForge owns the phrase
   > "procedural memory" and the ~50× token stat; Amadeus leads on governance —
   > consent, named review, promotion, abstention. They are kept apart in
   > `projects.ts` order and never share the Journey headline set.
8. Older work — promoted 2026-06-17 from a link rail to real lightweight `/work/[slug]`
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
aug 2026  – present    L3 Engineer · Emergent · Bengaluru
sept 2025 – jul 2026   SWE-1 · Rayvector Technologies · Bengaluru
may 2025  – aug 2025   SWE Intern · Rayvector Technologies
nov 2024  – jan 2025   Software Developer (Intern) · Sambin Technologies
dec 2021  – june 2025  B.Tech CSE · RGIPT
```

> **Emergent (owner-supplied 2026-08-14).** Title: "L3 Engineer" — Emergent's internal
> level name. Owner chose it over the public posting title ("Forward Deployed Engineer")
> after being shown both; the FDE framing survives in the bullets, not the title line.
> The work is FDE-shaped: building on the Emergent platform / AI harness for customers.
> **This description is provisional** — owner said more detail follows as the role
> develops. Extend it from what the owner supplies; never fill the gap by inference.

Role bullets, **grouped by employer** (a flat list silently misattributes Rayvector's
backend work to Emergent). Source for `src/content/journey.ts` `roleHighlights`:

*Emergent*
- Forward-deployed on the Emergent platform: building full-stack applications with the
  Emergent AI harness — for customers, and alongside them.
- Customer support that ends in a patch — bug fixes across Emergent's own app as well
  as client applications.
- Working across Kubernetes, Grafana, Redash and PostHog: deploys, dashboards, and the
  product analytics behind what ships.

*Rayvector (resume v5 phrasing)*
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

## 8. Certifications & stack

Rendered on `/work` (below the mind terminal) as skill-card-style windows — pixel
brand logo + details (`components/certs/Certifications`). Source for
`src/content/site.ts` `certs`. Three Apr 2026 credentials (owner-supplied; blurbs/
skills paraphrased from the official course pages — sourced, never invented):

```
apr 2026   Google · Cloud Skills Boost   Gen AI Agents: Transform Your Organization   badge #24918574
apr 2026   Google · Cloud Skills Boost   Orchestrate Complex Multi-Agent Workflows     badge #23424455
apr 2026   Databricks Academy            AI Agent Fundamentals (accreditation)          31088abc…
```

- **Gen AI Agents: Transform Your Organization** (Google) — building gen AI agents
  (models · reasoning loops · tools) and leading organizational transformation with
  gen AI; capstone of the Gen AI Leader path. Logo: 4-colour Google "G".
  verify: https://www.skills.google/public_profiles/c41daeea-edd0-45a7-ba5d-c30dce00e4d6/badges/24918574
- **Orchestrate Complex Multi-Agent Workflows** (Google) — orchestrating multi-agent
  workflows: unifying data across first/third-party sources, automating actions across
  systems, balancing machine speed with human oversight. Logo: Google/Gemini spark.
  verify: https://www.skills.google/public_profiles/c41daeea-edd0-45a7-ba5d-c30dce00e4d6/badges/23424455
- **AI Agent Fundamentals** (Databricks Academy accreditation) — foundations of AI
  agents on Databricks (Mosaic AI · Agent Bricks); agentic workflows & multi-agent
  systems; build/deploy/evaluate enterprise agents (introductory). Logo: Databricks mark.
  verify: https://credentials.databricks.com/31088abc-7b21-4ebf-97b8-fb31715304d0
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

**Hackathon builds (owner-confirmed 2026-08-14).** Two 2026 projects were built for
public hackathons. What may be stated is the *submission* and its date, nothing more:

| Project | Hackathon | Window | Status |
|---|---|---|---|
| Rasputin_Loop | Slack Agent Builder Challenge | 20 may – 13 jul 2026 | Submitted. **Did not win** — never claim a placing, and do not state the loss on the site either. |
| Amadeus | OpenAI Build Week | 13 – 21 jul 2026 | Submitted. **Results were not out** as of 2026-08-14 — no placing, no "finalist", no "shortlisted". |

The site therefore renders only `Built for <hackathon> · submitted <month year>`
(`Project.context` in `src/content/schema.ts`). If a result later lands, the owner
supplies it — do not go looking for one and write it in.

Emergent, since 2026-08: an L3 Engineer role whose day-to-day is forward-deployed
(FDE-shaped) work on the Emergent platform and AI harness — customer builds, customer
support, and bug fixes on Emergent's own app as well as client apps; exposure to
Kubernetes, Grafana, Redash, PostHog and MCP. **May NOT claim**: ownership of Emergent
product surfaces, customer names, revenue/scale/uptime numbers, or team leadership.
Emergent's own company facts (funding, ARR, user counts) are the *company's*, not
Ishan's — they must never appear as his.

May claim: ~1 year production experience (Rayvector, May 2025–Jul 2026 incl. internship);
multinational client; a prior Software Developer internship at Sambin Technologies
(Nov 2024–Jan 2025) — timeline mention only, no project claims or metrics;
zero-downtime Firebase→PostgreSQL migration; Azure VM + Nginx +
Docker deploys; AWS EC2 voting API; AutoDocxPdf v1.2.6, 4 agents, Gemini 2.5 Flash-Lite,
12 req/min throttle, in internal daily use; TicketFlow concurrency design (lock +
FOR UPDATE + optimistic version); SkillForge WIP ~50× token reduction target on
repeat-class errors; Market Research ~95% loop automation, 1000+ data points; the three
Apr 2026 certs above. Older personal repos (real, public on GitHub) — PDFSage (RAG over
PDFs, FAISS + Gemini), RepoMaster (repo→scaffolding generator), irctc-api (Express/Postgres
atomic-booking API) — may be described qualitatively; **their years are approximate (~2024),
flag as unverified, never attach metrics.**

May NOT claim: shipped customer *products* (AutoDocxPdf/SkillForge are internal/personal
infra); any Sambin Technologies *project work, deliverables, or metrics* (the internship
is a timeline line only — owner decision 2026-06-16); team leadership; uptime/scale
numbers not listed here; "expert" in anything. When unsure: omit.
