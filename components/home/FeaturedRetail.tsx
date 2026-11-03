import Photo from "@/components/ui/Photo";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import LineArt from "@/components/ui/LineArt";
import Parallax from "@/components/ui/Parallax";
import { outlets, retailGallery, retailIntro } from "@/data/retail";
import { emirates } from "@/data/site";

export default function FeaturedRetail() {
  return (
    <section id="businesses" className="grain relative scroll-mt-20 overflow-hidden bg-emerald-800 py-24 md:py-36">
      <div className="container-x">
        <div className="grid-12 gap-y-12">
          <div className="col-span-12 lg:col-span-6">
            <SectionHeader index="01" eyebrow="Retail Division" title={"Supermarkets\n& *Minimarts*"} intro={retailIntro} size="lg" />
            <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-3">
              <Button href="/businesses/supermarkets">Explore all {outlets.length} outlets</Button>
            </Reveal>
          </div>
          <div className="relative col-span-12 hidden lg:col-span-4 lg:col-start-9 lg:block">
            <LineArt name="bag" className="ml-auto w-full max-w-[300px] opacity-90" />
          </div>
        </div>

        <div className="grid-12 mt-16 gap-y-4 md:mt-24">
          <Reveal variant="clip" className="col-span-12 md:col-span-7">
            <Parallax amount={40}>
              <Photo image={retailGallery[0]} className="aspect-[4/3]" sizes="(min-width: 768px) 58vw, 100vw" hover view />
            </Parallax>
          </Reveal>
          <div className="col-span-12 flex flex-col gap-4 md:col-span-5 md:pt-24">
            <Reveal variant="clip" delay={0.1}>
              <Photo image={retailGallery[1]} className="aspect-[4/3]" sizes="(min-width: 768px) 40vw, 100vw" hover view />
            </Reveal>
            <Reveal delay={0.2} className="border border-gold-light/20 p-6 md:p-8">
              <p className="eyebrow text-teal-light">Our retail locations</p>
              <ul className="mt-5 grid grid-cols-1 gap-x-6 gap-y-2.5 text-[0.95rem] text-ivory/85 sm:grid-cols-2">
                {outlets.map((o) => (
                  <li key={o.id} className="flex gap-2.5">
                    <span className="mt-2 h-1 w-1 shrink-0 rotate-45 bg-gold-light" aria-hidden="true" />
                    <span>
                      {o.name}
                      <span className="block text-xs text-ivory/55">{o.location}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs uppercase tracking-[0.18em] text-ivory/50">{emirates.join(" · ")}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
