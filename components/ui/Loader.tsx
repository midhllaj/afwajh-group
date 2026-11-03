"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { m } from "framer-motion";

const KEY = "afw-intro-seen";
export const INTRO_EVENT = "afw:intro-done";

/** True once the intro loader has finished (immediately on repeat visits). */
export function useIntroDone() {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener(INTRO_EVENT, cb);
      return () => window.removeEventListener(INTRO_EVENT, cb);
    },
    () => {
      const el = document.documentElement;
      return el.classList.contains("intro-seen") || el.dataset.introDone === "1";
    },
    () => false,
  );
}

const subscribeNoop = () => () => {};
/** True when the head script decided to skip the intro (repeat visit / reduced motion). */
const useIntroSkipped = () =>
  useSyncExternalStore(
    subscribeNoop,
    () => document.documentElement.classList.contains("intro-seen"),
    () => false,
  );

const EASE = [0.76, 0, 0.24, 1] as const;

/**
 * Intro: the gold triangle draws itself, the logo resolves, then the screen
 * splits to reveal the hero. Max ~2s; skipped on repeat visits and for reduced motion
 * (an inline script in <head> adds `intro-seen` before first paint).
 */
export default function Loader() {
  const [stage, setStage] = useState<"draw" | "split" | "gone">("draw");
  const skipped = useIntroSkipped();

  useEffect(() => {
    const el = document.documentElement;
    if (el.classList.contains("intro-seen")) return;
    const finish = () => {
      el.dataset.introDone = "1";
      window.dispatchEvent(new Event(INTRO_EVENT));
    };
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
    const t1 = window.setTimeout(() => {
      setStage("split");
      finish();
    }, 1250);
    const t2 = window.setTimeout(() => setStage("gone"), 2000);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  if (skipped || stage === "gone") return null;

  const split = stage === "split";
  return (
    <div className="afw-loader fixed inset-0 z-[100]" aria-hidden="true">
      <m.div
        className="absolute inset-x-0 top-0 h-1/2 bg-emerald-900"
        animate={split ? { y: "-100%" } : { y: 0 }}
        transition={{ duration: 0.75, ease: EASE }}
      />
      <m.div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-emerald-900"
        animate={split ? { y: "100%" } : { y: 0 }}
        transition={{ duration: 0.75, ease: EASE }}
      />
      <m.div
        className="absolute left-1/2 top-1/2 h-px w-[min(60vw,520px)] -translate-x-1/2 bg-gold-gradient"
        initial={{ scaleX: 0 }}
        animate={split ? { scaleX: 1.6, opacity: 0 } : { scaleX: 1, opacity: 0.6 }}
        transition={{ duration: split ? 0.5 : 1.1, ease: EASE }}
      />
      <m.div
        className="absolute left-1/2 top-1/2 w-28 -translate-x-1/2 -translate-y-1/2 md:w-36"
        animate={split ? { opacity: 0, scale: 1.08 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <svg viewBox="0 0 120 104" className="absolute inset-0 h-full w-full overflow-visible">
          <defs>
            <linearGradient id="loader-gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#B8862F" />
              <stop offset="0.5" stopColor="#E2C26A" />
              <stop offset="1" stopColor="#A87324" />
            </linearGradient>
          </defs>
          <m.path
            d="M60 2 L118 102 L2 102 Z"
            fill="none"
            stroke="url(#loader-gold)"
            strokeWidth="1.5"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1, opacity: [1, 1, 0] }}
            transition={{ pathLength: { duration: 0.85, ease: "easeInOut" }, opacity: { duration: 1.2, times: [0, 0.75, 1] } }}
          />
        </svg>
        <m.img
          src="/images/logos/afwajh-mark.png"
          alt=""
          width={600}
          height={520}
          className="relative block h-auto w-full"
          initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
          transition={{ delay: 0.55, duration: 0.6, ease: EASE }}
        />
      </m.div>
    </div>
  );
}
