import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative flex h-screen min-h-[600px] items-center justify-center overflow-hidden bg-dark">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="data:image/svg+xml;base64,IDxzdmcgd2lkdGg9IjEwMjQiIGhlaWdodD0iMTAyNCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+IDxkZWZzPiA8bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSItMTAwJSIgeTE9IjAiIHgyPSIwIiB5Mj0iMCI+IDxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2IwYjBiMCIvPiA8c3RvcCBvZmZzZXQ9Ii41IiBzdG9wLWNvbG9yPSIjZjBmMGYwIi8+IDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2IwYjBiMCIvPiA8YW5pbWF0ZVRyYW5zZm9ybSBpZD0iYSIgYXR0cmlidXRlTmFtZT0iZ3JhZGllbnRUcmFuc2Zvcm0iIHR5cGU9InRyYW5zbGF0ZSIgZnJvbT0iMCIgdG89IjIiIGR1cj0iMXMiIGJlZ2luPSIwcyIvPiA8YW5pbWF0ZVRyYW5zZm9ybSBpZD0iYiIgYXR0cmlidXRlTmFtZT0iZ3JhZGllbnRUcmFuc2Zvcm0iIHR5cGU9InRyYW5zbGF0ZSIgZnJvbT0iMCIgdG89IjIiIGR1cj0iMS41cyIgYmVnaW49ImEuZW5kIi8+IDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9ImdyYWRpZW50VHJhbnNmb3JtIiB0eXBlPSJ0cmFuc2xhdGUiIGZyb209IjAiIHRvPSIyIiBkdXI9IjJzIiBiZWdpbj0iYi5lbmQiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+IDwvbGluZWFyR3JhZGllbnQ+IDwvZGVmcz4gPHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9InVybCgjZykiLz4gPC9zdmc+"
          alt="Animated Security Background"
          width={1024}
          height={1024}
          unoptimized={true}
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-linear-to-t from-dark via-dark/80 to-transparent"></div>
      </div>

      <div className="relative z-10 mx-auto mt-16 max-w-3xl px-4 text-center">
        <div className="mb-6 inline-block animate-[fadeIn_1s_ease-out] rounded-full border border-primary/50 bg-primary/10 px-3 py-1 backdrop-blur-sm">
          <span className="text-xs font-bold tracking-widest text-primary uppercase">
            Saugumas Pirmiausia
          </span>
        </div>

        <h1
          className="slide-up mb-6 text-5xl leading-tight font-bold text-white md:text-7xl"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="text-primary">Kokybė</span>, Profesionalumas
          <br className="hidden md:block" /> ir Inovatyvumas
        </h1>

        <p
          className="slide-up mx-auto mb-10 max-w-2xl text-lg leading-relaxed font-light text-sage md:text-xl"
          style={{ animationDelay: "0.2s" }}
        >
          Apsaugokite tai, kas svarbiausia. Profesionalios saugumo sistemos namams ir verslui
          Vilniuje ir Vilniaus apskrityje.
        </p>

        <div
          className="slide-up flex flex-col justify-center gap-4 sm:flex-row"
          style={{ animationDelay: "0.3s" }}
        >
          <Link
            href="#services"
            className="transform rounded-lg bg-primary px-8 py-4 font-bold text-dark shadow-[0_0_20px_rgba(255,188,133,0.3)] transition-all hover:scale-105 hover:bg-white"
          >
            Mūsų Paslaugos
          </Link>
          <Link
            href="#contact"
            className="rounded-lg border-2 border-sage px-8 py-4 font-bold text-sage transition-all hover:bg-sage hover:text-dark"
          >
            Gauti Pasiūlymą
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 transform animate-bounce text-sage/50">
        <span className="material-symbols-outlined text-4xl">keyboard_arrow_down</span>
      </div>
    </section>
  );
}
