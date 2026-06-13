import { hero } from "@/content/site";
import { commitTexture } from "@/content/commits";
import { HeroChip } from "./HeroChip";
import { HeroGlow } from "./HeroGlow";
import styles from "./hero.module.css";

/**
 * Variant A — cinematic name (D1-A with C's chip).
 * Server-rendered: the h1 is the page's single h1 and the LCP element; the
 * letter settle is pure CSS so the sequence completes with JS disabled.
 * Enhancement layers (shader glow, chip typing) hydrate on top.
 */
export function Hero({ chip }: { chip: string }) {
  return (
    <section
      aria-label="Introduction"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden px-6 md:px-16"
    >
      <div className={styles.glowFallback} aria-hidden="true" />
      <HeroGlow />
      <CommitTicker />

      <div className="relative">
        <p className="font-mono text-sm lowercase text-bone-dim">
          {hero.eyebrow}
        </p>
        <h1
          aria-label={hero.name}
          className="font-display mt-2 text-[clamp(4rem,13vw,12rem)] font-bold leading-[0.92] tracking-tight text-bone"
        >
          {hero.name.split("").map((ch, i) =>
            ch === " " ? (
              <span key={i} aria-hidden="true">
                {" "}
              </span>
            ) : (
              <span
                key={i}
                aria-hidden="true"
                className={styles.letter}
                style={{ "--i": i } as React.CSSProperties}
              >
                {ch}
              </span>
            ),
          )}
        </h1>
        <p className="mt-4 font-mono text-sm lowercase text-bone-dim">
          {hero.subline}
        </p>

        <div className={`mt-12 ${styles.chipWrap}`}>
          <HeroChip text={chip} />
        </div>
      </div>
    </section>
  );
}

function CommitTicker() {
  // List duplicated so the -50% crawl loops seamlessly.
  const lines = [...commitTexture, ...commitTexture];
  return (
    <div className={styles.ticker} aria-hidden="true">
      <div className={styles.tickerInner}>
        {lines.map((line, i) => (
          <span key={i} className="font-mono text-xs whitespace-nowrap text-bone">
            {line}
          </span>
        ))}
      </div>
    </div>
  );
}
