"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo/svg/horizontal_logo/h_logo_peach.svg";

const navLinks = [
  { href: "#services", label: "Paslaugos" },
  { href: "#about", label: "Apie mus" },
  { href: "#shop", label: "E-Parduotuvė" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

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
            <button className="relative p-2 text-white hover:text-primary transition-colors">
              <span className="material-symbols-outlined">shopping_cart</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button className="relative p-2 text-primary">
              <span className="material-symbols-outlined">shopping_cart</span>
            </button>
            <button className="text-primary">
              <span className="material-symbols-outlined text-3xl">menu</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
