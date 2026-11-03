"use client";

import { m, useReducedMotion } from "framer-motion";
import Counter from "@/components/ui/Counter";
import SectionHeader from "@/components/ui/SectionHeader";
import TLink from "@/components/ui/TLink";
import { workforce, workforceCopy } from "@/data/site";

/** Animated workforce distribution chart. */
export default function Workforce() {
  const reduce = useReducedMotion();
  const known = workforce.filter((w) => w.employees !== null);
  const total = known.reduce((s, w) => s + (w.employees ?? 0), 0);
  const max = Math.max(...known.map((w) => w.employees ?? 0));

  return (
    <section className="on-light bg-ivory py-24 text-ink md:py-36" aria-labelledby="workforce-title">
      <div className="container-x">
        <div className="grid-12 gap-y-14">
          <div className="col-span-12 lg:col-span-4">
            <SectionHeader index="08" eyebrow="Our team strength" title={"Total workforce\n*distribution*"} tone="light" intro={workforceCopy} />
            <span id="workforce-title" className="sr-only">Team strength</span>
            <div className="mt-12 border-t border-emerald-900/15 pt-8">
              <p className="font-serif text-[5rem] leading-none text-emerald-900 md:text-[6.5rem]">
                <Counter value={total} suffix="+" />
              </p>
              <p className="mt-2 text-sm font-medium text-muted">Employees across the group</p>
            </div>
          </div>

          <figure className="col-span-12 lg:col-span-7 lg:col-start-6">
            <figcaption className="sr-only">Employees by division</figcaption>
            <ul className="flex flex-col gap-6 md:gap-7">
              {workforce.map((w, i) => {
                const pct = w.employees ? (w.employees / max) * 100 : 0;
                return (
                  <li key={w.name}>
                    <TLink href={w.href} className="group block">
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="text-[0.95rem] font-semibold text-emerald-900 group-hover:text-emerald-600">{w.name}</span>
                        <span className="font-serif text-3xl text-emerald-900 md:text-4xl">
                          {w.employees !== null ? <Counter value={w.employees} /> : <span className="text-base text-muted">To be confirmed</span>}
                        </span>
                      </div>
                      <div className="mt-2.5 h-3 overflow-hidden rounded-full bg-emerald-900/[0.07]">
                        {w.employees !== null && (
                          <m.div
                            className="h-full rounded-full bg-[linear-gradient(90deg,#1A5A52,#0FA08A)] group-hover:bg-gold-gradient"
                            initial={reduce ? false : { width: 0 }}
                            whileInView={{ width: `${pct}%` }}
                            style={reduce ? { width: `${pct}%` } : undefined}
                            viewport={{ once: true, amount: 0.8 }}
                            transition={{ duration: 1.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                          />
                        )}
                      </div>
                    </TLink>
                  </li>
                );
              })}
            </ul>
          </figure>
        </div>
      </div>
    </section>
  );
}
