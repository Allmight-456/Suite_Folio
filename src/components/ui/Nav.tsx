"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav } from "@/content/site";

/**
 * Persistent compact nav (PRD §5: recruiter reaches keywords/contact within
 * 2 scroll gestures). Hidden at the very top so it doesn't fight the hero,
 * fades in once scrolled. Pure links — no JS gate on navigation.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Primary"
      data-scrolled={scrolled}
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 font-mono text-sm transition-opacity duration-500 data-[scrolled=false]:pointer-events-none data-[scrolled=false]:opacity-0 md:px-16"
    >
      <Link
        href="/"
        className="text-bone-dim transition-colors hover:text-bone"
      >
        ishan@prod
      </Link>
      <ul className="flex items-center gap-4 rounded-full border border-volt-dim bg-ink-raise/80 px-4 py-2 backdrop-blur-md md:gap-6">
        {nav.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="lowercase text-bone-dim transition-colors hover:text-bone"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
