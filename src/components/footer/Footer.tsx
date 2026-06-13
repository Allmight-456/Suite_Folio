import { footer } from "@/content/site";

/**
 * Contact / footer (DESIGN-SPEC §3.8). Giant closing line + mono links.
 * id="contact" is the nav's contact anchor.
 */
export function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-volt-dim px-6 py-24 md:px-16 md:py-32"
    >
      <p className="font-display text-[clamp(2rem,7vw,5.5rem)] font-bold leading-[1.05] tracking-tight text-bone">
        {footer.closing}
      </p>

      <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm">
        {footer.links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className="text-bone-dim transition-colors hover:text-volt"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-16 font-mono text-xs text-bone-dim">{footer.lastLine}</p>
    </footer>
  );
}
