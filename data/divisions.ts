import type { Img } from "./types";

/* ---------------------------------------------------------------- Trading */

export const trading = {
  name: "Afwajh General Trading",
  locations: ["Al Nahda 1, Dubai", "Al Qusais 1, Dubai"],
  employees: 18,
  intro:
    "Afwajh General Trading operates as the key supply and distribution arm of the group, supporting both internal operations and external clients.",
  body: [
    "The division focuses on sourcing, trading, and delivering a wide range of products while maintaining quality, efficiency, and reliability across the supply chain. We work with trusted partners and suppliers to ensure consistent product standards and timely delivery.",
    "Our streamlined operations and strong logistics network enable us to meet diverse client requirements with flexibility and precision. We are committed to building long-term business relationships through dependable service and a customer-focused approach.",
  ],
  pillars: [
    { title: "Sourcing", text: "Trusted partners and suppliers ensure consistent product standards." },
    { title: "Trading", text: "A wide range of products for the group’s outlets and for external clients." },
    { title: "Delivery", text: "Streamlined logistics for timely, flexible and precise delivery." },
    { title: "Relationships", text: "Long-term partnerships built on dependable, customer-focused service." },
  ],
  // [CONFIRM: list of product categories] — add strings here to show them on the page.
  productCategories: [] as string[],
  image: {
    src: "/images/trading/general-trading-warehouse.webp",
    alt: "Warehouse staff in hard hats checking stock on tall shelving",
  } satisfies Img,
  secondaryImage: {
    src: "/images/fhm/fhm-forklift-loading.webp",
    alt: "Forklift loading goods onto a truck at a warehouse dock",
  } satisfies Img,
};

/* -------------------------------------------------------------- Technical */

export const technical = {
  name: "Afwajh Technical Services",
  arabicName: "افواجه للخدمات الفنية",
  intro:
    "Afwajh Technical Services brings the group’s standard of reliability to building fit-out, installation and maintenance — a single licensed partner for the finishing and technical works that make spaces safe, functional and beautiful.",
  licence: {
    authority: "Dubai Department of Economy & Tourism",
    number: "1619941",
    type: "Professional License · Sole Establishment",
    category: "Mohammed Bin Rashid Establishment",
    owner: "Bilal Hassan Ali Abdulla",
    issued: "27/04/2026",
    expires: "26/04/2027",
  },
};

export const technicalServices = [
  {
    title: "Steel Products Installation & Maintenance",
    text: "Installation and upkeep of structural and architectural steel elements — frames, staircases, railings and supports — built to specification and maintained for long service life.",
    icon: "steel",
  },
  {
    title: "Engraving & Ornamentation Works",
    text: "Decorative engraving and ornamental detailing that add character and craftsmanship to facades, interiors and feature walls.",
    icon: "ornament",
  },
  {
    title: "Shooting Ranges Works",
    text: "Specialist fit-out for indoor and outdoor shooting ranges, delivered to strict safety and performance requirements.",
    icon: "target",
  },
  {
    title: "Parking Management Electronic Systems",
    text: "Installation and maintenance of electronic parking systems, including barriers, ticketing and access control, for smooth and secure vehicle flow.",
    icon: "parking",
  },
  {
    title: "False Ceiling & Light Partitions",
    text: "Clean, precise false ceilings and lightweight partitions that reshape interiors quickly while concealing services neatly.",
    icon: "ceiling",
  },
  {
    title: "Swimming Pools Installation",
    text: "Installation works for residential and commercial swimming pools, coordinated carefully from preparation through to finishing.",
    icon: "pool",
  },
  {
    title: "Glass & Aluminium Installation & Maintenance",
    text: "Windows, doors, shopfronts, partitions and facade elements in glass and aluminium — installed accurately and kept in top condition.",
    icon: "glass",
  },
  {
    title: "Kitchens Installation",
    text: "Supply-ready installation of residential and commercial kitchens, with cabinetry, worktops and fittings aligned to a precise finish.",
    icon: "kitchen",
  },
  {
    title: "Floor & Wall Tiling Works",
    text: "Expert floor and wall tiling in ceramic, porcelain and stone, laid level and true for durable, beautiful surfaces.",
    icon: "tiles",
  },
  {
    title: "Carpentry & Wood Flooring Works",
    text: "Bespoke joinery, doors, fitted furniture and wood flooring crafted for warmth, durability and a refined finish.",
    icon: "wood",
  },
] as const;

