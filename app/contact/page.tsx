import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "@/components/ui/PageHero";
import Kicker from "@/components/ui/Kicker";
import Rich from "@/components/ui/Rich";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import TLink from "@/components/ui/TLink";
import ContactForm from "@/components/forms/ContactForm";
import MapEmbed from "@/components/contact/MapEmbed";
import { businesses } from "@/data/businesses";
import { contact } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description: "Contact Afwajh Group of Companies — head office at Trade Centre 1, Sheikh Zayed Road, Dubai. Tel +971 4 294 4870 · afwajhgroup1@gmail.com.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact"
        title={["Let’s start a", "*conversation*"]}
        intro="Tell us what you need — we’ll connect you with the right Afwajh business."
        image={{ src: "/images/home/dubai-skyline-silhouette.webp", alt: "Silhouette of the Dubai skyline at sunset", illustrative: true }}
        crumbs={[{ label: "Contact" }]}
        short
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={contact.tel.href} icon="phone">
            {contact.tel.display}
          </Button>
          <Button href={contact.whatsapp.href} variant="outline-light" external icon="whatsapp">
            WhatsApp
          </Button>
          <Button href={`mailto:${contact.email}`} variant="outline-light" icon="mail">
            Email us
          </Button>
        </div>
      </PageHero>

      <section className="grain bg-emerald py-28 text-ivory md:py-36" aria-labelledby="form-title">
        <div className="wrap grid-12 gap-y-16">
          <div className="col-span-12 lg:col-span-4">
            <Kicker index="01">Head office</Kicker>
            <h2 className="t-h3 mt-8">{`Afwajh Group of Companies`}</h2>
            <address className="mt-10 space-y-5 not-italic text-ivory/85">
              <p className="flex gap-4">
                <Icon name="pin" size={22} className="shrink-0 text-gold-light" />
                <span>
                  {contact.address.line1}
                  <br />
                  {contact.address.city}, {contact.address.country}
                  <br />
                  {contact.address.poBox}
                </span>
              </p>
              <a href={contact.tel.href} className="flex gap-4 hover:text-gold-light">
                <Icon name="phone" size={22} className="text-gold-light" /> Tel {contact.tel.display}
              </a>
              {contact.mobiles.map((m) => (
                <a key={m.href} href={m.href} className="flex gap-4 hover:text-gold-light">
                  <Icon name="phone" size={22} className="text-gold-light" /> Mob {m.display}
                </a>
              ))}
              <a href={`mailto:${contact.email}`} className="flex gap-4 break-all hover:text-gold-light">
                <Icon name="mail" size={22} className="shrink-0 text-gold-light" /> {contact.email}
              </a>
              <p className="flex gap-4">
                <Icon name="globe" size={22} className="text-gold-light" /> {contact.website}
              </p>
            </address>
          </div>
          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            <h2 id="form-title" className="t-h2" data-split>
              <Rich text={"Send us a *message*"} />
            </h2>
            <div className="mt-12" data-reveal>
              <Suspense fallback={null}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Head office map">
        <MapEmbed />
      </section>

      <section className="tone-light bg-ivory py-28 md:py-36" aria-labelledby="teams-title">
        <div className="wrap">
          <Kicker index="02" tone="light">
            Contact a business
          </Kicker>
          <h2 id="teams-title" className="t-h2 mt-8" data-split>
            <Rich text={"Reach the\nright *team*"} />
          </h2>
          <ul className="mt-16 grid gap-px border border-line-light bg-line-light sm:grid-cols-2 lg:grid-cols-3">
            {businesses.map((b, i) => (
              <li key={b.slug} className="flex flex-col bg-ivory p-7 md:p-8" style={{ ["--accent" as string]: b.accent }} data-reveal data-delay={String((i % 3) * 0.05)}>
                <span className="t-label flex items-center gap-3 text-ink/65">
                  <span className="text-[var(--accent)]">{b.index}</span> {b.label}
                </span>
                <h3 className="t-h4 mt-3">{b.name}</h3>
                {b.contact.address && <p className="mt-2 text-[14px] text-ink/65">{b.contact.address}</p>}
                <div className="mt-6 space-y-2 text-[15px]">
                  <a href={b.contact.phones[0].href} className="flex items-center gap-3 hover:text-ink/70">
                    <Icon name="phone" size={18} className="text-[var(--accent)]" /> {b.contact.phones[0].display}
                  </a>
                  <a href={`mailto:${b.contact.email}`} className="flex items-center gap-3 break-all hover:text-ink/70">
                    <Icon name="mail" size={18} className="shrink-0 text-[var(--accent)]" /> {b.contact.email}
                  </a>
                </div>
                <TLink href={b.href} className="t-label mt-auto inline-flex min-h-11 items-center gap-2 pt-8 text-ink/70 hover:text-ink">
                  Visit page <Icon name="arrowUpRight" size={16} />
                </TLink>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
