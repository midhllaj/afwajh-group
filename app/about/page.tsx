import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Kicker from "@/components/ui/Kicker";
import Rich from "@/components/ui/Rich";
import Counter from "@/components/ui/Counter";
import Media from "@/components/ui/Media";
import ScrollWords from "@/components/ui/ScrollWords";
import OwnerPortrait from "@/components/owner/OwnerPortrait";
import TLink from "@/components/ui/TLink";
import Icon from "@/components/ui/Icon";
import { Mark } from "@/components/brand/Logo";
import VisionMission from "@/components/home/VisionMission";
import Strengths from "@/components/home/Strengths";
import ContactCta from "@/components/home/ContactCta";
import { businesses } from "@/data/businesses";
import { intro, keyStats, ownerMessage, site, workforce, workforceCopy } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About the Group",
  description:
    "Established in 2010, Afwajh Group of Companies operates across retail, hospitality, catering, general trading, transport, technical services and labour supply in the UAE.",
  path: "/about",
});

const milestones = [
  { year: "2008", text: "FHM General Transport is established, building the group’s heavy machinery and transport capability." },
  { year: "2010", text: "Afwajh Group of Companies is established in the United Arab Emirates." },
  { year: "2016", text: "Afwajh Catering Services begins operating from Business Bay, Dubai." },
  { year: "2026", text: "Afwajh Technical Services is licensed by Dubai’s Department of Economy & Tourism." },
];

