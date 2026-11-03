import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal, { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import Gallery from "@/components/ui/Gallery";
import NextBusiness from "@/components/ui/NextBusiness";
import ContactCTA from "@/components/home/ContactCTA";
import { technical, technicalGallery, technicalServices } from "@/data/divisions";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Afwajh Technical Services",
  description:
    "Licensed technical services in Dubai: glass & aluminium, steel, false ceilings, partitions, tiling, carpentry & wood flooring, kitchens, swimming pools, parking systems and more.",
  path: "/businesses/technical-services",
  image: "/images/technical/glass-facade.webp",
});

export default function TechnicalServicesPage() {
  return (
    <>
      <PageHero
        index="06"
        eyebrow="Installation, Fit-out & Maintenance"
        title={"Afwajh Technical\n*Services*"}
        intro={technical.intro}
        image={technicalGallery[0]}
        breadcrumb={[{ label: "Businesses", href: "/businesses" }, { label: "Technical Services" }]}
      >
        <p lang="ar" dir="rtl" className="font-arabic text-2xl text-ivory/80 md:text-3xl">
          {technical.arabicName}
        </p>
      </PageHero>

      <section className="on-light bg-ivory py-24 text-ink md:py-32" aria-labelledby="tech-services">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeader eyebrow="Ten licensed activities" title={"Craft, precision\nand *care*"} tone="light" />
            <p id="tech-services" className="max-w-md text-muted">
              One accountable team for the technical and finishing works across residential, commercial and specialist projects.
            </p>
          </div>
          <RevealGroup as="ul" className="mt-16 grid gap-px border border-emerald-900/10 bg-emerald-900/10 sm:grid-cols-2 lg:grid-cols-5">
            {technicalServices.map((s, i) => (
              <RevealItem as="li" key={s.title} className="group relative flex flex-col bg-ivory p-6 transition-colors duration-500 hover:bg-white md:p-7">
                <div className="flex items-start justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold-deep/40 text-emerald-700 transition-colors duration-500 group-hover:border-gold-deep group-hover:bg-emerald-800 group-hover:text-gold-light">
                    <Icon name={s.icon} className="h-7 w-7" />
                  </span>
                  <span className="font-serif text-sm italic text-gold-deep">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-7 font-serif text-[1.45rem] leading-tight text-emerald-900">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.text}</p>
                <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gold-gradient transition-transform duration-700 group-hover:scale-x-100" />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="grain bg-emerald-800 py-24 md:py-32">
        <div className="container-x">
          <SectionHeader eyebrow="Our work, in spirit" title={"Spaces finished\nto a *higher* standard"} />
          <p className="mt-4 text-xs uppercase tracking-[0.16em] text-ivory/45">Illustrative images</p>
          <div className="mt-12">
            <Gallery images={technicalGallery} columns="columns-2 md:columns-3" />
          </div>
        </div>
      </section>

      {/* Trust line */}
      <section className="on-light border-t border-emerald-900/10 bg-ivory py-10 text-ink">
        <Reveal className="container-x flex flex-col items-start gap-3 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p className="flex items-center gap-3">
            <Icon name="shield" className="h-5 w-5 text-emerald-700" />
            Licensed by the {technical.licence.authority}
          </p>
          <p className="text-xs">
            {technical.licence.type} · {technical.licence.category} · Owner: {technical.licence.owner} · Licence No. {technical.licence.number} · Issued {technical.licence.issued} · Valid until {technical.licence.expires}
          </p>
        </Reveal>
      </section>

      <NextBusiness slug="technical-services" />
      <ContactCTA title={"Request a site visit\nor *quotation.*"} />
    </>
  );
}
