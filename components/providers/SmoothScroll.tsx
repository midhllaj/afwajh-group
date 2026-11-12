"use client";

import { useEffect } from "react";
import Lenis from "lenis";

let lenisInstance: Lenis | null = null;
export const getLenis = () => lenisInstance;

/** Lenis smooth scrolling (off for reduced motion and on touch devices, which scroll natively). */
export default function SmoothScroll() {
  useEffect(() => {
    if (!document.documentElement.classList.contains("motion")) return;
    // Phones and tablets keep the browser's own momentum scrolling: it runs off the main
    // thread, so it stays smooth even while the page is busy.
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      anchors: { offset: -100 },
      autoRaf: true,
    });
    lenisInstance = lenis;
    return () => {
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return null;
}
