import { ArrowLeft, ArrowRight, ArrowUpRight, EnvelopeSimple, MapPin, Phone, Plus, WhatsappLogo } from "@phosphor-icons/react/ssr";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

// Small icon subset for components that also run in the browser (header, buttons,
// forms, outlet map) so the full icon set never ends up in the client bundle.
const icons: Record<string, PhosphorIcon> = {
  arrow: ArrowRight,
  arrowLeft: ArrowLeft,
  arrowUpRight: ArrowUpRight,
  plus: Plus,
  phone: Phone,
  mail: EnvelopeSimple,
  whatsapp: WhatsappLogo,
  pin: MapPin,
};

export default function IconMini({ name, className, size = 24 }: { name: keyof typeof icons | string; className?: string; size?: number }) {
  const C = icons[name] ?? ArrowRight;
  return <C weight="light" size={size} className={className} aria-hidden="true" focusable="false" />;
}
