import Image from "next/image";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { imageMeta } from "@/components/ui/Media";
import type { Business } from "@/data/types";

/** Full-bleed hero shared by all seven business pages (pure CSS motion → fast LCP). */
export default function BusinessHero({
  business: b,
  title,
  logo,
}: {
  business: Business;
  /** Lines of the headline; wrap words in *asterisks* for the serif accent. Defaults to the name. */
  title?: string[];
  logo?: React.ReactNode;
}) {
  const m = imageMeta(b.hero.src);
  const lines = title ?? [b.name];
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-emerald-deep text-ivory" aria-labelledby="biz-title">
      <div className="hero-ken absolute inset-0 -z-10">
        <Image
          src={b.hero.src}
          alt={b.hero.alt}
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
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(10,35,33,.7)_0%,rgba(10,35,33,.2)_40%,rgba(10,35,33,.9)_92%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,35,33,.7)_0%,rgba(10,35,33,.25)_45%,transparent_70%)]" />

      <div className="wrap pb-28 pt-[calc(var(--header-h)+3rem)] md:pb-20">
        <Breadcrumbs items={[{ label: "Our Businesses", href: "/businesses" }, { label: b.shortName }]} />
        <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3">
          <p className="hero-fade t-label flex items-center gap-4" style={{ ["--d" as string]: 0.1 }}>
            <span className="t-num text-lg tracking-normal text-[var(--accent)]">{b.index}</span>
            <span className="text-ivory/50">/ 07</span>
            <span className="h-px w-10 bg-[var(--accent)]" aria-hidden="true" />
            <span className="text-ivory/80">{b.label}</span>
          </p>
          {b.arabicName && (
            <p lang="ar" dir="rtl" className="hero-fade text-lg text-ivory/70" style={{ ["--d" as string]: 0.2 }}>
              {b.arabicName}
            </p>
          )}
        </div>
        <h1 id="biz-title" className="t-h1 mt-6 max-w-[15ch]">
          {lines.map((line, i) => (
            <span key={i} className="hero-line line-mask">
              <span style={{ ["--d" as string]: 0.15 + i * 0.1 }}>
                {line.split(/(\*[^*]+\*)/g).map((part, pi) =>
                  part.startsWith("*") ? (
                    <em key={pi} className="accent-word text-[var(--accent)]">
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
        <div className="mt-10 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <p className="hero-fade t-lead max-w-xl text-ivory/85" style={{ ["--d" as string]: 0.45 }}>
            {b.positioning}
          </p>
          {logo && (
            <div className="hero-fade shrink-0" style={{ ["--d" as string]: 0.6 }}>
              {logo}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
