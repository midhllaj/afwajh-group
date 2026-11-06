import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import Intro from "@/components/home/Intro";
import BusinessIndex from "@/components/home/BusinessIndex";
import Spotlight from "@/components/home/Spotlight";
import OwnerQuote from "@/components/home/OwnerQuote";
import VisionMission from "@/components/home/VisionMission";
import Strengths from "@/components/home/Strengths";
import ClientMarquee from "@/components/home/ClientMarquee";
import ContactCta from "@/components/home/ContactCta";
import { businessBySlug } from "@/data/businesses";
import { retailIntro } from "@/data/retail";
import { restaurantsIntro } from "@/data/restaurants";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({ title: "Seven businesses. One standard of excellence.", description: site.description, path: "/" }),
  title: { absolute: `${site.name} — Seven businesses. One standard of excellence.` },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <BusinessIndex />
      <Spotlight
        business={businessBySlug("supermarkets-minimarts")}
        title={"Everyday essentials,\n*fresh* every day"}
        body={retailIntro}
        secondary={{ src: "/images/retail/fresh-fruit-wall.webp", alt: "Wall of fresh fruit on supermarket shelves" }}
      />
      <Spotlight
        business={businessBySlug("restaurants-cafeterias")}
        title={"Eight venues,\none *table*"}
        body={restaurantsIntro}
        secondary={{ src: "/images/restaurants/latte-art-pour.webp", alt: "Barista pouring latte art" }}
        flip
      />
      <OwnerQuote />
      <VisionMission />
      <Strengths />
      <ClientMarquee />
      <ContactCta />
    </>
  );
}
