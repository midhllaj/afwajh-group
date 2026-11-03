"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import DotMap from "@/components/ui/DotMap";
import { contact } from "@/data/site";

/**
 * Click-to-load Google Map: keeps third-party scripts and cookies off the page
 * until the visitor asks for the map (good for privacy and Lighthouse).
 */
export default function MapEmbed() {
  const [load, setLoad] = useState(false);
  const q = encodeURIComponent(contact.mapQuery);
  return (
    <div className="relative h-[420px] w-full overflow-hidden md:h-[520px]">
      {load ? (
        <iframe
          title="Map showing Afwajh Group head office at Trade Centre 1, Dubai"
          src={`https://www.google.com/maps?q=${q}&output=embed`}
          className="h-full w-full border-0 grayscale-[0.4] invert-[0.92] hue-rotate-180"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="grain flex h-full w-full items-center justify-center bg-emerald-900">
          <DotMap className="absolute inset-0 m-auto h-full w-auto max-w-none text-teal/40" />
          <div className="relative flex flex-col items-center gap-5 px-6 text-center">
            <p className="font-serif text-3xl text-ivory md:text-4xl">Trade Centre 1, Sheikh Zayed Rd, Dubai</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button onClick={() => setLoad(true)}>Show map</Button>
              <Button href={`https://www.google.com/maps/search/?api=1&query=${q}`} variant="outline" external>
                Open in Google Maps
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
