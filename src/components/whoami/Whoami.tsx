"use client";

import { useRef } from "react";
import { whoami } from "@/content/site";
import { useWhoamiChoreo } from "./useWhoamiChoreo";

/**
 * The signature statement, reframed as a terminal boot-sequence (owner-directed:
 * the old floating "$ whoami" block read as a generic subheader). Mac-window
 * chrome reused from NowLog, but phosphor stays quarantined there — this pane
 * speaks the site's indigo (--volt) voice. Commands type on scroll-in; output
 * reveals whole. Fully readable with zero JS (the hook renders all lines when
 * unmounted / reduced-motion).
 */
export function Whoami() {
  const ref = useRef<HTMLElement>(null);
  const { step, chars, done } = useWhoamiChoreo(ref, whoami.lines);

  return (
    <section
      ref={ref}
      aria-label="whoami — who I am and what I do"
      className="mx-auto max-w-4xl px-6 py-28 md:px-16 md:py-40"
    >
      <div className="overflow-hidden rounded-lg border border-volt-dim shadow-2xl">
        <div className="flex items-center gap-2 border-b border-volt-dim bg-ink-raise px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-volt-dim" />
          <span className="h-3 w-3 rounded-full bg-volt-dim" />
          <span className="h-3 w-3 rounded-full bg-volt-dim" />
          <span className="ml-3 font-mono text-xs text-bone-dim">
            {whoami.prompt} whoami
          </span>
        </div>

        <div className="space-y-3 bg-ink-raise p-6 font-mono text-sm leading-relaxed md:p-8">
          {whoami.lines.map((line, k) => {
            if (k > step) return null;
            const active = k === step && !done;

            if (line.kind === "cmd") {
              const shown = active ? line.text.slice(0, chars) : line.text;
              return (
                <p key={k} className="text-bone">
                  <span className="select-none text-volt-bright">
                    {whoami.prompt}{" "}
                  </span>
                  {shown}
                  {active && <Cursor />}
                </p>
              );
            }

            return (
              <p key={k} className="max-w-2xl text-bone-dim">
                <span className="select-none text-volt-bright">{"> "}</span>
                {"parts" in line ? (
                  line.parts.map((p, j) =>
                    p.volt ? (
                      <span key={j} className="font-semibold text-volt">
                        {p.text}
                      </span>
                    ) : (
                      <span key={j}>{p.text}</span>
                    ),
                  )
                ) : (
                  <span className="text-bone">{line.text}</span>
                )}
              </p>
            );
          })}

          {/* awaiting-input prompt, with the one blinking cursor once booted */}
          {done && (
            <p className="text-bone-dim">
              <span className="select-none text-volt-bright">
                {whoami.prompt}{" "}
              </span>
              <Cursor />
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

/** Blinking block cursor (--volt, not phosphor). .cursor-blink stops under
    prefers-reduced-motion via globals.css. */
function Cursor() {
  return (
    <span className="cursor-blink ml-0.5 inline-block h-[1.05em] w-[0.5em] translate-y-[0.15em] bg-volt align-middle" />
  );
}
