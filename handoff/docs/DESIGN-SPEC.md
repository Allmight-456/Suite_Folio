# DESIGN-SPEC — "Production Grade"

Inspiration: landonorris.com. We steal its **anatomy** (scroll-driven personal
narrative, artifact hall of fame, two-world split, live "next event" element,
signature motif) — and reject its **skin** (lime-on-dark is also the single most
common AI-generated palette; a clone would read templated).

## 1. Concept

**An engineer's site shot like a season documentary.** Lando's site treats a racing
season as cinema. Ishan's treats a production engineering practice the same way:
the race calendar becomes `now.log`, the helmet collection becomes shipped systems,
the paddock photos become Bengaluru/terminal/infra imagery. The terminal vernacular
from his GitHub README (`$ whoami`, `tail -f now.log`) is the *signature motif* —
used sparingly, like Lando's signature scribble, not as wall-to-wall theming.

## 2. Tokens

### Color — "Night Shift" palette
| Token | Hex | Role |
|---|---|---|
| `--ink` | `#0A0A0F` | page background (near-black, blue-cast) |
| `--ink-raise` | `#12121A` | cards, panels |
| `--bone` | `#E8E6E1` | primary text (warm off-white, not pure) |
| `--bone-dim` | `#8B8A94` | secondary text, captions |
| `--volt` | `#5B5BF0` | THE accent — electric indigo, evolved from his GitHub `#4F46E5` brand |
| `--volt-dim` | `#2E2E7A` | accent surfaces, focus rings, rules |
| `--phosphor` | `#9BE89B` | terminal-pane text ONLY (now.log). Never used outside the terminal motif |

Rule: indigo is the site's voice; phosphor green exists only inside the terminal
panes — a deliberate quarantine that makes the now.log signature pop. No gradients
except a single radial indigo glow behind the hero name.

### Type
| Role | Face | Notes |
|---|---|---|
| Display | **Space Grotesk** (700/500) | hero name, section heads; tight tracking, set HUGE (clamp 4rem→12rem) |
| Body | **Inter** (400/500) | paragraphs, captions |
| Terminal | **JetBrains Mono** (400) | now.log, eyebrows, metadata, code, captions like `bengaluru, 2025` |

Eyebrow convention: mono, lowercase, `--bone-dim`, prefixed with `$` only when the
content genuinely is a command/log (e.g. `$ tail -f now.log`), plain otherwise.
Don't fake commands for decoration — structure is information.

### Layout & motion grammar
- 12-col grid, max-w 1440, generous 96–160px section padding. Mobile-first at 390.
- Lenis smooth scroll. Framer Motion for reveals: y:24→0 + fade, 0.6s, custom ease
  `[0.22, 1, 0.36, 1]`, staggered 60ms. One choreography style site-wide.
- Big moments (max 3 on the home page): hero name settle, photo strip horizontal
  scroll-scrub, hall-of-fame hover states. Everything else is quiet.
- `prefers-reduced-motion`: kill Lenis, all transforms become opacity-only or none.

## 3. Home page — section by section (Lando → Ishan mapping)

### 3.1 HERO — Lando's "name + next race"
- Full viewport. `ISHAN KUMAR` in display type at viewport-filling scale,
  `backend & genai engineer` as mono eyebrow above, `bengaluru, india` below.
- Right/bottom: the live element. Lando shows *Next Race: Barcelona GP*; we show a
  compact terminal chip: `▸ currently building — SkillForge` pulled from now.log's
  top `[BUILDING]` entry. Click → /now.
- Background: single indigo radial glow + a barely-visible (4–6% opacity) scrolling
  column of real commit messages from his repos (texture, like Lando's repeating
  "mclaren f1 since 2019" ticker). Source the strings from research/ material.
- Load sequence: name letters settle (clip-path reveal), then chip types on like a
  prompt. Once. Never loops.

### 3.2 MESSAGE — Lando's signature quote block
- One statement, display type, generous size, key phrases in `--volt`:
  the positioning line from CONTENT.md §2. Closed by the motif: a mono
  `ishan@prod:~$ ▮` cursor blinking — this is "the signature".

