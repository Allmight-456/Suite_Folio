"use client";

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
  return {
    reduced: !!reduced,
    reveal: reduced ? revealReduced : reveal,
    stagger: reduced ? revealReduced : stagger,
    viewport: { once: true, amount: 0.3 } as const,
  };
}
