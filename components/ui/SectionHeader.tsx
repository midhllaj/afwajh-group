import { cn } from "@/lib/utils";
import Reveal from "./Reveal";
import SplitHeading from "./SplitHeading";

interface Props {
  index?: string;
  eyebrow: string;
  title: string;
  intro?: string;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
  size?: "lg" | "md";
}

/** Numbered section header with a thin gold hairline, as in the group profile. */
export default function SectionHeader({ index, eyebrow, title, intro, tone = "dark", align = "left", className, as = "h2", size = "md" }: Props) {
  const light = tone === "light";
  return (
    <div className={cn(align === "center" && "mx-auto text-center", className)}>
      <Reveal variant="fade" className={cn("mb-6 flex items-center gap-4", align === "center" && "justify-center")}>
        {index && <span className={cn("font-serif text-2xl italic", light ? "text-gold-deep" : "text-gold-light")}>{index}</span>}
        <span className={cn("h-px w-12", light ? "bg-gold-deep/60" : "bg-gold-light/60")} />
        <span className={cn("eyebrow", light ? "text-emerald-700" : "text-teal-light")}>{eyebrow}</span>
      </Reveal>
      <SplitHeading
        as={as}
        text={title}
        className={cn(size === "lg" ? "display-lg" : "display-md", light ? "text-emerald-900" : "text-ivory", align === "center" && "mx-auto")}
      />
      {intro && (
        <Reveal delay={0.15} className={cn("lead mt-8 max-w-2xl", light ? "text-muted" : "text-ivory/75", align === "center" && "mx-auto")}>
          <p>{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
