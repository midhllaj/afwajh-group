import Counter from "@/components/ui/Counter";
import { keyStats } from "@/data/site";

/** Mobile hairlines per cell: full-width first tile, then a 2×2 grid. */
const mobileRules = [
  "col-span-2 border-b",
  "border-b border-r",
  "border-b",
  "border-r",
  "",
];

/**
 * Key figures. Phones: a full-width "Established … 2010" tile over a 2×2 grid of hairline-ruled cells.
 * Desktop: one row of five with vertical rules. `data-replay` re-runs the reveal and count-up
 * every time the figures scroll back into view.
 */
export default function KeyStats({ className = "" }: { className?: string }) {
  return (
    <dl className={`grid grid-cols-2 border-y border-line-light md:grid-cols-5 md:border-b-0 ${className}`} data-replay="">
      {keyStats.map((s, i) => {
        const lead = i === 0;
        return (
          <div
            key={s.label}
            className={`flex min-w-0 flex-col gap-3 border-line-light py-7 md:col-span-1 md:border-b-0 md:border-r-0 md:py-10 ${mobileRules[i] ?? ""} ${
              lead ? "flex-row items-end justify-between pr-1 md:flex-col md:items-stretch md:justify-start" : "px-5"
            } ${i === 1 || i === 3 ? "pl-0" : ""} ${i > 0 ? "md:border-l md:pl-6 md:pr-0" : ""}`}
            data-reveal
            data-delay={String(i * 0.06)}
          >
            {/* First tile on phones: label on the left, year on the right. Elsewhere: number above label. */}
            <dt
              className={`t-label leading-snug md:text-[12px] md:tracking-[0.2em] ${
                lead
                  ? "order-1 pb-2 text-[24px] font-bold tracking-[0.1em] text-gold-deep md:order-2 md:pb-0 md:text-[13px]"
                  : "order-2 text-[11px] font-semibold tracking-[0.16em] text-gold-deep"
              }`}
            >
              {lead ? (
                <>
                  {/* Highlighted in brand gold. */}
                  <span className="md:hidden">Established</span>
                  <span className="hidden md:inline">{s.label}</span>
                </>
              ) : (
                s.label
              )}
            </dt>
            <dd
              className={`t-num leading-none text-gold-deep ${lead ? "order-2 text-[3.5rem] md:order-1" : "order-1 text-[2.6rem]"} md:text-[clamp(2.75rem,2rem+2.5vw,5rem)]`}
            >
              <Counter stat={s} />
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
