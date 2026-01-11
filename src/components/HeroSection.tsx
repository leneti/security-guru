"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-dark">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="data:image/svg+xml;base64,IDxzdmcgd2lkdGg9IjEwMjQiIGhlaWdodD0iMTAyNCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+IDxkZWZzPiA8bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSItMTAwJSIgeTE9IjAiIHgyPSIwIiB5Mj0iMCI+IDxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2IwYjBiMCIvPiA8c3RvcCBvZmZzZXQ9Ii41IiBzdG9wLWNvbG9yPSIjZjBmMGYwIi8+IDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2IwYjBiMCIvPiA8YW5pbWF0ZVRyYW5zZm9ybSBpZD0iYSIgYXR0cmlidXRlTmFtZT0iZ3JhZGllbnRUcmFuc2Zvcm0iIHR5cGU9InRyYW5zbGF0ZSIgZnJvbT0iMCIgdG89IjIiIGR1cj0iMXMiIGJlZ2luPSIwcyIvPiA8YW5pbWF0ZVRyYW5zZm9ybSBpZD0iYiIgYXR0cmlidXRlTmFtZT0iZ3JhZGllbnRUcmFuc2Zvcm0iIHR5cGU9InRyYW5zbGF0ZSIgZnJvbT0iMCIgdG89IjIiIGR1cj0iMS41cyIgYmVnaW49ImEuZW5kIi8+IDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9ImdyYWRpZW50VHJhbnNmb3JtIiB0eXBlPSJ0cmFuc2xhdGUiIGZyb209IjAiIHRvPSIyIiBkdXI9IjJzIiBiZWdpbj0iYi5lbmQiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+IDwvbGluZWFyR3JhZGllbnQ+IDwvZGVmcz4gPHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9InVybCgjZykiLz4gPC9zdmc+"
          alt="Animated Security Background"
          width={1024}
          height={1024}
          unoptimized={true}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-linear-to-t from-dark via-dark/80 to-transparent"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
        <div className="inline-block px-3 py-1 mb-6 border border-primary/50 rounded-full bg-primary/10 backdrop-blur-sm animate-[fadeIn_1s_ease-out]">
          <span className="text-primary text-xs font-bold uppercase tracking-widest">
            Saugumas Pirmiausia
          </span>
        </div>

        <h1
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="text-primary">Kokybė</span>, Profesionalumas
          <br className="hidden md:block" /> ir Inovatyvumas
        </h1>

        <p
          className="text-sage text-lg md:text-xl mb-10 max-w-2xl mx-auto slide-up leading-relaxed font-light"
          style={{ animationDelay: "0.2s" }}
        >
          Apsaugokite tai, kas svarbiausia. Profesionalios saugumo sistemos namams ir verslui
          Vilniuje ir Vilniaus apskrityje.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center slide-up"
          style={{ animationDelay: "0.3s" }}
        >
          <Link
            href="/kontaktai"
            className="bg-primary text-dark font-bold px-8 py-4 rounded-lg hover:bg-white transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(255,188,133,0.3)]"
          >
            Mūsų Paslaugos
          </Link>
          <Link
            href="#contact"
            className="border-2 border-sage text-sage font-bold px-8 py-4 rounded-lg hover:bg-sage hover:text-dark transition-all"
          >
            Gauti Pasiūlymą
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-sage/50">
        <span className="material-symbols-outlined text-4xl">keyboard_arrow_down</span>
      </div>
    </section>
  );
}
