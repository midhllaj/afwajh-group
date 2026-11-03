import { MAP_H, MAP_W, mapDots, outlinePath } from "@/lib/uaeMap";
import { cn } from "@/lib/utils";

const dots = mapDots(13);

/** Decorative dot-matrix UAE map in the style of the group profile. */
export default function DotMap({ className }: { className?: string }) {
  return (
    <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className={cn("h-auto w-full", className)} aria-hidden="true">
      <path d={outlinePath} fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" />
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={2.1} fill="currentColor" opacity={0.55 + ((i * 37) % 10) / 22} />
      ))}
    </svg>
  );
}
