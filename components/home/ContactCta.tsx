import Kicker from "@/components/ui/Kicker";
import Rich from "@/components/ui/Rich";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Media from "@/components/ui/Media";
import { contact } from "@/data/site";

export default function ContactCta({ title = "Let’s build what’s\n*next*, together." }: { title?: string }) {
  return (
    <section className="grain relative isolate overflow-hidden bg-emerald py-20 text-ivory md:py-40" aria-labelledby="cta-title">
      <div
        aria-hidden
        className="absolute inset-x-0 top-1/2 -z-10 aspect-[4/3] -translate-y-1/2 [mask-image:linear-gradient(transparent,#000_22%,#000_78%,transparent)] md:inset-0 md:aspect-auto md:translate-y-0 md:[mask-image:none]"
      >
        <Media
          image={{ src: "/images/home/dubai-skyline-silhouette.webp", alt: "" }}
          className="h-full w-full"
          imgClassName="object-center md:object-[center_70%]"
          sizes="100vw"
          reveal={false}
          parallax={6}
        />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald/95 via-emerald/75 to-emerald/30" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-emerald/80 via-transparent to-emerald/40" />
      <div className="wrap grid-12 items-end gap-y-14">
        <div className="col-span-12 lg:col-span-8">
          <Kicker>Get in touch</Kicker>
          <h2 id="cta-title" className="t-h1 mt-8" data-split>
            <Rich text={title} />
          </h2>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row" data-reveal>
            <Button href="/contact">Contact us</Button>
            <Button href={contact.whatsapp.href} variant="outline-light" external icon="arrowUpRight">
              WhatsApp {contact.whatsapp.display}
            </Button>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4">
          <ul className="grid gap-5 text-[15px] text-ivory/80" data-reveal>
            <li className="flex items-center gap-4">
              <Icon name="phone" size={20} className="text-gold-light" />
              <a href={contact.call.href} className="hover:text-gold-light">
                {contact.call.display}
              </a>
            </li>
            <li className="flex items-center gap-4">
              <Icon name="phone" size={20} className="text-gold-light" />
              <span>{contact.landline}</span>
            </li>
            <li className="flex items-center gap-4">
              <Icon name="mail" size={20} className="text-gold-light" />
              <a href={`mailto:${contact.email}`} className="break-all hover:text-gold-light">
                {contact.email}
              </a>
            </li>
            <li className="flex items-center gap-4">
              <Icon name="pin" size={20} className="text-gold-light" />
              <span>Trade Centre 1, Sheikh Zayed Rd, Dubai</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
