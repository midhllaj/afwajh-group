import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { IBM_Plex_Sans_Arabic, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import QuickContact from "@/components/layout/QuickContact";
import SmoothScroll from "@/components/providers/SmoothScroll";
import TransitionProvider from "@/components/providers/TransitionProvider";
import MotionDirector from "@/components/motion/MotionDirector";
import Loader from "@/components/motion/Loader";
import Cursor from "@/components/motion/Cursor";
import JsonLd from "@/components/seo/JsonLd";
import { site } from "@/data/site";
import { organizationSchema } from "@/lib/schema";
import { defaultLocale, localeDir } from "@/lib/i18n";

// Clash Display & Satoshi: Fontshare (ITF Free Font License), self-hosted from app/fonts.
const clash = localFont({
  src: [
    { path: "./fonts/ClashDisplay-500.woff2", weight: "500" },
    { path: "./fonts/ClashDisplay-600.woff2", weight: "600" },
  ],
  variable: "--font-clash",
  display: "swap",
});

const satoshi = localFont({
  src: [
    { path: "./fonts/Satoshi-400.woff2", weight: "400" },
    { path: "./fonts/Satoshi-500.woff2", weight: "500" },
    { path: "./fonts/Satoshi-700.woff2", weight: "700" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-instrument",
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
    default: `${site.name} — Seven businesses. One standard of excellence.`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_AE",
    images: [{ url: "/og/home.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0A2321",
  width: "device-width",
  initialScale: 1,
};

// Before first paint: enable motion styles (unless reduced motion) and decide whether
// the intro loader plays (first visit only).
const bootScript = `(function(){var d=document.documentElement;try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('motion');if(!localStorage.getItem('afw-intro-seen'))d.classList.add('intro-play')}catch(e){}})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang={defaultLocale}
      dir={localeDir[defaultLocale]}
      className={`${clash.variable} ${satoshi.variable} ${instrument.variable} ${plexArabic.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <JsonLd data={organizationSchema()} />
      </head>
      <body>
        <SmoothScroll />
        <TransitionProvider>
          <Loader />
          <Header />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <QuickContact />
        </TransitionProvider>
        <MotionDirector />
        <Cursor />
      </body>
    </html>
  );
}
