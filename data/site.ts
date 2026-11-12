import type { Stat } from "./types";

export const site = {
  name: "Afwajh Group of Companies",
  shortName: "Afwajh Group",
  url: process.env.SITE_URL || "https://afwajhgroup.com",
  established: 2010,
  tagline: "Seven businesses. One standard of excellence.",
  description:
    "Afwajh Group of Companies is a diversified UAE business group, established in 2010, operating supermarkets, restaurants, catering, general trading, transport, technical services and labour supply.",
} as const;

/** The group's main number: used for both calls and WhatsApp. */
const mainMobile = { display: "+971 54 333 8590", href: "tel:+971543338590" } as const;

export const contact = {
  address: {
    line1: "Sheikh Zayed Rd, Trade Centre, Trade Centre 1",
    city: "Dubai",
    country: "United Arab Emirates",
    poBox: "P.O. Box 430400, Dubai, UAE",
  },
  /** Shown as plain text only; every call action uses `call`. */
  landline: "+971 4 294 4870",
  call: mainMobile,
  mobiles: [
    mainMobile,
    // [CONFIRM: the group profile also prints this number as "056 56 444 333"]
    { display: "+971 56 564 4333", href: "tel:+971565644333" },
  ],
  whatsapp: { display: "+971 54 333 8590", href: "https://wa.me/971543338590" },
  email: "info@afwajhgroup.com",
  website: "afwajhgroup.com",
  mapQuery: "Trade Centre 1, Sheikh Zayed Road, Dubai",
  geo: { lat: 25.2247, lng: 55.2836 },
  // [CONFIRM: social URLs] — leave empty to hide an icon.
  social: {
    instagram: "",
    linkedin: "",
    facebook: "",
  },
} as const;

export const intro =
  "Afwajh Group of Companies, established in 2010, is a diversified business group operating across retail, hospitality, catering, general trading, transport, technical services and labour supply in the United Arab Emirates. Since its inception, the group has consistently focused on delivering high-quality products and reliable services that meet the dynamic needs of the market. With a strong commitment to excellence, Afwajh has grown into a well-recognized name, offering a wide portfolio that includes supermarkets, restaurants, catering solutions, and logistics support. The group continues to expand strategically while maintaining a customer-first approach and high operational standards.";

export const vision =
  "To enhance the quality of life for our customers, employees, and communities by delivering reliable products and services while continuously evolving to meet changing market expectations.";

export const mission =
  "To provide practical, high-quality, and cost-effective solutions to our customers while fostering a supportive work environment for our employees and maintaining our role as a responsible corporate entity.";

export const coreStrengths = [
  { title: "Strong focus on quality and freshness", icon: "leaf" },
  { title: "Efficient and scalable operations", icon: "gear" },
  { title: "Strong brand positioning and market adaptability", icon: "compass" },
  { title: "Customer-centric service approach", icon: "handshake" },
  { title: "Diverse business portfolio", icon: "squares" },
  { title: "Dedicated and hardworking workforce", icon: "users" },
] as const;

/** Owner's message: the full text is on the About page, the short quote on the home page. */
export const ownerMessage = {
  signature: "Nasser Al Balooshi",
  // [CONFIRM: exact title, e.g. Founder, Chairman or Managing Director]
  signatureTitle: "Owner, Afwajh Group of Companies",
  photo: { src: "/images/company/owner.jpeg", alt: "Portrait of Nasser Al Balooshi, owner of Afwajh Group of Companies" },
  // [CONFIRM: draft written for the site, needs the owner's approval]
  paragraphs: [
    "When we established Afwajh Group in 2010, our goal was simple: to serve the people of the UAE with quality and integrity. Today, our seven businesses work across retail, hospitality, catering, trading, transport, technical services and labour supply, all held to one standard of excellence.",
    "Our greatest strength is our people. Their dedication has earned the trust of our customers and partners, and we never take that trust for granted.",
    "Thank you for being part of our journey. We look forward to growing with you and with this great nation.",
  ],
  /** Large statements: wrap words in *asterisks* for the gold serif accent. */
  headline: "Our greatest strength is our *people.*",
  quote: "Our greatest strength is our *people.* Their dedication has earned the trust of our customers and partners.",
};

export const keyStats: Stat[] = [
  { value: 2010, label: "Since", prefix: "" },
  { value: 7, label: "Businesses" },
  { value: 678, suffix: "+", label: "People" },
  { value: 22, label: "Retail & dining outlets" },
  { value: 4, label: "Emirates" },
];

export const emirates = ["Dubai", "Abu Dhabi", "Sharjah", "Ras Al Khaimah"] as const;

/** Employees per division, from the group profile. `null` = still to be confirmed. */
export const workforce: { name: string; employees: number | null; href: string }[] = [
  { name: "FHM General Transport", employees: 300, href: "/businesses/fhm-general-transport" },
  { name: "Supermarkets & Minimarts", employees: 160, href: "/businesses/supermarkets-minimarts" },
  { name: "Restaurants & Cafeterias", employees: 110, href: "/businesses/restaurants-cafeterias" },
  { name: "Catering Services", employees: 90, href: "/businesses/catering" },
  { name: "General Trading", employees: 18, href: "/businesses/general-trading" },
  { name: "Technical Services", employees: null, href: "/businesses/technical-services" }, // [CONFIRM]
  { name: "Labour Supply & Contracting", employees: null, href: "/businesses/labour-supply" }, // [CONFIRM]
];

export const workforceCopy =
  "Afwajh Group’s success is driven by a strong and dedicated workforce across all divisions. Our team reflects our commitment to service excellence and operational efficiency. Our people are at the core of our growth, contributing to the consistent delivery of quality services across all sectors.";
