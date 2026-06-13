"use client";

import { motion } from "motion/react";
import { useChoreo } from "@/lib/choreo";

/**
 * The single site-wide reveal (DESIGN-SPEC §2): y:24→0 + fade on scroll-in.
 * Reduced motion collapses to a no-op via useChoreo. `as` lets callers keep
 * semantic markup (section/li/etc.); `stagger` turns children into a cascade.
 */
export function Reveal({
  children,
  className,
  stagger = false,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: boolean;
  as?: keyof typeof motion;
}) {
  const choreo = useChoreo();
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      variants={stagger ? choreo.stagger : choreo.reveal}
      initial={choreo.initial}
      whileInView="visible"
      viewport={choreo.viewport}
    >
      {children}
    </MotionTag>
  );
}

/** A child of a stagger Reveal — each one rides the parent's 60ms cascade. */
export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: keyof typeof motion;
}) {
  const choreo = useChoreo();
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag className={className} variants={choreo.reveal}>
      {children}
    </MotionTag>
  );
}
