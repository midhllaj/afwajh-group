"use client";

import { getLenis } from "@/components/providers/SmoothScroll";

type GsapBundle = {
  gsap: typeof import("gsap").gsap;
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
  SplitText: typeof import("gsap/SplitText").SplitText;
};

let promise: Promise<GsapBundle> | null = null;

/**
 * Loads GSAP + ScrollTrigger + SplitText once, on demand (after hydration), so the
 * animation engine never blocks the first paint. Also keeps ScrollTrigger in sync
 * with Lenis smooth scrolling.
 */
export function loadGsap() {
  promise ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger"), import("gsap/SplitText")]).then(
    ([{ gsap }, { ScrollTrigger }, { SplitText }]) => {
      gsap.registerPlugin(ScrollTrigger, SplitText);
      const lenis = getLenis();
      if (lenis) {
        lenis.on("scroll", ScrollTrigger.update);
      }
      return { gsap, ScrollTrigger, SplitText };
    },
  );
  return promise;
}
