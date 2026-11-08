import type { Metadata } from "next";
import BusinessPage from "@/components/business/BusinessPage";
import BusinessHero from "@/components/business/BusinessHero";
import IntroFacts from "@/components/business/IntroFacts";
import SectionHead from "@/components/business/SectionHead";
import Gallery from "@/components/business/Gallery";
import BusinessContact from "@/components/business/BusinessContact";
import Media from "@/components/ui/Media";
import Icon from "@/components/ui/Icon";
import { businessBySlug } from "@/data/businesses";
import { technical, technicalServices } from "@/data/divisions";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

const b = businessBySlug("technical-services");

export const metadata: Metadata = pageMetadata({
  title: b.name,
  description:
    "Licensed technical services in Dubai: glass & aluminium, steel, false ceilings and partitions, tiling, carpentry and wood flooring, kitchens, swimming pools, parking systems and more.",
  path: b.href,
});

export default function Page() {
  return (
    <BusinessPage business={b}>
      <BusinessHero business={b} title={["Technical", "*Services*"]} />

      <IntroFacts
        business={b}
        title={"Craft, precision\nand *care*"}
        paragraphs={[technical.intro, "From structural steel and glazing to the finishing touches of tiling, joinery and kitchens, we coordinate the trades that turn a structure into a finished, working space."]}
        image={{ src: "/images/technical/carpentry-workshop.webp", alt: "Carpenter in a white cap working on a large timber board in a workshop", illustrative: true }}
        extra={
          <p className="mt-10 flex items-center gap-3 border-t border-line-light pt-6 text-[14px] text-ink/60" data-reveal>
            <Icon name="seal" size={22} className="shrink-0 text-[var(--accent)]" />
            Licensed by Dubai’s {technical.licence.authority}.
          </p>
        }
      />

      {/* What we offer: premium image grid */}
      <section className="grain bg-emerald-deep py-20 text-ivory md:py-36" aria-labelledby="services-title">
        <div className="wrap">
          <SectionHead index="02" label="Ten licensed activities" title={"One team,\n*every* finish"} intro="Installation, fit-out and maintenance across residential, commercial and specialist projects." tone="dark" id="services-title" />
          <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {technicalServices.map((s, i) => (
              <li key={s.title} className={cn("group relative", i < 2 ? "lg:col-span-3" : i < 5 ? "lg:col-span-2" : i < 7 ? "lg:col-span-3" : "lg:col-span-2")} data-reveal data-delay={String((i % 3) * 0.05)}>
                <Media image={s.image} className={i < 2 || (i > 4 && i < 7) ? "aspect-[4/5] lg:aspect-[16/10]" : "aspect-[4/5]"} sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw" reveal={false} />
                <div className="absolute inset-0 z-[2] flex flex-col justify-end bg-gradient-to-t from-emerald-deep/95 via-emerald-deep/40 to-transparent p-6 md:p-7">
                  <div className="flex items-center gap-3">
                    <span className="t-label text-[var(--accent)]">{String(i + 1).padStart(2, "0")}</span>
                    <Icon name={s.icon} size={22} className="text-ivory/80" />
                  </div>
                  <h3 className="t-h4 mt-3">{s.title}</h3>
                  <p className="mt-2 max-h-0 overflow-hidden text-[14px] leading-relaxed text-ivory/75 opacity-0 transition-all duration-700 ease-[var(--ease-expo)] group-hover:max-h-40 group-hover:opacity-100 group-focus-within:max-h-40 group-focus-within:opacity-100 max-lg:max-h-40 max-lg:opacity-100">
                    {s.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[13px] text-ivory/60">Illustrative imagery.</p>
        </div>
      </section>

      <Gallery
        images={technicalServices.slice(0, 6).map((s) => s.image)}
        index="03"
        title={"Spaces finished to\na *higher* standard"}
        intro="Illustrative imagery of the kinds of work we deliver."
        tone="light"
      />

      <BusinessContact business={b} index="04" title={"Request a site visit\nor *quotation*"} />

      {/* Trust line (licence details kept deliberately small) */}
      <div className="border-t border-line-dark bg-emerald">
        <p className="wrap py-5 text-[12px] text-ivory/55">
          {technical.licence.type} · {technical.licence.category} · Licence No. {technical.licence.number} · Valid until {technical.licence.expires}
        </p>
      </div>
    </BusinessPage>
  );
}
