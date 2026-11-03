import type { Img } from "./types";

export const fhm = {
  name: "FHM General Transport LLC",
  established: 2008,
  employees: 300,
  tagline:
    "Empowering Progress with Innovation, Reliability, and Excellence — Your Trusted Partner in Transportation and Machinery Solutions",
  about: [
    "FHM General Transport is a leading provider in the transportation and heavy machinery sector, recognized for its commitment to operational excellence and service reliability. Established in 2008, the company has consistently delivered high-performance solutions, positioning itself as a trusted partner in construction road machinery and demolition equipment services.",
    "Built on a foundation of innovation, precision, and client-centricity, FHM General Transport brings a strategic approach to every project. In-depth industry expertise enables us to understand complex operational demands and deliver tailored solutions aligned with each client’s requirements, with a strong focus on quality, safety, and performance.",
  ],
  vision:
    "To become the leading provider of heavy and light machinery services in the region by upholding excellence in every aspect of our operations, embracing continuous improvement through advanced technology and equipment investments, and focusing on exceeding customer expectations with precision and reliability.",
  mission:
    "To set the benchmark as the premier provider of construction rental machinery, ensuring unmatched customer satisfaction through an expanding fleet, cutting-edge equipment, and reliable solutions that meet the dynamic needs of our valued clients.",
  ceo: {
    name: "Haroon Sharifi",
    title: "Chief Executive Officer",
    photo: {
      src: "/images/company/fhm/ceo-haroon-sharifi.webp",
      alt: "Portrait of Haroon Sharifi, CEO of FHM General Transport",
    } satisfies Img,
    // Summary of the CEO message in the FHM company profile.
    message: [
      "Since our inception in 2008, FHM General Transport has been built on a commitment to excellence, innovation and customer satisfaction — setting new benchmarks in quality and reliability across transportation and machinery services.",
      "Every milestone is a testament to the trust our clients place in us. That trust drives us to keep evolving, adopt cutting-edge technology and deliver customised solutions for the unique needs of each project.",
      "Our dedicated professionals, with their expertise and unwavering focus on safety, are the backbone of our success. We don’t just deliver services — we create partnerships that drive growth for our clients and our community. We look forward to powering your success.",
    ],
  },
  contact: {
    address: "Office 402 (A), 99 Building, Oud Metha, Dubai, UAE",
    phones: [
      { display: "+971 58 886 6961", href: "tel:+971588866961" },
      { display: "+971 4 288 4679", href: "tel:+97142884679" },
    ],
    email: "info@fhmgeneraltransport.ae",
    website: "www.fhmgeneraltransport.ae",
    websiteHref: "https://www.fhmgeneraltransport.ae",
  },
};

export const fhmServices = [
  {
    title: "Comprehensive Machinery Solutions",
    text: "End-to-end equipment solutions for excavation, demolition and roadwork, with the right machines delivered to keep projects productive.",
    icon: "excavator",
  },
  {
    title: "Expert Demolition Solutions",
    text: "Advanced equipment and highly trained operators for projects of every size — from site preparation to structure dismantling — with precision, safety and minimal environmental impact.",
    icon: "hammer",
  },
  {
    title: "Machinery Rental & Leasing",
    text: "Access a wide range of high-performance machinery without long-term commitment — hourly, daily or monthly plans that scale with your operations.",
    icon: "key",
  },
  {
    title: "Maintenance & Support",
    text: "Ongoing maintenance and technical support for all rental machinery, with skilled technicians available round-the-clock to minimise downtime.",
    icon: "wrench",
  },
  {
    title: "Advanced Technology Solutions",
    text: "GPS-enabled equipment tracking and intelligent systems that optimise fuel efficiency, precision and performance.",
    icon: "gps",
  },
  {
    title: "Deep Excavation",
    text: "Deep excavation for large-scale construction and infrastructure, with state-of-the-art machinery and techniques that keep groundwork to standard and on schedule.",
    icon: "shovel",
  },
  {
    title: "Heavy Transport Services",
    text: "Safe and efficient transport of machinery and construction equipment, including oversized loads, delivered on time to your sites.",
    icon: "truck",
  },
] as const;

