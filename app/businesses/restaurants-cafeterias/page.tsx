import type { Metadata } from "next";
import BusinessPage from "@/components/business/BusinessPage";
import BusinessHero from "@/components/business/BusinessHero";
import IntroFacts from "@/components/business/IntroFacts";
import SectionHead from "@/components/business/SectionHead";
import Gallery from "@/components/business/Gallery";
import BusinessContact from "@/components/business/BusinessContact";
import VenueShowcase from "@/components/business/restaurants/VenueShowcase";
import Marquee from "@/components/ui/Marquee";
import JsonLd from "@/components/seo/JsonLd";
import { businessBySlug } from "@/data/businesses";
import { restaurantsIntro, venues } from "@/data/restaurants";
import { pageMetadata } from "@/lib/seo";
import { localBusinessSchema } from "@/lib/schema";

const b = businessBySlug("restaurants-cafeterias");

export const metadata: Metadata = pageMetadata({
  title: b.name,
  description:
    "Cafe 52, Picnic Tea, Lassi Day, Zero 6 Express, Shay Marhaba, Shay Al Kadi, City Fresh and Khafayef Cafeteria — Afwajh Group’s restaurants and cafeterias across the UAE.",
  path: b.href,
});

const cuisines = ["Quality coffee", "Indian", "Indo-Chinese", "Biryanis", "Tandoori", "Lassi", "Teas", "Pastries", "Fast food", "Desserts", "Frozen treats"];

export default function Page() {
  return (
    <BusinessPage business={b}>
      <JsonLd
        data={venues.map((v) =>
          localBusinessSchema({
            type: /cafe/i.test(v.name) ? "CafeOrCoffeeShop" : "Restaurant",
            name: v.name,
            address: v.location,
            locality: v.location.split(",").slice(-1)[0].trim(),
            region: v.emirate,
            url: `${b.href}#${v.id}`,
            servesCuisine: v.tags,
          }),
        )}
      />
      <BusinessHero business={b} title={["Restaurants", "& *Cafeterias*"]} />

      <IntroFacts
        business={b}
        title={"Many cuisines,\none *standard*"}
        paragraphs={[
          restaurantsIntro,
          "From slow mornings over specialty coffee in Town Square to quick, flavourful meals on the go in Al Barsha, each venue has its own character — and the same commitment to consistency.",
        ]}
        image={{ src: "/images/restaurants/indian-spread.webp", alt: "Spread of Indian dishes with rice, curries and spices" }}
      />

      {/* What we offer: venues */}
      <section className="tone-light bg-ivory pb-16 md:pb-24" aria-labelledby="venues-title">
        <div className="border-y border-line-light py-6">
          <Marquee duration={36}>
            {cuisines.map((c) => (
              <span key={c} className="t-h3 mx-8 flex shrink-0 items-center gap-8 text-ink/50">
                {c}
                <span className="h-2 w-2 rotate-45 bg-[var(--accent)]" aria-hidden="true" />
              </span>
            ))}
          </Marquee>
        </div>
        <div className="wrap pt-20 md:pt-36">
          <SectionHead
            index="02"
            label="Our venues"
            title={"Eight venues,\n*eight* stories"}
            intro="Each venue is developed with a strong focus on quality, comfort and customer satisfaction."
            id="venues-title"
          />
          <VenueShowcase venues={venues} />
        </div>
      </section>

      <Gallery
        images={[
          { src: "/images/restaurants/latte-art-pour.webp", alt: "Barista pouring latte art" },
          { src: "/images/restaurants/chicken-tikka-naan.webp", alt: "Chicken tikka masala with naan" },
          { src: "/images/company/restaurants/cafe-52-storefront.webp", alt: "Cafe 52 storefront in Town Square, Dubai" },
          { src: "/images/restaurants/mango-lassi.webp", alt: "Mango lassi with fresh mango" },
          { src: "/images/restaurants/indo-chinese-noodles.webp", alt: "Indo-Chinese noodles" },
          { src: "/images/company/restaurants/shay-marhaba-cup.webp", alt: "Shay Marhaba branded cup" },
          { src: "/images/restaurants/tea-brass-kettle.webp", alt: "Tea with a brass kettle" },
          { src: "/images/company/restaurants/khafayef-cafe-uniform.webp", alt: "Khafayef Cafe uniform" },
        ]}
        index="03"
        title={"A taste of\n*our tables*"}
      />
      <BusinessContact business={b} index="04" title={"Book, cater or\n*partner* with us"} />
    </BusinessPage>
  );
}
