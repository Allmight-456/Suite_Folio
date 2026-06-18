import { certs } from "@/content/site";
import type { Cert } from "@/content/schema";
import { Reveal, RevealItem } from "@/components/ui/Reveal";

/**
 * Certifications, presented like the skill card's window (owner-directed): one
 * window per credential, each with a pixel logo + the details. No terminal boot —
 * they're static, shown one after another. The logos use real brand colours (a
 * scoped, theme-independent exception to palette discipline — see globals.css brand
 * tokens + DECISION-LOG 2026-06-18): a 4-colour Google "G", a Google/Gemini spark,
 * and the Databricks stacked mark. Copy is sourced in CONTENT.md §8, never invented.
 */

// Brand pixel-art (chars → brand tokens). Google: b/r/y/g. Databricks: R/o.
const LOGOS: Record<Cert["logo"], string[]> = {
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
};

const CELL: Record<string, string> = {
  b: "bg-brand-g-blue",
  r: "bg-brand-g-red",
  y: "bg-brand-g-yellow",
  g: "bg-brand-g-green",
  R: "bg-brand-dbx-red",
  o: "bg-brand-dbx-orange",
};

function PixelLogo({ kind }: { kind: Cert["logo"] }) {
  const grid = LOGOS[kind];
  const cols = grid[0].length;
  return (
    <div
      aria-hidden="true"
      className="grid gap-px"
      style={{ gridTemplateColumns: `repeat(${cols}, 0.45rem)` }}
    >
      {grid.flatMap((row, y) =>
        row.split("").map((ch, x) => (
          <span
            key={`${y}-${x}`}
            className={`h-[0.45rem] w-[0.45rem] rounded-[1px] ${CELL[ch] ?? ""}`}
          />
        )),
      )}
    </div>
  );
}

export function Certifications() {
  return (
    <section aria-label="Certifications" className="px-6 py-20 md:px-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-sm text-bone-dim">
          <span className="text-volt-bright">$ cat ~/certifications</span>
        </p>
        <h2 className="font-display mt-2 text-2xl font-bold tracking-tight text-bone">
          Certifications
        </h2>

        <Reveal as="ul" stagger className="mt-8 space-y-6">
          {certs.map((cert) => (
            <RevealItem as="li" key={cert.name}>
              <div className="overflow-hidden rounded-lg border border-volt-dim bg-ink-raise shadow-2xl">
                <div className="flex items-center gap-2 border-b border-volt-dim px-4 py-3">
                  <span className="h-3 w-3 rounded-full bg-volt-dim" />
                  <span className="h-3 w-3 rounded-full bg-volt-dim" />
                  <span className="h-3 w-3 rounded-full bg-volt-dim" />
                  <span className="ml-3 truncate font-mono text-xs text-bone-dim">
                    {cert.issuerFull} ─ {cert.id}
                  </span>
                </div>

                <div className="grid items-center gap-6 p-6 md:grid-cols-[auto_1fr] md:gap-8 md:p-8">
                  <div className="justify-self-center md:justify-self-start">
                    <PixelLogo kind={cert.logo} />
                  </div>

                  <div>
                    <p className="font-mono text-xs text-bone-dim">
                      {cert.issuerFull} · {cert.date}
                    </p>
                    <h3 className="font-display mt-1 text-xl font-semibold leading-snug text-bone">
                      {cert.name}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-bone-dim">
                      {cert.blurb}
                    </p>

                    <ul className="mt-3 flex flex-wrap gap-2 font-mono text-[11px]">
                      {cert.skills.map((s) => (
                        <li
                          key={s}
                          className="rounded border border-volt-dim/60 px-2 py-0.5 text-volt-bright"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>

                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block font-mono text-xs text-volt-bright underline-offset-2 hover:underline"
                    >
                      verify ↗
                    </a>
                  </div>
                </div>
              </div>
            </RevealItem>
          ))}
        </Reveal>

        <p className="mt-8 border-t border-volt-dim/40 pt-6 font-mono text-xs text-bone-dim">
          <a
            href="https://www.linkedin.com/in/ishan-kumar-/details/certifications/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-volt-bright hover:underline"
          >
            ↗ all certifications on LinkedIn
          </a>
        </p>
      </div>
    </section>
  );
}
