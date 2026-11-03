import Image from "next/image";
import Marquee from "@/components/ui/Marquee";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { contractors, developers } from "@/data/clients";

export default function ClientMarquee() {
  return (
    <section className="on-light overflow-hidden border-t border-emerald-900/10 bg-ivory pb-24 pt-20 text-ink md:pb-32" aria-labelledby="clients-title">
      <div className="container-x mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <Reveal>
          <p className="eyebrow mb-4 text-emerald-700">09 · Trusted by</p>
          <h2 id="clients-title" className="display-sm max-w-xl text-emerald-900">
            Our esteemed <span className="italic text-gold-deep">clients</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Button href="/clients" variant="dark">
            All clients
          </Button>
        </Reveal>
      </div>
      <Marquee duration={45}>
        {developers.map((c) => (
          <div key={c.name} className="mx-6 flex h-24 w-44 shrink-0 items-center justify-center md:mx-10 md:w-52">
            <Image
              src={c.logo!}
              alt={c.name}
              width={200}
              height={90}
              className="max-h-16 w-auto object-contain opacity-70 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0"
            />
          </div>
        ))}
      </Marquee>
      <Marquee duration={55} reverse className="mt-8">
        {contractors.map((c) => (
          <span key={c.name} className="mx-6 flex shrink-0 items-center gap-6 font-serif text-2xl text-emerald-900/70 md:text-3xl">
            {c.name}
            <span className="h-1.5 w-1.5 rotate-45 bg-gold-deep" aria-hidden="true" />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
