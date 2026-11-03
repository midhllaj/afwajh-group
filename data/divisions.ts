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
  gallery: [
    { src: "/images/trading/pallet-racking.webp", alt: "Tall pallet racking stacked with cartons" },
    { src: "/images/trading/forklift-loading-truck.webp", alt: "Forklift loading a pallet onto a truck" },
    { src: "/images/trading/forklift-warehouse.webp", alt: "Forklift parked inside a warehouse" },
    { src: "/images/trading/delivery-van.webp", alt: "Open delivery van loaded with boxes" },
  ] satisfies Img[],
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
    image: { src: "/images/technical/steel-structure.webp", alt: "Worker on a steel structure high above a construction site", illustrative: true },
  },
  {
    title: "Engraving & Ornamentation Works",
    text: "Decorative engraving and ornamental detailing that add character and craftsmanship to facades, interiors and feature walls.",
    icon: "ornament",
    image: { src: "/images/technical/ornamental-carving.webp", alt: "Ornate carved stonework with geometric patterns", illustrative: true },
  },
  {
    title: "Shooting Ranges Works",
    text: "Specialist fit-out for indoor and outdoor shooting ranges, delivered to strict safety and performance requirements.",
    icon: "target",
    image: { src: "/images/technical/shooting-range.webp", alt: "Indoor shooting range with a target at the end of the lane", illustrative: true },
  },
  {
    title: "Parking Management Electronic Systems",
    text: "Installation and maintenance of electronic parking systems, including barriers, ticketing and access control, for smooth and secure vehicle flow.",
    icon: "parking",
    image: { src: "/images/technical/parking-barrier.webp", alt: "Automatic parking barrier at a car park entrance", illustrative: true },
  },
  {
    title: "False Ceiling & Light Partitions",
    text: "Clean, precise false ceilings and lightweight partitions that reshape interiors quickly while concealing services neatly.",
    icon: "ceiling",
    image: { src: "/images/technical/false-ceiling.webp", alt: "Office with a precise grid false ceiling", illustrative: true },
  },
  {
    title: "Swimming Pools Installation",
    text: "Installation works for residential and commercial swimming pools, coordinated carefully from preparation through to finishing.",
    icon: "pool",
    image: { src: "/images/technical/swimming-pool.webp", alt: "Villa infinity pool under a blue sky", illustrative: true },
  },
  {
    title: "Glass & Aluminium Installation & Maintenance",
    text: "Windows, doors, shopfronts, partitions and facade elements in glass and aluminium — installed accurately and kept in top condition.",
    icon: "glass",
    image: { src: "/images/technical/glass-aluminium.webp", alt: "Modern building with a glass and aluminium facade", illustrative: true },
  },
  {
    title: "Kitchens Installation",
    text: "Supply-ready installation of residential and commercial kitchens, with cabinetry, worktops and fittings aligned to a precise finish.",
    icon: "kitchen",
    image: { src: "/images/technical/kitchen.webp", alt: "Newly installed modern kitchen with island", illustrative: true },
  },
  {
    title: "Floor & Wall Tiling Works",
    text: "Expert floor and wall tiling in ceramic, porcelain and stone, laid level and true for durable, beautiful surfaces.",
    icon: "tiles",
    image: { src: "/images/technical/tiling.webp", alt: "Tiler setting floor tiles with levelling clips", illustrative: true },
  },
  {
    title: "Carpentry & Wood Flooring Works",
    text: "Bespoke joinery, doors, fitted furniture and wood flooring crafted for warmth, durability and a refined finish.",
    icon: "wood",
    image: { src: "/images/technical/wood-flooring.webp", alt: "Craftsman laying wooden floorboards", illustrative: true },
  },
] as const;

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

// Trades from the client brief. [CONFIRM: full list of trades supplied]
export const labourTrades = [
  "Masons",
  "Carpenters",
  "Steel fixers",
  "Electricians",
  "Plumbers",
  "Equipment operators",
  "Drivers",
  "Helpers",
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
  { src: "/images/labour/high-rise-crew.webp", alt: "Crew in safety gear working on a high-rise building site" },
  { src: "/images/labour/scaffolding-palms.webp", alt: "Workers on scaffolding behind palm trees" },
  { src: "/images/labour/masons-brick-wall.webp", alt: "Masons building a brick wall on site" },
  { src: "/images/labour/steel-fixer-rebar.webp", alt: "Steel fixer securing reinforcement bars" },
  { src: "/images/labour/site-supervisors.webp", alt: "Two site supervisors in high-visibility vests" },
  { src: "/images/labour/hard-hats.webp", alt: "Workers in hard hats and safety vests on site" },
  { src: "/images/company/fhm/fhm-team-safety-briefing.webp", alt: "Group site team in PPE at a safety briefing" },
];
