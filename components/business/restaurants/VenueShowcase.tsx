import Media from "@/components/ui/Media";
import Icon from "@/components/ui/Icon";
import type { Venue } from "@/data/restaurants";
import { cn } from "@/lib/utils";

/** Editorial venue showcase: large image, number, tags, location, real-photo inset when available. */
export default function VenueShowcase({ venues }: { venues: Venue[] }) {
  return (
    <ol className="mt-20">
      {venues.map((v, i) => {
        const flip = i % 2 === 1;
        return (
          <li key={v.id} id={v.id} className="grid-12 scroll-mt-28 items-center gap-y-10 border-t border-line-light py-16 md:py-24">
            <div className={cn("relative col-span-12 md:col-span-7", flip && "md:order-2 md:col-start-6")}>
              <Media image={v.image} className="aspect-[4/3]" sizes="(min-width: 768px) 58vw, 100vw" parallax={6} cursor="View" note />
              {v.realPhoto && (
                <figure className={cn("absolute -bottom-8 w-[30%] md:-bottom-10 md:w-[24%]", flip ? "-left-2 md:-left-6" : "-right-2 md:-right-6")} data-reveal>
                  <Media image={v.realPhoto} className="aspect-[3/4] border-[6px] border-ivory" sizes="20vw" reveal={false} />
                  <figcaption className="t-label mt-2 text-[10px] text-ink/60">At {v.name}</figcaption>
                </figure>
              )}
            </div>
            <div className={cn("col-span-12 md:col-span-4", flip ? "md:order-1 md:col-start-1" : "md:col-start-9")}>
              <p className="t-num text-xl text-[var(--accent)]" data-reveal>
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="t-h3 mt-4 text-[clamp(2rem,1.4rem+1.8vw,3.25rem)]" data-split>
                {v.name}
              </h3>
              <p className="mt-5 flex items-start gap-2 text-ink/75" data-reveal>
                <Icon name="pin" size={20} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                {v.location}
              </p>
              <p className="mt-6 text-ink/70" data-reveal>
                {v.description}
              </p>
              <ul className="mt-8 flex flex-wrap gap-2" aria-label="Cuisine and highlights" data-reveal>
                {v.tags.map((t) => (
                  <li key={t} className="rounded-full border border-ink/15 px-3.5 py-1.5 text-[13px] text-ink/75">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
