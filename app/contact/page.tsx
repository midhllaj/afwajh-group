import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal, { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import TLink from "@/components/ui/TLink";
import ContactForm from "@/components/forms/ContactForm";
import MapEmbed from "@/components/contact/MapEmbed";
import { businesses } from "@/data/businesses";
import { fhm } from "@/data/fhm";
import { contact } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Contact Afwajh Group of Companies — head office at Trade Centre 1, Sheikh Zayed Road, Dubai. Tel +971 4 294 4870 · afwajhgroup1@gmail.com.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={"Let’s start a\n*conversation*"}
        intro="Tell us what you need — our team will connect you with the right Afwajh business."
        breadcrumb={[{ label: "Contact" }]}
        compact
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={contact.tel.href} arrow={false}>
            <Icon name="phone" className="h-5 w-5" /> {contact.tel.display}
          </Button>
          <Button href={contact.whatsapp.href} variant="outline" external arrow={false}>
            <Icon name="whatsapp" className="h-5 w-5" /> WhatsApp
          </Button>
          <Button href={`mailto:${contact.email}`} variant="outline" arrow={false}>
            <Icon name="mail" className="h-5 w-5" /> Email us
          </Button>
        </div>
      </PageHero>

      {/* Form + head office */}
      <section className="grain bg-emerald-900 py-24 md:py-32">
        <div className="container-x grid-12 gap-y-16">
          <div className="col-span-12 lg:col-span-5">
            <SectionHeader eyebrow="Head office" title={"Afwajh Group\nof *Companies*"} />
            <Reveal delay={0.1}>
              <address className="mt-10 space-y-5 not-italic text-ivory/85">
                <p className="flex gap-4">
                  <Icon name="pin" className="h-5 w-5 text-gold-light" />
                  <span>
                    {contact.address.line1}
                    <br />
                    {contact.address.city}, {contact.address.country}
                    <br />
                    {contact.address.poBox}
                  </span>
                </p>
                <a href={contact.tel.href} className="flex gap-4 hover:text-gold-light">
                  <Icon name="phone" className="h-5 w-5 text-gold-light" /> Tel {contact.tel.display}
                </a>
                {contact.mobiles.map((m) => (
                  <a key={m.href} href={m.href} className="flex gap-4 hover:text-gold-light">
                    <Icon name="phone" className="h-5 w-5 text-gold-light" /> Mobile {m.display}
                  </a>
                ))}
                <a href={`mailto:${contact.email}`} className="flex gap-4 hover:text-gold-light">
                  <Icon name="mail" className="h-5 w-5 text-gold-light" /> {contact.email}
                </a>
                <p className="flex gap-4">
                  <Icon name="globe" className="h-5 w-5 text-gold-light" /> {contact.website}
                </p>
              </address>
            </Reveal>
          </div>
          <Reveal className="col-span-12 lg:col-span-6 lg:col-start-7" delay={0.1}>
            <h2 className="display-sm mb-10 text-ivory">Send us a message</h2>
            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>
          </Reveal>
        </div>
      </section>

      {/* Map */}
      <section aria-label="Head office map" className="bg-emerald-950">
        <MapEmbed />
      </section>

      {/* Business cards */}
      <section className="on-light bg-ivory py-24 text-ink md:py-32">
        <div className="container-x">
          <SectionHeader eyebrow="Contact a business" title={"Reach the right\n*team*"} tone="light" />
          <RevealGroup as="ul" className="mt-16 grid gap-px border border-emerald-900/10 bg-emerald-900/10 sm:grid-cols-2 lg:grid-cols-3">
            {businesses.map((b) => {
              const isFhm = b.slug === "fhm-transport";
              const phone = isFhm ? fhm.contact.phones[0] : contact.tel;
              const email = isFhm ? fhm.contact.email : contact.email;
              return (
                <RevealItem as="li" key={b.slug} className="flex flex-col bg-ivory p-7">
                  <span className="font-serif text-sm italic text-gold-deep">{b.index}</span>
                  <h3 className="mt-2 font-serif text-2xl leading-tight text-emerald-900">{b.name}</h3>
                  <p className="mt-2 text-sm text-muted">{isFhm ? fhm.contact.address : "Via Afwajh Group head office"}</p>
                  <div className="mt-6 space-y-2 text-[0.95rem]">
                    <a href={phone.href} className="flex items-center gap-3 text-emerald-900 hover:text-emerald-600">
                      <Icon name="phone" className="h-4 w-4 text-gold-deep" /> {phone.display}
                    </a>
                    <a href={`mailto:${email}`} className="flex items-center gap-3 break-all text-emerald-900 hover:text-emerald-600">
                      <Icon name="mail" className="h-4 w-4 shrink-0 text-gold-deep" /> {email}
                    </a>
                  </div>
                  <TLink href={b.href} className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-emerald-700 hover:text-emerald-900">
                    Visit page <Icon name="arrowUpRight" className="h-4 w-4" />
                  </TLink>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
