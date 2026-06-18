"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { mind } from "@/content/mind";
import type { MindSection } from "@/content/schema";
import { EASE_SITE } from "@/lib/choreo";
import { TerminalCursor, TerminalSpinner } from "@/components/ui/Terminal";
import { MindMap } from "./MindMap";
import { useMindChoreo } from "./useMindChoreo";

const PROMPT = "ishan@prod:~$";
const commands = mind.map((s) => s.command);

/**
 * /work "what pulls me", run as a single pinned terminal session. The tree
 * (MindMap) sits above; clicking a node, or scrolling through the pinned section,
 * runs `clear` and retypes the next command (curiosity / obsessions / convictions)
 * — so the window re-paints instead of elongating (owner-directed, see
 * useMindChoreo). Pre-mount / reduced-motion / narrow fall back to a plain readable
 * stack with every section + ↳ evidence link present (hard rules 3 + 5).
 */
export function MindExplorer() {
  const sectionRef = useRef<HTMLElement>(null);
  const { pinned, step, text, typed, outputVisible, cursor, busy, activeDot, goTo } =
    useMindChoreo(sectionRef, commands);

  const shown = text.slice(0, typed); // characters revealed so far (typewriter)

  const tree = (
    <div className="mx-auto mt-14 max-w-3xl px-6 md:px-16">
      <MindMap active={pinned ? activeDot : -1} onSelect={goTo} pinned={pinned} />
    </div>
  );

  // Stacked: server render + mobile + reduced-motion. Every section, readable.
  if (!pinned) {
    return (
      <>
        {tree}
        <section
          ref={sectionRef}
          id="field-notes"
          aria-label="What pulls me — curiosity, obsessions, convictions"
          className="scroll-mt-20 px-6 py-12 md:px-16"
        >
          <div className="mx-auto max-w-3xl space-y-12">
            {mind.map((section) => (
              <div key={section.id} id={section.id} className="scroll-mt-24">
                <p className="font-mono text-sm text-bone">
                  <span className="text-volt-bright">{PROMPT}</span> {section.command}
                </p>
                <div className="mt-5">
                  <MindItems section={section} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </>
    );
  }

  // Pinned: one terminal window; scroll (or a tree click) runs the commands.
  return (
    <>
      {tree}
      <section
        ref={sectionRef}
        id="field-notes"
        aria-label="What pulls me — curiosity, obsessions, convictions"
        style={{ height: `${mind.length * 100}vh` }}
        className="relative scroll-mt-20"
      >
        <div className="sticky top-0 flex h-screen items-center px-6 md:px-16">
          <div className="mx-auto w-full max-w-3xl">
            <div className="overflow-hidden rounded-lg border border-volt-dim shadow-2xl">
              <div className="flex items-center gap-2 border-b border-volt-dim bg-ink-raise px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-volt-dim" />
                <span className="h-3 w-3 rounded-full bg-volt-dim" />
                <span className="h-3 w-3 rounded-full bg-volt-dim" />
                <span className="ml-3 truncate font-mono text-xs text-bone-dim">
                  ishan@prod ─ ~/mind
                </span>
              </div>

              <div className="min-h-[460px] bg-ink-raise p-6 md:p-8">
                <p className="font-mono text-sm text-bone">
                  <span className="text-volt-bright">{PROMPT}</span> {shown}
                  {cursor && <TerminalCursor />}
                </p>

                <motion.div
                  initial={false}
                  animate={
                    outputVisible
                      ? { opacity: 1, y: 0, filter: "blur(0px)" }
                      : { opacity: 0, y: 10, filter: "blur(3px)" }
                  }
                  transition={{ duration: 0.42, ease: EASE_SITE }}
                  className="mt-5"
                >
                  <MindItems section={mind[step]} />
                </motion.div>
              </div>

              <MindStatusBar active={activeDot} busy={busy} onSelect={goTo} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function MindItems({ section }: { section: MindSection }) {
  const isCommits = section.id === "convictions";
  return (
    <ul className="space-y-4">
      {section.items.map((item) => (
        <li key={item.name}>
          <p className="font-mono text-sm">
            <span className="text-volt-bright">{isCommits ? hash7(item.name) : "#"}</span>{" "}
            <span className="text-bone">{item.name}</span>
          </p>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-bone-dim">{item.detail}</p>
          {item.evidence && item.evidence.length > 0 && (
            <p className="mt-1.5 font-mono text-xs">
              {item.evidence.map((e) => (
                <Link
                  key={e.slug}
                  href={`/work/${e.slug}`}
                  className="mr-4 text-volt-bright underline-offset-2 hover:underline"
                >
                  ↳ {e.label}
                </Link>
              ))}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}

/**
 * tmux/Claude-Code-style status line — mirrors the Journey window. Left: a spinner
 * while a command runs, else a ready marker. Right: the three sections as clickable
 * breadcrumbs (active lit) so you can jump while pinned, plus an [n/total] counter.
 */
function MindStatusBar({
  active,
  busy,
  onSelect,
}: {
  active: number;
  busy: boolean;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-volt-dim bg-ink px-4 py-2.5 font-mono text-[11px]">
      <span className="flex min-w-[7rem] items-center gap-2">
        {busy ? (
          <TerminalSpinner />
        ) : (
          <>
            <span className="text-volt-bright">▸</span>
            <span className="text-bone-dim">ready</span>
          </>
        )}
      </span>
      <span className="flex items-center gap-2.5">
        {mind.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onSelect(i)}
            aria-current={i === active ? "true" : undefined}
            className={`rounded px-1 transition-colors hover:text-volt-bright ${
              i === active ? "text-volt-bright" : "text-bone-dim/50"
            }`}
          >
            {s.id}
          </button>
        ))}
        <span className="ml-1 rounded bg-volt-dim/40 px-1.5 py-0.5 text-bone-dim">
          {active + 1}/{mind.length}
        </span>
      </span>
    </div>
  );
}

/** Deterministic 7-char "commit hash" so the convictions block reads like git log. */
function hash7(s: string): string {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  return h.toString(16).padStart(7, "0").slice(0, 7);
}
