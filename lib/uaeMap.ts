// Stylised UAE outline (approximate, for decoration and pin placement only)
// plus a dot-matrix fill like the map in the group profile.

const OUTLINE: [number, number][] = [
  [51.58, 24.27], [51.75, 24.3], [51.9, 24.05], [52.1, 23.97], [52.35, 24.05], [52.6, 24.2],
  [52.95, 24.15], [53.3, 24.1], [53.65, 24.05], [54.0, 24.1], [54.25, 24.25], [54.4, 24.45],
  [54.55, 24.55], [54.65, 24.8], [54.85, 24.88], [55.03, 24.98], [55.07, 25.04], [55.13, 25.09],
  [55.19, 25.145], [55.235, 25.215], [55.275, 25.275], [55.32, 25.3], [55.38, 25.355], [55.44, 25.42],
  [55.52, 25.5], [55.56, 25.58], [55.64, 25.59], [55.76, 25.67], [55.87, 25.74], [55.94, 25.81],
  [55.99, 25.89], [56.05, 25.97], [56.08, 26.07], [56.15, 25.85], [56.2, 25.7], [56.27, 25.62], [56.33, 25.4],
  [56.36, 25.2], [56.37, 25.05], [56.37, 24.98], [56.2, 24.95], [56.05, 24.85], [56.0, 24.6],
  [55.85, 24.4], [55.8, 24.22], [55.95, 24.05], [55.8, 23.9], [55.55, 23.65], [55.5, 23.35],
  [55.25, 22.95], [55.2, 22.7], [55.0, 22.62], [54.0, 22.75], [53.0, 22.9], [52.58, 22.94],
  [51.95, 23.7], [51.58, 24.1],
];

const LON0 = 51.4;
const LAT0 = 26.3;
const K = 200;
const COS = Math.cos((24.3 * Math.PI) / 180);

export const MAP_W = 950;
export const MAP_H = 760;

export const project = (lng: number, lat: number) => ({
  x: (lng - LON0) * K * COS,
  y: (LAT0 - lat) * K,
});

