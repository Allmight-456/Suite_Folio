import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/content/projects";
import { experience } from "@/content/site";
import { Reveal, RevealItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "work — Ishan Kumar",
  description: "Production systems, migrations, and the constraints they survived.",
};

export default function WorkIndex() {
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
          Production systems, migrations, and the constraints they survived.
        </p>

        <Reveal stagger className="mt-12 divide-y divide-volt-dim border-y border-volt-dim">
          {projects.map((p) => (
            <RevealItem key={p.slug}>
              <Link
                href={`/work/${p.slug}`}
                className="group flex flex-col gap-2 py-6 md:flex-row md:items-baseline md:justify-between"
              >
                <span className="font-display text-2xl text-bone transition-colors group-hover:text-volt">
                  {p.name}
                </span>
                <span className="font-mono text-xs text-bone-dim md:text-right">
                  {p.stat} · {p.year}
                </span>
              </Link>
            </RevealItem>
          ))}
        </Reveal>

        <h2 className="mt-20 font-mono text-sm uppercase tracking-wider text-bone-dim">
          $ uptime --career
        </h2>
        <ul className="mt-4 space-y-2 font-mono text-sm">
          {experience.map((e) => (
            <li key={e.role} className="flex flex-col gap-1 md:flex-row md:gap-6">
              <span className="text-bone-dim">{e.period}</span>
              <span className="text-bone">{e.role}</span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
