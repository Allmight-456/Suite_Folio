"use client";

import Link from "next/link";
import { useHeroChoreo } from "./useHeroChoreo";

/**
 * The live now.log chip, typed on like a prompt after the name settles.
 * Server markup carries the full text (no-JS users see it complete once the
 * CSS chip-in delay passes); hydration restarts it as a typing sequence.
 */
export function HeroChip({ text }: { text: string }) {
  const { typed, typing } = useHeroChoreo(text);

  return (
    <Link
      href="/now"
      className="inline-flex items-center gap-2 border border-volt-dim bg-ink-raise px-4 py-2 font-mono text-sm text-bone transition-colors hover:border-volt"
    >
      <span className="sr-only">{text} — see the full now.log</span>
      <span aria-hidden="true">
        {typed}
        <span
          className={`ml-px inline-block h-[1.1em] w-[0.55em] translate-y-[0.18em] bg-volt ${
            typing ? "" : "cursor-blink"
          }`}
        />
      </span>
    </Link>
  );
}
