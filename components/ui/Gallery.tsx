"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import Icon from "./Icon";
import type { Img } from "@/data/types";
import { getLenis } from "@/components/providers/SmoothScroll";
import sizes from "@/data/image-sizes.json";

const dims = (src: string) => (sizes as unknown as Record<string, [number, number]>)[src] ?? [800, 600];

/** Masonry gallery with an accessible, swipeable lightbox. */
export default function Gallery({ images, columns = "columns-2 md:columns-3 lg:columns-4" }: { images: Img[]; columns?: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const touchX = useRef<number | null>(null);

  const go = useCallback((dir: 1 | -1) => setOpen((i) => (i === null ? null : (i + dir + images.length) % images.length)), [images.length]);
  const close = useCallback(() => {
    setOpen(null);
    lastFocus.current?.focus();
  }, []);

  useEffect(() => {
    if (open === null) return;
    getLenis()?.stop();
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      getLenis()?.start();
      document.body.style.overflow = "";
    };
  }, [open, go, close]);

  return (
    <>
      <ul className={`${columns} gap-3 md:gap-4`}>
        {images.map((img, i) => (
          <m.li
            key={img.src}
            className="mb-3 break-inside-avoid md:mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: (i % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              className="img-hover photo-grade block w-full"
              data-cursor="view"
              onClick={(e) => {
                lastFocus.current = e.currentTarget;
                setOpen(i);
              }}
              aria-label={`Open image: ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={dims(img.src)[0]}
                height={dims(img.src)[1]}
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                quality={70}
                className="h-auto w-full"
              />
            </button>
          </m.li>
        ))}
      </ul>

      <AnimatePresence>
        {open !== null && (
          <m.div
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
            className="fixed inset-0 z-[95] flex items-center justify-center bg-emerald-950/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
              touchX.current = null;
            }}
          >
            <AnimatePresence mode="wait">
              <m.figure
                key={open}
                className="relative mx-4 flex max-h-[82vh] w-full max-w-5xl flex-col items-center"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={images[open].src}
                  alt={images[open].alt}
                  width={dims(images[open].src)[0]}
                  height={dims(images[open].src)[1]}
                  sizes="100vw"
                  quality={80}
                  className="h-auto max-h-[74vh] w-auto max-w-full object-contain"
                />
                <figcaption className="mt-4 text-center text-sm text-ivory/75">
                  {images[open].alt} <span className="ml-2 text-ivory/45">{open + 1} / {images.length}</span>
                </figcaption>
              </m.figure>
            </AnimatePresence>
            <button ref={closeBtn} type="button" onClick={close} aria-label="Close image viewer" className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full border border-ivory/25 text-ivory hover:border-gold-light hover:text-gold-light">
              <Icon name="close" />
            </button>
            <button type="button" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Previous image" className="absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 rotate-180 items-center justify-center rounded-full border border-ivory/25 text-ivory hover:border-gold-light md:flex">
              <Icon name="arrow" />
            </button>
            <button type="button" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Next image" className="absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/25 text-ivory hover:border-gold-light md:flex">
              <Icon name="arrow" />
            </button>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
