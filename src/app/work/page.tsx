import type { Metadata } from "next";
import Link from "next/link";
import { experience } from "@/content/site";
import { writingLinks } from "@/content/lab";
import { WorkIndex } from "@/components/index/WorkIndex";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "work — Ishan Kumar",
  description:
    "Production systems, client work, and field notes — the full index.",
};

/**
 * The canonical, exhaustive index (redundancy cleanup): personal repos, client
 * work, and field notes all live here via WorkIndex, with the experience timeline
 * up top. The homepage Journey only summarizes and links in — no fact is stated
 * in two places. /lab redirects to #field-notes here.
 */
export default function WorkPage() {
  return (
    <main id="main" className="px-6 pb-32 pt-32 md:px-16">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="font-mono text-sm text-bone-dim transition-colors hover:text-bone"
        >
          ← home
        </Link>
        <h1 className="font-display mt-8 text-[clamp(2.5rem,8vw,5rem)] font-bold tracking-tight text-bone">
          On Prod
        </h1>
        <p className="mt-3 max-w-xl font-mono text-sm text-bone-dim">
          Production systems, the constraints they survived, and what I learn off
          prod.
        </p>

        <Reveal className="mt-12">
          <h2 className="font-mono text-sm uppercase tracking-wider text-bone-dim">
            $ uptime --career
          </h2>
          <ul className="mt-4 space-y-2 font-mono text-sm">
            {experience.map((e) => (
              <li
                key={e.role}
                className="flex flex-col gap-1 md:flex-row md:gap-6"
              >
                <span className="text-bone-dim md:w-56">{e.period}</span>
                <span className="text-bone">{e.role}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <WorkIndex />

      <div className="mx-auto max-w-5xl px-0 md:px-16">
        <div className="border-t border-volt-dim pt-8">
          <h2 className="font-mono text-sm uppercase tracking-wider text-bone-dim">
            Writing
          </h2>
          <ul className="mt-4 flex flex-wrap gap-6 font-mono text-sm">
            {writingLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-volt-bright hover:underline">
                  {l.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
