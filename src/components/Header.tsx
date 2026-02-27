"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

import logo from "@/assets/logo/svg/horizontal_logo/h_logo_peach.svg";
import type { NavigationData } from "@/lib/page-data-types";
import { useDisclosure } from "@/lib/use-disclosure";

const MobileMenu = dynamic(() => import("./MobileMenu").then((mod) => mod.MobileMenu), {
  ssr: false,
});

export function Header({ data }: { data: NavigationData }) {
  const { nav_links, contact_button_text, menu_icon, close_icon } = data;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, { open, close }] = useDisclosure();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      aria-label="Pagrindinė navigacija"
      className={`fixed z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-dark/90 py-2 shadow-sm backdrop-blur-sm" : "bg-transparent py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <Image
              src={logo}
              alt="Security Guru logo"
              unoptimized
              height={40}
              className="-ml-5 h-8 md:h-10"
              loading="eager"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            {nav_links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium tracking-wide text-white uppercase transition-colors hover:text-primary"
              >
                {label}
              </Link>
            ))}
            <Link
              href="#contact"
              className="transform rounded bg-primary px-5 py-2 font-bold text-dark shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-white hover:text-dark"
            >
              {contact_button_text}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={open}
              className="p-2 text-white transition-colors hover:text-primary"
              aria-label={isMobileMenuOpen ? "Uždaryti meniu" : "Atidaryti meniu"}
            >
              <span className="material-symbols-outlined text-3xl!">{menu_icon}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dialog */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={close}
        navLinks={nav_links}
        contactButtonText={contact_button_text}
        logoSrc={logo}
        closeIcon={close_icon}
      />
    </nav>
  );
}
