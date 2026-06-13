"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

type Args = {
  sectionRef: RefObject<HTMLElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  reduced: boolean;
  mounted: boolean;
};

const SRC = "/images/figure.png";
const COLS = 74; // sampling resolution; rows derived from image aspect

// Tokens read once at runtime so the palette stays single-sourced.
function tokens() {
  const css = getComputedStyle(document.documentElement);
  const t = (n: string) => css.getPropertyValue(n).trim();
  return {
    ink: t("--ink"),
    voltDim: t("--volt-dim"),
    volt: t("--volt"),
    voltBright: t("--volt-bright"),
    bone: t("--bone"),
  };
}

type Cell = { cx: number; cy: number; a: number; lum: number; bit: string; thr: number };

/**
 * Scroll-driven binary dissolve. The figure assembles from bits (scroll in),
 * holds, then dissolves into drifting bits (scroll out). Desktop + fine pointer
 * only — the rAF loop runs solely while the section is in view, so it stays off
 * the main thread otherwise (perf budget, DESIGN-SPEC §4). Returns `active`:
 * when true the static <Image> hides and the canvas drives the visual.
 */
export function useBinaryDissolve({ sectionRef, canvasRef, reduced, mounted }: Args) {
  const [active, setActive] = useState(false);
  const cellsRef = useRef<Cell[] | null>(null);
  const gridRef = useRef({ cols: COLS, rows: 0 });

  useEffect(() => {
    if (!mounted || reduced) return;
    if (!window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches)
      return;

    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let inView = false;
    let disposed = false;
    const pal = tokens();

    // 1) Sample the cutout into a low-res luminance/alpha grid (once).
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = SRC;
    img.onload = () => {
      if (disposed) return;
      const cols = COLS;
      const rows = Math.round(cols * (img.height / img.width));
      gridRef.current = { cols, rows };
      const off = document.createElement("canvas");
      off.width = cols;
      off.height = rows;
      const octx = off.getContext("2d", { willReadFrequently: true })!;
      octx.drawImage(img, 0, 0, cols, rows);
      const data = octx.getImageData(0, 0, cols, rows).data;
      const cells: Cell[] = [];
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;
          const a = data[i + 3] / 255;
          if (a < 0.15) continue; // background — skip
          const lum =
            (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) /
            255;
          // deterministic per-cell threshold → a coherent dissolve wave
          const thr = ((x * 73 + y * 131) % 100) / 100;
          cells.push({ cx: x, cy: y, a, lum, bit: (x + y) % 2 ? "1" : "0", thr });
        }
      }
      cellsRef.current = cells;
      setActive(true);
      draw(progress());
    };

    // 2) Section scroll progress → 0 (above) … 1 (below).
    function progress() {
      const r = section!.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      return Math.min(1, Math.max(0, -r.top / Math.max(1, total)));
    }

    function size() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas!.width = Math.round(rect.width * dpr);
      canvas!.height = Math.round(rect.height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // 3) Render one frame. p∈[0,1]: assemble (0–.4) → hold (.4–.55) → dissolve (.55–1).
    function draw(p: number) {
      const cells = cellsRef.current;
      if (!cells) return;
      const { cols, rows } = gridRef.current;
      const rect = canvas!.getBoundingClientRect();
      const cw = rect.width / cols;
      const ch = rect.height / rows;
      ctx!.clearRect(0, 0, rect.width, rect.height);
      ctx!.font = `${Math.max(7, ch * 0.95)}px var(--font-jetbrains-mono, monospace)`;
      ctx!.textBaseline = "top";

      // assembly fraction (0→1) and dissolve fraction (0→1)
      const assemble = Math.min(1, p / 0.4);
      const dissolve = Math.max(0, (p - 0.55) / 0.45);

      for (const c of cells) {
        const x = c.cx * cw;
        const y = c.cy * ch;
        const solidIn = assemble > c.thr; // has this cell become photo yet?
        const dissolvedOut = dissolve > c.thr; // has it turned back to a bit?

        if (solidIn && !dissolvedOut) {
          // photo mosaic block — indigo-duotone ramp from the luminance
          ctx!.globalAlpha = c.a;
          ctx!.fillStyle = ramp(c.lum, pal);
          ctx!.fillRect(x, y, cw + 0.6, ch + 0.6);
        } else {
          // a binary bit — drifting up + fading during dissolve, faint pre-assemble
          const dz = dissolvedOut ? (dissolve - c.thr) : 0;
          const drift = dz * 60;
          const alpha = dissolvedOut
            ? c.a * (1 - Math.min(1, dz * 1.6))
            : c.a * 0.22 * (1 - assemble);
          if (alpha <= 0.01) continue;
          ctx!.globalAlpha = alpha;
          ctx!.fillStyle = c.lum > 0.5 ? pal.bone : pal.voltBright;
          ctx!.fillText(c.bit, x, y - drift);
        }
      }
      ctx!.globalAlpha = 1;
    }

    function loop() {
      raf = 0;
      draw(progress());
    }
    function onScroll() {
      if (!inView || raf) return;
      raf = requestAnimationFrame(loop);
    }

    const io = new IntersectionObserver(
      ([e]) => {
        inView = e.isIntersecting;
        if (inView) onScroll();
      },
      { threshold: 0 },
    );
    io.observe(section);

    size();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => {
      size();
      draw(progress());
    });

    return () => {
      disposed = true;
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [mounted, reduced, sectionRef, canvasRef]);

  return active;
}

/** luminance → volt-dim → volt → bone indigo ramp (shadows lifted off pure ink
    so the mosaic reads as deep indigo rather than near-black mud). */
function ramp(
  lum: number,
  pal: { voltDim: string; volt: string; bone: string },
): string {
  if (lum < 0.4) return mix(pal.voltDim, pal.volt, lum / 0.4);
  return mix(pal.volt, pal.bone, (lum - 0.4) / 0.6);
}

function mix(a: string, b: string, t: number): string {
  const pa = hex(a);
  const pb = hex(b);
  const r = Math.round(pa[0] + (pb[0] - pa[0]) * t);
  const g = Math.round(pa[1] + (pb[1] - pa[1]) * t);
  const bl = Math.round(pa[2] + (pb[2] - pa[2]) * t);
  return `rgb(${r},${g},${bl})`;
}

function hex(h: string): [number, number, number] {
  const m = h.replace("#", "");
  const v = m.length === 3 ? m.split("").map((c) => c + c).join("") : m;
  return [
    parseInt(v.slice(0, 2), 16),
    parseInt(v.slice(2, 4), 16),
    parseInt(v.slice(4, 6), 16),
  ];
}
