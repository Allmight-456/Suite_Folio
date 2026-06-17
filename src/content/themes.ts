// Theme registry — the zsh-powerlevel10k / Claude-Code-setup-style palette picker.
//
// IMPORTANT: no hex lives here. Each theme's actual palette is a `[data-theme="id"]`
// block in globals.css that overrides the shared CSS tokens (--ink*/--bone*/--volt*/
// --phosphor). This module is just the ordered UI metadata (id + label). The picker
// swatches render their colour by setting `data-theme={id}` on a tiny element and
// reading `var(--volt)` / `var(--ink-raise)` off it — so the swatch can never drift
// from the real palette (CLAUDE.md "tokens only in CSS, never inline hex").

export const THEMES = [
  { id: "indigo", label: "indigo", blurb: "night shift" },
  { id: "green", label: "phosphor", blurb: "matrix green" },
  { id: "amber", label: "amber", blurb: "crt" },
  { id: "ember", label: "ember", blurb: "orange" },
  { id: "dracula", label: "dracula", blurb: "purple" },
  { id: "nord", label: "nord", blurb: "frost" },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

export const DEFAULT_THEME: ThemeId = "indigo";

export const THEME_IDS: readonly ThemeId[] = THEMES.map((t) => t.id);

export const STORAGE_KEY = "ik-theme";

/** Custom DOM event fired by the provider on every theme change. Canvas/shader
 *  consumers that snapshot CSS tokens into JS (HeroGlow, the figure dissolve)
 *  listen for this to re-read the palette — CSS-driven styles follow on their own. */
export const THEME_EVENT = "ik:themechange";

export function isThemeId(value: unknown): value is ThemeId {
  return typeof value === "string" && THEME_IDS.includes(value as ThemeId);
}
