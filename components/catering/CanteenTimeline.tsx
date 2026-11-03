"use client";

import { useRef } from "react";
import { m, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { siteCanteenSteps } from "@/data/catering";

/** "How our site canteen works": a vertical timeline whose line fills as you scroll. */
export default function CanteenTimeline() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <ol ref={ref} className="relative">
      <span className="absolute bottom-6 left-[1.4rem] top-6 w-px bg-ivory/15 md:left-1/2" aria-hidden="true" />
      <m.span
        className="absolute bottom-6 left-[1.4rem] top-6 w-px origin-top bg-catering-orange md:left-1/2"
        style={{ scaleY: reduce ? 1 : progress }}
        aria-hidden="true"
      />
      {siteCanteenSteps.map((s, i) => {
        const right = i % 2 === 1;
        return (
          <m.li
            key={s.title}
            className="relative grid grid-cols-[2.8rem_1fr] gap-5 pb-12 last:pb-0 md:grid-cols-2 md:gap-16"
            initial={reduce ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-catering-orange bg-emerald-900 font-serif text-lg text-catering-orange md:absolute md:left-1/2 md:top-0 md:-translate-x-1/2">
              {i + 1}
            </span>
            <div className={right ? "md:col-start-2 md:pl-4" : "md:col-start-1 md:pr-12 md:text-right"}>
              <h3 className="font-serif text-2xl text-ivory md:text-3xl">{s.title}</h3>
              <p className="mt-3 max-w-md leading-relaxed text-ivory/70 md:inline-block">{s.text}</p>
            </div>
          </m.li>
        );
      })}
    </ol>
  );
}
