import type { Navigation } from "@/payload-types";

import { HeaderClient, type NavLink } from "@/components/Header";
import { getPayloadClient } from "@/lib/payload-client";

/**
 * Navigation data type using Pick to derive fields from Navigation type
 */
type NavigationData = Pick<Navigation, "contact_button_text" | "menu_icon" | "close_icon"> & {
  nav_links: NavLink[];
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

async function getNavigationData(): Promise<NavigationData> {
  try {
    const payload = await getPayloadClient();
    const navigation = await payload.findGlobal({ slug: "navigation" });

    if (!navigation) return DEFAULT_NAVIGATION_DATA;

    return {
      nav_links:
        navigation.nav_links?.map((link) => ({
          id: link.id || "",
          href: link.href || "#",
          label: link.label || "",
        })) || DEFAULT_NAVIGATION_DATA.nav_links,
      contact_button_text:
        navigation.contact_button_text || DEFAULT_NAVIGATION_DATA.contact_button_text,
      menu_icon: navigation.menu_icon || DEFAULT_NAVIGATION_DATA.menu_icon,
      close_icon: navigation.close_icon || DEFAULT_NAVIGATION_DATA.close_icon,
    };
  } catch {
    // If PayloadCMS is not available, return default data
    console.warn("Failed to fetch Navigation global, using default data");
    return DEFAULT_NAVIGATION_DATA;
  }
}

export async function Header() {
  const data = await getNavigationData();

  return (
    <HeaderClient
      navLinks={data.nav_links}
      contactButtonText={data.contact_button_text}
      menuIcon={data.menu_icon}
      closeIcon={data.close_icon}
    />
  );
}
