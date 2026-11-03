import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal, { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import Photo from "@/components/ui/Photo";
import Counter from "@/components/ui/Counter";
import TLink from "@/components/ui/TLink";
import Icon from "@/components/ui/Icon";
import Skyline from "@/components/ui/Skyline";
import VisionMission from "@/components/home/VisionMission";
import CoreStrengths from "@/components/home/CoreStrengths";
import Workforce from "@/components/home/Workforce";
import ContactCTA from "@/components/home/ContactCTA";
import { businesses } from "@/data/businesses";
import { intro, keyStats, site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About the Group",
  description:
    "Established in 2010, Afwajh Group of Companies operates across retail, hospitality, catering, general trading, transport, technical services and labour supply in the UAE.",
  path: "/about",
  image: "/images/brand/dubai-skyline-burj.webp",
});

const milestones = [
  { year: "2008", text: "FHM General Transport is established, building its heavy machinery and transport capability." },
  { year: "2010", text: "Afwajh Group of Companies is established in the United Arab Emirates." },
  { year: "2016", text: "Afwajh Catering Services begins operating from Business Bay, Dubai." },
  { year: "2026", text: "Afwajh Technical Services is licensed by Dubai’s Department of Economy & Tourism." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the Group"
        title={"Seven businesses.\nOne *standard.*"}
        intro={`Established in ${site.established}, Afwajh is a diversified business group serving communities across the United Arab Emirates.`}
        image={{ src: "/images/brand/dubai-skyline-burj.webp", alt: "Burj Khalifa and the Downtown Dubai skyline under dramatic clouds", illustrative: true }}
        breadcrumb={[{ label: "About the Group" }]}
      />

      <section className="on-light relative overflow-hidden bg-ivory py-24 text-ink md:py-32">
        <Skyline className="absolute inset-x-0 bottom-0 h-40 text-emerald-900/[0.07] md:h-56" />
        <div className="container-x relative grid-12 gap-y-14">
          <div className="col-span-12 lg:col-span-5">
            <SectionHeader index="01" eyebrow="Introduction" title={"Who *we* are"} tone="light" />
            <Reveal className="mt-10">
              <Image src="/images/logos/afwajh-logo-dark.png" alt="Afwajh Group of Company logo" width={900} height={717} className="h-auto w-48" />
            </Reveal>
          </div>
          <Reveal className="col-span-12 lg:col-span-6 lg:col-start-7">
            <p className="font-serif text-[1.55rem] leading-snug text-emerald-900 md:text-[2rem]">{intro.split(". ")[0]}.</p>
            <p className="lead mt-8 text-ink/75">{intro.split(". ").slice(1).join(". ")}</p>
          </Reveal>
        </div>
        <RevealGroup as="dl" className="container-x relative mt-20 grid grid-cols-2 gap-px bg-emerald-900/15 md:grid-cols-3 xl:grid-cols-6">
          {keyStats.map((s) => (
            <RevealItem key={s.label} className="bg-ivory px-1 py-8 sm:px-5">
              <dt className="order-2 text-sm text-muted">{s.label}</dt>
              <dd className="font-serif text-5xl leading-none text-emerald-900">
                <Counter value={s.value} suffix={s.suffix} />
              </dd>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Timeline */}
      <section className="grain bg-emerald-800 py-24 md:py-32">
        <div className="container-x">
          <SectionHeader index="02" eyebrow="Our journey" title={"Milestones"} />
          <RevealGroup as="ol" className="mt-16 grid gap-px bg-ivory/10 md:grid-cols-4">
            {milestones.map((m) => (
              <RevealItem as="li" key={m.year} className="bg-emerald-800 p-7 md:p-8">
                <p className="text-gold-gradient font-serif text-6xl md:text-7xl">{m.year}</p>
                <p className="mt-6 leading-relaxed text-ivory/75">{m.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <VisionMission />
      <CoreStrengths />

      {/* Businesses grid */}
      <section className="grain bg-emerald-900 py-24 md:py-32">
        <div className="container-x">
          <SectionHeader index="03" eyebrow="Our portfolio" title={"The Afwajh *family*"} />
          <RevealGroup as="ul" className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {businesses.map((b, i) => (
              <RevealItem as="li" key={b.slug} className={i < 2 ? "lg:col-span-1" : ""}>
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
        </div>
      </section>

      <Workforce />
      <ContactCTA />
    </>
  );
}
