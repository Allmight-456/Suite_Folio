import { message } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The signature statement (DESIGN-SPEC §3.2). Display type, key phrases in
 * --volt, closed by the mono prompt motif. Fully readable without JS.
 */
export function Message() {
  return (
    <section
      aria-label="What I do"
      className="mx-auto max-w-6xl px-6 py-32 md:px-16 md:py-48"
    >
      <Reveal>
        <p className="font-display text-[clamp(1.75rem,4.5vw,3.75rem)] font-medium leading-[1.15] tracking-tight text-bone">
          {message.parts.map((part, i) =>
            part.volt ? (
              <span key={i} className="text-volt">
                {part.text}
              </span>
            ) : (
              <span key={i}>{part.text}</span>
            ),
          )}
        </p>
        {/* signature motif: phosphor is quarantined to now.log (hard rule), so
            the cursor uses the --volt accent here, not phosphor green. */}
        <p className="mt-10 font-mono text-sm text-bone-dim">
          {message.signature}{" "}
          <span className="inline-block h-[1.05em] w-[0.5em] translate-y-[0.15em] bg-volt cursor-blink" />
        </p>
      </Reveal>
    </section>
  );
}
