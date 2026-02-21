import type { Service } from "@/payload-types";

import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { getPayloadClient } from "@/lib/payload-client";

// Revalidate every hour (ISR) - avoids requiring MongoDB at build time while maintaining performance
export const revalidate = 3600;

export default async function HomePage() {
  let services: Service[] = [];

  try {
    const payload = await getPayloadClient();
    services = await payload
      .find({ collection: "services", limit: 0 })
      .then(({ docs }) => docs);
  } catch {
    console.warn("Failed to fetch services from database, using empty array");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <HeroSection />
      <ServicesSection services={services} />
      <AboutSection />
      <ContactSection />
    </div>
  );
}
