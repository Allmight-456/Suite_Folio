import type { NowLog as NowLogData } from "@/content/schema";

/**
 * THE signature element (DESIGN-SPEC §3.7): a terminal pane rendering the
 * live-parsed now.log. The one sanctioned home for phosphor green. Server-
 * rendered from ISR data (no client fetch, no CLS) with a fixed min height
 * reserved. `tail -f` window chrome, right-aligned tags, synced footer.
 */
export function NowLog({ data }: { data: NowLogData }) {
  return (
    <section
      aria-label="now.log — what I'm building, running and reading"
      className="px-6 py-24 md:px-16 md:py-32"
    >
      <div className="mx-auto max-w-4xl overflow-hidden rounded-lg border border-volt-dim shadow-2xl">
        <div className="flex items-center gap-2 border-b border-volt-dim bg-ink-raise px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-volt-dim" />
          <span className="h-3 w-3 rounded-full bg-volt-dim" />
          <span className="h-3 w-3 rounded-full bg-volt-dim" />
          <span className="ml-3 font-mono text-xs text-bone-dim">
            ishan@prod:~$ tail -f ./now.log
          </span>
        </div>

        <div className="terminal-pane min-h-[420px] space-y-6 p-6 text-sm leading-relaxed md:p-8">
          {data.entries.map((e, i) => (
            <article key={i}>
              <header className="flex items-baseline justify-between gap-4">
                <h3 className="font-mono">
                  <span aria-hidden="true">{e.emoji} </span>
                  <span className="uppercase tracking-wider">[{e.tag}]</span>{" "}
                  <span className="text-bone">{e.title}</span>
                </h3>
              </header>
              <p className="mt-1 max-w-2xl font-mono text-xs leading-relaxed text-bone-dim">
                {stripMarkdown(e.bodyMd)}
              </p>
              {e.links.length > 0 && (
                <p className="mt-1 font-mono text-xs">
                  {e.links.map((l, j) => (
                    <a
                      key={j}
                      href={l.href}
                      className="mr-3 text-phosphor underline-offset-2 hover:underline"
                    >
                      ↳ {l.label}
                    </a>
                  ))}
                </p>
              )}
            </article>
          ))}

          <footer className="border-t border-volt-dim/40 pt-4 font-mono text-xs text-bone-dim">
            synced from {data.source} · {relativeTime(data.fetchedAt)}
          </footer>
        </div>
      </div>
    </section>
  );
}

/** Drop markdown link syntax / bold markers for plain terminal rendering. */
function stripMarkdown(md: string): string {
  return md
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  const mins = Math.round((Date.now() - then) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.round(hrs / 24)}d ago`;
}
