"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { frames } from "@/content/strip";
import { Schematic, type SchematicKind } from "@/components/ui/Schematic";
import { useChoreo } from "@/lib/choreo";

/**
 * The Strip (DESIGN-SPEC §3.3): horizontal scroll-scrub band of frames with
 * mono captions. Desktop pins and scrubs horizontally as you scroll the tall
 * section; mobile (and reduced motion) falls back to a native swipe rail.
 */
export function Strip() {
  const { reduced } = useChoreo();
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  // scrub the row left by ~ (n-1.2) frame-widths over the section's scroll
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-72%"]);

  if (reduced) {
    return (
      <section aria-label="On and off track" className="py-24">
        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 md:px-16">
          {frames.map((f, i) => (
            <div key={i} className="snap-start shrink-0">
              <FrameCard index={i} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={targetRef}
      aria-label="On and off track"
      className="relative h-[300vh]"
    >
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-6 px-6 md:px-16">
          {frames.map((f, i) => (
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
