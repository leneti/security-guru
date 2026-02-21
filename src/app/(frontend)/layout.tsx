import "./globals.css";

import type { SiteMetadatum } from "@/payload-types";
import type { Metadata } from "next";
import { Manrope, Geist_Mono } from "next/font/google";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/HeaderServer";
import { getPayloadClient } from "@/lib/payload-client";

// Revalidate every hour (ISR) - avoids requiring MongoDB at build time while maintaining performance
export const revalidate = 3600;

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
 * Site metadata type using Omit to exclude payload metadata fields
 */
type SiteMetadataData = Omit<SiteMetadatum, "id" | "updatedAt" | "createdAt">;

const DEFAULT_METADATA: SiteMetadataData = {
  title: "Security Guru - Apsaugos sistemos Vilniuje",
  description:
    "Profesionalūs apsaugos sprendimai jūsų namams ir verslui. Apsaugos signalizacijos, įeigos kontrolės, priešgaisrinės signalizacijos, vaizdo stebėjimo sistemos Vilniuje ir Vilniaus apskrityje.",
};

async function getMetadataData(): Promise<SiteMetadataData> {
  try {
    const payload = await getPayloadClient();
    const siteMetadata = await payload.findGlobal({ slug: "site-metadata" });

    if (!siteMetadata) return DEFAULT_METADATA;

    return {
      title: siteMetadata.title || DEFAULT_METADATA.title,
      description: siteMetadata.description || DEFAULT_METADATA.description,
    };
  } catch {
    console.warn("Failed to fetch SiteMetadata global, using default data");
    return DEFAULT_METADATA;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getMetadataData();

  return {
    title: {
      default: data.title,
      template: "%s | Security Guru",
    },
    description: data.description,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://securityguru.lt"),
    alternates: {
      canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://securityguru.lt",
    },
    openGraph: {
      title: "Security Guru - Profesionalūs apsaugos sprendimai",
      description: data.description,
      url: process.env.NEXT_PUBLIC_SITE_URL || "https://securityguru.lt",
      siteName: "Security Guru",
      locale: "lt_LT",
      type: "website",
      images: [
        {
          url: "/og-image.svg",
          width: 1200,
          height: 630,
          alt: "Security Guru - Apsaugos sistemos",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Security Guru",
      description: data.description,
      images: ["/og-image.svg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    category: "Security Services",
    keywords: [
      // Core security services
      "apsaugos sistemos",
      "signalizacija",
      "vaizdo stebėjimas",
      "vaizdo stebėjimo sistemos",
      "priešgaisrinė signalizacija",
      "priešgaisrinės signalizacijos sistemos",
      "įeigos kontrolė",
      "įeigos kontrolės sistemos",

      // Product-specific
      "apsaugos kamera",
      "apsaugos kameros",
      "video stebėjimas",
      "ip kameros",
      "pulto priežiūra",

      // Service type
      "apsaugos sistemos montavimas",
      "apsaugos sistemos priežiūra",
      "signalizacijos remontas",
      "apsaugos sistemos vilniuje",

      // Benefit-driven
      "namų apsauga",
      "verslo apsauga",
      "objektų apsauga",
      "teritorijos stebėjimas",

      // Location-specific
      "apsaugos sistemos vilnius",
      "apsaugos sistemos vilniaus apskritis",
      "vaizdo stebėjimas vilnius",
      "signalizacija vilnius",
    ],
  };
}

async function getAllMuiSymbols(): Promise<string[]> {
  try {
    const payload = await getPayloadClient();

    // Fetch globals for icons
    const [serviceIcons, heroGlobal, aboutGlobal, navigationGlobal] = await Promise.all([
      payload
        .find({ collection: "services", limit: 0 })
        .then(({ docs }) => docs.map(({ icon }) => icon)),
      payload.findGlobal({ slug: "hero" }),
      payload.findGlobal({ slug: "about" }),
      payload.findGlobal({ slug: "navigation" }),
    ]);

    // Extract icons from globals
    const heroIcons = heroGlobal?.scroll_icon ? [heroGlobal.scroll_icon] : [];

    const aboutIcons = (aboutGlobal?.features || []).map((feature) => feature?.icon).filter(Boolean);
    if (aboutGlobal?.quality_overlay?.icon) aboutIcons.push(aboutGlobal.quality_overlay.icon);

    const navigationIcons: string[] = [];
    if (navigationGlobal?.menu_icon) navigationIcons.push(navigationGlobal.menu_icon);
    if (navigationGlobal?.close_icon) navigationIcons.push(navigationGlobal.close_icon);

    // Combine all icons and remove duplicates
    const muiSymbolsToLoad = [
      ...new Set([
        ...DEFAULT_MUI_SYMBOLS,
        ...serviceIcons,
        ...heroIcons,
        ...aboutIcons,
        ...navigationIcons,
      ]),
      // The array must be sorted, as otherwise the HTTP request will fail
    ].sort();

    return muiSymbolsToLoad;
  } catch {
    console.warn("Failed to fetch MUI symbols from database, using defaults");
    return DEFAULT_MUI_SYMBOLS.sort();
  }
}

function ScriptLdJson() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Security Guru",
          description:
            "Profesionalūs apsaugos sprendimai jūsų namams ir verslui. Apsaugos signalizacijos, įeigos kontrolės, priešgaisrinės signalizacijos, vaizdo stebėjimo sistemos.",
          url: process.env.NEXT_PUBLIC_SITE_URL || "https://securityguru.lt",
          telephone: "+37060334255",
          email: "info@securityguru.lt",
          address: {
            "@type": "PostalAddress",
            streetAddress: "",
            addressLocality: "Vilnius",
            addressCountry: "LT",
          },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ],
              opens: "09:00",
              closes: "21:00",
            },
          ],
          areaServed: {
            "@type": "Place",
            name: "Vilnius ir Vilniaus apskritis",
          },
          sameAs: [
            "https://www.facebook.com/people/Security-guru/100088856047734/",
            "https://www.instagram.com/mbsecurityguru/",
          ],
          priceRange: "€€",
          paymentAccepted: "Cash, Bank Transfer",
          currenciesAccepted: "EUR",
        }),
      }}
    />
  );
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Combine all icons and remove duplicates
  const muiSymbolsToLoad = await getAllMuiSymbols();

  return (
    <html lang="lt">
      <head>
        <link
          href={`https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&icon_names=${muiSymbolsToLoad.join(",")}&display=block`}
          type="text/css"
          rel="stylesheet"
        />
        <ScriptLdJson />
      </head>
      <body
        className={`${manrope.variable} ${geistMono.variable} bg-white font-sans text-midnight antialiased`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
