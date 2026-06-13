"use client";

import Image from "next/image";
import { useRef } from "react";
import { useChoreo } from "@/lib/choreo";
import { useBinaryDissolve } from "./useBinaryDissolve";

/**
 * The figure (owner-directed redesign): a background-removed cutout that
 * mosaics in from binary and dissolves back into drifting bits as you scroll.
 * The second bold moment beside now.log. Bits are --volt/--bone, never phosphor
 * (the terminal quarantine holds). Canvas effect is desktop-only for the perf
 * budget; everyone else gets the static indigo-duotone image below it.
 */
export function Figure() {
  const { reduced, mounted } = useChoreo();
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const active = useBinaryDissolve({ sectionRef, canvasRef, reduced, mounted });

  return (
    <section
      ref={sectionRef}
      aria-label="The engineer"
      className="relative h-[200vh]"
    >
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden">
        <div className="relative flex w-full max-w-5xl flex-col items-center px-6 md:flex-row md:items-end md:justify-between md:px-16">
          <div className="relative aspect-[676/900] w-[min(70vw,320px)] md:w-[380px]">
            {/* Static duotone figure — SSR/no-JS/mobile/reduced-motion all see this. */}
            <div
              className="duotone-figure absolute inset-0"
              data-hidden={active}
            >
              <Image
                src="/images/figure.png"
                alt="Ishan Kumar"
                fill
                sizes="(max-width: 768px) 70vw, 380px"
                className="object-contain object-bottom"
                priority={false}
              />
            </div>
            {/* Desktop canvas overlay — the dissolve renders here. */}
            <canvas
              ref={canvasRef}
              aria-hidden="true"
              className="absolute inset-0 h-full w-full"
              data-active={active}
            />
          </div>

          <p className="mt-8 max-w-xs font-mono text-sm text-bone-dim md:mb-8 md:text-right">
            <span className="text-bone">the engineer behind the commits.</span>
            <br />
            bengaluru · compiling since 2021.
          </p>
        </div>
      </div>
    </section>
  );
}
