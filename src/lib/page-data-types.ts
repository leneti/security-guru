import type { About, Footer, Hero, Navigation, Service } from "@/payload-types";

type DePayload<T> = Omit<T, "id" | "createdAt" | "updatedAt">;

export type HeroData = DePayload<Hero>;
export type FooterData = DePayload<Footer>;
export type NavigationData = DePayload<Navigation>;
export type AboutData = DePayload<About>;

export interface PageData {
  services: Service[];
  hero: HeroData;
  about: AboutData;
  footer: FooterData;
  navigation: NavigationData;
}
