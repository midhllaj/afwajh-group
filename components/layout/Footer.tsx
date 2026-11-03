import TLink from "@/components/ui/TLink";
import Icon from "@/components/ui/Icon";
import Logo from "@/components/brand/Logo";
import Skyline from "@/components/brand/Skyline";
import { businesses } from "@/data/businesses";
import { contact, site } from "@/data/site";

export default function Footer() {
  const socials = (Object.entries(contact.social) as [string, string][]).filter(([, url]) => url);
  return (
    <footer className="grain relative overflow-hidden bg-emerald-deep pb-32 pt-24 text-ivory lg:pb-12">
      <Skyline className="pointer-events-none absolute inset-x-0 bottom-0 h-44 text-gold-light/[0.08] md:h-64" />
      <div className="wrap relative">
        <div className="grid-12 gap-y-14">
          <div className="col-span-12 lg:col-span-4">
            <TLink href="/" aria-label="Afwajh Group of Companies — home" className="inline-block">
              <Logo id="ftr" />
            </TLink>
            <p className="mt-8 max-w-sm text-[15px] leading-relaxed text-ivory/65">
              A diversified UAE business group since {site.established}: retail, hospitality, catering, general trading, transport, technical services and labour supply.
            </p>
            {socials.length > 0 && (
              <ul className="mt-8 flex gap-3">
                {socials.map(([name, url]) => (
                  <li key={name}>
                    <a href={url} target="_blank" rel="noopener noreferrer" aria-label={name} className="flex h-11 w-11 items-center justify-center rounded-full border border-line-dark hover:border-gold-light hover:text-gold-light">
                      <Icon name={name} size={20} />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="col-span-12 sm:col-span-7 lg:col-span-4 lg:col-start-6">
            <h2 className="t-label text-gold-light">Our businesses</h2>
            <ul className="mt-6 space-y-3">
              {businesses.map((b) => (
                <li key={b.slug}>
                  <TLink href={b.href} className="group flex items-baseline gap-3 text-[15px] text-ivory/80 hover:text-gold-light">
                    <span className="t-label text-ivory/55">{b.index}</span> {b.name}
                  </TLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 sm:col-span-5 lg:col-span-3">
            <h2 className="t-label text-gold-light">Head office</h2>
            <address className="mt-6 space-y-3 text-[15px] not-italic text-ivory/80">
              <p>
                {contact.address.line1}
                <br />
                {contact.address.city}, {contact.address.country}
                <br />
                {contact.address.poBox}
              </p>
              <p>
                <a href={contact.tel.href} className="hover:text-gold-light">
                  Tel {contact.tel.display}
                </a>
              </p>
              {contact.mobiles.map((m) => (
                <p key={m.href}>
                  <a href={m.href} className="hover:text-gold-light">
                    Mob {m.display}
                  </a>
                </p>
              ))}
              <p>
                <a href={`mailto:${contact.email}`} className="break-all hover:text-gold-light">
                  {contact.email}
                </a>
              </p>
            </address>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[15px] text-ivory/80">
              <li>
                <TLink href="/about" className="hover:text-gold-light">About</TLink>
              </li>
              <li>
                <TLink href="/clients" className="hover:text-gold-light">Clients</TLink>
              </li>
              <li>
                <TLink href="/contact" className="hover:text-gold-light">Contact</TLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="hairline mt-20" />
        <div className="mt-6 flex flex-col justify-between gap-2 text-[13px] text-ivory/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>{contact.website}</p>
        </div>
      </div>
    </footer>
  );
}
