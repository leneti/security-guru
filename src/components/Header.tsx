"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? "bg-dark/90 backdrop-blur-sm shadow-sm py-2" : "bg-transparent py-4"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center cursor-pointer">
            <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center mr-3">
              <span className="material-symbols-outlined text-dark text-3xl">shield_lock</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-wide text-dark md:text-white">
                SECURITY GURU
              </span>
              <span className="text-[10px] tracking-widest uppercase text-dark md:text-sage">
                Saugumo ekspertai
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            <a
              href="#services"
              className="text-white hover:text-primary transition-colors font-medium text-sm uppercase tracking-wide"
            >
              Paslaugos
            </a>
            <a
              href="#about"
              className="text-white hover:text-primary transition-colors font-medium text-sm uppercase tracking-wide"
            >
              Apie mus
            </a>
            <a
              href="#shop"
              className="text-white hover:text-primary transition-colors font-medium text-sm uppercase tracking-wide"
            >
              E-Parduotuvė
            </a>
            <a
              href="#contact"
              className="bg-primary text-dark hover:bg-white hover:text-dark px-5 py-2 rounded font-bold transition-all transform hover:-translate-y-0.5 shadow-lg shadow-primary/20"
            >
              Susisiekti
            </a>
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
