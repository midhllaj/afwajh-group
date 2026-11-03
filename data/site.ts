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

export const contact = {
  address: {
    line1: "Sheikh Zayed Rd, Trade Centre, Trade Centre 1",
    city: "Dubai",
    country: "United Arab Emirates",
    poBox: "P.O. Box 430400, Dubai, UAE",
  },
  tel: { display: "+971 4 294 4870", href: "tel:+97142944870" },
  mobiles: [
    { display: "+971 54 333 8590", href: "tel:+971543338590" },
    // [CONFIRM: the group profile also prints this number as "056 56 444 333"]
    { display: "+971 56 564 4333", href: "tel:+971565644333" },
  ],
  // [CONFIRM: which mobile number is on WhatsApp]
  whatsapp: { display: "+971 54 333 8590", href: "https://wa.me/971543338590" },
  email: "afwajhgroup1@gmail.com",
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

export const keyStats: Stat[] = [
  { value: 2010, label: "Since", prefix: "" },
  { value: 7, label: "Businesses" },
  { value: 678, suffix: "+", label: "People" },
  { value: 19, label: "Retail & dining outlets" },
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
