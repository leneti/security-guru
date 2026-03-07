// Using es-toolkit's merge for shallow merging.
// Note: es-toolkit's merge is shallow (1-level deep). This works fine for Payload globals
// since their nested objects (e.g., services_button, contact_button) are simple and typically
// edited as complete objects in the admin. If data becomes more deeply nested in the future,
// consider implementing a deepMerge utility to handle nested objects properly.
import { merge } from "es-toolkit";

import {
  DEFAULT_ABOUT_DATA,
  DEFAULT_FOOTER_DATA,
  DEFAULT_HERO_DATA,
  DEFAULT_NAVIGATION_DATA,
} from "./default-global-data";
import type { PageData } from "./page-data-types";
import { getPayloadClient } from "./payload-client";

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
      hero: heroGlobal ? merge(DEFAULT_HERO_DATA, heroGlobal) : DEFAULT_HERO_DATA,
      about: aboutGlobal ? merge(DEFAULT_ABOUT_DATA, aboutGlobal) : DEFAULT_ABOUT_DATA,
      footer: footerGlobal ? merge(DEFAULT_FOOTER_DATA, footerGlobal) : DEFAULT_FOOTER_DATA,
      navigation: navigationGlobal
        ? merge(DEFAULT_NAVIGATION_DATA, navigationGlobal)
        : DEFAULT_NAVIGATION_DATA,
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