export default function AboutPage() {
  const known = workforce.filter((w) => w.employees !== null);
  const max = Math.max(...known.map((w) => w.employees ?? 0));
  return (
    <>
      <PageHero
        label="About the Group"
        title={["Seven businesses.", "One *standard.*"]}
        intro={`Established in ${site.established}, Afwajh is a diversified business group serving customers, clients and communities across the United Arab Emirates.`}
        image={{ src: "/images/home/dubai-marina-morning.webp", alt: "Dubai Marina towers in soft morning light", illustrative: true }}
        crumbs={[{ label: "About" }]}
      />

      {/* Introduction */}
      <section className="tone-light relative overflow-hidden bg-ivory py-28 md:py-40" aria-labelledby="who">
        <Mark id="about" className="pointer-events-none absolute -right-20 top-24 w-[420px] opacity-[0.06] md:w-[620px]" />
        <div className="wrap relative grid-12 gap-y-12">
          <div className="col-span-12 lg:col-span-6">
            <Kicker index="01" tone="light">
              Who we are
            </Kicker>
            <h2 id="who" className="t-h2 mt-8" data-split>
              <Rich text={"Quality products,\n*reliable* service"} />
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8 lg:pt-16">
            <p className="t-lead text-ink/85" data-reveal>
              {intro.split(". ")[0]}.
            </p>
            <p className="mt-6 text-ink/70" data-reveal>
              {intro.split(". ").slice(1).join(". ")}
            </p>
          </div>
        </div>
        <dl className="wrap mt-24 grid grid-cols-2 border-t border-line-light md:grid-cols-5">
          {keyStats.map((s, i) => (
            <div key={s.label} className={`flex flex-col-reverse border-b border-line-light py-8 md:border-b-0 ${i > 0 ? "md:border-l md:pl-6" : ""} ${i % 2 === 1 ? "border-l pl-5 md:pl-6" : ""}`} data-reveal>
              <dt className="t-label mt-3 text-ink/65">{s.label}</dt>
              <dd className="t-num text-[clamp(2.75rem,2rem+2.5vw,4.75rem)] leading-none">
                <Counter stat={s} />
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Owner's message */}
      <section id="owner-message" className="grain relative scroll-mt-20 overflow-hidden bg-emerald py-28 text-ivory md:py-44" aria-labelledby="owner-title">
        <Mark id="owner-letter" className="pointer-events-none absolute -right-40 top-32 w-[620px] opacity-[0.04] md:w-[1000px]" />
        <div className="wrap relative">
          <Kicker index="02">A message from our owner</Kicker>
          <h2 id="owner-title" className="t-h1 mt-10 max-w-[13ch]">
            <ScrollWords text={ownerMessage.headline} />
          </h2>

          <figure className="grid-12 mt-24 items-center gap-y-20 md:mt-36">
            <div className="col-span-12 mx-auto w-[80%] max-w-[420px] lg:col-span-4 lg:col-start-2 lg:mx-0 lg:w-full lg:max-w-none">
              <OwnerPortrait sizes="(min-width: 1024px) 33vw, 80vw" />
            </div>
            <div className="col-span-12 lg:col-span-5 lg:col-start-7">
              <blockquote>
                {ownerMessage.paragraphs.map((p, i) => (
                  <p
                    key={p.slice(0, 24)}
                    className={
                      i === 0
                        ? "t-lead text-ivory/90 first-letter:float-left first-letter:pr-3 first-letter:pt-2 first-letter:font-serif first-letter:text-[4.6em] first-letter:italic first-letter:leading-[0.72] first-letter:text-gold-light"
                        : "mt-7 text-ivory/70"
                    }
                    data-reveal
                    data-delay={String(i * 0.08)}
                  >
                    {p}
                  </p>
                ))}
              </blockquote>
              <figcaption className="mt-14" data-reveal>
                <span className="hairline block" aria-hidden="true" />
                <span className="t-h3 mt-8 block">{ownerMessage.signature}</span>
                <span className="t-label mt-3 block text-ivory/60">{ownerMessage.signatureTitle}</span>
              </figcaption>
            </div>
          </figure>
        </div>
      </section>

      {/* Milestones */}
      <section className="grain bg-emerald-deep py-28 text-ivory md:py-36" aria-labelledby="journey">
        <div className="wrap">
          <Kicker index="03">Our journey</Kicker>
          <h2 id="journey" className="t-h2 mt-8" data-split>
            <Rich text={"Milestones"} />
          </h2>
          <ol className="mt-16 grid gap-px border-y border-line-dark bg-line-dark md:grid-cols-4">
            {milestones.map((m, i) => (
              <li key={m.year} className="bg-emerald-deep px-1 py-10 md:px-8" data-reveal data-delay={String(i * 0.08)}>
                <p className="t-num text-gold text-6xl md:text-7xl">{m.year}</p>
                <p className="mt-6 text-ivory/70">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <VisionMission index="04" />
      <Strengths index="05" />

      {/* Team strength */}
      <section className="grain bg-emerald py-28 text-ivory md:py-36" aria-labelledby="team">
        <div className="wrap grid-12 gap-y-14">
          <div className="col-span-12 lg:col-span-4">
            <Kicker index="06">Our team strength</Kicker>
            <h2 id="team" className="t-h2 mt-8" data-split>
              <Rich text={"678+ *people*"} />
            </h2>
            <p className="mt-8 text-ivory/70" data-reveal>
              {workforceCopy}
            </p>
          </div>
          <ul className="col-span-12 lg:col-span-7 lg:col-start-6">
            {workforce.map((w, i) => (
              <li key={w.name} className="border-t border-line-dark py-5 last:border-b" data-reveal data-delay={String(i * 0.04)}>
                <TLink href={w.href} className="group block">
                  <span className="flex items-baseline justify-between gap-6">
                    <span className="text-[16px] text-ivory/85 group-hover:text-gold-light">{w.name}</span>
                    <span className="t-num text-3xl">{w.employees ?? <span className="text-[14px] text-ivory/50">To be confirmed</span>}</span>
                  </span>
                  {w.employees !== null && (
                    <span className="mt-3 block h-[3px] bg-line-dark">
                      <span className="bg-gold block h-full" style={{ width: `${(w.employees / max) * 100}%` }} />
                    </span>
                  )}
                </TLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Portfolio */}
      <section className="tone-light bg-ivory py-28 md:py-36" aria-labelledby="portfolio">
        <div className="wrap">
          <Kicker index="07" tone="light">
            Our portfolio
          </Kicker>
          <h2 id="portfolio" className="t-h2 mt-8" data-split>
            <Rich text={"The Afwajh *family*"} />
          </h2>
          <ul className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {businesses.map((b) => (
              <li key={b.slug} data-reveal style={{ ["--accent" as string]: b.accent }}>
                <TLink href={b.href} className="group block">
                  <Media image={b.hero} className="aspect-[4/3]" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" reveal={false} cursor="Explore" />
                  <span className="t-label mt-5 flex items-center gap-3 text-ink/65">
                    <span className="text-[var(--accent)]">{b.index}</span> {b.label}
                  </span>
                  <span className="t-h4 mt-2 flex items-center justify-between gap-4">
                    {b.name}
                    <Icon name="arrowUpRight" size={20} className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </TLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
