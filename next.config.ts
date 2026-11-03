import type { NextConfig } from "next";

// `STATIC_EXPORT=true npm run build` produces a fully static site in /out.
// A normal build (e.g. on Vercel) keeps on-the-fly image optimisation.
const isStaticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  output: isStaticExport ? "export" : undefined,
  trailingSlash: isStaticExport,
  images: {
    unoptimized: isStaticExport,
    qualities: [70, 80],
    formats: ["image/avif", "image/webp"],
  },
  env: {
    // Exposed to the browser so forms work in a static export too.
    FORM_ENDPOINT: process.env.FORM_ENDPOINT ?? "",
    SITE_URL: process.env.SITE_URL ?? "https://afwajhgroup.com",
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
