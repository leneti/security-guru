import { About, Footer, Hero, Navigation } from "@/payload-types";

import type { AboutData, FooterData, HeroData, NavigationData, PageData } from "./page-data-types";
import { getPayloadClient } from "./payload-client";

const DEFAULT_HERO_DATA: HeroData = {
  badge_text: "Saugumas Pirmiausia",
  heading: "Kokybė, Profesionalumas ir Inovatyvumas",
  description:
    "Apsaugokite tai, kas svarbiausia. Profesionalios saugumo sistemos namams ir verslui Vilniuje ir Vilniaus apskrityje.",
  services_button: {
    type: "primary",
    text: "Mūsų Paslaugos",
  },
  contact_button: {
    type: "secondary",
    text: "Gauti Pasiūlymą",
  },
  scroll_icon: "keyboard_arrow_down",
};

const DEFAULT_FOOTER_DATA: FooterData = {
  description:
    "Kokybiški saugumo sprendimai jūsų namams ir verslui. Ilgametė patirtis ir profesionalumas garantuoja jūsų ramybę.",
  navigation_links: [
    { id: "1", label: "Paslaugos", href: "#services" },
    { id: "2", label: "Apie mus", href: "#about" },
    { id: "3", label: "Kontaktai", href: "#contact" },
  ],
  company_details: {
    company_name: 'MB "Security Guru"',
    company_code: "306109454",
    location: "Vilnius, Lietuva",
  },
  copyright_text: "2026 Security Guru. Visos teisės saugomos.",
};

const DEFAULT_NAVIGATION_DATA: NavigationData = {
  nav_links: [
    { id: "1", href: "#services", label: "Paslaugos" },
    { id: "2", href: "#about", label: "Apie mus" },
  ],
  contact_button_text: "Susisiekti",
  menu_icon: "menu",
  close_icon: "close",
};

const DEFAULT_ABOUT_DATA: AboutData = {
  subtitle: "Kodėl rinktis mus?",
  heading: "Saugumas reikalauja Ekspertų Dėmesio",
  description:
    "SECURITY GURU teikia pirmenybę jūsų saugumo reikalavimus. Mūsų ekspertai skiria laiką suprasti jūsų rūpesčius ir pateikia asmeninius sprendimus.",
  features: [
    {
      id: "1",
      title: "Visapusiški sprendimai",
      description: "Nuo signalizacijos iki vaizdo stebėjimo - viskas iš vienų rankų.",
      icon: "check",
    },
    {
      id: "2",
      title: "Orientacija į klientą",
      description: "Glaudžiai bendradarbiaujame užtikrindami jūsų ramybę.",
      icon: "check",
    },
    {
      id: "3",
      title: "Lankstumas",
      description: "Dirbame 7 dienas per savaitę, nuo 9 iki 21 val.",
      icon: "check",
    },
  ],
  quality_overlay: {
    title: "Garantuota Kokybė",
    description: "Naudojame tik sertifikuotą ir patikimą įrangą.",
    icon: "verified_user",
  },
};

/**
 * Transforms raw hero global data into HeroData type
 */
function transformHeroData(hero: Hero | null): HeroData {
  if (!hero) {
    return DEFAULT_HERO_DATA;
  }

  return {
    badge_text: hero.badge_text || DEFAULT_HERO_DATA.badge_text,
    heading: hero.heading || DEFAULT_HERO_DATA.heading,
    description: hero.description || DEFAULT_HERO_DATA.description,
    services_button: {
      type: hero.services_button?.type || DEFAULT_HERO_DATA.services_button.type,
      text: hero.services_button?.text || DEFAULT_HERO_DATA.services_button.text,
    },
    contact_button: {
      type: hero.contact_button?.type || DEFAULT_HERO_DATA.contact_button.type,
      text: hero.contact_button?.text || DEFAULT_HERO_DATA.contact_button.text,
    },
    scroll_icon: hero.scroll_icon || DEFAULT_HERO_DATA.scroll_icon,
  };
}

