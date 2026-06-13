import { stackMarquee } from "@/content/site";

/**
 * Stack marquee (DESIGN-SPEC §3.6): slow wordmark wall, monochrome, pause on
 * hover. Text wordmarks only (no brand logos — ASSETS.md trademark rule).
 * CSS-only animation; respects reduced motion globally.
 */
export function Marquee() {
  const items = [...stackMarquee, ...stackMarquee];
  return (
    <section
      aria-label="Stack"
      className="overflow-hidden border-y border-volt-dim py-8"
    >
      <div className="marquee-track flex w-max gap-12 hover:[animation-play-state:paused]">
        {items.map((tech, i) => (
          <span
            key={i}
            className="font-mono text-lg whitespace-nowrap text-bone-dim"
            aria-hidden={i >= stackMarquee.length}
          >
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
}
