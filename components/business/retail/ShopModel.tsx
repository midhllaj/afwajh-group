import type { Outlet } from "@/data/retail";
import type { Venue } from "@/data/restaurants";

export type ModelKind = Outlet["kind"] | Venue["kind"];

const SIZE: Record<ModelKind, { w: number; d: number; h: number }> = {
  Minimart: { w: 28, d: 24, h: 19 },
  Market: { w: 34, d: 24, h: 16 },
  Supermarket: { w: 38, d: 28, h: 23 },
  Cafe: { w: 26, d: 22, h: 15 },
  Cafeteria: { w: 30, d: 24, h: 16 },
  Restaurant: { w: 36, d: 28, h: 20 },
};

const DINING = new Set<ModelKind>(["Cafe", "Cafeteria", "Restaurant"]);

// Shops are green, dining is yellow, on every page.
const SHOP_GREEN = "#4E9F3D";
const SHOP_GREEN_DARK = "#2F6B2A";
const DINING_YELLOW = "#E9B83A";

const VIEW_W = 72;
const VIEW_H = 72;
const BASE_Y = 62;

/** Isometric projection for a shop-sized box, returning an SVG points helper. */
function isoFor(w: number, d: number) {
  const ox = VIEW_W / 2 + ((d - w) * 0.866) / 2;
  const oy = BASE_Y - (w + d) / 2;
  const at = (x: number, y: number, z: number) => `${(ox + (x - y) * 0.866).toFixed(2)},${(oy + (x + y) / 2 - z).toFixed(2)}`;
  const q = (...pts: [number, number, number][]) => pts.map(([x, y, z]) => at(x, y, z)).join(" ");
  const xy = (x: number, y: number, z: number) => at(x, y, z).split(",").map(Number) as [number, number];
  return Object.assign(q, { xy });
}

/** A small isometric shop: walls, roof sign, striped awning and lit windows. Dining kinds get a coffee-cup sign. */
export default function ShopModel({ kind, className }: { kind: ModelKind; className?: string }) {
  const { w, d, h } = SIZE[kind];
  const q = isoFor(w, d);
  const dining = DINING.has(kind);
  const stripes = kind === "Supermarket" || kind === "Restaurant" ? 8 : 6;
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

      {/* Supermarket fascia: a green band wrapping the top of the walls */}
      {!dining && (
        <>
          <polygon points={q([0, d, h * 0.8], [w, d, h * 0.8], [w, d, h * 0.97], [0, d, h * 0.97])} fill={SHOP_GREEN} />
          <polygon points={q([w, d, h * 0.8], [w, 0, h * 0.8], [w, 0, h * 0.97], [w, d, h * 0.97])} fill={SHOP_GREEN_DARK} />
        </>
      )}

      {/* Striped awning */}
      {Array.from({ length: stripes }, (_, i) => {
        const a = (w * i) / stripes;
        const b = (w * (i + 1)) / stripes;
        return (
          <polygon
            key={i}
            points={q([a, d, awnTop], [b, d, awnTop], [b, d + reach, awnLow], [a, d + reach, awnLow])}
            fill={i % 2 ? "#FFFDF7" : dining ? DINING_YELLOW : SHOP_GREEN}
          />
        );
      })}
      <polygon points={q([0, d + reach, awnLow], [w, d + reach, awnLow], [w, d + reach, awnLow - 1.6], [0, d + reach, awnLow - 1.6])} fill="#0E2E2B" />

      {dining ? (
        <CupSign at={q.xy(w / 2, d / 2, h)} />
      ) : (
        <>
          {/* Roof sign: green board with a shopping cart painted on it */}
          <polygon points={q([w * 0.14, d * 0.55, h], [w * 0.86, d * 0.55, h], [w * 0.86, d * 0.55, h + 8], [w * 0.14, d * 0.55, h + 8])} fill={SHOP_GREEN} {...edge} />
          <polygon points={q([w * 0.14, d * 0.55, h + 8], [w * 0.86, d * 0.55, h + 8], [w * 0.86, d * 0.55, h + 8.8], [w * 0.14, d * 0.55, h + 8.8])} fill="#FFFDF7" />
          <CartGlyph origin={q.xy(w / 2 - 4.5, d * 0.55, h + 7.2)} />
        </>
      )}
    </svg>
  );
}

/** A steaming coffee cup standing on the roof, drawn facing the viewer. */
function CupSign({ at: [cx, cy] }: { at: [number, number] }) {
  const top = cy - 9;
  return (
    <g>
      <rect x={cx - 0.6} y={cy - 3} width={1.2} height={3} fill="#0E2E2B" />
      <ellipse cx={cx} cy={cy - 3} rx={7} ry={1.6} fill="#C9A24B" />
      <path d={`M${cx - 5} ${top} h10 l-1.2 5.6 a2 2 0 0 1 -2 1.6 h-3.6 a2 2 0 0 1 -2 -1.6 z`} fill="#FFFDF7" stroke="#0A2321" strokeOpacity={0.28} strokeWidth={0.5} />
      <path d={`M${cx + 4.7} ${top + 1.4} a2.1 2.1 0 0 1 0 4.2`} fill="none" stroke="#FFFDF7" strokeWidth={1.2} />
      <ellipse cx={cx} cy={top} rx={5} ry={1.1} fill="#6B3E26" />
      <rect x={cx - 5} y={top + 2.4} width={10} height={1.4} fill="var(--accent)" />
      {[-2, 0.4, 2.8].map((dx) => (
        <path key={dx} d={`M${cx + dx - 0.6} ${top - 1.4} q1.4 -1.6 0 -3.2 t0 -3.2`} fill="none" stroke="#FFF3C9" strokeOpacity={0.7} strokeWidth={0.7} strokeLinecap="round" />
      ))}
    </g>
  );
}

/** A white shopping cart, drawn flat on the sign board (the board runs along the iso x axis). */
function CartGlyph({ origin: [x, y] }: { origin: [number, number] }) {
  return (
    <g transform={`matrix(0.866 0.5 0 1 ${x} ${y})`} fill="none" stroke="#FFFDF7" strokeWidth={0.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M0 0.6 H1.6 L2.8 4.4 H7.6 L8.6 1.6 H2.1" />
      <circle cx={3.4} cy={5.7} r={0.6} fill="#FFFDF7" stroke="none" />
      <circle cx={7} cy={5.7} r={0.6} fill="#FFFDF7" stroke="none" />
    </g>
  );
}
