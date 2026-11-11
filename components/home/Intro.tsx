import Kicker from "@/components/ui/Kicker";
import Rich from "@/components/ui/Rich";
import KeyStats from "@/components/ui/KeyStats";
import { intro } from "@/data/site";

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

        <KeyStats className="mt-14 md:mt-32" />
      </div>
    </section>
  );
}
