"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, LazyMotion, m } from "framer-motion";
import { getLenis } from "./SmoothScroll";
import { markPaths, markViewBox } from "@/lib/logoPaths";

type Phase = "idle" | "cover" | "reveal";

interface TransitionApi {
  navigate: (href: string) => void;
  /** Shared-element style transition: grow `image` from its rect to full screen, then navigate. */
  navigateWithImage: (href: string, from: HTMLElement, src: string) => void;
}

const TransitionContext = createContext<TransitionApi>({ navigate: () => {}, navigateWithImage: () => {} });
export const usePageTransition = () => useContext(TransitionContext);

const EASE = [0.76, 0, 0.24, 1] as const;
const COVER_MS = 650;

const loadFeatures = () => import("./motion-features").then((mod) => mod.default);

const motionOn = () => document.documentElement.classList.contains("motion");

/** Emerald curtain with the gold triangle mark between routes (Framer Motion). */
export default function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const pending = useRef(false);
  const overlay = useRef<HTMLDivElement | null>(null);
  const prevPath = useRef(pathname);

  const navigate = useCallback(
    (href: string) => {
      const url = new URL(href, window.location.href);
      if (url.pathname === window.location.pathname) {
        const lenis = getLenis();
        const el = url.hash ? document.querySelector<HTMLElement>(url.hash) : null;
        if (url.hash && !el) return;
        if (lenis) lenis.scrollTo(el ?? 0, { offset: el ? -100 : 0 });
        else if (el) el.scrollIntoView({ behavior: "smooth" });
        else window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      if (!motionOn()) return router.push(href);
      pending.current = true;
      setPhase("cover");
      window.setTimeout(() => router.push(href), COVER_MS);
    },
    [router],
  );

  const navigateWithImage = useCallback(
    (href: string, from: HTMLElement, src: string) => {
      if (!motionOn()) return router.push(href);
      // Compositor-only version of "grow the image to full screen": the overlay is full screen
      // from the start and is clipped down to the source rect, while the full-screen image is
      // scaled/moved to match the source's object-cover framing exactly. Animating only clip-path
      // and transform (never left/top/width/height) means no layout or image re-paint per frame.
      const r = from.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const source = from.querySelector("img");
      const iw = source?.naturalWidth || 0;
      const ih = source?.naturalHeight || 0;
      // Ratio of the source's cover scale to the full screen's cover scale.
      const k = iw && ih ? Math.max(r.width / iw, r.height / ih) / Math.max(vw / iw, vh / ih) : Math.max(r.width / vw, r.height / vh);
      const dx = r.left + r.width / 2 - vw / 2;
      const dy = r.top + r.height / 2 - vh / 2;
      const clipFrom = `inset(${r.top}px ${vw - r.right}px ${vh - r.bottom}px ${r.left}px)`;

      const div = document.createElement("div");
      div.setAttribute("aria-hidden", "true");
      Object.assign(div.style, {
        position: "fixed",
        inset: "0",
        zIndex: "95",
        overflow: "hidden",
        background: "#0A2321",
        clipPath: clipFrom,
        willChange: "clip-path",
      });
      const img = document.createElement("img");
      img.src = src;
      img.alt = "";
      Object.assign(img.style, {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        filter: "saturate(.88) contrast(1.06) brightness(.97)",
        transform: `translate3d(${dx}px, ${dy}px, 0) scale(${k})`,
        willChange: "transform",
      });
      div.appendChild(img);
      document.body.appendChild(div);
      overlay.current = div;
      router.prefetch(href);
      const timing: KeyframeAnimationOptions = { duration: 900, easing: "cubic-bezier(0.76, 0, 0.24, 1)", fill: "forwards" };
      img.animate([{ transform: img.style.transform }, { transform: "translate3d(0, 0, 0) scale(1)" }], timing);
      div
        .animate([{ clipPath: clipFrom }, { clipPath: "inset(0px 0px 0px 0px)" }], timing)
        .finished.then(() => router.push(href));
    },
    [router],
  );

  // After the route changes: reset scroll, drop the intro delay, then reveal.
  useEffect(() => {
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;
    document.documentElement.classList.remove("intro-play");
    const lenis = getLenis();
    // A link to a section on another page lands on that section, not the top.
    const section = window.location.hash ? document.querySelector<HTMLElement>(window.location.hash) : null;
    if (section) {
      const toSection = () => {
        lenis?.resize();
        if (lenis) lenis.scrollTo(section, { offset: -100, immediate: true, force: true });
        else section.scrollIntoView();
      };
      toSection();
      // Scroll animations change the layout as they set up; settle again behind the curtain.
      window.setTimeout(toSection, 300);
    } else if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
    requestAnimationFrame(() => window.dispatchEvent(new Event("resize")));

    const ov = overlay.current;
    if (ov) {
      overlay.current = null;
      const t = window.setTimeout(() => {
        ov.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 700, easing: "ease", fill: "forwards" }).finished.then(() => ov.remove());
      }, 300);
      return () => window.clearTimeout(t);
    }
    if (pending.current) {
      pending.current = false;
      setPhase("reveal");
      const t = window.setTimeout(() => setPhase("idle"), 900);
      return () => window.clearTimeout(t);
    }
  }, [pathname]);

  return (
    <TransitionContext.Provider value={{ navigate, navigateWithImage }}>
      {children}
      <LazyMotion features={loadFeatures}>
        <AnimatePresence>
          {phase !== "idle" && (
            <div className="fixed inset-0 z-[90]" aria-hidden="true" key="curtain">
              {/* Whole `transform` strings (not x/y/scale) let Motion hand these to the browser's
                  compositor, so the curtain stays smooth while the next page renders underneath. */}
              <m.div
                className="bg-gold absolute inset-0 will-change-transform"
                initial={{ transform: "translate3d(0, 100%, 0)" }}
                animate={{ transform: phase === "cover" ? "translate3d(0, 0%, 0)" : "translate3d(0, -100%, 0)" }}
                transition={{ duration: 0.6, ease: EASE, delay: phase === "reveal" ? 0.1 : 0 }}
              />
              <m.div
                className="absolute inset-0 bg-emerald-deep will-change-transform"
                initial={{ transform: "translate3d(0, 100%, 0)" }}
                animate={{ transform: phase === "cover" ? "translate3d(0, 0%, 0)" : "translate3d(0, -100%, 0)" }}
                transition={{ duration: 0.6, ease: EASE, delay: phase === "cover" ? 0.07 : 0 }}
              />
              <div className="absolute left-1/2 top-1/2 w-16 -translate-x-1/2 -translate-y-1/2">
                <m.svg
                  viewBox={markViewBox}
                  className="block w-full"
                  initial={{ opacity: 0, transform: "scale(0.85)" }}
                  animate={phase === "cover" ? { opacity: 1, transform: "scale(1)" } : { opacity: 0, transform: "scale(1.1)" }}
                  transition={{ duration: 0.4, delay: phase === "cover" ? 0.3 : 0 }}
                >
                  <defs>
                    <linearGradient id="curtain-gold" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#B8862F" />
                      <stop offset=".5" stopColor="#E2C26A" />
                      <stop offset="1" stopColor="#A87324" />
                    </linearGradient>
                  </defs>
                  {markPaths.map((d, i) => (
                    <path key={i} d={d} fill="url(#curtain-gold)" />
                  ))}
                </m.svg>
              </div>
            </div>
          )}
        </AnimatePresence>
      </LazyMotion>
    </TransitionContext.Provider>
  );
}
