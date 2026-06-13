"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import { ScrollRestoration } from "./ScrollRestoration";

/**
 * Lenis smooth scroll, disabled entirely under prefers-reduced-motion
 * (hard rule 3: content must be fully readable with zero JS motion).
 *
 * ScrollRestoration rides along inside this provider so it can talk to the
 * Lenis instance when present, and falls back to window scrolling when Lenis is
 * off (reduced motion). Either way Back/Forward returns you to where you were.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  if (reduced)
    return (
      <>
        <ScrollRestoration />
        {children}
      </>
    );

  return (
    <ReactLenis root options={{ lerp: 0.12, wheelMultiplier: 1 }}>
      <ScrollRestoration />
      {children}
    </ReactLenis>
  );
}
