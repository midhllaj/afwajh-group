// Shared content types. Every page reads its copy from /data so text can be
// edited without touching components.

export type Emirate = "Dubai" | "Abu Dhabi" | "Sharjah" | "Ras Al Khaimah";

export interface Img {
  src: string;
  alt: string;
  /** Set to true when the photo is an illustrative stock image, not the actual venue. */
  illustrative?: boolean;
}

export interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  /** Number of decimals to show while counting. */
  decimals?: number;
}

export interface BusinessSummary {
  slug: string;
  href: string;
  index: string;
  name: string;
  shortName: string;
  arabicName?: string;
  tagline: string;
  summary: string;
  image: Img;
  employees: number | null;
  priority: 1 | 2 | 3;
}
