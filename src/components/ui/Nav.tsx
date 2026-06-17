"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/content/site";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";

/**
 * Persistent compact nav (PRD §5: recruiter reaches keywords/contact within
 * 2 scroll gestures). On the home page it hides at the very top so it doesn't
 * fight the hero, then fades in once scrolled. On every other route there is no
 * hero to fight and the pages are short, so it stays visible from the start
 * (otherwise it never appears on /now, /lab, etc.). Pure links — no JS gate.
 */
export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  useEffect(() => {
    // Only the home page gates the nav on scroll (so it doesn't fight the hero).
    if (!isHome) return;
    const onScroll = () => setScrolledPastHero(window.scrollY > 200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // Off the home page there's no hero to clear — show the nav immediately.
  const visible = !isHome || scrolledPastHero;

  return (
    <nav
      aria-label="Primary"
      data-scrolled={visible}
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 font-mono text-sm transition-opacity duration-500 data-[scrolled=false]:pointer-events-none data-[scrolled=false]:opacity-0 md:px-16"
    >
      <Link
        href="/"
        className="text-bone-dim transition-colors hover:text-bone"
      >
        ishan@prod
      </Link>
      <div className="flex items-center gap-3">
        <ul className="flex items-center gap-4 rounded-full border border-volt-dim bg-ink-raise/80 px-4 py-2 backdrop-blur-md md:gap-6">
          {nav.map((item) => {
            // External links (e.g. the GitHub résumé) open in a new tab so the
            // portfolio isn't lost; internal routes stay in-app.
            const external = item.href.startsWith("http");
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="lowercase text-bone-dim transition-colors hover:text-bone"
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <ThemeSwitcher />
      </div>
    </nav>
  );
}
