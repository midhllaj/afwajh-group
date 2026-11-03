import Kicker from "@/components/ui/Kicker";
import Rich from "@/components/ui/Rich";
import { cn } from "@/lib/utils";

/** Kicker + split heading + optional intro, in an asymmetric two-column layout. */
export default function SectionHead({
  index,
  label,
  title,
  intro,
  tone = "light",
  id,
  className,
}: {
  index?: string;
  label: string;
  title: string;
  intro?: React.ReactNode;
  tone?: "light" | "dark";
  id?: string;
  className?: string;
}) {
  return (
    <div className={cn("grid-12 gap-y-8", className)}>
      <div className="col-span-12 lg:col-span-7">
        <Kicker index={index} tone={tone} accent>
          {label}
        </Kicker>
        <h2 id={id} className="t-h2 mt-8" data-split>
          <Rich text={title} />
        </h2>
      </div>
      {intro && (
        <div className={cn("col-span-12 lg:col-span-4 lg:col-start-9 lg:self-end", tone === "dark" ? "text-ivory/70" : "text-ink/70")} data-reveal>
          {typeof intro === "string" ? <p>{intro}</p> : intro}
        </div>
      )}
    </div>
  );
}
