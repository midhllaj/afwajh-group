import type { Metadata } from "next";
import BusinessPage from "@/components/business/BusinessPage";
import BusinessHero from "@/components/business/BusinessHero";
import IntroFacts from "@/components/business/IntroFacts";
import SectionHead from "@/components/business/SectionHead";
import Gallery from "@/components/business/Gallery";
import BusinessContact from "@/components/business/BusinessContact";
import Media from "@/components/ui/Media";
import Icon from "@/components/ui/Icon";
import Marquee from "@/components/ui/Marquee";
import TLink from "@/components/ui/TLink";
import { businessBySlug } from "@/data/businesses";
import { labour, labourImages, labourOffer, labourProcess, labourTrades } from "@/data/divisions";
import { pageMetadata } from "@/lib/seo";

const b = businessBySlug("labour-supply");

export const metadata: Metadata = pageMetadata({
  title: "Labour Supply & Contracting",
  description:
    "Skilled and unskilled construction manpower on short- and long-term contracts — masons, carpenters, steel fixers, electricians, plumbers, operators, drivers and helpers, safety-trained and UAE labour-law compliant.",
  path: b.href,
});

const offerIcons = ["usersThree", "clock", "hardhat", "shield"];

export default function Page() {
  return (
    <BusinessPage business={b}>
      <BusinessHero business={b} title={["Labour Supply", "& *Contracting*"]} />

      <IntroFacts
        business={b}
        title={"The right people,\non *every* site"}
        paragraphs={[labour.intro, ...labour.body]}
        image={labourImages[0]}
        factsBelow
        extra={
          <p className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[15px]" data-reveal>
            <TLink href="/businesses/fhm-general-transport" className="inline-flex items-center gap-2 underline decoration-[var(--accent)] underline-offset-4 hover:text-ink/70">
              FHM site experience <Icon name="arrowUpRight" size={16} />
            </TLink>
            <TLink href="/clients" className="inline-flex items-center gap-2 underline decoration-[var(--accent)] underline-offset-4 hover:text-ink/70">
              Our construction clients <Icon name="arrowUpRight" size={16} />
            </TLink>
          </p>
        }
      />

      {/* What we offer */}
      <section className="grain overflow-hidden bg-emerald-deep py-20 text-ivory md:py-36" aria-labelledby="offer-title">
        <div className="wrap">
          <SectionHead index="02" label="What we offer" title={"Flexible, compliant\n*manpower*"} tone="dark" id="offer-title" />
          <ul className="mt-16 grid gap-px border-y border-line-dark bg-line-dark sm:grid-cols-2 lg:grid-cols-4">
            {labourOffer.map((o, i) => (
              <li key={o.title} className="bg-emerald-deep px-1 py-10 sm:px-8" data-reveal data-delay={String(i * 0.06)}>
                <Icon name={offerIcons[i]} size={38} className="text-[var(--accent)]" />
                <h3 className="t-h4 mt-10">{o.title}</h3>
                <p className="mt-3 text-ivory/65">{o.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <Marquee duration={30} className="mt-24 border-y border-line-dark py-6">
          {labourTrades.map((t) => (
            <span key={t} className="t-h2 mx-8 flex shrink-0 items-center gap-8 text-ivory/15">
              {t}
              <span className="h-2.5 w-2.5 rotate-45 bg-[var(--accent)]" aria-hidden="true" />
            </span>
          ))}
        </Marquee>
        <div className="wrap mt-12">
          <p className="t-label text-ivory/55">Trades we supply</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {labourTrades.map((t) => (
              <li key={t} className="rounded-full border border-line-dark px-4 py-2 text-[15px] text-ivory/85">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Business-specific: how it works */}
      <section className="tone-light bg-ivory py-20 md:py-36" aria-labelledby="process-title">
        <div className="wrap grid-12 gap-y-14">
          <div className="col-span-12 lg:col-span-5">
            <SectionHead index="03" label="How it works" title={"From request\nto *mobilisation*"} id="process-title" className="!block" />
            <Media image={labourImages[3]} className="mt-14 aspect-[4/3]" sizes="(min-width: 1024px) 40vw, 100vw" parallax={6} />
          </div>
          <ol className="col-span-12 lg:col-span-6 lg:col-start-7">
            {labourProcess.map((s, i) => (
              <li key={s.title} className="flex gap-8 border-t border-line-light py-10 last:border-b" data-reveal data-delay={String(i * 0.06)}>
                <span className="t-num text-5xl leading-none text-[var(--accent)] md:text-6xl">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="t-h3 block">{s.title}</span>
                  <span className="mt-3 block text-ink/65">{s.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Gallery images={labourImages} index="04" title={"Built by\n*skilled* hands"} />
      <BusinessContact business={b} index="05" title={"Need a crew?\nLet’s *talk*"} />
    </BusinessPage>
  );
}
