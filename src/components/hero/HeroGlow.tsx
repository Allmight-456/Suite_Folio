"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useState, type ReactNode } from "react";
import { useChoreo } from "@/lib/choreo";

const MeshGradient = dynamic(
  () => import("@paper-design/shaders-react").then((m) => m.MeshGradient),
  { ssr: false },
);

/** Defense-in-depth: if the shader throws at runtime, render nothing (the
 *  static CSS gradient fallback in Hero stays visible underneath). */
class ShaderBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl2") || canvas.getContext("webgl")
    );
  } catch {
    return false;
  }
}

/**
 * D9: ambient GPU glow behind the hero name. Enhancement-only — it mounts
 * after first paint, never under reduced motion, only when WebGL is actually
 * available, and sits above the always-rendered static CSS gradient fallback.
 * Colors are read from CSS tokens at runtime so the palette stays single-sourced.
 */
export function HeroGlow() {
  const { reduced } = useChoreo();
  const [colors, setColors] = useState<string[] | null>(null);

  useEffect(() => {
    if (reduced || !hasWebGL()) return;
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
      <ShaderBoundary>
        <MeshGradient
          colors={colors}
          distortion={0.7}
          swirl={0.25}
          speed={0.25}
          style={{ width: "100%", height: "100%" }}
        />
      </ShaderBoundary>
    </div>
  );
}
