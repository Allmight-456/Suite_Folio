"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { frames } from "@/content/strip";
import { Schematic, type SchematicKind } from "@/components/ui/Schematic";
import { useChoreo } from "@/lib/choreo";

/**
 * The Strip (DESIGN-SPEC §3.3): horizontal scroll-scrub band with mono captions.
 * SSR and first client paint render the native swipe rail (StripRail) so markup
 * matches and works without JS; after mount, non-reduced-motion viewers upgrade
 * to the pinned horizontal scrub (StripScrub). useScroll lives only in the scrub
 * child, which mounts client-side, so its target ref is always hydrated.
 */
export function Strip() {
  const { reduced, mounted } = useChoreo();

  if (!mounted || reduced) {
    return (
      <section aria-label="On and off track" className="py-24">
        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 md:px-16">
          {frames.map((_, i) => (
            <div key={i} className="snap-start shrink-0">
              <FrameCard index={i} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return <StripScrub />;
}

function StripScrub() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-72%"]);

  return (
    <section
      ref={targetRef}
      aria-label="On and off track"
      className="relative h-[300vh]"
    >
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-6 px-6 md:px-16">
          {frames.map((_, i) => (
            <FrameCard key={i} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FrameCard({ index }: { index: number }) {
  const f = frames[index];
  const aspect = `${f.width} / ${f.height}`;

  return (
    <figure className="shrink-0">
      <div
        className="relative h-[60vh] max-h-[560px] overflow-hidden rounded-sm border border-volt-dim bg-ink-raise"
        style={{ aspectRatio: aspect }}
      >
        {f.kind === "photo" ? (
          <div className="duotone relative h-full w-full">
            <Image
              src={f.src}
              alt={f.alt}
              fill
              sizes="(max-width: 768px) 80vw, 40vw"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center p-10 text-bone-dim">
            <Schematic
              kind={f.schematic as SchematicKind}
              className="h-auto w-full max-w-[280px]"
            />
          </div>
        )}
      </div>
      <figcaption className="mt-3 font-mono text-xs lowercase text-bone-dim">
        {f.caption}
      </figcaption>
    </figure>
  );
}
