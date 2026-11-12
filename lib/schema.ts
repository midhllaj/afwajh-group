import { contact, keyStats, ownerMessage, site } from "@/data/site";
import { businesses } from "@/data/businesses";
import { absoluteUrl } from "./utils";

export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": absoluteUrl("/#organization"),
  name: site.name,
  alternateName: [...site.alternateNames],
  url: absoluteUrl("/"),
  logo: absoluteUrl("/images/logos/afwajh-logo-dark.png"),
  foundingDate: String(site.established),
  description: site.description,
  email: contact.email,
  telephone: contact.landline,
  address: {
    "@type": "PostalAddress",
    streetAddress: contact.address.line1,
    addressLocality: contact.address.city,
    postOfficeBoxNumber: "430400",
    addressCountry: "AE",
  },
  areaServed: ["Dubai", "Abu Dhabi", "Sharjah", "Ras Al Khaimah"],
  founder: { "@type": "Person", name: ownerMessage.signature },
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    minValue: keyStats.find((s) => s.label === "People")?.value,
  },
  knowsAbout: businesses.map((b) => b.label),
  subOrganization: businesses.map((b) => ({
    "@type": "Organization",
    name: b.name,
    url: absoluteUrl(b.href),
    description: b.summary,
  })),
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: contact.call.href.replace("tel:", ""),
    email: contact.email,
    areaServed: "AE",
    availableLanguage: ["English", "Arabic"],
  },
  sameAs: Object.values(contact.social).filter(Boolean),
});

export const faqSchema = (items: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

/** Tells Google which name to show for the site in search results. */
export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": absoluteUrl("/#website"),
  name: site.shortName,
  alternateName: [site.name, ...site.alternateNames.filter((n) => n !== site.shortName)],
  url: absoluteUrl("/"),
  publisher: { "@id": absoluteUrl("/#organization") },
  inLanguage: "en-AE",
});

export const localBusinessSchema = ({
  type,
  name,
  address,
  locality,
  region,
  lat,
  lng,
  url,
  telephone,
  servesCuisine,
}: {
  type: string;
  name: string;
  address: string;
  locality: string;
  region: string;
  lat?: number;
  lng?: number;
  url: string;
  telephone?: string;
  servesCuisine?: string[];
}) => ({
  "@context": "https://schema.org",
  "@type": type,
  name,
  url: absoluteUrl(url),
  parentOrganization: { "@id": absoluteUrl("/#organization") },
  address: {
    "@type": "PostalAddress",
    streetAddress: address,
    addressLocality: locality,
    addressRegion: region,
    addressCountry: "AE",
  },
  ...(lat && lng ? { geo: { "@type": "GeoCoordinates", latitude: lat, longitude: lng } } : {}),
  ...(telephone ? { telephone } : {}),
  ...(servesCuisine ? { servesCuisine } : {}),
});
