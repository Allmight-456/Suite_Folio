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
        {/* eyebrow + left rule give the statement structure — it reads as a
            deliberate answer to a prompt, not a floating sentence. */}
        <p className="mb-8 font-mono text-sm lowercase tracking-wider text-volt-bright">
          {message.eyebrow}
        </p>
        <p className="max-w-4xl border-l-2 border-volt-dim pl-6 font-display text-[clamp(1.75rem,4.5vw,4rem)] font-medium leading-[1.12] tracking-tight text-bone md:pl-10">
          {message.parts.map((part, i) =>
            part.volt ? (
              <span key={i} className="font-bold text-volt">
                {part.text}
              </span>
            ) : (
              <span key={i}>{part.text}</span>
            ),
          )}
        </p>
        {/* signature motif: phosphor is quarantined to now.log (hard rule), so
            the cursor uses the --volt accent here, not phosphor green. */}
        <p className="mt-10 pl-6 font-mono text-sm text-bone-dim md:pl-10">
          {message.signature}{" "}
          <span className="inline-block h-[1.05em] w-[0.5em] translate-y-[0.15em] bg-volt cursor-blink" />
        </p>
      </Reveal>
    </section>
  );
}
