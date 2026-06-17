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

- 2026-06-16 · **Round-1 refinement (owner-directed, 4 forks resolved live)** —
  (1) **whoami → boot-sequence terminal.** The floating `$ whoami` statement read
  as a generic subheader; replaced `components/message` with `components/whoami`, a
  Mac-window pane that types `whoami` / `cat role.txt` on scroll-in and reveals the
  output. Copy reused verbatim from `site.ts` `hero`+`message` (no new claims).
  Accent stays `--volt`; phosphor remains quarantined to now.log.
  (2) **ON/OFF PROD doors → pinned horizontal Journey.** Owner found the two doors
  gated experience behind a click. Replaced `components/worlds` with
  `components/journey`: a `count*100vh` section whose sticky inner track translates
  on X by scroll progress (Shopify-Editions feel) through Experience → Shipped →
  Agentic → Go-deeper panels, each opening with a shell command. Desktop pins;
  mobile / reduced-motion / no-JS stack vertically (useJourneyChoreo gate).
  (3) **Redundancy cleanup.** Homepage = curated highlights; `/work` = the single
  exhaustive index (`WorkIndex` + experience timeline + writing links). `/lab`'s
  content duplicated the field-notes/ directory → `/lab` now 301s to
  `/work#field-notes`; nav "lab" points there; removed from sitemap. `worlds` data
  + `Message`/`Worlds` components deleted.
  (4) **Schematics extended** to client/ + field-notes/ rows (owner ask): added
  `api`, `migration`, `deploy`, `loop` kinds to `Schematic`.
  Deferred to Round 2: open-source panel (GitHub stars + Notion), now.log live data
  (pushed repos / contributions / stars), figure relocation, inter-section TUI
  transitions.

- 2026-06-16 · **Back/forward restore — prod-build fix.** Owner reported the
  scroll-restoration (logged 06-14) worked in `next dev` but not on the Netlify
  build. Verified the code WAS deployed (storage key present in the live bundle), so
  it was a timing regression: a production build settles later than dev (slower
  hydration, Lenis re-measuring the restored route's height after the jump, the
  `viewTransition` DOM swap), and the one-shot `rAF×2 + 60ms` restore landed before
  that and got overridden. Fix: `ScrollRestoration` now re-asserts the saved offset
  every frame (with `lenis.resize()`) until it holds for ~3 frames or a ~0.75s cap,
  and aborts on genuine user scroll (wheel/touch/key). Still an immediate jump,
  never animated — reduced-motion/no-JS branches unchanged.

- 2026-06-16 · **Sambin Technologies — rule reversed (owner-approved, timeline-only).**
  CLAUDE.md rule #2 and CONTENT.md previously forbade ANY Sambin mention. Owner asked
  to add the Nov 2024–Jan 2025 Software Developer internship; chose the **timeline-only**
  option (no project detail, no 85%/metrics). Added one line to `experience` (site.ts);
  updated CLAUDE.md rule #2, CONTENT.md §6 timeline, and the facts registry (now permits
  the timeline line, still forbids Sambin *project work / deliverables / metrics*).

- 2026-06-16 · **Journey transition → terminal command session (owner-directed).**
  The lateral translateX slide (Round 1) read as a stock carousel. Replaced with a
  pinned terminal that, on scroll, runs `clear` (types it, wipes the screen) then types
  the next command (`uptime --career → ls ./shipped → tail -f ~/agents → cd ~`) and
  reveals its output — reversing the same way on scroll-up. useJourneyChoreo became a
  scroll-band state machine (hysteresis kills boundary thrash; rAF kickoff avoids a
  set-state-in-effect cascade; fast scroll skips intermediates to the landed band).
  Verified pacing ~1.3s via filmstrip. Desktop only; mobile / reduced-motion / no-JS
  render the four commands as a plain readable terminal stack (hard rules 3 + 5).

