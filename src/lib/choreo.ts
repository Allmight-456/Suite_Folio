"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import type { Variants, Transition } from "motion/react";

/**
 * The single site-wide choreography grammar (DESIGN-SPEC §2):
 * y:24→0 + fade, 0.6s, ease [0.22,1,0.36,1], 60ms stagger.
 * Every scroll choreography consumes these via useChoreo so the
 * reduced-motion branch is testable in one place.
 */
export const EASE_SITE = [0.22, 1, 0.36, 1] as const;

export const revealTransition: Transition = {
  duration: 0.6,
  ease: EASE_SITE,
};

const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: revealTransition },
};

const revealReduced: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

export function useChoreo() {
  const reduced = useReducedMotion();
  // `mounted` is false during SSR and the first client paint, so anything
  // that branches on it renders identically on both sides (no hydration
  // mismatch) — and content is never gated on JS. Motion enhances after mount.
  const [mounted, setMounted] = useState(false);
  // Canonical "has hydrated" flag: the one-shot flip after mount is the intended
  // signal, not a render cascade — content is visible before it, enhanced after.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const inert = !mounted || !!reduced;

  return {
    reduced: !!reduced,
    mounted,
    // Before mount (and under reduced motion) variants are inert → content is
    // visible and static. After mount, the real reveal/stagger kicks in.
    reveal: inert ? revealReduced : reveal,
    stagger: inert ? revealReduced : stagger,
    // Until mounted, render at the resting "visible" state so SSR HTML shows
    // the content; switch to "hidden" entrance only once motion can drive it.
    initial: inert ? "visible" : "hidden",
    viewport: { once: true, amount: 0.3 } as const,
  };
}
