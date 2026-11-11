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
import Media, { imageMeta } from "@/components/ui/Media";
import MediaSwitcher from "@/components/ui/MediaSwitcher";
import JsonLd from "@/components/seo/JsonLd";
import { businessBySlug } from "@/data/businesses";
import { catering, cateringGallery, cateringServices, siteCanteenSteps } from "@/data/catering";
import { cateringLogoClients, temporaryCanteenContractors } from "@/data/clients";
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
          telephone: contact.landline,
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
        image={catering.introImage}
        factsBelow
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
      <section className="grain bg-emerald-deep py-20 text-ivory md:py-36" aria-labelledby="services-title">
        <div className="wrap">
          <SectionHead index="02" label="What we offer" title={"Five ways\nwe *serve*"} intro={catering.intro} tone="dark" id="services-title" />
          <ol className="mt-20">
            {cateringServices.map((s, i) => {
              const flip = i % 2 === 1;
              return (
                <li key={s.id} id={s.id} className="grid-12 scroll-mt-28 items-center gap-y-10 border-t border-line-dark py-16 md:py-24">
                  <div className={cn("col-span-12 md:col-span-6", flip && "md:order-2 md:col-start-7")}>
                    {s.moreImages ? (
                      <MediaSwitcher
                        label={`Next ${s.title} photo`}
                        slides={[s.image, ...s.moreImages].map((img, n) => (
                          <Media key={img.src} image={img} className="aspect-[4/3]" sizes="(min-width: 768px) 50vw, 100vw" reveal={n === 0} />
                        ))}
                      />
                    ) : (
                      <Media image={s.image} className="aspect-[4/3]" sizes="(min-width: 768px) 50vw, 100vw" parallax={6} />
                    )}
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
                  </div>
                  {s.id === "temporary-canteens" && (
                    <section className="col-span-12 mt-6 border-t md:order-3 border-line-dark pt-16 md:pt-24" aria-labelledby="canteen-title">
                      <SectionHead
                        label="Site canteen proposal"
                        title={"How our site\ncanteen *works*"}
                        intro="A container canteen on your project plot, fed from our central kitchen — affordable for your workforce and effortless for you."
                        tone="dark"
                        id="canteen-title"
                        className="mb-20"
                      />
                      <CanteenTimeline steps={siteCanteenSteps} />
                    </section>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Client logos */}
      <section className="tone-light bg-white py-20 md:py-36" aria-labelledby="clients-title">
        <div className="wrap">
          <SectionHead index="03" label="Trusted by" title={"Our\n*clients*"} id="clients-title" className="mb-16" />
          <h3 className="t-h3 mb-10" data-split>
            Leading developers
          </h3>
          <ul className="grid grid-cols-2 gap-px border border-line-light bg-line-light md:grid-cols-5">
            {cateringLogoClients.map((c, i) => {
              const m = imageMeta(c.logo);
              return (
                <li key={c.name} className="flex aspect-[3/2] items-center justify-center bg-white p-4" data-reveal data-delay={String((i % 5) * 0.04)}>
                  <Image
                    src={c.logo}
                    alt={`${c.name} logo`}
                    width={m?.w ?? 600}
                    height={m?.h ?? 300}
                    sizes="(min-width: 768px) 20vw, 50vw"
                    quality={80}
                    className="max-h-16 w-auto max-w-full object-contain md:max-h-24"
                  />
                </li>
              );
            })}
          </ul>

          <div className="mt-20 md:mt-28">
            <h3 className="t-h3" data-split>
              Leading contracting companies
            </h3>
            <p className="mt-4 text-ink/70" data-reveal>
              We have set up temporary site canteens for these companies.
            </p>
            <ul className="mt-10 grid border-t border-line-light sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-3">
              {temporaryCanteenContractors.map((name) => (
                <li key={name} className="t-h4 flex items-center gap-4 border-b border-line-light py-5" data-reveal>
                  <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-[var(--accent)]" aria-hidden="true" />
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Gallery images={cateringGallery} index="04" title={"From kitchen\nto *table*"} tone="light" />

      <BusinessContact business={b} index="05" title={"Plan your\n*menu* with us"}>
        <CateringEnquiryForm />
      </BusinessContact>
    </BusinessPage>
  );
}
