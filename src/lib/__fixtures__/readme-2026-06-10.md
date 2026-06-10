<div align="center">

<!-- Optional: replace with a custom banner from Canva or keep the programming gif -->
<img src="https://user-images.githubusercontent.com/90236635/232446433-d5540fa2-fe28-4bb8-b929-cdb51fe61336.gif" width="100%" alt="banner" />

</div>

```bash
$ whoami
```

**Ishan Kumar** — Backend & GenAI Engineer, Bengaluru.
I build production FastAPI services, ship RAG pipelines that actually run on free-tier rate limits, and migrate critical infra without downtime. Currently going deeper on **agentic systems** — multi-agent orchestration, AST-based retrieval, and procedural memory for LLM agents.

<sub>10 months shipping for multinational clients · Python, Go, PostgreSQL, AWS, Azure · `kubectl exec -it ishan -- /bin/zsh`</sub>

<br/>

```bash
$ uptime --career
```

```
 Sept 2025 - present     SWE-1 @ Rayvector Technologies
 May 2025  - Aug 2025    SWE Intern @ Rayvector Technologies
 Dec 2021  - June 2025   B.Tech CSE, RGIPT
```

<br/>

```bash
$ tail -f ./now.log
```

> Live notes on what I'm building, breaking, and reading. Cross-posted weekly to [LinkedIn](https://linkedin.com/in/ishan-kumar-) and [X](https://x.com/kuma10296).

<details>
<summary><b>🛠️  Building — SkillForge: agents that auto-detect their own skills</b></summary>

AST-based retrieval over a Claude Skill library, human-gated approval loop. Cuts repeat-class error context from **~3000 → ~80 tokens (~50×)**. Repo: [github.com/Allmight-456/SkillForge](https://github.com/Allmight-456).
</details>

<details>
<summary><b>🔁  Running — Hermes & OpenClaw on Hostinger cloud</b></summary>

Self-hosted long-running agent boxes, kept alive specifically to watch where production-grade agent loops degrade. Tool-loop convergence, memory bleed across runs, where they crack under sustained load. Operational notes feed back into SkillForge.
</details>

<details>
<summary><b>🧪  Harness engineering — guardrails, evals, agent loops</b></summary>

Wiring them *into* the LLM workflow itself, not bolted on after. The open question: where do evals belong — pre-tool, post-tool, or as a separate critic agent?
</details>

<details>
<summary><b>🧠  Agent memory — mem0 vs SkillForge</b></summary>

[mem0](https://github.com/mem0ai/mem0) for long-horizon memory. Mapping the gap between mem0 (episodic, vector-backed) and SkillForge (procedural, AST-indexed) — different halves of the same problem.
</details>

<details>
<summary><b>🔍  Retrieval — PageIndex & Agentic RAG</b></summary>

[PageIndex](https://github.com/VectifyAI/PageIndex) and tree-structured retrieval — moving past vector-only. Reads more like how you'd actually search a codebase or a textbook.
</details>

<details>
<summary><b>🧰  Tooling — Conductor.build & Superset side-by-side</b></summary>

Running them against real PRs to see which agentic loop converges. Cursor stays the daily driver; these are the challengers.
</details>

<details>
<summary><b>📡  Studying — Karpathy's nanochat & Autoresearch</b></summary>

Single-GPU nanochat lineage. Reference for what "tiny but real" looks like at the model layer.
</details>

<br/>

```bash
$ ls ./projects --sort=impact --year=2024+
```

<table>
<tr><td width="50%" valign="top">

### 🤖 [AutoDocxPdf](https://github.com/Allmight-456/AutoDocxPdf)
**4-agent pipeline → DOCX/PDF docs from any repo.**
`GeminiDocAgent` (content) · `ScreenshotAgent` (Selenium) · `MermaidAgent` (Puppeteer + mmdc) · `DocumentAssembler` (DOCX + PDF via LibreOffice). Rate-limited for Gemini 2.5 Flash-Lite free tier — 12 req/min under the 15 RPM ceiling. Fully containerized.

`Python` `Gemini API` `Selenium` `Puppeteer` `Docker`

</td><td width="50%" valign="top">

### 🎟️ [TicketFlow](https://github.com/Allmight-456/Go_Ticket_booking_app)
**Concurrent ticket-booking API in Go — zero double-bookings.**
JWT-RBAC, optimistic locking on inventory, immutable audit trail, Redis rate limiting. Designed for the failure mode that breaks most bookings systems: simultaneous purchase attempts on the last seat.

`Go` `PostgreSQL` `Redis` `JWT` `Docker`

</td></tr>
<tr><td width="50%" valign="top">

### 🧠 [SkillForge](https://github.com/Allmight-456) *(WIP)*
**Procedural memory for AI coding agents.**
Distills LLM-generated bug fixes into reusable Claude Skill files via AST-based retrieval + human-gated approval. ~50× token reduction on repeat-class errors (~3000 → ~80 tokens).

`Python` `AST` `Claude Skills` `MCP` `Multi-agent`

</td><td width="50%" valign="top">

### 📊 [Market Research Catalyst](https://github.com/Allmight-456/market-research-catalyst)
**Multi-agent market research, BYOK model.**
Scans 1000+ data points across the GenAI/LLM market, generates company reports and investment proposals. ~95% of the manual research loop automated.

`Python` `LangChain` `Gemini API` `TypeScript`

</td></tr>
</table>

<sub>📂 Older work — [RepoMaster](https://github.com/Allmight-456/RepoMaster) · [PDFSage](https://github.com/Allmight-456/PDFSage) · [irctc_api_express_postgres](https://github.com/Allmight-456/irctc_api_express_postgres)</sub>

<br/>

```bash
$ stack --grouped
```

```yaml
languages:    [ Python, Go, TypeScript, JavaScript, SQL ]
backend:      [ FastAPI, Node.js, Express.js, REST, GraphQL, JWT, Redis ]
ai_genai:     [ RAG pipelines, LangChain, Multi-agent systems, Gemini, OpenAI, MCP ]
databases:    [ PostgreSQL, Firebase Firestore, MongoDB, Redis ]
cloud_devops: [ AWS (EC2, Lambda), Azure (VM, Blob, Flexible Server), Docker, Nginx, CI/CD ]
tools:        [ Git, Postman, Puppeteer, Selenium, Claude Code, Cursor ]
```

<br/>

```bash
$ cat certifications.log | column -t
```

```
ISSUED      ISSUER       CERTIFICATION                                  CRED.ID
─────────────────────────────────────────────────────────────────────────────────────
Apr 2026    Google       Orchestrate Complex Multi-Agent Workflows      #23424455
Apr 2026    Google       Introduction to Generative AI                  #23418290
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

  <img src="https://github-readme-streak-stats.herokuapp.com/?user=allmight-456&theme=transparent&hide_border=true&background=00000000&stroke=4F46E5&ring=4F46E5&fire=4F46E5&currStreakLabel=4F46E5&sideLabels=808080&dates=808080&currStreakNum=4F46E5&sideNums=4F46E5" width="58%" alt="GitHub streak" />

  <br/><br/>

  <img src="https://komarev.com/ghpvc/?username=allmight-456&label=Profile%20views&color=4F46E5&style=for-the-badge" alt="Profile views" />
  <img src="https://img.shields.io/github/followers/Allmight-456?label=Followers&style=for-the-badge&color=4F46E5&labelColor=1F1F23" alt="Followers" />

</div>

<br/>

<p align="center"><sub><i>"The best resume is a git log."</i></sub></p>
