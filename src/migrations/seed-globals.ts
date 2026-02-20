// TO-DO: Fix the seeded data

import { getPayload } from "payload";
import type { Payload } from "payload";

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

/**
 * Creates a Lexical-compatible richText structure from a simple array of text segments.
 * Each segment can have text content and optional formatting (bold, italic) and color.
 *
 * Supports two color formats:
 * - Hex color string (legacy): "#FFBC85" - stored in styles array
 * - Color key (TextStateFeature): "peach" - stored directly as `color` property
 */
function createLexicalRichText(
  segments: Array<{ text: string; bold?: boolean; italic?: boolean; color?: string }>,
): {
  root: {
    children: Array<{
      type: string;
      children: Array<{
        type: string;
        text: string;
        format?: number;
        version: number;
        color?: string;
      }>;
      version: number;
    }>;
    type: string;
    version: number;
  };
} {
  return {
    root: {
      children: [
        {
          type: "paragraph",
          children: segments.map((segment) => {
            const node: {
              type: string;
              text: string;
              format?: number;
              version: number;
              color?: string;
            } = {
              type: "text",
              text: segment.text,
              format: (segment.bold ? 1 : 0) | (segment.italic ? 2 : 0),
              version: 1,
            };

            // Map hex colors to TextStateFeature keys
            if (segment.color) {
              const colorKey = segment.color.startsWith("#")
                ? hexToColorKey(segment.color)
                : segment.color;
              if (colorKey) {
                node.color = colorKey;
              }
            }

            return node;
          }),
          version: 1,
        },
      ],
      type: "root",
      version: 1,
    },
  };
}

/**
 * Map hex color values to TextStateFeature color keys.
 */
function hexToColorKey(hex: string): string | null {
  const colorMap: Record<string, string> = {
    "#FFBC85": "peach",
    "#021614": "midnight",
    "#C3C9B5": "sage",
    "#9B849A": "mauve",
  };
  return colorMap[hex.toUpperCase()] ?? null;
}

async function seedHero(payload: Payload) {
  const heroData = {
    badge_text: "Saugumas Pirmiausia",
    heading: createLexicalRichText([
      { text: "Kokybė", color: "#FFBC85" },
      { text: ", Profesionalumas ir Inovatyvumas" },
    ]),
    description:
      "Apsaugokite tai, kas svarbiausia. Profesionalios saugumo sistemos namams ir verslui Vilniuje ir Vilniaus apskrityje.",
    services_button: {
      type: "primary" as const,
      text: "Mūsų Paslaugos",
    },
    contact_button: {
      type: "secondary" as const,
      text: "Gauti Pasiūlymą",
    },
    scroll_icon: "keyboard_arrow_down",
  };

  await upsertGlobal(payload, HERO_SLUG, heroData);
  console.log(`✅ Hero global ${HERO_SLUG} seeded`);
}

async function seedAbout(payload: Payload) {
  const aboutData = {
    subtitle: "Kodėl rinktis mus?",
    heading: createLexicalRichText([
      { text: "Saugumas reikalauja " },
      { text: "Ekspertų Dėmesio", bold: true, color: "#FFBC85" },
    ]),
    description:
      "SECURITY GURU teikia pirmenybę jūsų saugumo reikalavimams. Mūsų ekspertai skiria laiką suprasti jūsų rūpesčius ir pateikia asmeninius sprendimus.",
    features: [
      {
        title: "Visapusiški sprendimai",
        description: "Nuo signalizacijos iki vaizdo stebėjimo - viskas iš vienų rankų.",
        icon: "check",
      },
      {
        title: "Orientacija į klientą",
        description: "Glaudžiai bendradarbiaujame užtikrindami jūsų ramybę.",
        icon: "check",
      },
      {
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

  await upsertGlobal(payload, ABOUT_SLUG, aboutData);
  console.log(`✅ About global ${ABOUT_SLUG} seeded`);
}

async function seedFooter(payload: Payload) {
  const footerData = {
    description:
      "Kokybiški saugumo sprendimai jūsų namams ir verslui. Ilgametė patirtis ir profesionalumas garantuoja jūsų ramybę.",
    navigation_links: [
      { label: "Paslaugos", href: "#services" },
      { label: "Apie mus", href: "#about" },
      { label: "Kontaktai", href: "#contact" },
    ],
    company_details: {
      company_name: 'MB "Security Guru"',
      company_code: "306109454",
      location: "Vilnius, Lietuva",
    },
    copyright_text: "© 2026 Security Guru. Visos teisės saugomos.",
  };

  await upsertGlobal(payload, FOOTER_SLUG, footerData);
  console.log(`✅ Footer global ${FOOTER_SLUG} seeded`);
}

async function seedNavigation(payload: Payload) {
  const navigationData = {
    nav_links: [
      { href: "#services", label: "Paslaugos" },
      { href: "#about", label: "Apie mus" },
    ],
    contact_button_text: "Susisiekti",
    menu_icon: "menu",
    close_icon: "close",
  };

  await upsertGlobal(payload, NAVIGATION_SLUG, navigationData);
  console.log(`✅ Navigation global ${NAVIGATION_SLUG} seeded`);
}

async function seedSiteMetadata(payload: Payload) {
  const siteMetadataData = {
    title: "Security Guru - Apsaugos sistemos Vilniuje",
    description:
      "Profesionalūs apsaugos sprendimai jūsų namams ir verslui. Apsaugos signalizacijos, įeigos kontrolės, priešgaisrinės signalizacijos, vaizdo stebėjimo sistemos Vilniuje ir Vilniaus apskrityje.",
  };

  await upsertGlobal(payload, SITE_METADATA_SLUG, siteMetadataData);
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
