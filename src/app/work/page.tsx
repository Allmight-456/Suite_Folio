import type { Metadata } from "next";
import Link from "next/link";
import { MindExplorer } from "@/components/mind/MindExplorer";
import { Certifications } from "@/components/certs/Certifications";

export const metadata: Metadata = {
  title: "what pulls me — Ishan Kumar",
  description:
    "Curiosity, obsessions and convictions — the interests, passions and lessons behind the builds.",
};

/**
 * /work, reconceived as a personal map (owner-directed). Work experience already
 * lives in the homepage `uptime --career`, so this isn't a project index — it's
 * what pulls me, framed as three children off "ishan": curiosity · obsessions ·
 * convictions. An ER/flow diagram maps them; clicking a node — or scrolling — runs
 * the matching command in a single pinned terminal (MindExplorer), instead of one
 * long stacked window. Certifications follow as skill-card-style windows.
 * /lab 301s to #field-notes (the terminal section).
 */
export default function WorkPage() {
  return (
    <main id="main" className="pb-32 pt-32">
      <div className="mx-auto max-w-3xl px-6 md:px-16">
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
      </div>

      <MindExplorer />

      <Certifications />
    </main>
  );
}
