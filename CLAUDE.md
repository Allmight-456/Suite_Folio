# CLAUDE.md — ishan-portfolio

Personal portfolio for Ishan Kumar (Backend & GenAI Engineer, Bengaluru).
Cinematic, dark, scroll-driven single-identity site inspired by the *anatomy* of
landonorris.com — not its skin. Full brief lives in `handoff/docs/`; read PRD.md
and DESIGN-SPEC.md before structural changes, CONTENT.md before writing any copy.

## Stack (locked)

- Next.js (App Router) + TypeScript, deployed on Vercel (fallback: Netlify)
- Tailwind CSS with tokens defined ONLY in `tailwind.config.ts` / CSS vars — never inline hex
- Motion: Framer Motion (`motion/react`) + Lenis for smooth scroll
- Content: static TS/MDX data modules in `src/content/` — no CMS
- Live layer: `now.log` parsed from GitHub README via ISR (revalidate: 3600)

## Hard rules

1. **Copy comes from `handoff/docs/CONTENT.md`.** Do not invent claims, metrics,
   or employer names. AutoDocxPdf/SkillForge are *internal tooling / personal infra* —
   never "shipped customer product". Never fabricate stats.
2. **No "Sambin Technologies"** anywhere on the site. Rayvector appears only as the
   employer line in experience — never in marketing copy.
3. **Accessibility floor:** `prefers-reduced-motion` disables Lenis + all scroll
   choreography (content must be fully readable with zero JS motion). Visible
   `:focus-visible` states. Semantic landmarks. Lighthouse a11y ≥ 95.
4. **Performance floor:** LCP < 2.5s on 4G mid-tier mobile. Images via `next/image`,
   fonts via `next/font`, hero media ≤ 300KB initial. No layout shift from now.log
   loading (reserve space, skeleton in terminal style).
5. **Every section works without JS.** Motion enhances; it never gates content.
6. **One signature element** (the terminal `now.log` pane) carries the boldness.
   Everything else stays disciplined. Don't add ambient particles, cursor trails,
   or extra gradients without a DECISIONS.md entry.

## Conventions

- Components: `src/components/<section>/` (PascalCase). One section = one folder.
- Data: `src/content/*.ts` typed with zod schemas in `src/content/schema.ts`.
- Animations: every scroll choreography lives in a `useXxxChoreo` hook so the
  reduced-motion branch is testable in one place.
- Commits: conventional commits (`feat(hero): …`). Small, verifiable steps.
- After each milestone: run `npm run build && npm run lint`, then screenshot
  desktop (1440) and mobile (390) before claiming done.

## Decision log

Resolved decisions live in `notes/DECISION-LOG.md` — append, never rewrite.
Open ones live in `handoff/docs/DECISIONS.md`. If a new fork appears mid-build,
add it there with 2–3 options and a recommendation, and ask, don't assume.
