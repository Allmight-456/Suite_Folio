# ishan-portfolio

Cinematic, scroll-driven portfolio for Ishan Kumar (Backend & GenAI Engineer).
Built on the brief in [`handoff/`](./handoff) — read `docs/PRD.md`,
`DESIGN-SPEC.md`, and `CONTENT.md` before changing structure or copy.

## Stack

- **Next.js 16** (App Router) + **React 19.2** + **TypeScript**
- **Tailwind v4** — tokens live only in `globals.css` / `@theme` (never inline hex)
- **Motion 12** + **Lenis** for choreography; **Paper Shaders** for the desktop hero glow
- Native **View Transitions** for route changes
- `zod`-typed content in `src/content/`
- Live `now.log` parsed from the GitHub profile README via ISR (hourly)

## Develop

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build (all routes SSG/ISR)
npm run lint
npm test             # vitest — now.log parser contract test
```

## Structure

```
src/
  app/            routes: / · /work · /work/[slug] · /lab · /now · /now.json
                  + sitemap · robots · opengraph-image · icon
  components/     one folder per section (hero, message, strip, worlds, hall,
                  marquee, nowlog, footer) + ui/ (Nav, Reveal, Schematic, JsonLd)
  content/        zod schemas + typed data from handoff/docs/CONTENT.md
  lib/            nowlog.ts (fetch+parse) · choreo.ts (motion grammar)
notes/DECISION-LOG.md   resolved decisions (append-only)
```

## Conventions & guardrails

- All copy comes from `handoff/docs/CONTENT.md`; claims stay inside its facts registry.
- Every scroll choreography goes through `useChoreo()` so the reduced-motion
  branch is in one place. Content is visible without JS and under reduced motion.
- Phosphor green (`--phosphor`) is quarantined to terminal panes (the now.log
  pane). The site's voice is electric indigo (`--volt`); `--volt-bright` is the
  AA-safe variant for small accent text.
- Quality bar (verified mobile Lighthouse): Perf 90 · A11y 100 · BP 100 · SEO 100.

## Owner TODO before launch

- Replace `public/resume.pdf` on each résumé version bump.
- Supply real Strip screenshots (TicketFlow logs, htop/agent-box, AI_Bubble,
  campus) — they currently render as SVG schematics; see `src/content/strip.ts`.
- Provide the Hashnode URL (omitted — not in any source doc; see footer/lab TODOs).
- D7: buy domain, set `SITE_URL` in `src/content/site.ts`, 301 the old Netlify URL.
