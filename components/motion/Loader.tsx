"use client";

import { useEffect, useRef, useState } from "react";
import { markPaths, markViewBox } from "@/lib/logoPaths";

/**
 * First-visit intro (≤ 2 s): the triangle mark draws itself in gold while a counter
 * runs 0 → 100, then the screen splits to reveal the hero. Hidden by CSS unless the
 * boot script added `intro-play` (first visit, motion allowed).
 */
export default function Loader() {
  const [stage, setStage] = useState<"run" | "out" | "done">("run");
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    // Repeat visits: CSS keeps the loader hidden; nothing to run.
    if (!root.classList.contains("intro-play")) return;
    try {
      localStorage.setItem("afw-intro-seen", "1");
    } catch {}
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1250);
      const eased = 1 - Math.pow(1 - t, 3);
      if (countRef.current) countRef.current.textContent = String(Math.round(eased * 100)).padStart(3, "0");
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const t1 = window.setTimeout(() => setStage("out"), 1300);
    const t2 = window.setTimeout(() => setStage("done"), 2050);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  if (stage === "done") return null;
  const out = stage === "out";

  return (
    <div className="afw-loader fixed inset-0 z-[100] text-ivory" aria-hidden="true">
      <div
        className="absolute inset-x-0 top-0 h-1/2 bg-emerald-deep transition-transform duration-700 ease-[var(--ease-quart)]"
        style={{ transform: out ? "translateY(-100%)" : "none" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-emerald-deep transition-transform duration-700 ease-[var(--ease-quart)]"
        style={{ transform: out ? "translateY(100%)" : "none" }}
      />
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-8 transition-opacity duration-300"
        style={{ opacity: out ? 0 : 1 }}
      >
        <svg viewBox={markViewBox} className="w-24 overflow-visible md:w-32">
          <defs>
            <linearGradient id="loader-gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#B8862F" />
              <stop offset=".5" stopColor="#E2C26A" />
              <stop offset="1" stopColor="#A87324" />
            </linearGradient>
          </defs>
          {markPaths.map((d, i) => (
            <path
              key={i}
              d={d}
              pathLength={1}
              fill="url(#loader-gold)"
              stroke="url(#loader-gold)"
              strokeWidth={0.8}
              className="loader-path"
              style={{ animationDelay: `${i * 0.12}s` }}
            />
          ))}
        </svg>
        <span className="t-label flex items-center gap-3 text-ivory/60">
          <span ref={countRef} className="t-num w-[3ch] text-base tracking-normal text-gold-light">
            000
          </span>
          Afwajh Group
        </span>
      </div>
      <style>{`
        .loader-path { stroke-dasharray: 1; stroke-dashoffset: 1; fill-opacity: 0;
          animation: loader-draw 0.9s cubic-bezier(.65,0,.35,1) forwards, loader-fill 0.5s ease forwards 0.75s; }
        @keyframes loader-draw { to { stroke-dashoffset: 0; } }
        @keyframes loader-fill { to { fill-opacity: 1; } }
      `}</style>
    </div>
  );
}
