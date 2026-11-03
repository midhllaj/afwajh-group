import type { Stat } from "@/data/types";

const isYear = (s: Stat) => !s.decimals && s.value >= 1900 && s.value <= 2100;

export const formatStat = (s: Stat) =>
  (s.prefix ?? "") +
  (isYear(s) ? String(s.value) : s.value.toLocaleString("en-US", { minimumFractionDigits: s.decimals ?? 0, maximumFractionDigits: s.decimals ?? 0 })) +
  (s.suffix ?? "");

/** Number that counts up when scrolled into view (driven by MotionDirector). Renders the final value for SSR/no-JS. */
export default function Counter({ stat, className }: { stat: Stat; className?: string }) {
  return (
    <span
      className={className}
      data-counter=""
      data-to={stat.value}
      data-decimals={stat.decimals ?? 0}
      data-prefix={stat.prefix ?? ""}
      data-suffix={stat.suffix ?? ""}
      aria-label={formatStat(stat)}
    >
      {formatStat(stat)}
    </span>
  );
}
