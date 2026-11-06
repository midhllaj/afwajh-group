import Image from "next/image";
import { useId } from "react";
import { Mark } from "@/components/brand/Logo";
import { ownerMessage } from "@/data/site";
import { cn } from "@/lib/utils";

/** Slowly turning gold seal: "Afwajh Group · Since 2010" around the triangle mark. */
function Seal({ className }: { className?: string }) {
  const id = useId();
  return (
    <div className={cn("aspect-square rounded-full bg-emerald-deep shadow-2xl ring-1 ring-gold/50", className)} aria-hidden="true">
      <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full motion-safe:animate-[spin_28s_linear_infinite]">
        <defs>
          <path id={id} d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" />
        </defs>
        <text className="fill-gold-light font-sans text-[10px] font-medium uppercase">
          <textPath href={`#${id}`} textLength="284">
            Afwajh Group · Since 2010 ·
          </textPath>
        </text>
      </svg>
      <Mark id={`${id}-mark`} className="absolute inset-[32%]" />
    </div>
  );
}

/**
 * The owner's portrait inside an arch. The photo has a white background, so multiplying it
 * over the warm panel removes the background and leaves him standing in the arch.
 */
export default function OwnerPortrait({ className, sizes = "420px" }: { className?: string; sizes?: string }) {
  return (
    <div className={cn("relative w-full", className)}>
      <div className="absolute -inset-x-3 -bottom-3 -top-3 rounded-t-full border border-gold/45 md:-inset-x-5 md:-bottom-5 md:-top-5" data-parallax="2" aria-hidden="true" />
      <div className="relative isolate aspect-[3/4] overflow-hidden rounded-t-full bg-[linear-gradient(180deg,var(--color-ivory)_0%,var(--color-ivory-deep)_100%)]" data-clip>
        <Image
          src={ownerMessage.photo.src}
          alt={ownerMessage.photo.alt}
          width={410}
          height={552}
          sizes={sizes}
          quality={80}
          className="absolute inset-x-0 bottom-0 h-[92%] w-full object-cover object-top mix-blend-multiply"
        />
      </div>
      <Seal className="absolute -bottom-4 -right-3 w-[30%] md:-right-8" />
    </div>
  );
}
