"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";

/**
 * Lenis smooth scroll, disabled entirely under prefers-reduced-motion
 * (hard rule 3: content must be fully readable with zero JS motion).
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.12, wheelMultiplier: 1 }}>
      {children}
    </ReactLenis>
  );
}
