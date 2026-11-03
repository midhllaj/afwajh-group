import Image from "next/image";
import Icon from "@/components/ui/Icon";
import { imageMeta } from "@/components/ui/Media";
import { site } from "@/data/site";

const hero = { src: "/images/home/dubai-skyline-twilight.webp", alt: "Dubai skyline at twilight with the Burj Khalifa on the horizon" };

/** Cinematic home hero. Pure CSS motion so the headline paints immediately. */
export default function Hero() {
  const m = imageMeta(hero.src);
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-emerald-deep text-ivory" aria-labelledby="hero-title">
      <div className="hero-ken absolute inset-0 -z-10">
        <Image
          src={hero.src}
          alt={hero.alt}
          fill
          preload
          fetchPriority="high"
          sizes="100vw"
          quality={80}
          placeholder="blur"
          blurDataURL={m?.blur}
          className="object-cover object-[50%_60%] [filter:saturate(.9)_contrast(1.05)]"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(10,35,33,.55)_0%,rgba(10,35,33,.15)_35%,rgba(10,35,33,.85)_88%,#0A2321_100%)]" />

      <div className="wrap pb-28 pt-[calc(var(--header-h)+4rem)] md:pb-20">
        <p className="hero-fade t-label mb-8 flex items-center gap-4 text-ivory/75" style={{ ["--d" as string]: 0.1 }}>
          <span className="h-px w-10 bg-gold" aria-hidden="true" />
          Est. {site.established} — United Arab Emirates
        </p>
        <h1 id="hero-title" className="t-hero max-w-[12ch]">
          <span className="hero-line line-mask">
            <span style={{ ["--d" as string]: 0.15 }}>Afwajh Group</span>
          </span>
          <span className="hero-line line-mask">
            <span style={{ ["--d" as string]: 0.27 }}>
              of <em className="accent-word text-gold">Companies</em>
            </span>
          </span>
        </h1>
        <div className="mt-10 flex flex-col justify-between gap-10 md:mt-14 md:flex-row md:items-end">
          <p className="hero-fade t-lead max-w-md text-ivory/85" style={{ ["--d" as string]: 0.5 }}>
            Seven businesses. One standard of <em className="accent-word text-[1.15em] text-gold-light">excellence</em>.
          </p>
          <a
            href="#businesses"
            className="hero-fade group hidden items-center gap-4 self-end text-ivory/70 transition-colors hover:text-gold-light md:flex"
            style={{ ["--d" as string]: 0.7 }}
          >
            <span className="t-label">Scroll to explore</span>
            <span className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-ivory/30">
              <Icon name="arrow" size={18} className="rotate-90 animate-[scroll-cue_2.2s_var(--ease-expo)_infinite]" />
            </span>
          </a>
        </div>
      </div>
      <style>{`@keyframes scroll-cue { 0% { transform: rotate(90deg) translateX(-140%); } 45%,55% { transform: rotate(90deg) translateX(0); } 100% { transform: rotate(90deg) translateX(140%); } }`}</style>
    </section>
  );
}
