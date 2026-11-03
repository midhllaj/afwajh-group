import Icon from "@/components/ui/Icon";
import { contact } from "@/data/site";

/** Floating WhatsApp button (desktop) and sticky Call / WhatsApp bar (mobile). */
export default function QuickContact() {
  return (
    <>
      <a
        href={contact.whatsapp.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat on WhatsApp (${contact.whatsapp.display})`}
        data-magnetic
        className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_34px_-12px_rgba(0,0,0,0.55)] transition-transform hover:scale-105 lg:flex"
      >
        <Icon name="whatsapp" size={28} />
      </a>
      <div className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-2 gap-2 rounded-full border border-line-dark bg-emerald-deep/90 p-1.5 pb-[calc(0.375rem+env(safe-area-inset-bottom)/2)] text-ivory backdrop-blur-xl lg:hidden">
        <a href={contact.tel.href} className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-ivory/[0.06] text-[15px] font-medium active:bg-ivory/15">
          <Icon name="phone" size={20} className="text-gold-light" /> Call
        </a>
        <a
          href={contact.whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] text-[15px] font-medium text-emerald-deep active:opacity-90"
        >
          <Icon name="whatsapp" size={20} /> WhatsApp
        </a>
      </div>
    </>
  );
}
