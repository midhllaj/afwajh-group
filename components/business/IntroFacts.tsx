import Kicker from "@/components/ui/Kicker";
import Rich from "@/components/ui/Rich";
import Counter from "@/components/ui/Counter";
import Media from "@/components/ui/Media";
import MediaSwitcher from "@/components/ui/MediaSwitcher";
import type { Business, Img } from "@/data/types";
import { cn } from "@/lib/utils";

const factColumns: Record<number, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
};

/** "Introduction + key facts" block of the business template. */
export default function IntroFacts({
  business: b,
  title,
  paragraphs,
  image,
  moreImages,
  extra,
  factsBelow,
}: {
  business: Business;
  title: string;
  paragraphs: string[];
  image?: Img;
  /** Extra photos: turns the intro image into a slider with a next arrow. */
  moreImages?: Img[];
  extra?: React.ReactNode;
  /** Full-width row of facts below the columns, for pages whose text column is already as tall as the photo. */
  factsBelow?: boolean;
}) {
  const slider = (aspect: string, sizes: string) =>
    image &&
    moreImages && (
      <MediaSwitcher
        label="Next store photo"
        slides={[image, ...moreImages].map((img, n) => (
          <Media key={img.src} image={img} className={aspect} sizes={sizes} reveal={n === 0} />
        ))}
      />
    );

  // A row of facts never ends in an empty cell, whether it sits beside the photo or below it.
  const count = b.facts.length;
  const desktopColumns = factsBelow ? count : count % 2 === 0 ? 2 : count;
  const facts = (
    <dl className={cn("grid grid-cols-2 border-t border-line-light", factColumns[desktopColumns], factsBelow ? "col-span-12" : "mt-14")}>
      {b.facts.map((f, i) => (
        <div
          key={f.label}
          className={cn(
            "flex flex-col-reverse justify-end border-b border-line-light py-7 lg:pr-2",
            i % 2 === 1 ? "border-l pl-6" : "pr-6",
            i % desktopColumns > 0 && "lg:border-l lg:pl-4 xl:pl-8",
            i === count - 1 && i % 2 === 0 && "col-span-2 lg:col-span-1",
          )}
          data-reveal
          data-delay={String(i * 0.06)}
        >
          <dt className="t-label mt-3 text-ink/65">{f.label}</dt>
          <dd className="t-num text-[clamp(2.6rem,2rem+2vw,4.25rem)] leading-none">
            <Counter stat={f} />
          </dd>
        </div>
      ))}
    </dl>
  );

  return (
    <section className="tone-light bg-ivory py-20 md:py-40" aria-labelledby="intro">
      <div className="wrap grid-12 gap-y-14">
        <div className="col-span-12 lg:col-span-6 lg:flex lg:flex-col">
          <Kicker index="01" tone="light" accent>
            Introduction
          </Kicker>
          <h2 id="intro" className="t-h2 mt-8" data-split>
            <Rich text={title} />
          </h2>
          {moreImages ? (
            <div className="mt-14 hidden lg:block">{slider("aspect-[5/4]", "45vw")}</div>
          ) : (
            image && <Media image={image} className="mt-14 hidden aspect-[5/4] lg:block lg:grow" sizes="45vw" parallax={6} />
          )}
        </div>
        <div className="col-span-12 lg:col-span-5 lg:col-start-8 lg:flex lg:flex-col lg:justify-between lg:pt-24">
          <div>
            {paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? "t-lead text-ink/85" : "mt-6 text-ink/70"} data-reveal data-delay={String(i * 0.08)}>
                {p}
              </p>
            ))}
          </div>
          <div>
            {extra}
            {!factsBelow && facts}
          </div>
        </div>
        {factsBelow && facts}
        {moreImages ? (
          <div className="col-span-12 lg:hidden">{slider("aspect-[4/3]", "100vw")}</div>
        ) : (
          image && <Media image={image} className="col-span-12 aspect-[4/3] lg:hidden" sizes="100vw" />
        )}
      </div>
    </section>
  );
}
