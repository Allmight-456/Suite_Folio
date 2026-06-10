# DECISION-LOG.md — resolved decisions (append-only)

- 2026-06-10 · **D1 Hero treatment** — owner chose to build BOTH variants in parallel
  worktrees (`feature/hero-cinematic` on :3000, `feature/hero-boot` on :3001) and
  compare live before merging a winner. Spec recommendation (A with C's chip) noted.
- 2026-06-10 · **D2 Accent color** — A, electric indigo `#5B5BF0`. Phosphor green
  `#9BE89B` stays quarantined inside terminal panes per DESIGN-SPEC.
- 2026-06-10 · **D3 Photo treatment** — A, indigo duotone for all Strip frames
  (CSS-based so B "natural color" stays a one-variable toggle during M2).
- 2026-06-10 · **IMG_6075 headshot** — owner confirmed: use ONLY with duotone
  treatment (photo reads as AI-enhanced; duotone hides the tells). Never natural.
- 2026-06-10 · **Hero glow upgrade (new fork, owner-approved)** — replace the static
  radial indigo gradient behind the hero name with a subtle Paper Shaders
  (`@paper-design/shaders-react`) ambient GPU glow. Bends PRD's "no WebGL hero"
  anti-goal, approved on condition of: graceful fallback to the static CSS gradient
  (no-JS / reduced-motion / WebGL-unavailable), no impact on LCP (hero name is text),
  shader loads after first paint. Logged in handoff/docs/DECISIONS.md as D9.
- 2026-06-10 · **Transitions stack** — Next.js 16 native View Transitions
  (`viewTransition: true`) for route changes; CSS scroll-driven animations where
  they can replace JS scroll handlers; Motion + Lenis remain the choreography core.
  New-wave component patterns (React Bits et al.) are rebuilt with our tokens, not
  installed as dependencies — keeps the site non-templated and the JS budget intact.
- 2026-06-10 · **Scaffold** — Next 16.2.9 / React 19.2.7 / Tailwind v4 / Motion 12 /
  Lenis 1.3 / zod 4. `next lint` removed in Next 16 → `lint: eslint .`, vitest for
  the nowlog parser contract test.
