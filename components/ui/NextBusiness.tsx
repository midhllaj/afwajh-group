import Image from "next/image";
import TLink from "./TLink";
import Icon from "./Icon";
import { businesses } from "@/data/businesses";

/** Large "next business" link at the foot of each business page. */
export default function NextBusiness({ slug }: { slug: string }) {
  const i = businesses.findIndex((b) => b.slug === slug);
  const next = businesses[(i + 1) % businesses.length];
  return (
    <TLink href={next.href} className="group relative block overflow-hidden bg-emerald-950" data-cursor="view">
      <Image
        src={next.image.src}
        alt=""
        fill
        sizes="100vw"
        quality={70}
        className="object-cover opacity-30 transition-[transform,opacity] duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-105 group-hover:opacity-45"
      />
      <div className="container-x relative flex flex-col gap-4 py-20 md:flex-row md:items-end md:justify-between md:py-28">
        <div>
          <p className="eyebrow text-gold-light">Next business · {next.index}</p>
          <p className="display-md mt-4 text-ivory">{next.name}</p>
        </div>
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold-light/50 text-gold-light transition-colors group-hover:bg-gold-light group-hover:text-emerald-900 md:h-20 md:w-20">
          <Icon name="arrow" className="h-6 w-6" />
        </span>
      </div>
    </TLink>
  );
}
