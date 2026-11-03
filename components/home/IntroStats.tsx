import Counter from "@/components/ui/Counter";
import Reveal, { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import SplitHeading from "@/components/ui/SplitHeading";
import { emirates, intro, keyStats } from "@/data/site";

export default function IntroStats() {
  return (
    <section className="on-light relative bg-ivory py-24 text-ink md:py-36" aria-labelledby="intro-title">
      <div className="container-x">
        <div className="grid-12 gap-y-10">
          <div className="col-span-12 lg:col-span-5">
            <Reveal variant="fade" className="mb-6 flex items-center gap-4">
              <span className="h-px w-12 bg-gold-deep/60" />
              <span className="eyebrow text-emerald-700">Introduction</span>
            </Reveal>
            <SplitHeading
              as="h2"
              text={"A diversified group,\nbuilt on *quality.*"}
              className="display-md text-emerald-900"
            />
            <span id="intro-title" className="sr-only">Introduction to Afwajh Group</span>
          </div>
          <Reveal className="col-span-12 lg:col-span-6 lg:col-start-7" delay={0.1}>
            <p className="lead text-ink/80 first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-[4.2rem] first-letter:leading-[0.85] first-letter:text-gold-deep">
              {intro}
            </p>
          </Reveal>
        </div>

        <RevealGroup as="dl" className="mt-20 grid grid-cols-2 gap-px border-y border-emerald-900/15 bg-emerald-900/15 md:mt-28 md:grid-cols-3 xl:grid-cols-6">
          {keyStats.map((s) => (
            <RevealItem key={s.label} className="flex flex-col gap-2 bg-ivory px-1 py-8 sm:px-5 md:py-10">
              <dt className="order-2 text-sm font-medium text-muted">{s.label}</dt>
              <dd className="order-1 font-serif text-[3.25rem] leading-none text-emerald-900 md:text-[4.25rem]">
                <Counter value={s.value} suffix={s.suffix} />
              </dd>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted" variant="fade">
          <span className="eyebrow text-emerald-700">Operating across</span>
          {emirates.map((e) => (
            <span key={e} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rotate-45 bg-gold-deep" aria-hidden="true" />
              {e}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
