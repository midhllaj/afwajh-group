import type { Emirate, Img, MapPlace } from "./types";

export { directionsUrl } from "./types";

export const retailIntro =
  "Afwajh Group operates a growing network of supermarkets and minimarts across key locations in the UAE. Each outlet is designed to provide convenience, quality products, and a seamless shopping experience.";

export interface Outlet extends MapPlace {
  kind: "Supermarket" | "Minimart" | "Market";
  emirate: Emirate;
  phone?: string; // [CONFIRM: outlet phone]
}

export const outlets: Outlet[] = [
  {
    id: "khafayef-minimart",
    name: "Khafayef Minimart",
    kind: "Minimart",
    location: "Dubai Mall, Dubai",
    emirate: "Dubai",
    description:
      "A premium retail outlet located in one of the world’s busiest shopping destinations, offering convenience and a curated selection of everyday essentials.",
    lat: 25.1972,
    lng: 55.2796,
  },
  {
    id: "happy-corner-minimart",
    name: "Happy Corner Minimart",
    kind: "Minimart",
    location: "Yas Mall, Abu Dhabi",
    emirate: "Abu Dhabi",
    description:
      "Strategically positioned to serve shoppers with quick access to fresh products and daily necessities.",
    lat: 24.4889,
    lng: 54.6086,
  },
  {
    id: "souq-al-hala-minimart",
    name: "Souq Al Hala Minimart",
    kind: "Minimart",
    location: "Al Qassimi Hospital (EHS), Sharjah",
    emirate: "Sharjah",
    description:
      "Designed to serve hospital visitors and staff with essential items and fresh food options.",
    lat: 25.3497,
    lng: 55.4197,
  },
  {
    id: "qasar-al-hala-minimart",
    name: "Qasar Al Hala Minimart",
    kind: "Minimart",
    location: "Saqr Hospital (EHS), Ras Al Khaimah",
    emirate: "Ras Al Khaimah",
    description:
      "A convenient retail point catering to healthcare environments with a focus on accessibility and quality.",
    lat: 25.7895,
    lng: 55.9601,
  },
  {
    id: "afwajh-al-madina-market",
    name: "Afwajh Al Madina Market",
    kind: "Market",
    location: "Deira, Dubai (opposite Waterfront Market)",
    emirate: "Dubai",
    description:
      "A vibrant retail outlet offering a wide selection of fresh produce and daily essentials in a busy commercial district.",
    lat: 25.2797,
    lng: 55.3156,
  },
  {
    id: "gate-plus-supermarket",
    name: "Gate Plus Supermarket L.L.C",
    kind: "Supermarket",
    location: "Jumeirah, Dubai",
    emirate: "Dubai",
    description:
      "A full-service supermarket offering a wide variety of grocery items, fresh produce, and premium goods.",
    lat: 25.2048,
    lng: 55.2441,
  },
  {
    id: "greens-minimart",
    name: "Greens Minimart",
    kind: "Minimart",
    location: "Jumeirah Golf Estates, Dubai",
    emirate: "Dubai",
    description:
      "A premium minimart catering to a high-end residential community with quality groceries and convenience items.",
    lat: 25.0205,
    lng: 55.1976,
  },
  {
    id: "best-in-village-supermarket",
    name: "Best in Village Supermarket",
    kind: "Supermarket",
    location: "JVC, Dubai",
    emirate: "Dubai",
    description:
      "A community-focused store delivering quality products within a modern and customer-friendly environment.",
    lat: 25.0597,
    lng: 55.2093,
  },
  {
    id: "fresh-plus-point",
    name: "Fresh Plus Point",
    kind: "Minimart",
    location: "Dubai Marina (MAG 2018 Tower)",
    emirate: "Dubai",
    description:
      "Located in a high-density residential area, providing fresh and premium grocery options.",
    lat: 25.0805,
    lng: 55.1403,
  },
  {
    id: "maraheb-minimart",
    name: "Maraheb Minimart",
    kind: "Minimart",
    location: "JAFZA View 18 & 19, Jebel Ali Free Zone",
    emirate: "Dubai",
    description:
      "Strategically located to serve corporate and industrial clients within the free zone area.",
    lat: 25.0108,
    lng: 55.0897,
  },
  {
    id: "gate-plus-minimart",
    name: "Gate Plus Minimart",
    kind: "Minimart",
    location: "RAKEZ, Ras Al Khaimah",
    emirate: "Ras Al Khaimah",
    description: "Serving industrial and business communities with essential retail products.",
    lat: 25.6466,
    lng: 55.9263,
  },
  {
    id: "souq-al-hala-mart-kuwait-hospital",
    name: "Souq Al Hala Mart",
    kind: "Minimart",
    location: "Kuwait Hospital, Sharjah",
    emirate: "Sharjah",
    description: "Serving hospital visitors, patients and staff with everyday essentials and convenient food options.",
    lat: 25.3447,
    lng: 55.3998,
  },
  {
    id: "apk-grocery",
    name: "APK Grocery",
    kind: "Minimart",
    location: "Jebel Ali Industrial First, Dubai",
    emirate: "Dubai",
    description: "Serving the Jebel Ali industrial community with groceries and everyday necessities.",
    lat: 24.9915,
    lng: 55.1306,
  },
  {
    id: "hala-mart-al-kuwait-hospital",
    name: "Hala Mart",
    kind: "Minimart",
    location: "Al Kuwait Hospital, Dubai",
    emirate: "Dubai",
    description: "A convenient retail point for hospital visitors and staff, stocked with daily essentials and quick food options.",
    lat: 25.2845,
    lng: 55.3225,
  },
];

