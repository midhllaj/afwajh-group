// Shared content types. Every page reads its copy from /data so text and images
// can be edited without touching components.

export type Emirate = "Dubai" | "Abu Dhabi" | "Sharjah" | "Ras Al Khaimah";

export interface Img {
  /** Path under /public, e.g. "/images/retail/supermarket-aisle.webp". */
  src: string;
  alt: string;
  /** True for stock photography standing in for a specific venue/service (shown as "Illustrative image"). */
  illustrative?: boolean;
}

export interface Stat {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export interface Contact {
  phones: { display: string; href: string }[];
  email: string;
  address?: string;
  website?: { display: string; href: string };
}

export interface Business {
  slug: string;
  href: string;
  /** "01" … "07" */
  index: string;
  name: string;
  shortName: string;
  arabicName?: string;
  /** Micro label, e.g. "Retail". */
  label: string;
  /** One-line positioning used in heroes and lists. */
  positioning: string;
  /** Short description for menus and the businesses index. */
  summary: string;
  /** Accent colour for this business's page. */
  accent: string;
  hero: Img;
  facts: Stat[];
  employees: number | null;
  contact: Contact;
  featured?: boolean;
}
