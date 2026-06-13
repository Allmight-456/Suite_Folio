import Link from "next/link";
import { projects, olderWork } from "@/content/projects";
import { Schematic, type SchematicKind } from "@/components/ui/Schematic";
import { Reveal, RevealItem } from "@/components/ui/Reveal";

/**
 * Hall of Fame (DESIGN-SPEC §3.5): the centerpiece. Artifact cards, each a
 * schematic "livery" + name/year + mono stat. Hover draws the schematic in
 * (D4-A) — pure CSS via [data-animate] toggled on group-hover. Cards are
 * links to /work/[slug]; the grid reads fully without JS.
 */

// which schematic each project wears (projects without a bespoke one reuse the
// closest structural cousin — pipeline for multi-agent, ast for retrieval).
const schematicFor: Record<string, SchematicKind> = {
  skillforge: "ast",
  autodocxpdf: "pipeline",
  ticketflow: "lock",
  "market-research": "pipeline",
  "ai-bubble": "ast",
};

export function Hall() {
  return (
    <section
      aria-label="Selected work"
      className="px-6 py-24 md:px-16 md:py-32"
    >
      <Reveal>
        <p className="font-mono text-sm lowercase text-bone-dim">
          $ ls ./work --sort=impact
        </p>
        <h2 className="font-display mt-2 text-[clamp(2rem,6vw,4rem)] font-bold tracking-tight text-bone">
          Hall of Fame
        </h2>
      </Reveal>

      <Reveal
        stagger
        className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((p) => (
          <RevealItem key={p.slug}>
            <Link
              href={`/work/${p.slug}`}
              className="group flex h-full flex-col rounded-md border border-volt-dim bg-ink-raise p-6 transition-colors hover:border-volt"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-2xl font-medium text-bone">
                  {p.name}
                </h3>
                <span className="shrink-0 font-mono text-xs text-bone-dim">
                  {p.year}
                  {p.wip && <span className="ml-2 text-volt">wip</span>}
                </span>
              </div>

              <div className="my-6 flex h-28 items-center justify-center text-bone-dim transition-colors group-hover:text-bone">
                <Schematic
                  kind={schematicFor[p.slug]}
                  className="h-full w-auto"
                  animate
                />
              </div>

              <p className="font-mono text-xs text-volt">{p.stat}</p>
              <p className="mt-3 text-sm leading-relaxed text-bone-dim">
                {p.oneLiner}
              </p>
            </Link>
          </RevealItem>
        ))}
      </Reveal>

      <Reveal className="mt-10 font-mono text-sm text-bone-dim">
        <span>older — </span>
        {olderWork.map((w, i) => (
          <span key={w.name}>
            <a href={w.href} className="transition-colors hover:text-bone">
              {w.name}
            </a>
            {i < olderWork.length - 1 && <span className="text-volt-dim"> · </span>}
          </span>
        ))}
      </Reveal>
    </section>
  );
}
