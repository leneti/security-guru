"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { useState, useEffect } from "react";
import Image from "next/image";
import logoIcon from "@/assets/logo/SVG/01_Ikona/Ikona_Oranzine.svg";
import logoWordmark from "@/assets/logo/SVG/04_Wordmark/Wordmark_Tamsiai_Zalia.svg";

export default function Header() {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/paslaugos", label: t("services") },
    { href: "/apie-mus", label: t("about") },
    { href: "/kontaktai", label: t("contact") },
  ];

  return (
    <header
      className={`sticky top-0 z-50 border-b border-midnight/5 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md" : "bg-offWhite/60 backdrop-blur-sm"
      }`}
    >
      <nav className="container mx-auto px-6 md:px-8 lg:px-12 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src={logoIcon} alt="SECURITY GURU Icon" width={27} height={27} priority />
            <Image src={logoWordmark} alt="SECURITY GURU" width={133} height={21} priority />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium hover:text-mauve transition-colors pb-1 ${
                  pathname === link.href ? "text-midnight-dark font-semibold" : "text-midnight"
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-peach rounded-full"></span>
                )}
              </Link>
            ))}
            <Link
              href="/e-parduotuve"
              className={`relative p-2 rounded-lg hover:bg-mauve/20 hover:text-midnight-dark transition-all duration-200 flex items-center justify-center ${
                pathname === "/e-parduotuve" ? "bg-peach/10 text-midnight-dark" : "text-midnight"
              }`}
              aria-label={t("eshop")}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-midnight hover:text-midnight-dark"
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
                className={`relative block text-sm font-medium hover:text-mauve transition-colors pb-1 ${
                  pathname === link.href ? "text-midnight-dark font-semibold" : "text-midnight"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-peach rounded-full"></span>
                )}
              </Link>
            ))}
            <Link
              href="/e-parduotuve"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-mauve/20 hover:text-midnight-dark transition-all duration-200 ${
                pathname === "/e-parduotuve" ? "bg-peach/10 text-midnight-dark" : "text-midnight"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span>{t("eshop")}</span>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
