import type { Metadata } from "next";
import Link from "next/link";
import { NowLog } from "@/components/nowlog/NowLog";
import { Footer } from "@/components/footer/Footer";
import { getNowLog } from "@/lib/nowlog";

export const metadata: Metadata = {
  title: "now — Ishan Kumar",
  description: "What I'm building, running and reading. Live from GitHub.",
};

export default async function NowPage() {
  const nowlog = await getNowLog();
  return (
    <main id="main" className="pt-32">
      <div className="mx-auto flex max-w-4xl items-baseline justify-between gap-4 px-6 md:px-16">
        <Link
          href="/"
          className="font-mono text-sm text-bone-dim transition-colors hover:text-bone"
        >
          ← home
        </Link>
        {/* machine-readable endpoint kept, but tucked inline so it costs no space */}
        <a
          href="/now.json"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-bone-dim transition-colors hover:text-volt-bright"
        >
          /now.json ↗
        </a>
      </div>
      <NowLog data={nowlog} />
      {/* Same fix as /work: without this, the nav's #contact hash resolved to
          nothing on this route and the page had no way out. */}
      <Footer />
    </main>
  );
}