export const outlinePath =
  OUTLINE.map(([lng, lat], i) => {
    const { x, y } = project(lng, lat);
    return `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ") + " Z";

const poly = OUTLINE.map(([lng, lat]) => project(lng, lat));

function inside(x: number, y: number) {
  let hit = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const a = poly[i];
    const b = poly[j];
    if (a.y > y !== b.y > y && x < ((b.x - a.x) * (y - a.y)) / (b.y - a.y) + a.x) hit = !hit;
  }
  return hit;
}

/** Dot grid clipped to the UAE outline. */
export function mapDots(step = 12) {
  const dots: { x: number; y: number }[] = [];
  for (let y = step / 2; y < MAP_H; y += step) {
    for (let x = step / 2; x < MAP_W; x += step) {
      if (inside(x, y)) dots.push({ x, y });
    }
  }
  return dots;
}

// The land is drawn as a tilted plate; everything placed on it goes through place().
const SHEAR = -0.16;
const SQUASH = 0.74;

/** SVG transform for the tilted ground plate (same maths as place()). */
export const groundTransform = `matrix(1 0 ${SHEAR} ${SQUASH} 0 0)`;

export interface Point {
  x: number;
  y: number;
}

/** Position of a lng/lat on the tilted plate. */
export const place = (lng: number, lat: number): Point => {
  const p = project(lng, lat);
  return { x: p.x + SHEAR * p.y, y: p.y * SQUASH };
};

/** A map camera: [x, y, width, height]. */
export type View = [number, number, number, number];

export const MAP_RATIO = MAP_W / MAP_H;

/** Smallest view at the map's aspect ratio that frames the points. */
export function fitView(points: Point[], pad: number, minWidth: number): View {
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const w = Math.max(minWidth, x1 - x0 + pad * 2, (y1 - y0 + pad * 2) * MAP_RATIO);
  const h = w / MAP_RATIO;
  return [(x0 + x1) / 2 - w / 2, (y0 + y1) / 2 - h / 2, w, h];
}

/** Close-up on one point, sitting above centre to leave room for the info card. */
export function focusView(p: Point, width = 60): View {
  const h = width / MAP_RATIO;
  return [p.x - width / 2, p.y - h * 0.42, width, h];
}

const n1 = (v: number) => v.toFixed(1);
const lineThrough = (pts: [number, number][]) =>
  pts.map(([lng, lat], i) => {
    const { x, y } = project(lng, lat);
    return `${i ? "L" : "M"}${n1(x)} ${n1(y)}`;
  }).join(" ");

/**
 * Palm Jumeirah, modelled on the real island: a bridge from the shore, a long trunk, 16 fronds
 * (8 a side) fanning seaward, and a crescent breakwater with two gaps and Atlantis at its tip.
 * Built in a local frame (along = out to sea, side = along the coast), then mapped onto the outline.
 */
export const palm = (() => {
  // The stylised coast at Jumeirah runs between these two outline points.
  const c1 = project(55.13, 25.09);
  const c2 = project(55.19, 25.145);
  const len = Math.hypot(c2.x - c1.x, c2.y - c1.y);
  const u = { x: (c2.x - c1.x) / len, y: (c2.y - c1.y) / len }; // along the coast
  const n = { x: u.y, y: -u.x }; // out to sea (north-west)
  const anchor = { x: c1.x + (c2.x - c1.x) * 0.42, y: c1.y + (c2.y - c1.y) * 0.42 };
  const P = (along: number, side: number) => ({ x: anchor.x + n.x * along + u.x * side, y: anchor.y + n.y * along + u.y * side });
  const pt = (p: { x: number; y: number }) => `${n1(p.x)} ${n1(p.y)}`;

  const crownAlong = 7.6;
  const R = 7.4; // crescent radius around the crown
  const arcPoint = (deg: number, r = R) => {
    const a = (deg * Math.PI) / 180;
    return P(crownAlong + Math.cos(a) * r, Math.sin(a) * r);
  };

  const bridge = `M${pt(P(-0.4, 0))} L${pt(P(1.6, 0))}`;
  const trunk = `M${pt(P(1.6, 0))} L${pt(P(crownAlong + 1.2, 0))}`;

  const fronds: string[] = [];
  for (let i = 0; i < 8; i++) {
    const root = 3 + i * 0.78;
    const phi = ((84 - i * 7.5) * Math.PI) / 180; // lower fronds stick out sideways, upper ones sweep seaward
    const L = 4.4 + Math.sin((i / 7) * Math.PI) * 0.9;
    for (const s of [1, -1]) {
      const a = P(root, 0);
      const tip = P(root + Math.cos(phi) * L, s * Math.sin(phi) * L);
      const ctl = P(root + Math.cos(phi) * L * 0.5 + 0.35, s * Math.sin(phi) * L * 0.5);
      fronds.push(`M${pt(a)} Q${pt(ctl)} ${pt(tip)}`);
    }
  }

  // Sampled rather than an SVG arc, so it always bends round the crown whatever the frame's handedness.
  const arc = (from: number, to: number) => {
    const steps = Math.ceil((to - from) / 4);
    return Array.from({ length: steps + 1 }, (_, i) => `${i ? "L" : "M"}${pt(arcPoint(from + ((to - from) * i) / steps))}`).join(" ");
  };
  const crescent = [arc(-128, -52), arc(-47, 47), arc(52, 128)];

  const lagoon = { ...P(crownAlong, 0), r: R - 0.6 };
  const atlantis = arcPoint(0, R + 0.1);
  return { bridge, trunk, fronds: fronds.join(" "), crescent, lagoon, atlantis, axis: n };
})();

/** Sheikh Zayed Road / E11, the coastal highway from Abu Dhabi to Ras Al Khaimah. */
export const highwayPath = lineThrough([
  [54.38, 24.46], [54.52, 24.6], [54.68, 24.76], [54.88, 24.86], [55.04, 24.97], [55.14, 25.06],
  [55.22, 25.14], [55.29, 25.22], [55.36, 25.29], [55.43, 25.35], [55.52, 25.44], [55.62, 25.53],
  [55.76, 25.62], [55.9, 25.72],
]);

/** Inland road to the Sharjah interior (Dhaid Road / E88). */
export const inlandRoadPath = lineThrough([[55.4, 25.33], [55.5, 25.3], [55.62, 25.27], [55.8, 25.22], [55.95, 25.18]]);
