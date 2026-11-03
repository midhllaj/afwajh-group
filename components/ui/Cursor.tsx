"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { m, useMotionValue, useSpring } from "framer-motion";

/** Custom cursor that grows over links/images. Desktop (fine pointer) only. */
export default function Cursor() {
  const enabled = useMediaQuery("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
  const [mode, setMode] = useState<"default" | "link" | "view">("default");
  const [hidden, setHidden] = useState(true);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
      const t = e.target as HTMLElement | null;
      if (t?.closest("[data-cursor='view']")) setMode("view");
      else if (t?.closest("a, button, [role='button'], input, select, textarea, label")) setMode("link");
      else setMode("default");
    };
    const leave = () => setHidden(true);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = mode === "view" ? 88 : mode === "link" ? 46 : 12;
  return (
    <m.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[110] flex items-center justify-center rounded-full border"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: size,
        height: size,
        opacity: hidden ? 0 : 1,
        backgroundColor: mode === "view" ? "rgba(226,194,106,0.92)" : mode === "link" ? "rgba(226,194,106,0.08)" : "rgba(226,194,106,1)",
        borderColor: mode === "default" ? "rgba(226,194,106,0)" : "rgba(226,194,106,0.9)",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {mode === "view" && (
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-900">View</span>
      )}
    </m.div>
  );
}
