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
      const r = from.getBoundingClientRect();
      const div = document.createElement("div");
      div.setAttribute("aria-hidden", "true");
      Object.assign(div.style, {
        position: "fixed",
        left: `${r.left}px`,
        top: `${r.top}px`,
        width: `${r.width}px`,
        height: `${r.height}px`,
        zIndex: "95",
        overflow: "hidden",
        background: "#0A2321",
      });
      const img = document.createElement("img");
      img.src = src;
      img.alt = "";
      Object.assign(img.style, { width: "100%", height: "100%", objectFit: "cover", filter: "saturate(.88) contrast(1.06) brightness(.97)" });
      div.appendChild(img);
      document.body.appendChild(div);
      overlay.current = div;
      router.prefetch(href);
      div
        .animate(
          [
            { left: `${r.left}px`, top: `${r.top}px`, width: `${r.width}px`, height: `${r.height}px` },
            { left: "0px", top: "0px", width: "100vw", height: "100vh" },
          ],
          { duration: 900, easing: "cubic-bezier(0.76, 0, 0.24, 1)", fill: "forwards" },
        )
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
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
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
              <m.div
                className="bg-gold absolute inset-0"
                initial={{ y: "100%" }}
                animate={{ y: phase === "cover" ? "0%" : "-100%" }}
                transition={{ duration: 0.6, ease: EASE, delay: phase === "reveal" ? 0.1 : 0 }}
              />
              <m.div
                className="absolute inset-0 bg-emerald-deep"
                initial={{ y: "100%" }}
                animate={{ y: phase === "cover" ? "0%" : "-100%" }}
                transition={{ duration: 0.6, ease: EASE, delay: phase === "cover" ? 0.07 : 0 }}
              />
              <m.svg
                viewBox={markViewBox}
                className="absolute left-1/2 top-1/2 w-16 -translate-x-1/2 -translate-y-1/2"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={phase === "cover" ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.1 }}
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
          )}
        </AnimatePresence>
      </LazyMotion>
    </TransitionContext.Provider>
  );
}
