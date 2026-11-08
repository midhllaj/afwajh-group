import Media from "@/components/ui/Media";
import SectionHead from "./SectionHead";
import Lightbox from "./Lightbox";
import type { Img } from "@/data/types";
import { cn } from "@/lib/utils";

/**
 * Image gallery: swipeable, snap-scrolling strip on all sizes (drag / swipe), with a
 * lightbox. `small` renders compact thumbnails for low-resolution originals.
 */
export default function Gallery({
  images,
  index = "05",
  label = "Gallery",
  title = "In *pictures*",
  intro,
  tone = "dark",
  small = false,
  id = "gallery",
}: {
  images: Img[];
  index?: string;
  label?: string;
  title?: string;
  intro?: string;
  tone?: "dark" | "light";
  small?: boolean;
  id?: string;
}) {
  const dark = tone === "dark";
  return (
    <section className={cn("overflow-hidden py-20 md:py-36", dark ? "grain bg-emerald-deep text-ivory" : "tone-light bg-ivory")} aria-labelledby={`${id}-title`}>
      <div className="wrap">
        <SectionHead index={index} label={label} title={title} intro={intro} tone={tone} id={`${id}-title`} />
      </div>
      <ul
        className="no-scrollbar mt-16 flex snap-x snap-mandatory scroll-px-[var(--gutter)] gap-4 overflow-x-auto px-[var(--gutter)] pb-4 md:gap-6"
        data-gallery={id}
        aria-label="Gallery — swipe or scroll sideways"
      >
        {images.map((img, i) => (
          <li key={img.src} className={cn("shrink-0 snap-start", small ? "w-[62vw] sm:w-[34vw] lg:w-[22vw] xl:w-[18vw]" : i % 3 === 0 ? "w-[82vw] md:w-[46vw]" : "w-[68vw] md:w-[30vw]")}>
            <button type="button" data-lightbox={i} className="group block w-full text-left" aria-label={`Enlarge image: ${img.alt}`}>
              <Media
                image={img}
                className={cn(small ? "aspect-[4/3]" : i % 3 === 0 ? "aspect-[4/3]" : "aspect-[4/5]")}
                sizes={small ? "(min-width: 1024px) 22vw, 62vw" : "(min-width: 768px) 46vw, 82vw"}
                cursor="View"
                note
                reveal={i < 4}
              />
            </button>
          </li>
        ))}
      </ul>
      <Lightbox id={id} images={images.map(({ src, alt }) => ({ src, alt }))} />
    </section>
  );
}
