"use client";

import type { Navigation } from "@/payload-types";
import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useLayoutEffect } from "react";

import logo from "@/assets/logo/svg/horizontal_logo/h_logo_peach.svg";
import { useDisclosure } from "@/lib/use-disclosure";

/**
 * Navigation link type extracted from Navigation global using Pick
 */
export type NavLink = Navigation["nav_links"][number];

interface HeaderProps {
  navLinks: NavLink[];
  contactButtonText: string;
  menuIcon: string;
  closeIcon: string;
}

export function HeaderClient({ navLinks, contactButtonText, menuIcon, closeIcon }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, { open, close }] = useDisclosure();

  useLayoutEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
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
            {navLinks.map(({ href, label }) => (
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
              {contactButtonText}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={open}
              className="p-2 text-white transition-colors hover:text-primary"
              aria-label="Toggle mobile menu"
            >
              <span className="material-symbols-outlined text-3xl!">{menuIcon}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dialog */}
      <Dialog open={isMobileMenuOpen} onClose={close} className="md:hidden">
        <div className="fixed inset-0 z-59 bg-dark/95 backdrop-blur-sm" />

        <DialogPanel className="fixed inset-0 z-60">
          <div className="absolute top-0 left-0 mx-auto mt-4 flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
            {/* Logo */}
            <Link href="/" onClick={close}>
              <Image
                src={logo}
                alt="Security Guru logo"
                unoptimized
                height={40}
                className="-ml-5 h-8 md:h-10"
                loading="eager"
              />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={close}
              className="p-2 text-white transition-colors hover:text-primary"
              aria-label="Toggle mobile menu"
            >
              <span className="material-symbols-outlined text-3xl!">{closeIcon}</span>
            </button>
          </div>

          <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-4">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-xl font-medium tracking-wide text-white uppercase transition-colors hover:text-primary"
                onClick={close}
              >
                {label}
              </Link>
            ))}
            <Link
              href="#contact"
              className="transform rounded bg-primary px-8 py-3 font-bold text-dark shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-white hover:text-dark"
              onClick={close}
            >
              {contactButtonText}
            </Link>
          </div>
        </DialogPanel>
      </Dialog>
    </nav>
  );
}