### 3.3 THE STRIP — Lando's horizontal photo gallery with `Location, Year` captions
- Horizontal scroll-scrub band of 6–8 frames, each captioned in mono exactly like
  Lando (`Qatar, 2024`): real photos (see ASSETS.md), terminal screenshots of real
  systems, an architecture diagram from AutoDocxPdf's mermaid output, the AI_Bubble
  site preview. Mix of personal + machine imagery = the "on and off track" texture.
- Captions per CONTENT.md §3. On mobile: native swipe, no scrub.

### 3.4 TWO WORLDS — Lando's ON TRACK / OFF TRACK split
- Two stacked giant typographic doors, exactly like Lando's:
  - **ON PROD** → /work — "Production systems, migrations, and the constraints they survived."
  - **OFF PROD** → /lab — "Agent boxes, evals, experiments, and what breaks at 3am."
- Hover: door's background image (strip imagery) parallax-reveals; title skews 1–2°.

### 3.5 HALL OF FAME — Lando's helmets grid (the centerpiece)
- Same interaction grammar as the helmets: grid of artifact cards, each with a
  **name + year**, base render → hover swap (static diagram → animated/alt state),
  and a one-line spec. Cards: SkillForge 2026, AutoDocxPdf 2025, TicketFlow 2025,
  Market Research AI 2025, AI_Bubble 2026, + "older work" rail (RepoMaster, PDFSage,
  irctc_api). Each card shows a "vehicle": stylized SVG schematic of the system
  (4-agent pipeline for AutoDocxPdf, lock-flow for TicketFlow, AST-tree for SkillForge)
  — the engineer's equivalent of a helmet design. Click → /work/[slug].
- Card metadata strip in mono: `~50× token reduction` / `0 double-bookings` /
  `12 req/min under a 15 RPM ceiling` — the stat IS the livery.

### 3.6 STACK MARQUEE — Lando's partners logo wall
- Slow marquee of stack wordmarks (Go, Python, FastAPI, PostgreSQL, Redis, Docker,
  AWS, Azure, LangChain, Claude, Gemini, MCP) in `--bone-dim`, monochrome.
  Pause on hover. Pure texture, no links. (Logos: use text wordmarks where
  trademark-safe; do not embed brand logos without checking usage terms.)

### 3.7 NOW.LOG — Lando's calendar/next-race section (THE signature element)
- A full terminal pane (phosphor-on-ink, window chrome, `$ tail -f now.log` title)
  rendering the live-parsed entries: `[BUILDING]`, `[RUNNING]`, `[READING]` etc.,
  timestamps right-aligned, source-linked. Skeleton = blinking cursor. Footer line:
  `synced from github.com/Allmight-456 · {relative-time}`.
- This is the one maximal moment. Treat with care; see TECH-ARCHITECTURE §3.

### 3.8 CONTACT / FOOTER — Lando's "Always bringing the fight."
- Giant closing line: **"The best resume is a git log."** (his actual README
  sign-off — perfect) with mailto, LinkedIn, GitHub, X, Hashnode in mono.
- Tiny last line: `© 2026 ishan kumar · built with next.js · view source on github`.

## 4. Deep-dive page template (/work/[slug])
Hero: project name + year + mono stat strip → "The problem" → "The constraint"
(every project gets one; it's the brand) → schematic SVG → "What the git log says"
(3–5 real changelog/commit excerpts styled as log lines) → "What I learnt" →
stack chips → links (repo, live). Content from PROJECT-DEEP-DIVES.md verbatim.

## 5. Self-critique checklist (run before calling any milestone done)
- Remove one accessory: is there a gradient, border, or animation that adds nothing?
- Is phosphor green leaking outside terminal panes? (It must not.)
- Does any copy overclaim vs. CONTENT.md facts registry?
- 390px width: does the hero name wrap with intent or by accident?
- Tab through the page: focus order sane, focus visible?
