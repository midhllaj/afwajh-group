import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import Photo from "@/components/ui/Photo";
import Counter from "@/components/ui/Counter";
import LineArt from "@/components/ui/LineArt";
import Icon from "@/components/ui/Icon";
import OutletDirectory from "@/components/retail/OutletDirectory";
import ContactCTA from "@/components/home/ContactCTA";
import NextBusiness from "@/components/ui/NextBusiness";
import JsonLd from "@/components/seo/JsonLd";
import { homeDelivery, outlets, retailGallery, retailIntro } from "@/data/retail";
import { pageMetadata } from "@/lib/seo";
import { localBusinessSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "Supermarkets & Minimarts",
  description:
    "Afwajh Group’s network of 11 supermarkets and minimarts across Dubai, Abu Dhabi, Sharjah and Ras Al Khaimah — from Dubai Mall and Yas Mall to hospital and free-zone outlets.",
  path: "/businesses/supermarkets",
  image: "/images/retail/greenmart-storefront.webp",
});

export default function SupermarketsPage() {
  const byEmirate = (e: string) => outlets.filter((o) => o.emirate === e).length;
  return (
    <>
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
            url: `/businesses/supermarkets#${o.id}`,
          }),
        )}
      />
      <PageHero
        index="01"
        eyebrow="Retail Division"
        title={"Supermarkets\n& *Minimarts*"}
        intro={retailIntro}
        image={retailGallery[2]}
        breadcrumb={[{ label: "Businesses", href: "/businesses" }, { label: "Supermarkets & Minimarts" }]}
      />

      {/* Numbers */}
      <section className="on-light bg-ivory py-16 text-ink md:py-20">
        <div className="container-x grid grid-cols-2 gap-px bg-emerald-900/15 md:grid-cols-4">
          {[
            { v: outlets.length, l: "Retail outlets" },
            { v: 160, l: "Retail employees" },
            { v: byEmirate("Dubai"), l: "Outlets in Dubai" },
            { v: 4, l: "Emirates served" },
          ].map((s) => (
            <Reveal key={s.l} className="bg-ivory px-2 py-6 md:px-6">
              <p className="font-serif text-6xl leading-none text-emerald-900">
                <Counter value={s.v} />
              </p>
              <p className="mt-3 text-sm font-medium text-muted">{s.l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Directory */}
      <section className="grain bg-emerald-800 py-24 md:py-32" aria-labelledby="directory">
        <div className="container-x">
          <div className="mb-14 flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <SectionHeader eyebrow="Outlet directory" title={"Find a store\n*near you*"} />
            <p id="directory" className="max-w-md text-ivory/70">
              From the world’s busiest mall to hospitals, residential communities and free zones — filter by emirate to explore every Afwajh outlet.
            </p>
          </div>
          <OutletDirectory />
        </div>
      </section>

      {/* Free home delivery */}
      <section className="on-light relative overflow-hidden bg-ivory py-24 text-ink md:py-32">
        <div className="container-x grid-12 items-center gap-y-12">
          <Reveal variant="clip" className="col-span-12 md:col-span-6">
            <Photo image={retailGallery[0]} className="aspect-[4/3]" sizes="(min-width: 768px) 50vw, 100vw" hover view />
          </Reveal>
          <div className="col-span-12 md:col-span-5 md:col-start-8">
            <LineArt name="bag" className="mb-8 w-28" accent="#1A5A52" />
            <SectionHeader eyebrow="Convenience at your door" title={`${homeDelivery.title.replace("Delivery", "*Delivery*")}`} tone="light" intro={homeDelivery.note} />
            <Reveal delay={0.2} className="mt-10 flex flex-col gap-3">
              {homeDelivery.numbers.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  className="group flex min-h-14 items-center justify-between border-b border-emerald-900/15 py-3 font-serif text-3xl text-emerald-900 transition-colors hover:text-emerald-600"
                >
                  {n.display}
                  <Icon name="phone" className="h-5 w-5 text-gold-deep transition-transform group-hover:rotate-12" />
                </a>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <NextBusiness slug="supermarkets" />
      <ContactCTA title={"Partner with our\n*retail* division."} />
    </>
  );
}
