"use client";

import { motion } from "motion/react";
import { useChoreo } from "@/lib/choreo";
import { EASE_SITE } from "@/lib/choreo";
import { mind } from "@/content/mind";

/**
 * The "map of the mind" — an ER / design-flow diagram: a root entity (`ishan`)
 * branching into the three children the terminal below then expands (curiosity ·
 * obsessions · convictions). Decorative (aria-hidden); the terminal carries the
 * semantics + anchors. Desktop draws the horizontal entity graph in SVG with the
 * connectors stroking in on scroll; mobile falls back to a compact vertical flow.
 * Static + readable under reduced motion / no-JS.
 */
export function MindMap() {
  const { reduced, mounted } = useChoreo();
  const animate = mounted && !reduced;

  // child box centres on the 720-wide canvas
  const cx = [120, 360, 600];

  return (
    <div aria-hidden="true">
      {/* Desktop: horizontal ER graph */}
      <svg
        viewBox="0 0 720 280"
        className="hidden w-full md:block"
        fill="none"
        style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}
      >
        {/* connectors */}
        <motion.path
          d="M360 70 V120 M120 120 H600 M120 120 V168 M360 120 V168 M600 120 V168"
          stroke="var(--volt-dim)"
          strokeWidth="1.5"
          initial={animate ? { pathLength: 0, opacity: 0 } : false}
          whileInView={animate ? { pathLength: 1, opacity: 1 } : undefined}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: EASE_SITE }}
        />

        {/* root entity */}
        <motion.g
          initial={animate ? { opacity: 0, y: -8 } : false}
          whileInView={animate ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4, ease: EASE_SITE }}
        >
          <rect x="290" y="24" width="140" height="46" rx="6" stroke="var(--volt)" strokeWidth="1.5" />
          <text x="360" y="46" textAnchor="middle" fontSize="15" fill="var(--bone)">
            ishan
          </text>
          <text x="360" y="61" textAnchor="middle" fontSize="9" fill="var(--bone-dim)">
            $ whoami --deep
          </text>
        </motion.g>

        {/* children entities */}
        {mind.map((s, i) => (
          <motion.g
            key={s.id}
            initial={animate ? { opacity: 0, y: 10 } : false}
            whileInView={animate ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, ease: EASE_SITE, delay: 0.3 + i * 0.12 }}
          >
            <rect
              x={cx[i] - 92}
              y="168"
              width="184"
              height="64"
              rx="6"
              fill="var(--ink-raise)"
              stroke="var(--volt-dim)"
              strokeWidth="1.5"
            />
            <text x={cx[i]} y="198" textAnchor="middle" fontSize="14" fill="var(--volt-bright)">
              {s.label}
            </text>
            <text x={cx[i]} y="216" textAnchor="middle" fontSize="10" fill="var(--bone-dim)">
              {s.descriptor}
            </text>
          </motion.g>
        ))}
      </svg>

      {/* Mobile: vertical flow */}
      <div className="md:hidden">
        <div className="inline-block rounded-md border border-volt px-4 py-2 font-mono text-sm text-bone">
          ishan <span className="text-bone-dim">· $ whoami --deep</span>
        </div>
        <div className="ml-5 mt-1 border-l border-volt-dim pl-5">
          {mind.map((s) => (
            <div key={s.id} className="relative py-2.5">
              <span className="absolute top-1/2 -left-5 h-px w-5 bg-volt-dim" />
              <div className="rounded-md border border-volt-dim bg-ink-raise px-4 py-2 font-mono text-sm">
                <span className="text-volt-bright">{s.label}</span>{" "}
                <span className="text-bone-dim">— {s.descriptor}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
