import type { About, Footer, Hero, Navigation, Service, SiteMetadatum } from "@/payload-types";

type DePayload<T> = Omit<T, "id" | "createdAt" | "updatedAt">;

export type HeroData = DePayload<Hero>;
export type FooterData = DePayload<Footer>;
export type NavigationData = DePayload<Navigation>;
export type AboutData = DePayload<About>;
export type ServiceData = DePayload<Service>;
export type SiteMetadataData = DePayload<SiteMetadatum>;

export interface PageData {
  services: ServiceData[];
  hero: HeroData;
  about: AboutData;
  footer: FooterData;
  navigation: NavigationData;
}
