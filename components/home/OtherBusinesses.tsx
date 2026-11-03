"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import TLink from "@/components/ui/TLink";
import SectionHeader from "@/components/ui/SectionHeader";
import Icon from "@/components/ui/Icon";
import { businesses } from "@/data/businesses";
import { getLenis } from "@/components/providers/SmoothScroll";

const others = businesses.filter((b) => b.priority === 3);

/**
 * "Our other businesses": pinned horizontal scroll on desktop (GSAP ScrollTrigger),
 * native swipe carousel with snap points on touch / small screens.
 */
export default function OtherBusinesses() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    let cleanup: (() => void) | undefined;
    let cancelled = false;

    // GSAP is loaded on demand, only where the pinned horizontal scroll is used.
    const setup = async () => {
      if (!desktop.matches || cleanup) return;
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      // Keep ScrollTrigger in sync with Lenis smooth scrolling.
      const offLenis = getLenis()?.on("scroll", ScrollTrigger.update);
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth;
        const tween = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        // Gentle parallax on each card image while the track moves.
        el.querySelectorAll<HTMLElement>("[data-parallax]").forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -8 },
            {
              xPercent: 8,
              ease: "none",
              scrollTrigger: { trigger: img, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
            },
          );
        });
      });
      cleanup = () => {
        offLenis?.();
        mm.revert();
      };
    };

    setup();
    desktop.addEventListener("change", setup);
    return () => {
      cancelled = true;
      desktop.removeEventListener("change", setup);
      cleanup?.();
    };
  }, []);

  return (
    <section ref={section} className="grain relative overflow-hidden bg-emerald-800 py-24 lg:flex lg:h-screen lg:items-center lg:py-0" aria-labelledby="other-businesses">
      <div
        ref={track}
        className="no-scrollbar flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 md:scroll-px-10 md:gap-8 md:px-10 lg:snap-none lg:overflow-visible lg:px-16"
      >
        <div className="flex w-[85vw] shrink-0 snap-start flex-col justify-center sm:w-[60vw] lg:w-[36vw]">
          <SectionHeader index="04" eyebrow="Beyond retail & hospitality" title={"Our other\n*businesses*"} />
          <span id="other-businesses" className="sr-only">Our other businesses</span>
          <p className="lead mt-8 max-w-md text-ivory/75">
            Transport and heavy machinery, supply and distribution, technical services and manpower — the capabilities that keep the region building.
          </p>
          <p className="mt-10 hidden items-center gap-3 text-sm text-gold-light lg:flex">
            <Icon name="arrow" className="h-4 w-4" /> Keep scrolling
          </p>
          <p className="mt-8 flex items-center gap-3 text-sm text-gold-light lg:hidden">
            <Icon name="arrow" className="h-4 w-4" /> Swipe
          </p>
        </div>

        {others.map((b) => (
          <TLink
            key={b.slug}
            href={b.href}
            className="group relative flex h-[68vh] max-h-[640px] min-h-[440px] w-[82vw] shrink-0 snap-start flex-col justify-end overflow-hidden sm:w-[55vw] lg:h-[72vh] lg:max-h-none lg:w-[38vw]"
            data-cursor="view"
          >
            <div className="absolute inset-0 overflow-hidden">
              <div data-parallax className="absolute -inset-x-[10%] inset-y-0">
                <Image src={b.image.src} alt={b.image.alt} fill sizes="(min-width: 1024px) 45vw, 85vw" quality={70} className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-105" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-emerald-950/10" />
            </div>
            <span className="absolute inset-0 border border-gold-light/0 transition-colors duration-700 group-hover:border-gold-light/60" />
            <div className="relative p-6 md:p-10">
              <span className="font-serif text-xl italic text-gold-light">{b.index}</span>
              <h3 className="mt-3 font-serif text-[2.1rem] leading-[1.02] text-ivory md:text-5xl">{b.name}</h3>
              {b.arabicName && (
                <p lang="ar" dir="rtl" className="font-arabic mt-2 text-lg text-ivory/70">
                  {b.arabicName}
                </p>
              )}
              <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-ivory/80">{b.summary}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-light">
                Discover <Icon name="arrowUpRight" className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </div>
          </TLink>
        ))}
        <div className="w-1 shrink-0 lg:w-[8vw]" aria-hidden="true" />
      </div>
    </section>
  );
}
