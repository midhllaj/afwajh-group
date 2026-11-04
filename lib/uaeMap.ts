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

/** Palm Jumeirah, as a small landmark on the coast. */
export const palmPath = (() => {
  const c = project(55.135, 25.118);
  const r = 7;
  const n = (v: number) => v.toFixed(1);
  const fronds = Array.from({ length: 7 }, (_, i) => {
    const a = ((-150 + i * 40) * Math.PI) / 180;
    return `M${n(c.x)} ${n(c.y)} L${n(c.x + Math.cos(a) * r)} ${n(c.y + Math.sin(a) * r)}`;
  });
  const end = project(55.165, 25.14);
  const crescent = `M${n(c.x - r * 1.3)} ${n(c.y - r * 0.4)} A${n(r * 1.4)} ${n(r * 1.4)} 0 0 1 ${n(c.x + r * 0.45)} ${n(c.y - r * 1.35)}`;
  return [...fronds, `M${n(c.x)} ${n(c.y)} L${n(end.x)} ${n(end.y)}`, crescent].join(" ");
})();
