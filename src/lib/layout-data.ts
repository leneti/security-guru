import { cache } from "react";

import type { About, Hero, Navigation, Service, SiteMetadatum } from "@/payload-types";

import type { FooterData, NavigationData } from "./page-data-types";
import { getPayloadClient } from "./payload-client";

/**
 * Site metadata type using Omit to exclude payload metadata fields
 */
type SiteMetadataData = Omit<SiteMetadatum, "id" | "updatedAt" | "createdAt">;

const DEFAULT_METADATA: SiteMetadataData = {
  title: "Security Guru - Apsaugos sistemos Vilniuje",
  description:
    "Profesionalūs apsaugos sprendimai jūsų namams ir verslui. Apsaugos signalizacijos, įeigos kontrolės, priešgaisrinės signalizacijos, vaizdo stebėjimo sistemos Vilniuje ir Vilniaus apskrityje.",
};

const DEFAULT_MUI_SYMBOLS = [
  "call",
  "check",
  "verified_user",
  "close",
  "mail",
  "schedule",
  "location_on",
  "shield_lock",
  "menu",
  "keyboard_arrow_down",
  "chevron_left",
  "chevron_right",
  "production_quantity_limits",
];

/**
 * Result type for getLayoutData function
 */
export interface LayoutData {
  metadata: SiteMetadataData;
  muiSymbols: string[];
}

/**
 * Helper function to extract MUI symbols from various data sources
 */
function extractMuiSymbols(
  services: Service[],
  hero: Hero | null,
  about: About | null,
  navigation: Navigation | null,
): string[] {
  const serviceIcons = services.map(({ icon }) => icon);
  const heroIcons = hero?.scroll_icon ? [hero.scroll_icon] : [];
  const aboutIcons = (about?.features || []).map((feature) => feature?.icon).filter(Boolean);
  if (about?.quality_overlay?.icon) aboutIcons.push(about.quality_overlay.icon);

  const navigationIcons: string[] = [];
  if (navigation?.menu_icon) navigationIcons.push(navigation.menu_icon);
  if (navigation?.close_icon) navigationIcons.push(navigation.close_icon);

  return [
    ...new Set([
      ...DEFAULT_MUI_SYMBOLS,
      ...serviceIcons,
      ...heroIcons,
      ...aboutIcons,
      ...navigationIcons,
    ]),
    // The array must be sorted, as otherwise the HTTP request will fail
  ].sort();
}

/**
 * Fetches all layout data in parallel to avoid waterfalls.
 * This combines metadata and MUI symbols fetching into a single function.
 * Wrapped with cache() to deduplicate calls from generateMetadata and RootLayout.
 */
export const getLayoutData = cache(async function getLayoutData(): Promise<LayoutData> {
  try {
    const payload = await getPayloadClient();

    // Fetch all data in parallel
    const [siteMetadata, servicesResult, heroGlobal, aboutGlobal, navigationGlobal] =
      await Promise.all([
        payload.findGlobal({ slug: "site-metadata" }),
        payload.find({ collection: "services", limit: 0 }),
        payload.findGlobal({ slug: "hero" }),
        payload.findGlobal({ slug: "about" }),
        payload.findGlobal({ slug: "navigation" }),
      ]);

    const metadata: SiteMetadataData = {
      title: siteMetadata.title || DEFAULT_METADATA.title,
      description: siteMetadata.description || DEFAULT_METADATA.description,
    };

    const muiSymbols = extractMuiSymbols(
      servicesResult.docs,
      heroGlobal as Hero | null,
      aboutGlobal as About | null,
      navigationGlobal as Navigation | null,
    );

    return { metadata, muiSymbols };
  } catch {
    console.warn("Failed to fetch layout data, using defaults");
    return {
      metadata: DEFAULT_METADATA,
      muiSymbols: DEFAULT_MUI_SYMBOLS.sort(),
    };
  }
});

/**
 * Gets metadata for generateMetadata function.
 * Uses cached layout data to avoid duplicate fetches.
 */
export async function getMetadataData(): Promise<SiteMetadataData> {
  const { metadata } = await getLayoutData();
  return metadata;
}

/**
 * Gets MUI symbols for the layout.
 * Uses cached layout data to avoid duplicate fetches.
 */
export async function getAllMuiSymbols(): Promise<string[]> {
  const { muiSymbols } = await getLayoutData();
  return muiSymbols;
}

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

/**
 * Transforms raw footer global data into FooterData type
 */
function transformFooterData(footer: unknown): FooterData {
  const f = footer as {
    description?: string;
    navigation_links?: { id?: string; label?: string; href?: string }[];
    company_details?: {
      company_name?: string;
      company_code?: string;
      location?: string;
    };
    copyright_text?: string;
  } | null;

  if (!f) {
    return DEFAULT_FOOTER_DATA;
  }

  return {
    description: f.description || DEFAULT_FOOTER_DATA.description,
    navigation_links:
      f.navigation_links?.map((link) => ({
        id: link?.id || "",
        label: link?.label || "",
        href: link?.href || "",
      })) || DEFAULT_FOOTER_DATA.navigation_links,
    company_details: {
      company_name:
        f.company_details?.company_name || DEFAULT_FOOTER_DATA.company_details.company_name,
      company_code:
        f.company_details?.company_code || DEFAULT_FOOTER_DATA.company_details.company_code,
      location: f.company_details?.location || DEFAULT_FOOTER_DATA.company_details.location,
    },
    copyright_text: f.copyright_text || DEFAULT_FOOTER_DATA.copyright_text,
  };
}

/**
 * Transforms raw navigation global data into NavigationData type
 */
function transformNavigationData(navigation: unknown): NavigationData {
  const n = navigation as {
    nav_links?: { id?: string; href?: string; label?: string }[];
    contact_button_text?: string;
    menu_icon?: string;
    close_icon?: string;
  } | null;

  if (!n) {
    return DEFAULT_NAVIGATION_DATA;
  }

  return {
    nav_links:
      n.nav_links?.map((link) => ({
        id: link?.id || "",
        href: link?.href || "",
        label: link?.label || "",
      })) || DEFAULT_NAVIGATION_DATA.nav_links,
    contact_button_text: n.contact_button_text || DEFAULT_NAVIGATION_DATA.contact_button_text,
    menu_icon: n.menu_icon || DEFAULT_NAVIGATION_DATA.menu_icon,
    close_icon: n.close_icon || DEFAULT_NAVIGATION_DATA.close_icon,
  };
}

/**
 * Gets navigation data for the Header component.
 */
export async function getNavigationData(): Promise<NavigationData> {
  try {
    const payload = await getPayloadClient();
    const navigationGlobal = await payload.findGlobal({ slug: "navigation" });
    return transformNavigationData(navigationGlobal);
  } catch {
    console.warn("Failed to fetch navigation data, using defaults");
    return DEFAULT_NAVIGATION_DATA;
  }
}

/**
 * Gets footer data for the Footer component.
 */
export async function getFooterData(): Promise<FooterData> {
  try {
    const payload = await getPayloadClient();
    const footerGlobal = await payload.findGlobal({ slug: "footer" });
    return transformFooterData(footerGlobal);
  } catch {
    console.warn("Failed to fetch footer data, using defaults");
    return DEFAULT_FOOTER_DATA;
  }
}
