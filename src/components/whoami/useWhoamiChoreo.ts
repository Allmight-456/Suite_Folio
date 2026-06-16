"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { useChoreo } from "@/lib/choreo";

/**
 * Boot-sequence typewriter (CLAUDE.md convention: one hook owns the reduced-motion
 * branch). Mirrors useHeroChoreo's setTimeout-driven typing, but triggers on
 * *scroll-in* (IntersectionObserver, like useBinaryDissolve) rather than on mount,
 * so the terminal "boots" when you reach it. Command lines type character by
 * character; output lines reveal whole. Reduced motion / pre-hydration / no-JS =
 * everything shown at once (content is never gated on JS — hard rule 5).
 */

const START_MS = 350; // beat before the first command starts typing
const CHAR_MS = 55; // per-character cadence for command lines
const CMD_PAUSE_MS = 280; // hold after a command finishes, before its output
const OUT_PAUSE_MS = 450; // hold after an output line, before the next command

type Line = { kind: "cmd" | "out"; text?: string };

export function useWhoamiChoreo(
  ref: RefObject<HTMLElement | null>,
  lines: readonly Line[],
) {
  const { reduced, mounted } = useChoreo();
  const [step, setStep] = useState(0);
  const [chars, setChars] = useState(0);
  const [inView, setInView] = useState(false);
  const everRun = useRef(false);

  // Fire once when the pane scrolls into view.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);

  // The timeline. setState lives inside the setTimeout chain (never the effect
  // body) so there's no synchronous render cascade — same shape as useHeroChoreo.
  useEffect(() => {
    if (!mounted || reduced || !inView || everRun.current) return;
    everRun.current = true;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    let i = 0;
    let c = 0;

    const run = () => {
      if (cancelled || i >= lines.length) return;
      const line = lines[i];
      if (line.kind === "cmd" && line.text && c < line.text.length) {
        c += 1;
        setStep(i);
        setChars(c);
        timer = setTimeout(run, CHAR_MS);
      } else {
        const pause = line.kind === "cmd" ? CMD_PAUSE_MS : OUT_PAUSE_MS;
        i += 1;
        c = 0;
        setStep(i);
        setChars(0);
        timer = setTimeout(run, pause);
      }
    };

    timer = setTimeout(run, START_MS);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [mounted, reduced, inView, lines]);

  // Pre-hydration and reduced motion render the whole sequence statically.
  const complete = reduced || !mounted;
  return {
    step: complete ? lines.length : step,
    chars,
    done: complete || step >= lines.length,
  };
}
