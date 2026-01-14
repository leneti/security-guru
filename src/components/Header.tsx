"use client";

import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

import logo from "@/assets/logo/svg/horizontal_logo/h_logo_peach.svg";
// import { useCart } from "@/lib/cart-context";
import { useDisclosure } from "@/lib/use-disclosure";

const navLinks = [
  { href: "#services", label: "Paslaugos" },
  { href: "#about", label: "Apie mus" },
  // { href: "#shop", label: "E-Parduotuvė" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, { open, close }] = useDisclosure();
  // const { openCart, getCartItemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

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
          <Image
            src={logo}
            alt="Security Guru logo"
            unoptimized
            height={40}
            className="-ml-5 h-8 md:h-10"
            loading="eager"
          />

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
              Susisiekti
            </Link>
            {/* <button
              onClick={openCart}
              className="relative cursor-pointer p-2 text-white transition-colors hover:text-primary"
            >
              <span className="material-symbols-outlined">shopping_cart</span>
              {getCartItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-dark">
                  {getCartItemCount()}
                </span>
              )}
            </button> */}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            {/* <button
              onClick={openCart}
              className="relative p-2 text-white transition-colors hover:text-primary"
            >
              <span className="material-symbols-outlined">shopping_cart</span>
              {getCartItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-dark">
                  {getCartItemCount()}
                </span>
              )}
            </button> */}
            <button
              onClick={open}
              className="p-2 text-white transition-colors hover:text-primary"
              aria-label="Toggle mobile menu"
            >
              <span className="material-symbols-outlined text-3xl!">menu</span>
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
            <Image
              src={logo}
              alt="Security Guru logo"
              unoptimized
              height={40}
              className="-ml-5 h-8 md:h-10"
              loading="eager"
            />

            {/* Mobile Menu Button */}
            <button
              onClick={close}
              className="p-2 text-white transition-colors hover:text-primary"
              aria-label="Toggle mobile menu"
            >
              <span className="material-symbols-outlined text-3xl!">close</span>
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
              Susisiekti
            </Link>
          </div>
        </DialogPanel>
      </Dialog>
    </nav>
  );
}
