import type { HeroData } from "@/lib/page-data-types";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import { ColoredHeading } from "@/components/payload/ColoredHeading";

export function HeroSection({ data }: { data: HeroData }) {
  return (
    <section
      id="hero"
      className="relative flex h-screen min-h-150 items-center justify-center overflow-hidden bg-dark"
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 z-0">
        {/* Animated version - hidden when reduced motion is preferred */}
        <div className="h-full w-full motion-reduce:hidden">
          <Image
            src="/images/hero-bg-animated.svg"
            alt=""
            role="presentation"
            width={1024}
            height={1024}
            className="h-full w-full object-cover opacity-40"
          />
        </div>
        {/* Static version - shown when reduced motion is preferred */}
        <div className="motion-safe:hidden h-full w-full">
          <Image
            src="/images/hero-bg-static.svg"
            alt=""
            role="presentation"
            width={1024}
            height={1024}
            className="h-full w-full object-cover opacity-40"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-dark via-dark/80 to-transparent"></div>
      </div>

      <div className="relative z-10 mx-auto mt-16 max-w-3xl px-4 text-center">
        <div className="mb-6 inline-block animate-[fadeIn_1s_ease-out] rounded-full border border-primary/50 bg-primary/10 px-3 py-1 backdrop-blur-sm">
          <span className="text-xs font-bold tracking-widest text-primary uppercase">
            {data.badge_text}
          </span>
        </div>

        <h1
          className="slide-up mb-6 text-5xl leading-tight font-bold text-white md:text-7xl text-balance"
          style={{ animationDelay: "0.1s" }}
        >
          <ColoredHeading text={data.heading} variant="hero" />
        </h1>

        <p
          className="slide-up mx-auto mb-10 max-w-2xl text-lg leading-relaxed font-light text-sage md:text-xl"
          style={{ animationDelay: "0.2s" }}
        >
          {data.description}
        </p>

        <div
          className="slide-up flex flex-col justify-center gap-4 sm:flex-row"
          style={{ animationDelay: "0.3s" }}
        >
          <Link
            href="#services"
            className={clsx(
              data.services_button.type === "primary" &&
                "transform-gpu rounded-lg bg-primary px-8 py-4 font-bold text-dark shadow-[0_0_20px_rgba(255,188,133,0.3)] transition-all hover:scale-105 hover:bg-white",
              data.services_button.type === "secondary" &&
                "rounded-lg border-2 border-sage px-8 py-4 font-bold text-sage transition-all hover:bg-sage hover:text-dark transform-gpu",
            )}
          >
            {data.services_button.text}
          </Link>
          <Link
            href="#contact"
            className={clsx(
              data.contact_button.type === "primary" &&
                "transform-gpu rounded-lg bg-primary px-8 py-4 font-bold text-dark shadow-[0_0_20px_rgba(255,188,133,0.3)] transition-all hover:scale-105 hover:bg-white",
              data.contact_button.type === "secondary" &&
                "rounded-lg border-2 border-sage px-8 py-4 font-bold text-sage transition-all hover:bg-sage hover:text-dark transform-gpu",
            )}
          >
            {data.contact_button.text}
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 transform-gpu animate-bounce text-sage/50">
        <span className="material-symbols-outlined text-4xl" aria-hidden="true">
          {data.scroll_icon}
        </span>
      </div>
    </section>
  );
}
