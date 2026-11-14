import type { Emirate, Img, MapPlace } from "./types";

export const restaurantsIntro =
  "Afwajh Group operates a diverse portfolio of restaurants and cafeterias, offering a wide range of cuisines and dining experiences across the UAE. Each outlet is developed with a strong focus on quality, comfort, and customer satisfaction, ensuring a consistent and enjoyable experience for every guest.";

export interface Venue extends MapPlace {
  kind: "Cafe" | "Cafeteria" | "Restaurant";
  emirate: Emirate;
  tags: string[];
  image: Img;
  /** Real photo from the venue, shown as an inset. */
  realPhoto?: Img;
}

export const venues: Venue[] = [
  {
    id: "cafe-52",
    name: "Cafe 52",
    kind: "Cafe",
    location: "Al Yalayis 2, near Town Square, Dubai",
    emirate: "Dubai",
    lat: 25.0125,
    lng: 55.2905,
    tags: ["Quality coffee", "Relaxed ambience", "Social gatherings"],
    description:
      "Known for its relaxing ambience, quality coffee, and flavorful menu, Cafe 52 is an ideal destination for social gatherings, casual meetings, or simply unwinding in a comfortable and stylish setting.",
    image: { src: "/images/restaurants/latte-art-pour.webp", alt: "Barista pouring latte art into a ceramic cup", illustrative: true },
    realPhoto: { src: "/images/company/restaurants/cafe-52-storefront.webp", alt: "Cafe 52 storefront in Town Square, Dubai" },
  },
  {
    id: "picnic-tea-cafeteria",
    name: "Picnic Tea Cafeteria",
    kind: "Cafeteria",
    location: "Al Quoz Pond Park, Ghadeer Al Tair, Dubai",
    emirate: "Dubai",
    lat: 25.1395,
    lng: 55.2335,
    tags: ["Fast food", "Quick bites", "Elevated dining"],
    description:
      "Picnic Tea Cafeteria combines the concept of fast food with an elevated dining experience. With a strong emphasis on quality, flavor, and convenience, it offers a refreshing take on quick bites in a vibrant and welcoming environment.",
    image: { src: "/images/restaurants/club-sandwich-fries.webp", alt: "Toasted club sandwich with golden fries", illustrative: true },
  },
  {
    id: "lassi-day",
    name: "Lassi Day",
    kind: "Cafeteria",
    location: "Kuwait Street, Al Karama, Dubai",
    emirate: "Dubai",
    lat: 25.2447,
    lng: 55.3043,
    tags: ["Lassi", "Fresh beverages", "Frozen treats"],
    description:
      "Lassi Day is a destination for refreshing beverages and frozen treats. Known for its high-quality ingredients and flavorful offerings, it provides the perfect escape for those seeking indulgent and refreshing options.",
    image: { src: "/images/restaurants/mango-lassi.webp", alt: "Two glasses of mango lassi with fresh mango", illustrative: true },
  },
  {
    id: "zero-6-express",
    name: "Zero 6 Express Cafeteria",
    kind: "Restaurant",
    location: "Yas Island, near Yas Waterworld, Abu Dhabi",
    emirate: "Abu Dhabi",
    lat: 24.4875,
    lng: 54.5985,
    tags: ["Indian", "Biryani", "Tandoor"],
    description:
      "Zero 6 Express Cafeteria specializes in authentic Indian cuisine, offering a wide selection of flavorful dishes ranging from biryanis to tandoori specialties. It combines traditional taste with modern convenience in a vibrant setting.",
    image: { src: "/images/restaurants/chicken-tikka-naan.webp", alt: "Chicken tikka masala with freshly baked naan", illustrative: true },
  },
  {
    id: "shay-marhaba",
    name: "Shay Marhaba Cafeteria",
    kind: "Cafeteria",
    location: "ENOC Petrol Pump, Al Barsha, Dubai",
    emirate: "Dubai",
    lat: 25.1105,
    lng: 55.2005,
    tags: ["Quick meals", "On the go"],
    description:
      "Located at ENOC Petrol Pump, Shay Marhaba Cafeteria is a popular destination for quick and delicious meals. It delivers a seamless blend of convenience and flavor, making it ideal for customers on the go.",
    image: { src: "/images/restaurants/karak-chai-glass.webp", alt: "Glass of creamy karak chai on a wooden table", illustrative: true },
    realPhoto: { src: "/images/company/restaurants/shay-marhaba-cup.webp", alt: "Shay Marhaba branded cup with whipped cream" },
  },
  {
    id: "shay-al-kadi",
    name: "Shay Al Kadi",
    kind: "Cafeteria",
    location: "Al Badee Suburb, Dhaid Road (6th Interchange), Sharjah",
    emirate: "Sharjah",
    lat: 25.2905,
    lng: 55.5105,
    tags: ["Traditional teas", "Snacks", "Pastries"],
    description:
      "Shay Al Kadi Cafeteria blends tradition with taste, offering a variety of teas, snacks, and pastries. Each item reflects rich flavors and cultural heritage, creating a unique and comforting dining experience.",
    image: { src: "/images/restaurants/tea-brass-kettle.webp", alt: "Cup of tea served beside a traditional brass kettle", illustrative: true },
  },
  {
    id: "city-fresh",
    name: "City Fresh Restaurant",
    kind: "Restaurant",
    location: "Majestic Tower, opposite Bay Square, Business Bay, Dubai",
    emirate: "Dubai",
    lat: 25.1862,
    lng: 55.2826,
    tags: ["Indo-Chinese", "Indian", "Fast food", "Desserts", "Beverages"],
    description:
      "City Fresh Restaurant offers a diverse selection of Indo-Chinese, Indian, fast food, desserts, and beverages. Each dish is carefully prepared to ensure a satisfying and memorable dining experience.",
    image: { src: "/images/restaurants/indo-chinese-noodles.webp", alt: "Bowl of Indo-Chinese stir-fried noodles with spring onions", illustrative: true },
  },
  {
    id: "khafayef-cafeteria",
    name: "Khafayef Cafeteria",
    kind: "Cafeteria",
    location: "Dubai Mall, Dubai",
    emirate: "Dubai",
    lat: 25.1985,
    lng: 55.2779,
    tags: ["Quality food", "Convenience"],
    description:
      "Situated in one of Dubai’s most iconic locations, Khafayef Cafeteria offers a unique combination of quality food and convenience. Each dish is thoughtfully prepared to deliver both taste and consistency.",
    image: { src: "/images/restaurants/modern-cafe-interior.webp", alt: "Bright, modern café seating area", illustrative: true },
    realPhoto: { src: "/images/company/restaurants/khafayef-cafe-uniform.webp", alt: "Khafayef Cafe staff uniform with embroidered logo" },
  },
];
