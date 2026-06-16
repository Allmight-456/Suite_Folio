# ishan-portfolio

A cinematic, scroll-driven portfolio that treats an engineer's identity like a
terminal session — *"the best resume is a git log."* It borrows the **anatomy** of
landonorris.com (a single-identity, motion-led narrative) rather than its skin, and
spends its one big idea on a live terminal that reads real data from GitHub.

Built against the brief in [`handoff/`](./handoff) — `docs/PRD.md`,
`DESIGN-SPEC.md`, and `CONTENT.md` define structure, motion, and the **facts
registry** (the boundary of what the copy may claim). Resolved decisions are logged,
append-only, in [`notes/DECISION-LOG.md`](./notes/DECISION-LOG.md).

**Live:** [ishan-kumar.netlify.app](https://ishan-kumar.netlify.app/)

[![live portfolio](docs/preview.png)](https://ishan-kumar.netlify.app/)

## Stack

- **Next.js 16** (App Router) · **React 19.2** · **TypeScript**
- **Tailwind v4** — design tokens live only in `globals.css` / `@theme` (never inline hex)
- **Motion 12** (`motion/react`) + **Lenis** for choreography; **Paper Shaders** for the desktop hero glow
- Native **View Transitions** for route changes
- `zod`-typed content modules in `src/content/` — no CMS
- A live `now.log` parsed from the GitHub profile README via **ISR** (hourly)

## The systems (how it actually works)

Each interactive moment is a small, self-contained system with an explicit
no-JS / reduced-motion fallback. Motion *enhances*; it never gates content.

- **`now.log` — the live-data layer.** `lib/nowlog.ts` fetches the GitHub profile
  README on the server (`revalidate: 3600`), parses the `$ tail -f ./now.log`
  section, and validates the result with a `zod` schema before render. Anything
  unparseable falls back to the last-good snapshot (`content/nowlog.fallback.json`),
  so the section never breaks or shifts layout. Also exposed machine-readably at
  **`/now.json`**. The hero "currently building" chip is derived from the same feed.

- **`whoami` — boot-sequence terminal.** The signature statement is typed out as a
  shell session (`whoami` → `cat role.txt`) when it scrolls into view. Copy is reused
  verbatim from the content modules — the terminal is a *presentation* of the facts,
  never a new claim.

- **The Journey — a terminal you scroll through.** The homepage's experience / work /
  interests live in one pinned terminal. Scrolling runs commands: it types `clear`,
  wipes the screen, then types the next command (`uptime --career` → `ls ./shipped`
  → `tail -f ~/agents/*.log` → `cd ~`) and reveals its output — reversing the same
  way on the way back. `useJourneyChoreo` is a scroll-band state machine with
  hysteresis (no boundary flicker), a `requestAnimationFrame` kickoff (no
  set-state-in-effect cascade), and fast-scroll skipping straight to the landed
  command. A tmux/Claude-Code-style status line carries a `✻` spinner while a
  command runs. Mobile / reduced-motion / no-JS render the four commands as a plain
  readable stack.

- **The figure — binary dissolve.** A background-removed cutout mosaics in from
  binary and dissolves back into drifting bits as you scroll past it into the footer
  — the engineer dissolving into the commits. Desktop + fine-pointer only (the canvas
  loop runs only while in view); everyone else gets a static indigo-duotone `<Image>`.

- **Back/forward scroll memory.** Lenis drives scrolling, which defeats native scroll
  restoration. `components/providers/ScrollRestoration.tsx` takes manual control and
  remembers the last offset per route in `sessionStorage` (bounded LRU). The restore
  is **resilient by design**: a production build settles later than `next dev` (slower
  hydration, Lenis re-measuring height, the View-Transition DOM swap), so instead of a
  one-shot jump it re-asserts the saved offset every frame until it holds (or a ~0.75s
  cap) and aborts on real user scroll. Always an immediate jump, never animated.

## Guardrails — harness engineering, applied to the site itself

The same discipline you'd wire around an agent loop (constraints in the loop, not
bolted on after) shapes this build:

- **Accessibility floor.** `prefers-reduced-motion` disables Lenis and every scroll
  choreography; all content is readable with **zero JS**. Visible `:focus-visible`
  states, semantic landmarks, skip link. Every scroll effect goes through a
  `useXxxChoreo()` hook so the reduced-motion branch lives in exactly one place and
  is testable.
- **Performance budget.** Images via `next/image`, fonts via `next/font`. The two GPU
  moments (hero shader, figure canvas) are gated to fine-pointer desktop and only run
  while in view, keeping mobile TBT/LCP low. `now.log` reserves its space (no CLS).
- **Content guardrails.** All copy is sourced from `handoff/docs/CONTENT.md`; claims
  stay inside its **facts registry** — no invented metrics, no unlisted employers.
- **Palette discipline.** Phosphor green (`--phosphor`) is quarantined to terminal
  panes; the site's voice is electric indigo (`--volt`, with the AA-safe
  `--volt-bright` for small text). Tokens are single-sourced in `globals.css`.

## Evals — how each change is verified

- **Contract test.** `lib/nowlog.test.ts` (vitest) pins the README-parsing behaviour
  against a committed fixture — the live-data layer can't silently regress.
- **Real-build verification.** Behavioural changes are checked against an actual
  `next build && next start` (what the host runs, not just `next dev`) by driving it
  with `puppeteer-core`: e.g. the back/forward restore is asserted to land exactly,
  and the terminal transitions are captured frame-by-frame to confirm pacing.
- **Lighthouse floor (mobile):** Perf ≥ 90 · A11y 100 · Best-Practices 100 · SEO 100.

## Structure

```
src/
  app/          / · /work · /work/[slug] · /now · /now.json · /lab (301 → /work#field-notes)
                + sitemap · robots · opengraph-image · icon
  components/   one folder per section: hero · whoami · journey · index · marquee
                · nowlog · figure · footer
                + ui/ (Nav, Reveal, Schematic, JsonLd) · providers/ (SmoothScroll, ScrollRestoration)
  content/      zod schemas + typed data (site, projects, deepdives, knowledge, lab,
                journey, commits) sourced from handoff/docs/CONTENT.md
  lib/          nowlog.ts (fetch + parse + validate) · choreo.ts (motion grammar)
notes/DECISION-LOG.md   resolved decisions, append-only
handoff/                the original brief: PRD · DESIGN-SPEC · CONTENT · TECH-ARCHITECTURE
```

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all routes SSG/ISR)
npm run lint
npm test         # vitest — now.log parser contract test
```

## Deploy (Netlify)

Connect the repo — Netlify auto-detects Next.js and installs
`@netlify/plugin-nextjs`, which keeps ISR (the hourly `now.log`) and the edge
OG/favicon routes working. **No static export, no `netlify.toml`, no publish dir.**
The only runtime dependency is GitHub's public profile README for `now.log`, which
falls back to a committed snapshot if offline. A push to the default branch deploys.

> `SITE_URL` in `src/content/site.ts` only feeds SEO/social metadata (OpenGraph,
> sitemap, robots, JSON-LD); it does not affect the build. Buying a domain later?
> Change that one line, redeploy, and 301 the old host.

## Owner TODO

- Replace `public/resume.pdf` on each résumé version bump (note: it is publicly
  linked — keep it free of details you don't want exposed).
- Supply the Hashnode URL if/when writing moves there (omitted — not in any source doc).
- Buy the domain, set `SITE_URL`, and 301 the Netlify host.
