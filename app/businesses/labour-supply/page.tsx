import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal, { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import Photo from "@/components/ui/Photo";
import Parallax from "@/components/ui/Parallax";
import Icon from "@/components/ui/Icon";
import Marquee from "@/components/ui/Marquee";
import TLink from "@/components/ui/TLink";
import NextBusiness from "@/components/ui/NextBusiness";
import ContactCTA from "@/components/home/ContactCTA";
import { labour, labourImages, labourOffer, labourProcess, labourTrades } from "@/data/divisions";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Labour Supply & Contracting",
  description:
    "Skilled and unskilled construction manpower on short- and long-term contracts — masons, carpenters, steel fixers, operators, drivers and helpers, safety-trained and compliant with UAE labour law.",
  path: "/businesses/labour-supply",
  image: "/images/labour/construction-team.webp",
});

export default function LabourSupplyPage() {
  return (
    <>
      <PageHero
        index="07"
        eyebrow="Manpower for construction"
        title={"Labour Supply\n& *Contracting*"}
        intro={labour.intro}
        image={labourImages[0]}
        breadcrumb={[{ label: "Businesses", href: "/businesses" }, { label: "Labour Supply & Contracting" }]}
      />

      <section className="on-light bg-ivory py-24 text-ink md:py-32">
        <div className="container-x grid-12 gap-y-14">
          <div className="col-span-12 lg:col-span-6">
            <SectionHeader eyebrow="Built on site experience" title={"The right people,\non *every* site"} tone="light" />
            {labour.body.map((p) => (
              <Reveal key={p.slice(0, 20)} className="mt-6">
                <p className="lead text-ink/80">{p}</p>
              </Reveal>
            ))}
            <Reveal className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
              <TLink href="/businesses/fhm-transport" className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-900">
                FHM site experience <Icon name="arrowUpRight" className="h-4 w-4" />
              </TLink>
              <TLink href="/clients" className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-900">
                Our construction clients <Icon name="arrowUpRight" className="h-4 w-4" />
              </TLink>
            </Reveal>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <Reveal variant="clip">
              <Parallax amount={30}>
                <Photo image={labourImages[1]} className="aspect-[4/5]" sizes="(min-width: 1024px) 40vw, 100vw" hover showIllustrativeNote />
              </Parallax>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="grain bg-emerald-800 py-24 md:py-32">
        <div className="container-x">
          <SectionHeader eyebrow="What we offer" title={"Flexible, compliant\n*manpower*"} />
          <RevealGroup as="ul" className="mt-16 grid gap-px bg-ivory/10 sm:grid-cols-2 lg:grid-cols-4">
            {labourOffer.map((o, i) => (
              <RevealItem as="li" key={o.title} className="bg-emerald-800 p-7 md:p-9">
                <Icon name={["people", "clock", "shield", "check"][i]} className="h-8 w-8 text-gold-light" />
                <h3 className="mt-8 font-serif text-2xl leading-tight text-ivory">{o.title}</h3>
                <p className="mt-3 leading-relaxed text-ivory/70">{o.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
        <Marquee duration={28} className="mt-20 border-y border-ivory/10 py-6">
          {labourTrades.map((t) => (
            <span key={t} className="mx-8 flex shrink-0 items-center gap-8 font-serif text-4xl italic text-ivory/30 md:text-6xl">
              {t}
              <span className="h-2 w-2 rotate-45 bg-gold-light" aria-hidden="true" />
            </span>
          ))}
        </Marquee>
        <div className="container-x mt-10">
          <p className="eyebrow text-teal-light">Trades we supply</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {labourTrades.map((t) => (
              <li key={t} className="rounded-full border border-ivory/20 px-4 py-1.5 text-sm text-ivory/85">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="on-light bg-ivory py-24 text-ink md:py-32">
        <div className="container-x grid-12 gap-y-14">
          <div className="col-span-12 lg:col-span-5">
            <SectionHeader eyebrow="How it works" title={"From request\nto *mobilisation*"} tone="light" />
            <Reveal variant="clip" className="mt-12">
              <Photo image={labourImages[3]} className="aspect-[4/3]" sizes="(min-width: 1024px) 40vw, 100vw" hover />
            </Reveal>
          </div>
          <RevealGroup as="ol" className="col-span-12 lg:col-span-6 lg:col-start-7">
            {labourProcess.map((s, i) => (
              <RevealItem as="li" key={s.title} className="flex gap-6 border-b border-emerald-900/15 py-8 first:border-t">
                <span className="font-serif text-5xl italic leading-none text-gold-deep">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block font-serif text-3xl text-emerald-900">{s.title}</span>
                  <span className="mt-2 block text-muted">{s.text}</span>
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <NextBusiness slug="labour-supply" />
      <ContactCTA title={"Need a crew?\nLet’s *talk* manpower."} />
    </>
  );
}
