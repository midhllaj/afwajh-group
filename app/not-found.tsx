import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Skyline from "@/components/ui/Skyline";
import { businesses } from "@/data/businesses";
import TLink from "@/components/ui/TLink";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[100svh] items-center overflow-hidden bg-emerald-800 pb-40 pt-[calc(var(--header-h)+3rem)]">
      <Skyline className="absolute inset-x-0 bottom-0 h-48 text-gold-light/10 md:h-64" />
      <div className="container-x relative grid-12 items-center gap-y-12">
        <div className="col-span-12 lg:col-span-7">
          <p className="eyebrow text-gold-light">Error 404</p>
          <h1 className="display-xl mt-6 text-ivory">
            Lost in the <span className="text-gold-gradient italic">dunes.</span>
          </h1>
          <p className="lead mt-8 max-w-lg text-ivory/75">The page you’re looking for has moved or doesn’t exist. Let’s get you back on the road.</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href="/">Back to home</Button>
            <Button href="/contact" variant="outline">
              Contact us
            </Button>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4 lg:col-start-9">
          <Image src="/images/logos/afwajh-mark.png" alt="" width={600} height={520} className="mx-auto w-40 opacity-90 lg:w-full lg:max-w-[280px]" />
          <ul className="mt-10 space-y-2 text-sm">
            {businesses.map((b) => (
              <li key={b.slug}>
                <TLink href={b.href} className="text-ivory/70 hover:text-gold-light">
                  {b.index} · {b.name}
                </TLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
