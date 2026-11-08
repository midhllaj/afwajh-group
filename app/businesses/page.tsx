import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Media from "@/components/ui/Media";
import TLink from "@/components/ui/TLink";
import Icon from "@/components/ui/Icon";
import Counter from "@/components/ui/Counter";
import ContactCta from "@/components/home/ContactCta";
import { businesses } from "@/data/businesses";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Our Businesses",
  description:
    "Explore Afwajh Group’s seven businesses: supermarkets & minimarts, restaurants & cafeterias, catering, FHM General Transport, general trading, technical services and labour supply.",
  path: "/businesses",
});

export default function BusinessesPage() {
  return (
    <>
      <PageHero
        label="Our Businesses"
        title={["Seven businesses.", "Choose *yours.*"]}
        intro="Retail, hospitality, catering, transport, trading, technical services and manpower — each with its own team, character and standard of care."
        image={{ src: "/images/home/dubai-skyline-sunset.webp", alt: "Dubai skyline at sunset", illustrative: true }}
        crumbs={[{ label: "Our Businesses" }]}
        short
      />
      <section className="tone-light bg-ivory py-20 md:py-28" aria-label="All businesses">
        <ol className="wrap">
          {businesses.map((b, i) => {
            const flip = i % 2 === 1;
            return (
              <li key={b.slug} className="grid-12 items-center gap-y-8 border-t border-line-light py-14 md:py-20" style={{ ["--accent" as string]: b.accent }}>
                <TLink href={b.href} className={cn("col-span-12 md:col-span-7", flip && "md:order-2 md:col-start-6")} tabIndex={-1} aria-hidden="true">
                  <Media image={b.hero} className="aspect-[16/10]" sizes="(min-width: 768px) 58vw, 100vw" parallax={6} cursor="Explore" />
                </TLink>
                <div className={cn("col-span-12 md:col-span-4", flip ? "md:order-1 md:col-start-1" : "md:col-start-9")}>
                  <p className="t-label flex items-center gap-4 text-ink/65" data-reveal>
                    <span className="t-num text-lg tracking-normal text-[var(--accent)]">{b.index}</span>
                    <span className="h-px w-10 bg-[var(--accent)]" aria-hidden="true" />
                    {b.label}
                  </p>
                  <h2 className="t-h3 mt-5 text-[clamp(2rem,1.4rem+2vw,3.5rem)]" data-split>
                    {b.name}
                  </h2>
                  <p className="mt-5 text-ink/70" data-reveal>
                    {b.positioning}
                  </p>
                  <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4" data-reveal>
                    {b.facts.slice(0, 2).map((f) => (
                      <div key={f.label} className="flex flex-col-reverse justify-end">
                        <dt className="t-label mt-2 text-ink/60">{f.label}</dt>
                        <dd className="t-num text-4xl leading-none">
                          <Counter stat={f} />
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <TLink href={b.href} className="group mt-10 inline-flex min-h-12 items-center gap-3 rounded-full bg-emerald px-6 text-[15px] text-ivory" data-magnetic>
                    Explore {b.shortName}
                    <Icon name="arrowUpRight" size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </TLink>
                </div>
              </li>
            );
          })}
        </ol>
      </section>
      <ContactCta />
    </>
  );
}
