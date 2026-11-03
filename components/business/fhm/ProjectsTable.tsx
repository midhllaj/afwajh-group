"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Project } from "@/data/fhm";
import { cn, formatAED } from "@/lib/utils";

const filters = ["All", "Gardinia / Azizi", "BT Properties", "Western Bainoona Group"] as const;
type Filter = (typeof filters)[number];

function useCountTo(value: number, duration = 1400) {
  const [v, setV] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const e = 1 - Math.pow(2, -10 * t);
      const cur = a + (value - a) * (t === 1 ? 1 : e);
      from.current = cur;
      setV(cur);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return v;
}

/** Filterable, sortable FHM project table (cards on mobile) with an animated total. */
export default function ProjectsTable({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [sort, setSort] = useState<"value" | "name">("value");
  const list = useMemo(() => {
    const l = filter === "All" ? projects : projects.filter((p) => p.clientGroup === filter);
    return [...l].sort((a, b) => (sort === "value" ? b.value - a.value : a.name.localeCompare(b.name)));
  }, [filter, sort, projects]);
  const total = list.reduce((s, p) => s + p.value, 0);
  const shown = useCountTo(total);
  const max = Math.max(...projects.map((p) => p.value));

  return (
    <div>
      <div className="grid gap-px border border-line-light bg-line-light sm:grid-cols-[2fr_1fr]">
        <div className="bg-ivory p-6 md:p-8">
          <p className="t-label text-ink/65">{filter === "All" ? "Total portfolio value" : `Portfolio value — ${filter}`}</p>
          <p className="t-num mt-3 text-[clamp(2.2rem,1.4rem+3vw,4.5rem)] leading-none" aria-live="polite">
            <span className="mr-2 text-[0.45em] text-ink/60">AED</span>
            {formatAED(shown)}
          </p>
        </div>
        <div className="bg-ivory p-6 md:p-8">
          <p className="t-label text-ink/65">Projects</p>
          <p className="t-num mt-3 text-[clamp(2.2rem,1.4rem+3vw,4.5rem)] leading-none">{String(list.length).padStart(2, "0")}</p>
        </div>
      </div>

      <div className="mt-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div role="group" aria-label="Filter projects by client" className="no-scrollbar -mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] md:mx-0 md:px-0">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={cn(
                "min-h-12 shrink-0 rounded-full border px-5 text-[15px] transition-colors",
                filter === f ? "border-[var(--accent)] bg-[var(--accent)] text-white" : "border-ink/20 text-ink/80 hover:border-ink/50",
              )}
            >
              {f === "All" ? "All clients" : f}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-3 text-[15px] text-ink/70">
          Sort
          <select value={sort} onChange={(e) => setSort(e.target.value as "value" | "name")} className="min-h-12 rounded-full border border-ink/20 bg-transparent px-4">
            <option value="value">Value, high to low</option>
            <option value="name">Name, A–Z</option>
          </select>
        </label>
      </div>

      <div className="mt-8 hidden md:block">
        <table className="w-full text-left text-[15px]">
          <caption className="sr-only">FHM General Transport major projects</caption>
          <thead className="t-label border-b border-ink/20 text-ink/60">
            <tr>
              <th scope="col" className="py-4 pr-4 font-medium">Project</th>
              <th scope="col" className="py-4 pr-4 font-medium">Client</th>
              <th scope="col" className="py-4 pr-4 font-medium">Location</th>
              <th scope="col" className="py-4 pr-4 font-medium">Reference</th>
              <th scope="col" className="py-4 text-right font-medium">Value (AED)</th>
            </tr>
          </thead>
          <tbody>
            {list.map((p) => (
              <tr key={p.id} className="animate-[fade-up_.6s_var(--ease-expo)_both] border-b border-line-light align-top transition-colors hover:bg-ink/[0.03]">
                <th scope="row" className="py-5 pr-4 font-normal">
                  <span className="t-h4 block">{p.name}</span>
                  <span className="mt-1 block max-w-sm text-[13px] text-ink/65">{p.description}</span>
                </th>
                <td className="py-5 pr-4 text-ink/75">{p.client}</td>
                <td className="py-5 pr-4 text-ink/75">{p.location}</td>
                <td className="py-5 pr-4 font-mono text-[12px] text-ink/65">{p.reference}</td>
                <td className="py-5 text-right">
                  <span className="t-num text-lg">{formatAED(p.value)}</span>
                  <span className="ml-auto mt-2 block h-[3px] w-28 bg-ink/10">
                    <span className="block h-full bg-[var(--accent)] transition-[width] duration-1000" style={{ width: `${(p.value / max) * 100}%` }} />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="mt-6 grid gap-3 md:hidden">
        {list.map((p) => (
          <li key={p.id} className="animate-[fade-up_.6s_var(--ease-expo)_both] border border-line-light p-5">
            <p className="t-h4">{p.name}</p>
            <p className="mt-1 text-[14px] text-ink/60">{p.client}</p>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-[14px]">
              <div>
                <dt className="t-label text-[10px] text-ink/60">Location</dt>
                <dd>{p.location}</dd>
              </div>
              <div>
                <dt className="t-label text-[10px] text-ink/60">Value</dt>
                <dd className="t-num">AED {formatAED(p.value)}</dd>
              </div>
              <div className="col-span-2">
                <dt className="t-label text-[10px] text-ink/60">Reference</dt>
                <dd className="break-all font-mono text-[12px] text-ink/60">{p.reference}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </div>
  );
}
