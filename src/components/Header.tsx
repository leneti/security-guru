"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { useState } from "react";
import Image from "next/image";

export default function Header() {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/paslaugos", label: t("services") },
    { href: "/apie-mus", label: t("about") },
    { href: "/kontaktai", label: t("contact") },
  ];

  return (
    <header className="bg-offWhite text-midnight shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/assets/logo/SVG/03_Horizontalus_Logotipas/HLogotipas_Oranzine.svg"
              alt="SECURITY GURU"
              width={160}
              height={27}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium hover:text-peach transition-colors ${
                  pathname === link.href ? "text-peach" : "text-midnight"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/e-parduotuve"
              className="bg-peach text-midnight px-4 py-2 rounded font-medium hover:bg-peach-dark transition-colors"
            >
              {t("eshop")}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-midnight hover:text-peach"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block text-sm font-medium hover:text-peach transition-colors ${
                  pathname === link.href ? "text-peach" : "text-midnight"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/e-parduotuve"
              className="inline-block bg-peach text-midnight px-4 py-2 rounded font-medium hover:bg-peach-dark transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("eshop")}
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
