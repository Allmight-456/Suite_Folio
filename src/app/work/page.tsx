import type { Metadata } from "next";
import Link from "next/link";
import { certs } from "@/content/site";
import { MindMap } from "@/components/mind/MindMap";
import { MindTerminal } from "@/components/mind/MindTerminal";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "what pulls me — Ishan Kumar",
  description:
    "Curiosity, obsessions and convictions — the interests, passions and lessons behind the builds.",
};

/**
 * /work, reconceived as a personal map (owner-directed). Work experience already
 * lives in the homepage `uptime --career`, so this isn't a project index — it's
 * what pulls me, framed as three children off "ishan": curiosity · obsessions ·
 * convictions. An ER/flow diagram maps them; the terminal below types a command
 * per section and lays out its content (projects woven in as `↳ evidence` links).
 * /lab 301s to #field-notes (the terminal section).
 */
export default function WorkPage() {
  return (
    <main id="main" className="px-6 pb-32 pt-32 md:px-16">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="font-mono text-sm text-bone-dim transition-colors hover:text-bone"
        >
          ← home
        </Link>
        <p className="mt-8 font-mono text-sm text-bone-dim">$ whoami --deep</p>
        <h1 className="font-display mt-2 text-[clamp(2.5rem,8vw,5rem)] font-bold tracking-tight text-bone">
          What Pulls Me
        </h1>
        <p className="mt-3 max-w-xl font-mono text-sm text-bone-dim">
          Not a résumé — that&apos;s the{" "}
          <Link href="/#main" className="text-volt-bright hover:underline">
            uptime --career
          </Link>{" "}
          line. This is the map of what I&apos;m drawn to.
        </p>

        <Reveal className="mt-14">
          <MindMap />
        </Reveal>
      </div>

      <MindTerminal />

      <div className="mx-auto max-w-3xl">
        <p className="border-t border-volt-dim/40 pt-6 font-mono text-xs text-bone-dim">
          <span className="text-volt-bright">$ cat certifications.log</span>
          {"  "}
          {certs.map((c, i) => (
            <span key={c.id}>
              {i > 0 && " · "}
              {c.issuer} {c.name} ({c.date})
            </span>
          ))}{" "}
          <a
            href="https://www.linkedin.com/in/ishan-kumar-/details/certifications/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-volt-bright hover:underline"
          >
            ↗ verify
          </a>
        </p>
      </div>
    </main>
  );
}
