# Suggested GitHub profile README (github.com/Allmight-456/Allmight-456)

Prepared 2026-08-14. **The site parses this file** (`src/lib/nowlog.ts`, ISR every
3600s), so it is a contract, not just a page. Two rules hold:

1. The now.log section must stay `` ```bash `` → `$ tail -f ./now.log` → `` ``` ``,
   then `<details><summary><b>EMOJI  Tag — Title</b></summary> body </details>`
   blocks, ending at the next `` ```bash `` fence.
2. The summary separator is now tolerant (`—`, `–`, `->`, `→` all parse) — but keep
   one style. The em-dash `—` is what the fixture test pins.

---

## Fixes found (ranked)

| # | Issue | Why it matters |
|---|---|---|
| 1 | **`->` in every `<summary>` broke the site's parser** | Every now.log entry parsed with an empty title, the whole line collapsed into the tag, and the homepage hero chip silently fell back to its hardcoded "SkillForge". **Fixed on the site side** (parser now accepts `->`), so this is no longer urgent — but it is why the live now.log looked wrong. |
| 2 | `$ uptime --career` still ends at Rayvector | The career block is the most-read part of the file and is now ~1 month stale. |
| 3 | Amadeus is missing entirely | Newest project (jul 2026), not in now.log or the project table. |
| 4 | Stack omits Kubernetes / Grafana / Redash / PostHog | The whole observability surface picked up at Emergent is invisible. |
| 5 | **Streak-stats image is dead** | `github-readme-streak-stats.herokuapp.com` — Heroku retired free dynos in Nov 2022, so that image has been broken for a long time. Use `streak-stats.demolab.com`. |
| 6 | Banner GIF is hotlinked from **someone else's** upload | `user-images.githubusercontent.com/90236635/…` belongs to another account's attachment. It resolves today; it can vanish without warning. Commit your own banner to the profile repo and reference it by relative path. |
| 7 | SkillForge links point at the profile, not the repo | `github.com/Allmight-456/SkillForge` is public (since may 2026). Two links in the file still route to the profile root. |
| 8 | **Certification metadata disagrees with the site** | README says *Gen AI Agents* was issued **Jun 2026**; the site says **apr 2026**. README gives Databricks cred `#178739338`; the site verifies against `credentials.databricks.com/31088abc-…`. One of each pair is wrong — reconcile before either is quoted anywhere else. Left untouched below and marked with a TODO. |
| 9 | "1 year shipping for multinational clients" | Now ~15 months across two employers. |

Hackathon framing is added below for Rasputin_Loop and Amadeus as **submissions
only** — no placing is stated for either (Slack did not go your way; Build Week
results were not out on 2026-08-14).

---

## Paste-ready file

```markdown
<div align="center">

<!-- TODO: self-host this. It currently hotlinks another account's attachment. -->
<img src="https://user-images.githubusercontent.com/90236635/232446433-d5540fa2-fe28-4bb8-b929-cdb51fe61336.gif" width="100%" alt="banner" />

</div>

```bash
$ whoami
```

**Ishan Kumar** — Software Engineer, AI & Backend Systems · Bengaluru. <br/>
 I've shipped production FastAPI backends for multinational clients, moved critical data between stacks without breaking the app (ETL), run Database Migrations and built RAG pipelines that run on rate limits, per-step tracing instead of a fat API budget. Now forward-deployed at **Emergent** — building full-stack applications on the Emergent AI harness with customers, and fixing what breaks after. The frontier I'm on: **agentic systems** → CoALA, Strands Framework, hybrid retrieval, episodic + procedural memory, and guardrails wired straight into the loop.

<h4>Shipping for multinational clients since 2025 · Python, Go, PostgreSQL, Kubernetes, AWS, Azure · </h4> <br/>
 <sub>`kubectl exec -it ishan -- /bin/zsh` </sub>

```bash
$ uptime --career
```

```
 Aug 2026  - present     L3 Engineer @ Emergent
 Sept 2025 - Jul 2026    SWE-1 @ Rayvector Technologies
 May 2025  - Aug 2025    SWE Intern @ Rayvector Technologies
 Dec 2021  - June 2025   B.Tech CSE, RGIPT
