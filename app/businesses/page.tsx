import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import Photo from "@/components/ui/Photo";
import TLink from "@/components/ui/TLink";
import Icon from "@/components/ui/Icon";
import ContactCTA from "@/components/home/ContactCTA";
import { businesses } from "@/data/businesses";
import { pageMetadata } from "@/lib/seo";

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
        eyebrow="Our businesses"
        title={"Seven businesses.\nOne *standard.*"}
        breadcrumb={[{ label: "Businesses" }]}
        compact
      />
      <section className="grain bg-emerald-800 py-24 md:py-32">
        <RevealGroup as="ul" className="container-x grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {businesses.map((b) => (
            <RevealItem as="li" key={b.slug}>
              <TLink href={b.href} className="group block" data-cursor="view">
                <Photo image={b.image} className="aspect-[4/3]" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" hover />
                <span className="mt-5 flex items-baseline gap-3">
                  <span className="font-serif italic text-gold-light">{b.index}</span>
                  <span className="font-serif text-2xl text-ivory transition-colors group-hover:text-gold-light">{b.name}</span>
                </span>
                <span className="mt-2 block text-sm leading-relaxed text-ivory/65">{b.summary}</span>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold-light">
                  Discover <Icon name="arrowUpRight" className="h-4 w-4" />
                </span>
              </TLink>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
      <ContactCTA />
    </>
  );
}
