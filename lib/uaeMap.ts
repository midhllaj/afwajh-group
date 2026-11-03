// Stylised UAE outline (approximate, for decoration and pin placement only)
// plus a dot-matrix fill like the map in the group profile.

const OUTLINE: [number, number][] = [
  [51.58, 24.27], [51.75, 24.3], [51.9, 24.05], [52.1, 23.97], [52.35, 24.05], [52.6, 24.2],
  [52.95, 24.15], [53.3, 24.1], [53.65, 24.05], [54.0, 24.1], [54.25, 24.25], [54.4, 24.45],
  [54.55, 24.55], [54.7, 24.75], [54.9, 24.95], [55.05, 25.03], [55.15, 25.1], [55.27, 25.23],
  [55.35, 25.3], [55.45, 25.4], [55.55, 25.5], [55.65, 25.58], [55.8, 25.7], [55.95, 25.82],
  [56.05, 25.95], [56.08, 26.07], [56.15, 25.85], [56.2, 25.7], [56.27, 25.62], [56.33, 25.4],
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

/** Bounding view boxes used to zoom the outlet map per emirate. */
export const emirateViews: Record<string, { lng: [number, number]; lat: [number, number] }> = {
  All: { lng: [51.5, 56.5], lat: [22.55, 26.2] },
  Dubai: { lng: [54.95, 55.45], lat: [24.9, 25.35] },
  "Abu Dhabi": { lng: [54.0, 55.0], lat: [24.15, 24.75] },
  Sharjah: { lng: [55.2, 55.65], lat: [25.2, 25.5] },
  "Ras Al Khaimah": { lng: [55.6, 56.2], lat: [25.45, 25.95] },
};

export function viewBoxFor(key: string) {
  const v = emirateViews[key] ?? emirateViews.All;
  const a = project(v.lng[0], v.lat[1]);
  const b = project(v.lng[1], v.lat[0]);
  let w = b.x - a.x;
  let h = b.y - a.y;
  // keep the map's aspect ratio
  const ratio = MAP_W / MAP_H;
  let x = a.x;
  let y = a.y;
  if (w / h > ratio) {
    const nh = w / ratio;
    y -= (nh - h) / 2;
    h = nh;
  } else {
    const nw = h * ratio;
    x -= (nw - w) / 2;
    w = nw;
  }
  return `${x.toFixed(1)} ${y.toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)}`;
}
