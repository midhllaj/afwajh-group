import DotMap from "@/components/ui/DotMap";
import Reveal from "@/components/ui/Reveal";
import SplitHeading from "@/components/ui/SplitHeading";
import { mission, vision } from "@/data/site";

export default function VisionMission() {
  return (
    <section className="on-light relative overflow-hidden bg-ivory py-24 text-ink md:py-36" aria-label="Vision and mission">
      <DotMap className="pointer-events-none absolute -right-[18%] bottom-[-8%] w-[95%] text-teal/60 md:-right-[6%] md:w-[62%]" />
      <div className="container-x relative">
        <div className="grid-12 gap-y-20">
          {[
            { label: "Vision", text: vision, index: "05" },
            { label: "Mission", text: mission, index: "06" },
          ].map((item, i) => (
            <div key={item.label} className={`col-span-12 md:col-span-9 lg:col-span-7 ${i === 1 ? "lg:col-start-4" : ""}`}>
              <Reveal variant="fade" className="mb-6 flex items-center gap-4">
                <span className="h-px w-16 bg-gold-deep" />
                <span className="eyebrow text-emerald-700">{item.label}</span>
              </Reveal>
              <SplitHeading as="h2" text={`Our *${item.label}*`} className="display-sm mb-6 text-emerald-900" />
              <Reveal delay={0.1}>
                <p className="font-serif text-[1.6rem] leading-[1.3] text-ink/85 md:text-[2.15rem]">{item.text}</p>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
