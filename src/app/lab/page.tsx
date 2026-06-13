import type { Metadata } from "next";
import Link from "next/link";
import { labBlocks, writingLinks } from "@/content/lab";
import { Reveal, RevealItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "lab — Ishan Kumar",
  description: "Agent boxes, evals, experiments — and what breaks at 3am.",
};

export default function LabPage() {
  return (
    <main id="main" className="px-6 pb-32 pt-32 md:px-16">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="font-mono text-sm text-bone-dim transition-colors hover:text-bone"
        >
          ← home
        </Link>
        <h1 className="font-display mt-8 text-[clamp(2.5rem,8vw,5rem)] font-bold tracking-tight text-bone">
          Off Prod
        </h1>
        <p className="mt-3 max-w-xl font-mono text-sm text-bone-dim">
          Agent boxes, evals, experiments — and what breaks at 3am.
        </p>

        <Reveal stagger className="mt-12 space-y-px">
          {labBlocks.map((b) => (
            <RevealItem
              key={b.title}
              className="border-t border-volt-dim py-8"
            >
              <h2 className="font-display text-2xl text-bone">{b.title}</h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-bone-dim">
                {b.body}
              </p>
            </RevealItem>
          ))}
        </Reveal>

        <div className="mt-16 border-t border-volt-dim pt-8">
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
