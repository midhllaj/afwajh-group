import Image from "next/image";
import meta from "@/data/image-meta.json";
import type { Img } from "@/data/types";
import { cn } from "@/lib/utils";

type Meta = Record<string, { w: number; h: number; blur: string }>;
const info = (src: string) => (meta as Meta)[src];

interface Props {
  image: Img;
  /** Frame classes — set the aspect ratio/size here (e.g. "aspect-[4/5]"). */
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** Clip-path reveal on scroll. */
  reveal?: boolean;
  /** Parallax depth in % (image is over-scaled to allow movement). */
  parallax?: number;
  /** Apply the shared colour grade (default on). */
  grade?: boolean;
  /** Cursor label, e.g. "View". */
  cursor?: string;
  /** Show the "Illustrative image" note for stock stand-ins. */
  note?: boolean;
}

/**
 * Every photo on the site goes through here: next/image with blur placeholder,
 * fixed frame (no layout shift), one colour grade, optional reveal/parallax.
 */
export default function Media({
  image,
  className,
  imgClassName,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
  reveal = true,
  parallax,
  grade = true,
  cursor,
  note,
}: Props) {
  const m = info(image.src);
  const img = (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      sizes={sizes}
      quality={80}
      preload={priority}
      fetchPriority={priority ? "high" : undefined}
      placeholder={m ? "blur" : "empty"}
      blurDataURL={m?.blur}
      className={cn("object-cover", imgClassName)}
    />
  );
  return (
    <div
      className={cn("relative overflow-hidden bg-emerald-soft", grade && "grade", className)}
      data-clip={reveal ? "" : undefined}
      data-cursor={cursor}
    >
      {parallax ? (
        <div className="absolute inset-x-0 -inset-y-[12%]" data-parallax={parallax}>
          {img}
        </div>
      ) : (
        img
      )}
      {note && image.illustrative && (
        <span className="t-label absolute bottom-3 right-3 z-[2] text-[10px] text-ivory/70">Illustrative image</span>
      )}
    </div>
  );
}

export const imageMeta = info;
