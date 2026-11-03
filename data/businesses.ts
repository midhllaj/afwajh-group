import type { BusinessSummary } from "./types";

/** The seven businesses, in the client's priority order. */
export const businesses: BusinessSummary[] = [
  {
    slug: "supermarkets",
    href: "/businesses/supermarkets",
    index: "01",
    name: "Supermarkets & Minimarts",
    shortName: "Supermarkets",
    tagline: "Retail Division",
    summary:
      "A growing network of supermarkets and minimarts across key locations in the UAE, designed for convenience, quality products and a seamless shopping experience.",
    image: {
      src: "/images/retail/supermarket-aisle.webp",
      alt: "Brightly lit aisle of an Afwajh minimart with stocked shelves and chillers",
    },
    employees: 160,
    priority: 1,
  },
  {
    slug: "restaurants",
    href: "/businesses/restaurants",
    index: "02",
    name: "Restaurants & Cafeterias",
    shortName: "Restaurants",
    tagline: "Hospitality Division",
    summary:
      "A diverse portfolio of restaurants and cafeterias offering a wide range of cuisines and dining experiences across the UAE.",
    image: {
      src: "/images/restaurants/cafe-52-storefront.webp",
      alt: "Cafe 52 container storefront in Town Square, Dubai, with pink flowers in front",
    },
    employees: 110,
    priority: 1,
  },
  {
    slug: "catering",
    href: "/businesses/catering",
    index: "03",
    name: "Afwajh Catering Services",
    shortName: "Catering",
    tagline: "Make Your Events Memorable With Our Authentic Delicacies",
    summary:
      "Professional and flexible food solutions, from permanent and site canteens to tiffin services and event catering.",
    image: {
      src: "/images/catering/event-buffet.webp",
      alt: "Guests at a corporate event beside a long buffet of canapés and desserts",
    },
    employees: 90,
    priority: 2,
  },
  {
    slug: "fhm-transport",
    href: "/businesses/fhm-transport",
    index: "04",
    name: "FHM General Transport LLC",
    shortName: "FHM Transport",
    tagline: "Transportation & heavy machinery since 2008",
    summary:
      "A trusted partner in construction road machinery, demolition equipment, machinery rental and deep excavation.",
    image: {
      src: "/images/fhm/fhm-heavy-machinery.webp",
      alt: "Yellow FHM bulldozers and graders lined up at a yard",
    },
    employees: 300,
    priority: 3,
  },
  {
    slug: "general-trading",
    href: "/businesses/general-trading",
    index: "05",
    name: "Afwajh General Trading",
    shortName: "General Trading",
    tagline: "Supply & distribution arm",
    summary:
      "The group’s supply and distribution arm, sourcing, trading and delivering a wide range of products for internal operations and external clients.",
    image: {
      src: "/images/trading/general-trading-warehouse.webp",
      alt: "Warehouse staff in hard hats checking stock on tall shelving",
    },
    employees: 18,
    priority: 3,
  },
  {
    slug: "technical-services",
    href: "/businesses/technical-services",
    index: "06",
    name: "Afwajh Technical Services",
    shortName: "Technical Services",
    arabicName: "افواجه للخدمات الفنية",
    tagline: "Installation, fit-out & maintenance",
    summary:
      "Licensed technical works from glass and aluminium to tiling, carpentry, false ceilings, kitchens and swimming pools.",
    image: {
      src: "/images/technical/glass-facade.webp",
      alt: "Glass curtain-wall facade of a modern building",
      illustrative: true,
    },
    employees: null,
    priority: 3,
  },
  {
    slug: "labour-supply",
    href: "/businesses/labour-supply",
    index: "07",
    // [CONFIRM exact company name]
    name: "Afwajh Labour Supply & Contracting",
    shortName: "Labour Supply",
    tagline: "Manpower for the construction sector",
    summary:
      "Skilled and unskilled manpower on short- and long-term contracts, safety-trained and fully compliant with UAE labour law.",
    image: {
      src: "/images/labour/construction-team.webp",
      alt: "Construction team in hard hats and high-visibility vests on a large site",
      illustrative: true,
    },
    employees: null,
    priority: 3,
  },
];

export const businessBySlug = (slug: string) => businesses.find((b) => b.slug === slug)!;
