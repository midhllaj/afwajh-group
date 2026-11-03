import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import IntroStats from "@/components/home/IntroStats";
import FeaturedRetail from "@/components/home/FeaturedRetail";
import FeaturedRestaurants from "@/components/home/FeaturedRestaurants";
import CateringShowcase from "@/components/home/CateringShowcase";
import OtherBusinesses from "@/components/home/OtherBusinesses";
import VisionMission from "@/components/home/VisionMission";
import CoreStrengths from "@/components/home/CoreStrengths";
import Workforce from "@/components/home/Workforce";
import ClientMarquee from "@/components/home/ClientMarquee";
import ContactCTA from "@/components/home/ContactCTA";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Seven businesses. One standard of excellence.",
    description: site.description,
    path: "/",
  }),
  title: { absolute: `${site.name} | Seven businesses. One standard of excellence.` },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <IntroStats />
      <FeaturedRetail />
      <FeaturedRestaurants />
      <CateringShowcase />
      <OtherBusinesses />
      <VisionMission />
      <CoreStrengths />
      <Workforce />
      <ClientMarquee />
      <ContactCTA />
    </>
  );
}
