"use client";

import { Fragment, useRef } from "react";
import { motion } from "motion/react";
import { skills } from "@/content/skills";
import { EASE_SITE } from "@/lib/choreo";
import { TerminalCursor, TerminalSpinner } from "@/components/ui/Terminal";
import { useTerminalBoot } from "@/components/ui/useTerminalBoot";
import { ThemeSwatches } from "./ThemeSwatches";

const PROMPT = "ishan@prod:~$";
const COMMAND = "skill --all";

// Pixel robot/agent head (owner pick), built as a token-coloured pixel grid so it
// recolours per theme. Chars: '.' empty · 'o' --volt body · 'x' --volt-bright eyes ·
// '#' --bone grill/antenna. Accent only — phosphor stays quarantined to now.log.
const ROBOT = [
  "....#.#....",
  "....o.o....",
  "..ooooooo..",
  ".ooooooooo.",
  ".oxxoooxxo.",
  ".oxxoooxxo.",
  ".ooooooooo.",
  ".oo#####oo.",
  "..ooooooo..",
  "...o...o...",
];
const CELL: Record<string, string> = {
  o: "bg-volt",
  x: "bg-volt-bright",
  "#": "bg-bone",
};

function PixelRobot() {
  const cols = ROBOT[0].length;
  return (
    <div
      aria-hidden="true"
      className="grid gap-px"
      style={{ gridTemplateColumns: `repeat(${cols}, 0.5rem)` }}
    >
      {ROBOT.flatMap((row, y) =>
        row.split("").map((ch, x) => (
          <span
            key={`${y}-${x}`}
            className={`h-2 w-2 rounded-[1px] ${CELL[ch] ?? ""}`}
          />
        )),
      )}
    </div>
  );
}

/**
 * The skills card, booted as a terminal (owner-directed: the static card needed
 * the site's life). useTerminalBoot opens the window, types `skill --all`, beats a
 * spinner, then streams the category rows like Claude Code's TUI. Pre-mount /
 * reduced-motion / no-JS render the fully-booted state (every skill, command
 * pre-typed). Site accent only; niche items are painted in the accent so the
 * depth catches the eye. Footer colour-blocks = the live theme picker.
 */
export function Stack() {
  const sectionRef = useRef<HTMLElement>(null);
  const { enhanced, typedText, cursor, busy, revealed } = useTerminalBoot(
    sectionRef,
    COMMAND,
    skills.length,
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Skills"
      className="px-6 py-24 md:px-16 md:py-28"
    >
      <h2 className="sr-only">Skills</h2>

      <motion.div
        initial={enhanced ? { opacity: 0, scale: 0.97 } : false}
        whileInView={enhanced ? { opacity: 1, scale: 1 } : undefined}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.4, ease: EASE_SITE }}
        className="mx-auto max-w-4xl overflow-hidden rounded-lg border border-volt-dim bg-ink-raise shadow-2xl"
      >
        <div className="flex items-center gap-2 border-b border-volt-dim px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-volt-dim" />
          <span className="h-3 w-3 rounded-full bg-volt-dim" />
          <span className="h-3 w-3 rounded-full bg-volt-dim" />
          <span className="ml-3 truncate font-mono text-xs text-bone-dim">
            {PROMPT} {typedText}
          </span>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-[auto_1fr] md:gap-10 md:p-8">
          <div className="hidden self-center md:block">
            <PixelRobot />
          </div>

          <div>
            <p className="font-mono text-sm text-bone">
              <span className="text-volt-bright">{PROMPT}</span> {typedText}
              {cursor && <TerminalCursor />}
            </p>

            <div className="mt-3 h-4 font-mono text-xs">
              {busy && <TerminalSpinner words={["loading", "reading", "indexing"]} />}
            </div>

            <ul className="mt-3 flex flex-col gap-3">
              {skills.map((group, i) => {
                const shown = i < revealed;
                return (
                  <li
                    key={group.label}
                    style={{
                      opacity: shown ? 1 : 0,
                      transform: shown ? "none" : "translateY(6px)",
                      transition: enhanced
                        ? "opacity 0.28s var(--ease-site), transform 0.28s var(--ease-site)"
                        : "none",
                    }}
                    className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-4"
                  >
                    <span className="shrink-0 font-mono text-xs uppercase tracking-wider text-volt sm:w-36">
                      {group.label}
                    </span>
                    <span className="font-mono text-sm leading-relaxed">
                      {group.items.map((item, j) => {
                        const name = typeof item === "string" ? item : item.name;
                        const detail =
                          typeof item === "string" ? undefined : item.detail;
                        const niche =
                          typeof item === "string" ? false : !!item.niche;
                        return (
                          <Fragment key={name}>
                            {j > 0 && <span className="text-volt-dim"> · </span>}
                            <span
                              title={detail}
                              className={`${niche ? "text-volt-bright" : "text-bone-dim"} ${
                                detail
                                  ? "cursor-help underline decoration-volt-dim decoration-dotted underline-offset-2"
                                  : ""
                              }`}
                            >
                              {name}
                            </span>
                          </Fragment>
                        );
                      })}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-volt-dim/40 px-6 py-4 md:px-8">
          <ThemeSwatches />
          <span className="font-mono text-xs text-bone-dim">
            ← click a swatch to re-theme the site
          </span>
        </div>
      </motion.div>
    </section>
  );
}
