# TECH-ARCHITECTURE.md

## 1. Stack (locked by owner)
- **Next.js 15+ (App Router) + TypeScript**, static-first: every route is SSG except
  the now.log layer (ISR).
- Tailwind CSS v4 (tokens as CSS vars per DESIGN-SPEC), `next/font` for Space Grotesk /
  Inter / JetBrains Mono.
- **Motion:** `motion` (Framer Motion) + `lenis` for smooth scroll. No GSAP unless a
  scrub effect genuinely needs ScrollTrigger-grade control (record in DECISION-LOG if so).
- Validation: `zod` for content schemas. Icons: `lucide-react` sparingly.
- Deploy: **Vercel** (ISR is first-class there). Netlify fallback works but ISR→ODB differs.

## 2. Repo layout

```
src/
  app/
    layout.tsx           # fonts, Lenis provider, metadata
    page.tsx             # home narrative
    work/[slug]/page.tsx # deep dives (generateStaticParams from content)
    lab/page.tsx
    now/page.tsx
    now.json/route.ts    # machine-readable easter egg
    og/route.tsx         # dynamic OG images (@vercel/og)
  components/
    hero/ message/ strip/ worlds/ hall/ marquee/ nowlog/ footer/ ui/
  content/
    schema.ts            # zod: Project, LogEntry, Frame, Cert
    projects.ts strip.ts lab.ts site.ts   # typed data ← CONTENT.md / DEEP-DIVES.md
  lib/
    nowlog.ts            # fetch + parse GitHub README now.log
    choreo.ts            # shared motion variants + reduced-motion guard
notes/DECISION-LOG.md
handoff/                 # this package, committed for traceability
```

## 3. The live now.log layer (the only dynamic piece)

**Source of truth stays the GitHub profile README** — Ishan already updates it weekly;
the site must add zero new workflow.

```
fetch: https://raw.githubusercontent.com/Allmight-456/allmight-456/main/README.md
       { next: { revalidate: 3600 } }   // ISR, hourly
parse: slice between the `$ tail -f ./now.log` heading and the next `$ ...` heading;
       each bold entry "**emoji TAG — title**" + following paragraph → LogEntry
       { tag: 'BUILDING'|'RUNNING'|'READING'|..., emoji, title, body_md, links[] }
```

Resilience rules:
- Parser is defensive: unknown tags pass through; parse failure → last-good snapshot
  committed at `src/content/nowlog.fallback.json` (refreshed at each build).
- Terminal pane reserves height (no CLS); skeleton = blinking block cursor.
- Footer of pane: `synced from github · {relativeTime(lastFetched)}`.
- Hero chip = first `[BUILDING]` entry title; same fallback chain.
- **Contract test:** a vitest fixture pins today's README snapshot so README format
  drift breaks CI, not production.

Alternative considered (GitHub REST/GraphQL API): richer (commit feed, repo stats) but
needs a token, rate-limit handling, and the README markdown is already the curated
editorial layer. Raw-file ISR wins. (See DECISIONS D6 for the commit-texture variant.)

## 4. Performance & a11y budget
- LCP element = hero name (text → trivially fast). Strip images lazy, `next/image`,
  AVIF/WebP, ≤200KB each.
- JS budget: home ≤ 180KB gzipped first load. Lenis+Motion only on desktop-pointer
  media query if budget busts (decision point).
- `prefers-reduced-motion`: `choreo.ts` exports inert variants globally — single switch.
- Semantic: h1 once (hero name), sections labelled, skip-link, focus-visible ring in
  `--volt`. Lighthouse CI in GitHub Actions on PRs.

## 5. SEO / metadata
- `metadata` API per route; Person JSON-LD on `/`, SoftwareSourceCode JSON-LD per /work page.
- OG images generated per route via `@vercel/og` in the terminal-pane style.
- Canonical domain decision: D7. Until then, deploy previews only.

## 6. CI & quality gates
- GitHub Actions: typecheck, eslint, vitest (nowlog parser contract), Lighthouse CI.
- Pre-deploy manual check per CLAUDE.md: build, then screenshots at 1440 & 390.
