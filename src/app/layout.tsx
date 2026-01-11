import type { Metadata } from "next";
import { Manrope, Geist_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="lt">
      <body
        className={`${manrope.variable} ${geistMono.variable} antialiased bg-white text-midnight font-sans`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
