import type { ReactNode } from "react";

/**
 * The title bar every window on the site shares — three macOS traffic lights and
 * a mono label. Previously six hand-copied `<span className="h-3 w-3 rounded-full
 * bg-volt-dim" />` triples across whoami / journey / mind / now.log / stack /
 * certs; this is the single source of truth for them.
 *
 * The dots carry real colour + glyphs (owner-directed 2026-08-14). Like the
 * certification brand marks, the traffic-light colours are a scoped,
 * theme-INDEPENDENT exception to palette discipline: they read as "window"
 * precisely because those three colours are fixed in every real terminal, so the
 * p10k picker deliberately does NOT retint them. Tokens live in globals.css
 * (--win-close / --win-min / --win-max); no inline hex. See DECISION-LOG 2026-08-14.
 *
 * Server component on purpose — the bar is static, so it ships no JS and renders
 * identically with scripting off (hard rule 5).
 */

/** Glyph strokes, drawn in --ink so they read as an engraved cut in the dot. */
function Glyph({ kind }: { kind: "close" | "min" | "max" }) {
  const d =
    kind === "close"
      ? "M3.6 3.6 L8.4 8.4 M8.4 3.6 L3.6 8.4"
      : kind === "min"
        ? "M3.3 6 L8.7 6"
        : "M6 3.3 L6 8.7 M3.3 6 L8.7 6";
  return (
    <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true">
      <path
        d={d}
        stroke="var(--ink)"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

/** The three traffic lights on their own — for bars that build their own layout. */
export function WindowDots() {
  return (
    <span className="flex items-center gap-2" aria-hidden="true">
      <span className="h-3 w-3 rounded-full bg-win-close">
        <Glyph kind="close" />
      </span>
      <span className="h-3 w-3 rounded-full bg-win-min">
        <Glyph kind="min" />
      </span>
      <span className="h-3 w-3 rounded-full bg-win-max">
        <Glyph kind="max" />
      </span>
    </span>
  );
}

/**
 * Full title bar: dots + label. `className` covers the one variance between call
 * sites — windows whose parent already paints `bg-ink-raise` pass no background.
 */
export function WindowChrome({
  label,
  className = "bg-ink-raise",
}: {
  label: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-2 border-b border-volt-dim px-4 py-3 ${className}`}
    >
      <WindowDots />
      <span className="ml-1 truncate font-mono text-xs text-bone-dim">
        {label}
      </span>
    </div>
  );
}
