import type { Metadata } from "next";
import Image from "next/image";
import BusinessPage from "@/components/business/BusinessPage";
import BusinessHero from "@/components/business/BusinessHero";
import IntroFacts from "@/components/business/IntroFacts";
import SectionHead from "@/components/business/SectionHead";
import Gallery from "@/components/business/Gallery";
import BusinessContact from "@/components/business/BusinessContact";
import CanteenTimeline from "@/components/business/catering/CanteenTimeline";
import CateringEnquiryForm from "@/components/forms/CateringEnquiryForm";
import Media from "@/components/ui/Media";
import JsonLd from "@/components/seo/JsonLd";
import { businessBySlug } from "@/data/businesses";
import { catering, cateringGallery, cateringServices, siteCanteenSteps } from "@/data/catering";
import { contact } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { localBusinessSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";

const b = businessBySlug("catering");

export const metadata: Metadata = pageMetadata({
  title: b.name,
  description:
    "Permanent and temporary site canteens, tiffin services, event catering and food trucks from Afwajh Catering Services, operating from Business Bay, Dubai since 2016.",
  path: b.href,
});

export default function Page() {
  return (
    <BusinessPage business={b}>
      <JsonLd
        data={localBusinessSchema({
          type: "FoodEstablishment",
          name: catering.name,
          address: catering.base,
          locality: "Dubai",
          region: "Dubai",
          url: b.href,
          telephone: contact.tel.display,
        })}
      />
      <BusinessHero
        business={b}
        title={["Make your events", "*memorable*"]}
        logo={
          <span className="flex items-center gap-4 rounded-full bg-ivory py-2 pl-2 pr-5">
            <Image src="/images/logos/catering-logo.png" alt="Afwajh Catering Services logo" width={678} height={582} className="h-14 w-auto" />
            <span className="t-label text-[10px] text-ink/60">
              Licence #{catering.licence}
              <br />
              Business Bay, since {catering.since}
            </span>
          </span>
        }
      />

      <IntroFacts
        business={b}
        title={"Authentic flavours,\na *modern* twist"}
        paragraphs={[catering.about]}
        extra={
          <div className="mt-12 grid gap-8 border-t border-line-light pt-8 sm:grid-cols-2" data-reveal>
            <div>
              <p className="t-label text-[var(--accent)]">Mission</p>
              <p className="mt-3 text-ink/75">{catering.mission}</p>
            </div>
            <div>
              <p className="t-label text-[var(--accent)]">Vision</p>
              <p className="mt-3 text-ink/75">{catering.vision}</p>
            </div>
          </div>
        }
      />

      {/* Services */}
      <section className="grain bg-emerald-deep py-28 text-ivory md:py-36" aria-labelledby="services-title">
        <div className="wrap">
          <SectionHead index="02" label="What we offer" title={"Five ways\nwe *serve*"} intro={catering.intro} tone="dark" id="services-title" />
          <ol className="mt-20">
            {cateringServices.map((s, i) => {
              const flip = i % 2 === 1;
              return (
                <li key={s.id} id={s.id} className="grid-12 scroll-mt-28 items-center gap-y-10 border-t border-line-dark py-16 md:py-24">
                  <div className={cn("col-span-12 md:col-span-6", flip && "md:order-2 md:col-start-7")}>
                    <Media image={s.image} className="aspect-[4/3]" sizes="(min-width: 768px) 50vw, 100vw" parallax={6} />
                  </div>
                  <div className={cn("col-span-12 md:col-span-5", flip ? "md:order-1 md:col-start-1" : "md:col-start-8")}>
                    <p className="t-num text-6xl leading-none text-[var(--accent)] md:text-7xl" data-reveal>
                      {s.index}
                    </p>
                    <h3 className="t-h3 mt-6" data-split>
                      {s.title}
                    </h3>
                    <p className="t-lead mt-5 text-ivory/90" data-reveal>
                      {s.lead}
                    </p>
                    {s.body.map((p) => (
                      <p key={p.slice(0, 24)} className="mt-4 text-ivory/65" data-reveal>
                        {p}
                      </p>
                    ))}
                    {s.highlight && (
                      <p className="mt-8 border-l-2 border-[var(--accent)] pl-5" data-reveal>
                        <span className="t-label block text-[var(--accent)]">{s.highlight.label}</span>
                        <span className="t-h4 mt-1 block">{s.highlight.value}</span>
                      </p>
                    )}
                    {s.clients && (
                      <div className="mt-8" data-reveal>
                        <p className="t-label text-[var(--accent)]">Clients include</p>
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {s.clients.map((c) => (
                            <li key={c} className="rounded-full border border-line-dark px-3.5 py-1.5 text-[13px] text-ivory/80">
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Business-specific: how the site canteen works */}
      <section className="grain bg-emerald py-28 text-ivory md:py-36" aria-labelledby="canteen-title">
        <div className="wrap">
          <SectionHead
            index="03"
            label="Site canteen proposal"
            title={"How our site\ncanteen *works*"}
            intro="A container canteen on your project plot, fed from our central kitchen — affordable for your workforce and effortless for you."
            tone="dark"
            id="canteen-title"
            className="mb-20"
          />
          <CanteenTimeline steps={siteCanteenSteps} />
        </div>
      </section>

      <Gallery images={cateringGallery} index="04" title={"From kitchen\nto *table*"} tone="light" />

      <BusinessContact business={b} index="05" title={"Plan your\n*menu* with us"}>
        <CateringEnquiryForm />
      </BusinessContact>
    </BusinessPage>
  );
}
