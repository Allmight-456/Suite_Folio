# DECISIONS.md — open branch points

Each item: 2–3 options, a recommendation (★), and whether it's worth a parallel
worktree build (🔀) or just a paper decision (📄). Resolve D1–D3 before scaffolding;
the rest can be decided at their milestone. Append outcomes to notes/DECISION-LOG.md.

---

### D1 · Hero treatment — 🔀 worth building both
- **A. Cinematic name (Lando-faithful):** viewport-filling ISHAN KUMAR, letters settle,
  live chip types on. Safest path to "wow", strongest recruiter readability. ★
- **B. Terminal boot:** full-screen prompt types `$ whoami` → output expands into the
  hero. Maximum brand coherence with GitHub, but risks gimmick + slower time-to-content.
- **C. Hybrid:** cinematic name with the chip rendered as a one-line prompt (A's shell,
  B's accent).
★ Recommend A (with C's chip) — but this is the single highest-variance aesthetic call;
build A and B in worktrees (`feature/hero-cinematic`, `feature/hero-boot`) and compare.

### D2 · Accent color — 📄
- **A. Electric indigo `#5B5BF0`** — evolves his existing GitHub badge brand `#4F46E5`;
  distinct from Lando's lime and from the acid-green AI-default. ★
- **B. Phosphor green everywhere** — maximal terminal identity, but it's both the AI
  cliché and a Lando-lime lookalike; also forces the now.log pane to lose its quarantined
  specialness.
- **C. Signal amber `#FFB454`** — CRT-heritage, warm, distinctive; weaker tie to existing brand.
★ A. Phosphor stays terminal-only per spec.

### D3 · Photo treatment for the Strip — 📄 (blocks asset prep)
- **A. Indigo duotone** all frames — maximum cohesion, hides mixed photo quality. ★
- **B. Natural color** photos + monochrome terminal frames — more human warmth, riskier cohesion.
- **C. Scanline/CRT overlay** — thematic but easily kitsch.
★ A, with B as a one-variable CSS toggle to eyeball during M2.

### D4 · Hall of Fame hover state — 🔀 cheap to A/B behind ?variant=
- **A. Diagram swap** (static schematic → animated SVG state), closest to Lando's helmet
  base→hover swap. ★
- **B. Card flip to stat sheet** — more info density, more conventional.
- **C. Video/GIF capture of the real tool running** — most "proof", heaviest assets +
  recording workflow.
★ A for v1; C is the v1.1 upgrade path for AutoDocxPdf & TicketFlow once recordings exist.

### D5 · /lab depth at launch — 📄
- **A. Single curated page** mirroring now.log themes (agent boxes, harness, memory,
  retrieval) + outbound links to Hashnode. ★
- **B. MDX mini-blog on-site** — duplicates Hashnode, splits canonical URLs (he already
  uses Hashnode-primary + Dev.to canonical strategy). Don't.
★ A. The site links out; Hashnode stays the writing home.

### D6 · Hero background commit-texture — 📄
- **A. Static curated list** of ~30 real commit messages baked at build (agent extracts
  during the clone-and-verify pass). Zero runtime cost. ★
- **B. Live via GitHub API** — needs token + rate limiting for a 5%-opacity texture. No.
★ A.

### D7 · Domain & hosting — 📄 (owner decision, blocks launch only)
- **A. Buy `ishankumar.dev` (or .in/.io)** on Vercel — clean, professional, ~$12/yr. ★
- **B. Keep Netlify free subdomain** — zero cost, weaker signal on a resume header.
- **C. Vercel free subdomain** (`ishan-kumar.vercel.app`) — interim default while deciding.
★ A when ready; C meanwhile. If A: set up 301 from the old Netlify site immediately —
the old URL is on resumes and outreach in the wild.

### D8 · Resume on site — 📄
- **A. Static `resume.pdf`** (v5 export) in /public, linked in nav+footer. ★
- **B. HTML resume page** — second source of truth to maintain. No.
★ A. LaTeX stays the source of truth; replace the PDF on each version bump.
