"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { worlds } from "@/content/site";
import { useChoreo } from "@/lib/choreo";

/**
 * Two Worlds (DESIGN-SPEC §3.4): giant typographic doors, ON PROD / OFF PROD.
 * Hover skews the title 1–2° and lifts a faint indigo wash. Reduced motion =
 * plain links, no transform.
 */
export function Worlds() {
  const { reduced } = useChoreo();

  return (
    <section aria-label="Two worlds" className="border-y border-volt-dim">
      {worlds.map((w) => (
        <Link
          key={w.href}
          href={w.href}
          className="group relative block overflow-hidden px-6 py-16 md:px-16 md:py-24"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-volt-dim opacity-0 transition-opacity duration-500 group-hover:opacity-15"
          />
          <div className="relative flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-4">
              <motion.span
                className="font-display text-[clamp(2.5rem,9vw,7rem)] font-bold leading-none tracking-tight text-bone"
                whileHover={reduced ? undefined : { skewX: -2, x: 8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {w.title}
              </motion.span>
              {"note" in w && w.note ? (
                <span className="max-w-md font-mono text-xs text-bone-dim/80">
                  {w.note}
                </span>
              ) : null}
              <ul className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-bone-dim">
                {w.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-volt-dim px-2 py-0.5 transition-colors group-hover:border-volt/60 group-hover:text-bone"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <span className="max-w-md font-mono text-sm text-bone-dim md:text-right">
              {w.blurb}
              <span className="ml-2 inline-block text-volt-bright transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          </div>
        </Link>
      ))}
    </section>
  );
}