export const technicalGallery: Img[] = [
  { src: "/images/technical/glass-facade.webp", alt: "Glass and aluminium curtain-wall facade", illustrative: true },
  { src: "/images/technical/false-ceiling.webp", alt: "Lobby with a geometric timber false ceiling", illustrative: true },
  { src: "/images/technical/steel-welding.webp", alt: "Welder working on steel with sparks flying", illustrative: true },
  { src: "/images/technical/kitchen-installation.webp", alt: "Newly installed kitchen with dark cabinetry and wooden floor", illustrative: true },
  { src: "/images/technical/swimming-pool.webp", alt: "Villa swimming pool lit at twilight", illustrative: true },
  { src: "/images/technical/carpentry.webp", alt: "Carpenter smiling while working on timber in a workshop", illustrative: true },
  { src: "/images/technical/floor-tiling.webp", alt: "Grey stone floor tiles laid in a neat grid", illustrative: true },
];

/* ------------------------------------------------------------------ Labour */

export const labour = {
  // [CONFIRM exact company name]
  name: "Afwajh Labour Supply & Contracting",
  intro:
    "Reliable manpower is the foundation of every successful construction project. Afwajh Labour Supply & Contracting provides skilled and unskilled workers to contractors and developers across the UAE — mobilised quickly, supervised properly and fully compliant with UAE labour law.",
  body: [
    "We draw on the group’s day-to-day experience on large construction sites — through FHM General Transport’s earthworks for leading developers and our site canteens for major contractors — to understand exactly what project teams need from their workforce.",
    "Whether you need a single trade crew for a few weeks or a multi-trade team for the full length of a project, we match the right people to the job and stay accountable for their performance, welfare and safety.",
  ],
  // [CONFIRM: headcount, number of trades, years of operation]
  stats: [] as { value: number; suffix?: string; label: string }[],
};

// [CONFIRM: full list of trades supplied]
export const labourTrades = [
  "Masons",
  "Carpenters",
  "Steel fixers",
  "Equipment operators",
  "Drivers",
  "Helpers & general labour",
];

export const labourOffer = [
  {
    title: "Skilled & unskilled manpower",
    text: "Qualified tradespeople and general labour, screened for experience and matched to each site’s requirements.",
  },
  {
    title: "Short- and long-term contracts",
    text: "Flexible deployment, from short-notice peak support to full-duration project teams.",
  },
  {
    title: "Safety-trained workers",
    text: "Workers briefed on site safety, PPE use and toolbox-talk practices before mobilisation.",
  },
  {
    title: "UAE labour-law compliance",
    text: "Contracts, wages and worker welfare managed in line with UAE labour law and regulations.",
  },
];

export const labourProcess = [
  { title: "Requirement", text: "Share trades, headcount, duration and site location." },
  { title: "Selection", text: "We shortlist and screen workers matched to your scope." },
  { title: "Mobilisation", text: "Documentation, safety induction and transport to site." },
  { title: "Supervision", text: "Ongoing coordination, attendance and performance follow-up." },
];

export const labourImages: Img[] = [
  { src: "/images/labour/construction-team.webp", alt: "Construction team in hard hats and high-visibility vests on a large site", illustrative: true },
  { src: "/images/labour/worker-power-tool.webp", alt: "Worker in a hard hat and safety vest using a power tool on timber", illustrative: true },
  { src: "/images/labour/ppe-hard-hats.webp", alt: "Orange hard hats and high-visibility vests hanging on a wall", illustrative: true },
  { src: "/images/fhm/fhm-team-safety-briefing.webp", alt: "Site team in PPE gathered for a safety briefing" },
];
