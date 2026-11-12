import { businesses } from "./businesses";
import { contact, emirates, keyStats, ownerMessage, site } from "./site";

/**
 * Plain-language questions people (and AI assistants) ask about the group.
 * Answers are built from the site's own data so they never drift out of date.
 * Shown on the About page, emitted as FAQPage JSON-LD and included in /llms.txt.
 */
const stat = (label: string) => keyStats.find((s) => s.label === label)?.value;
const list = (items: readonly string[]) => `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
const businessNames = businesses.map((b) => b.name);

export const faqs: { q: string; a: string }[] = [
  {
    q: "What is Afwajh Group?",
    a: `${site.name} (Afwajh Group) is a diversified business group in the United Arab Emirates, established in ${site.established} and headquartered in Dubai. It runs ${businesses.length} businesses across retail, hospitality, catering, general trading, transport, technical services and labour supply.`,
  },
  {
    q: "When was Afwajh Group founded?",
    a: `Afwajh Group was established in ${site.established}. Its transport company, FHM General Transport LLC, has operated since 2008.`,
  },
  {
    q: "Who owns Afwajh Group?",
    a: `Afwajh Group of Companies is owned by ${ownerMessage.signature}.`,
  },
  {
    q: "What businesses does Afwajh Group operate?",
    a: `Afwajh Group operates ${businesses.length} businesses: ${list(businessNames)}.`,
  },
  {
    q: "Where is Afwajh Group located?",
    a: `The head office is at ${contact.address.line1}, ${contact.address.city}, ${contact.address.country} (${contact.address.poBox}). The group operates in ${list(emirates)}.`,
  },
  {
    q: "How many people work at Afwajh Group?",
    a: `Afwajh Group employs more than ${stat("People")} people across its divisions.`,
  },
  {
    q: "How many stores does Afwajh Group have?",
    a: `Afwajh Group runs ${stat("Retail & dining outlets")} retail and dining outlets: 14 supermarkets and minimarts across four emirates, and 8 restaurants and cafeterias.`,
  },
  {
    q: "Does Afwajh Group provide catering?",
    a: "Yes. Afwajh Catering Services provides permanent and site canteens, tiffin meals, event catering, food trucks and kiosks across the UAE.",
  },
  {
    q: "How can I contact Afwajh Group?",
    a: `Call or WhatsApp ${contact.call.display}, call the office on ${contact.landline}, or email ${contact.email}.`,
  },
];
