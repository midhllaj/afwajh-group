import { contact, site } from "@/data/site";
import { absoluteUrl } from "./utils";

export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": absoluteUrl("/#organization"),
  name: site.name,
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
  sameAs: Object.values(contact.social).filter(Boolean),
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
