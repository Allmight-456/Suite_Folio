"use client";

import { useEffect, useRef, useState, useCallback, type RefObject } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";
import { useLenis } from "lenis/react";
import { useChoreo } from "@/lib/choreo";

/**
 * The /work "mind" terminal, run as a pinned session — the same grammar as the
 * homepage Journey (useJourneyChoreo): the section is pinned and scrolling crosses
 * bands that map to commands (curiosity / obsessions / convictions). Crossing a band
 * runs a `clear` (types + wipes) then types the next command and reveals its output,
 * reversing on the way back — so the window never elongates, it just re-paints.
 *
 * Beyond Journey it adds `goTo(i)`: clicking a tree node scrolls to that band's
 * centre, so click and scroll share one source of truth (no fight). One hook owns
 * the reduced-motion branch (CLAUDE.md convention): `pinned=false` (pre-mount /
 * reduced-motion / narrow) renders a plain readable stack with no animation
 * (hard rules 3 + 5).
 */

const CLEAR_CMD = "clear";
const CHAR_MS = 42; // per-character typing cadence (matches Journey)
const CLEAR_HOLD_MS = 220; // blank beat after `clear`, before the next command
const PRE_TYPE_MS = 120; // tiny pause so the blank registers
const HYSTERESIS = 0.04; // progress margin around band edges (kills boundary thrash)

type Phase = "idle" | "clearing" | "typing";

export function useMindChoreo(
  sectionRef: RefObject<HTMLElement | null>,
  commands: readonly string[],
) {
  const { reduced, mounted } = useChoreo();
  const [wide, setWide] = useState(false);
  const lenis = useLenis();

  const [step, setStep] = useState(0); // command whose OUTPUT is rendered
  const [phase, setPhase] = useState<Phase>("idle");
  const [text, setText] = useState(commands[0]); // what's shown at the prompt
  const [typed, setTyped] = useState(commands[0].length);
  const [target, setTarget] = useState(0); // command the scroll position wants

  // Desktop only — pinned scroll-jacking is poor on phones, and content must
  // never be gated, so narrow screens fall back to the readable stack.
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

  // Click a tree node → scroll to that band's centre; the scroll handler above
  // then advances `target` naturally (one source of truth). No-op until pinned.
  const goTo = useCallback(
    (i: number) => {
      const el = sectionRef.current;
      if (!el || !pinned) return;
      const n = commands.length;
      const sectionTop = el.getBoundingClientRect().top + window.scrollY;
      const travel = Math.max(0, el.offsetHeight - window.innerHeight);
      const top = sectionTop + ((i + 0.5) / n) * travel;
      if (lenis) lenis.scrollTo(top);
      else window.scrollTo({ top, behavior: "smooth" });
    },
    [sectionRef, pinned, commands.length, lenis],
  );

  // ── Transition runner ──────────────────────────────────────────────────────
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
          // Use the freshest target — a fast scroll may have moved on; skip the
          // intermediates and run straight to where the reader landed.
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

  // Whenever the screen is settled but doesn't match where the scroll wants to be,
  // run a transition. Kicked off in a rAF (not synchronously) so the state updates
  // land after commit, not as a cascade. Re-fires after each transition completes,
  // which chains naturally on a fast scroll.
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
    goTo,
  };
}
