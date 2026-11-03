"use client";

import { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";

/** Moves its content slightly against the scroll direction. */
export default function Parallax({ children, amount = 60, className }: { children: React.ReactNode; amount?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);
  return (
    <m.div ref={ref} className={className} style={reduce ? undefined : { y }}>
      {children}
    </m.div>
  );
}
