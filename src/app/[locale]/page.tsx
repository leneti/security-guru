import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ShopSection from "@/components/ShopSection";
import ContactSection from "@/components/ContactSection";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <ShopSection />
      <ContactSection />
    </div>
  );
}
