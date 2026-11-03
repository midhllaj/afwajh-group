import Image from "next/image";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import SplitHeading from "@/components/ui/SplitHeading";
import { contact } from "@/data/site";
import { t } from "@/lib/i18n";

export default function ContactCTA({ title = "Let’s build something\n*excellent* together." }: { title?: string }) {
  return (
    <section className="grain relative overflow-hidden bg-emerald-800 py-24 md:py-36" aria-label="Contact us">
      <Image
        src="/images/logos/afwajh-mark.png"
        alt=""
        width={600}
        height={520}
        className="pointer-events-none absolute -right-24 top-1/2 w-[520px] max-w-none -translate-y-1/2 opacity-[0.06] md:w-[720px]"
      />
      <div className="container-x relative">
        <Reveal variant="fade" className="mb-8 flex items-center gap-4">
          <span className="h-px w-12 bg-gold-gradient" />
          <span className="eyebrow text-gold-light">Get in touch</span>
        </Reveal>
        <SplitHeading as="h2" text={title} className="display-lg max-w-5xl text-ivory" />
        <Reveal delay={0.15} className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Button href="/contact">{t.cta.contact}</Button>
          <Button href={contact.whatsapp.href} variant="outline" external>
            WhatsApp {contact.whatsapp.display}
          </Button>
        </Reveal>
        <Reveal delay={0.25} className="mt-16 grid gap-6 border-t border-ivory/10 pt-10 text-ivory/80 sm:grid-cols-3">
          <a href={contact.tel.href} className="group flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-light/30 text-gold-light transition-colors group-hover:bg-gold-light group-hover:text-emerald-900">
              <Icon name="phone" className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-xs uppercase tracking-[0.18em] text-ivory/50">Telephone</span>
              {contact.tel.display}
            </span>
          </a>
          <a href={`mailto:${contact.email}`} className="group flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-light/30 text-gold-light transition-colors group-hover:bg-gold-light group-hover:text-emerald-900">
              <Icon name="mail" className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-xs uppercase tracking-[0.18em] text-ivory/50">Email</span>
              <span className="break-all">{contact.email}</span>
            </span>
          </a>
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold-light/30 text-gold-light">
              <Icon name="pin" className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-xs uppercase tracking-[0.18em] text-ivory/50">Head office</span>
              Trade Centre 1, Sheikh Zayed Rd, Dubai
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
