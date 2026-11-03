"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { getLenis } from "@/components/providers/SmoothScroll";
import { cn } from "@/lib/utils";

/** Accessible, swipeable lightbox for a gallery (opened by [data-lightbox] buttons inside [data-gallery=id]). */
export default function Lightbox({ id, images }: { id: string; images: { src: string; alt: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const touchX = useRef<number | null>(null);

  const go = useCallback((d: 1 | -1) => setOpen((i) => (i === null ? null : (i + d + images.length) % images.length)), [images.length]);
  const close = useCallback(() => {
    setOpen(null);
    lastFocus.current?.focus();
  }, []);

  // Delegate clicks from the server-rendered gallery.
  useEffect(() => {
    const list = document.querySelector(`[data-gallery="${id}"]`);
    if (!list) return;
    const onClick = (e: Event) => {
      const btn = (e.target as HTMLElement).closest<HTMLElement>("[data-lightbox]");
      if (!btn) return;
      lastFocus.current = btn;
      setOpen(Number(btn.dataset.lightbox));
    };
    list.addEventListener("click", onClick);
    return () => list.removeEventListener("click", onClick);
  }, [id]);

  useEffect(() => {
    if (open === null) return;
    getLenis()?.stop();
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
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

  if (open === null) return null;
  const img = images[open];
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      className="fixed inset-0 z-[96] flex animate-[fade-up_.4s_var(--ease-expo)] flex-col bg-emerald-deep/97 text-ivory"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div className="wrap flex h-20 shrink-0 items-center justify-between">
        <p className="t-label text-ivory/60">
          {String(open + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </p>
        <button ref={closeRef} type="button" onClick={close} className="t-label flex min-h-11 items-center gap-3 rounded-full border border-line-dark px-5 hover:border-gold-light">
          Close <span aria-hidden="true">×</span>
        </button>
      </div>
      <figure className="relative mx-[var(--gutter)] flex-1" onClick={close}>
        <Image key={img.src} src={img.src} alt={img.alt} fill sizes="100vw" quality={85} className="object-contain" />
      </figure>
      <div className="wrap flex h-24 shrink-0 items-center justify-between gap-6">
        <p className="max-w-xl text-[15px] text-ivory/70">{img.alt}</p>
        <div className="flex gap-2">
          {([-1, 1] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => go(d)}
              aria-label={d < 0 ? "Previous image" : "Next image"}
              className={cn("flex h-12 w-12 items-center justify-center rounded-full border border-line-dark hover:border-gold-light", d < 0 && "rotate-180")}
            >
              →
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
