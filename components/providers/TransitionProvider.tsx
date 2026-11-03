"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { m, AnimatePresence } from "framer-motion";
import { getLenis } from "./SmoothScroll";

type Phase = "idle" | "cover" | "reveal";

const TransitionContext = createContext<{ navigate: (href: string) => void }>({
  navigate: () => {},
});

export const usePageTransition = () => useContext(TransitionContext);

const COVER_MS = 620;
const EASE = [0.76, 0, 0.24, 1] as const;

/** Gold/green curtain wipe between routes. */
export default function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const pending = useRef<string | null>(null);
  const prevPath = useRef(pathname);

  const navigate = useCallback(
    (href: string) => {
      const url = new URL(href, window.location.href);
      if (url.pathname === window.location.pathname) {
        const lenis = getLenis();
        const el = url.hash ? document.querySelector<HTMLElement>(url.hash) : null;
        if (url.hash && !el) return;
        if (lenis) lenis.scrollTo(el ?? 0, { offset: el ? -80 : 0 });
        else if (el) el.scrollIntoView({ behavior: "smooth" });
        else window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        router.push(href);
        return;
      }
      pending.current = href;
      setPhase("cover");
      window.setTimeout(() => router.push(href), COVER_MS);
    },
    [router],
  );

  useEffect(() => {
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
    // Let scroll-driven effects (e.g. ScrollTrigger) re-measure the new page.
    requestAnimationFrame(() => window.dispatchEvent(new Event("resize")));
    if (pending.current) {
      pending.current = null;
      setPhase("reveal");
      const id = window.setTimeout(() => setPhase("idle"), 900);
      return () => window.clearTimeout(id);
    }
  }, [pathname]);

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <AnimatePresence>
        {phase !== "idle" && (
          <div className="pointer-events-auto fixed inset-0 z-[90]" aria-hidden="true" key="curtain">
            <m.div
              className="bg-gold-gradient absolute inset-0 origin-bottom"
              initial={{ scaleY: 0 }}
              animate={phase === "cover" ? { scaleY: 1, transformOrigin: "bottom" } : { scaleY: 0, transformOrigin: "top" }}
              transition={{ duration: 0.55, ease: EASE, delay: phase === "reveal" ? 0.12 : 0 }}
            />
            <m.div
              className="absolute inset-0 origin-bottom bg-emerald-900"
              initial={{ scaleY: 0 }}
              animate={phase === "cover" ? { scaleY: 1, transformOrigin: "bottom" } : { scaleY: 0, transformOrigin: "top" }}
              transition={{ duration: 0.55, ease: EASE, delay: phase === "cover" ? 0.08 : 0 }}
            />
            <m.img
              src="/images/logos/afwajh-mark.png"
              alt=""
              className="absolute left-1/2 top-1/2 w-16 -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={phase === "cover" ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.35, delay: phase === "cover" ? 0.3 : 0 }}
            />
          </div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}
