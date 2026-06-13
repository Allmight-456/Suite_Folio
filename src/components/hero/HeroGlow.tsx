"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useChoreo } from "@/lib/choreo";

const MeshGradient = dynamic(
  () => import("@paper-design/shaders-react").then((m) => m.MeshGradient),
  { ssr: false },
);

/**
 * D9: ambient GPU glow behind the hero name. Enhancement-only — it mounts
 * after first paint (idle callback), never under reduced motion, and sits
 * above the always-rendered static CSS gradient fallback. Colors are read
 * from the CSS tokens at runtime so the palette stays single-sourced.
 */
export function HeroGlow() {
  const { reduced } = useChoreo();
  const [colors, setColors] = useState<string[] | null>(null);

  useEffect(() => {
    if (reduced) return;
    const idle =
      window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 200));
    const id = idle(() => {
      const css = getComputedStyle(document.documentElement);
      const token = (name: string) => css.getPropertyValue(name).trim();
      const ink = token("--ink");
      const voltDim = token("--volt-dim");
      const volt = token("--volt");
      if (ink && voltDim && volt) setColors([ink, voltDim, ink, volt, ink]);
    });
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(id as number);
    };
  }, [reduced]);

  if (reduced || !colors) return null;

  return (
    <div className="absolute inset-0 opacity-60" aria-hidden="true">
      <MeshGradient
        colors={colors}
        distortion={0.7}
        swirl={0.25}
        speed={0.25}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
