"use client";

import { useRef } from "react";
import Link from "next/link";
import { mind } from "@/content/mind";
import type { MindSection } from "@/content/schema";
import { TerminalCursor, TerminalSpinner } from "@/components/ui/Terminal";
import { useTerminalBoot } from "@/components/ui/useTerminalBoot";

const PROMPT = "ishan@prod:~$";

/**
 * The mind, run as a terminal session. One window holds three command blocks
 * (curiosity / obsessions / convictions); each boots when scrolled into view —
 * types its command, beats a spinner, then streams its items the way the skills
 * card does (shared useTerminalBoot). Projects are woven in as `→ evidence` links
 * to their pages, not re-indexed. Pre-mount / reduced-motion / no-JS render fully
 * booted (commands typed, every item + link present) — SSR carries it all.
 */
export function MindTerminal() {
  return (
    <section
      id="field-notes"
      aria-label="What pulls me — curiosity, obsessions, convictions"
      className="scroll-mt-20 px-6 py-12 md:px-16 md:py-16"
    >
      <div className="mx-auto max-w-3xl overflow-hidden rounded-lg border border-volt-dim bg-ink-raise shadow-2xl">
        <div className="flex items-center gap-2 border-b border-volt-dim px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-volt-dim" />
          <span className="h-3 w-3 rounded-full bg-volt-dim" />
          <span className="h-3 w-3 rounded-full bg-volt-dim" />
          <span className="ml-3 font-mono text-xs text-bone-dim">ishan@prod ─ ~/mind</span>
        </div>

        <div className="space-y-12 p-6 md:p-8">
          {mind.map((section) => (
            <MindBlock key={section.id} section={section} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MindBlock({ section }: { section: MindSection }) {
  const ref = useRef<HTMLDivElement>(null);
  const { enhanced, typedText, cursor, busy, revealed } = useTerminalBoot(
    ref,
    section.command,
    section.items.length,
  );
  const isCommits = section.id === "convictions";

  return (
    <div ref={ref} id={section.id} className="scroll-mt-24">
      <p className="font-mono text-sm text-bone">
        <span className="text-volt-bright">{PROMPT}</span> {typedText}
        {cursor && <TerminalCursor />}
      </p>

      <div className="mt-2 h-4 font-mono text-xs">
        {busy && <TerminalSpinner words={["loading", "reading", "indexing"]} />}
      </div>

      <ul className="mt-2 space-y-4">
        {section.items.map((item, i) => {
          const shown = i < revealed;
          return (
            <li
              key={item.name}
              style={{
                opacity: shown ? 1 : 0,
                transform: shown ? "none" : "translateY(6px)",
                transition: enhanced
                  ? "opacity 0.28s var(--ease-site), transform 0.28s var(--ease-site)"
                  : "none",
              }}
            >
              <p className="font-mono text-sm">
                <span className="text-volt-bright">
                  {isCommits ? hash7(item.name) : "#"}
                </span>{" "}
                <span className="text-bone">{item.name}</span>
              </p>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-bone-dim">
                {item.detail}
              </p>
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
          );
        })}
      </ul>
    </div>
  );
}

/** Deterministic 7-char "commit hash" so the convictions block reads like git log. */
function hash7(s: string): string {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  return h.toString(16).padStart(7, "0").slice(0, 7);
}
