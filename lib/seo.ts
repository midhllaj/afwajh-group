import type { Metadata } from "next";
import { site } from "@/data/site";
import { absoluteUrl } from "./utils";

interface PageMeta {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
}

/** Builds unique per-page metadata including Open Graph and Twitter cards. */
export function pageMetadata({ title, description, path, image, imageAlt }: PageMeta): Metadata {
  // Per-page social cards live in /public/og (named after the last path segment).
  const slug = path === "/" ? "home" : path.split("/").filter(Boolean).pop();
  const ogImage = image ?? `/og/${slug}.jpg`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: absoluteUrl(path),
      siteName: site.name,
      title: `${title} | ${site.shortName}`,
      description,
      locale: "en_AE",
      images: [{ url: ogImage, alt: imageAlt ?? title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.shortName}`,
      description,
      images: [ogImage],
    },
  };
}
