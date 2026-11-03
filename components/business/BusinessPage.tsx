import NextBusiness from "./NextBusiness";
import type { Business } from "@/data/types";

/** Wrapper for every business page: sets the accent colour and ends with "Next business". */
export default function BusinessPage({ business, children }: { business: Business; children: React.ReactNode }) {
  return (
    <div style={{ ["--accent" as string]: business.accent }}>
      {children}
      <NextBusiness slug={business.slug} />
    </div>
  );
}
