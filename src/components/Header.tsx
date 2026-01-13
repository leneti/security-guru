"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Dialog, DialogPanel } from "@headlessui/react";
import logo from "@/assets/logo/svg/horizontal_logo/h_logo_peach.svg";
import { useDisclosure } from "@/lib/use-disclosure";
import { useCart } from "@/lib/cart-context";

const navLinks = [
  { href: "#services", label: "Paslaugos" },
  { href: "#about", label: "Apie mus" },
  { href: "#shop", label: "E-Parduotuvė" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, { open, close }] = useDisclosure();
  const { openCart, getCartItemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-dark/90 backdrop-blur-sm shadow-sm py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
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
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-white hover:text-primary transition-colors font-medium text-sm uppercase tracking-wide"
              >
                {label}
              </Link>
            ))}
            <Link
              href="#contact"
              className="bg-primary text-dark hover:bg-white hover:text-dark px-5 py-2 rounded font-bold transition-all transform hover:-translate-y-0.5 shadow-lg shadow-primary/20"
            >
              Susisiekti
            </Link>
            <button
              onClick={openCart}
              className="relative p-2 text-white hover:text-primary transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined">shopping_cart</span>
              {getCartItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-dark text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartItemCount()}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={openCart}
              className="relative p-2 text-white hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined">shopping_cart</span>
              {getCartItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-dark text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartItemCount()}
                </span>
              )}
            </button>
            <button
              onClick={open}
              className="text-white p-2 hover:text-primary transition-colors"
              aria-label="Toggle mobile menu"
            >
              <span className="material-symbols-outlined text-3xl!">menu</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dialog */}
      <Dialog open={isMobileMenuOpen} onClose={close} className="md:hidden">
        <div className="fixed inset-0 bg-dark/95 backdrop-blur-sm z-59" />

        <DialogPanel className="fixed inset-0 z-60">
          <div className="absolute top-0 left-0 w-full flex justify-between items-center h-16 max-w-7xl mx-auto px-4 sm:px-6 mt-4">
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
              className="text-white p-2 hover:text-primary transition-colors"
              aria-label="Toggle mobile menu"
            >
              <span className="material-symbols-outlined text-3xl!">close</span>
            </button>
          </div>

          <div className="flex flex-col items-center justify-center min-h-screen px-4 gap-8">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-white hover:text-primary transition-colors font-medium text-xl uppercase tracking-wide"
                onClick={close}
              >
                {label}
              </Link>
            ))}
            <Link
              href="#contact"
              className="bg-primary text-dark hover:bg-white hover:text-dark px-8 py-3 rounded font-bold transition-all transform hover:-translate-y-0.5 shadow-lg shadow-primary/20"
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
