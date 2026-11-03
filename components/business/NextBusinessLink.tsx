"use client";

import Link from "next/link";
import { usePageTransition } from "@/components/providers/TransitionProvider";

/** Link that expands its image to full screen before navigating (see TransitionProvider). */
export default function NextBusinessLink({
  href,
  className,
  accent,
  children,
}: {
  href: string;
  className?: string;
  accent: string;
  children: React.ReactNode;
}) {
  const { navigateWithImage } = usePageTransition();
  return (
    <Link
      href={href}
      className={className}
      style={{ ["--accent" as string]: accent }}
      data-cursor="Next"
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        const frame = e.currentTarget.querySelector<HTMLElement>(".next-img");
        const img = frame?.querySelector("img");
        if (!frame || !img) return;
        e.preventDefault();
        navigateWithImage(href, frame, img.currentSrc || img.src);
      }}
    >
      {children}
    </Link>
  );
}
