import TLink from "@/components/ui/TLink";
import Icon from "@/components/ui/Icon";
import Kicker from "@/components/ui/Kicker";
import Rich from "@/components/ui/Rich";
import Media from "@/components/ui/Media";
import IndexFloater from "./IndexFloater";
import { businesses } from "@/data/businesses";

/**
 * Award-style index of the seven businesses. Desktop: big numbered rows with a
 * floating image that follows the cursor. Mobile: tall image cards with parallax.
 */
export default function BusinessIndex() {
  return (
    <section id="businesses" className="grain relative scroll-mt-10 bg-emerald py-20 text-ivory md:py-40" aria-labelledby="businesses-title">
      <div className="wrap">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <div>
            <Kicker index="01">Our Businesses</Kicker>
            <h2 id="businesses-title" className="t-h2 mt-8 max-w-[14ch]" data-split>
              <Rich text={"Seven businesses,\none *standard*"} />
            </h2>
          </div>
          <p className="max-w-sm text-ivory/65" data-reveal>
            From neighbourhood supermarkets to heavy machinery — choose a business to explore it in depth.
          </p>
        </div>

        {/* Desktop rows */}
        <ul className="biz-rows mt-20 hidden border-b border-line-dark lg:block">
          {businesses.map((b, i) => (
            <li key={b.slug} className="border-t border-line-dark" data-reveal data-delay={String(i * 0.04)}>
              <TLink
                href={b.href}
                data-floater={i}
                className="group grid grid-cols-[6rem_1fr_16rem_3rem] items-center gap-6 py-7"
                style={{ ["--accent" as string]: b.accent }}
              >
                <span className="t-num text-2xl text-ivory/55 transition-colors duration-500 group-hover:text-[var(--accent)] group-focus-visible:text-[var(--accent)]">
                  {b.index}
                </span>
                <span className="biz-name t-h2 text-[clamp(2.5rem,1rem+3.2vw,5rem)] transition-[transform,opacity] duration-700 ease-[var(--ease-expo)] group-hover:translate-x-4">
                  {b.shortName}
                </span>
                <span className="t-label text-ivory/55">{b.label}</span>
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line-dark transition-colors duration-500 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-emerald-deep">
                  <Icon name="arrowUpRight" size={20} />
                </span>
              </TLink>
            </li>
          ))}
        </ul>
        <IndexFloater images={businesses.map((b) => b.hero.src)} />

        {/* Mobile cards */}
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:hidden">
          {businesses.map((b) => (
            <li key={b.slug} data-reveal>
              <TLink href={b.href} className="group relative block overflow-hidden" style={{ ["--accent" as string]: b.accent }}>
                <Media image={b.hero} className="aspect-[4/5]" sizes="(min-width: 640px) 50vw, 100vw" parallax={8} reveal={false} />
                <span className="absolute inset-0 z-[2] flex flex-col justify-between bg-[linear-gradient(180deg,rgba(10,35,33,.75)_0%,rgba(10,35,33,.1)_30%,rgba(10,35,33,.25)_50%,rgba(10,35,33,.95)_100%)] p-6">
                  <span className="t-label flex items-center justify-between">
                    <span className="text-[var(--accent)]">{b.index} / 07</span>
                    <span className="text-ivory/70">{b.label}</span>
                  </span>
                  <span>
                    <span className="t-h3 block">{b.name}</span>
                    <span className="mt-2 block text-[15px] text-ivory/75">{b.summary}</span>
                    <span className="mt-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)] text-emerald-deep transition-transform group-active:scale-95">
                      <Icon name="arrowUpRight" size={20} />
                    </span>
                  </span>
                </span>
              </TLink>
            </li>
          ))}
        </ul>
      </div>
      <style>{`.biz-rows:hover .biz-name { opacity: .35 } .biz-rows li:hover .biz-name { opacity: 1 }`}</style>
    </section>
  );
}
