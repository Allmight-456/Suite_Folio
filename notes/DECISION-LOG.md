# DECISION-LOG.md — resolved decisions (append-only)

- 2026-06-10 · **D1 Hero treatment** — owner chose to build BOTH variants in parallel
  worktrees (`feature/hero-cinematic` on :3000, `feature/hero-boot` on :3001) and
  compare live before merging a winner. Spec recommendation (A with C's chip) noted.
- 2026-06-13 · **D1 RESOLVED → A (Cinematic name)** — after live side-by-side, owner
  picked variant A. Merged `feature/hero-cinematic` to main (no-ff); both worktrees
  removed, `feature/hero-boot` deleted. Boot variant available in reflog if revived.
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

- 2026-06-14 · **Figure + binary dissolve (owner-directed redesign)** — the two
  raw photos in the Strip read as "just put my image". Replaced with ONE
  background-removed cutout (selfie/IMG_1547, Vision foreground mask) as a
  scroll-driven figure that mosaics in and dissolves into drifting binary bits.
  This is a second bold moment alongside now.log (CLAUDE.md rule 6) — sanctioned
  by owner. Bits use --volt/--bone (NOT phosphor; the quarantine holds). Canvas
  effect is desktop-only (perf, like the shader); mobile/reduced-motion/no-JS get
  a static indigo-duotone <Image>. Strip's two photos removed.
- 2026-06-14 · **Work section redesign → explorable terminal index** — owner found
  the card grid generic and wanted broader knowledge exposed, not just 5-6 personal
  repos. Replaced Hall-of-Fame grid with a `ls -la ./work` index: personal/ +
  client/ + field-notes/ groups, expandable rows. Learnings content = now.log study
  themes + per-project lessons (owner's explicit pick); client work from role bullets.

- 2026-06-14 · **Back/forward scroll restoration (owner-requested)** — Lenis drives
  scrolling, which defeats the browser's and Next's native scroll restoration:
  pressing Back dropped you at the top instead of where you left. Added
  `components/providers/ScrollRestoration.tsx` (mounted inside `SmoothScroll`):
  takes manual control (`history.scrollRestoration = "manual"`), snapshots the
  outgoing offset per pathname at navigation start (pushState patch + popstate +
  pagehide) into a bounded LRU in sessionStorage (12 entries = "a few steps"),
  and restores via `lenis.scrollTo(y, { immediate, force })` — or `window.scrollTo`
  under reduced motion — on genuine Back/Forward (popstate) and reload. Forward
  link clicks still go to top by design; hash deep-links (`/#contact`) are left to
  the anchor. Restore is an immediate jump, never an animated scroll, so the
  reduced-motion floor holds. No-JS safe (renders null). Owner-verified working.
