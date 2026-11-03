"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import SplitHeading from "@/components/ui/SplitHeading";
import Button from "@/components/ui/Button";
import { useIntroDone } from "@/components/ui/Loader";
import { site } from "@/data/site";
import { t } from "@/lib/i18n";

const slides = [
  { src: "/images/retail/supermarket-interior.webp", alt: "Warm-lit supermarket interior with wooden shelving", label: "Supermarkets & Minimarts" },
  { src: "/images/restaurants/cafe-52-storefront.webp", alt: "Cafe 52 storefront in Town Square, Dubai", label: "Restaurants & Cafeterias" },
  { src: "/images/catering/event-buffet.webp", alt: "Corporate event buffet by Afwajh Catering", label: "Catering Services" },
  { src: "/images/fhm/fhm-heavy-machinery.webp", alt: "FHM heavy machinery fleet", label: "FHM General Transport" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const introDone = useIntroDone();
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-emerald-950" aria-label="Introduction">
      <m.div className="absolute inset-0 -z-10" style={reduce ? undefined : { y: bgY }}>
        <AnimatePresence initial={false}>
          <m.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          >
            <Image
              src={slides[index].src}
              alt={slides[index].alt}
              fill
              sizes="100vw"
              preload={index === 0}
              fetchPriority={index === 0 ? "high" : undefined}
              quality={70}
              className="object-cover [animation:kenburns_9s_ease-out_forwards]"
            />
          </m.div>
        </AnimatePresence>
        {/* Brand grade + legibility */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,29,27,0.65)_0%,rgba(7,29,27,0.35)_40%,rgba(7,29,27,0.92)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(15,53,50,0.85),transparent_60%)]" />
        <div className="absolute inset-0 mix-blend-soft-light bg-[linear-gradient(120deg,rgba(226,194,106,0.25),rgba(15,160,138,0.15))]" />
      </m.div>

      <m.div className="container-x relative flex flex-1 flex-col justify-end pb-24 pt-[calc(var(--header-h)+3rem)] md:pb-28" style={reduce ? undefined : { y: contentY, opacity: fade }}>
        <m.div
          className="mb-8 flex items-center gap-4"
          initial={{ y: 12 }}
          animate={introDone ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
        >
          <span className="h-px w-12 bg-gold-gradient" />
          <span className="eyebrow text-gold-light">Est. {site.established} · United Arab Emirates</span>
        </m.div>

        <SplitHeading
          as="h1"
          onMount
          play={introDone}
          delay={0.15}
          text={"Afwajh Group\nof *Companies*"}
          className="display-xl max-w-[14ch] text-ivory"
        />

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:items-end">
          <m.p
            className="lead max-w-xl text-ivory/85 md:col-span-6"
            // Opacity stays at 1 so this (the LCP text on phones) paints immediately.
            initial={{ y: 20 }}
            animate={introDone ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1, ease: EASE, delay: 0.6 }}
          >
            <span className="font-serif text-[1.35em] italic text-gold-light">{site.tagline}</span>
            <br />
            Supermarkets, restaurants, catering, transport, trading, technical services and manpower — across Dubai, Abu Dhabi, Sharjah and Ras Al Khaimah.
          </m.p>
          <m.div
            className="flex flex-col gap-3 sm:flex-row md:col-span-6 md:justify-end"
            initial={{ y: 20 }}
            animate={introDone ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1, ease: EASE, delay: 0.75 }}
          >
            <Button href="/#businesses">{t.cta.explore}</Button>
            <Button href="/contact" variant="outline">
              {t.cta.contact}
            </Button>
          </m.div>
        </div>
      </m.div>

      {/* Slide indicator */}
      <div className="container-x absolute inset-x-0 bottom-6 hidden items-center justify-between text-xs text-ivory/70 md:flex">
        <div className="flex items-center gap-3" aria-hidden="true">
          <span className="h-8 w-px overflow-hidden bg-ivory/20">
            <m.span
              className="block h-full w-full bg-gold-light"
              animate={reduce ? undefined : { y: ["-100%", "100%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
          <span className="eyebrow">Scroll</span>
        </div>
        <div className="flex items-center gap-4" aria-live="polite">
          <span className="eyebrow">{slides[index].label}</span>
          <span className="flex gap-1.5">
            {slides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                aria-label={`Show ${s.label}`}
                aria-pressed={i === index}
                onClick={() => setIndex(i)}
                className="flex h-6 items-center"
              >
                <span className={`block h-px transition-all duration-700 ${i === index ? "w-10 bg-gold-light" : "w-5 bg-ivory/35"}`} />
              </button>
            ))}
          </span>
        </div>
      </div>
    </section>
  );
}
