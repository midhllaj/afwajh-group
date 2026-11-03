import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal, { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import Photo from "@/components/ui/Photo";
import Parallax from "@/components/ui/Parallax";
import Counter from "@/components/ui/Counter";
import Icon from "@/components/ui/Icon";
import LineArt from "@/components/ui/LineArt";
import NextBusiness from "@/components/ui/NextBusiness";
import ContactCTA from "@/components/home/ContactCTA";
import { trading } from "@/data/divisions";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Afwajh General Trading",
  description:
    "Afwajh General Trading is the group’s supply and distribution arm in Al Nahda 1 and Al Qusais 1, Dubai — sourcing, trading and delivering products for the group and external clients.",
  path: "/businesses/general-trading",
  image: trading.image.src,
});

export default function GeneralTradingPage() {
  return (
    <>
      <PageHero
        index="05"
        eyebrow="Supply & Distribution"
        title={"Afwajh General\n*Trading*"}
        intro={trading.intro}
        image={trading.image}
        breadcrumb={[{ label: "Businesses", href: "/businesses" }, { label: "General Trading" }]}
        compact
      />

      <section className="on-light bg-ivory py-24 text-ink md:py-32">
        <div className="container-x grid-12 gap-y-14">
          <div className="col-span-12 lg:col-span-5">
            <SectionHeader eyebrow="What we do" title={"Sourcing to\n*delivery*"} tone="light" />
            {trading.body.map((p) => (
              <Reveal key={p.slice(0, 20)} className="mt-6">
                <p className="lead text-ink/80">{p}</p>
              </Reveal>
            ))}
            <Reveal className="mt-12 grid grid-cols-2 gap-px bg-emerald-900/15">
              <div className="bg-ivory py-5 pr-4">
                <p className="font-serif text-6xl leading-none text-emerald-900">
                  <Counter value={trading.employees} />
                </p>
                <p className="mt-2 text-sm text-muted">Employees</p>
              </div>
              <div className="bg-ivory py-5 pl-5">
                <p className="font-serif text-6xl leading-none text-emerald-900">
                  <Counter value={trading.locations.length} />
                </p>
                <p className="mt-2 text-sm text-muted">Dubai locations</p>
              </div>
            </Reveal>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <Reveal variant="clip">
              <Parallax amount={30}>
                <Photo image={trading.secondaryImage} className="aspect-[4/3]" sizes="(min-width: 1024px) 50vw, 100vw" hover view />
              </Parallax>
            </Reveal>
            <Reveal className="mt-8 border border-emerald-900/15 p-6">
              <p className="eyebrow text-emerald-700">Locations</p>
              <ul className="mt-4 space-y-3">
                {trading.locations.map((l) => (
                  <li key={l} className="flex items-center gap-3 font-serif text-2xl text-emerald-900">
                    <Icon name="pin" className="h-5 w-5 text-gold-deep" />
                    {l}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="grain bg-emerald-800 py-24 md:py-32">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
            <SectionHeader eyebrow="How we work" title={"Quality, efficiency\nand *reliability*"} />
            <LineArt name="delivery" className="w-40 md:w-56" />
          </div>
          <RevealGroup as="ol" className="mt-16 grid gap-px bg-ivory/10 sm:grid-cols-2 lg:grid-cols-4">
            {trading.pillars.map((p, i) => (
              <RevealItem as="li" key={p.title} className="bg-emerald-800 p-7 md:p-9">
                <span className="font-serif text-5xl italic text-gold-light/80">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 font-serif text-3xl text-ivory">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-ivory/70">{p.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
          {trading.productCategories.length > 0 && (
            <Reveal className="mt-16">
              <p className="eyebrow text-teal-light">Product categories</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {trading.productCategories.map((c) => (
                  <li key={c} className="rounded-full border border-ivory/20 px-4 py-1.5 text-ivory/85">
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </section>

      <NextBusiness slug="general-trading" />
      <ContactCTA title={"Source with a partner\nyou can *rely* on."} />
    </>
  );
}
