"use client";

import { useRef } from "react";
import Image from "next/image";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import SplitHeading from "./SplitHeading";
import TLink from "./TLink";
import { useIntroDone } from "./Loader";
import type { Img } from "@/data/types";
import { cn } from "@/lib/utils";

interface Props {
  eyebrow: string;
  title: string;
  intro?: string;
  image?: Img;
  index?: string;
  breadcrumb?: { label: string; href?: string }[];
  /** Accent colour for the eyebrow rule (sub-brands). */
  accent?: "gold" | "orange" | "blue";
  logo?: { src: string; alt: string; width: number; height: number; className?: string };
  children?: React.ReactNode;
  compact?: boolean;
}

const accentClass = {
  gold: "bg-gold-gradient",
  orange: "bg-catering-orange",
  blue: "bg-fhm-blue",
};
const accentText = {
  gold: "text-gold-light",
  orange: "text-catering-orange",
  blue: "text-[#6fb6ea]",
};

/** Hero used on every inner page: parallax photo, breadcrumb, masked serif title. */
export default function PageHero({ eyebrow, title, intro, image, index, breadcrumb, accent = "gold", logo, children, compact }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const introDone = useIntroDone();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);

  return (
    <section
      ref={ref}
      className={cn(
        "relative isolate flex flex-col justify-end overflow-hidden bg-emerald-950",
        compact ? "min-h-[62svh]" : "min-h-[88svh]",
      )}
    >
      {image && (
        <m.div className="absolute inset-0 -z-10" style={reduce ? undefined : { y, scale }}>
          <Image src={image.src} alt={image.alt} fill sizes="100vw" preload fetchPriority="high" quality={70} className="object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,29,27,0.7)_0%,rgba(7,29,27,0.4)_45%,rgba(7,29,27,0.95)_100%)]" />
          <div className="absolute inset-0 mix-blend-soft-light bg-[linear-gradient(120deg,rgba(226,194,106,0.25),rgba(15,160,138,0.15))]" />
        </m.div>
      )}
      {!image && <div className="grain absolute inset-0 -z-10 bg-emerald-800" />}

      <div className="container-x pb-14 pt-[calc(var(--header-h)+4rem)] md:pb-20">
        {breadcrumb && (
          <m.nav
            aria-label="Breadcrumb"
            className="mb-10"
            initial={{ opacity: 0 }}
            animate={introDone ? { opacity: 1 } : undefined}
            transition={{ duration: 0.8 }}
          >
            <ol className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.16em] text-ivory/60">
              <li>
                <TLink href="/" className="hover:text-gold-light">
                  Home
                </TLink>
              </li>
              {breadcrumb.map((b) => (
                <li key={b.label} className="flex items-center gap-2">
                  <span aria-hidden="true">/</span>
                  {b.href ? (
                    <TLink href={b.href} className="hover:text-gold-light">
                      {b.label}
                    </TLink>
                  ) : (
                    <span aria-current="page" className="text-ivory/85">
                      {b.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </m.nav>
        )}

        <m.div
          className="mb-6 flex items-center gap-4"
          initial={{ opacity: 0, y: 12 }}
          animate={introDone ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {index && <span className={cn("font-serif text-2xl italic", accentText[accent])}>{index}</span>}
          <span className={cn("h-px w-12", accentClass[accent])} />
          <span className={cn("eyebrow", accentText[accent])}>{eyebrow}</span>
        </m.div>

        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <SplitHeading as="h1" text={title} onMount play={introDone} delay={0.15} className="display-lg max-w-[16ch] text-ivory" />
          {logo && (
            <m.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={introDone ? { opacity: 1, scale: 1 } : undefined}
              transition={{ duration: 0.9, delay: 0.5 }}
            >
              <Image src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} className={cn("h-auto w-40 md:w-52", logo.className)} />
            </m.div>
          )}
        </div>

        {intro && (
          <m.p
            className="lead mt-8 max-w-2xl text-ivory/80"
            // Painted from the first frame (often the LCP text); only position animates.
            initial={{ y: 16 }}
            animate={introDone ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            {intro}
          </m.p>
        )}
        {children && (
          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={introDone ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10"
          >
            {children}
          </m.div>
        )}
      </div>
    </section>
  );
}
