import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import Photo from "@/components/ui/Photo";
import Parallax from "@/components/ui/Parallax";
import LineArt from "@/components/ui/LineArt";
import Icon from "@/components/ui/Icon";
import NextBusiness from "@/components/ui/NextBusiness";
import ContactCTA from "@/components/home/ContactCTA";
import JsonLd from "@/components/seo/JsonLd";
import { restaurantsIntro, venues } from "@/data/restaurants";
import { pageMetadata } from "@/lib/seo";
import { localBusinessSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Restaurants & Cafeterias",
  description:
    "Cafe 52, Picnic Tea, Lassi Day, Zero 6 Express, Shay Marhaba, Shay Al Kadi, City Fresh and Khafayef Cafeteria — Afwajh Group’s restaurants and cafeterias across the UAE.",
  path: "/businesses/restaurants",
  image: "/images/restaurants/cafe-52-storefront.webp",
});

export default function RestaurantsPage() {
  return (
    <>
      <JsonLd
        data={venues.map((v) =>
          localBusinessSchema({
            type: /cafe/i.test(v.name) ? "CafeOrCoffeeShop" : "Restaurant",
            name: v.name,
            address: v.location,
            locality: v.location.split(",").slice(-1)[0].trim(),
            region: v.emirate,
            url: `/businesses/restaurants#${v.id}`,
            servesCuisine: v.tags,
          }),
        )}
      />
      <PageHero
        index="02"
        eyebrow="Hospitality Division"
        title={"Restaurants\n& *Cafeterias*"}
        intro={restaurantsIntro}
        image={{ src: "/images/catering/restaurant-canteen-interior.webp", alt: "Warm restaurant interior with timber walls and set tables" }}
        breadcrumb={[{ label: "Businesses", href: "/businesses" }, { label: "Restaurants & Cafeterias" }]}
      />

      {/* Menu index */}
      <section className="on-light bg-ivory py-24 text-ink md:py-32">
        <div className="container-x grid-12 gap-y-12">
          <div className="col-span-12 lg:col-span-4">
            <SectionHeader eyebrow="The menu" title={"Eight venues,\n*one* standard"} tone="light" />
            <LineArt name="chef" className="mt-12 hidden w-52 lg:block" accent="#1A5A52" />
          </div>
          <Reveal className="col-span-12 lg:col-span-7 lg:col-start-6">
            <ol className="border-t border-emerald-900/15">
              {venues.map((v, i) => (
                <li key={v.id} className="border-b border-emerald-900/15">
                  <a href={`#${v.id}`} className="group flex items-baseline gap-4 py-4">
                    <span className="w-7 font-serif text-sm italic text-gold-deep">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-serif text-2xl text-emerald-900 transition-colors group-hover:text-emerald-600 md:text-3xl">{v.name}</span>
                    <span aria-hidden="true" className="hidden flex-1 border-b border-dotted border-emerald-900/25 sm:block" />
                    <span className="ml-auto text-right text-sm text-muted">{v.emirate}</span>
                  </a>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Venues */}
      <section className="grain bg-emerald-800 py-12 md:py-20" aria-label="Our venues">
        <div className="container-x">
          {venues.map((v, i) => {
            const flip = i % 2 === 1;
            return (
              <article id={v.id} key={v.id} className="grid-12 scroll-mt-28 items-center gap-y-8 border-b border-ivory/10 py-16 last:border-0 md:py-24">
                <div className={cn("col-span-12 md:col-span-6", flip && "md:order-2 md:col-start-7")}>
                  <Reveal variant="clip">
                    <Parallax amount={30}>
                      <Photo image={v.image} className="aspect-[4/5] md:aspect-[5/6]" sizes="(min-width: 768px) 50vw, 100vw" hover view showIllustrativeNote />
                    </Parallax>
                  </Reveal>
                </div>
                <div className={cn("col-span-12 md:col-span-5", flip ? "md:order-1 md:col-start-1" : "md:col-start-8")}>
                  <Reveal>
                    <p className="font-serif text-xl italic text-gold-light">{String(i + 1).padStart(2, "0")}</p>
                    <h2 className="display-md mt-3 text-ivory">{v.name}</h2>
                    <p className="mt-5 flex items-start gap-2 text-gold-light">
                      <Icon name="pin" className="mt-0.5 h-5 w-5" />
                      {v.location}
                    </p>
                    <p className="lead mt-6 text-ivory/75">{v.description}</p>
                    <ul className="mt-8 flex flex-wrap gap-2" aria-label="Cuisine and highlights">
                      {v.tags.map((t) => (
                        <li key={t} className="rounded-full border border-gold-light/30 px-3.5 py-1 text-xs font-medium uppercase tracking-[0.1em] text-ivory/85">
                          {t}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${v.name} ${v.location}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ivory/85 hover:text-gold-light"
                    >
                      Find us <Icon name="arrowUpRight" className="h-4 w-4" />
                      <span className="sr-only">— {v.name} on Google Maps (opens in a new tab)</span>
                    </a>
                  </Reveal>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <NextBusiness slug="restaurants" />
      <ContactCTA title={"Dining, delivered with\n*consistency.*"} />
    </>
  );
}
