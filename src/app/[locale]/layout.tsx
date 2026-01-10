import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PreFooterSection from "@/components/PreFooterSection";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-midnight`}
      >
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="min-h-screen">{children}</main>

          {/* Pre-footer Section */}
          <PreFooterSection />

          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
