import Media from "@/components/ui/Media";
import Kicker from "@/components/ui/Kicker";
import Rich from "@/components/ui/Rich";
import Button from "@/components/ui/Button";
import Counter from "@/components/ui/Counter";
import type { Business, Img } from "@/data/types";
import { cn } from "@/lib/utils";

/** Large feature for one of the two main businesses. Desktop only: on phones the business index above already covers it. */
export default function Spotlight({
  business: b,
  title,
  body,
  secondary,
  flip = false,
}: {
  business: Business;
  title: string;
  body: string;
  secondary: Img;
  flip?: boolean;
}) {
  return (
    <section className="tone-light hidden overflow-hidden bg-ivory py-20 md:block md:py-36" style={{ ["--accent" as string]: b.accent }} aria-labelledby={`spot-${b.slug}`}>
      <div className="wrap grid-12 items-center gap-y-14">
        <div className={cn("relative col-span-12 lg:col-span-7", flip && "lg:order-2 lg:col-start-6")}>
          <Media image={b.hero} className="aspect-[4/5] sm:aspect-[5/4]" sizes="(min-width: 1024px) 58vw, 100vw" parallax={8} cursor="Explore" />
          <div className={cn("absolute -bottom-12 hidden w-[34%] border-8 border-ivory md:block", flip ? "-left-8" : "-right-8")}>
            <Media image={secondary} className="aspect-[3/4]" sizes="22vw" />
          </div>
        </div>
        <div className={cn("col-span-12 lg:col-span-4", flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-9")}>
          <Kicker index={b.index} tone="light" accent>
            Spotlight — {b.label}
          </Kicker>
          <h2 id={`spot-${b.slug}`} className="t-h2 mt-8 text-[clamp(2.5rem,1.5rem+3vw,5rem)]" data-split>
            <Rich text={title} />
          </h2>
          <p className="t-lead mt-8 text-ink/75" data-reveal>
            {body}
          </p>
          <dl className="mt-10 grid grid-cols-3 border-t border-line-light pt-6" data-reveal>
            {b.facts.slice(0, 3).map((f) => (
              <div key={f.label} className="flex flex-col-reverse justify-end">
                <dt className="t-label mt-3 text-ink/65">{f.label}</dt>
                <dd className="t-num text-4xl leading-none md:text-5xl">
                  <Counter stat={f} />
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-10" data-reveal>
            <Button href={b.href} variant="dark">
              Explore {b.shortName.toLowerCase()}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
