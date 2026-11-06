import Kicker from "@/components/ui/Kicker";
import ScrollWords from "@/components/ui/ScrollWords";
import TLink from "@/components/ui/TLink";
import Icon from "@/components/ui/Icon";
import OwnerPortrait from "@/components/owner/OwnerPortrait";
import { Mark } from "@/components/brand/Logo";
import { ownerMessage } from "@/data/site";

/** The owner's statement on the home page, linking to the full letter on the About page. */
export default function OwnerQuote() {
  return (
    <section className="grain relative overflow-hidden bg-emerald py-24 text-ivory md:py-36" aria-label="A message from our owner">
      <Mark id="owner-quote" className="pointer-events-none absolute -left-32 top-1/2 w-[560px] -translate-y-1/2 opacity-[0.04] md:w-[820px]" />
      <figure className="wrap relative grid-12 items-center gap-y-16">
        <div className="col-span-12 mx-auto w-[80%] max-w-[360px] lg:col-span-3 lg:col-start-2 lg:mx-0 lg:w-full lg:max-w-none">
          <OwnerPortrait sizes="(min-width: 1024px) 25vw, 60vw" />
        </div>
        <div className="col-span-12 lg:col-span-7 lg:col-start-6">
          <Kicker>A message from our owner</Kicker>
          <blockquote className="t-h2 mt-8">
            <ScrollWords text={ownerMessage.quote} />
          </blockquote>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-8 border-t border-line-dark pt-8" data-reveal>
            <figcaption>
              <span className="t-h4 block">{ownerMessage.signature}</span>
              <span className="t-label mt-2 block text-ivory/60">{ownerMessage.signatureTitle}</span>
            </figcaption>
            <TLink
              href="/about#owner-message"
              className="inline-flex min-h-12 items-center gap-3 rounded-full border border-gold/60 px-6 text-[15px] text-gold-light transition-colors hover:bg-gold-light hover:text-emerald-deep"
            >
              Read the full message <Icon name="arrowUpRight" size={18} />
            </TLink>
          </div>
        </div>
      </figure>
    </section>
  );
}
