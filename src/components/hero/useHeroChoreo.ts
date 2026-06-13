"use client";

import { useEffect, useState } from "react";
import { useChoreo } from "@/lib/choreo";

/** Name settle is pure CSS (hero.module.css); the CSS chip-in delay hides the reset. */
const TYPE_START_MS = 1000;
const TYPE_CHAR_MS = 45;

/**
 * Variant A choreography (CLAUDE.md convention: one hook owns the
 * reduced-motion branch). Drives the chip type-on; reduced motion or
 * pre-hydration = full text immediately.
 */
export function useHeroChoreo(text: string) {
  const { reduced } = useChoreo();
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    if (reduced) return;
    let i = 0;
    let interval: ReturnType<typeof setInterval>;
    // setCount lives inside the timeout (not the effect body) so the typing
    // reset isn't a synchronous render cascade — the CSS chip-in delay
    // (1s, == TYPE_START_MS) keeps the chip invisible until typing begins.
    const start = setTimeout(() => {
      setCount(0);
      interval = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) clearInterval(interval);
      }, TYPE_CHAR_MS);
    }, TYPE_START_MS);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [text, reduced]);

  const typed = count === null || reduced ? text : text.slice(0, count);
  const typing = !reduced && count !== null && count < text.length;

  return { typed, typing, reduced };
}
