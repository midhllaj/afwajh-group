import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import Kicker from "@/components/ui/Kicker";
import Rich from "@/components/ui/Rich";
import Marquee from "@/components/ui/Marquee";
import { imageMeta } from "@/components/ui/Media";
import ContactCta from "@/components/home/ContactCta";
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
      <PageHero label="Our esteemed clients" title={["Trusted by the", "region’s *builders*"]} intro="Developers, government entities and contractors who rely on Afwajh for retail, catering, transport and site services." crumbs={[{ label: "Clients" }]} short>
        <Marquee duration={44} className="-mx-[var(--gutter)]">
          {[...developers, ...contractors].map((c) => (
            <span key={c.name} className="t-h3 mx-6 flex shrink-0 items-center gap-6 text-ivory/55">
              {c.name}
              <span className="h-1.5 w-1.5 rotate-45 bg-gold" aria-hidden="true" />
            </span>
          ))}
        </Marquee>
      </PageHero>

      <section className="tone-light bg-ivory py-28 md:py-36" aria-labelledby="dev-title">
        <div className="wrap">
          <Kicker index="01" tone="light">
            Developers &amp; government
          </Kicker>
          <h2 id="dev-title" className="t-h2 mt-8" data-split>
            <Rich text={"Developers &\n*government*"} />
          </h2>
          <ul className="mt-16 grid grid-cols-2 gap-px border border-line-light bg-line-light sm:grid-cols-3 lg:grid-cols-4">
            {developers.map((c, i) => {
              const m = imageMeta(c.logo!);
              return (
                <li key={c.name} className="group relative flex aspect-[3/2] items-center justify-center bg-ivory p-8 transition-colors duration-500 hover:bg-white" data-reveal data-delay={String((i % 4) * 0.04)}>
                  <Image
                    src={c.logo!}
                    alt={`${c.name} logo`}
                    width={m?.w ?? 240}
                    height={m?.h ?? 100}
                    className="max-h-16 w-auto max-w-[78%] object-contain opacity-60 grayscale transition duration-500 group-hover:opacity-100 group-hover:grayscale-0 md:max-h-20"
                  />
                  <span className="t-label absolute inset-x-0 bottom-3 text-center text-[10px] text-ink/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100">{c.name}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="grain bg-emerald-deep py-28 text-ivory md:py-36" aria-labelledby="con-title">
        <div className="wrap grid-12 gap-y-14">
          <div className="col-span-12 lg:col-span-4">
            <Kicker index="02">Contractors</Kicker>
            <h2 id="con-title" className="t-h2 mt-8 text-[clamp(2.5rem,1.6rem+2.2vw,4rem)]" data-split>
              <Rich text={"Contracting\n*partners*"} />
            </h2>
          </div>
          <ul className="col-span-12 grid sm:grid-cols-2 lg:col-span-8">
            {contractors.map((c) => (
              <li key={c.name} className="t-h4 flex items-center gap-4 border-b border-line-dark py-5" data-reveal>
                <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" aria-hidden="true" />
                {c.name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="grain bg-emerald py-28 text-ivory md:py-36" aria-labelledby="cat-title">
        <div className="wrap grid-12 gap-y-14">
          <div className="col-span-12 lg:col-span-4">
            <Kicker index="03">Catering clients</Kicker>
            <h2 id="cat-title" className="t-h2 mt-8 text-[clamp(2.5rem,1.6rem+2.2vw,4rem)]" data-split>
              <Rich text={"Fed by\n*Afwajh*"} />
            </h2>
          </div>
          <ul className="col-span-12 grid sm:grid-cols-2 lg:col-span-8">
            {cateringClients.map((c) => (
              <li key={c.name} className="t-h4 flex items-center gap-4 border-b border-line-dark py-5" data-reveal>
                <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-[#EE9A24]" aria-hidden="true" />
                {c.name}
              </li>
            ))}
          </ul>
          <p className="col-span-12 text-[13px] text-ivory/60 lg:col-span-8 lg:col-start-5">
            Logos appear as shown in Afwajh’s company profiles; all trademarks belong to their respective owners.
          </p>
        </div>
      </section>

      <ContactCta title={"Join the companies\nthat *trust* Afwajh."} />
    </>
  );
}
