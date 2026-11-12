import Image from "next/image";
import Marquee from "@/components/ui/Marquee";
import Kicker from "@/components/ui/Kicker";
import Button from "@/components/ui/Button";
import { contractors, developers } from "@/data/clients";
import { imageMeta } from "@/components/ui/Media";

export default function ClientMarquee({ index = "05" }: { index?: string }) {
  // Follows the cream Strengths section: on phones its last row's line is the divider, so no extra top padding or border.
  return (
    <section className="tone-light overflow-hidden bg-ivory pb-20 md:border-t md:border-line-light md:pb-32 md:pt-20" aria-labelledby="clients-title">
      <div className="wrap mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <Kicker index={index} tone="light">
            Trusted by
          </Kicker>
          <h2 id="clients-title" className="t-h3 mt-6 max-w-xl">
            Developers, government entities and contractors across the UAE.
          </h2>
        </div>
        <Button href="/clients" variant="outline-dark">
          All clients
        </Button>
      </div>
      <Marquee duration={50}>
        {developers.map((c) => {
          const m = imageMeta(c.logo!);
          return (
            <div key={c.name} className="mx-8 flex h-24 w-44 shrink-0 items-center justify-center md:mx-12">
              <Image
                src={c.logo!}
                alt={c.name}
                width={m?.w ?? 240}
                height={m?.h ?? 100}
                className="max-h-14 w-auto object-contain opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0"
              />
            </div>
          );
        })}
      </Marquee>
      <Marquee duration={60} reverse className="mt-6 border-t border-line-light pt-6">
        {contractors.map((c) => (
          <span key={c.name} className="t-h4 mx-6 flex shrink-0 items-center gap-6 text-ink/60">
            {c.name}
            <span className="h-1.5 w-1.5 rotate-45 bg-gold" aria-hidden="true" />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
