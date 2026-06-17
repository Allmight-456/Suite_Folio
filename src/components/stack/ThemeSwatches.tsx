"use client";

import { THEMES } from "@/content/themes";
import { useTheme } from "@/components/providers/ThemeProvider";

/**
 * The neofetch "color blocks" row — one swatch per theme, doubling as a live
 * theme picker (mirrors the nav <ThemeSwitcher>; both share the provider so they
 * stay in sync). Each button sets `data-theme` on itself, so `bg-volt` /
 * `ring-volt-dim` resolve to THAT theme's palette — the swatch can never drift
 * from the real colours, and no hex is inlined (CLAUDE.md tokens-in-CSS rule).
 */
export function ThemeSwatches({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  return (
    <div
      role="group"
      aria-label="Site theme"
      className={`flex items-center gap-2 ${className}`}
    >
      {THEMES.map(({ id, label, blurb }) => {
        const active = theme === id;
        return (
          <button
            key={id}
            type="button"
            data-theme={id}
            onClick={() => setTheme(id)}
            aria-pressed={active}
            aria-label={`${label} theme`}
            title={`${label} · ${blurb}`}
            className={`h-5 w-8 rounded-sm bg-volt ring-1 ring-inset ring-volt-dim transition ${
              active
                ? "scale-110 ring-2 ring-bone"
                : "opacity-70 hover:opacity-100 hover:ring-bone-dim"
            }`}
          />
        );
      })}
    </div>
  );
}
