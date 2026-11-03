"use client";

import { useEffect, useRef } from "react";
import type { siteCanteenSteps } from "@/data/catering";
import { cn } from "@/lib/utils";

/** "How our site canteen works": vertical timeline whose accent line fills as you scroll. */
export default function CanteenTimeline({ steps }: { steps: typeof siteCanteenSteps }) {
  const ref = useRef<HTMLOListElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ol = ref.current;
    const b = bar.current;
    if (!ol || !b) return;
    let raf = 0;
    const update = () => {
      const r = ol.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.7 - r.top) / r.height));
      b.style.transform = `scaleY(${p})`;
      ol.querySelectorAll<HTMLElement>("[data-step]").forEach((li) => {
        const top = li.getBoundingClientRect().top;
        li.dataset.on = top < vh * 0.7 ? "1" : "0";
      });
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <ol ref={ref} className="relative mx-auto max-w-5xl">
      <span className="absolute bottom-6 left-[22px] top-6 w-px bg-line-dark md:left-1/2" aria-hidden="true" />
      <span ref={bar} className="absolute bottom-6 left-[22px] top-6 w-px origin-top scale-y-0 bg-[var(--accent)] md:left-1/2" aria-hidden="true" />
      {steps.map((s, i) => {
        const right = i % 2 === 1;
        return (
          <li key={s.title} data-step data-on="0" className="group relative grid grid-cols-[44px_1fr] gap-6 pb-14 last:pb-0 md:grid-cols-2 md:gap-20">
            <span className="t-num relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-line-dark bg-emerald-deep text-[15px] transition-colors duration-500 group-data-[on=1]:border-[var(--accent)] group-data-[on=1]:bg-[var(--accent)] group-data-[on=1]:text-emerald-deep md:absolute md:left-1/2 md:top-0 md:-translate-x-1/2">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className={cn("transition-opacity duration-700 group-data-[on=0]:opacity-40", right ? "md:col-start-2" : "md:col-start-1 md:text-right")}>
              <h3 className="t-h4">{s.title}</h3>
              <p className={cn("mt-3 max-w-md text-ivory/70", !right && "md:ml-auto")}>{s.text}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
