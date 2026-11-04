"use client";

import { useState, type ReactNode } from "react";
import Icon from "@/components/ui/IconMini";
import { cn } from "@/lib/utils";

/**
 * Stacks photos in one frame and cross-fades between them with a small next arrow in
 * the bottom corner. Takes rendered <Media> elements so image data stays on the server.
 */
export default function MediaSwitcher({ slides, label = "Next image" }: { slides: ReactNode[]; label?: string }) {
  const [current, setCurrent] = useState(0);
  // Only the photos reached so far, plus the next one, are mounted, so long sets stay light.
  const [mounted, setMounted] = useState(2);

  const next = () => {
    const to = (current + 1) % slides.length;
    setCurrent(to);
    setMounted((m) => Math.max(m, to + 2));
  };

  return (
    <div className="relative">
      {slides.slice(0, mounted).map((slide, i) => (
        <div
          key={i}
          aria-hidden={i !== current}
          className={cn("transition-opacity duration-700 ease-[var(--ease-expo)]", i > 0 && "absolute inset-0", i === current ? "opacity-100" : "pointer-events-none opacity-0")}
        >
          {slide}
        </div>
      ))}
      <button
        type="button"
        onClick={next}
        aria-label={`${label} (showing ${current + 1} of ${slides.length})`}
        className="absolute bottom-3 right-3 z-[2] flex h-11 w-11 items-center justify-center rounded-full bg-emerald-deep/85 text-ivory ring-1 ring-ivory/30 transition-colors hover:bg-[var(--accent)] hover:text-emerald-deep"
      >
        <Icon name="arrow" size={18} />
      </button>
    </div>
  );
}
