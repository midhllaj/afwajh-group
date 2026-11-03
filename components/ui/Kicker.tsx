import { cn } from "@/lib/utils";

/** Micro label like "01 — RETAIL" with a short gold hairline. */
export default function Kicker({
  index,
  children,
  tone = "dark",
  className,
  accent,
}: {
  index?: string;
  children: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
  /** Use the page's accent colour for the rule. */
  accent?: boolean;
}) {
  return (
    <p className={cn("t-label flex items-center gap-4", tone === "dark" ? "text-ivory/70" : "text-ink/60", className)} data-reveal>
      {index && <span className={tone === "dark" ? "text-gold-light" : "text-gold-deep"}>{index}</span>}
      <span className={cn("h-px w-10", accent ? "bg-[var(--accent)]" : "bg-gold")} aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}
