"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import Counter from "@/components/ui/Counter";
import { projects } from "@/data/fhm";
import { cn, formatAED } from "@/lib/utils";

const filters = ["All", "Gardinia / Azizi", "BT Properties", "Western Bainoona Group"] as const;
type Filter = (typeof filters)[number];
type Sort = "value" | "name";

/** Filterable, sortable FHM project table (cards on mobile) with animated totals. */
export default function ProjectsExplorer() {
  const [filter, setFilter] = useState<Filter>("All");
  const [sort, setSort] = useState<Sort>("value");

  const list = useMemo(() => {
    const l = filter === "All" ? projects : projects.filter((p) => p.clientGroup === filter);
    return [...l].sort((a, b) => (sort === "value" ? b.value - a.value : a.name.localeCompare(b.name)));
  }, [filter, sort]);
  const total = list.reduce((s, p) => s + p.value, 0);
  const max = Math.max(...projects.map((p) => p.value));

  return (
    <div>
      <div className="grid gap-px border border-ivory/10 bg-ivory/10 sm:grid-cols-3">
        <div className="bg-emerald-900 p-6 md:p-8 sm:col-span-2">
          <p className="eyebrow text-[#6fb6ea]">{filter === "All" ? "Total portfolio value" : `Portfolio value · ${filter}`}</p>
          <p className="mt-3 font-serif text-[2.4rem] leading-none text-ivory sm:text-5xl md:text-6xl">
            <span className="mr-2 text-[0.5em] text-ivory/60">AED</span>
            <Counter key={filter} value={total} decimals={2} duration={1.6} />
          </p>
        </div>
        <div className="bg-emerald-900 p-6 md:p-8">
          <p className="eyebrow text-[#6fb6ea]">Projects</p>
          <p className="mt-3 font-serif text-5xl leading-none text-ivory md:text-6xl">
            <Counter key={filter} value={list.length} duration={1} />
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div role="tablist" aria-label="Filter projects by client" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={cn(
                "min-h-11 shrink-0 rounded-full border px-5 text-sm font-medium transition-colors",
                filter === f ? "border-fhm-blue bg-fhm-blue text-white" : "border-ivory/20 text-ivory/85 hover:border-[#6fb6ea]",
              )}
            >
              {f === "All" ? "All clients" : f}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-3 text-sm text-ivory/70">
          Sort by
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="min-h-11 rounded-full border border-ivory/20 bg-emerald-900 px-4 text-ivory [color-scheme:dark]"
          >
            <option value="value">Value (high–low)</option>
            <option value="name">Name (A–Z)</option>
          </select>
        </label>
      </div>

      {/* Table — md and up */}
      <div className="mt-8 hidden overflow-hidden border border-ivory/10 md:block">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">FHM General Transport major projects</caption>
          <thead className="bg-emerald-950/60 text-xs uppercase tracking-[0.14em] text-ivory/55">
            <tr>
              <th scope="col" className="px-5 py-4 font-semibold">Project</th>
              <th scope="col" className="px-5 py-4 font-semibold">Client</th>
              <th scope="col" className="px-5 py-4 font-semibold">Location</th>
              <th scope="col" className="px-5 py-4 font-semibold">Reference</th>
              <th scope="col" className="px-5 py-4 text-right font-semibold">Value (AED)</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false} mode="popLayout">
              {list.map((p) => (
                <m.tr
                  layout
                  key={p.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="group border-t border-ivory/10 align-top transition-colors hover:bg-emerald-700/30"
                >
                  <th scope="row" className="px-5 py-5 font-normal">
                    <span className="block font-serif text-xl text-ivory">{p.name}</span>
                    <span className="mt-1 block max-w-sm text-xs leading-relaxed text-ivory/55">{p.description}</span>
                  </th>
                  <td className="px-5 py-5 text-ivory/80">{p.client}</td>
                  <td className="px-5 py-5 text-ivory/80">{p.location}</td>
                  <td className="px-5 py-5 font-mono text-xs text-ivory/60">{p.reference}</td>
                  <td className="px-5 py-5 text-right">
                    <span className="font-serif text-xl text-ivory">{formatAED(p.value)}</span>
                    <span className="mt-2 ml-auto block h-1 w-28 overflow-hidden rounded-full bg-ivory/10">
                      <m.span
                        className="block h-full rounded-full bg-fhm-blue"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(p.value / max) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </span>
                  </td>
                </m.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Cards — mobile */}
      <ul className="mt-6 grid gap-3 md:hidden">
        {list.map((p) => (
          <li key={p.id} className="border border-ivory/10 bg-emerald-900/60 p-5">
            <p className="font-serif text-2xl leading-tight text-ivory">{p.name}</p>
            <p className="mt-1 text-sm text-ivory/65">{p.client}</p>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-[0.12em] text-ivory/45">Location</dt>
                <dd className="text-ivory/85">{p.location}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.12em] text-ivory/45">Value</dt>
                <dd className="font-serif text-lg text-ivory">AED {formatAED(p.value)}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-xs uppercase tracking-[0.12em] text-ivory/45">Reference</dt>
                <dd className="break-all font-mono text-xs text-ivory/65">{p.reference}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </div>
  );
}
