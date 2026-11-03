import { markFolds, markPaths, markViewBox, wordmarkPath, wordmarkViewBox } from "@/lib/logoPaths";
import { cn } from "@/lib/utils";

/** The Afwajh triangle mark, as clean vector paths with the gold gradient. */
export function Mark({ className, id = "mark" }: { className?: string; id?: string }) {
  return (
    <svg viewBox={markViewBox} className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-gold`} gradientUnits="userSpaceOnUse" x1="207" y1="306" x2="388" y2="462">
          <stop offset="0" stopColor="#B8862F" />
          <stop offset=".5" stopColor="#E2C26A" />
          <stop offset="1" stopColor="#A87324" />
        </linearGradient>
      </defs>
      <g fill={`url(#${id}-gold)`}>
        {markPaths.map((d, i) => (
          <path key={i} d={d} />
        ))}
        {markFolds.map((d, i) => (
          <path key={`f${i}`} d={d} />
        ))}
      </g>
      <g fill="#5A3A0E" fillOpacity=".22">
        {markFolds.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    </svg>
  );
}

/** Horizontal lockup: mark + AFWAJH wordmark + "Group of Companies". */
export default function Logo({ className, tone = "light", id = "logo" }: { className?: string; tone?: "light" | "dark"; id?: string }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <Mark id={id} className="h-9 w-auto md:h-10" />
      <span className="flex flex-col gap-1.5">
        <svg viewBox={wordmarkViewBox} className={cn("h-[15px] w-auto md:h-[17px]", tone === "light" ? "text-gold-light" : "text-gold-deep")} aria-hidden="true">
          <path d={wordmarkPath} fill="currentColor" />
        </svg>
        <span className={cn("text-[8.5px] font-medium uppercase leading-none tracking-[0.34em]", tone === "light" ? "text-ivory/70" : "text-ink/60")}>
          Group of Companies
        </span>
      </span>
      <span className="sr-only">Afwajh Group of Companies</span>
    </span>
  );
}
