import "./globals.css";
import type { Metadata } from "next";
import { Manrope, Geist_Mono } from "next/font/google";
import Link from "next/link";

import { getAllMuiSymbols, getMetadataData } from "@/lib/layout-data";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const data = await getMetadataData();
  const isProduction = process.env.NODE_ENV === "production";

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
    // In development/preview, prevent indexing with noindex, nofollow
    robots: isProduction
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        }
      : {
          index: false,
          follow: false,
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
  // Fetch all MUI symbols using the optimized parallel fetching
  const muiSymbolsToLoad = await getAllMuiSymbols();

  return (
    <html lang="lt">
      <head>
        {/* Preconnect to Google Fonts for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

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
        <Link
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:font-bold focus:text-dark focus:shadow-lg"
        >
          Peršokti į pagrindinį turinį
        </Link>
        {children}
      </body>
    </html>
  );
}
