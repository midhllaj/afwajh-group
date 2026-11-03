import Image from "next/image";
import Breadcrumbs, { type Crumb } from "./Breadcrumbs";
import { imageMeta } from "./Media";
import type { Img } from "@/data/types";
import { cn } from "@/lib/utils";

/** Hero for group-level pages (About, Businesses, Clients, Contact). */
export default function PageHero({
  label,
  title,
  intro,
  image,
  crumbs,
  children,
  short = false,
}: {
  label: string;
  /** Lines; *word* for the serif accent. */
  title: string[];
  intro?: string;
  image?: Img;
  crumbs: Crumb[];
  children?: React.ReactNode;
  short?: boolean;
}) {
  const m = image ? imageMeta(image.src) : undefined;
  return (
    <section className={cn("relative isolate flex flex-col justify-end overflow-hidden bg-emerald-deep text-ivory", short ? "min-h-[72svh]" : "min-h-[100svh]")}>
      {image ? (
        <>
          <div className="hero-ken absolute inset-0 -z-10">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              preload
              fetchPriority="high"
              sizes="100vw"
              quality={80}
              placeholder={m ? "blur" : "empty"}
              blurDataURL={m?.blur}
              className="object-cover [filter:saturate(.88)_contrast(1.06)_brightness(.97)]"
            />
          </div>
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(10,35,33,.7)_0%,rgba(10,35,33,.25)_40%,rgba(10,35,33,.92)_95%)]" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,35,33,.65)_0%,rgba(10,35,33,.2)_45%,transparent_70%)]" />
        </>
      ) : (
        <div className="grain absolute inset-0 -z-10" />
      )}
      <div className="wrap pb-20 pt-[calc(var(--header-h)+3rem)] md:pb-24">
        <Breadcrumbs items={crumbs} />
        <p className="hero-fade t-label mt-14 flex items-center gap-4 text-ivory/75" style={{ ["--d" as string]: 0.1 }}>
          <span className="h-px w-10 bg-gold" aria-hidden="true" />
          {label}
        </p>
        <h1 className="t-h1 mt-6 max-w-[16ch]">
          {title.map((line, i) => (
            <span key={i} className="hero-line line-mask">
              <span style={{ ["--d" as string]: 0.15 + i * 0.1 }}>
                {line.split(/(\*[^*]+\*)/g).map((part, pi) =>
                  part.startsWith("*") ? (
                    <em key={pi} className="accent-word text-gold">
                      {part.slice(1, -1)}
                    </em>
                  ) : (
                    part
                  ),
                )}
              </span>
            </span>
          ))}
        </h1>
        {intro && (
          <p className="hero-fade t-lead mt-10 max-w-xl text-ivory/80" style={{ ["--d" as string]: 0.45 }}>
            {intro}
          </p>
        )}
        {children && (
          <div className="hero-fade mt-10" style={{ ["--d" as string]: 0.6 }}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
