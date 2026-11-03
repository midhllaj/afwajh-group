"use client";

import { useState } from "react";
import { contact } from "@/data/site";
import { mapDots, project } from "@/lib/uaeMap";

const dots = mapDots(8);
const office = project(contact.geo.lng, contact.geo.lat);

/** Click-to-load Google Map: no third-party scripts or cookies until requested. */
export default function MapEmbed() {
  const [load, setLoad] = useState(false);
  const q = encodeURIComponent(contact.mapQuery);
  return (
    <div className="relative h-[460px] w-full overflow-hidden bg-emerald-deep md:h-[560px]">
      {load ? (
        <iframe
          title="Map showing Afwajh Group head office at Trade Centre 1, Dubai"
          src={`https://www.google.com/maps?q=${q}&output=embed`}
          className="h-full w-full border-0 [filter:grayscale(.5)_invert(.9)_hue-rotate(180deg)]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <>
          <svg viewBox={`${office.x - 260} ${office.y - 170} 520 340`} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            {dots.map((d, i) => (
              <circle key={i} cx={d.x} cy={d.y} r={1.6} fill="#F5F1E8" opacity={0.16} />
            ))}
            <circle cx={office.x} cy={office.y} r={14} fill="#E2C26A" opacity={0.25} />
            <circle cx={office.x} cy={office.y} r={5} fill="#E2C26A" />
          </svg>
          <div className="relative flex h-full flex-col items-center justify-center gap-6 px-6 text-center text-ivory">
            <p className="t-label text-gold-light">Head office</p>
            <p className="t-h3 max-w-lg">Trade Centre 1, Sheikh Zayed Road, Dubai</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={() => setLoad(true)} className="min-h-[52px] rounded-full bg-gold px-7 text-[15px] font-medium text-emerald-deep">
                Show interactive map
              </button>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${q}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[52px] items-center justify-center rounded-full border border-ivory/30 px-7 text-[15px] hover:border-gold-light"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
