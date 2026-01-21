import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { getPayloadClient } from "@/lib/payload-client";

export default async function HomePage() {
  const payload = await getPayloadClient();
  const services = await payload
    .find({ collection: "services", limit: 0 })
    .then(({ docs }) => docs);

  return (
    <div className="flex min-h-screen flex-col">
      <HeroSection />
      <ServicesSection services={services} />
      <AboutSection />
      <ContactSection />
    </div>
  );
}
