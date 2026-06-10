# PRD — Ishan Kumar Portfolio v2

## 1. Why this exists

The current site (ishan-kumar.netlify.app) positions Ishan as a generic "Web Developer"
with stale projects (Anime Haven, landing pages) and an outdated LinkedIn URL. Meanwhile
his actual identity — production backend engineer who ships RAG/agentic systems and runs
his own agent-research infrastructure — lives only in a GitHub README. Recruiters and
senior engineers who click through from outreach currently see the weakest version of him.

**The site's single job:** in under 60 seconds, convince a senior engineer, founder, or
recruiter that Ishan operates above his ~1 year of experience — that he thinks in
production constraints (rate limits, zero-downtime, concurrency) and does scientist-grade
work on agent infrastructure.

## 2. Audience (in priority order)

1. **Senior/Principal engineers & EMs** doing referral diligence after a LinkedIn DM.
   They skim, they click GitHub, they judge engineering taste. Depth > polish for them.
2. **Founders of AI startups** — want proof of agentic-systems fluency and shipping speed.
3. **Recruiters/TA** — need role keywords, experience timeline, certs, contact in one scroll.
4. Secondary: blog readers arriving from Hashnode/LinkedIn posts.

## 3. Positioning statement (drives all copy)

> Backend & GenAI Engineer. I build production FastAPI/Go services, ship RAG pipelines
> that survive free-tier rate limits, and run long-horizon agent infrastructure to study
> where agent loops degrade. Bengaluru. Currently building SkillForge.

## 4. Scope

### Pages
| Route | Purpose |
|---|---|
| `/` | The cinematic scroll narrative (90% of the value) |
| `/work/[slug]` | Deep dives: autodocxpdf, skillforge, ticketflow, market-research, ai-bubble |
| `/lab` | "Off Prod": agent boxes (Hermes/OpenClaw), evals/guardrails notes, reading, blog links |
| `/now` | Full now.log archive (live-fed), machine-readable `/now.json` as easter egg |

### In scope (v1)
- Home scroll narrative per DESIGN-SPEC (hero → message → strip → two worlds →
  hall of fame → stack → now.log → contact)
- Live now.log: parsed from GitHub profile README at build + ISR hourly
- Project deep-dive pages from PROJECT-DEEP-DIVES.md content
- OG images per page, sitemap, robots, structured data (Person + SoftwareSourceCode)
- Contact: mailto + LinkedIn + GitHub + X + Hashnode (no contact form in v1)

### Out of scope (v1) — record in DECISIONS.md if revisited
- CMS, comments, analytics beyond Vercel/Plausible, testimonials, dark/light toggle
  (site is dark-only by design), i18n, resume builder. Resume PDF = static file link.

## 5. Success criteria

- A senior engineer can articulate "what Ishan does" after the first viewport + one scroll.
- Every project card answers: what, the hard problem, the production constraint, the learning.
- now.log on the site matches GitHub within 1 hour, with zero manual steps.
- Lighthouse: Perf ≥ 90 (mobile), A11y ≥ 95, SEO ≥ 95. Full keyboard navigation.
- Works fully (content + nav) with JS disabled and with reduced-motion enabled.
- Recruiter path: role keywords, timeline, certs, email reachable within 2 scroll gestures
  via persistent compact nav.

## 6. Non-goals / anti-requirements

- Not a "creative developer" WebGL showcase — no Three.js shader hero. The craft signal
  comes from typography, motion discipline, and content density, like the Lando site's
  editing rather than its budget.
- Not a duplicate of the GitHub README — the site is the cinematic layer; the README
  stays the terminal layer; now.log is the shared spine between them.
- No claims beyond verified facts (see CONTENT.md "facts registry").
