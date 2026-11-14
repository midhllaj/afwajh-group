import type { MetadataRoute } from "next";
import { businesses } from "@/data/businesses";
import { absoluteUrl } from "@/lib/utils";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = [
    { path: "/", priority: 1 },
    { path: "/about", priority: 0.8 },
    { path: "/businesses", priority: 0.8 },
    ...businesses.map((b) => ({ path: b.href, priority: b.featured ? 0.9 : 0.8 })),
    { path: "/locations", priority: 0.7 },
    { path: "/clients", priority: 0.6 },
    { path: "/contact", priority: 0.7 },
  ];
  return pages.map((p) => ({
    url: absoluteUrl(p.path),
    lastModified: now,
    changeFrequency: "monthly",
    priority: p.priority,
  }));
}
