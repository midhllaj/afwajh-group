import type { Metadata } from "next";
import BusinessPage from "@/components/business/BusinessPage";
import BusinessHero from "@/components/business/BusinessHero";
import IntroFacts from "@/components/business/IntroFacts";
import SectionHead from "@/components/business/SectionHead";
import Gallery from "@/components/business/Gallery";
import BusinessContact from "@/components/business/BusinessContact";
import OutletDirectory from "@/components/business/retail/OutletDirectory";
import Media from "@/components/ui/Media";
import Icon from "@/components/ui/Icon";
import Kicker from "@/components/ui/Kicker";
import JsonLd from "@/components/seo/JsonLd";
import { businessBySlug } from "@/data/businesses";
import { homeDelivery, outlets, retailGallery, retailImages, retailIntro } from "@/data/retail";
import { pageMetadata } from "@/lib/seo";
import { localBusinessSchema } from "@/lib/schema";

const b = businessBySlug("supermarkets-minimarts");

export const metadata: Metadata = pageMetadata({
  title: b.name,
  description:
    "Afwajh Group’s 11 supermarkets and minimarts across Dubai, Abu Dhabi, Sharjah and Ras Al Khaimah — from Dubai Mall and Yas Mall to hospital and free-zone outlets.",
  path: b.href,
});

export default function Page() {
  return (
    <BusinessPage business={b}>
      <JsonLd
        data={outlets.map((o) =>
          localBusinessSchema({
            type: o.kind === "Supermarket" ? "GroceryStore" : "ConvenienceStore",
            name: o.name,
            address: o.location,
            locality: o.location.split(",").slice(-1)[0].trim(),
            region: o.emirate,
            lat: o.lat,
            lng: o.lng,
            url: `${b.href}#${o.id}`,
          }),
        )}
      />
      <BusinessHero business={b} title={["Supermarkets", "& *Minimarts*"]} />

      <IntroFacts
        business={b}
        title={"Convenience,\nquality, *freshness*"}
        paragraphs={[
          retailIntro,
          "From one of the world’s busiest shopping destinations to hospitals, residential communities and free zones, every Afwajh outlet is shaped around the people it serves — with fresh produce, everyday essentials and premium goods close at hand.",
        ]}
        image={retailImages.intro}
      />

      {/* What we offer: the outlet directory */}
      <section className="grain bg-emerald-deep py-28 text-ivory md:py-36" aria-labelledby="outlets-title">
        <div className="wrap">
          <SectionHead
            index="02"
            label="Our outlets"
            title={"Eleven stores,\n*four* emirates"}
            intro="Filter by emirate to explore every Afwajh supermarket and minimart — then get directions in one tap."
            tone="dark"
            id="outlets-title"
          />
          <div className="mt-16">
            <OutletDirectory outlets={outlets} />
          </div>
        </div>
      </section>

      {/* Business-specific: home delivery */}
      <section className="tone-light overflow-hidden bg-ivory py-28 md:py-36" aria-labelledby="delivery-title">
        <div className="wrap grid-12 items-center gap-y-14">
          <div className="col-span-12 md:col-span-6">
            <Media image={retailImages.delivery} className="aspect-[4/3]" sizes="(min-width: 768px) 50vw, 100vw" cursor="View" />
          </div>
          <div className="col-span-12 md:col-span-5 md:col-start-8">
            <Kicker index="03" tone="light" accent>
              Convenience at your door
            </Kicker>
            <h2 id="delivery-title" className="t-h2 mt-8" data-split>
              Free home <em className="accent-word">delivery</em>
            </h2>
            <p className="mt-6 text-ink/70" data-reveal>
              {homeDelivery.note}
            </p>
            <ul className="mt-10 border-t border-line-light" data-reveal>
              {homeDelivery.numbers.map((n) => (
                <li key={n.href} className="border-b border-line-light">
                  <a href={n.href} className="group flex min-h-16 items-center justify-between py-4">
                    <span className="t-h3">{n.display}</span>
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)] text-emerald-deep transition-transform group-hover:-rotate-12">
                      <Icon name="phone" size={20} />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Gallery images={retailGallery} index="04" title={"Inside our\n*stores*"} intro="Fresh produce, curated shelves and the everyday essentials our neighbourhoods rely on." />
      <BusinessContact business={b} index="05" />
    </BusinessPage>
  );
}
