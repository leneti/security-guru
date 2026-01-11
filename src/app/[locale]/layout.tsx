import type { Metadata } from "next";
import { Manrope, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../globals.css";

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
  title: "Security Guru",
  description:
    "Profesionalūs apsaugos sprendimai jūsų namams ir verslui. Kokybė, profesionalumas ir inovatyvumas.",
  icons: {
    icon: "/logo_icon.svg",
  },
};

export default async function LocaleLayout({ children }: { children: React.ReactNode }) {
  // Providing all messages to the client
  const messages = await getMessages();

  return (
    <html lang="lt">
      <body
        className={`${manrope.variable} ${geistMono.variable} antialiased bg-white text-midnight font-sans`}
      >
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