export const retailGallery: Img[] = [
  { src: "/images/retail/fresh-fruit-wall.webp", alt: "Wall of neatly stacked fresh fruit on supermarket shelves" },
  { src: "/images/retail/produce-chiller.webp", alt: "Refrigerated produce display filled with fresh vegetables" },
  { src: "/images/retail/fresh-greens-shopping.webp", alt: "Shopper choosing fresh leafy greens" },
  { src: "/images/retail/fruit-display-aerial.webp", alt: "Overhead view of a fruit display with oranges and apples" },
  { src: "/images/company/retail/supermarket-aisle.webp", alt: "Aisle inside an Afwajh minimart with chillers and stacked water" },
  { src: "/images/retail/misted-greens.webp", alt: "Misted leafy greens in a supermarket produce section" },
  { src: "/images/retail/colourful-shelves.webp", alt: "High-angle view of colourful packaged goods on supermarket shelves" },
];

/** Feature imagery for the retail page sections. */
export const retailImages = {
  intro: { src: "/images/retail/supermarket new (3).png", alt: "Greenmart store with a pastry display, drinks fridges and snack shelving" } satisfies Img,
  introMore: [
    { src: "/images/retail/supermarket new (2).png", alt: "Greenmart fresh fruit and vegetable section with chilled shelves and a fruit stand" },
    { src: "/images/retail/supermarket new (5).png", alt: "Row of Greenmart beverage chillers filled with soft drinks, juices and water" },
    { src: "/images/retail/supermarket new (6).png", alt: "Greenmart snack aisle lined with crisps on both sides" },
    { src: "/images/retail/supermarket new (8).png", alt: "Greenmart interior with a bakery display counter, stocked aisles and drinks chillers" },
    { src: "/images/retail/supermarket new (7).png", alt: "Greenmart Snacks and More wall with shelves of crisps" },
    { src: "/images/retail/supermarket new (9).png", alt: "Greenmart cashier counter with wood panelling beside stocked shelves" },
    { src: "/images/retail/supermarket new (4).png", alt: "Greenmart storefront at dusk decorated with green and black balloons" },
  ] satisfies Img[],
};
