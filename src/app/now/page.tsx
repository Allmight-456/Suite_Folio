import type { Metadata } from "next";
import Link from "next/link";
import { NowLog } from "@/components/nowlog/NowLog";
import { getNowLog } from "@/lib/nowlog";

export const metadata: Metadata = {
  title: "now — Ishan Kumar",
  description: "What I'm building, running and reading. Live from GitHub.",
};

export default async function NowPage() {
  const nowlog = await getNowLog();
  return (
    <main id="main" className="px-6 pt-32 md:px-16">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="font-mono text-sm text-bone-dim transition-colors hover:text-bone"
        >
          ← home
        </Link>
        <p className="mt-8 font-mono text-sm text-bone-dim">
          machine-readable:{" "}
          <a href="/now.json" className="text-volt hover:underline">
            /now.json
          </a>
        </p>
      </div>
      <NowLog data={nowlog} />
    </main>
  );
}