- 2026-06-16 · **Final touches (owner-directed).**
  (1) **Title future-proofing:** "GenAI" → "AI" everywhere in live copy (hero eyebrow,
  layout metadata, JSON-LD jobTitle, OG image, the market-research deep-dive line) —
  owner's call that "genai" may date. Governing docs (CONTENT.md §1, DESIGN-SPEC §3.1)
  updated to match. Title is now `backend & ai engineer`.
  (2) **Figure relocated** from after the footer (where it sat below the copyright and
  was easy to miss) to right BEFORE the footer: NowLog → Figure → Footer. Rationale —
  the dissolve is a sign-off, so it ends the page, but contact/copyright must be the
  literal end; placing it before the footer makes it the climax that hands into "the
  best resume is a git log" and puts it in the path to contact. Height trimmed 200→170vh
  to cut the empty lead-in.
  (3) **Journey indicator → tmux/Claude-Code status bar** (replaces the floating dots,
  owner wanted more intuitive + "terminally"; satisfies the "add Claude Code feel" ask,
  rule-6 logged here). A status line at the foot of the terminal window: a command
  breadcrumb (career · shipped · agents · home) with the active lit + [n/4], and a
  Claude-Code `✻ booting…` cycling spinner shown while a command runs during the
  clear/type transition. Indigo palette held (no Claude orange); phosphor untouched.

- 2026-06-17 · **Skills marquee → neofetch "stack" card (owner-directed).** The slow
  stack marquee (`components/marquee`) forced viewers to *wait* for a skill to crawl by
  and only showed ~12 of them. Replaced with a static `neofetch`/`fastfetch`-style card
  (`components/stack/Stack`): an ASCII sigil + all skills grouped into 7 categories
  (`src/content/skills.ts`, `SkillGroupSchema`, sourced from CONTENT.md §8) — caught in
  one gaze, revealed with the shared `useChoreo` stagger (static under reduced-motion /
  no-JS; SSR renders every skill). Uses the lighter card chrome (not the now.log
  Mac-window signature) and site accent ONLY — **phosphor stays quarantined** to now.log.
  Deleted `Marquee.tsx`, `stackMarquee` (site.ts), the `.marquee-track` keyframes.

- 2026-06-17 · **Theme switcher — p10k-style full repaint (owner-directed, big ask).**
  Added a zsh-powerlevel10k / Claude-Code-setup-style palette picker that repaints the
  *whole* site (background, text, accent, borders, hero glow, terminal). Mechanism: every
  colour already flows through CSS tokens, so each theme is a `[data-theme="id"]` block in
  `globals.css` overriding `--ink*/--bone*/--volt*/--phosphor`; switching just sets
  `<html data-theme>`. `:root` stays indigo → SSR / no-JS keep the locked brand (no FOUC
  via a pre-paint inline script in `layout.tsx`; persisted to `localStorage['ik-theme']`).
  `ThemeProvider` holds state + fires `ik:themechange`; **HeroGlow** and the figure
  **useBinaryDissolve** (the only JS token snapshots) re-read tokens on that event — all
  CSS-driven styles follow automatically. Two in-sync triggers: a nav popover
  (`ThemeSwitcher`, keyboard + live-preview, Esc reverts) and the stack card colour blocks
  (`ThemeSwatches`). Themes: indigo (default) + phosphor green · amber CRT · ember (orange)
  · dracula · nord — all dark + AA-tuned. **This relaxes D2 (single locked accent) and the
  phosphor quarantine, but ONLY under opt-in themes** — the default render is unchanged
  indigo with phosphor quarantined to now.log. No inline hex (tokens-in-CSS rule holds);
  spacing/margins unchanged (a theme recolours, it never re-lays-out). Lighthouse a11y /
  LCP floors preserved (backgrounds kept dark, contrasts AA).

