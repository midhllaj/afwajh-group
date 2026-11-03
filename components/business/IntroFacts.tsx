import Kicker from "@/components/ui/Kicker";
import Rich from "@/components/ui/Rich";
import Counter from "@/components/ui/Counter";
import Media from "@/components/ui/Media";
import type { Business, Img } from "@/data/types";

/** "Introduction + key facts" block of the business template. */
export default function IntroFacts({
  business: b,
  title,
  paragraphs,
  image,
  extra,
}: {
  business: Business;
  title: string;
  paragraphs: string[];
  image?: Img;
  extra?: React.ReactNode;
}) {
  return (
    <section className="tone-light bg-ivory py-28 md:py-40" aria-labelledby="intro">
      <div className="wrap grid-12 gap-y-14">
        <div className="col-span-12 lg:col-span-6">
          <Kicker index="01" tone="light" accent>
            Introduction
          </Kicker>
          <h2 id="intro" className="t-h2 mt-8" data-split>
            <Rich text={title} />
          </h2>
          {image && <Media image={image} className="mt-14 hidden aspect-[5/4] lg:block" sizes="45vw" parallax={6} />}
        </div>
        <div className="col-span-12 lg:col-span-5 lg:col-start-8 lg:pt-24">
          {paragraphs.map((p, i) => (
            <p key={i} className={i === 0 ? "t-lead text-ink/85" : "mt-6 text-ink/70"} data-reveal data-delay={String(i * 0.08)}>
              {p}
            </p>
          ))}
          {extra}
          <dl className="mt-14 grid grid-cols-2 border-t border-line-light">
            {b.facts.map((f, i) => (
              <div key={f.label} className={`flex flex-col-reverse border-b border-line-light py-7 ${i % 2 === 1 ? "border-l pl-6" : "pr-6"}`} data-reveal data-delay={String(i * 0.06)}>
                <dt className="t-label mt-3 text-ink/65">{f.label}</dt>
                <dd className="t-num text-[clamp(2.6rem,2rem+2vw,4.25rem)] leading-none">
                  <Counter stat={f} />
                </dd>
              </div>
            ))}
          </dl>
          {image && <Media image={image} className="mt-12 aspect-[4/3] lg:hidden" sizes="100vw" />}
        </div>
      </div>
    </section>
  );
}
