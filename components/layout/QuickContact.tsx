import Icon from "@/components/ui/Icon";
import { contact } from "@/data/site";

/** Floating WhatsApp button (desktop only). */
export default function QuickContact() {
  return (
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
  );
}
