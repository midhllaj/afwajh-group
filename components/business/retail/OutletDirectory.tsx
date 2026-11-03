"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Icon from "@/components/ui/IconMini";
import type { Outlet } from "@/data/retail";
import { MAP_H, MAP_W, mapDots, outlinePath, project, viewBoxFor } from "@/lib/uaeMap";
import { cn } from "@/lib/utils";

const filters = ["All", "Dubai", "Abu Dhabi", "Sharjah", "Ras Al Khaimah"] as const;
type Filter = (typeof filters)[number];
const dots = mapDots(10);
const labels = [
  { name: "Dubai", lng: 55.36, lat: 25.13 },
  { name: "Abu Dhabi", lng: 54.45, lat: 24.32 },
  { name: "Sharjah", lng: 55.52, lat: 25.33 },
  { name: "Ras Al Khaimah", lng: 54.95, lat: 25.88 },
];

const parse = (vb: string) => vb.split(" ").map(Number);

/** Outlet directory: emirate filter + stylised UAE map with pins that zooms per emirate. */
export default function OutletDirectory({ outlets }: { outlets: Outlet[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [active, setActive] = useState<string | null>(null);
  const [vb, setVb] = useState(() => parse(viewBoxFor("All")));
  const vbRef = useRef(vb);

  const list = useMemo(() => (filter === "All" ? outlets : outlets.filter((o) => o.emirate === filter)), [filter, outlets]);
  const count = (f: Filter) => (f === "All" ? outlets.length : outlets.filter((o) => o.emirate === f).length);

  // Smoothly animate the map's viewBox to the selected emirate.
  useEffect(() => {
    const from = vbRef.current;
    const to = parse(viewBoxFor(filter));
    const reduce = !document.documentElement.classList.contains("motion");
    const start = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const t = reduce ? 1 : Math.min(1, (now - start) / 1000);
      const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const next = from.map((v, i) => v + (to[i] - v) * e);
      vbRef.current = next;
      setVb(next);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [filter]);

  const zoom = MAP_W / vb[2];
  const activeOutlet = outlets.find((o) => o.id === active);

  return (
    <div>
      <div role="group" aria-label="Filter outlets by emirate" className="no-scrollbar -mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] pb-2 md:mx-0 md:flex-wrap md:px-0">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => {
              setFilter(f);
              setActive(null);
            }}
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
            <div className="relative overflow-hidden border border-line-dark bg-emerald-deep">
              <svg viewBox={vb.join(" ")} className="block aspect-[950/760] w-full" role="img" aria-label={`Map of Afwajh outlets${filter === "All" ? " across the UAE" : ` in ${filter}`}`}>
                <rect x={-600} y={-600} width={MAP_W + 1200} height={MAP_H + 1200} fill="#0A2321" />
                <path d={outlinePath} fill="#0E2E2B" stroke="#E2C26A" strokeOpacity={0.35} strokeWidth={1.2 / zoom} />
                {dots.map((d, i) => (
                  <circle key={i} cx={d.x} cy={d.y} r={2 / zoom} fill="#F5F1E8" opacity={0.16} />
                ))}
                {labels.map((l) => {
                  const p = project(l.lng, l.lat);
                  return (
                    <text key={l.name} x={p.x} y={p.y} fill="#F5F1E8" fillOpacity={0.5} fontSize={22 / zoom} letterSpacing={3 / zoom} style={{ textTransform: "uppercase", fontFamily: "var(--font-sans)" }}>
                      {l.name}
                    </text>
                  );
                })}
                {outlets.map((o) => {
                  const p = project(o.lng, o.lat);
                  const on = filter === "All" || o.emirate === filter;
                  const hot = active === o.id;
                  return (
                    <g key={o.id} transform={`translate(${p.x} ${p.y})`} opacity={on ? 1 : 0.2} style={{ transition: "opacity .6s" }}>
                      <circle r={(hot ? 30 : 18) / zoom} fill="var(--accent)" opacity={0.22} />
                      <circle r={(hot ? 11 : 7.5) / zoom} fill={hot ? "#F5F1E8" : "var(--accent)"} stroke="#0A2321" strokeWidth={2.5 / zoom} />
                    </g>
                  );
                })}
              </svg>
              <div
                className={cn(
                  "pointer-events-none absolute inset-x-4 bottom-4 border border-line-dark bg-emerald-deep/90 p-4 backdrop-blur transition-[opacity,transform] duration-500",
                  activeOutlet ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                )}
              >
                <p className="t-h4">{activeOutlet?.name ?? " "}</p>
                <p className="text-[14px] text-ivory/65">{activeOutlet?.location ?? " "}</p>
              </div>
            </div>
            <p className="mt-3 text-[13px] text-ivory/60">Stylised map — pin positions are approximate.</p>
          </div>
        </div>

        <ul className="grid content-start gap-3 sm:grid-cols-2 lg:col-span-6" aria-live="polite">
          {list.map((o) => (
            <li
              key={o.id}
              id={o.id}
              tabIndex={0}
              onMouseEnter={() => setActive(o.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(o.id)}
              onBlur={() => setActive(null)}
              className={cn(
                "group flex animate-[fade-up_.7s_var(--ease-expo)_both] flex-col gap-4 border p-6 transition-colors duration-500",
                active === o.id ? "border-[var(--accent)] bg-ivory/[0.05]" : "border-line-dark",
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
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${o.name} ${o.location}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex min-h-11 items-center gap-2 text-[14px] text-ivory/80 hover:text-gold-light"
              >
                Directions <Icon name="arrowUpRight" size={16} />
                <span className="sr-only">to {o.name} (opens Google Maps)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
