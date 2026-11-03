import type { Emirate, Img } from "./types";

export const restaurantsIntro =
  "Afwajh Group operates a diverse portfolio of restaurants and cafeterias, offering a wide range of cuisines and dining experiences across the UAE. Each outlet is developed with a strong focus on quality, comfort, and customer satisfaction, ensuring a consistent and enjoyable experience for every guest.";

export interface Venue {
  id: string;
  name: string;
  location: string;
  emirate: Emirate;
  tags: string[];
  description: string;
  image: Img;
}

export const venues: Venue[] = [
  {
    id: "cafe-52",
    name: "Cafe 52",
    location: "Town Square by Nshama, Dubai",
    emirate: "Dubai",
    tags: ["Quality coffee", "Relaxed ambience", "Social gatherings"],
    description:
      "Known for its relaxing ambience, quality coffee, and flavorful menu, Cafe 52 is an ideal destination for social gatherings, casual meetings, or simply unwinding in a comfortable and stylish setting.",
    image: {
      src: "/images/restaurants/cafe-52-storefront.webp",
      alt: "Cafe 52 container-style storefront with an illuminated orange sign",
    },
  },
  {
    id: "picnic-tea-cafeteria",
    name: "Picnic Tea Cafeteria",
    location: "Al Quoz, Dubai",
    emirate: "Dubai",
    tags: ["Fast food", "Quick bites", "Elevated dining"],
    description:
      "Picnic Tea Cafeteria combines the concept of fast food with an elevated dining experience. With a strong emphasis on quality, flavor, and convenience, it offers a refreshing take on quick bites in a vibrant and welcoming environment.",
    image: {
      src: "/images/restaurants/picnic-tea-sandwich.webp",
      alt: "Toasted club sandwich with fries on a white plate",
      illustrative: true,
    },
  },
  {
    id: "lassi-day",
    name: "Lassi Day",
    location: "Al Karama, Dubai",
    emirate: "Dubai",
    tags: ["Lassi", "Fresh beverages", "Frozen treats"],
    description:
      "Lassi Day is a destination for refreshing beverages and frozen treats. Known for its high-quality ingredients and flavorful offerings, it provides the perfect escape for those seeking indulgent and refreshing options.",
    image: {
      src: "/images/restaurants/lassi-day-smoothie.webp",
      alt: "Glass of mango lassi beside a freshly cut mango",
      illustrative: true,
    },
  },
  {
    id: "zero-6-express",
    name: "Zero 6 Express Cafeteria",
    location: "Yas Island, Abu Dhabi",
    emirate: "Abu Dhabi",
    tags: ["Indian", "Biryani", "Tandoor"],
    description:
      "Zero 6 Express Cafeteria specializes in authentic Indian cuisine, offering a wide selection of flavorful dishes ranging from biryanis to tandoori specialties. It combines traditional taste with modern convenience in a vibrant setting.",
    image: {
      src: "/images/restaurants/zero-6-biryani.webp",
      alt: "Plate of chicken biryani served with lemon and sauces",
      illustrative: true,
    },
  },
  {
    id: "shay-marhaba",
    name: "Shay Marhaba Cafeteria",
    location: "ENOC Petrol Pump, Al Barsha, Dubai",
    emirate: "Dubai",
    tags: ["Quick meals", "On the go"],
    description:
      "Located at ENOC Petrol Pump, Shay Marhaba Cafeteria is a popular destination for quick and delicious meals. It delivers a seamless blend of convenience and flavor, making it ideal for customers on the go.",
    image: {
      src: "/images/restaurants/shay-marhaba-cup.webp",
      alt: "Shay Marhaba branded cup topped with whipped cream and a biscuit",
    },
  },
  {
    id: "shay-al-kadi",
    name: "Shay Al Kadi",
    location: "Sharjah",
    emirate: "Sharjah",
    tags: ["Traditional teas", "Snacks", "Pastries"],
    description:
      "Shay Al Kadi Cafeteria blends tradition with taste, offering a variety of teas, snacks, and pastries. Each item reflects rich flavors and cultural heritage, creating a unique and comforting dining experience.",
    image: {
      src: "/images/restaurants/shay-al-kadi-tea.webp",
      alt: "Milk tea being poured into small clay cups",
      illustrative: true,
    },
  },
  {
    id: "city-fresh",
    name: "City Fresh Restaurant",
    location: "Business Bay, Dubai",
    emirate: "Dubai",
    tags: ["Indo-Chinese", "Indian", "Fast food", "Desserts", "Beverages"],
    description:
      "City Fresh Restaurant offers a diverse selection of Indo-Chinese, Indian, fast food, desserts, and beverages. Each dish is carefully prepared to ensure a satisfying and memorable dining experience.",
    image: {
      src: "/images/restaurants/city-fresh-noodles.webp",
      alt: "Bowl of stir-fried Indo-Chinese noodles with spring onions",
      illustrative: true,
    },
  },
  {
    id: "khafayef-cafeteria",
    name: "Khafayef Cafeteria",
    location: "Dubai Mall, Dubai",
    emirate: "Dubai",
    tags: ["Quality food", "Convenience"],
    description:
      "Situated in one of Dubai’s most iconic locations, Khafayef Cafeteria offers a unique combination of quality food and convenience. Each dish is thoughtfully prepared to deliver both taste and consistency.",
    image: {
      src: "/images/restaurants/khafayef-cafe-uniform.webp",
      alt: "Staff member wearing a black Khafayef Cafe uniform with the embroidered logo",
    },
  },
];
