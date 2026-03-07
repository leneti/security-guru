// TO-DO: Fix the seeded data

import { getPayload } from "payload";
import type { Payload } from "payload";

import {
  DEFAULT_ABOUT_DATA,
  DEFAULT_FOOTER_DATA,
  DEFAULT_HERO_DATA,
  DEFAULT_NAVIGATION_DATA,
  DEFAULT_SITE_METADATA_DATA,
} from "@/lib/default-global-data";
import config from "@/payload-seed.config";

/**
 * Migration script to seed PayloadCMS globals with default content.
 * Run with: yarn seed:globals
 *
 * This script is idempotent - it can be run multiple times safely.
 */

const HERO_SLUG = "hero";
const ABOUT_SLUG = "about";
const FOOTER_SLUG = "footer";
const NAVIGATION_SLUG = "navigation";
const SITE_METADATA_SLUG = "site-metadata";

async function seedGlobals() {
  console.log("🌱 Starting globals seed...");

  const payload: Payload = await getPayload({ config });

  try {
    // Seed Hero global
    await seedHero(payload);

    // Seed About global
    await seedAbout(payload);

    // Seed Footer global
    await seedFooter(payload);

    // Seed Navigation global
    await seedNavigation(payload);

    // Seed SiteMetadata global
    await seedSiteMetadata(payload);

    console.log("✅ All globals seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding globals:", error);
    process.exit(1);
  }
}

async function seedHero(payload: Payload) {
  await upsertGlobal(payload, HERO_SLUG, DEFAULT_HERO_DATA);
  console.log(`✅ Hero global ${HERO_SLUG} seeded`);
}

async function seedAbout(payload: Payload) {
  await upsertGlobal(payload, ABOUT_SLUG, DEFAULT_ABOUT_DATA);
  console.log(`✅ About global ${ABOUT_SLUG} seeded`);
}

async function seedFooter(payload: Payload) {
  await upsertGlobal(payload, FOOTER_SLUG, DEFAULT_FOOTER_DATA);
  console.log(`✅ Footer global ${FOOTER_SLUG} seeded`);
}

async function seedNavigation(payload: Payload) {
  await upsertGlobal(payload, NAVIGATION_SLUG, DEFAULT_NAVIGATION_DATA);
  console.log(`✅ Navigation global ${NAVIGATION_SLUG} seeded`);
}

async function seedSiteMetadata(payload: Payload) {
  await upsertGlobal(payload, SITE_METADATA_SLUG, DEFAULT_SITE_METADATA_DATA);
  console.log(`✅ SiteMetadata global ${SITE_METADATA_SLUG} seeded`);
}

/**
 * Upsert a global - creates it if it doesn't exist, updates it if it does.
 * This makes the script idempotent.
 * In PayloadCMS, updateGlobal will create the global if it doesn't exist.
 */
async function upsertGlobal<T extends Record<string, unknown>>(
  payload: Payload,
  slug: string,
  data: T,
): Promise<void> {
  try {
    // Try to find the global first
    await payload.findGlobal({
      slug: slug as "hero" | "about" | "footer" | "navigation" | "site-metadata",
    });

    // If we get here, the global exists - update it
    await payload.updateGlobal({
      slug: slug as "hero" | "about" | "footer" | "navigation" | "site-metadata",
      data: data as T & { createdAt?: string; updatedAt?: string },
    });
    console.log(`  → Updated existing global: ${slug}`);
  } catch (error: unknown) {
    // Check if it's a "not found" error
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes("Not Found") || errorMessage.includes("not found")) {
      // Global doesn't exist - create it using updateGlobal which creates if not exists
      await payload.updateGlobal({
        slug: slug as "hero" | "about" | "footer" | "navigation" | "site-metadata",
        data: data as T & { createdAt?: string; updatedAt?: string },
      });
      console.log(`  → Created new global: ${slug}`);
    } else {
      // Some other error - rethrow
      throw error;
    }
  }
}

// Run the seed
seedGlobals().catch((error) => {
  console.error("Fatal error during seed:", error);
  process.exit(1);
});
