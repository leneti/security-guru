import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { getPageData } from "@/lib/page-data";

export default async function HomePage() {
  // Fetch all page data in parallel to avoid waterfalls
  const { services, hero, about, navigation, footer } = await getPageData();

  return (
    <>
      <Header data={navigation} />

      <main id="main-content" className="flex min-h-screen flex-col">
        <HeroSection data={hero} />
        <ServicesSection services={services} />
        <AboutSection data={about} />
        <ContactSection />
      </main>

      <Footer data={footer} />
    </>
  );
}
