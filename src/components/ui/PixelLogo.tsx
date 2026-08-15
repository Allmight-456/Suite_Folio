/**
 * Brand pixel-art marks, shared between the certification windows and the
 * experience timeline. Extracted from components/certs (which owned the Google /
 * Databricks grids) so the Emergent and Slack marks reuse the exact same
 * vernacular rather than introducing a second logo style.
 *
 * Brand colours are a scoped, theme-INDEPENDENT exception to palette discipline
 * (like phosphor for now.log): a Google "G" that retints per theme stops being a
 * Google "G". Tokens live in globals.css; no inline hex here.
 * See DECISION-LOG 2026-06-18 + 2026-08-14.
 */

export type PixelLogoKind =
  | "google-g"
  | "google-gemini"
  | "databricks"
  | "emergent"
  | "slack"
  | "openai";

// Chars → brand tokens. Google: b/r/y/g · Databricks: R/o · monochrome: e
// Slack: B(blue) G(green) Y(yellow) P(pink/red).
const GRIDS: Record<PixelLogoKind, string[]> = {
  "google-g": [
    "..bbbbbbb..",
    ".bb.....bb.",
    ".rr........",
    ".rr........",
    ".rr...yyyy.",
    ".rr...yyyy.",
    ".gg.....gg.",
    ".gg.....gg.",
    ".gg.....gg.",
    ".ggggggggg.",
    "..ggggggg..",
  ],
  "google-gemini": [
    ".....r.....",
    "....rrr....",
    "....rrr....",
    ".b..bbb..y.",
    ".bb.bbb.yy.",
    "bbbbbbyyyyy",
    ".bb.ggg.yy.",
    ".g..ggg..g.",
    "....ggg....",
    "....ggg....",
    ".....g.....",
  ],
  databricks: [
    "...oooooo..",
    "..oooooo...",
    "...........",
    "..oooooo...",
    ".oooooo....",
    "...........",
    "...RRRRRR..",
    "..RRRRRR...",
    "...........",
    "..RRRRRR...",
    ".RRRRRR....",
  ],
  // Emergent's monoline "e": a ring broken at the upper right, with the bar
  // sweeping diagonally up to meet the break (emergent.sh mark, monochrome).
  emergent: [
    "...eeee....",
    "..ee...ee..",
    ".ee.....ee.",
    "ee.....eee.",
    "ee...eee..e",
    "ee.eee....e",
    "eeee......e",
    ".ee......e.",
    "..ee...ee..",
    "...eeeee...",
  ],
  // OpenAI's six-fold knot. Hand-drawing this failed (at 11px it read as a
  // target, which is why the mark was dropped on the first pass); it is instead
  // rasterised from the geometry the real mark is built on — three congruent
  // elongated rings at 0°/60°/120°. Ring thickness is the whole game: fat rings
  // merge into a lumpy doughnut, thin ones keep the six lobes and the hexagonal
  // core. Needs 17 columns to resolve them, hence FOOTPRINT below.
  openai: [
    "....eee...eee....",
    "....e.ee.ee.e....",
    "...ee..eee..ee...",
    "...ee..eee..ee...",
    "....eeeeeeeee....",
    "..eeeee...eeeee..",
    ".ee.ee.....ee.ee.",
    "ee..ee.....ee..ee",
    ".ee.ee.....ee.ee.",
    "..eeeee...eeeee..",
    "....eeeeeeeee....",
    "...ee..eee..ee...",
    "...ee..eee..ee...",
    "....e.ee.ee.e....",
    "....eee...eee....",
  ],
  // Slack's four-arm pinwheel, rotationally symmetric around an empty centre.
  slack: [
    "....BB.....",
    "....BB.....",
    "....BBGGGG.",
    "....BBGGGG.",
    "....BB.....",
    ".PPPP.YY...",
    ".PPPP.YY...",
    ".....YY....",
    ".....YY....",
    "...........",
  ],
};

const CELL: Record<string, string> = {
  b: "bg-brand-g-blue",
  r: "bg-brand-g-red",
  y: "bg-brand-g-yellow",
  g: "bg-brand-g-green",
  R: "bg-brand-dbx-red",
  o: "bg-brand-dbx-orange",
  e: "bg-brand-mono",
  B: "bg-brand-slack-blue",
  G: "bg-brand-slack-green",
  Y: "bg-brand-slack-yellow",
  P: "bg-brand-slack-red",
};

/** Marks are normalised to this many columns so they occupy a matching box. */
const REF_COLS = 11;

/**
 * Optical-weight correction, in reference-box widths. Equal *width* is not equal
 * *presence*: Slack's arms are two cells thick and read solid, while OpenAI's
 * knot is a one-cell line — normalised to the same box it collapses into a grey
 * smudge (it needs ≥3px per cell to hold its lobes). Giving it a wider footprint
 * balances the two by ink, which is what the eye actually compares.
 */
const FOOTPRINT: Partial<Record<PixelLogoKind, number>> = { openai: 1.45 };

/**
 * `size` is the rem edge a REF_COLS-wide mark would use — 0.45 for the
 * certification windows (the original scale), ~0.2 for inline marks. Grids that
 * need more columns (OpenAI's knot needs 15) shrink their cell to keep the
 * overall footprint equal, so marks sitting side by side stay the same size.
 */
export function PixelLogo({
  kind,
  size = 0.45,
  label,
}: {
  kind: PixelLogoKind;
  size?: number;
  label?: string;
}) {
  const grid = GRIDS[kind];
  const cols = grid[0].length;
  const cell = (size * REF_COLS * (FOOTPRINT[kind] ?? 1)) / cols;
  // Below ~6px per cell the grid goes SOLID: gaps and corner rounding are a
  // constant device-pixel cost, so on a 1-cell-wide monoline mark (Emergent's
  // ring, Slack's arms, OpenAI's knot) they eat the stroke and it reads as
  // scattered dots. Large marks keep the visible pixel grid — the cert vernacular.
  const dense = cell < 0.4;
  const gap = dense ? 0 : cell / 8;
  return (
    <div
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : "true"}
      className="grid shrink-0"
      style={{
        gridTemplateColumns: `repeat(${cols}, ${cell}rem)`,
        // Rows pinned explicitly (not `auto`) and leading zeroed: left to content
        // sizing, sub-pixel rounding opened seams between rows, so a dense mark
        // merged horizontally but stayed striped vertically.
        gridAutoRows: `${cell}rem`,
        lineHeight: 0,
        gap: `${gap}rem`,
      }}
    >
      {grid.flatMap((row, y) =>
        row.split("").map((ch, x) => (
          <span
            key={`${y}-${x}`}
            style={{ height: `${cell}rem`, width: `${cell}rem` }}
            className={`${dense ? "" : "rounded-[1px]"} ${CELL[ch] ?? ""}`}
          />
        )),
      )}
    </div>
  );
}
