"use client";

import { memo, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Icon from "@/components/ui/IconMini";
import { getLenis } from "@/components/providers/SmoothScroll";
import { directionsUrl, type MapPlace } from "@/data/types";
import { MAP_H, MAP_W, fitView, focusView, groundTransform, highwayPath, inlandRoadPath, outlinePath, palm, place, type Point, type View } from "@/lib/uaeMap";
import { cn } from "@/lib/utils";
import ShopModel, { type ModelKind } from "./ShopModel";

const filters = ["All", "Dubai", "Abu Dhabi", "Sharjah", "Ras Al Khaimah"] as const;
type Filter = (typeof filters)[number];

const labels = [
  { name: "Dubai", lng: 55.42, lat: 24.86 },
  { name: "Abu Dhabi", lng: 54.8, lat: 24.28 },
  { name: "Sharjah", lng: 55.8, lat: 25.12 },
  { name: "Ras Al Khaimah", lng: 56.04, lat: 25.42 },
  { name: "Arabian Gulf", lng: 54.35, lat: 25.7 },
];

// The whole country, cropped to the populated coast where the shops are.
const VIEW_ALL = fitView([place(53.1, 25.95), place(56.45, 26.1), place(53.1, 23.65), place(56.45, 23.65)], 10, 0);
// Dubai's group marker sits down the coast so it doesn't cover the Sharjah shop.
const clusterAnchors: Record<string, Point> = { Dubai: place(55.06, 25.0) };
const nonScaling = { vectorEffect: "non-scaling-stroke" } as const;

// Cartoon details standing upright on the plate.
const dunes = [
  { lng: 53.75, lat: 23.98, s: 1.1 },
  { lng: 54.35, lat: 23.86, s: 1.3 },
  { lng: 54.95, lat: 24.12, s: 1 },
  { lng: 55.5, lat: 24.42, s: 0.9 },
  { lng: 53.2, lat: 23.82, s: 0.9 },
].map((d) => ({ ...place(d.lng, d.lat), s: d.s }));
const boats = [
  { lng: 53.75, lat: 25.18, s: 1, flip: false },
  { lng: 54.55, lat: 25.2, s: 0.85, flip: true },
  { lng: 55.42, lat: 25.86, s: 0.8, flip: false },
].map((b) => ({ ...place(b.lng, b.lat), s: b.s, flip: b.flip }));
const SAND = "#EAD7A4";
const SAND_EDGE = "#BF9A5C";

/** The tilted UAE plate, drawn as a cartoon island. Static, so the camera can move without re-rendering it. */
const Ground = memo(function Ground() {
  return (
    <>
      <defs>
        <linearGradient id="uae-land" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3A8A6E" />
          <stop offset="0.55" stopColor="#2A7058" />
          <stop offset="1" stopColor="#1C5545" />
        </linearGradient>
        <pattern id="uae-dots" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="5" r="1.05" fill="#F5F1E8" opacity="0.16" />
        </pattern>
        <pattern id="uae-dots-fine" width="2.5" height="2.5" patternUnits="userSpaceOnUse">
          <circle cx="1.25" cy="1.25" r="0.24" fill="#F5F1E8" opacity="0.16" />
        </pattern>
        <pattern id="uae-waves" width="46" height="30" patternUnits="userSpaceOnUse">
          <path d="M4 10 q4 -4 8 0 t8 0 M27 25 q4 -4 8 0 t8 0" fill="none" stroke="#9FE0DA" strokeOpacity="0.22" strokeWidth="1.6" strokeLinecap="round" />
        </pattern>
        <pattern id="uae-waves-fine" width="11.5" height="7.5" patternUnits="userSpaceOnUse">
          <path d="M1 2.5 q1 -1 2 0 t2 0 M6.8 6.2 q1 -1 2 0 t2 0" fill="none" stroke="#9FE0DA" strokeOpacity="0.22" strokeWidth="0.4" strokeLinecap="round" />
        </pattern>
        <clipPath id="uae-clip">
          <path d={outlinePath} />
        </clipPath>
      </defs>
      <g transform={groundTransform}>
        {/* Sea: soft waves, with a fine set fading in as the camera zooms */}
        <rect x={-700} y={-700} width={2400} height={2200} fill="url(#uae-waves)" style={{ opacity: "calc(1 - var(--fine-dots))" }} />
        <rect x={-700} y={-700} width={2400} height={2200} fill="url(#uae-waves-fine)" style={{ opacity: "var(--fine-dots)" }} />

        {/* Shallow water hugging the coast */}
        {[30, 18, 9].map((w, i) => (
          <path key={w} d={outlinePath} fill="none" stroke="#6CC7BC" strokeOpacity={0.07 + i * 0.05} strokeWidth={w} strokeLinejoin="round" />
        ))}

        {/* Island slab */}
        <path d={outlinePath} transform="translate(0 30)" fill="#000" opacity={0.3} />
        {Array.from({ length: 14 }, (_, i) => (
          <path key={i} d={outlinePath} transform={`translate(0 ${(14 - i) * 1.5})`} fill={i < 7 ? "#5E4A2C" : "#8A6E42"} />
        ))}

        {/* Land, dots and a sandy beach just inside the coast */}
        <path d={outlinePath} fill="url(#uae-land)" />
        <path d={outlinePath} fill="url(#uae-dots)" style={{ opacity: "calc(1 - var(--fine-dots))" }} />
        <path d={outlinePath} fill="url(#uae-dots-fine)" style={{ opacity: "var(--fine-dots)" }} />
        <g clipPath="url(#uae-clip)">
          <path d={outlinePath} fill="none" stroke={SAND} strokeWidth={5} strokeLinejoin="round" />
          <path d={outlinePath} fill="none" stroke={SAND_EDGE} strokeOpacity={0.5} strokeWidth={5.6} strokeLinejoin="round" style={{ mixBlendMode: "multiply" }} opacity={0.25} />
        </g>

        {/* Roads */}
        {[highwayPath, inlandRoadPath].map((d, i) => (
          <g key={d}>
            <path d={d} fill="none" stroke="#123B33" strokeOpacity={0.55} strokeWidth={i ? 2.4 : 3.4} strokeLinecap="round" strokeLinejoin="round" />
            <path d={d} fill="none" stroke="#F5F1E8" strokeOpacity={0.7} strokeWidth={1} strokeDasharray="4 5" strokeLinecap="round" {...nonScaling} />
          </g>
        ))}

        {/* Palm Jumeirah: lighter lagoon, sand fronds with a strip of villa gardens, crescent with Atlantis */}
        <circle cx={palm.lagoon.x} cy={palm.lagoon.y} r={palm.lagoon.r} fill="#7FD3C8" opacity={0.16} />
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d={palm.bridge} stroke="#9AA3A0" strokeWidth={0.45} />
          {palm.crescent.map((d) => (
            <path key={d} d={d} stroke={SAND_EDGE} strokeWidth={1.05} />
          ))}
          <path d={palm.fronds} stroke={SAND_EDGE} strokeWidth={0.78} />
          <path d={palm.trunk} stroke={SAND_EDGE} strokeWidth={1.75} />
          {palm.crescent.map((d) => (
            <path key={d} d={d} stroke={SAND} strokeWidth={0.8} />
          ))}
          <path d={palm.fronds} stroke={SAND} strokeWidth={0.56} />
          <path d={palm.trunk} stroke={SAND} strokeWidth={1.45} />
          <path d={palm.fronds} stroke="#5E9E5A" strokeWidth={0.2} />
          {palm.crescent.map((d) => (
            <path key={d} d={d} stroke="#5E9E5A" strokeWidth={0.18} strokeOpacity={0.8} />
          ))}
          <path d={palm.trunk} stroke="#5E9E5A" strokeWidth={0.5} strokeOpacity={0.55} />
          <path d={palm.trunk} stroke="#F5F1E8" strokeWidth={0.12} strokeDasharray="0.5 0.5" />
        </g>
        <circle cx={palm.atlantis.x} cy={palm.atlantis.y} r={0.55} fill="#E9A9A0" stroke="#B9746C" strokeWidth={0.15} />

        <path d={outlinePath} fill="none" stroke="#F3E3B5" strokeOpacity={0.9} strokeWidth={1.4} strokeLinejoin="round" {...nonScaling} />
      </g>

      {/* Desert dunes */}
      {dunes.map((d) => (
        <g key={d.x} transform={`translate(${d.x} ${d.y}) scale(${d.s})`}>
          <ellipse cx={1} cy={1} rx={15} ry={2.6} fill="#0B2A22" opacity={0.25} />
          <path d="M-14 1 Q-7 -9 0 1 Z" fill="#C9A86A" />
          <path d="M-14 1 Q-7 -9 -6 -3.4 Q-4 -1 0 1 Z" fill="#E4C98C" />
          <path d="M-4 1 Q4 -12 13 1 Z" fill="#C9A86A" />
          <path d="M-4 1 Q4 -12 5.5 -4.6 Q8 -1.5 13 1 Z" fill="#EBD49A" />
        </g>
      ))}

      {/* Little dhows on the Gulf */}
      {boats.map((b) => (
        <g key={b.x} transform={`translate(${b.x} ${b.y}) scale(${b.flip ? -b.s : b.s} ${b.s})`}>
          <ellipse cx={0} cy={2.6} rx={11} ry={1.6} fill="#9FE0DA" opacity={0.25} />
          <path d="M-9 0 H9 L6 3.4 H-6 Z" fill="#8A5A34" stroke="#4A2E1A" strokeWidth={0.5} strokeLinejoin="round" />
          <path d="M-0.6 -0.2 V-14" stroke="#4A2E1A" strokeWidth={0.8} />
          <path d="M0 -13.5 Q8 -8 7.5 -1.4 L0 -1.4 Z" fill="#FFFDF7" stroke="#C9B98F" strokeWidth={0.4} />
        </g>
      ))}
    </>
  );
});

function NameTag({ show, accent, children }: { show: boolean; accent?: boolean; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "pointer-events-none absolute bottom-full left-1/2 mb-0.5 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 text-[12px] font-medium shadow-lg transition-[opacity,transform] duration-300",
        accent ? "bg-[var(--accent)] text-emerald-deep" : "bg-emerald-deep/95 text-ivory ring-1 ring-ivory/15",
        show ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100",
      )}
    >
      {children}
    </span>
  );
}