export const fleet = [
  "Excavators",
  "Shovels",
  "Bulldozers",
  "Loaders",
  "Graders",
  "Cranes",
  "Water tankers",
  "3XL & 2XL heavy vehicles",
  "6-wheel tipper trucks",
];

export const rentalPlans = ["Hourly", "Daily", "Monthly"];

export const coreWork = [
  {
    title: "Machinery Rental",
    text: "Modern, high-performance heavy machinery on hourly, daily or monthly plans, customised to your project. All equipment is meticulously maintained for optimal performance and safety.",
  },
  {
    title: "Excavation Works",
    text: "Deep excavation for large-scale construction and infrastructure projects, using state-of-the-art machinery and advanced techniques so site preparation and groundwork meet industry standards and project timelines.",
  },
];

export interface Project {
  id: string;
  name: string;
  client: string;
  clientGroup: "Gardinia / Azizi" | "Western Bainoona Group" | "BT Properties";
  location: string;
  emirate: "Dubai" | "Abu Dhabi";
  reference: string;
  value: number;
  description: string;
}

export const projects: Project[] = [
  {
    id: "azizi-venice-excavation",
    name: "Azizi Venice excavation & soil shifting",
    client: "Gardinia / Azizi",
    clientGroup: "Gardinia / Azizi",
    location: "Plot AV.BD.B.003, Dubai South",
    emirate: "Dubai",
    reference: "GAR-1117-CON-02-240069-AMND-01",
    value: 4206852.85,
    description: "Excavation and shifting of soil (up to 6 km from the project site) for proposed buildings at Azizi Venice.",
  },
  {
    id: "excavation-sand-shifting-support",
    name: "Excavation & sand shifting support",
    client: "Gardinia / Azizi",
    clientGroup: "Gardinia / Azizi",
    location: "Dubai South",
    emirate: "Dubai",
    reference: "GAR-1117-CON-02-230066",
    value: 30503382.07,
    description: "Excavation and sand shifting to support the main contractor in completing construction works.",
  },
  {
    id: "azizi-venice-lr005-lr006",
    name: "Azizi Venice plots LR005 & LR006",
    client: "Gardinia / Azizi",
    clientGroup: "Gardinia / Azizi",
    location: "Dubai South",
    emirate: "Dubai",
    reference: "GAR-1117-CON-02-240103",
    value: 2400346.56,
    description: "Excavation and sand shifting for Azizi Venice, covering Plot No. LR005 and LR006 (Plots 11 and 12).",
  },
  {
    id: "av-020",
    name: "AV-020 Azizi Venice",
    client: "Gardinia Building Contracting – Azizi",
    clientGroup: "Gardinia / Azizi",
    location: "Dubai South",
    emirate: "Dubai",
    reference: "GAR-1117.25-CON-02-250142",
    value: 13270085.28,
    description: "Excavation and shifting of soil.",
  },
  {
    id: "p-321",
    name: "P-321 Excavation, transport & filling",
    client: "Western Bainoona Group",
    clientGroup: "Western Bainoona Group",
    location: "Baniyas, Abu Dhabi",
    emirate: "Abu Dhabi",
    reference: "P-321",
    value: 14700000,
    description: "Excavation, transportation and filling works of WBG-P-321.",
  },
  {
    id: "dates-factory",
    name: "Dates Factory",
    client: "Gardinia Building Contracting – Azizi",
    clientGroup: "Gardinia / Azizi",
    location: "Dubai South",
    emirate: "Dubai",
    reference: "GAR-1137-CON-02-250011",
    value: 175609.6,
    description: "Excavation and shifting of soil.",
  },
  {
    id: "av-019",
    name: "AV-019 Azizi Venice",
    client: "Gardinia Building Contracting – Azizi",
    clientGroup: "Gardinia / Azizi",
    location: "Dubai South",
    emirate: "Dubai",
    reference: "GAR-1117.24-CON-02-250145",
    value: 4096920.72,
    description: "Excavation and shifting of soil.",
  },
  {
    id: "p-253-bt-waada",
    name: "P-253 BT Waada earthworks",
    client: "BT Properties DWC-LLC",
    clientGroup: "BT Properties",
    location: "Dubai South",
    emirate: "Dubai",
    reference: "BT-CON-P1-EW-2025-0001",
    value: 24624397.2,
    description: "Excavation and shifting of soil.",
  },
  {
    id: "boulevard-azizi-venice",
    name: "Boulevard, Azizi Venice",
    client: "Gardinia Contracting",
    clientGroup: "Gardinia / Azizi",
    location: "Dubai South",
    emirate: "Dubai",
    reference: "GAR-1117.36-CON-02-2501444",
    value: 14599654.44,
    description: "Excavation and shifting of soil.",
  },
  {
    id: "azizi-venice-lr006-lr007",
    name: "Azizi Venice plots AV LR 006 & LR 007",
    client: "Gardinia / Azizi",
    clientGroup: "Gardinia / Azizi",
    location: "Dubai South",
    emirate: "Dubai",
    reference: "GAR-1117-CON-02-240089",
    value: 3268380.78,
    description:
      "A residential development involving complex construction phases, including soil shifting, executed with precision and to the highest industry standards.",
  },
  {
    id: "azizi-venice-lr003",
    name: "Azizi Venice plot AV LR 003",
    client: "Gardinia / Azizi",
    clientGroup: "Gardinia / Azizi",
    location: "Dubai South",
    emirate: "Dubai",
    reference: "GAR-1117-CON-02-240097",
    value: 2585408.49,
    description:
      "A comprehensive residential project encompassing full soil shifting, construction, planning and execution.",
  },
];

