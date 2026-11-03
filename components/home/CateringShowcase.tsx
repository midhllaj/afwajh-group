import Image from "next/image";
import Photo from "@/components/ui/Photo";
import Reveal, { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import LineArt from "@/components/ui/LineArt";
import { catering, cateringServices } from "@/data/catering";

export default function CateringShowcase() {
  return (
    <section className="grain relative overflow-hidden bg-emerald-900 py-24 md:py-36">
      <div className="container-x">
        <div className="grid-12 gap-y-12">
          <div className="col-span-12 lg:col-span-6">
            <SectionHeader index="03" eyebrow="Afwajh Catering Services" title={"Memorable events,\n*authentic* delicacies"} intro={catering.intro} />
            <Reveal delay={0.2} className="mt-8 flex items-center gap-5">
              <Image src="/images/logos/catering-logo.png" alt="Afwajh Catering Services logo" width={120} height={103} className="h-16 w-auto rounded-sm bg-ivory p-2" />
              <p className="text-sm text-ivory/65">
                Operating from {catering.base} since {catering.since}
              </p>
            </Reveal>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <Reveal variant="clip" className="relative">
              <Photo image={catering.hero} className="aspect-[4/5]" sizes="(min-width: 1024px) 40vw, 100vw" hover view />
              <div className="absolute -bottom-10 -left-6 hidden w-44 rounded-full bg-emerald-900/0 md:block lg:-left-16">
                <LineArt name="cloche" accent="#EE9A24" />
              </div>
            </Reveal>
          </div>
        </div>

        <RevealGroup as="ul" className="mt-20 grid gap-px bg-ivory/10 sm:grid-cols-2 lg:grid-cols-5">
          {cateringServices.map((s) => (
            <RevealItem as="li" key={s.id} className="group relative flex flex-col gap-4 bg-emerald-900 p-6 transition-colors duration-500 hover:bg-emerald-800 lg:min-h-64">
              <span className="font-serif text-lg italic text-catering-orange">{s.index}</span>
              <h3 className="font-serif text-2xl leading-tight text-ivory">{s.title}</h3>
              <p className="text-sm leading-relaxed text-ivory/65">{s.lead}</p>
              <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-catering-orange transition-transform duration-700 group-hover:scale-x-100" />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-12">
          <Button href="/businesses/catering" variant="orange">
            Discover catering
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
