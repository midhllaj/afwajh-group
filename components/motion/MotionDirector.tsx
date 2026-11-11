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
 *  [data-words]        [data-word] children light up one by one with the scroll
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
        // ScrollTrigger throws on triggers inside display:none sections (e.g. desktop-only blocks on phones),
        // so those are shown as-is without animation.
        const each = (selector: string, fn: (el: HTMLElement) => void) =>
          document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
            if (el.getClientRects().length > 0) return fn(el);
            el.setAttribute("data-split-ready", "");
            gsap.set(el, { opacity: 1, clipPath: "none" });
          });

        // Inside [data-replay], an animation plays each time it scrolls into view (either direction)
        // and quietly resets once it is fully off screen again.
        const replay = (el: HTMLElement, tween: gsap.core.Tween, start: string) => {
          const play = () => {
            if (tween.progress() === 0) tween.restart(true);
          };
          const reset = () => tween.pause(0);
          ScrollTrigger.create({ trigger: el, start, end: "bottom 10%", onEnter: play, onEnterBack: play });
          ScrollTrigger.create({ trigger: el, start: "top bottom", end: "bottom top", onLeave: reset, onLeaveBack: reset });
        };
        const replays = (el: HTMLElement) => el.closest("[data-replay]") !== null;

        const ctx = gsap.context(() => {
          // Split headings
          each("[data-split]", (el) => {
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
          each("[data-reveal]", (el) => {
            const to = { opacity: 1, y: 0, duration: 1.2, ease: EASE, delay: Number(el.dataset.delay ?? 0) };
            if (replays(el)) {
              replay(el, gsap.fromTo(el, { opacity: 0, y: 40 }, { ...to, paused: true }), "top 90%");
            } else {
              gsap.fromTo(el, { opacity: 0, y: 40 }, { ...to, scrollTrigger: { trigger: el, start: "top 90%", once: true } });
            }
          });

          // Image clip reveal + scale-down
          each("[data-clip]", (el) => {
            const img = el.querySelector("img");
            const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 88%", once: true } });
            tl.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" });
            if (img) tl.fromTo(img, { scale: 1.25 }, { scale: 1, duration: 1.8, ease: EASE }, 0);
          });

          // Words lighting up with the scroll
          each("[data-words]", (el) => {
            gsap.fromTo(
              el.querySelectorAll("[data-word]"),
              { opacity: 0.18 },
              { opacity: 1, ease: "none", stagger: 0.1, scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 48%", scrub: true } },
            );
          });

          // Parallax
          each("[data-parallax]", (el) => {
            const amount = Number(el.dataset.parallax || 10);
            gsap.fromTo(
              el,
              { yPercent: -amount },
              { yPercent: amount, ease: "none", scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true } },
            );
          });

          // Counters
          each("[data-counter]", (el) => {
            const to = Number(el.dataset.to);
            const decimals = Number(el.dataset.decimals ?? 0);
            const year = decimals === 0 && to >= 1900 && to <= 2100;
            const fmt = (n: number) =>
              (el.dataset.prefix ?? "") +
              (year ? n.toFixed(0) : n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })) +
              (el.dataset.suffix ?? "");
            const from = year ? to - 40 : 0;
            const state = { v: from };
            el.textContent = fmt(from);
            const count = {
              v: to,
              duration: 2.2,
              ease: "expo.out",
              onUpdate: () => {
                el.textContent = fmt(state.v);
              },
            };
            if (replays(el)) {
              replay(el, gsap.fromTo(state, { v: from }, { ...count, paused: true }), "top 92%");
            } else {
              gsap.to(state, { ...count, scrollTrigger: { trigger: el, start: "top 92%", once: true } });
            }
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
      .catch((err) => {
        if (process.env.NODE_ENV !== "production") console.error("[MotionDirector]", err);
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