function GroundRing() {
  return (
    <span className="pointer-events-none absolute bottom-0 left-1/2 h-5 w-14 -translate-x-1/2 translate-y-1/3 md:h-6 md:w-20" aria-hidden="true">
      <span className="absolute inset-0 animate-ping rounded-[50%] border-2 border-[var(--accent)]" />
      <span className="absolute inset-0 rounded-[50%] border-2 border-[var(--accent)] bg-[var(--accent)]/20" />
    </span>
  );
}

type Place = MapPlace & { kind: ModelKind };

/** Outlet directory: emirate filter + 3D map of the places, each opening a card with directions. */
export default function OutletDirectory({
  outlets,
  noun = { one: "shop", many: "shops" },
  clusterKinds = ["Minimart", "Market", "Supermarket"],
  idPrefix = "",
}: {
  outlets: Place[];
  /** What a place is called in labels, e.g. shop/shops or venue/venues. */
  noun?: { one: string; many: string };
  /** The three buildings drawn on a grouped marker (left, right, front). */
  clusterKinds?: [ModelKind, ModelKind, ModelKind];
  /** Prefix for list item ids, when the page already uses the plain ids as anchors. */
  idPrefix?: string;
}) {
  const [filter, setFilter] = useState<Filter>("All");
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [vb, setVb] = useState<View>(VIEW_ALL);
  const vbRef = useRef<View>(VIEW_ALL);
  const stageRef = useRef<HTMLDivElement>(null);

  const list = useMemo(() => (filter === "All" ? outlets : outlets.filter((o) => o.emirate === filter)), [filter, outlets]);
  const count = (f: Filter) => (f === "All" ? outlets.length : outlets.filter((o) => o.emirate === f).length);
  const points = useMemo(() => new Map(outlets.map((o) => [o.id, place(o.lng, o.lat)])), [outlets]);
  const selectedOutlet = outlets.find((o) => o.id === selected);

  // Emirates with several shops collapse into one group marker on the country view.
  const clusters = useMemo(() => {
    const byEmirate = new Map<string, Place[]>();
    outlets.forEach((o) => byEmirate.set(o.emirate, [...(byEmirate.get(o.emirate) ?? []), o]));
    return [...byEmirate.entries()]
      .filter(([, members]) => members.length > 1)
      .map(([emirate, members]) => {
        const pts = members.map((m) => points.get(m.id) as Point);
        const at = clusterAnchors[emirate] ?? { x: pts.reduce((s, p) => s + p.x, 0) / pts.length, y: pts.reduce((s, p) => s + p.y, 0) / pts.length };
        return { emirate: emirate as Filter, members, at };
      });
  }, [outlets, points]);

  const clustered = filter === "All" && !selected;
  const inCluster = (o: Place) => clusters.some((c) => c.emirate === o.emirate);

  const target = useMemo<View>(() => {
    const point = selected ? points.get(selected) : undefined;
    if (point) return focusView(point);
    if (filter === "All") return VIEW_ALL;
    return fitView(list.map((o) => points.get(o.id) as Point), 16, 110);
  }, [filter, list, points, selected]);

  // Smoothly fly the camera to the current target.
  useEffect(() => {
    const from = vbRef.current;
    const reduce = !document.documentElement.classList.contains("motion");
    const start = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const t = reduce ? 1 : Math.min(1, (now - start) / 1100);
      const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const next = from.map((v, i) => v + (target[i] - v) * e) as View;
      vbRef.current = next;
      setVb(next);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  const pickFilter = (f: Filter) => {
    setFilter(f);
    setSelected(null);
  };

  const select = (o: Place) => {
    setSelected(o.id);
    if (filter !== "All" && o.emirate !== filter) setFilter(o.emirate as Filter);
  };

  const showOnMap = (o: Place) => {
    select(o);
    const stage = stageRef.current;
    if (!stage) return;
    const r = stage.getBoundingClientRect();
    if (r.top >= 80 && r.bottom <= window.innerHeight) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(stage, { offset: -110 });
    else window.scrollBy({ top: r.top - 90, behavior: "smooth" });
  };

  const pos = (p: Point) => ({ left: `${((p.x - vb[0]) / vb[2]) * 100}%`, top: `${((p.y - vb[1]) / vb[3]) * 100}%` });
  const fineDots = Math.min(1, Math.max(0, (MAP_W / vb[2] - 2) / 3));

  return (
    <div>
      <div role="group" aria-label={`Filter ${noun.many} by emirate`} className="no-scrollbar -mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] pb-2 md:mx-0 md:flex-wrap md:px-0">
        {filters.filter((f) => count(f) > 0).map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => pickFilter(f)}
            className={cn(
              "flex min-h-12 shrink-0 items-center gap-3 rounded-full border px-5 text-[15px] transition-colors",
              filter === f ? "border-[var(--accent)] bg-[var(--accent)] text-emerald-deep" : "border-line-dark text-ivory/80 hover:border-ivory/50",
            )}
          >
            {f === "All" ? "All emirates" : f}
            <span className={cn("t-label", filter === f ? "text-emerald-deep/70" : "text-ivory/60")}>{String(count(f)).padStart(2, "0")}</span>
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <div className="lg:sticky lg:top-28">
            <div className="relative">
              <div
                ref={stageRef}
                onClick={() => setSelected(null)}
                className="relative isolate aspect-[5/4] w-full overflow-hidden border border-line-dark bg-[radial-gradient(120%_100%_at_30%_10%,#1D5A63_0%,#123F48_50%,#0B2D35_100%)]"
              >
                <svg
                  viewBox={vb.join(" ")}
                  className="absolute inset-0 h-full w-full"
                  style={{ "--fine-dots": fineDots } as CSSProperties}
                  role="img"
                  aria-label={`3D map of Afwajh ${noun.many}${filter === "All" ? " across the UAE" : ` in ${filter}`}`}
                >
                  <rect x={-800} y={-800} width={MAP_W + 1600} height={MAP_H + 1600} fill="transparent" />
                  <Ground />
                </svg>

                {labels.map((l) => (
                  <span key={l.name} className="t-label pointer-events-none absolute -translate-x-1/2 whitespace-nowrap text-[10px] text-ivory/45 md:text-[11px]" style={{ ...pos(place(l.lng, l.lat)), zIndex: 1 }}>
                    {l.name}
                  </span>
                ))}

                {outlets.map((o) => {
                  const p = points.get(o.id) as Point;
                  const hidden = clustered && inCluster(o);
                  const isSelected = selected === o.id;
                  const isHot = hovered === o.id;
                  const dim = filter !== "All" && o.emirate !== filter;
                  return (
                    <button
                      key={o.id}
                      type="button"
                      inert={hidden}
                      aria-pressed={isSelected}
                      aria-label={`${o.name}, ${o.location}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        select(o);
                      }}
                      onMouseEnter={() => setHovered(o.id)}
                      onMouseLeave={() => setHovered(null)}
                      className={cn(
                        "group absolute -translate-x-1/2 -translate-y-[86%] transition-[opacity,width] duration-500",
                        clustered ? "w-12 md:w-14" : "w-[60px] md:w-20",
                        hidden ? "pointer-events-none opacity-0" : dim ? "opacity-50" : "opacity-100",
                      )}
                      style={{ ...pos(p), zIndex: isSelected ? 900 : isHot ? 800 : 10 + Math.round(p.y) }}
                    >
                      {isSelected && <GroundRing />}
                      <NameTag show={isSelected || isHot} accent={isSelected}>
                        {o.name}
                      </NameTag>
                      <span className={cn("block origin-bottom transition-transform duration-500 ease-[var(--ease-expo)]", isSelected ? "scale-125" : isHot ? "-translate-y-1 scale-115" : "group-hover:-translate-y-1 group-hover:scale-115")}>
                        <ShopModel kind={o.kind} className="block w-full" />
                      </span>
                    </button>
                  );
                })}

                {clusters.map((c) => {
                  const lit = c.members.some((m) => m.id === hovered);
                  return (
                    <button
                      key={c.emirate}
                      type="button"
                      inert={!clustered}
                      aria-label={`${c.emirate}: ${c.members.length} ${noun.many}. Zoom in`}
                      onClick={(e) => {
                        e.stopPropagation();
                        pickFilter(c.emirate);
                      }}
                      className={cn("group absolute w-[68px] -translate-x-1/2 -translate-y-[86%] transition-opacity duration-500 md:w-[84px]", clustered ? "opacity-100" : "pointer-events-none opacity-0")}
                      style={{ ...pos(c.at), zIndex: lit ? 800 : 10 + Math.round(c.at.y) }}
                    >
                      <NameTag show={lit}>{`${c.emirate} — view ${c.members.length} ${noun.many}`}</NameTag>
                      <span className={cn("relative block aspect-[92/72] origin-bottom transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-1 group-hover:scale-110", lit && "-translate-y-1 scale-110")}>
                        <ShopModel kind={clusterKinds[0]} className="absolute left-0 top-[6%] w-[62%]" />
                        <ShopModel kind={clusterKinds[1]} className="absolute right-0 top-[6%] w-[62%]" />
                        <ShopModel kind={clusterKinds[2]} className="absolute bottom-0 left-[14%] w-[72%]" />
                        <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-gold-light text-[12px] font-semibold text-emerald-deep shadow-lg ring-2 ring-emerald-deep md:h-7 md:w-7 md:text-[13px]">
                          {c.members.length}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 sm:absolute sm:inset-x-3 sm:bottom-3 sm:mt-0" aria-live="polite">
                {selectedOutlet ? (
                  <div key={selectedOutlet.id} className="relative flex animate-[fade-up_.6s_var(--ease-expo)_both] flex-col gap-4 border border-[var(--accent)]/45 bg-emerald-deep/95 p-5 shadow-2xl sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="button"
                      onClick={() => setSelected(null)}
                      aria-label={`Close ${noun.one} details`}
                      className="absolute right-1 top-1 flex h-11 w-11 items-center justify-center text-ivory/60 hover:text-ivory"
                    >
                      <Icon name="close" size={18} />
                    </button>
                    <div className="min-w-0 pr-8 sm:pr-0">
                      <p className="t-label flex gap-3 text-ivory/55">
                        <span className="text-[var(--accent)]">{selectedOutlet.kind}</span>
                        {selectedOutlet.emirate}
                      </p>
                      <h3 className="t-h4 mt-2">{selectedOutlet.name}</h3>
                      <p className="mt-1 flex items-start gap-1.5 text-[14px] text-ivory/75">
                        <Icon name="pin" size={16} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                        {selectedOutlet.location}
                      </p>
                    </div>
                    <a
                      href={directionsUrl(selectedOutlet)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 text-[15px] font-medium text-emerald-deep transition-transform hover:-translate-y-0.5 sm:mr-8"
                    >
                      <Icon name="navigate" size={18} />
                      Navigate
                      <span className="sr-only">to {selectedOutlet.name} (opens Google Maps)</span>
                    </a>
                  </div>
                ) : (
                  <p className="text-[13px] text-ivory/60 sm:pointer-events-none sm:inline-block sm:rounded-full sm:bg-emerald-deep/85 sm:px-4 sm:py-2 sm:text-ivory/75">
                    Tap a {noun.one} to see its name, address and directions.
                  </p>
                )}
              </div>
            </div>
            <p className="mt-3 text-[13px] text-ivory/60">Stylised map — {noun.one} positions are approximate.</p>
          </div>
        </div>

        <ul className="grid content-start gap-3 sm:grid-cols-2 lg:col-span-6" aria-live="polite">
          {list.map((o) => (
            <li
              key={o.id}
              id={`${idPrefix}${o.id}`}
              tabIndex={0}
              onMouseEnter={() => setHovered(o.id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(o.id)}
              onBlur={() => setHovered(null)}
              className={cn(
                "group flex animate-[fade-up_.7s_var(--ease-expo)_both] flex-col gap-4 border p-6 transition-colors duration-500",
                hovered === o.id || selected === o.id ? "border-[var(--accent)] bg-ivory/[0.05]" : "border-line-dark",
              )}
            >
              <span className="t-label flex items-center justify-between text-ivory/55">
                <span className="text-[var(--accent)]">{o.kind}</span>
                {o.emirate}
              </span>
              <h3 className="t-h4">{o.name}</h3>
              <p className="flex items-start gap-2 text-[15px] text-ivory/80">
                <Icon name="pin" size={18} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                {o.location}
              </p>
              <p className="text-[15px] leading-relaxed text-ivory/60">{o.description}</p>
              <div className="mt-auto flex flex-wrap items-center gap-x-6">
                <a href={directionsUrl(o)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-[14px] text-ivory/80 hover:text-gold-light">
                  Directions <Icon name="arrowUpRight" size={16} />
                  <span className="sr-only">to {o.name} (opens Google Maps)</span>
                </a>
                <button type="button" onClick={() => showOnMap(o)} className="inline-flex min-h-11 items-center text-[14px] text-ivory/60 hover:text-gold-light">
                  Show on map
                  <span className="sr-only">: {o.name}</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
