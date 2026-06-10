# Portfolio Rebuild — Handoff Package

Prepared 2026-06-10 for Ishan Kumar. This folder is a complete, self-contained brief
for building ishan-kumar's new portfolio site with Claude Code (or any terminal agent).

## What's in here

```
00-START-HERE.md            ← you are here
CLAUDE.md                   ← copy to the repo root of the new project
docs/
  PRD.md                    ← product requirements: goals, audience, pages, success criteria
  DESIGN-SPEC.md            ← Lando-anatomy → Ishan mapping, tokens, motion, section-by-section
  CONTENT.md                ← the full copy bible (every word on the site, ready to paste)
  PROJECT-DEEP-DIVES.md     ← per-project narratives + "what I learnt", grounded in git history
  TECH-ARCHITECTURE.md      ← Next.js structure, live now.log feed, libraries, deploy
  DECISIONS.md              ← open branch points (2–3 options each) with recommendations
assets/
  ASSETS.md                 ← photo/asset inventory and what still needs shooting/exporting
research/                   ← raw pulled material (changelogs, READMEs) for reference
```

## How to bootstrap (recommended flow)

```bash
mkdir ishan-portfolio && cd ishan-portfolio
# drop this handoff folder in as ./handoff (or git clone it — see transfer options below)
cp handoff/CLAUDE.md .
claude
```

First prompt to Claude Code (paste as-is):

> Read handoff/docs/PRD.md, DESIGN-SPEC.md, TECH-ARCHITECTURE.md, and DECISIONS.md
> in full before writing any code. Then enter plan mode and propose the milestone
> plan for Milestone 1 (scaffold + design tokens + hero). Resolve DECISIONS.md
> items D1–D3 with me before scaffolding; take the documented recommendation for
> the rest unless I object.

## Transferring context from claude.ai → local Claude Code

Best to worst:

1. **Git repo (best).** Push this folder to a private GitHub repo
   (`gh repo create portfolio-handoff --private`), clone locally. You get history,
   and Claude Code can diff doc revisions as the brief evolves.
2. **Download the zip from this chat** and unzip into the project folder. Fastest.
3. **Claude Projects.** These docs already live in your claude.ai project; future
   chat sessions here can refine them, then re-export.
   Don't paste docs into the terminal as prompts — they belong on disk where the
   agent can re-read them selectively instead of holding everything in context.

## Branching strategy for "2–3 possibilities per feature"

For every DECISIONS.md item you want to *see* rather than decide on paper:

```bash
# one worktree per option — parallel Claude Code sessions, zero stash juggling
git worktree add ../portfolio-hero-A  feature/hero-terminal-boot
git worktree add ../portfolio-hero-B  feature/hero-cinematic-name
# run `claude` in each, build the variant, then compare on localhost:3000 / :3001
```

Rules of engagement:
- One worktree = one variant = one dev server port (`-p 3001`).
- Variants share `main`'s design tokens; only the contested component diverges.
- After choosing: `git merge` the winner, `git worktree remove` the rest.
- Keep a `notes/DECISION-LOG.md` in the repo — one line per resolved decision and why.
  (Claude Code reads it on later sessions; it prevents re-litigating settled choices.)

For small variants (a hover style, a caption format), skip worktrees — ask Claude Code
to build both behind a `?variant=b` query param and compare in one branch.

## Milestones (suggested order)

1. **Scaffold** — Next.js App Router + tokens + fonts + Lenis smooth scroll. Hero only.
2. **Spine** — full home-page scroll narrative, static content from CONTENT.md.
3. **Hall of Fame + deep-dive pages** — project grid and /work/[slug] pages.
4. **Live layer** — now.log fed from GitHub README (ISR), polish, OG images.
5. **Ship** — Lighthouse pass, reduced-motion audit, deploy, DNS.

Each milestone ends in a deployable state. Don't let the agent start milestone N+1
with milestone N unverified in the browser.
