import Kicker from "@/components/ui/Kicker";
import Rich from "@/components/ui/Rich";
import Icon from "@/components/ui/Icon";
import { coreStrengths } from "@/data/site";

export default function Strengths({ index = "04" }: { index?: string }) {
  return (
    <section className="tone-light bg-ivory py-20 md:py-40" aria-labelledby="strengths-title">
      <div className="wrap grid-12 gap-y-14">
        <div className="col-span-12 lg:col-span-4">
          <Kicker index={index} tone="light">
            Core strengths
          </Kicker>
          <h2 id="strengths-title" className="t-h2 mt-8" data-split>
            <Rich text={"What sets\nus *apart*"} />
          </h2>
        </div>
        <ol className="col-span-12 grid border-t border-line-light sm:grid-cols-2 lg:col-span-8">
          {coreStrengths.map((s, i) => (
            <li
              key={s.title}
              className={`group flex gap-6 border-b border-line-light py-8 sm:py-10 ${i % 2 === 1 ? "sm:border-l sm:pl-8" : "sm:pr-8"}`}
              data-reveal
              data-delay={String((i % 2) * 0.08)}
            >
              <span className="t-label pt-2 text-gold-deep">0{i + 1}</span>
              <span className="flex-1">
                <Icon name={s.icon} size={34} className="text-emerald transition-transform duration-500 group-hover:-translate-y-1" />
                <span className="t-h4 mt-6 block">{s.title}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
