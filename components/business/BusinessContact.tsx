import Kicker from "@/components/ui/Kicker";
import Rich from "@/components/ui/Rich";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import { contact as group } from "@/data/site";
import type { Business } from "@/data/types";

/** Business-specific contact block; pass `children` for an enquiry form. */
export default function BusinessContact({
  business: b,
  title = "Talk to our *team*",
  index = "06",
  children,
}: {
  business: Business;
  title?: string;
  index?: string;
  children?: React.ReactNode;
}) {
  const c = b.contact;
  return (
    <section id="enquire" className="grain scroll-mt-20 bg-emerald py-28 text-ivory md:py-36" aria-labelledby="contact-title">
      <div className="wrap grid-12 gap-y-16">
        <div className="col-span-12 lg:col-span-5">
          <Kicker index={index} accent>
            Contact — {b.shortName}
          </Kicker>
          <h2 id="contact-title" className="t-h2 mt-8" data-split>
            <Rich text={title} />
          </h2>
          <address className="mt-12 space-y-4 not-italic text-ivory/85" data-reveal>
            {c.address && (
              <p className="flex gap-4">
                <Icon name="pin" size={22} className="shrink-0 text-[var(--accent)]" /> {c.address}
              </p>
            )}
            {c.phones.map((p) => (
              <a key={p.href} href={p.href} className="flex gap-4 hover:text-gold-light">
                <Icon name="phone" size={22} className="text-[var(--accent)]" /> {p.display}
              </a>
            ))}
            <a href={`mailto:${c.email}`} className="flex gap-4 break-all hover:text-gold-light">
              <Icon name="mail" size={22} className="shrink-0 text-[var(--accent)]" /> {c.email}
            </a>
            {c.website && (
              <a href={c.website.href} target="_blank" rel="noopener noreferrer" className="flex gap-4 hover:text-gold-light">
                <Icon name="globe" size={22} className="text-[var(--accent)]" /> {c.website.display}
              </a>
            )}
          </address>
          {!children && (
            <div className="mt-12 flex flex-col gap-3 sm:flex-row" data-reveal>
              <Button href={`/contact?business=${b.slug}`} variant="accent">
                Send an enquiry
              </Button>
              <Button href={group.whatsapp.href} variant="outline-light" external icon="arrowUpRight">
                WhatsApp
              </Button>
            </div>
          )}
        </div>
        {children ? (
          <div className="col-span-12 lg:col-span-6 lg:col-start-7" data-reveal>
            {children}
          </div>
        ) : (
          <ul className="col-span-12 grid gap-px self-end border border-line-dark bg-line-dark sm:grid-cols-3 lg:col-span-6 lg:col-start-7" data-reveal>
            {[
              { href: c.phones[0].href, icon: "phone", label: "Call", value: c.phones[0].display, ext: false },
              { href: group.whatsapp.href, icon: "whatsapp", label: "WhatsApp", value: group.whatsapp.display, ext: true },
              { href: `mailto:${c.email}`, icon: "mail", label: "Email", value: c.email, ext: false },
            ].map((t) => (
              <li key={t.label} className="bg-emerald">
                <a
                  href={t.href}
                  target={t.ext ? "_blank" : undefined}
                  rel={t.ext ? "noopener noreferrer" : undefined}
                  className="group flex h-full min-h-48 flex-col justify-between gap-10 p-7 transition-colors duration-500 hover:bg-[var(--accent)] hover:text-emerald-deep"
                >
                  <Icon name={t.icon} size={34} className="text-[var(--accent)] transition-colors group-hover:text-emerald-deep" />
                  <span>
                    <span className="t-label block opacity-70">{t.label}</span>
                    <span className="mt-2 block break-all text-[15px]">{t.value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
