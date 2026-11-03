import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal, { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import Photo from "@/components/ui/Photo";
import Parallax from "@/components/ui/Parallax";
import LineArt from "@/components/ui/LineArt";
import NextBusiness from "@/components/ui/NextBusiness";
import CanteenTimeline from "@/components/catering/CanteenTimeline";
import CateringEnquiryForm from "@/components/forms/CateringEnquiryForm";
import JsonLd from "@/components/seo/JsonLd";
import { catering, cateringGallery, cateringServices } from "@/data/catering";
import { contact } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { localBusinessSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Afwajh Catering Services",
  description:
    "Permanent and temporary site canteens, tiffin services, event catering and food trucks from Afwajh Catering Services, operating from Business Bay, Dubai since 2016.",
  path: "/businesses/catering",
  image: "/images/catering/event-buffet.webp",
});

export default function CateringPage() {
  return (
    <>
      <JsonLd
        data={localBusinessSchema({
          type: "FoodEstablishment",
          name: catering.name,
          address: catering.base,
          locality: "Dubai",
          region: "Dubai",
          url: "/businesses/catering",
          telephone: contact.tel.display,
        })}
      />
      <PageHero
        index="03"
        eyebrow="Catering Services"
        title={"Make your events\n*memorable*"}
        intro={`With our authentic delicacies. ${catering.intro}`}
        image={catering.hero}
        accent="orange"
        breadcrumb={[{ label: "Businesses", href: "/businesses" }, { label: "Catering Services" }]}
        logo={{ src: "/images/logos/catering-logo.png", alt: "Afwajh Catering Services logo", width: 678, height: 582, className: "rounded-sm bg-ivory p-4" }}
      />

      {/* About */}
      <section className="on-light bg-ivory py-24 text-ink md:py-32">
        <div className="container-x grid-12 gap-y-12">
          <div className="col-span-12 lg:col-span-5">
            <Reveal variant="fade" className="mb-6 flex items-center gap-4">
              <span className="h-px w-12 bg-catering-orange" />
              <span className="eyebrow text-catering-green">About us</span>
            </Reveal>
            <h2 className="display-md text-emerald-900">
              Fresh ingredients, a <span className="italic text-catering-orange-dark">modern twist</span> on tradition.
            </h2>
            <Reveal delay={0.1} className="mt-10 flex flex-wrap gap-x-10 gap-y-4 text-sm">
              <p>
                <span className="eyebrow block text-muted">Licence</span>
                <span className="font-serif text-2xl text-emerald-900"># {catering.licence}</span>
              </p>
              <p>
                <span className="eyebrow block text-muted">Based in</span>
                <span className="font-serif text-2xl text-emerald-900">{catering.base}</span>
              </p>
              <p>
                <span className="eyebrow block text-muted">Since</span>
                <span className="font-serif text-2xl text-emerald-900">{catering.since}</span>
              </p>
            </Reveal>
          </div>
          <Reveal className="col-span-12 lg:col-span-6 lg:col-start-7" delay={0.1}>
            <p className="lead text-ink/80">{catering.about}</p>
            <div className="mt-12 grid gap-8 border-t border-emerald-900/15 pt-10 sm:grid-cols-2">
              <div>
                <p className="eyebrow text-catering-orange-dark">Our mission</p>
                <p className="mt-3 font-serif text-xl leading-snug text-emerald-900">{catering.mission}</p>
              </div>
              <div>
                <p className="eyebrow text-catering-orange-dark">Our vision</p>
                <p className="mt-3 font-serif text-xl leading-snug text-emerald-900">{catering.vision}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="grain bg-emerald-900 py-24 md:py-32" aria-labelledby="services-title">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeader eyebrow="Our services" title={"Five ways\nwe *serve*"} />
            <LineArt name="cloche" className="w-40 md:w-56" accent="#EE9A24" />
          </div>
          <span id="services-title" className="sr-only">Catering services</span>

          <div className="mt-16">
            {cateringServices.map((s, i) => {
              const flip = i % 2 === 1;
              return (
                <article id={s.id} key={s.id} className="grid-12 scroll-mt-28 items-center gap-y-8 border-t border-ivory/10 py-16 md:py-24">
                  <div className={cn("col-span-12 md:col-span-6", flip && "md:order-2 md:col-start-7")}>
                    <Reveal variant="clip">
                      <Parallax amount={30}>
                        <Photo image={s.image} className="aspect-[4/3]" sizes="(min-width: 768px) 50vw, 100vw" hover view />
                      </Parallax>
                    </Reveal>
                  </div>
                  <div className={cn("col-span-12 md:col-span-5", flip ? "md:order-1 md:col-start-1" : "md:col-start-8")}>
                    <Reveal>
                      <p className="font-serif text-6xl italic leading-none text-catering-orange/90 md:text-7xl">{s.index}</p>
                      <h3 className="display-sm mt-4 text-ivory">{s.title}</h3>
                      <p className="mt-4 text-lg font-medium text-ivory/90">{s.lead}</p>
                      {s.body.map((p) => (
                        <p key={p.slice(0, 20)} className="mt-4 leading-relaxed text-ivory/70">
                          {p}
                        </p>
                      ))}
                      {s.highlight && (
                        <p className="mt-8 inline-flex flex-col border-l-2 border-catering-orange pl-4">
                          <span className="eyebrow text-catering-orange">{s.highlight.label}</span>
                          <span className="mt-1 font-serif text-2xl text-ivory">{s.highlight.value}</span>
                        </p>
                      )}
                      {s.clients && (
                        <div className="mt-8">
                          <p className="eyebrow text-catering-orange">Clients include</p>
                          <ul className="mt-3 flex flex-wrap gap-2">
                            {s.clients.map((c) => (
                              <li key={c} className="rounded-full border border-ivory/20 px-3 py-1 text-sm text-ivory/85">
                                {c}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </Reveal>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Site canteen timeline */}
      <section className="grain bg-emerald-800 py-24 md:py-32">
        <div className="container-x">
          <SectionHeader
            eyebrow="Proposal for project sites"
            title={"How our site\ncanteen *works*"}
            intro="A container canteen on your plot, fed from our central kitchen — affordable for your workforce and effortless for you."
            align="center"
            className="mb-20"
          />
          <div className="mx-auto max-w-5xl">
            <CanteenTimeline />
          </div>
        </div>
      </section>

      {/* Gallery strip */}
      <section className="on-light bg-ivory py-16 md:py-24" aria-label="Catering gallery">
        <RevealGroup className="container-x grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
          {cateringGallery.map((g, i) => (
            <RevealItem key={g.src} className={cn(i === 0 && "col-span-2 md:col-span-1")}>
              <Photo image={g} className="aspect-[4/5]" sizes="(min-width: 768px) 33vw, 50vw" hover view />
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Enquiry */}
      <section id="enquire" className="grain scroll-mt-20 bg-emerald-900 py-24 md:py-32">
        <div className="container-x grid-12 gap-y-14">
          <div className="col-span-12 lg:col-span-4">
            <SectionHeader eyebrow="Enquire" title={"Plan your\n*menu* with us"} intro="Tell us about your event or site and our catering team will respond with a tailored proposal." />
            <Reveal delay={0.2} className="mt-10 flex items-center gap-4">
              <Image src="/images/logos/catering-logo.png" alt="" width={90} height={77} className="h-16 w-auto rounded-sm bg-ivory p-2" />
              <div className="text-sm text-ivory/70">
                <a href={contact.tel.href} className="block hover:text-catering-orange">
                  {contact.tel.display}
                </a>
                <a href={`mailto:${contact.email}`} className="block hover:text-catering-orange">
                  {contact.email}
                </a>
              </div>
            </Reveal>
          </div>
          <Reveal className="col-span-12 lg:col-span-7 lg:col-start-6">
            <CateringEnquiryForm />
          </Reveal>
        </div>
      </section>

      <NextBusiness slug="catering" />
    </>
  );
}
