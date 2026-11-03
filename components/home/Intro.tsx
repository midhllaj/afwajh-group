import Kicker from "@/components/ui/Kicker";
import Rich from "@/components/ui/Rich";
import Counter from "@/components/ui/Counter";
import { intro, keyStats } from "@/data/site";

export default function Intro() {
  return (
    <section className="tone-light bg-ivory py-28 md:py-40" aria-labelledby="intro-title">
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

        <dl className="mt-24 grid grid-cols-2 border-t border-line-light md:mt-32 md:grid-cols-5">
          {keyStats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col gap-3 border-b border-line-light py-8 md:border-b-0 md:py-10 ${i > 0 ? "md:border-l md:pl-6" : ""} ${i % 2 === 1 ? "border-l pl-5 md:pl-6" : ""} ${i === keyStats.length - 1 ? "col-span-2 md:col-span-1" : ""}`}
              data-reveal
              data-delay={String(i * 0.06)}
            >
              <dt className="t-label order-2 text-ink/65">{s.label}</dt>
              <dd className="t-num order-1 text-[clamp(3rem,2rem+3vw,5.5rem)] leading-none">
                <Counter stat={s} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
