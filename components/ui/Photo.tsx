import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Img } from "@/data/types";

interface Props {
  image: Img;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  preload?: boolean;
  /** Apply the brand colour grade overlay. */
  grade?: boolean;
  /** Subtle zoom + gold border sweep on hover. */
  hover?: boolean;
  /** Show the "View" cursor. */
  view?: boolean;
  /** Small caption noting illustrative stock imagery. */
  showIllustrativeNote?: boolean;
}

/** next/image in a fixed-ratio frame (set the ratio via className) — no layout shift. */
export default function Photo({
  image,
  className,
  imgClassName,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  preload,
  grade = true,
  hover = false,
  view = false,
  showIllustrativeNote = false,
}: Props) {
  return (
    <div
      className={cn("relative overflow-hidden bg-emerald-900", grade && "photo-grade", hover && "img-hover", className)}
      data-cursor={view ? "view" : undefined}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        preload={preload}
        quality={70}
        className={cn("object-cover", imgClassName)}
      />
      {showIllustrativeNote && image.illustrative && (
        <span className="absolute bottom-2 right-3 z-[3] text-[10px] uppercase tracking-[0.16em] text-ivory/70">Illustrative image</span>
      )}
    </div>
  );
}
