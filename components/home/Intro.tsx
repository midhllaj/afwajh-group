import Kicker from "@/components/ui/Kicker";
import Rich from "@/components/ui/Rich";
import Counter from "@/components/ui/Counter";
import { intro, keyStats } from "@/data/site";

export default function Intro() {
  return (
    <section className="tone-light bg-ivory py-20 md:py-40" aria-labelledby="intro-title">
      <div className="wrap">
        <div className="grid-12 gap-y-12">
          <div className="col-span-12 lg:col-span-6">
            <Kicker index="00" tone="light">
              The Group
            </Kicker>
            <h2 id="intro-title" className="t-h2 mt-8" data-split>
              <Rich text={"A diversified group,\nbuilt on *quality.*"} />
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8 lg:pt-16">
            <p className="t-lead text-ink/80" data-reveal>
              {intro.split(". ").slice(0, 2).join(". ")}.
            </p>
            <p className="mt-6 text-ink/65" data-reveal data-delay="0.1">
              {intro.split(". ").slice(2).join(". ")}
            </p>
          </div>
        </div>

        {/* One row of five at every size; on phones the numbers scale with the screen width. */}
        <dl className="mt-16 grid grid-cols-5 border-y border-line-light md:mt-32 md:border-b-0">
          {keyStats.map((s, i) => (
            <div
              key={s.label}
              className={`flex min-w-0 flex-col gap-2 py-6 md:gap-3 md:py-10 ${i > 0 ? "border-l border-line-light pl-2 md:pl-6" : ""}`}
              data-reveal
              data-delay={String(i * 0.06)}
            >
              <dt className="t-label order-2 text-[min(8px,2.3vw)] tracking-[0.03em] text-ink/65 md:text-[12px] md:tracking-[0.2em]">{s.label}</dt>
              <dd className="t-num order-1 text-[5.4vw] leading-none md:text-[clamp(3rem,2rem+3vw,5.5rem)]">
                <Counter stat={s} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
