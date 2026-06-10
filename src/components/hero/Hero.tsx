import { hero } from "@/content/site";

/**
 * Hero placeholder — each D1 worktree (feature/hero-cinematic, feature/hero-boot)
 * replaces this component. Static no-JS-safe markup so the page is complete
 * on main meanwhile. The h1 is the page's single h1 and its LCP element.
 */
export function Hero({ chip }: { chip: string }) {
  return (
    <section
      aria-label="Introduction"
      className="flex min-h-svh flex-col justify-center px-6 md:px-16"
    >
      <p className="font-mono text-sm lowercase text-bone-dim">{hero.eyebrow}</p>
      <h1 className="font-display text-[clamp(4rem,14vw,12rem)] font-bold leading-[0.95] tracking-tight text-bone">
        {hero.name}
      </h1>
      <p className="mt-4 font-mono text-sm lowercase text-bone-dim">
        {hero.subline}
      </p>
      <p className="mt-10">
        <a
          href="/now"
          className="inline-block border border-volt-dim bg-ink-raise px-4 py-2 font-mono text-sm text-bone"
        >
          {chip}
        </a>
      </p>
    </section>
  );
}
