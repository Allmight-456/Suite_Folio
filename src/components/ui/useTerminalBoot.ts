"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { useChoreo } from "@/lib/choreo";

/**
 * Shared "boot like a terminal" choreography: on first scroll into view the prompt
 * types `command`, a Claude-Code spinner beats, then `rowCount` output rows stream
 * in one-by-one — the way Claude Code renders its TUI. Runs ONCE (like the hero
 * settle), never loops. Used by the skills card and each /work mind-terminal block.
 *
 * This hook owns the reduced-motion branch (CLAUDE.md convention): when not
 * `enhanced` (pre-mount / reduced-motion / no-JS) it returns the fully-booted state
 * so SSR shows the command typed and every row, statically.
 */

const CHAR_MS = 46; // per-character typing cadence (matches Journey)
const OPEN_MS = 300; // beat before the prompt starts typing
const PRE_LOAD_MS = 170; // pause after the command, before the spinner
const LOAD_MS = 540; // spinner "loading" beat
const ROW_MS = 95; // per-row stream cadence

type Phase = "opening" | "typing" | "loading" | "streaming" | "done";

export function useTerminalBoot(
  sectionRef: RefObject<HTMLElement | null>,
  command: string,
  rowCount: number,
) {
  const { reduced, mounted } = useChoreo();
  const enhanced = mounted && !reduced;

  const [typed, setTyped] = useState(0);
  const [phase, setPhase] = useState<Phase>("opening");
  const [revealed, setRevealed] = useState(0);
  const startedRef = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (!enhanced) return;
    const section = sectionRef.current;
    if (!section) return;
    const push = (fn: () => void, ms: number) =>
      timers.current.push(setTimeout(fn, ms));

    const streamRows = () => {
      setPhase("streaming");
      let r = 0;
      const reveal = () => {
        r += 1;
        setRevealed(r);
        if (r >= rowCount) return push(() => setPhase("done"), ROW_MS);
        push(reveal, ROW_MS);
      };
      push(reveal, ROW_MS);
    };

    const typeCommand = () => {
      setPhase("typing");
      let i = 0;
      const tick = () => {
        i += 1;
        setTyped(i);
        if (i >= command.length) {
          push(() => setPhase("loading"), PRE_LOAD_MS);
          push(streamRows, PRE_LOAD_MS + LOAD_MS);
          return;
        }
        push(tick, CHAR_MS);
      };
      push(tick, CHAR_MS);
    };

    const run = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      push(typeCommand, OPEN_MS);
    };

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(section);
    return () => {
      io.disconnect();
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [enhanced, command, rowCount, sectionRef]);

  // Fully-booted static state for pre-mount / reduced-motion / no-JS.
  if (!enhanced) {
    return {
      enhanced: false,
      typedText: command,
      cursor: false,
      busy: false,
      revealed: rowCount,
    };
  }

  return {
    enhanced: true,
    typedText: command.slice(0, typed),
    cursor: phase === "typing" || phase === "loading",
    busy: phase === "loading",
    revealed,
  };
}
