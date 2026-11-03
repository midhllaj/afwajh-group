"use client";

import { useEffect } from "react";
import Lenis from "lenis";

let lenisInstance: Lenis | null = null;
export const getLenis = () => lenisInstance;

/**
 * Lenis smooth scrolling (off for reduced motion). GSAP is not loaded here so it
 * stays out of the shared bundle; components using ScrollTrigger subscribe to
 * Lenis themselves (see OtherBusinesses).
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Native touch scrolling feels best on phones.
      syncTouch: false,
      anchors: { offset: -90 },
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
