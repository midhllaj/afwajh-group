import type { Outlet } from "@/data/retail";

const SIZE: Record<Outlet["kind"], { w: number; d: number; h: number }> = {
  Minimart: { w: 28, d: 24, h: 19 },
  Market: { w: 34, d: 24, h: 16 },
  Supermarket: { w: 38, d: 28, h: 23 },
};

const VIEW_W = 72;
const VIEW_H = 72;
const BASE_Y = 62;

/** Isometric projection for a shop-sized box, returning an SVG points helper. */
function isoFor(w: number, d: number) {
  const ox = VIEW_W / 2 + ((d - w) * 0.866) / 2;
  const oy = BASE_Y - (w + d) / 2;
  const at = (x: number, y: number, z: number) => `${(ox + (x - y) * 0.866).toFixed(2)},${(oy + (x + y) / 2 - z).toFixed(2)}`;
  return (...pts: [number, number, number][]) => pts.map(([x, y, z]) => at(x, y, z)).join(" ");
}

/** A small isometric shop: walls, roof sign, striped awning and lit windows. */
export default function ShopModel({ kind, className }: { kind: Outlet["kind"]; className?: string }) {
  const { w, d, h } = SIZE[kind];
  const q = isoFor(w, d);
  const stripes = kind === "Supermarket" ? 8 : 6;
  const awnTop = h * 0.74;
  const awnLow = h * 0.5;
  const reach = 6;
  const edge = { stroke: "#0A2321", strokeOpacity: 0.28, strokeWidth: 0.5, strokeLinejoin: "round" as const };

  return (
    <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className={className} aria-hidden="true">
      <ellipse cx={VIEW_W / 2} cy={BASE_Y - (w + d) / 4 + 1} rx={(w + d) * 0.56} ry={(w + d) * 0.31} fill="#000" opacity={0.34} />

      {/* Walls */}
      <polygon points={q([0, d, 0], [w, d, 0], [w, d, h], [0, d, h])} fill="#F5F1E8" {...edge} />
      <polygon points={q([w, d, 0], [w, 0, 0], [w, 0, h], [w, d, h])} fill="#BDB7A6" {...edge} />

      {/* Roof with an inset deck */}
      <polygon points={q([0, 0, h], [w, 0, h], [w, d, h], [0, d, h])} fill="#FFFDF7" {...edge} />
      <polygon points={q([2, 2, h], [w - 2, 2, h], [w - 2, d - 2, h], [2, d - 2, h])} fill="#D9D2C0" />

      {/* Shop window and door */}
      <polygon points={q([w * 0.08, d, 2.5], [w * 0.62, d, 2.5], [w * 0.62, d, awnLow - 0.5], [w * 0.08, d, awnLow - 0.5])} fill="#E2C26A" />
      <polygon points={q([w * 0.7, d, 0], [w * 0.92, d, 0], [w * 0.92, d, awnLow - 0.5], [w * 0.7, d, awnLow - 0.5])} fill="#163F3B" />

      {/* Side windows */}
      {[0.2, 0.6].map((t) => (
        <polygon key={t} points={q([w, d * (1 - t), h * 0.32], [w, d * (1 - t - 0.24), h * 0.32], [w, d * (1 - t - 0.24), h * 0.72], [w, d * (1 - t), h * 0.72])} fill="#E2C26A" opacity={0.75} />
      ))}

      {/* Striped awning */}
      {Array.from({ length: stripes }, (_, i) => {
        const a = (w * i) / stripes;
        const b = (w * (i + 1)) / stripes;
        return (
          <polygon
            key={i}
            points={q([a, d, awnTop], [b, d, awnTop], [b, d + reach, awnLow], [a, d + reach, awnLow])}
            fill={i % 2 ? "#FFFDF7" : "var(--accent)"}
          />
        );
      })}
      <polygon points={q([0, d + reach, awnLow], [w, d + reach, awnLow], [w, d + reach, awnLow - 1.6], [0, d + reach, awnLow - 1.6])} fill="#0E2E2B" />

      {/* Roof sign */}
      <polygon points={q([w * 0.14, d * 0.55, h], [w * 0.86, d * 0.55, h], [w * 0.86, d * 0.55, h + 7], [w * 0.14, d * 0.55, h + 7])} fill="#C9A24B" {...edge} />
      <polygon points={q([w * 0.2, d * 0.55, h + 3.2], [w * 0.8, d * 0.55, h + 3.2], [w * 0.8, d * 0.55, h + 4.4], [w * 0.2, d * 0.55, h + 4.4])} fill="#FFF3C9" />
    </svg>
  );
}
