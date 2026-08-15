import { certs } from "@/content/site";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { WindowChrome } from "@/components/ui/WindowChrome";
import { PixelLogo } from "@/components/ui/PixelLogo";

/**
 * Certifications, presented like the skill card's window (owner-directed): one
 * window per credential, each with a pixel logo + the details. No terminal boot —
 * they're static, shown one after another. The pixel marks now come from the shared
 * ui/PixelLogo registry (the Emergent + Slack marks reuse the same vernacular);
 * brand colours stay a scoped, theme-independent exception to palette discipline.
 * Copy is sourced in CONTENT.md §8, never invented.
 */

export function Certifications() {
  return (
    <section aria-label="Certifications" className="px-6 py-20 md:px-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-sm text-bone-dim">
          <span className="text-volt-bright">$ cat ~/certifications</span>
        </p>
        <h2 className="font-display mt-2 text-2xl font-bold tracking-tight text-bone">
          Certifications
        </h2>

        <Reveal as="ul" stagger className="mt-8 space-y-6">
          {certs.map((cert) => (
            <RevealItem as="li" key={cert.name}>
              <div className="overflow-hidden rounded-lg border border-volt-dim bg-ink-raise shadow-2xl">
                <WindowChrome
                  label={`${cert.issuerFull} ─ ${cert.id}`}
                  className=""
                />

                <div className="grid items-center gap-6 p-6 md:grid-cols-[auto_1fr] md:gap-8 md:p-8">
                  <div className="justify-self-center md:justify-self-start">
                    <PixelLogo kind={cert.logo} label={`${cert.issuer} logo`} />
                  </div>

                  <div>
                    <p className="font-mono text-xs text-bone-dim">
                      {cert.issuerFull} · {cert.date}
                    </p>
                    <h3 className="font-display mt-1 text-xl font-semibold leading-snug text-bone">
                      {cert.name}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-bone-dim">
                      {cert.blurb}
                    </p>

                    <ul className="mt-3 flex flex-wrap gap-2 font-mono text-[11px]">
                      {cert.skills.map((s) => (
                        <li
                          key={s}
                          className="rounded border border-volt-dim/60 px-2 py-0.5 text-volt-bright"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>

                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block font-mono text-xs text-volt-bright underline-offset-2 hover:underline"
                    >
                      verify ↗
                    </a>
                  </div>
                </div>
              </div>
            </RevealItem>
          ))}
        </Reveal>

        <p className="mt-8 border-t border-volt-dim/40 pt-6 font-mono text-xs text-bone-dim">
          <a
            href="https://www.linkedin.com/in/ishan-kumar-/details/certifications/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-volt-bright hover:underline"
          >
            ↗ all certifications on LinkedIn
          </a>
        </p>
      </div>
    </section>
  );
}
