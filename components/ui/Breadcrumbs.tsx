import TLink from "./TLink";
import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl } from "@/lib/utils";

export interface Crumb {
  label: string;
  href?: string;
}

/** Home / … / Current, with BreadcrumbList JSON-LD. */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ label: "Home", href: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb" className="hero-fade" style={{ ["--d" as string]: 0.05 }}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            ...(c.href ? { item: absoluteUrl(c.href) } : {}),
          })),
        }}
      />
      <ol className="t-label flex flex-wrap items-center gap-x-3 gap-y-1 text-ivory/60">
        {all.map((c, i) => (
          <li key={c.label} className="flex items-center gap-3">
            {i > 0 && <span aria-hidden="true">/</span>}
            {c.href && i < all.length - 1 ? (
              <TLink href={c.href} className="transition-colors hover:text-gold-light">
                {c.label}
              </TLink>
            ) : (
              <span aria-current="page" className="text-ivory">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
