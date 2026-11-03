"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface Props {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  /** Use thousands separators (off for years). */
  separator?: boolean;
  className?: string;
}

const isYear = (v: number, decimals: number) => decimals === 0 && v >= 1900 && v <= 2100;
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/** Number that counts up when scrolled into view. Screen readers get the final value. */
export default function Counter({ value, prefix = "", suffix = "", decimals = 0, duration = 2, separator, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const year = isYear(value, decimals);
  const useSep = separator ?? !year;
  const fmt = (n: number) =>
    useSep ? n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) : n.toFixed(decimals);
  // Years count from a nearby value so they don't spin through 0..2010.
  const from = year ? value - 30 : 0;
  const [display, setDisplay] = useState(() => fmt(from));

  useEffect(() => {
    if (!inView) return;
    const total = reduce ? 0 : duration * 1000;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = total === 0 ? 1 : Math.min(1, (now - start) / total);
      setDisplay(fmt(from + (value - from) * easeOutExpo(t)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value, reduce]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">
        {prefix}
        {display}
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {fmt(value)}
        {suffix}
      </span>
    </span>
  );
}
