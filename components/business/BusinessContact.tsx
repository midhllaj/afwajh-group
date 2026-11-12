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
    <section id="enquire" className="grain scroll-mt-20 bg-emerald py-20 text-ivory md:py-36" aria-labelledby="contact-title">
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
            {c.landline && (
              <p className="flex gap-4">
                <Icon name="phone" size={22} className="text-[var(--accent)]" /> {c.landline}
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
          /* Editorial link rows: hairline rules, oversized values, accent wipe on hover. */
          <ul className="col-span-12 self-end border-t border-line-dark lg:col-span-6 lg:col-start-7" data-reveal>
            {[
              { href: c.phones[0].href, label: "Call", value: c.phones[0].display, ext: false },
              { href: group.whatsapp.href, label: "WhatsApp", value: group.whatsapp.display, ext: true },
              { href: `mailto:${c.email}`, label: "Email", value: c.email, ext: false },
            ].map((t, i) => (
              <li key={t.label} className="border-b border-line-dark">
                <a
                  href={t.href}
                  target={t.ext ? "_blank" : undefined}
                  rel={t.ext ? "noopener noreferrer" : undefined}
                  className="group relative isolate flex items-center justify-between gap-6 overflow-hidden py-6 transition-colors duration-500 hover:text-emerald-deep md:py-8"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-[var(--accent)] transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.2,1)] group-hover:scale-y-100"
                  />
                  <span className="min-w-0 transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.2,1)] group-hover:translate-x-4">
                    <span className="t-label flex items-center gap-3 text-[11px] text-ivory/50 transition-colors duration-500 group-hover:text-emerald-deep/70">
                      <span className="text-[var(--accent)] transition-colors duration-500 group-hover:text-emerald-deep">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {t.label}
                    </span>
                    <span className="t-h3 mt-3 block break-words">{t.value}</span>
                  </span>
                  <span className="grid size-12 shrink-0 place-items-center rounded-full border border-ivory/25 transition-all duration-500 group-hover:-translate-x-4 group-hover:rotate-45 group-hover:border-emerald-deep/40 md:size-14">
                    <Icon name="arrowUpRight" size={20} />
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
