import Image from "next/image";
import TLink from "@/components/ui/TLink";
import Icon from "@/components/ui/Icon";
import Skyline from "@/components/ui/Skyline";
import { businesses } from "@/data/businesses";
import { contact, site } from "@/data/site";
import { t } from "@/lib/i18n";

export default function Footer() {
  const socials = (Object.entries(contact.social) as [string, string][]).filter(([, url]) => url);
  return (
    <footer className="grain relative overflow-hidden bg-emerald-950 pb-28 pt-20 lg:pb-10">
      <Skyline className="absolute inset-x-0 bottom-0 h-40 text-gold-light/[0.09] md:h-56" />
      <div className="container-x">
        <div className="grid-12 gap-y-12">
          <div className="col-span-12 lg:col-span-4">
            <TLink href="/" aria-label="Afwajh Group of Companies — home" className="inline-block">
              <Image src="/images/logos/afwajh-logo-light.png" alt="Afwajh Group of Company logo" width={180} height={143} className="h-auto w-40" />
            </TLink>
            <p className="mt-8 max-w-sm text-[0.95rem] leading-relaxed text-ivory/70">
              A diversified UAE business group since {site.established} — retail, hospitality, catering, general trading, transport, technical services and labour supply.
            </p>
            {socials.length > 0 && (
              <ul className="mt-8 flex gap-3">
                {socials.map(([name, url]) => (
                  <li key={name}>
                    <a href={url} target="_blank" rel="noopener noreferrer" aria-label={name} className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 text-ivory/80 transition-colors hover:border-gold-light hover:text-gold-light">
                      <Icon name={name} className="h-5 w-5" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="col-span-12 sm:col-span-6 lg:col-span-3 lg:col-start-6">
            <h2 className="eyebrow text-teal-light">{t.footer.businesses}</h2>
            <ul className="mt-6 space-y-3">
              {businesses.map((b) => (
                <li key={b.slug}>
                  <TLink href={b.href} className="text-[0.95rem] text-ivory/80 transition-colors hover:text-gold-light">
                    {b.name}
                  </TLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <h2 className="eyebrow text-teal-light">{t.footer.company}</h2>
            <ul className="mt-6 space-y-3 text-[0.95rem] text-ivory/80">
              <li><TLink href="/about" className="hover:text-gold-light">About the Group</TLink></li>
              <li><TLink href="/clients" className="hover:text-gold-light">Clients</TLink></li>
              <li><TLink href="/contact" className="hover:text-gold-light">Contact</TLink></li>
            </ul>
          </div>

          <address className="col-span-12 not-italic sm:col-span-6 lg:col-span-3">
            <h2 className="eyebrow text-teal-light">{t.footer.reach}</h2>
            <ul className="mt-6 space-y-3 text-[0.95rem] text-ivory/80">
              <li>
                {contact.address.line1}, {contact.address.city}
                <br />
                {contact.address.poBox}
              </li>
              <li><a href={contact.tel.href} className="hover:text-gold-light">Tel {contact.tel.display}</a></li>
              {contact.mobiles.map((m) => (
                <li key={m.href}><a href={m.href} className="hover:text-gold-light">Mob {m.display}</a></li>
              ))}
              <li><a href={`mailto:${contact.email}`} className="break-all hover:text-gold-light">{contact.email}</a></li>
            </ul>
          </address>
        </div>

        <div className="hairline mt-16" />
        <div className="mt-6 flex flex-col justify-between gap-3 text-xs text-ivory/55 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. {t.footer.rights}</p>
          <p>{contact.website}</p>
        </div>
      </div>
    </footer>
  );
}
