import Kicker from "@/components/ui/Kicker";
import { Mark } from "@/components/brand/Logo";
import { mission, vision } from "@/data/site";

export default function VisionMission({ index = "03" }: { index?: string }) {
  return (
    <section className="grain relative overflow-hidden bg-emerald-deep py-20 text-ivory md:py-40" aria-label="Vision and mission">
      <Mark id="vm" className="pointer-events-none absolute -right-24 top-1/2 w-[620px] -translate-y-1/2 opacity-[0.05] md:w-[900px]" />
      <div className="wrap relative">
        <Kicker index={index}>Purpose</Kicker>
        <div className="mt-16 grid gap-16 md:grid-cols-2 md:gap-10 lg:gap-24">
          {[
            { label: "Vision", text: vision },
            { label: "Mission", text: mission },
          ].map((item, i) => (
            <article key={item.label} className="border-t border-line-dark pt-8" data-reveal data-delay={String(i * 0.12)}>
              <h2 className="t-h3 flex items-baseline gap-4">
                <span className="t-label text-gold-light">0{i + 1}</span>
                Our <em className="accent-word text-gold-light">{item.label.toLowerCase()}</em>
              </h2>
              <p className="mt-8 text-[clamp(1.35rem,1.05rem+1vw,2.1rem)] leading-[1.4] tracking-[-0.01em] text-ivory/90">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
