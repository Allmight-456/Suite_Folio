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

- 2026-06-18 · **/work terminal → single pinned pane; certifications section added — owner-directed.**
  The mind terminal (`components/mind/MindTerminal`) stacked all three sections (curiosity ·
  obsessions · convictions) in **one tall window** that booted block-by-block — owner found it
  too long and too visually dominant. Reworked to a **single pinned pane** that re-paints instead
  of elongating: it now mirrors the homepage Journey grammar (`components/journey`). New
  `components/mind/useMindChoreo` (parallel to `useJourneyChoreo`, kept separate so Journey stays
  zero-risk) pins the section, maps scroll bands → commands, and runs `clear` + retypes the next
  command on crossing — **plus `goTo(i)`** so clicking a **tree node** (now interactive, `MindMap`
  gained `active`/`onSelect`/`pinned`) or a **status-bar breadcrumb** scrolls to that band (scroll
  stays the single source of truth — no click/scroll fight). New `components/mind/MindExplorer`
  owns the hook and renders tree + pane; `MindTerminal` **deleted** (logic folded in; per-block
  `useTerminalBoot` no longer used by /work, still used by the skills card). Reduced-motion / no-JS /
  narrow fall back to the **plain stacked sections** (each `#id`, tree nodes become anchor jumps) —
  hard rules 3 + 5 hold; the elongated view survives only as the accessible fallback.

- 2026-06-18 · **Brand colours for cert logos — scoped exception to palette discipline.** New
  certifications section on `/work` (`components/certs/Certifications`) presents each credential as
  a **skill-card-style window** (pixel logo + details, static — no boot). Owner-approved: the pixel
  logos use **real brand colours** (Google blue/red/yellow/green "G" + Gemini spark; Databricks
  red/orange stacked mark) so they stay recognisable. These are declared as **`--brand-*` tokens in
  `:root` only** (globals.css) and **not** mirrored into the `[data-theme]` blocks, so — unlike the
  rest of the palette — they're **theme-independent** and don't recolour with the picker. This is a
  deliberate, narrowly-scoped exception (same spirit as the `now.log` phosphor quarantine): no inline
  hex (first-class `bg-brand-…` utilities registered in `@theme inline`), confined to the three cert
  logos. Third cert added
  (Gen AI Agents: Transform Your Organization), so the facts registry now reads **three** Apr 2026
  certs; copy sourced from the official Google/Databricks course pages (CONTENT.md §8), never invented.

## 2026-08-14 — Emergent role, hackathon builds, window chrome, now.log parser

**Owner input (verbatim decisions, asked before writing any copy):**

- **Title = "L3 Engineer · Emergent".** Research found that Emergent's Bengaluru job
  board posts a customer-embedded-engineer title publicly, and that L3 reads as an
  internal level with no meaning outside the company. Owner was shown both framings
  and picked the literal internal one. *(This entry named that industry label three
  times when written; the term was **redacted 2026-08-15** on owner instruction —
  see the 2026-08-15 entry. Redacted in place rather than appended-over, because
  the point of the instruction is that the string not be in the repo at all.)*
- **Timeline:** Emergent from aug 2026; Rayvector closed at jul 2026.
- **Hackathons:** Rasputin_Loop → Slack Agent Builder Challenge (submitted, *did not
  win*); Amadeus → OpenAI Build Week (submitted, *results not out* as of today).
  The site states the submission only. The loss is not stated either — a portfolio
  owes no confession, and "did not win" is not a fact a reader needs. See CONTENT §10.
- **Window chrome:** real macOS traffic lights with glyphs always visible.

**D-2026-08-14a — Traffic lights are theme-independent.** The six windows shared six
hand-copied `bg-volt-dim` dot triples; they're now one `ui/WindowChrome` (a server
component — the bar is static, so it ships no JS). Colours are fixed `--win-*` tokens
that the p10k picker does NOT retint, the same carve-out already granted to the cert
brand marks and now.log phosphor: the dots read as "window" precisely *because* those
three colours are constant in every real terminal. Glyphs are stroked in `--ink` at
55% so they read as engraved rather than painted on.

**D-2026-08-14b — Emergent + Slack pixel marks; no OpenAI mark.** `ui/PixelLogo` now
owns the grid registry (lifted out of `components/certs`) so new marks reuse the cert
vernacular instead of inventing a second logo style. Added: Emergent's monoline "e"
(ring broken upper-right, diagonal bar) beside the Emergent timeline row, and Slack's
four-arm pinwheel on Rasputin_Loop's provenance line. **The OpenAI knot was attempted
and dropped** — rendered at 11–13px it reads as a target/aperture, not the mark;
Amadeus keeps its `harness` schematic instead. A bad logo is worse than no logo.

**D-2026-08-14c — now.log separator tolerance (live bug fix).** `parseNowLog` split
the `<summary>` on an em-dash only, but the profile README had switched to `->`. Every
entry therefore parsed with `title: ""` and the whole line folded into `tag`, and
`getHeroChip` silently degraded to its hardcoded "SkillForge" fallback — invisible,
because the fallback path looks identical to success. The parser now accepts
`— – -> →`, with a regression test per separator. The README is hand-edited; the
parser is the right place to be tolerant.

**Role bullets are now grouped by employer** (`roleHighlights`, was a flat
`roleBullets`). With two employers on the timeline, an unlabelled list silently
attributed Rayvector's FastAPI/migration work to Emergent.

## 2026-08-14 (later) — review pass on the Emergent update

