import Image from "next/image";
import TLink from "@/components/ui/TLink";
import Icon from "@/components/ui/Icon";
import { imageMeta } from "@/components/ui/Media";
import NextBusinessLink from "./NextBusinessLink";
import { neighbours } from "@/data/businesses";

/**
 * Large "Next business →" band closing every business page. Clicking grows the
 * image to full screen and it becomes the next page's hero (shared-element feel).
 * Business 7 loops back to business 1.
 */
export default function NextBusiness({ slug }: { slug: string }) {
  const { prev, next } = neighbours(slug);
  const m = imageMeta(next.hero.src);
  return (
    <section className="relative bg-emerald-deep text-ivory" aria-label="Continue to the next business">
      <NextBusinessLink href={next.href} className="group relative block h-[78svh] min-h-[520px] overflow-hidden" accent={next.accent}>
        <span className="next-img absolute inset-0 block transition-transform duration-[1.6s] ease-[var(--ease-expo)] group-hover:scale-[1.04]">
          <Image
            src={next.hero.src}
            alt={next.hero.alt}
            fill
            sizes="100vw"
            quality={80}
            placeholder={m ? "blur" : "empty"}
            blurDataURL={m?.blur}
            className="object-cover [filter:saturate(.88)_contrast(1.06)_brightness(.97)]"
          />
        </span>
        <span className="absolute inset-0 bg-gradient-to-t from-emerald-deep via-emerald-deep/30 to-emerald-deep/50" />
        <span className="wrap relative flex h-full flex-col justify-end pb-16 md:pb-20">
          <span className="t-label flex items-center gap-4 text-ivory/75" data-reveal>
            Next business
            <span className="h-px w-10 bg-[var(--accent)]" aria-hidden="true" />
            <span className="text-[var(--accent)]">{next.index} / 07</span>
          </span>
          <span className="mt-6 flex items-end justify-between gap-8">
            <span className="t-h1 block max-w-[14ch] transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-3" data-split>
              {next.name}
            </span>
            <span className="mb-3 hidden h-24 w-24 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-emerald-deep transition-transform duration-700 ease-[var(--ease-expo)] group-hover:rotate-[-45deg] md:flex">
              <Icon name="arrow" size={32} />
            </span>
          </span>
          <span className="mt-4 block max-w-lg text-ivory/75">{next.summary}</span>
        </span>
      </NextBusinessLink>
      <nav aria-label="Business navigation" className="wrap flex flex-wrap items-center justify-between gap-4 border-t border-line-dark py-6 text-[15px]">
        <TLink href={prev.href} className="group flex min-h-11 items-center gap-3 text-ivory/70 hover:text-gold-light">
          <Icon name="arrowLeft" size={18} className="transition-transform group-hover:-translate-x-1" />
          <span>
            <span className="t-label mr-2 text-ivory/60">Previous</span>
            {prev.shortName}
          </span>
        </TLink>
        <TLink href="/businesses" className="t-label flex min-h-11 items-center gap-2 text-ivory/70 hover:text-gold-light">
          All businesses
        </TLink>
      </nav>
    </section>
  );
}
