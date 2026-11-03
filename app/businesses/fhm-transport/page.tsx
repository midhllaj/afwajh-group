import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal, { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import Photo from "@/components/ui/Photo";
import Counter from "@/components/ui/Counter";
import Icon from "@/components/ui/Icon";
import Gallery from "@/components/ui/Gallery";
import Marquee from "@/components/ui/Marquee";
import Button from "@/components/ui/Button";
import NextBusiness from "@/components/ui/NextBusiness";
import ProjectsExplorer from "@/components/fhm/ProjectsExplorer";
import JsonLd from "@/components/seo/JsonLd";
import { coreWork, fhm, fhmFleetImages, fhmGallery, fhmServices, fleet, portfolioValue, projects, rentalPlans } from "@/data/fhm";
import { pageMetadata } from "@/lib/seo";
import { localBusinessSchema } from "@/lib/schema";
import { formatCompactAED } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "FHM General Transport LLC",
  description:
    "FHM General Transport: heavy machinery rental, deep excavation, demolition and heavy transport in the UAE since 2008 — trusted on major Azizi Venice, BT Waada and Western Bainoona projects.",
  path: "/businesses/fhm-transport",
  image: "/images/fhm/fhm-heavy-machinery.webp",
});

export default function FhmPage() {
  return (
    <div className="[--fhm:#1173BE]">
      <JsonLd
        data={localBusinessSchema({
          type: "LocalBusiness",
          name: fhm.name,
          address: fhm.contact.address,
          locality: "Dubai",
          region: "Dubai",
          url: "/businesses/fhm-transport",
          telephone: fhm.contact.phones[0].display,
        })}
      />
      <PageHero
        index="04"
        eyebrow="Transport & Heavy Machinery"
        title={"Powering\n*progress* since 2008"}
        intro={fhm.tagline}
        image={{ src: "/images/fhm/fhm-heavy-machinery.webp", alt: "Yellow FHM bulldozers and graders lined up under a cloudy sky" }}
        accent="blue"
        breadcrumb={[{ label: "Businesses", href: "/businesses" }, { label: "FHM General Transport" }]}
        logo={{ src: "/images/logos/fhm-logo-white.png", alt: "FHM General Transport logo", width: 928, height: 268 }}
      />

      {/* Key figures */}
      <section className="on-light bg-ivory py-16 text-ink md:py-20">
        <div className="container-x grid grid-cols-2 gap-px bg-emerald-900/15 lg:grid-cols-4">
          {[
            { node: <Counter value={fhm.established} />, l: "Established" },
            { node: <Counter value={fhm.employees} />, l: "Employees" },
            { node: <Counter value={projects.length} />, l: "Major projects listed" },
            { node: <span>{formatCompactAED(portfolioValue)}</span>, l: "Project portfolio value" },
          ].map((s) => (
            <Reveal key={s.l} className="bg-ivory px-2 py-6 md:px-6">
              <p className="font-serif text-5xl leading-none text-emerald-900 md:text-6xl">{s.node}</p>
              <p className="mt-3 text-sm font-medium text-muted">{s.l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* About + CEO */}
      <section className="grain bg-emerald-800 py-24 md:py-32">
        <div className="container-x grid-12 gap-y-14">
          <div className="col-span-12 lg:col-span-6">
            <SectionHeader eyebrow="About FHM" title={"Redefining excellence in\n*transport* & machinery"} />
            {fhm.about.map((p) => (
              <Reveal key={p.slice(0, 20)} className="mt-6">
                <p className="leading-relaxed text-ivory/75">{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="col-span-12 lg:col-span-5 lg:col-start-8" delay={0.15}>
            <figure className="border border-ivory/10 bg-emerald-900/70 p-6 md:p-8">
              <p className="eyebrow text-[#6fb6ea]">Message from the CEO</p>
              <blockquote className="mt-5 space-y-4 text-[0.95rem] leading-relaxed text-ivory/80">
                {fhm.ceo.message.map((p) => (
                  <p key={p.slice(0, 20)}>{p}</p>
                ))}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4 border-t border-ivory/10 pt-6">
                <Image src={fhm.ceo.photo.src} alt={fhm.ceo.photo.alt} width={72} height={94} className="h-20 w-16 object-cover object-top" />
                <span>
                  <span className="block font-serif text-2xl italic text-ivory">{fhm.ceo.name}</span>
                  <span className="text-sm text-ivory/60">
                    {fhm.ceo.title}, FHM General Transport
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Vision & mission */}
      <section className="on-light bg-ivory py-24 text-ink md:py-32">
        <div className="container-x grid gap-px bg-emerald-900/15 md:grid-cols-2">
          {[
            { label: "Our vision", text: fhm.vision },
            { label: "Our mission", text: fhm.mission },
          ].map((v, i) => (
            <Reveal key={v.label} delay={i * 0.1} className="bg-ivory p-2 py-8 md:p-12">
              <p className="eyebrow text-fhm-blue-dark">{v.label}</p>
              <p className="mt-5 font-serif text-2xl leading-snug text-emerald-900 md:text-[1.9rem]">{v.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="grain bg-emerald-900 py-24 md:py-32">
        <div className="container-x">
          <SectionHeader eyebrow="Services we offer" title={"Comprehensive solutions,\n*reliable* services"} />
          <RevealGroup as="ul" className="mt-16 grid gap-px bg-ivory/10 sm:grid-cols-2 lg:grid-cols-3">
            {fhmServices.map((s, i) => (
              <RevealItem as="li" key={s.title} className="group relative bg-emerald-900 p-7 transition-colors duration-500 hover:bg-emerald-800 md:p-9">
                <div className="flex items-start justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-fhm-blue/60 text-[#6fb6ea] transition-colors group-hover:bg-fhm-blue group-hover:text-white">
                    <Icon name={s.icon} className="h-7 w-7" />
                  </span>
                  <span className="font-serif text-lg italic text-ivory/35">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-8 font-serif text-[1.65rem] leading-tight text-ivory">{s.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ivory/70">{s.text}</p>
                <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-fhm-blue transition-transform duration-700 group-hover:scale-x-100" />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Fleet + core work */}
      <section className="grain overflow-hidden bg-emerald-800 py-24 md:py-32">
        <div className="container-x grid-12 gap-y-14">
          <div className="col-span-12 lg:col-span-5">
            <SectionHeader eyebrow="Heavy equipment" title={"A modern,\nwell-kept *fleet*"} intro="Powering your projects with advanced machinery — efficient, reliable and ready for every challenge." />
            <Reveal delay={0.1} className="mt-10">
              <p className="eyebrow text-[#6fb6ea]">Rental plans</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {rentalPlans.map((r) => (
                  <li key={r} className="rounded-full bg-fhm-blue px-5 py-2 text-sm font-semibold text-white">
                    {r}
                  </li>
                ))}
              </ul>
            </Reveal>
            <div className="mt-12 space-y-8">
              {coreWork.map((c) => (
                <Reveal key={c.title} className="border-l-2 border-fhm-blue pl-5">
                  <h3 className="font-serif text-2xl text-ivory">{c.title}</h3>
                  <p className="mt-2 leading-relaxed text-ivory/70">{c.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <RevealGroup className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {fhmFleetImages.map((f) => (
                <RevealItem key={f.src}>
                  <Photo image={f} className="aspect-[5/4]" sizes="(min-width: 768px) 16vw, 50vw" hover />
                </RevealItem>
              ))}
            </RevealGroup>
            <Reveal className="mt-8">
              <ul className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
                {fleet.map((f) => (
                  <li key={f} className="flex items-center gap-3 border-b border-ivory/10 py-3 text-ivory/85">
                    <Icon name="check" className="h-4 w-4 text-[#6fb6ea]" />
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
        <Marquee duration={30} className="mt-20 border-y border-ivory/10 py-6">
          {fleet.map((f) => (
            <span key={f} className="mx-8 flex shrink-0 items-center gap-8 font-serif text-4xl italic text-ivory/25 md:text-6xl">
              {f}
              <span className="h-2 w-2 rotate-45 bg-fhm-blue" aria-hidden="true" />
            </span>
          ))}
        </Marquee>
      </section>

      {/* Projects */}
      <section id="projects" className="grain scroll-mt-20 bg-emerald-900 py-24 md:py-32">
        <div className="container-x">
          <SectionHeader eyebrow="Our major projects" title={"Earthworks for the\nregion’s *landmarks*"} intro="Excavation, soil shifting, transport and filling for leading developers and contractors across Dubai South and Abu Dhabi." />
          <div className="mt-14">
            <ProjectsExplorer />
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="on-light bg-ivory py-24 text-ink md:py-32" aria-labelledby="gallery-title">
        <div className="container-x">
          <SectionHeader eyebrow="On site" title={"Our teams\nat *work*"} tone="light" />
          <span id="gallery-title" className="sr-only">FHM project gallery</span>
          <div className="mt-14">
            <Gallery images={fhmGallery} />
          </div>
        </div>
      </section>

      {/* FHM contact */}
      <section className="grain bg-emerald-800 py-24 md:py-32">
        <div className="container-x grid-12 items-end gap-y-12">
          <div className="col-span-12 lg:col-span-6">
            <Image src="/images/logos/fhm-logo-white.png" alt="FHM General Transport logo" width={928} height={268} className="mb-10 h-auto w-44" />
            <SectionHeader eyebrow="Contact FHM" title={"Let’s power your\nnext *project*"} />
          </div>
          <Reveal className="col-span-12 lg:col-span-5 lg:col-start-8">
            <address className="space-y-4 not-italic text-ivory/85">
              <p className="flex gap-3">
                <Icon name="pin" className="h-5 w-5 text-[#6fb6ea]" /> {fhm.contact.address}
              </p>
              {fhm.contact.phones.map((p) => (
                <a key={p.href} href={p.href} className="flex gap-3 hover:text-[#6fb6ea]">
                  <Icon name="phone" className="h-5 w-5 text-[#6fb6ea]" /> {p.display}
                </a>
              ))}
              <a href={`mailto:${fhm.contact.email}`} className="flex gap-3 hover:text-[#6fb6ea]">
                <Icon name="mail" className="h-5 w-5 text-[#6fb6ea]" /> {fhm.contact.email}
              </a>
              <a href={fhm.contact.websiteHref} target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-[#6fb6ea]">
                <Icon name="globe" className="h-5 w-5 text-[#6fb6ea]" /> {fhm.contact.website}
              </a>
            </address>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href={fhm.contact.phones[0].href} variant="blue">
                Call FHM
              </Button>
              <Button href={`mailto:${fhm.contact.email}`} variant="outline">
                Email FHM
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <NextBusiness slug="fhm-transport" />
    </div>
  );
}