Owner reviewed the first pass against five screenshots. Every item below is a
correction to work committed earlier the same day.

**D-2026-08-14d — The Emergent mark moves off the timeline row.** Inline with a
`aug 2026 – present  L3 Engineer · Emergent` line it read as clutter and forced
a reserved-width hack on every other row just to keep the column aligned. It now
sits as a **side rail on the role card**, which is the placement the certification
windows and the skills card already established. `experience[]` is mark-free again.

**D-2026-08-14e — Role cards lead with a summary, not bullets.** The career panel
had grown to seven full-sentence bullets — "no one will read all this content"
(owner). Restructured: each role is now one bold summary line (the hook) plus
short mono fragments (the scan), with the full timeline underneath. `roleBullets`
→ `roleHighlights` gained `summary` + `period`; bullets became fragments, not prose.

**D-2026-08-14f — Amadeus and SkillForge never appear adjacent.** They are the
same lineage (procedural memory for coding agents) and back-to-back they read as
one project listed twice. Fixed three ways: the Journey headline set is now chosen
for RANGE (`rasputin-loop`, `amadeus`, `ticketflow` — agent / harness tooling /
production Go backend); `projects.ts` order separates them; and Amadeus's copy now
leads on **governance** (consent, named review, promotion, abstention) rather than
"procedural memory", which is SkillForge's phrase along with the ~50× stat.
**Open for the owner:** SkillForge (Python/Claude Skills, WIP since may) may simply
be superseded by Amadeus (TypeScript/Codex/cross-harness, jul). Retiring it to
`tier: "older"` is a content call, not ours.

**D-2026-08-14g — Pinned windows are viewport-capped, not fixed-height.** A
`min-h-[460px]` body plus padding overflowed the pane on short laptop windows and
landscape tablets, pushing the status bar off screen. Both pinned terminals
(Journey, MindExplorer) are now `h-svh` flex columns capped at `max-h-full` with a
**scrolling body** and a `min-h-[min(24rem,42svh)]` floor. Status bars drop their
breadcrumbs below `lg` so the row never clips. The pin threshold also gained a
height test — `(min-width: 768px) and (min-height: 640px)` — so short windows get
the readable stack instead of a cramped pinned terminal.

**D-2026-08-14h — Section rules fade instead of slab.** A full-bleed 1px
`--volt-dim` border cut the page in two. `.rule-top` / `.rule-bottom` draw a
gradient that fades to transparent at both ends — a tmux pane divider, not a wall.

**D-2026-08-14i — PixelLogo goes solid below ~6px/cell.** Gaps and corner rounding
cost a constant device pixel, so on a 1-cell-wide monoline mark (Emergent's ring,
Slack's arms) they ate the stroke and the logo shattered into loose dots. Marks
under `0.4rem` per cell now render gapless and unrounded, with grid rows pinned
explicitly (`gridAutoRows` + `lineHeight: 0`) — left to content sizing, sub-pixel
rounding opened seams that merged the mark horizontally but striped it vertically.

**now.log was rewritten, and identity copy was synced everywhere.** The log had
drifted into vague filler ("Studying — nanochat") that said nothing; it is now
seven entries that each make a concrete claim, led by the Emergent work. The
committed fallback is generated from that exact markdown so both paths agree.
CONTENT.md §2 now lists every file that repeats the identity claim — `site.ts`,
`layout.tsx` metadata, `JsonLd`, `opengraph-image`, `nowlog.ts`'s chip fallback,
and the profile README — because this pass found them out of step with each other.

## 2026-08-15 — Emergent role reframed; one term banned repo-wide

**D-2026-08-15a — The industry label for a customer-embedded engineer is banned.**
Owner-directed, emphatic, no expiry: it appears nowhere — not the site, not the
profile README, not comments, not these notes. Fourteen occurrences across
`site.ts`, `journey.ts`, `layout.tsx`, `nowlog.fallback.json`, CONTENT.md,
DECISION-LOG.md and the suggested README were removed. **Two prior log entries were
redacted in place**, which breaks this file's append-only rule — done deliberately,
because appending a correction would have left the banned string sitting in the
repo, which is the one outcome the instruction rules out. The redaction is marked
where it happened rather than hidden. CONTENT.md §6 now opens with a banned-term
notice so the next writer hits it before drafting Emergent copy.

**D-2026-08-15b — Reframed on the facts, not the label.** New facts supplied by the
owner: **L3** is the internal level, **AI Agent Reliability** is the team, and the
role is **support and engineering both** — one shift, not two jobs. The framing now
derives from what that team actually does. Timeline line becomes `L3 Engineer · AI
Agent Reliability · Emergent · Bengaluru`; the card summary is *"Agents write the
first version. I make it survive contact with real customers — and answer for it
when it doesn't."*; `role.txt` in the whoami pane becomes *"Now I work where agents
meet real users: I build what they can't finish, and I'm the one who answers when
it breaks"*, restoring the original closing beat. The now.log lead entry is retagged
`On call — AI Agent Reliability at Emergent`. Describing the work rather than
reaching for the label is a better line anyway: the label is a category, the
sentence is a claim.

**D-2026-08-15c — Career mark centres on the pair, not on its own card.** The
Emergent mark moved from a per-role rail to a single rail down the left of BOTH
role cards, vertically centred against them (owner). It is therefore no longer a
`roleHighlights` field but its own `careerMark` export — it anchors the block the
way the pixel robot anchors the skills window, and calling it a per-role logo would
have been a lie about what it now is. Each card keeps its own text label, so
nothing implies the mark covers Rayvector.
