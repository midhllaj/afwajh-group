import type { Metadata } from "next";
import Image from "next/image";
import BusinessPage from "@/components/business/BusinessPage";
import BusinessHero from "@/components/business/BusinessHero";
import IntroFacts from "@/components/business/IntroFacts";
import SectionHead from "@/components/business/SectionHead";
import Gallery from "@/components/business/Gallery";
import BusinessContact from "@/components/business/BusinessContact";
import ProjectsTable from "@/components/business/fhm/ProjectsTable";
import Media from "@/components/ui/Media";
import Icon from "@/components/ui/Icon";
import Marquee from "@/components/ui/Marquee";
import Kicker from "@/components/ui/Kicker";
import JsonLd from "@/components/seo/JsonLd";
import { businessBySlug } from "@/data/businesses";
import { fhm, fhmGallery, fhmImages, fhmServices, fleet, projects, rentalPlans } from "@/data/fhm";
import { pageMetadata } from "@/lib/seo";
import { localBusinessSchema } from "@/lib/schema";

const b = businessBySlug("fhm-general-transport");

export const metadata: Metadata = pageMetadata({
  title: b.name,
  description:
    "FHM General Transport: heavy machinery rental, deep excavation, demolition and heavy transport in the UAE since 2008 — trusted on Azizi Venice, BT Waada and Western Bainoona projects.",
  path: b.href,
});

export default function Page() {
  return (
    <BusinessPage business={b}>
      <JsonLd
        data={localBusinessSchema({
          type: "LocalBusiness",
          name: fhm.name,
          address: b.contact.address!,
          locality: "Dubai",
          region: "Dubai",
          url: b.href,
          telephone: b.contact.phones[0].display,
        })}
      />
      <BusinessHero
        business={b}
        title={["Powering", "*progress* since 2008"]}
        logo={<Image src="/images/logos/fhm-logo-white.png" alt="FHM General Transport logo" width={928} height={268} className="h-auto w-40 md:w-52" />}
      />

      <IntroFacts
        business={b}
        title={"Your trusted partner\nin *machinery*"}
        paragraphs={fhm.about}
        image={fhmImages.intro}
        extra={
          <figure className="mt-12 flex gap-5 border border-line-light p-5" data-reveal>
            <Image src={fhm.ceo.photo.src} alt={fhm.ceo.photo.alt} width={88} height={114} className="h-28 w-[88px] shrink-0 object-cover object-top" />
            <div>
              <p className="t-label text-[var(--accent)]">Message from the CEO</p>
              <blockquote className="mt-3 text-[15px] leading-relaxed text-ink/75">“{fhm.ceo.message[2]}”</blockquote>
              <figcaption className="mt-3 text-[14px]">
                <span className="font-medium">{fhm.ceo.name}</span>
                <span className="text-ink/65"> — {fhm.ceo.title}</span>
              </figcaption>
            </div>
          </figure>
        }
      />

      {/* Vision & mission */}
      <section className="grain bg-[var(--accent)] py-24 text-white md:py-32" aria-label="FHM vision and mission">
        <div className="wrap grid gap-14 md:grid-cols-2 md:gap-20">
          {[
            { label: "Vision", text: fhm.vision },
            { label: "Mission", text: fhm.mission },
          ].map((v, i) => (
            <div key={v.label} className="border-t border-white/30 pt-8" data-reveal data-delay={String(i * 0.1)}>
              <p className="t-label text-white/90">Our {v.label.toLowerCase()}</p>
              <p className="t-h4 mt-6 text-[clamp(1.35rem,1.1rem+0.8vw,2rem)] leading-snug">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="tone-light bg-ivory py-28 md:py-36" aria-labelledby="services-title">
        <div className="wrap">
          <SectionHead index="02" label="What we offer" title={"Comprehensive solutions,\n*reliable* services"} intro="Rental plans available hourly, daily or monthly — customised to your project." id="services-title" />
          <ul className="mt-16 grid gap-px border-y border-line-light bg-line-light sm:grid-cols-2 lg:grid-cols-4">
            {fhmServices.map((s, i) => (
              <li key={s.title} className="group bg-ivory px-1 py-10 sm:px-7" data-reveal data-delay={String((i % 4) * 0.06)}>
                <div className="flex items-start justify-between">
                  <Icon name={s.icon} size={38} className="text-[var(--accent)]" />
                  <span className="t-label text-ink/40">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="t-h4 mt-8">{s.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/65">{s.text}</p>
              </li>
            ))}
            <li className="flex flex-col justify-end bg-ivory px-1 py-10 sm:px-7" data-reveal>
              <p className="t-label text-ink/60">Rental plans</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {rentalPlans.map((r) => (
                  <li key={r} className="rounded-full bg-[var(--accent)] px-4 py-2 text-[14px] text-white">
                    {r}
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </section>

      {/* Fleet */}
      <section className="grain overflow-hidden bg-emerald-deep py-28 text-ivory md:py-36" aria-labelledby="fleet-title">
        <div className="wrap grid-12 gap-y-14">
          <div className="col-span-12 lg:col-span-4">
            <Kicker index="03" accent>
              Heavy equipment
            </Kicker>
            <h2 id="fleet-title" className="t-h2 mt-8" data-split>
              A modern, <em className="accent-word">well-kept</em> fleet
            </h2>
            <ul className="mt-10 border-t border-line-dark" data-reveal>
              {fleet.map((f) => (
                <li key={f} className="flex items-center gap-4 border-b border-line-dark py-3.5 text-ivory/85">
                  <span className="h-1.5 w-1.5 rotate-45 bg-[var(--accent)]" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-12 grid grid-cols-2 gap-3 md:gap-4 lg:col-span-7 lg:col-start-6">
            {fhmImages.fleet.map((img, i) => (
              <Media key={img.src} image={img} className={i % 3 === 0 ? "col-span-2 aspect-[16/9]" : "aspect-[4/5]"} sizes="(min-width: 1024px) 30vw, 50vw" />
            ))}
          </div>
        </div>
        <Marquee duration={32} className="mt-24 border-y border-line-dark py-6">
          {fleet.map((f) => (
            <span key={f} className="t-h2 mx-8 flex shrink-0 items-center gap-8 text-ivory/15">
              {f}
              <span className="h-2.5 w-2.5 rotate-45 bg-[var(--accent)]" aria-hidden="true" />
            </span>
          ))}
        </Marquee>
      </section>

      {/* Business-specific: projects */}
      <section id="projects" className="tone-light scroll-mt-20 bg-ivory py-28 md:py-36" aria-labelledby="projects-title">
        <div className="wrap">
          <SectionHead
            index="04"
            label="Major projects"
            title={"Earthworks for the\nregion’s *landmarks*"}
            intro="Excavation, soil shifting, transport and filling for leading developers and contractors across Dubai South and Abu Dhabi."
            id="projects-title"
          />
          <div className="mt-16">
            <ProjectsTable projects={projects} />
          </div>
        </div>
      </section>

      <Gallery images={fhmGallery} index="05" label="On site with FHM" title={"Our teams\nat *work*"} intro="Real photographs from FHM project sites." small />
      <BusinessContact business={b} index="06" title={"Let’s power your\nnext *project*"} />
    </BusinessPage>
  );
}
