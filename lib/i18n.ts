// i18n scaffolding. English ships now; Arabic (RTL) can be added by filling in
// the `ar` dictionary and serving routes under /ar (see README → "Adding Arabic").

export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeDir: Record<Locale, "ltr" | "rtl"> = { en: "ltr", ar: "rtl" };

const en = {
  nav: {
    about: "About",
    businesses: "Businesses",
    clients: "Clients",
    contact: "Contact",
    getInTouch: "Get in touch",
    menu: "Menu",
    close: "Close",
    skip: "Skip to content",
    home: "Home",
  },
  cta: {
    explore: "Explore our businesses",
    contact: "Contact us",
    call: "Call",
    whatsapp: "WhatsApp",
    email: "Email",
    discover: "Discover",
    viewAll: "View all",
    enquire: "Send enquiry",
    send: "Send message",
    sending: "Sending…",
  },
  footer: {
    rights: "All rights reserved.",
    businesses: "Our businesses",
    company: "Company",
    reach: "Reach us",
  },
};

export type Dictionary = typeof en;

// Arabic strings will be added here; until then fall back to English.
const dictionaries: Record<Locale, Dictionary> = { en, ar: en };

export const getDictionary = (locale: Locale = defaultLocale) => dictionaries[locale];
export const t = getDictionary();
