"use client";

import { useEffect, useState } from "react";

/**
 * Shared terminal primitives — a blinking block cursor and the Claude-Code-style
 * "busy" spinner. Extracted from components/journey so the skills boot terminal
 * reuses the exact same vernacular (one source of truth). Both honour the accent
 * via tokens; the cursor stops blinking under reduced motion (.cursor-blink rule).
 */

/** Blinking block cursor (--volt). .cursor-blink is killed under reduced motion. */
export function TerminalCursor() {
  return (
    <span className="cursor-blink ml-0.5 inline-block h-[1.05em] w-[0.5em] translate-y-[0.15em] bg-volt align-middle" />
  );
}

const SPIN_GLYPHS = ["✻", "✶", "✳", "✺", "✸"];
const DEFAULT_WORDS = ["booting", "running", "loading", "compiling"];

/**
 * Claude-Code-flavoured spinner: a cycling asterisk + gerund shown while a command
 * "runs". Only mounted while busy, so the interval idles the rest of the time.
 * Pass `words` to tune the verb set (e.g. the skills card streams "loading…").
 */
export function TerminalSpinner({ words = DEFAULT_WORDS }: { words?: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => v + 1), 120);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="flex items-center gap-2">
      <span className="text-volt-bright">{SPIN_GLYPHS[i % SPIN_GLYPHS.length]}</span>
      <span className="italic text-bone-dim">
        {words[Math.floor(i / 7) % words.length]}…
      </span>
    </span>
  );
}
