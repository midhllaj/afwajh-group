import type { Metadata } from "next";
import BusinessPage from "@/components/business/BusinessPage";
import BusinessHero from "@/components/business/BusinessHero";
import IntroFacts from "@/components/business/IntroFacts";
import SectionHead from "@/components/business/SectionHead";
import Gallery from "@/components/business/Gallery";
import BusinessContact from "@/components/business/BusinessContact";
import OutletDirectory from "@/components/business/retail/OutletDirectory";
import JsonLd from "@/components/seo/JsonLd";
import { businessBySlug } from "@/data/businesses";
import { outlets, retailGallery, retailImages, retailIntro } from "@/data/retail";
import { pageMetadata } from "@/lib/seo";
import { localBusinessSchema } from "@/lib/schema";

const b = businessBySlug("supermarkets-minimarts");

export const metadata: Metadata = pageMetadata({
  title: b.name,
  description:
    "Afwajh Group’s 14 supermarkets and minimarts across Dubai, Abu Dhabi, Sharjah and Ras Al Khaimah — from Dubai Mall and Yas Mall to hospital and free-zone outlets.",
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
        moreImages={retailImages.introMore}
      />

      {/* What we offer: the outlet directory */}
      <section id="outlets" className="grain scroll-mt-16 bg-emerald-deep py-20 text-ivory md:py-36" aria-labelledby="outlets-title">
        <div className="wrap">
          <SectionHead
            index="02"
            label="Our outlets"
            title={"Fourteen stores,\n*four* emirates"}
            intro="Filter by emirate to explore every Afwajh supermarket and minimart — then get directions in one tap."
            tone="dark"
            id="outlets-title"
          />
          <div className="mt-16">
            <OutletDirectory outlets={outlets} />
          </div>
        </div>
      </section>

      <Gallery images={retailGallery} index="03" tone="light" title={"Inside our\n*stores*"} intro="Fresh produce, curated shelves and the everyday essentials our neighbourhoods rely on." />
      <BusinessContact business={b} index="04" />
    </BusinessPage>
  );
}
