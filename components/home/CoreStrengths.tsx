"use client";

import { m, useReducedMotion } from "framer-motion";
import Icon from "@/components/ui/Icon";
import SectionHeader from "@/components/ui/SectionHeader";
import { coreStrengths } from "@/data/site";

/** Orbit layout like the group profile on desktop; a clean list on mobile. */
export default function CoreStrengths() {
  const reduce = useReducedMotion();
  const R = 41; // % radius of the orbit
  return (
    <section className="grain relative overflow-hidden bg-emerald-800 py-24 md:py-36">
      <div className="container-x">
        <SectionHeader index="07" eyebrow="What sets us apart" title={"Core *strengths*"} align="center" />

        {/* Desktop orbit */}
        <div className="relative mx-auto mt-16 hidden aspect-square w-full max-w-[860px] lg:block">
          <m.div
            className="absolute inset-[9%] rounded-full border border-gold-light/20"
            initial={reduce ? false : { scale: 0.6, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />
          <m.div
            className="absolute inset-[30%] flex items-center justify-center rounded-full bg-emerald-600 shadow-[0_0_0_18px_rgba(26,90,82,0.35),0_0_0_40px_rgba(26,90,82,0.15)]"
            initial={reduce ? false : { scale: 0.4, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <p className="text-center font-serif text-4xl leading-tight text-ivory">
              Core
              <br />
              <span className="italic text-gold-light">Strength</span>
            </p>
          </m.div>
          {coreStrengths.map((s, i) => {
            const angle = (-90 + i * 60) * (Math.PI / 180);
            const left = 50 + R * Math.cos(angle);
            const top = 50 + R * Math.sin(angle);
            return (
              <m.div
                key={s.title}
                className="absolute flex w-56 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 text-center"
                style={{ left: `${left}%`, top: `${top}%` }}
                initial={reduce ? false : { opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, delay: 0.4 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold-light/40 bg-emerald-900 text-gold-light">
                  <Icon name={s.icon} className="h-7 w-7" />
                </span>
                <span className="text-[0.95rem] font-medium leading-snug text-ivory">{s.title}</span>
              </m.div>
            );
          })}
        </div>

        {/* Mobile / tablet list */}
        <ul className="mt-14 grid gap-px bg-ivory/10 sm:grid-cols-2 lg:hidden">
          {coreStrengths.map((s, i) => (
            <m.li
              key={s.title}
              className="flex items-center gap-5 bg-emerald-800 p-6"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: (i % 2) * 0.08 }}
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold-light/40 text-gold-light">
                <Icon name={s.icon} className="h-6 w-6" />
              </span>
              <span className="text-base font-medium text-ivory">{s.title}</span>
            </m.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