```

<br/>

```bash
$ tail -f ./now.log
```

> Live notes on what I'm building, breaking, and reading. Cross-posted weekly to [LinkedIn](https://linkedin.com/in/ishan-kumar-) and [X](https://x.com/kuma10296).

<details>
<summary><b>🛰️  Forward-deployed — the Emergent harness, end to end</b></summary>

I build the customer's application on Emergent's AI harness and then stay on it: the bug that shows up in week three is mine too, on our own app as much as theirs. What's changed my thinking: a harness is not a framework you pick, it's a set of constraints you inherit — and the interesting engineering is what you do inside them, in front of someone who is watching.
</details>

<details>
<summary><b>🎼  Building — Amadeus: skills that have to earn activation</b></summary>

A control plane for agent skills. It captures a Codex run I explicitly consented to, compiles it into a reviewed candidate, and then refuses to activate it — nothing goes live without a named human and a written reason. Retrieval abstains unless the top match clears both a score threshold and a margin over the runner-up. The hard part was never generation; it was the boundary. Repo: [github.com/Allmight-456/Amadeus_Skill](https://github.com/Allmight-456/Amadeus_Skill).
</details>

<details>
<summary><b>🤖  Shipped — Rasputin_Loop: one Slack agent loop, no router</b></summary>

A single Strands agent that thinks, calls a tool, and replies in-thread. No intent parser, no command router, no extraction pipeline — the routing logic I didn't write is the routing logic that can't be wrong. Provenance-stamped episodic memory in SQLite, hybrid recall over libSQL/Turso fusing FTS5 with local embeddings via Reciprocal Rank Fusion, and a `loop-eval` golden set gating regressions in CI. Repo: [github.com/Allmight-456/Rasputin_Loop](https://github.com/Allmight-456/Rasputin_Loop).
</details>

<details>
<summary><b>📊  Learning — to read production before changing it</b></summary>

Kubernetes for what's actually running, Grafana for whether it's healthy, Redash for what the data says, PostHog for what people did with it. The lesson I keep re-learning: most "bugs" reported by a customer are answered by a dashboard before they're answered by a debugger.
</details>

<details>
<summary><b>🔁  Running — Hermes & OpenClaw on a Hostinger box</b></summary>

Two long-running agents kept alive specifically to watch how they rot: tool-loop convergence, memory bleed across runs, behaviour under sustained load. Short demos never show you this; a process that has been up for weeks does.
</details>

<details>
<summary><b>🧪  Open question — where do evals belong in the loop?</b></summary>

Pre-tool, post-tool, or as a separate critic agent? Pre-tool catches the dumb calls but can't see outcomes. Post-tool sees outcomes but has already paid for them. A critic agent sees both and doubles your cost and your failure modes. I have shipped the post-tool version twice and I'm still not convinced.
</details>

<details>
<summary><b>🧠  Reading — memory, and what retrieval is actually for</b></summary>

[mem0](https://github.com/mem0ai/mem0) for episodic memory, [PageIndex](https://github.com/VectifyAI/PageIndex) for tree-structured retrieval past vector-only. The thread connecting them: precision beats recall once a human is gating the library, and a memory without provenance is just a rumour your agent repeats confidently.
</details>

<br/>

```bash
$ ls ./projects --sort=impact --year=2024+
```

<table>
<tr><td width="50%" valign="top">

### 🎼 [Amadeus](https://github.com/Allmight-456/Amadeus_Skill) *(WIP)*
**A control plane for agent skills — nothing activates itself.**
Captures a consented Codex run, distills it into a reviewed skill or deterministic script, and refuses to activate it without a named human promotion. Retrieval abstains below threshold. CLI + project-scoped MCP server + local dashboard; secrets redacted before persistence. Built for **OpenAI Build Week** (submitted jul 2026).

`TypeScript` `Node` `Codex CLI` `MCP` `SQLite/FTS5`

</td><td width="50%" valign="top">

### 🤖 [Rasputin_Loop](https://github.com/Allmight-456/Rasputin_Loop)
**Slack-native agent — one Strands loop, no router.**
Provenance-stamped episodic memory (SQLite), hybrid RAG over libSQL/Turso (FTS5 + local `fastembed` via Reciprocal Rank Fusion), runtime MCP tools, Jira auto-triage, guardrails (tool-call caps, token budget, risky-method blocklist), and a `loop-eval` golden-set CI gate. Multi-app: several bots, one process. Built for the **Slack Agent Builder Challenge** (submitted jul 2026).

`Python` `Strands` `libSQL/Turso` `MCP` `Slack`

</td></tr>
<tr><td width="50%" valign="top">

### 🧠 [SkillForge](https://github.com/Allmight-456/SkillForge) *(WIP)*
**Procedural memory for AI coding agents.**
Distills LLM-generated bug fixes into reusable Claude Skill files via AST-based retrieval + human-gated approval. ~50× token reduction on repeat-class errors (~3000 → ~80 tokens).

`Python` `AST` `Claude Skills` `MCP` `Multi-agent`

</td><td width="50%" valign="top">

### 🤖 [AutoDocxPdf](https://github.com/Allmight-456/AutoDocxPdf)
**4-agent pipeline → DOCX/PDF docs from any repo.**
`GeminiDocAgent` (content) · `ScreenshotAgent` (Selenium) · `MermaidAgent` (Puppeteer + mmdc) · `DocumentAssembler` (DOCX + PDF via LibreOffice). Rate-limited for Gemini 2.5 Flash-Lite free tier — 12 req/min under the 15 RPM ceiling. Fully containerized; in active internal use.

`Python` `Gemini API` `Selenium` `Puppeteer` `Docker`

</td></tr>
<tr><td width="50%" valign="top">

### 🎟️ [TicketFlow](https://github.com/Allmight-456/Go_Ticket_booking_app)
**Concurrent ticket-booking API in Go — zero double-bookings.**
JWT-RBAC, optimistic locking on inventory, immutable audit trail, Redis rate limiting. Designed for the failure mode that breaks most bookings systems: simultaneous purchase attempts on the last seat.

`Go` `PostgreSQL` `Redis` `JWT` `Docker`

</td><td width="50%" valign="top">

### 📊 [Market Research Catalyst](https://github.com/Allmight-456/market-research-catalyst)
**Multi-agent market research, BYOK model.**
Scans 1000+ data points across the GenAI/LLM market, generates company reports and investment proposals. ~95% of the manual research loop automated.

`Python` `LangChain` `Gemini API` `TypeScript`

</td></tr>
</table>

<sub>📂 Older work — [AI_Bubble](https://github.com/Allmight-456/AI_Bubble) · [RepoMaster](https://github.com/Allmight-456/RepoMaster) · [PDFSage](https://github.com/Allmight-456/PDFSage) · [irctc_api_express_postgres](https://github.com/Allmight-456/irctc_api_express_postgres)</sub>

<br/>

```bash
$ stack --grouped
```

```yaml
languages:    [ Python, Go, TypeScript, JavaScript, SQL ]
backend:      [ FastAPI, Node.js, Express.js, REST, GraphQL, JWT, Redis ]
ai_genai:     [ RAG pipelines, hybrid retrieval, LangChain, Strands, Multi-agent, MCP, Gemini, OpenAI ]
databases:    [ PostgreSQL, Firebase Firestore, MongoDB, Redis, libSQL/Turso ]
cloud_devops: [ Kubernetes, AWS (EC2, Lambda), Azure (VM, Blob, Flexible Server), Docker, Nginx, CI/CD ]
observability:[ Grafana, Redash, PostHog, per-step tracing, telemetry ]
tools:        [ Git, Postman, Puppeteer, Selenium, Claude Code, Codex, Cursor ]
```

<br/>

```bash
$ cat certifications.log | column -t
```

<!-- TODO: the site lists Gen AI Agents as apr 2026, and verifies Databricks against
     credentials.databricks.com/31088abc-7b21-4ebf-97b8-fb31715304d0 rather than
     #178739338. Reconcile these two files — one of each pair is wrong. -->
```
ISSUED      ISSUER       CERTIFICATION                                  CRED.ID
─────────────────────────────────────────────────────────────────────────────────────
Jun 2026    Google       Gen AI Agents: Transform Your Organization     #24918574
Apr 2026    Google       Orchestrate Complex Multi-Agent Workflows      #23424455
Apr 2026    Databricks   AI Agent Fundamentals                          #178739338
```
<p align="left">
  <a href="https://www.linkedin.com/in/ishan-kumar-/details/certifications/">
    <img src="https://img.shields.io/badge/-Verify%20on%20LinkedIn-1F1F23?style=for-the-badge&logo=linkedin&logoColor=4F46E5" alt="Verify on LinkedIn" />
  </a>
</p>

<br/>

<p align="left">
  <a href="mailto:bhardwajishansingh@gmail.com">
    <img src="https://img.shields.io/badge/-bhardwajishansingh%40gmail.com-1F1F23?style=for-the-badge&logo=gmail&logoColor=4F46E5" alt="Email" />
  </a>
  <a href="https://ishan-kumar.netlify.app/">
    <img src="https://img.shields.io/badge/-Portfolio-1F1F23?style=for-the-badge&logo=netlify&logoColor=4F46E5" alt="Portfolio" />
  </a>
  <a href="https://linkedin.com/in/ishan-kumar-">
    <img src="https://img.shields.io/badge/-LinkedIn-1F1F23?style=for-the-badge&logo=linkedin&logoColor=4F46E5" alt="LinkedIn" />
  </a>
  <a href="https://x.com/kuma10296">
    <img src="https://img.shields.io/badge/-Twitter-1F1F23?style=for-the-badge&logo=x&logoColor=4F46E5" alt="Twitter" />
  </a>
  <a href="https://github.com/Allmight-456">
    <img src="https://img.shields.io/badge/-GitHub-1F1F23?style=for-the-badge&logo=github&logoColor=4F46E5" alt="GitHub" />
  </a>
</p>

<br/>

<div align="center">

  <!-- was github-readme-streak-stats.herokuapp.com — dead since Heroku retired free dynos -->
  <img src="https://streak-stats.demolab.com/?user=allmight-456&theme=transparent&hide_border=true&background=00000000&stroke=4F46E5&ring=4F46E5&fire=4F46E5&currStreakLabel=4F46E5&sideLabels=808080&dates=808080&currStreakNum=4F46E5&sideNums=4F46E5" width="58%" alt="GitHub streak" />

  <br/><br/>

  <img src="https://komarev.com/ghpvc/?username=allmight-456&label=Profile%20views&color=4F46E5&style=for-the-badge" alt="Profile views" />
  <img src="https://img.shields.io/github/followers/Allmight-456?label=Followers&style=for-the-badge&color=4F46E5&labelColor=1F1F23" alt="Followers" />

</div>

<br/>

<p align="center"><sub><i>"The best resume is a git log."</i></sub></p>
```

---

## After pasting

The site revalidates the README hourly. To see it immediately, hard-refresh the
homepage after ~1h, or check `/now.json` — the hero chip should read
`▸ currently building — Amadeus` (first `Building` entry wins) rather than the
hardcoded SkillForge fallback.

If you'd rather the chip keep saying SkillForge, move the SkillForge `<details>`
above Amadeus and Rasputin_Loop in the now.log section.
