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
    <section className="grain relative overflow-hidden bg-emerald pb-20 text-ivory md:py-36" aria-label="A message from our owner">
      {/* On phones this follows the business index (same green), so a hairline marks the break. */}
      <div className="wrap relative md:hidden">
        <div className="mb-14 border-t border-line-dark" />
      </div>
      <Mark id="owner-quote" className="pointer-events-none absolute -left-32 top-1/2 w-[560px] -translate-y-1/2 opacity-[0.04] md:w-[820px]" />
      <div className="wrap relative grid-12 items-center gap-y-16">
        {/* Title above the portrait, name below it. */}
        <figure className="col-span-12 mx-auto w-[62%] max-w-[260px] lg:col-span-3 lg:col-start-2 lg:mx-0 lg:w-full lg:max-w-none">
          {/* One line: "Owner · Afwajh Group of Companies". Wider than the photo on phones so it never wraps. */}
          <p
            className="t-label -mx-[30%] mb-7 whitespace-nowrap text-center text-[11px] tracking-[0.1em] text-gold-light/80 sm:text-[12px] sm:tracking-[0.16em] lg:mx-0 lg:whitespace-normal"
            data-reveal
          >
            {ownerMessage.signatureTitle.replace(", ", " · ")}
          </p>
          <OwnerPortrait sizes="(min-width: 1024px) 25vw, 50vw" />
          <figcaption className="mt-7 text-center md:mt-10" data-reveal>
            <span className="t-h4 block">{ownerMessage.signature}</span>
          </figcaption>
        </figure>
        <div className="col-span-12 lg:col-span-7 lg:col-start-6">
          <Kicker>A message from our owner</Kicker>
          <blockquote className="t-h2 mt-8">
            <ScrollWords text={ownerMessage.quote} />
          </blockquote>
          <div className="mt-12 border-t border-line-dark pt-8" data-reveal>
            <TLink
              href="/about#owner-message"
              className="inline-flex min-h-12 items-center gap-3 rounded-full border border-gold/60 px-6 text-[15px] text-gold-light transition-colors hover:bg-gold-light hover:text-emerald-deep"
            >
              Read the full message <Icon name="arrowUpRight" size={18} />
            </TLink>
          </div>
        </div>
      </div>
    </section>
  );
}