/**
 * Transforms raw about global data into AboutData type
 */
function transformAboutData(about: About | null): AboutData {
  if (!about) {
    return DEFAULT_ABOUT_DATA;
  }

  return {
    subtitle: about.subtitle || DEFAULT_ABOUT_DATA.subtitle,
    heading: about.heading || DEFAULT_ABOUT_DATA.heading,
    description: about.description || DEFAULT_ABOUT_DATA.description,
    features: about.features?.map((f) => f) || DEFAULT_ABOUT_DATA.features,
    quality_overlay: {
      title: about.quality_overlay?.title || DEFAULT_ABOUT_DATA.quality_overlay.title,
      description:
        about.quality_overlay?.description || DEFAULT_ABOUT_DATA.quality_overlay.description,
      icon: about.quality_overlay?.icon || DEFAULT_ABOUT_DATA.quality_overlay.icon,
    },
  };
}

/**
 * Transforms raw footer global data into FooterData type
 */
function transformFooterData(footer: Footer | null): FooterData {
  if (!footer) {
    return DEFAULT_FOOTER_DATA;
  }

  return {
    description: footer.description || DEFAULT_FOOTER_DATA.description,
    navigation_links:
      footer.navigation_links?.map((link) => ({
        id: link?.id || "",
        label: link?.label || "",
        href: link?.href || "",
      })) || DEFAULT_FOOTER_DATA.navigation_links,
    company_details: {
      company_name:
        footer.company_details?.company_name || DEFAULT_FOOTER_DATA.company_details.company_name,
      company_code:
        footer.company_details?.company_code || DEFAULT_FOOTER_DATA.company_details.company_code,
      location: footer.company_details?.location || DEFAULT_FOOTER_DATA.company_details.location,
    },
    copyright_text: footer.copyright_text || DEFAULT_FOOTER_DATA.copyright_text,
  };
}

/**
 * Transforms raw navigation global data into NavigationData type
 */
function transformNavigationData(navigation: Navigation | null): NavigationData {
  if (!navigation) {
    return DEFAULT_NAVIGATION_DATA;
  }

  return {
    nav_links:
      navigation.nav_links?.map((link) => ({
        id: link?.id || "",
        href: link?.href || "",
        label: link?.label || "",
      })) || DEFAULT_NAVIGATION_DATA.nav_links,
    contact_button_text:
      navigation.contact_button_text || DEFAULT_NAVIGATION_DATA.contact_button_text,
    menu_icon: navigation.menu_icon || DEFAULT_NAVIGATION_DATA.menu_icon,
    close_icon: navigation.close_icon || DEFAULT_NAVIGATION_DATA.close_icon,
  };
}

/**
 * Fetches all page data in parallel to avoid waterfalls.
 * This combines services, hero, about, footer, and navigation data fetching into a single function.
 */
export async function getPageData(): Promise<PageData> {
  try {
    const payload = await getPayloadClient();

    // Fetch all data in parallel
    const [servicesResult, heroGlobal, aboutGlobal, footerGlobal, navigationGlobal] =
      await Promise.all([
        payload.find({ collection: "services", limit: 0 }),
        payload.findGlobal({ slug: "hero" }),
        payload.findGlobal({ slug: "about" }),
        payload.findGlobal({ slug: "footer" }),
        payload.findGlobal({ slug: "navigation" }),
      ]);

    return {
      services: servicesResult.docs,
      hero: transformHeroData(heroGlobal),
      about: transformAboutData(aboutGlobal),
      footer: transformFooterData(footerGlobal),
      navigation: transformNavigationData(navigationGlobal),
    };
  } catch {
    console.warn("Failed to fetch page data, using defaults");
    return {
      services: [],
      hero: DEFAULT_HERO_DATA,
      about: DEFAULT_ABOUT_DATA,
      footer: DEFAULT_FOOTER_DATA,
      navigation: DEFAULT_NAVIGATION_DATA,
    };
  }
}
