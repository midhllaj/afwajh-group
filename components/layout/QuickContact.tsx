"use client";

import { m } from "framer-motion";
import Icon from "@/components/ui/Icon";
import { contact } from "@/data/site";

/** Floating WhatsApp button (desktop) and sticky call/WhatsApp bar (mobile). */
export default function QuickContact() {
  return (
    <>
      <m.a
        href={contact.whatsapp.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with us on WhatsApp (${contact.whatsapp.display})`}
        className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(0,0,0,0.45)] lg:flex"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.2, type: "spring", stiffness: 260, damping: 18 }}
        whileHover={{ scale: 1.08 }}
      >
        <Icon name="whatsapp" className="h-7 w-7" strokeWidth={1.3} />
      </m.a>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gold-light/20 bg-emerald-900/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden">
        <div className="grid grid-cols-3">
          <a href={contact.tel.href} className="flex min-h-16 flex-col items-center justify-center gap-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ivory active:bg-emerald-800">
            <Icon name="phone" className="h-5 w-5 text-gold-light" />
            Call
          </a>
          <a
            href={contact.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-16 flex-col items-center justify-center gap-1 border-x border-ivory/10 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ivory active:bg-emerald-800"
          >
            <Icon name="whatsapp" className="h-5 w-5 text-[#25D366]" />
            WhatsApp
          </a>
          <a href={`mailto:${contact.email}`} className="flex min-h-16 flex-col items-center justify-center gap-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ivory active:bg-emerald-800">
            <Icon name="mail" className="h-5 w-5 text-gold-light" />
            Email
          </a>
        </div>
      </div>
    </>
  );
}