- 2026-06-17 · **Skills card → terminal boot + pixel robot + niche enrichment (owner-directed
  round 2).** The static stack card needed the site's life and the data was a verbatim copy.
  (1) **Boots like a terminal:** `useSkillsBoot` (modelled on `useJourneyChoreo`) opens the
  window on first scroll-in, types `skill --all`, beats a Claude-Code spinner, then streams
  the category rows one-by-one — runs ONCE (never loops). Pre-mount / reduced-motion / no-JS
  render the fully-booted state (every skill, command pre-typed). Shared `Cursor`/`Spinner`
  extracted to `components/ui/Terminal` and reused in Journey (DRY). (2) **Pixel robot/agent
  head** replaces the ASCII triangle — a token-coloured pixel grid, recolours per theme,
  accent only (phosphor quarantine holds). (3) **Sharpened + enriched skills** from the README
  knowledge base (MCP, AST retrieval, Clean Architecture, distributed locking, evals/guardrails,
  Claude Skills, vector/FAISS, + a `tooling` row); `niche: true` items paint in `--volt-bright`
  so the depth catches the eye. Mirrored in CONTENT.md §8. Command is `skill --all` (owner's wording).

- 2026-06-17 · **/work → git-graph 3-branch tree + lightweight pages for all projects
  (owner-directed round 2).** The `ls -la` index didn't match the cinematic theme, icons
  repeated, and most projects (all older ones) had no page/context/links. (1) **`WorkTree`**
  (`components/work`) renders `$ git log --graph --all`: `main` branches into **projects ·
  interests · learnings**, drawing in as a top-down staggered reveal (useChoreo; nested-list
  floor under reduced-motion / no-JS). Project nodes link to their page; interest/lesson nodes
  expand inline (<details>, open without JS). (2) **Content reorg** — `knowledge.ts` field-notes
  split into `interests` + `lessons`; new `content/work.ts` composes the 3 branches from existing
  typed content (no fact stated twice). (3) **Older work promoted** — RepoMaster / PDFSage / irctc
  moved from a dead link-list to real projects (`ProjectSchema` gained `tier` + `summary`) with
  **lightweight `/work/[slug]` pages** (what · stack · repo links); the deep-dive template is now
  two-tier (flagship full vs older lightweight). Copy grounded in PROJECT-DEEP-DIVES + the PDFSage
  readme; **older-project years are approximate (2024) — owner to verify.** (4) **Icons
  diversified** — added `vector`/`scaffold`/`editorial`/`memory`/`harness`/`scan` schematics and
  re-mapped so no project repeats a glyph. Replaced `WorkIndex` (deleted); writing + certs now live
  in the learnings branch (removed the standalone Writing block on /work).

- 2026-06-17 · **/work → personal "What Pulls Me" (ER diagram + terminal) — owner-directed
  round 3.** The git-graph tree read like `pstree` and re-stated the work experience already
  shown in the homepage `uptime --career`. Redirected: /work is now **entirely personal** —
  not a project index. Structure: an **ER / design-flow diagram** (`components/mind/MindMap`)
  maps a root `ishan` → 3 children **curiosity · obsessions · convictions** (owner-chosen jargon
  for interests / passion / learnings); below it a **terminal window** (`components/mind/MindTerminal`,
  `id="field-notes"`) where each section **boots on scroll** — types its command (`cat ~/curiosity`,
  `ls -t ~/obsessions`, `git log --oneline ~/convictions`) and streams its items. **Projects are
  woven in as `↳ evidence` links** (every one of the 8 project pages is reachable from here — verified),
  not re-indexed. Content `content/mind.ts` (first-person rephrasing of the old knowledge/lab/deepdive
  copy — no new claims). Experience timeline dropped (redundant); certs kept as a slim footnote;
  writing stays in the global footer. **Reuse/cleanup:** the skills boot hook generalised to
  `components/ui/useTerminalBoot`; deleted `WorkTree`, `content/work.ts`, `content/knowledge.ts`
  (now dead); `kindForProject` moved to `projects.ts`. Homepage Journey `/work` captions updated.
  Reduced-motion / no-JS render the diagram static + terminal fully-booted (SSR carries it all).

- 2026-06-17 · **Two bug fixes (owner-flagged).** (1) **Hydration mismatch** on `<html>` — the
  pre-paint theme script sets `data-theme` before React hydrates; added `suppressHydrationWarning`
  on `<html>` (the next-themes pattern). Verified 0 console errors with a non-default theme. (2)
  **now.json clutter** — the big `machine-readable: /now.json` block on `/now` was eating vertical
  space; moved to a small inline link on the breadcrumb row (endpoint kept).
