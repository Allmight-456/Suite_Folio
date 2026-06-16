"use client";

import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Per-route scroll-position memory for back/forward navigation.
 *
 * Lenis drives scrolling, which defeats both the browser's and Next's native
 * scroll restoration: pressing Back would otherwise drop you at the top instead
 * of where you left. We take manual control (`history.scrollRestoration =
 * "manual"`) and remember the last scroll offset per pathname in sessionStorage,
 * then restore it on a genuine back/forward (popstate) or a reload.
 *
 * Why pathname-keyed + capped: a few steps of memory is all the UX needs (the
 * stated goal), and a bounded LRU keeps sessionStorage tiny. Forward link clicks
 * deliberately go to the top — only pop (Back/Forward) and reload restore.
 *
 * No-JS / SSR safe (renders null), and reduced-motion safe: when Lenis is
 * absent (reduced motion disables it) we fall back to window scrolling, and we
 * always restore with an immediate jump — never an animated scroll.
 */

const STORE_KEY = "ishan:scroll-positions:v1";
const MAX_ENTRIES = 12; // "a few steps" — bounded so sessionStorage stays tiny

type Store = Record<string, number>;

function readStore(): Store {
  try {
    return JSON.parse(sessionStorage.getItem(STORE_KEY) || "{}") as Store;
  } catch {
    return {};
  }
}

function writeStore(store: Store) {
  try {
    // String keys keep insertion order; we delete-then-set on save to push the
    // touched key to the end, so the oldest entries are first to be trimmed.
    const keys = Object.keys(store);
    if (keys.length > MAX_ENTRIES) {
      for (const k of keys.slice(0, keys.length - MAX_ENTRIES)) delete store[k];
    }
    sessionStorage.setItem(STORE_KEY, JSON.stringify(store));
  } catch {
    /* private mode / quota — restoration is a nicety, never a hard dependency */
  }
}

export function ScrollRestoration() {
  const lenis = useLenis();
  const pathname = usePathname();

  // Latest scroll offset, kept current so we can snapshot it the instant a
  // navigation starts (before anything resets the page to the top).
  const scrollRef = useRef(0);
  // The route we're currently sitting on — i.e. the one being left when a
  // navigation fires. Updated only after the new route has mounted.
  const currentKeyRef = useRef(pathname);
  const popRef = useRef(false);
  const firstRunRef = useRef(true);

  // Track the live scroll position from whichever scroller is active.
  useEffect(() => {
    const update = () => {
      scrollRef.current = lenis ? lenis.scroll : window.scrollY;
    };
    update();
    if (lenis) return lenis.on("scroll", update);
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [lenis]);

  // Take manual control and snapshot the outgoing position at the moment a
  // navigation is initiated — both forward (pushState) and Back/Forward
  // (popstate) — plus on reload/close (pagehide).
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";

    const save = () => {
      const store = readStore();
      delete store[currentKeyRef.current];
      store[currentKeyRef.current] = scrollRef.current;
      writeStore(store);
    };

    const originalPush = history.pushState.bind(history);
    history.pushState = function patchedPushState(...args) {
      save(); // capture the page we're leaving before Next renders the next one
      return originalPush(...args);
    };

    const onPop = () => {
      save();
      popRef.current = true;
    };

    window.addEventListener("popstate", onPop);
    window.addEventListener("pagehide", save);

    return () => {
      history.pushState = originalPush;
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("pagehide", save);
    };
  }, []);

  // After the new route mounts, restore its remembered offset — but only on a
  // genuine Back/Forward or a reload (first mount). Plain forward link clicks
  // fall through to the default top-of-page.
  useEffect(() => {
    currentKeyRef.current = pathname;

    const isFirstRun = firstRunRef.current;
    const wasPop = popRef.current;
    firstRunRef.current = false;
    popRef.current = false;

    // On a fresh first paint with a deep-link hash (e.g. /#contact), let the
    // anchor win instead of fighting it with a restore.
    if (isFirstRun && window.location.hash) return;
    if (!wasPop && !isFirstRun) return;

    const saved = readStore()[pathname];
    if (typeof saved !== "number" || saved <= 0) return;

    // Resilient restore. A single rAF×2 + 60ms backstop is enough in `next dev`,
    // but the production build (what Netlify serves) settles *later*: hydration is
    // slower, Lenis re-measures the restored route's height after we'd already
    // jumped (clamping the target short), and `viewTransition` swaps the DOM on a
    // delay. A one-shot restore lands before any of that and gets overridden — the
    // dev/prod split the owner saw. So instead of firing once we re-assert the
    // saved offset every frame until the position actually holds for a few frames
    // (or a ~0.75s cap), and bail the instant the user scrolls so we never fight
    // real input. Still an immediate jump, never an animated scroll (a11y floor).
    let raf = 0;
    let settled = 0;
    let frames = 0;
    let cancelled = false;
    const MAX_FRAMES = 45; // ~0.75s @ 60fps — outlasts hydration + view transition

    const current = () => (lenis ? lenis.scroll : window.scrollY);
    const apply = () => {
      // Re-measure first: on a prod build Lenis may not yet know the restored
      // route is tall enough, which would clamp scrollTo short of `saved`.
      lenis?.resize();
      if (lenis) lenis.scrollTo(saved, { immediate: true, force: true });
      else window.scrollTo(0, saved);
    };

    const tick = () => {
      if (cancelled) return;
      apply();
      settled = Math.abs(current() - saved) < 2 ? settled + 1 : 0;
      frames += 1;
      if (settled >= 3 || frames >= MAX_FRAMES) return; // held, or gave up
      raf = requestAnimationFrame(tick);
    };

    // Genuine user intent aborts the restore (wheel/touch/key) — programmatic
    // scrolls from `apply()` itself don't fire these, so there's no self-cancel.
    const onUserScroll = () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
    window.addEventListener("wheel", onUserScroll, { passive: true });
    window.addEventListener("touchstart", onUserScroll, { passive: true });
    window.addEventListener("keydown", onUserScroll);

    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("wheel", onUserScroll);
      window.removeEventListener("touchstart", onUserScroll);
      window.removeEventListener("keydown", onUserScroll);
    };
  }, [pathname, lenis]);

  return null;
}
