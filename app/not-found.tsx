import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import TLink from "@/components/ui/TLink";
import Skyline from "@/components/brand/Skyline";
import { Mark } from "@/components/brand/Logo";
import { businesses } from "@/data/businesses";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[100svh] items-center overflow-hidden bg-emerald-deep pb-48 pt-[calc(var(--header-h)+3rem)] text-ivory">
      <Skyline className="absolute inset-x-0 bottom-0 h-48 text-gold-light/10 md:h-64" />
      <div className="wrap relative grid-12 items-center gap-y-14">
        <div className="col-span-12 lg:col-span-7">
          <p className="t-label text-gold-light">Error 404</p>
          <h1 className="t-hero mt-6">
            Lost in the <em className="accent-word text-gold">dunes.</em>
          </h1>
          <p className="t-lead mt-8 max-w-lg text-ivory/75">This page has moved or doesn’t exist. Let’s get you back on the road.</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href="/">Back to home</Button>
            <Button href="/contact" variant="outline-light">
              Contact us
            </Button>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4 lg:col-start-9">
          <Mark id="nf" className="w-32 lg:w-48" />
          <ul className="mt-10 space-y-2 text-[15px]">
            {businesses.map((b) => (
              <li key={b.slug}>
                <TLink href={b.href} className="text-ivory/70 hover:text-gold-light">
                  <span className="t-label mr-3 text-ivory/55">{b.index}</span>
                  {b.name}
                </TLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
