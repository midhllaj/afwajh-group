import type { Img } from "./types";

export const catering = {
  name: "Afwajh Catering Services",
  licence: "863488",
  base: "Business Bay, Dubai",
  since: 2016,
  tagline: "Make Your Events Memorable With Our Authentic Delicacies",
  intro:
    "Afwajh Catering Services provides professional and flexible food solutions tailored to meet a wide range of client requirements. From daily meal services to large-scale events, we are committed to delivering consistent quality, hygiene, and customer satisfaction.",
  about:
    "Afwajh Catering Services is a professional catering company dedicated to delivering exceptional culinary experiences. We pride ourselves on creating innovative and delicious dishes that cater to diverse tastes and budgets. Whether it’s an intimate gathering, a corporate event, or a grand celebration, our expertly crafted meals and exemplary service ensure every occasion is unforgettable. Using only the freshest ingredients, we bring a modern twist to traditional cuisine, making every dish both visually stunning and irresistibly flavorful. At Afwajh, we make life easier—and more delicious—one event at a time.",
  mission:
    "Consistently deliver exceptional culinary experiences that delight our clients and exceed their expectations.",
  vision:
    "Be the leading provider of innovative and personalized catering services in Dubai and beyond, renowned for our commitment to quality, customer satisfaction, and culinary excellence.",
  hero: {
    src: "/images/catering/plated-signature-dish.webp",
    alt: "Plated signature dish of glazed meat and roasted nuts on a dark ceramic plate",
  } satisfies Img,
};

export interface CateringService {
  id: string;
  index: string;
  title: string;
  lead: string;
  body: string[];
  highlight?: { label: string; value: string };
  clients?: string[];
  image: Img;
}

export const cateringServices: CateringService[] = [
  {
    id: "permanent-canteens",
    index: "01",
    title: "Permanent Canteens",
    lead: "Complete canteen management for corporate offices, industrial units and educational institutions.",
    body: [
      "In today’s interconnected workplace, permanent canteens have evolved beyond mere dining spaces. They now serve as vital hubs for informal interaction, fostering creativity and collaboration among employees.",
      "Afwajh provides complete canteen management solutions, ensuring high standards of quality, hygiene, and operational efficiency. Our experienced in-house team specializes in operating canteens for corporate companies, industrial units, and educational institutions.",
    ],
    highlight: { label: "Proudly serving", value: "Infosys, Hyderabad, India" },
    image: {
      src: "/images/catering/restaurant-canteen-interior.webp",
      alt: "Modern staff canteen with timber walls, a long counter and dining tables",
    },
  },
  {
    id: "temporary-canteens",
    index: "02",
    title: "Temporary Canteens",
    lead: "Site canteens for construction sites, exhibitions, seminars, training programs and corporate gatherings.",
    body: [
      "Catering for a diverse global workforce requires careful consideration. We provide balanced, nutritious meals at reasonable prices for guests, trainees and staff from every background, with timely service and cost-effectiveness.",
      "Our approach is built on transparency and reliability: we maintain open, direct communication with clients throughout the contract period to ensure quality, performance and service excellence.",
    ],
    clients: [
      "ALEC",
      "ASGC",
      "Bhatia",
      "National Paints",
      "Azizi",
      "Reem Capital",
      "Shapoorji Pallonji",
      "Lootha",
      "Emaar",
      "AG Engineering",
    ],
    image: {
      src: "/images/catering/temporary-canteen-container.webp",
      alt: "Black container canteen with outdoor seating, ready for a project site",
    },
  },
  {
    id: "tiffin-services",
    index: "03",
    title: "Tiffin Services",
    lead: "Home-style, freshly prepared meals delivered daily in specially designed containers.",
    body: [
      "Our Tiffin Services bring the warmth of traditional cooking straight to your doorstep, freeing you from the demands of meal preparation so you can savour life’s most precious moments.",
      "We deliver the best of home-cooked recipes, prepared using traditional and authentic methods so each dish retains its unique flavour and nutritional value — ideal for anyone seeking healthy, home-style food every day.",
    ],
    image: {
      src: "/images/catering/tiffin-meals.webp",
      alt: "Foil tiffin containers filled with salads, rice and grilled dishes",
    },
  },
  {
    id: "event-catering",
    index: "04",
    title: "Event Catering",
    lead: "Birthday parties, weddings, corporate events, exhibitions and meetings.",
    body: [
      "The success of any event hinges on two crucial elements: inviting the right guests and serving exceptional food. Our team works closely with you to craft culinary experiences that leave a lasting impression.",
      "We focus on quality, presentation, service and the overall experience — building strong relationships and delivering a complete, personalised experience for every client and their guests.",
    ],
    image: {
      src: "/images/catering/event-buffet.webp",
      alt: "Corporate guests mingling beside an elegant buffet",
    },
  },
  {
    id: "food-truck-kiosk",
    index: "05",
    title: "Food Truck & Kiosk",
    lead: "Mobile food trucks and kiosks that bring fresh food to events, sites and communities.",
    body: [
      "From exhibitions and community events to busy project sites, our food truck and kiosk formats serve freshly prepared food and beverages wherever your people are.",
    ],
    image: {
      src: "/images/catering/food-truck-kiosk.webp",
      alt: "Food truck kiosk with a striped awning and bar stools at an indoor venue",
    },
  },
];

export const siteCanteenSteps = [
  {
    title: "Space on your plot",
    text: "The client allocates a suitable space on the project plot for our container.",
  },
  {
    title: "Minimal utilities",
    text: "Only a single-phase electrical connection and a water connection are needed.",
  },
  {
    title: "Central kitchen + on-site prep",
    text: "Main cooking happens in our central kitchen; tea, coffee, juice and sandwiches are prepared on-site.",
  },
  {
    title: "Affordable, pay-as-you-go",
    text: "Affordable prices, paid by staff on purchase. The menu includes sandwiches, biryanis, and hot and cold beverages.",
  },
  {
    title: "Trained staff, strict hygiene",
    text: "Professionally trained food handlers and strict hygiene in packaging, storage and serving.",
  },
  {
    title: "Approvals & clean exit",
    text: "We obtain all government approvals and remove the container and equipment when the project ends.",
  },
];

export const cateringGallery: Img[] = [
  { src: "/images/catering/mezze-platter.webp", alt: "Top-down view of mezze, soup and wraps on a wooden board" },
  { src: "/images/catering/plated-fine-dining.webp", alt: "Fine-dining plate of seared meat on a green ceramic plate" },
  { src: "/images/catering/container-dining.webp", alt: "Container restaurant terrace with long dining tables at dusk" },
];
