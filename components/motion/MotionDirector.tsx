"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { loadGsap } from "@/lib/gsap";

const EASE = "expo.out";

/**
 * One place that drives scroll motion for the whole site, declaratively:
 *  [data-split]        heading revealed line by line behind a mask (SplitText)
 *  [data-reveal]       fade + rise   (data-delay="0.1")
 *  [data-clip]         image clip-path reveal + slight scale-down
 *  [data-parallax="n"] vertical parallax of n% while scrolling past
 *  [data-counter]      number counts up (data-to, data-decimals, data-prefix, data-suffix)
 *  [data-magnetic]     element follows the pointer a little (desktop)
 * Runs again after every route change. Does nothing for reduced motion.
 */
export default function MotionDirector() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("motion")) return;
    let cleanup: (() => void) | undefined;
    let cancelled = false;

    // Load the engine once the browser is idle so it never competes with first paint.
    const idle = (cb: () => void) =>
      typeof window.requestIdleCallback === "function" ? window.requestIdleCallback(cb, { timeout: 1200 }) : setTimeout(cb, 300);
    const whenIdle = new Promise<void>((resolve) => idle(resolve));

    whenIdle
      .then(loadGsap)
      .then(({ gsap, ScrollTrigger, SplitText }) => {
        if (cancelled) return;
        const ctx = gsap.context(() => {
          // Split headings
          document.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
            const split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "split-line", aria: "auto" });
            el.setAttribute("data-split-ready", "");
            gsap.set(el, { opacity: 1 });
            gsap.from(split.lines, {
              yPercent: 110,
              rotate: 2,
              duration: 1.3,
              ease: EASE,
              stagger: 0.09,
              delay: Number(el.dataset.delay ?? 0),
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            });
          });

          // Fade + rise
          document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
            gsap.fromTo(
              el,
              { opacity: 0, y: 40 },
              {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: EASE,
                delay: Number(el.dataset.delay ?? 0),
                scrollTrigger: { trigger: el, start: "top 90%", once: true },
              },
            );
          });

          // Image clip reveal + scale-down
          document.querySelectorAll<HTMLElement>("[data-clip]").forEach((el) => {
            const img = el.querySelector("img");
            const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 88%", once: true } });
            tl.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" });
            if (img) tl.fromTo(img, { scale: 1.25 }, { scale: 1, duration: 1.8, ease: EASE }, 0);
          });

          // Parallax
          document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
            const amount = Number(el.dataset.parallax || 10);
            gsap.fromTo(
              el,
              { yPercent: -amount },
              { yPercent: amount, ease: "none", scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true } },
            );
          });

          // Counters
          document.querySelectorAll<HTMLElement>("[data-counter]").forEach((el) => {
            const to = Number(el.dataset.to);
            const decimals = Number(el.dataset.decimals ?? 0);
            const year = decimals === 0 && to >= 1900 && to <= 2100;
            const fmt = (n: number) =>
              (el.dataset.prefix ?? "") +
              (year ? n.toFixed(0) : n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })) +
              (el.dataset.suffix ?? "");
            const state = { v: year ? to - 40 : 0 };
            el.textContent = fmt(state.v);
            gsap.to(state, {
              v: to,
              duration: 2.2,
              ease: "expo.out",
              onUpdate: () => {
                el.textContent = fmt(state.v);
              },
              scrollTrigger: { trigger: el, start: "top 92%", once: true },
            });
          });
        }, document.body);

        // Magnetic buttons (fine pointers only)
        const offs: (() => void)[] = [];
        if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
          document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
            const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
            const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
            const move = (e: PointerEvent) => {
              const r = el.getBoundingClientRect();
              xTo((e.clientX - r.left - r.width / 2) * 0.3);
              yTo((e.clientY - r.top - r.height / 2) * 0.3);
            };
            const leave = () => {
              xTo(0);
              yTo(0);
            };
            el.addEventListener("pointermove", move);
            el.addEventListener("pointerleave", leave);
            offs.push(() => {
              el.removeEventListener("pointermove", move);
              el.removeEventListener("pointerleave", leave);
            });
          });
        }

        // Re-measure once fonts and images settle.
        const refresh = () => ScrollTrigger.refresh();
        document.fonts?.ready.then(refresh);
        window.addEventListener("load", refresh);
        root.classList.add("motion-ready");

        cleanup = () => {
          offs.forEach((off) => off());
          window.removeEventListener("load", refresh);
          ctx.revert();
        };
      })
      .catch(() => {
        // If the engine can't load, show everything without animation.
        root.classList.remove("motion");
      });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [pathname]);

  return null;
}
