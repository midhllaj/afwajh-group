import type { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import LocationsExplorer from "@/components/locations/LocationsExplorer";
import { outlets } from "@/data/retail";
import { venues } from "@/data/restaurants";
import { pageMetadata } from "@/lib/seo";

const total = outlets.length + venues.length;

export const metadata: Metadata = pageMetadata({
  title: "Our Locations",
  description: `Find every Afwajh Group location on one map — ${outlets.length} supermarkets and minimarts and ${venues.length} cafes and restaurants across Dubai, Abu Dhabi, Sharjah and Ras Al Khaimah, with directions.`,
  path: "/locations",
});

const title = [`${total} places,`, "*four* emirates"];

export default function LocationsPage() {
  return (
    <section id="map" className="grain relative isolate bg-emerald-deep pb-20 pt-[calc(var(--header-h)+3rem)] text-ivory md:pb-36" aria-labelledby="map-title">
      <div className="wrap">
        <Breadcrumbs items={[{ label: "Locations" }]} />

        <div className="grid-12 mt-14 gap-y-8">
          <div className="col-span-12 lg:col-span-7">
            <p className="hero-fade t-label flex items-center gap-4 text-ivory/75" style={{ ["--d" as string]: 0.1 }}>
              <span className="h-px w-10 bg-gold" aria-hidden="true" />
              Every store, every table
            </p>
            <h1 id="map-title" className="t-h2 mt-8">
              {title.map((line, i) => (
                <span key={i} className="hero-line line-mask">
                  <span style={{ ["--d" as string]: 0.15 + i * 0.1 }}>
                    {line.split(/(\*[^*]+\*)/g).map((part, pi) =>
                      part.startsWith("*") ? (
                        <em key={pi} className="accent-word">
                          {part.slice(1, -1)}
                        </em>
                      ) : (
                        part
                      ),
                    )}
                  </span>
                </span>
              ))}
            </h1>
          </div>
          <p className="hero-fade col-span-12 text-ivory/70 lg:col-span-4 lg:col-start-9 lg:self-end" style={{ ["--d" as string]: 0.4 }}>
            {outlets.length} supermarkets and minimarts and {venues.length} cafes and restaurants. Switch between shops and dining, filter by emirate,
            then tap any pin for its address and directions.
          </p>
        </div>

        <div className="hero-fade mt-14 md:mt-16" style={{ ["--d" as string]: 0.55 }}>
          <LocationsExplorer />
        </div>
      </div>
    </section>
  );
}
