"use client";

import { useRef, type ReactNode } from "react";
import { m, useMotionValue, useSpring } from "framer-motion";
import TLink from "./TLink";
import { cn } from "@/lib/utils";

/** Wraps any element so it gently follows the pointer (desktop only). */
export function Magnetic({ children, strength = 0.35, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.5 });

  return (
    <m.span
      ref={ref}
      className={cn("inline-flex", className)}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </m.span>
  );
}

type Variant = "gold" | "outline" | "ghost" | "dark" | "orange" | "blue";

const styles: Record<Variant, string> = {
  gold: "bg-gold-gradient text-emerald-950 shadow-[0_10px_30px_-12px_rgba(226,194,106,0.6)]",
  outline: "border border-ivory/35 text-ivory hover:border-gold-light hover:text-gold-light",
  ghost: "text-ivory hover:text-gold-light",
  dark: "bg-emerald-900 text-ivory hover:bg-emerald-800",
  orange: "bg-catering-orange text-emerald-950 hover:bg-[#f5ab45]",
  blue: "bg-fhm-blue text-white hover:bg-fhm-blue-dark",
};

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  external?: boolean;
  arrow?: boolean;
  magnetic?: boolean;
  "aria-label"?: string;
}

/** Pill button with a magnetic hover and a sliding arrow. */
export default function Button({
  children,
  href,
  variant = "gold",
  className,
  type = "button",
  disabled,
  onClick,
  external,
  arrow = true,
  magnetic = true,
  ...aria
}: ButtonProps) {
  const cls = cn(
    "group relative inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden rounded-full px-7 py-3.5 text-[0.95rem] font-semibold tracking-wide transition-[color,background-color,border-color,box-shadow] duration-300 disabled:cursor-not-allowed disabled:opacity-60",
    styles[variant],
    className,
  );
  const inner = (
    <>
      <span className="relative">{children}</span>
      {arrow && (
        <span className="relative inline-flex h-4 w-4 overflow-hidden" aria-hidden="true">
          <svg viewBox="0 0 16 16" className="absolute h-4 w-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-5">
            <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          <svg viewBox="0 0 16 16" className="absolute h-4 w-4 -translate-x-5 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0">
            <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </span>
      )}
    </>
  );

  let el: ReactNode;
  if (href && (external || !href.startsWith("/"))) {
    el = (
      <a href={href} className={cls} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} {...aria}>
        {inner}
      </a>
    );
  } else if (href) {
    el = (
      <TLink href={href} className={cls} {...aria}>
        {inner}
      </TLink>
    );
  } else {
    el = (
      <button type={type} className={cls} disabled={disabled} onClick={onClick} {...aria}>
        {inner}
      </button>
    );
  }
  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}
