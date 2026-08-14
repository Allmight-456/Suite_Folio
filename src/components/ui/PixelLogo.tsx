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
  | "slack";

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

/**
 * `size` is the pixel edge in rem — 0.45 for the certification windows (the
 * original scale), ~0.16 for the inline marks beside a timeline row.
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
  return (
    <div
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : "true"}
      className="grid shrink-0 gap-px"
      style={{ gridTemplateColumns: `repeat(${cols}, ${size}rem)` }}
    >
      {grid.flatMap((row, y) =>
        row.split("").map((ch, x) => (
          <span
            key={`${y}-${x}`}
            style={{ height: `${size}rem`, width: `${size}rem` }}
            className={`rounded-[1px] ${CELL[ch] ?? ""}`}
          />
        )),
      )}
    </div>
  );
}
