"use client";

import { m, useInView, useReducedMotion } from "framer-motion";
import { Fragment, useRef, type ElementType } from "react";
import { cn } from "@/lib/utils";

interface Props {
  /** Use "\n" to force line breaks. Wrap a word in *asterisks* to italicise it in gold. */
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** When false, waits (e.g. for the intro loader) before animating. */
  play?: boolean;
  /** Animate on mount instead of when scrolled into view. */
  onMount?: boolean;
}

const EASE = [0.16, 1, 0.3, 1] as const;

/** Large serif headline revealed word by word behind a line mask. */
export default function SplitHeading({ text, as: Tag = "h2", className, delay = 0, play = true, onMount = false }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const active = play && (onMount || inView);
  const lines = text.split("\n");
  let index = 0;

  return (
    <Tag ref={ref} className={className} aria-label={text.replace(/\*/g, "").replace(/\n/g, " ")}>
      <span aria-hidden="true" className="block">
        {lines.map((line, li) => (
          <span key={li} className="block">
            {line.split(" ").map((word, wi, arr) => {
              const italic = word.startsWith("*") && word.endsWith("*");
              const clean = word.replace(/\*/g, "");
              const d = delay + index++ * 0.06;
              return (
                <Fragment key={`${li}-${wi}`}>
                  <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                    <m.span
                      // Remount when activated so the reveal always runs as a mount animation
                      // (a target change during hydration can otherwise be dropped).
                      key={active ? "on" : "off"}
                      className={cn("inline-block will-change-transform", italic && "text-gold-gradient pr-[0.06em] italic")}
                      initial={reduce ? false : { y: "110%", rotate: 4 }}
                      animate={reduce || active ? { y: "0%", rotate: 0 } : { y: "110%", rotate: 4 }}
                      transition={{ duration: 1.1, ease: EASE, delay: d }}
                    >
                      {clean}
                    </m.span>
                  </span>
                  {wi < arr.length - 1 && " "}
                </Fragment>
              );
            })}
          </span>
        ))}
      </span>
    </Tag>
  );
}
