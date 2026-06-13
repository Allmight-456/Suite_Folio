import Link from "next/link";
import { projects, olderWork } from "@/content/projects";
import { clientWork, fieldNotesGroup, type WorkRow } from "@/content/knowledge";
import { Schematic, type SchematicKind } from "@/components/ui/Schematic";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Explorable terminal index (owner-directed redesign, replaces the card grid).
 * `ls -la ./work` over three directories — personal projects, client work, and
 * field notes (learnings) — each row expandable. Rows are native <details> so
 * they open without JS (hard rule 5); projects link out to their deep dives.
 * Phosphor stays in now.log — this index speaks the site's indigo voice.
 */

const schematicFor: Record<string, SchematicKind> = {
  skillforge: "ast",
  autodocxpdf: "pipeline",
  ticketflow: "lock",
  "market-research": "pipeline",
  "ai-bubble": "ast",
};

const personalRows: WorkRow[] = projects.map((p) => ({
  name: p.slug,
  meta: `${p.stat} · ${p.year}`,
  detail: p.oneLiner,
  href: `/work/${p.slug}`,
  tag: p.wip ? "wip" : undefined,
}));

export function WorkIndex() {
  return (
    <section
      id="work"
      aria-label="Selected work and field notes"
      className="px-6 py-24 md:px-16 md:py-32"
    >
      <Reveal>
        <p className="font-mono text-sm text-bone-dim">
          ishan@prod:~$ ls -la ./work
        </p>
        <h2 className="font-display mt-2 text-[clamp(2rem,6vw,4rem)] font-bold tracking-tight text-bone">
          The Index
        </h2>
        <p className="mt-3 max-w-xl font-mono text-xs text-bone-dim">
          shipped, for clients, and in the lab — open any row to expand.
        </p>
      </Reveal>

      <Reveal className="mt-12 space-y-10">
        <Directory dir="personal/" note="my repos" rows={personalRows} schematics />
        <Directory dir={clientWork.dir} note={clientWork.note} rows={clientWork.rows} />
        <Directory
          dir={fieldNotesGroup.dir}
          note={fieldNotesGroup.note}
          rows={fieldNotesGroup.rows}
        />

        <p className="border-t border-volt-dim pt-6 font-mono text-xs text-bone-dim">
          <span className="text-volt-bright">older/</span>{" "}
          {olderWork.map((w, i) => (
            <span key={w.name}>
              <a href={w.href} className="transition-colors hover:text-bone">
                {w.name}
              </a>
              {i < olderWork.length - 1 && " · "}
            </span>
          ))}
        </p>
      </Reveal>
    </section>
  );
}

function Directory({
  dir,
  note,
  rows,
  schematics = false,
}: {
  dir: string;
  note?: string;
  rows: WorkRow[];
  schematics?: boolean;
}) {
  return (
    <div>
      <p className="font-mono text-sm">
        <span className="text-volt-bright">drwx</span>{" "}
        <span className="text-bone">{dir}</span>
        {note && <span className="ml-2 text-bone-dim">({note})</span>}
      </p>
      <ul className="mt-2 border-l border-volt-dim">
        {rows.map((row) => (
          <li key={row.name} className="border-b border-volt-dim/30 last:border-0">
            <Row row={row} kind={schematics ? schematicFor[row.name] : undefined} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Row({ row, kind }: { row: WorkRow; kind?: SchematicKind }) {
  return (
    <details className="index-row group">
      <summary className="flex cursor-pointer list-none items-baseline gap-3 py-3 pl-4 pr-2 font-mono text-sm transition-colors hover:bg-ink-raise">
        <span className="index-caret text-volt-bright">▸</span>
        <span className="text-bone transition-colors group-hover:text-volt-bright">
          {row.name}
        </span>
        {row.tag && <span className="text-volt-bright">{row.tag}</span>}
        <span className="ml-auto whitespace-nowrap pl-3 text-xs text-bone-dim">
          {row.meta}
        </span>
      </summary>

      <div className="flex items-start gap-5 pb-5 pl-8 pr-3">
        {kind && (
          <div className="hidden h-16 w-20 shrink-0 text-bone-dim sm:block">
            <Schematic kind={kind} className="h-full w-full" />
          </div>
        )}
        <div>
          <p className="max-w-2xl text-sm leading-relaxed text-bone-dim">
            {row.detail}
          </p>
          {row.href && (
            <Link
              href={row.href}
              className="mt-2 inline-block font-mono text-xs text-volt-bright hover:underline"
            >
              cat ./{row.name} →
            </Link>
          )}
        </div>
      </div>
    </details>
  );
}
