import "./globals.css";

import type { Metadata } from "next";
import { Manrope, Geist_Mono } from "next/font/google";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getPayloadClient } from "@/lib/payload-client";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Security Guru - Apsaugos sistemos Vilniuje",
    template: "%s | Security Guru",
  },
  description:
    "Profesionalūs apsaugos sprendimai jūsų namams ir verslui. Apsaugos signalizacijos, įeigos kontrolės, priešgaisrinės signalizacijos, vaizdo stebėjimo sistemos Vilniuje ir Vilniaus apskrityje.",
  metadataBase: new URL("https://securityguru.lt"),
  alternates: {
    canonical: "https://securityguru.lt",
  },
  openGraph: {
    title: "Security Guru - Profesionalūs apsaugos sprendimai",
    description:
      "Apsaugos signalizacijos, įeigos kontrolės, priešgaisrinės signalizacijos, vaizdo stebėjimo sistemos Vilniuje ir Vilniaus apskrityje.",
    url: "https://securityguru.lt",
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
    description: "Profesionalūs apsaugos sprendimai jūsų namams ir verslui.",
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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayloadClient();
  const serviceIcons = await payload
    .find({ collection: "services", limit: 0 })
    .then(({ docs }) => docs.map(({ icon }) => icon));

  const muiSymbolsToLoad = [...new Set([...DEFAULT_MUI_SYMBOLS, ...serviceIcons])].sort();

  return (
    <html lang="lt">
      <head>
        <link
          href={`https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&icon_names=${muiSymbolsToLoad.join(",")}&display=block`}
          type="text/css"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Security Guru",
              description:
                "Profesionalūs apsaugos sprendimai jūsų namams ir verslui. Apsaugos signalizacijos, įeigos kontrolės, priešgaisrinės signalizacijos, vaizdo stebėjimo sistemos.",
              url: "https://securityguru.lt",
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
