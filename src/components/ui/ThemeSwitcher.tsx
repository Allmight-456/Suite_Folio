"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { THEMES } from "@/content/themes";
import { useTheme } from "@/components/providers/ThemeProvider";

/**
 * Nav theme control, styled like a zsh-powerlevel10k / Claude-Code setup prompt:
 * a swatch button (shows the live accent) opens a small mono panel of options.
 * Arrowing previews a theme live (like the p10k configurator); Enter/click
 * commits, Escape reverts to whatever was active when the panel opened. Shares
 * the provider with the stack-card <ThemeSwatches>, so the two stay in sync.
 */
export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  // What to restore to on Escape — captured when the panel opens, since arrowing
  // previews live and mutates the active theme.
  const committedRef = useRef(theme);
  const [activeIndex, setActiveIndex] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const openPanel = useCallback(() => {
    committedRef.current = theme;
    setActiveIndex(Math.max(0, THEMES.findIndex((t) => t.id === theme)));
    setOpen(true);
  }, [theme]);

  const commit = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  const cancel = useCallback(() => {
    setTheme(committedRef.current); // revert any live preview
    setOpen(false);
    triggerRef.current?.focus();
  }, [setTheme]);

  // Move the highlight and live-preview that theme.
  const preview = useCallback(
    (index: number) => {
      const next = (index + THEMES.length) % THEMES.length;
      setActiveIndex(next);
      setTheme(THEMES[next].id);
    },
    [setTheme],
  );

  // Focus the highlighted row whenever it changes while open.
  useEffect(() => {
    if (open) itemRefs.current[activeIndex]?.focus();
  }, [open, activeIndex]);

  // Close (committing the preview) on an outside click.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        preview(activeIndex + 1);
        break;
      case "ArrowUp":
        e.preventDefault();
        preview(activeIndex - 1);
        break;
      case "Home":
        e.preventDefault();
        preview(0);
        break;
      case "End":
        e.preventDefault();
        preview(THEMES.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        commit();
        break;
      case "Escape":
        e.preventDefault();
        cancel();
        break;
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => (open ? cancel() : openPanel())}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Change site theme"
        className="flex h-7 w-7 items-center justify-center rounded-full border border-volt-dim bg-ink-raise/80 backdrop-blur-md transition hover:border-volt"
      >
        <span className="h-3 w-3 rounded-full bg-volt" aria-hidden="true" />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Site theme"
          onKeyDown={onKeyDown}
          className="absolute right-0 top-9 z-50 w-56 rounded-lg border border-volt-dim bg-ink-raise/95 p-2 font-mono text-xs shadow-2xl backdrop-blur-md"
        >
          <p className="px-2 py-1 text-bone-dim">$ configure --theme</p>
          <ul className="my-1">
            {THEMES.map(({ id, label, blurb }, i) => {
              const active = theme === id;
              return (
                <li key={id}>
                  <button
                    ref={(el) => {
                      itemRefs.current[i] = el;
                    }}
                    type="button"
                    role="menuitemradio"
                    aria-checked={active}
                    tabIndex={i === activeIndex ? 0 : -1}
                    onClick={() => {
                      setTheme(id);
                      commit();
                    }}
                    onMouseEnter={() => preview(i)}
                    className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-left transition ${
                      active ? "bg-volt-dim/40 text-bone" : "text-bone-dim hover:text-bone"
                    }`}
                  >
                    <span aria-hidden="true" className={active ? "text-volt-bright" : ""}>
                      {active ? "●" : "○"}
                    </span>
                    <span className="flex-1 lowercase">{label}</span>
                    <span className="text-[0.625rem] text-bone-dim/70">{blurb}</span>
                    <span
                      data-theme={id}
                      aria-hidden="true"
                      className="h-3 w-3 rounded-sm bg-volt ring-1 ring-inset ring-volt-dim"
                    />
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="px-2 py-1 text-[0.625rem] text-bone-dim/70">
            ↑/↓ preview · enter apply · esc cancel
          </p>
        </div>
      )}
    </div>
  );
}
