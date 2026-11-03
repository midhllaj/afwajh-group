import type { Metadata } from "next";
import BusinessPage from "@/components/business/BusinessPage";
import BusinessHero from "@/components/business/BusinessHero";
import IntroFacts from "@/components/business/IntroFacts";
import SectionHead from "@/components/business/SectionHead";
import Gallery from "@/components/business/Gallery";
import BusinessContact from "@/components/business/BusinessContact";
import Media from "@/components/ui/Media";
import Icon from "@/components/ui/Icon";
import { businessBySlug } from "@/data/businesses";
import { trading } from "@/data/divisions";
import { pageMetadata } from "@/lib/seo";

const b = businessBySlug("general-trading");

export const metadata: Metadata = pageMetadata({
  title: b.name,
  description:
    "Afwajh General Trading is the group’s supply and distribution arm in Al Nahda 1 and Al Qusais 1, Dubai — sourcing, trading and delivering products for the group and external clients.",
  path: b.href,
});

const pillarIcons = ["package", "handshake", "truck", "users"];

export default function Page() {
  return (
    <BusinessPage business={b}>
      <BusinessHero business={b} title={["General", "*Trading*"]} />

      <IntroFacts business={b} title={"Supply you can\n*rely* on"} paragraphs={[trading.intro, ...trading.body]} image={trading.gallery[0]} />

      {/* What we offer */}
      <section className="grain bg-emerald-deep py-28 text-ivory md:py-36" aria-labelledby="offer-title">
        <div className="wrap">
          <SectionHead index="02" label="What we offer" title={"From sourcing\nto *delivery*"} tone="dark" id="offer-title" />
          <ol className="mt-16 grid gap-px border-y border-line-dark bg-line-dark sm:grid-cols-2 lg:grid-cols-4">
            {trading.pillars.map((p, i) => (
              <li key={p.title} className="bg-emerald-deep px-1 py-10 sm:px-8" data-reveal data-delay={String(i * 0.06)}>
                <div className="flex items-start justify-between">
                  <Icon name={pillarIcons[i]} size={38} className="text-[var(--accent)]" />
                  <span className="t-label text-ivory/55">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="t-h3 mt-10">{p.title}</h3>
                <p className="mt-4 text-ivory/65">{p.text}</p>
              </li>
            ))}
          </ol>
          {trading.productCategories.length > 0 && (
            <ul className="mt-12 flex flex-wrap gap-2" data-reveal>
              {trading.productCategories.map((c) => (
                <li key={c} className="rounded-full border border-line-dark px-4 py-2 text-ivory/80">
                  {c}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Business-specific: locations */}
      <section className="tone-light bg-ivory py-28 md:py-36" aria-labelledby="locations-title">
        <div className="wrap grid-12 items-center gap-y-14">
          <div className="col-span-12 md:col-span-5">
            <SectionHead index="03" label="Where we operate" title={"Two hubs\nin *Dubai*"} id="locations-title" className="!block" />
            <ul className="mt-12 border-t border-line-light" data-reveal>
              {trading.locations.map((l) => (
                <li key={l} className="flex items-center justify-between border-b border-line-light py-6">
                  <span className="t-h3">{l.replace(", Dubai", "")}</span>
                  <span className="t-label flex items-center gap-2 text-ink/65">
                    <Icon name="pin" size={18} className="text-[var(--accent)]" /> Dubai
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <Media image={trading.gallery[1]} className="aspect-[4/5]" sizes="(min-width: 768px) 50vw, 100vw" parallax={6} />
          </div>
        </div>
      </section>

      <Gallery images={[b.hero, ...trading.gallery]} index="04" title={"Moving goods,\n*every* day"} />
      <BusinessContact business={b} index="05" title={"Source with\n*confidence*"} />
    </BusinessPage>
  );
}
