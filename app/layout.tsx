import type { Metadata, Viewport } from "next";
import {
  IBM_Plex_Sans_Arabic,
  Instrument_Serif,
  Manrope,
} from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import QuickContact from "@/components/layout/QuickContact";
import SmoothScroll from "@/components/providers/SmoothScroll";
import TransitionProvider from "@/components/providers/TransitionProvider";
import MotionProvider from "@/components/providers/MotionProvider";
import Loader from "@/components/ui/Loader";
import Cursor from "@/components/ui/Cursor";
import JsonLd from "@/components/seo/JsonLd";
import { site } from "@/data/site";
import { organizationSchema } from "@/lib/schema";
import { defaultLocale, localeDir } from "@/lib/i18n";

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500"],
  variable: "--font-plex-arabic",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Retail, Hospitality, Catering & More in the UAE`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_AE",
    images: [
      { url: "/og/og-default.jpg", width: 1200, height: 630, alt: site.name },
    ],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/icon.png", apple: "/apple-icon.png" },
};

export const viewport: Viewport = {
  themeColor: "#0B2826",
  width: "device-width",
  initialScale: 1,
};

// Runs before first paint: skip the intro loader on repeat visits / reduced motion.
const introScript = `try{if(localStorage.getItem('afw-intro-seen')||matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('intro-seen')}}catch(e){document.documentElement.classList.add('intro-seen')}`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang={defaultLocale}
      dir={localeDir[defaultLocale]}
      className={`${instrument.variable} ${manrope.variable} ${plexArabic.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <JsonLd data={organizationSchema()} />
      </head>
      <body>
        <SmoothScroll />
        <MotionProvider>
          <TransitionProvider>
            <Loader />
            <Header />
            <main id="main" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <Footer />
            <QuickContact />
          </TransitionProvider>
          <Cursor />
        </MotionProvider>
      </body>
    </html>
  );
}
