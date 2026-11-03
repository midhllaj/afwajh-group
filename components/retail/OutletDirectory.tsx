"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import Icon from "@/components/ui/Icon";
import { outlets, type Outlet } from "@/data/retail";
import { emirates } from "@/data/site";
import { MAP_H, MAP_W, mapDots, outlinePath, project, viewBoxFor } from "@/lib/uaeMap";
import { cn } from "@/lib/utils";

const filters = ["All", ...emirates] as const;
type Filter = (typeof filters)[number];
const dots = mapDots(10);

/** Premium outlet directory: emirate filter, stylised SVG map with pins, outlet cards. */
export default function OutletDirectory() {
  const [filter, setFilter] = useState<Filter>("All");
  const [active, setActive] = useState<string | null>(null);
  const reduce = useReducedMotion();

  const list = useMemo(() => (filter === "All" ? outlets : outlets.filter((o) => o.emirate === filter)), [filter]);
  const counts = useMemo(
    () => Object.fromEntries(filters.map((f) => [f, f === "All" ? outlets.length : outlets.filter((o) => o.emirate === f).length])),
    [],
  );
  const viewBox = viewBoxFor(filter);
  // Scale pins so they stay the same visual size when zoomed.
  const zoom = MAP_W / Number(viewBox.split(" ")[2]);

  return (
    <div>
      {/* Filter */}
      <div role="tablist" aria-label="Filter outlets by emirate" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:px-0">
        {filters.map((f) => (
          <button
            key={f}
            role="tab"
            type="button"
            aria-selected={filter === f}
            onClick={() => {
              setFilter(f);
              setActive(null);
            }}
            className={cn(
              "flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-5 text-sm font-medium transition-colors",
              filter === f ? "border-gold-light bg-gold-light text-emerald-950" : "border-ivory/20 text-ivory/85 hover:border-gold-light/60",
            )}
          >
            {f === "All" ? "All emirates" : f}
            <span className={cn("text-xs", filter === f ? "text-emerald-900/70" : "text-ivory/50")}>{counts[f]}</span>
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-12">
        {/* Map */}
        <div className="lg:col-span-6">
          <div className="lg:sticky lg:top-28">
            <div className="relative overflow-hidden border border-gold-light/15 bg-emerald-900">
              <m.svg
                viewBox={viewBoxFor("All")}
                animate={{ viewBox }}
                transition={{ duration: reduce ? 0 : 1.1, ease: [0.76, 0, 0.24, 1] }}
                className="block aspect-[950/760] w-full"
                role="img"
                aria-label={`Map of Afwajh retail outlets${filter === "All" ? " across the UAE" : ` in ${filter}`}`}
              >
                <rect x="-500" y="-500" width={MAP_W + 1000} height={MAP_H + 1000} fill="#0B2826" />
                <path d={outlinePath} fill="#0F3532" stroke="#E2C26A" strokeOpacity="0.35" strokeWidth={1.2 / zoom} />
                {dots.map((d, i) => (
                  <circle key={i} cx={d.x} cy={d.y} r={2.2 / zoom} fill="#0FA08A" opacity={0.35} />
                ))}
                {outlets.map((o) => {
                  const p = project(o.lng, o.lat);
                  const on = filter === "All" || o.emirate === filter;
                  const hot = active === o.id;
                  return (
                    <g
                      key={o.id}
                      transform={`translate(${p.x} ${p.y})`}
                      opacity={on ? 1 : 0.18}
                      style={{ transition: "opacity .6s" }}
                      onMouseEnter={() => setActive(o.id)}
                      onMouseLeave={() => setActive(null)}
                    >
                      <circle r={(hot ? 30 : 20) / zoom} fill="#E2C26A" opacity={0.18}>
                        {!reduce && on && <animate attributeName="r" values={`${14 / zoom};${32 / zoom};${14 / zoom}`} dur="2.6s" repeatCount="indefinite" />}
                      </circle>
                      <circle r={(hot ? 12 : 8.5) / zoom} fill={hot ? "#F6F2EA" : "#E2C26A"} stroke="#0B2826" strokeWidth={2.5 / zoom} />
                    </g>
                  );
                })}
                {/* Emirate labels */}
                {[
                  { name: "Dubai", lng: 55.33, lat: 25.13 },
                  { name: "Abu Dhabi", lng: 54.45, lat: 24.32 },
                  { name: "Sharjah", lng: 55.5, lat: 25.33 },
                  { name: "Ras Al Khaimah", lng: 54.95, lat: 25.88 },
                ].map((l) => {
                  const p = project(l.lng, l.lat);
                  return (
                    <text
                      key={l.name}
                      x={p.x}
                      y={p.y}
                      fill="#F6F2EA"
                      fillOpacity={0.55}
                      fontSize={24 / zoom}
                      letterSpacing={3 / zoom}
                      style={{ textTransform: "uppercase", fontFamily: "var(--font-manrope)" }}
                    >
                      {l.name}
                    </text>
                  );
                })}
              </m.svg>
              <AnimatePresence>
                {active && (
                  <m.div
                    key={active}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="pointer-events-none absolute bottom-4 left-4 right-4 border border-gold-light/30 bg-emerald-950/90 p-4 backdrop-blur"
                  >
                    <p className="font-serif text-xl text-ivory">{outlets.find((o) => o.id === active)?.name}</p>
                    <p className="text-sm text-ivory/65">{outlets.find((o) => o.id === active)?.location}</p>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
            <p className="mt-3 text-xs text-ivory/45">Stylised map — pin positions are approximate.</p>
          </div>
        </div>

        {/* Cards */}
        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-6" aria-live="polite">
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((o, i) => (
              <OutletCard key={o.id} outlet={o} i={i} active={active === o.id} onHover={setActive} />
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}

function OutletCard({ outlet: o, i, active, onHover }: { outlet: Outlet; i: number; active: boolean; onHover: (id: string | null) => void }) {
  return (
    <m.li
      id={o.id}
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.6, delay: Math.min(i * 0.04, 0.3), ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => onHover(o.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(o.id)}
      onBlur={() => onHover(null)}
      tabIndex={0}
      className={cn(
        "group relative flex flex-col gap-4 border bg-emerald-900/60 p-6 transition-colors duration-500",
        active ? "border-gold-light/70 bg-emerald-700/40" : "border-ivory/10",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-full border border-teal/50 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-teal-light">{o.kind}</span>
        <span className="text-xs uppercase tracking-[0.14em] text-ivory/50">{o.emirate}</span>
      </div>
      <h3 className="font-serif text-[1.7rem] leading-tight text-ivory">{o.name}</h3>
      <p className="flex items-start gap-2 text-sm text-gold-light">
        <Icon name="pin" className="mt-0.5 h-4 w-4" />
        {o.location}
      </p>
      <p className="text-[0.92rem] leading-relaxed text-ivory/70">{o.description}</p>
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${o.name} ${o.location}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex min-h-11 items-center gap-2 pt-2 text-sm font-semibold text-ivory/85 hover:text-gold-light"
      >
        Get directions <Icon name="arrowUpRight" className="h-4 w-4" />
        <span className="sr-only">to {o.name} (opens Google Maps)</span>
      </a>
    </m.li>
  );
}
