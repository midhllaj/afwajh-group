import type { Business, Contact } from "./types";
import { contact as group } from "./site";

const groupContact: Contact = {
  phones: [...group.mobiles],
  landline: group.landline,
  email: group.email,
  address: `${group.address.line1}, ${group.address.city}`,
};

/** The seven businesses, in the client's order. */
export const businesses: Business[] = [
  {
    slug: "supermarkets-minimarts",
    href: "/businesses/supermarkets-minimarts",
    index: "01",
    name: "Supermarkets & Minimarts",
    shortName: "Supermarkets",
    label: "Retail",
    positioning: "Fresh, convenient neighbourhood retail — from Dubai Mall to Ras Al Khaimah.",
    summary: "A growing network of 14 supermarkets and minimarts across four emirates.",
    accent: "#5FA84B",
    hero: { src: "/images/retail/supermarket new (1).png", alt: "Greenmart supermarket entrance with fresh produce displays and stocked aisles beyond" },
    facts: [
      { value: 14, label: "Outlets" },
      { value: 160, label: "Team members" },
      { value: 4, label: "Emirates" },
      { value: 9, label: "Outlets in Dubai" },
    ],
    employees: 160,
    contact: groupContact, // [CONFIRM: retail division contact details]
    featured: true,
  },
  {
    slug: "restaurants-cafeterias",
    href: "/businesses/restaurants-cafeterias",
    index: "02",
    name: "Restaurants & Cafeterias",
    shortName: "Restaurants",
    label: "Hospitality",
    positioning: "Eight venues, one standard of quality, comfort and flavour.",
    summary: "Cafés, cafeterias and restaurants serving coffee, Indian, Indo-Chinese and more.",
    accent: "#C8643B",
    hero: { src: "/images/company/restaurants/Vibrant Café 52 Container Storefront.png", alt: "Cafe 52 container storefront with an orange sign, serving counter and pink flowers" },
    heroPortrait: { src: "/images/company/restaurants/Vibrant Café 52 Bougainvillea Storefront potraite.png", alt: "Cafe 52 container storefront with an orange sign, serving counter and pink flowers" },
    facts: [
      { value: 8, label: "Venues" },
      { value: 110, label: "Team members" },
      { value: 3, label: "Emirates" },
    ],
    employees: 110,
    contact: groupContact, // [CONFIRM: restaurants division contact details]
    featured: true,
  },
  {
    slug: "catering",
    href: "/businesses/catering",
    index: "03",
    name: "Afwajh Catering Services",
    shortName: "Catering",
    label: "Catering",
    positioning: "Make your events memorable with our authentic delicacies.",
    summary: "Permanent and site canteens, tiffin, event catering, food trucks and kiosks.",
    accent: "#EE9A24",
    hero: { src: "/images/catering/buffet-chafing-dishes.webp", alt: "Buffet line of polished chafing dishes filled with freshly prepared food" },
    facts: [
      { value: 2016, label: "Operating since" },
      { value: 90, label: "Team members" },
      { value: 5, label: "Service lines" },
    ],
    employees: 90,
    contact: groupContact,
  },
  {
    slug: "fhm-general-transport",
    href: "/businesses/fhm-general-transport",
    index: "04",
    name: "FHM General Transport LLC",
    shortName: "FHM Transport",
    label: "Transport & Machinery",
    positioning: "Empowering progress with innovation, reliability and excellence.",
    summary: "Heavy machinery rental, deep excavation, demolition and heavy transport since 2008.",
    accent: "#1173BE",
    hero: { src: "/images/fhm/excavator-sand-aerial.webp", alt: "Aerial view of an excavator working in a sand quarry" },
    facts: [
      { value: 2008, label: "Established" },
      { value: 300, label: "Team members" },
      { value: 11, label: "Major projects" },
      { value: 114.4, decimals: 1, prefix: "AED ", suffix: "M", label: "Project portfolio" },
    ],
    employees: 300,
    contact: {
      phones: [
        { display: "+971 58 886 6961", href: "tel:+971588866961" },
        { display: "+971 4 288 4679", href: "tel:+97142884679" },
      ],
      email: "info@afwajhgroup.com",
      address: "Office 402 (A), 99 Building, Oud Metha, Dubai",
      website: { display: "www.fhmgeneraltransport.ae", href: "https://www.fhmgeneraltransport.ae" },
    },
  },
  {
    slug: "general-trading",
    href: "/businesses/general-trading",
    index: "05",
    name: "Afwajh General Trading",
    shortName: "General Trading",
    label: "Supply & Distribution",
    positioning: "The supply and distribution arm behind the group — and its clients.",
    summary: "Wholesale sourcing, trading and delivery from Al Nahda 1 and Al Qusais 1, Dubai.",
    accent: "#0FA08A",
    hero: { src: "/images/trading/distribution-warehouse.webp", alt: "Large distribution warehouse with rows of stocked crates and high racking" },
    facts: [
      { value: 18, label: "Team members" },
      { value: 2, label: "Dubai locations" },
    ],
    employees: 18,
    contact: groupContact,
  },
  {
    slug: "technical-services",
    href: "/businesses/technical-services",
    index: "06",
    name: "Afwajh Technical Services",
    shortName: "Technical Services",
    arabicName: "افواجه للخدمات الفنية",
    label: "Technical Works",
    positioning: "Licensed installation, fit-out and maintenance — one accountable team.",
    summary: "Glass & aluminium, steel, ceilings, tiling, carpentry, kitchens, pools and more.",
    accent: "#7A8A99",
    hero: { src: "/images/technical/swimming-pool.webp", alt: "Modern white villa with glass balconies behind a blue-tiled infinity pool", illustrative: true },
    facts: [{ value: 10, label: "Licensed activities" }],
    employees: null, // [CONFIRM]
    contact: groupContact,
  },
  {
    slug: "labour-supply",
    href: "/businesses/labour-supply",
    index: "07",
    // [CONFIRM exact company name]
    name: "Afwajh Labour Supply & Contracting",
    shortName: "Labour Supply",
    label: "Manpower",
    positioning: "Skilled, safety-trained manpower for the UAE’s construction sector.",
    summary: "Skilled and unskilled workers on short- and long-term contracts, fully compliant.",
    accent: "#E3A21A",
    hero: { src: "/images/labour/site-team-aerial.webp", alt: "Construction team in hard hats and high-visibility vests on a large site, seen from above" },
    facts: [{ value: 8, label: "Core trades" }],
    employees: null, // [CONFIRM]
    contact: groupContact,
  },
];

export const businessBySlug = (slug: string) => {
  const b = businesses.find((x) => x.slug === slug);
  if (!b) throw new Error(`Unknown business: ${slug}`);
  return b;
};

export const neighbours = (slug: string) => {
  const i = businesses.findIndex((b) => b.slug === slug);
  return {
    prev: businesses[(i - 1 + businesses.length) % businesses.length],
    next: businesses[(i + 1) % businesses.length],
  };
};
