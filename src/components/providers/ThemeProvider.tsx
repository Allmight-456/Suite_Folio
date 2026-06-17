"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_THEME,
  STORAGE_KEY,
  THEME_EVENT,
  isThemeId,
  type ThemeId,
} from "@/content/themes";

type ThemeContextValue = {
  theme: ThemeId;
  setTheme: (id: ThemeId) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Theme context. The actual `data-theme` attribute is set on <html> by the
 * pre-paint inline script in layout.tsx (no FOUC); this provider mirrors that
 * value into React state for the picker UIs and writes changes back through
 * three channels: the <html> attribute (drives every CSS-token style), the
 * localStorage key (persistence) and a `THEME_EVENT` (so JS consumers that
 * snapshot tokens — HeroGlow, the figure dissolve — can re-read the palette).
 * Children render unconditionally; the theme system never gates content.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  // SSR/first paint renders the locked default; the effect syncs to whatever the
  // inline script already applied, so there is no hydration mismatch.
  const [theme, setThemeState] = useState<ThemeId>(DEFAULT_THEME);

  useEffect(() => {
    // One-shot sync of the inline-script-applied theme into state (same intended
    // "has hydrated" pattern as useChoreo's mounted flag) — not a render cascade.
    const current = document.documentElement.dataset.theme;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (isThemeId(current)) setThemeState(current);
  }, []);

  const setTheme = useCallback((id: ThemeId) => {
    document.documentElement.dataset.theme = id;
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      // private mode / storage disabled — the in-memory theme still applies.
    }
    window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: id }));
    setThemeState(id);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
}
