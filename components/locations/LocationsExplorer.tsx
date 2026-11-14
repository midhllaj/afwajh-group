"use client";

import { useState } from "react";
import OutletDirectory from "@/components/business/retail/OutletDirectory";
import type { ModelKind } from "@/components/business/retail/ShopModel";
import { outlets } from "@/data/retail";
import { venues } from "@/data/restaurants";
import { cn } from "@/lib/utils";

const categories = [
  {
    id: "all",
    label: "Everything",
    places: [...outlets, ...venues],
    noun: { one: "location", many: "locations" },
    clusterKinds: ["Cafe", "Minimart", "Supermarket"] as [ModelKind, ModelKind, ModelKind],
  },
  {
    id: "stores",
    label: "Supermarkets & minimarts",
    places: outlets,
    noun: { one: "shop", many: "shops" },
    clusterKinds: ["Minimart", "Market", "Supermarket"] as [ModelKind, ModelKind, ModelKind],
  },
  {
    id: "dining",
    label: "Cafes & restaurants",
    places: venues,
    noun: { one: "venue", many: "venues" },
    clusterKinds: ["Cafe", "Cafeteria", "Restaurant"] as [ModelKind, ModelKind, ModelKind],
  },
] as const;

type CategoryId = (typeof categories)[number]["id"];

/** Every Afwajh shop, cafe and restaurant on one map, with a switch between the two kinds. */
export default function LocationsExplorer() {
  const [category, setCategory] = useState<CategoryId>("all");
  const active = categories.find((c) => c.id === category) ?? categories[0];

  return (
    <div>
      <div role="group" aria-label="Show locations by type" className="inline-flex max-w-full flex-wrap gap-1 rounded-[28px] border border-line-dark bg-ivory/[0.04] p-1">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={category === c.id}
            onClick={() => setCategory(c.id)}
            className={cn(
              "flex min-h-12 items-center gap-2.5 rounded-full px-5 text-[15px] transition-colors",
              category === c.id ? "bg-ivory text-emerald-deep" : "text-ivory/75 hover:text-ivory",
            )}
          >
            {c.label}
            <span className={cn("t-label", category === c.id ? "text-emerald-deep/60" : "text-ivory/50")}>{String(c.places.length).padStart(2, "0")}</span>
          </button>
        ))}
      </div>

      <div className="mt-6">
        <OutletDirectory key={active.id} outlets={[...active.places]} noun={active.noun} clusterKinds={active.clusterKinds} />
      </div>
    </div>
  );
}
