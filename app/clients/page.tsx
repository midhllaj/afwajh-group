import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal, { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import Marquee from "@/components/ui/Marquee";
import ContactCTA from "@/components/home/ContactCTA";
import { cateringClients, contractors, developers } from "@/data/clients";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Our Clients",
  description:
    "Afwajh Group is trusted by leading UAE developers, government entities and contractors — Emaar, Meydan, Sobha, DAMAC, Nakheel, Azizi, ALEC, China State, Infosys and more.",
  path: "/clients",
});

export default function ClientsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our esteemed clients"
        title={"Trusted by the\nregion’s *builders*"}
        intro="Developers, government entities and contractors who rely on Afwajh for retail, catering, transport and site services."
        breadcrumb={[{ label: "Clients" }]}
        compact
      >
        <Marquee duration={40} className="-mx-5 mt-4 md:mx-0">
          {[...developers, ...contractors].map((c) => (
            <span key={c.name} className="mx-5 flex shrink-0 items-center gap-10 font-serif text-3xl italic text-ivory/40 md:text-5xl">
              {c.name}
              <span className="h-1.5 w-1.5 rotate-45 bg-gold-light" aria-hidden="true" />
            </span>
          ))}
        </Marquee>
      </PageHero>

      <section className="on-light bg-ivory py-24 text-ink md:py-32">
        <div className="container-x">
          <SectionHeader index="01" eyebrow="Developers & government" title={"Developers &\n*government*"} tone="light" />
          <RevealGroup as="ul" className="mt-16 grid grid-cols-2 gap-px border border-emerald-900/10 bg-emerald-900/10 sm:grid-cols-3 lg:grid-cols-4">
            {developers.map((c) => (
              <RevealItem as="li" key={c.name} className="group relative flex aspect-[3/2] flex-col items-center justify-center bg-ivory p-6 transition-colors duration-500 hover:bg-white">
                {c.logo ? (
                  <Image
                    src={c.logo}
                    alt={`${c.name} logo`}
                    width={240}
                    height={110}
                    className="max-h-16 w-auto max-w-[80%] object-contain opacity-75 grayscale transition duration-500 group-hover:opacity-100 group-hover:grayscale-0 md:max-h-20"
                  />
                ) : (
                  <span className="text-center font-serif text-2xl text-emerald-900">{c.name}</span>
                )}
                <span className="absolute bottom-3 left-0 right-0 text-center text-[11px] font-medium uppercase tracking-[0.14em] text-muted opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100">
                  {c.name}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="grain bg-emerald-800 py-24 md:py-32">
        <div className="container-x grid-12 gap-y-14">
          <div className="col-span-12 lg:col-span-4">
            <SectionHeader index="02" eyebrow="Contractors" title={"Contracting\n*partners*"} />
          </div>
          <RevealGroup as="ul" className="col-span-12 grid sm:grid-cols-2 lg:col-span-8">
            {contractors.map((c) => (
              <RevealItem as="li" key={c.name} className="flex items-center gap-4 border-b border-ivory/10 py-5">
                <span className="h-1.5 w-1.5 rotate-45 bg-gold-light" aria-hidden="true" />
                <span className="font-serif text-2xl text-ivory md:text-[1.75rem]">{c.name}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="grain bg-emerald-900 py-24 md:py-32">
        <div className="container-x grid-12 gap-y-14">
          <div className="col-span-12 lg:col-span-4">
            <SectionHeader index="03" eyebrow="Catering clients" title={"Fed by\n*Afwajh*"} />
          </div>
          <RevealGroup as="ul" className="col-span-12 grid sm:grid-cols-2 lg:col-span-8">
            {cateringClients.map((c) => (
              <RevealItem as="li" key={c.name} className="flex items-center gap-4 border-b border-ivory/10 py-5">
                <span className="h-1.5 w-1.5 rotate-45 bg-catering-orange" aria-hidden="true" />
                <span className="font-serif text-2xl text-ivory md:text-[1.75rem]">{c.name}</span>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="col-span-12 text-sm text-ivory/50 lg:col-span-8 lg:col-start-5">
            <p>Logos are shown where they appear in Afwajh’s company profiles; all trademarks belong to their respective owners.</p>
          </Reveal>
        </div>
      </section>

      <ContactCTA title={"Join the companies\nthat *trust* Afwajh."} />
    </>
  );
}