export const portfolioValue = projects.reduce((sum, p) => sum + p.value, 0);

const site = (n: number, alt: string): Img => ({
  src: `/images/company/fhm/site-${String(n).padStart(2, "0")}.webp`,
  alt,
});

/** Stock photography for the FHM page. */
export const fhmImages = {
  intro: { src: "/images/fhm/bulldozers-levelling-aerial.webp", alt: "Two bulldozers levelling sand, seen from above" } satisfies Img,
  fleet: [
    { src: "/images/fhm/excavator-gravel.webp", alt: "Excavator working on a gravel mound" },
    { src: "/images/fhm/wheel-loader-sand.webp", alt: "Orange wheel loader on a sandy site" },
    { src: "/images/fhm/bulldozer-dusty-site.webp", alt: "Bulldozer pushing earth across a dusty site" },
    { src: "/images/fhm/mobile-crane.webp", alt: "Yellow mobile crane with its boom raised" },
    { src: "/images/fhm/tipper-unloading.webp", alt: "Tipper truck unloading rock at sunset" },
    { src: "/images/fhm/dump-truck-detail.webp", alt: "Close-up of a heavy dump truck’s wheel and body" },
  ] satisfies Img[],
};

/** Real FHM site photography from the company profile (small originals — used as thumbnails). */
export const fhmGallery: Img[] = [
  { src: "/images/company/fhm/fhm-team-safety-briefing.webp", alt: "FHM site team in high-visibility vests and hard hats during a safety briefing" },
  site(2, "Front view of a white FHM tipper truck on site"),
  site(7, "Excavator loading an FHM tipper truck at an excavation site"),
  site(5, "Row of FHM tipper trucks in front of a residential building under construction"),
  site(12, "Green excavator working on a construction site"),
  site(13, "Excavator and workers at a basement excavation"),
  site(16, "Earthworks across rolling sand dunes"),
  site(18, "Excavator loading a tipper truck in the sand"),
  site(20, "Zoomlion excavator on a graded plot"),
  site(22, "Large construction site with tower cranes and new buildings"),
  site(26, "Close-up of an FHM tipper truck cab"),
  site(11, "Workers fixing reinforcement steel inside a deep foundation pit"),
];
