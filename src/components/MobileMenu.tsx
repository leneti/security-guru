"use client";

import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";

interface NavLink {
  href: string;
  label: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
  contactButtonText: string;
  logoSrc: string;
  closeIcon: string;
}

export function MobileMenu({
  isOpen,
  onClose,
  navLinks,
  contactButtonText,
  logoSrc,
  closeIcon,
}: MobileMenuProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="md:hidden">
      <div className="fixed inset-0 z-59 bg-dark/95 backdrop-blur-sm" />

      <DialogPanel className="fixed inset-0 z-60">
        <div className="absolute top-0 left-0 mx-auto mt-4 flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <Link href="/" onClick={onClose}>
            <Image
              src={logoSrc}
              alt="Security Guru logo"
              unoptimized
              height={40}
              className="-ml-5 h-8 md:h-10"
              loading="eager"
            />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={onClose}
            className="p-2 text-white transition-colors hover:text-primary"
            aria-label="Uždaryti meniu"
            aria-expanded={isOpen ? "true" : "false"}
          >
            <span className="material-symbols-outlined text-3xl!" aria-hidden="true">
              {closeIcon}
            </span>
          </button>
        </div>

        <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-4">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-xl font-medium tracking-wide text-white uppercase transition-colors hover:text-primary"
              onClick={onClose}
            >
              {label}
            </Link>
          ))}
          <Link
            href="#contact"
            className="transform rounded bg-primary px-8 py-3 font-bold text-dark shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-white hover:text-dark"
            onClick={onClose}
          >
            {contactButtonText}
          </Link>
        </div>
      </DialogPanel>
    </Dialog>
  );
}
