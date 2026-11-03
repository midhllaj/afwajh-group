"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/** Image that follows the cursor while hovering any element with data-floater="index" (desktop). */
export default function IndexFloater({ images }: { images: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let x = innerWidth / 2,
      y = innerHeight / 2,
      cx = x,
      cy = y,
      raf = 0;
    const loop = () => {
      cx += (x - cx) * 0.12;
      cy += (y - cy) * 0.12;
      const tilt = Math.max(-8, Math.min(8, (x - cx) * 0.05));
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%) rotate(${tilt}deg)`;
      raf = requestAnimationFrame(loop);
    };
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-floater]");
      setActive(t ? Number(t.dataset.floater) : null);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-30 hidden h-[340px] w-[260px] overflow-hidden transition-[opacity,clip-path] duration-500 ease-[var(--ease-expo)] lg:block",
        active === null ? "opacity-0 [clip-path:inset(50%_50%_50%_50%)]" : "opacity-100 [clip-path:inset(0_0_0_0)]",
      )}
    >
      {images.map((src, i) => (
        <div key={src} className={cn("grade absolute inset-0 transition-opacity duration-500", active === i ? "opacity-100" : "opacity-0")}>
          <Image src={src} alt="" fill sizes="260px" quality={70} className="object-cover" loading="lazy" />
        </div>
      ))}
    </div>
  );
}
