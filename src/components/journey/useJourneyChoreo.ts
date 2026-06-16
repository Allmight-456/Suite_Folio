"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";
import { useChoreo } from "@/lib/choreo";

/**
 * The Journey runs as a terminal session (owner-directed: the old lateral slide
 * read as a stock carousel). The section is pinned; scrolling crosses bands that
 * map to commands. Crossing a band runs a `clear` (types + wipes the screen) and
 * then types the next command and reveals its output — and reverses the same way
 * on the way back. One hook owns the reduced-motion branch (CLAUDE.md convention):
 * `pinned=false` (pre-mount / reduced-motion / narrow) renders a plain readable
 * stack with no animation (hard rules 3 + 5).
 */

const CLEAR_CMD = "clear";
const CHAR_MS = 42; // per-character typing cadence
const CLEAR_HOLD_MS = 220; // blank beat after `clear`, before the next command
const PRE_TYPE_MS = 120; // tiny pause so the blank registers
const HYSTERESIS = 0.04; // progress margin around band edges (kills boundary thrash)

type Phase = "idle" | "clearing" | "typing";

export function useJourneyChoreo(
  sectionRef: RefObject<HTMLElement | null>,
  commands: readonly string[],
) {
  const { reduced, mounted } = useChoreo();
  const [wide, setWide] = useState(false);

  const [step, setStep] = useState(0); // command whose OUTPUT is rendered
  const [phase, setPhase] = useState<Phase>("idle");
  const [text, setText] = useState(commands[0]); // what's shown at the prompt
  const [typed, setTyped] = useState(commands[0].length);
  const [target, setTarget] = useState(0); // command the scroll position wants

  // Desktop only — horizontal/terminal scroll-jacking is poor on phones, and
  // content must never be gated, so narrow screens fall back to the stack.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const pinned = mounted && !reduced && wide;

  // Scroll progress → target band, with hysteresis so a pixel of jitter at a
  // boundary doesn't bounce the active command back and forth.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const targetRef = useRef(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const n = commands.length;
    const cur = targetRef.current;
    const lower = cur / n;
    const upper = (cur + 1) / n;
    let next = cur;
    if (v < lower - HYSTERESIS) next = Math.max(0, Math.floor(v * n));
    else if (v > upper + HYSTERESIS) next = Math.min(n - 1, Math.floor(v * n));
    if (next !== cur) {
      targetRef.current = next;
      setTarget(next);
    }
  });

  // ── Transition runner ────────────────────────────────────────────────────
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const typeOut = (str: string, done: () => void) => {
    setText(str);
    setTyped(0);
    let i = 0;
    const tick = () => {
      i += 1;
      setTyped(i);
      if (i >= str.length) return done();
      timers.current.push(setTimeout(tick, CHAR_MS));
    };
    timers.current.push(setTimeout(tick, CHAR_MS));
  };

  const runTransition = () => {
    clearTimers();
    setPhase("clearing"); // output wipes out; prompt types `clear`
    typeOut(CLEAR_CMD, () => {
      timers.current.push(
        setTimeout(() => {
          // Use the freshest target — a fast scroll may have moved on; we skip
          // the intermediates and run straight to where the reader landed.
          const dest = targetRef.current;
          setStep(dest);
          setPhase("typing");
          timers.current.push(
            setTimeout(() => {
              typeOut(commands[dest], () => setPhase("idle"));
            }, PRE_TYPE_MS),
          );
        }, CLEAR_HOLD_MS),
      );
    });
  };

  // Whenever the screen is settled but doesn't match where the scroll wants to
  // be, run a transition. Kicked off in a rAF (not synchronously) so the state
  // updates land after commit, not as a cascade inside the effect. Re-fires after
  // each transition completes, which chains naturally on a fast scroll.
  const wantsTransition = pinned && phase === "idle" && step !== target;
  useEffect(() => {
    if (!wantsTransition) return;
    const id = requestAnimationFrame(runTransition);
    return () => cancelAnimationFrame(id);
    // runTransition reads the latest target via ref; only the trigger matters.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wantsTransition]);

  useEffect(() => () => clearTimers(), []);

  return {
    pinned,
    step,
    text,
    typed,
    outputVisible: phase === "idle",
    cursor: phase !== "idle",
    busy: phase !== "idle", // drives the status-bar spinner during clear/type
    activeDot: step,
  };
}
