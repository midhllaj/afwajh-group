"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal, { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import LineArt from "@/components/ui/LineArt";
import { restaurantsIntro, venues } from "@/data/restaurants";

/** Editorial "menu" list of venues; hovering (or tapping on touch) previews the venue photo. */
export default function FeaturedRestaurants() {
  const [active, setActive] = useState(0);
  const venue = venues[active];

  return (
    <section className="on-light relative overflow-hidden bg-ivory py-24 text-ink md:py-36">
      <div className="container-x">
        <div className="grid-12 gap-y-10">
          <div className="col-span-12 lg:col-span-7">
            <SectionHeader index="02" eyebrow="Hospitality Division" title={"Restaurants\n& *Cafeterias*"} intro={restaurantsIntro} tone="light" size="lg" />
          </div>
          <div className="col-span-12 hidden lg:col-span-3 lg:col-start-10 lg:block">
            <LineArt name="chef" className="ml-auto w-full max-w-[260px]" accent="#1A5A52" />
          </div>
        </div>

        <div className="grid-12 mt-16 gap-y-10 md:mt-24">
          {/* Sticky photo preview */}
          <div className="col-span-12 md:col-span-5">
            <div className="md:sticky md:top-28">
              <div className="photo-grade relative aspect-[4/5] overflow-hidden bg-emerald-900" data-cursor="view">
                <AnimatePresence initial={false} mode="popLayout">
                  <m.div
                    key={venue.id}
                    className="absolute inset-0"
                    initial={{ clipPath: "inset(100% 0 0 0)", scale: 1.1 }}
                    animate={{ clipPath: "inset(0% 0 0 0)", scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <Image src={venue.image.src} alt={venue.image.alt} fill sizes="(min-width: 768px) 40vw, 100vw" quality={70} className="object-cover" />
                  </m.div>
                </AnimatePresence>
                <div className="absolute inset-x-0 bottom-0 z-[3] bg-gradient-to-t from-emerald-950/85 to-transparent p-6 text-ivory">
                  <p className="font-serif text-3xl">{venue.name}</p>
                  <p className="mt-1 text-sm text-ivory/75">{venue.location}</p>
                  {venue.image.illustrative && <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-ivory/55">Illustrative image</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Menu list */}
          <RevealGroup as="ol" className="col-span-12 md:col-span-6 md:col-start-7" stagger={0.06}>
            {venues.map((v, i) => (
              <RevealItem as="li" key={v.id} className="border-b border-emerald-900/15 first:border-t">
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={active === i}
                  className="group grid w-full grid-cols-[2rem_1fr] items-baseline gap-x-3 py-5 text-left md:py-6"
                >
                  <span className="font-serif text-sm italic text-gold-deep">{String(i + 1).padStart(2, "0")}</span>
                  <span className="min-w-0">
                    <span className="flex items-baseline gap-4">
                      <span className={`font-serif text-[1.65rem] leading-tight transition-colors md:text-[2.1rem] ${active === i ? "text-emerald-700" : "text-emerald-900"}`}>
                        {v.name}
                      </span>
                      <span aria-hidden="true" className="hidden min-w-6 flex-1 border-b border-dotted border-emerald-900/25 sm:block" />
                      <span className="ml-auto max-w-[45%] shrink-0 text-right text-sm text-muted">{v.location}</span>
                    </span>
                    <span className="mt-2 flex flex-wrap gap-1.5">
                      {v.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="rounded-full border border-emerald-900/15 px-2.5 py-0.5 text-[11px] font-medium text-emerald-800">
                          {tag}
                        </span>
                      ))}
                    </span>
                  </span>
                </button>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <Reveal className="mt-14 flex md:justify-end">
          <Button href="/businesses/restaurants" variant="dark">
            Explore our venues
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
