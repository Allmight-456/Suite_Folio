"use client";

import { useEffect, useState, type RefObject } from "react";
import { useScroll, useTransform } from "motion/react";
import { useChoreo } from "@/lib/choreo";

/**
 * Pinned horizontal scroll (CLAUDE.md convention: one hook owns the reduced-motion
 * branch). The outer section is `count * 100vh` tall; an inner sticky track is
 * translated on X by the section's scroll progress, so vertical scrolling walks
 * sideways through the panels (Shopify-Editions feel).
 *
 * `pinned` is the single gate: false until mounted, under prefers-reduced-motion,
 * and on narrow viewports (horizontal scroll-jacking is poor on phones and must
 * never gate content). When false, the component renders the panels as a plain
 * vertical stack — fully readable, zero motion (hard rules 3 + 5).
 */
export function useJourneyChoreo(
  sectionRef: RefObject<HTMLElement | null>,
  count: number,
) {
  const { reduced, mounted } = useChoreo();
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Hooks must run unconditionally; the result is simply ignored when unpinned.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", `-${(count - 1) * 100}vw`],
  );

  return { pinned: mounted && !reduced && wide, x, progress: scrollYProgress };
}
