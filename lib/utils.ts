export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export const formatAED = (value: number, decimals = 2) =>
  new Intl.NumberFormat("en-AE", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);

export const formatCompactAED = (value: number) =>
  `AED ${new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(value)}`;

export const absoluteUrl = (path = "/") => {
  const base = (process.env.SITE_URL || "https://afwajhgroup.com").replace(/\/$/, "");
  return `${base}${path}`;
};
