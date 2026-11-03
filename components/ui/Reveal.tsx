"use client";

import { m, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

// Supported wrapper tags, created once at module level.
const tags = {
  div: m.div,
  ul: m.ul,
  ol: m.ol,
  li: m.li,
  dl: m.dl,
  p: m.p,
  section: m.section,
  span: m.span,
} as const;
type Tag = keyof typeof tags;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** "rise" = fade + rise, "clip" = clip-path wipe up, "fade" = opacity only. */
  variant?: "rise" | "clip" | "fade";
  as?: Tag;
  amount?: number;
}

const variants: Record<NonNullable<RevealProps["variant"]>, Variants> = {
  rise: { hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0 } },
  clip: {
    hidden: { opacity: 0, clipPath: "inset(18% 0 0 0)", y: 24 },
    show: { opacity: 1, clipPath: "inset(0% 0 0 0)", y: 0 },
  },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
};

/** Scroll-triggered reveal used on every section. Static for reduced-motion users. */
export default function Reveal({ children, className, delay = 0, variant = "rise", as = "div", amount = 0.2 }: RevealProps) {
  const reduce = useReducedMotion();
  const Comp = tags[as];
  return (
    <Comp
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={variants[variant]}
      transition={{ duration: variant === "fade" ? 0.9 : 1.1, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
}

/** Staggers its direct <RevealItem> children. */
export function RevealGroup({ children, className, stagger = 0.08, as = "div" }: { children: ReactNode; className?: string; stagger?: number; as?: Tag }) {
  const reduce = useReducedMotion();
  const Comp = tags[as];
  return (
    <Comp
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </Comp>
  );
}

export function RevealItem({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: Tag }) {
  const Comp = tags[as];
  return (
    <Comp className={className} variants={variants.rise} transition={{ duration: 1, ease: EASE }}>
      {children}
    </Comp>
  );
}
