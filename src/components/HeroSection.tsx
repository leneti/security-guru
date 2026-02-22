import type { Hero } from "@/payload-types";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import { ColoredHeading } from "@/components/payload/ColoredHeading";
import { getPayloadClient } from "@/lib/payload-client";

interface HeroData {
  badge_text: string;
  heading: string;
  description: string;
  services_button: {
    type: "primary" | "secondary";
    text: string;
  };
  contact_button: {
    type: "primary" | "secondary";
    text: string;
  };
  scroll_icon: string;
}

const DEFAULT_HERO_DATA: HeroData = {
  badge_text: "Saugumas Pirmiausia",
  heading: "Kokybė, Profesionalumas ir Inovatyvumas",
  description:
    "Apsaugokite tai, kas svarbiausia. Profesionalios saugumo sistemos namams ir verslui Vilniuje ir Vilniaus apskrityje.",
  services_button: {
    type: "primary",
    text: "Mūsų Paslaugos",
  },
  contact_button: {
    type: "secondary",
    text: "Gauti Pasiūlymą",
  },
  scroll_icon: "keyboard_arrow_down",
};

async function getHeroData(): Promise<HeroData> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.findGlobal({ slug: "hero" });

    // Handle the case where global might not exist
    const hero = result as Hero | null;

    if (!hero) {
      return DEFAULT_HERO_DATA;
    }

    return {
      badge_text: hero.badge_text || DEFAULT_HERO_DATA.badge_text,
      heading: (hero.heading as unknown as string) || DEFAULT_HERO_DATA.heading,
      description: hero.description || DEFAULT_HERO_DATA.description,
      services_button: hero.services_button || DEFAULT_HERO_DATA.services_button,
      contact_button: hero.contact_button || DEFAULT_HERO_DATA.contact_button,
      scroll_icon: hero.scroll_icon || DEFAULT_HERO_DATA.scroll_icon,
    };
  } catch {
    // If PayloadCMS is not available, return default data
    console.warn("Failed to fetch Hero global, using default data");
    return DEFAULT_HERO_DATA;
  }
}

export async function HeroSection() {
  const data = await getHeroData();

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
            src="data:image/svg+xml;base64,IDxzdmcgd2lkdGg9IjEwMjQiIGhlaWdodD0iMTAyNCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+IDxkZWZzPiA8bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSItMTAwJSIgeTE9IjAiIHgyPSIwIiB5Mj0iMCI+IDxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2IwYjBiMCIvPiA8c3RvcCBvZmZzZXQ9Ii41IiBzdG9wLWNvbG9yPSIjZjBmMGYwIi8+IDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2IwYjBiMCIvPiA8YW5pbWF0ZVRyYW5zZm9ybSBpZD0iYSIgYXR0cmlidXRlTmFtZT0iZ3JhZGllbnRUcmFuc2Zvcm0iIHR5cGU9InRyYW5zbGF0ZSIgZnJvbT0iMCIgdG89IjIiIGR1cj0iMXMiIGJlZ2luPSIwcyIvPiA8YW5pbWF0ZVRyYW5zZm9ybSBpZD0iYiIgYXR0cmlidXRlTmFtZT0iZ3JhZGllbnRUcmFuc2Zvcm0iIHR5cGU9InRyYW5zbGF0ZSIgZnJvbT0iMCIgdG89IjIiIGR1cj0iMS41cyIgYmVnaW49ImEuZW5kIi8+IDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9ImdyYWRpZW50VHJhbnNmb3JtIiB0eXBlPSJ0cmFuc2xhdGUiIGZyb209IjAiIHRvPSIyIiBkdXI9IjJzIiBiZWdpbj0iYi5lbmQiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+IDwvbGluZWFyR3JhZGllbnQ+IDwvZGVmcz4gPHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9InVybCgjZykiLz4gPC9zdmc+"
            alt="Animated Security Background"
            width={1024}
            height={1024}
            unoptimized={true}
            className="h-full w-full object-cover opacity-40"
          />
        </div>
        {/* Static version - shown when reduced motion is preferred */}
        <div className="motion-safe:hidden h-full w-full">
          <Image
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAyNCIgaGVpZ2h0PSIxMDI0IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAiIHgyPSIxMDAlIiB5Mj0iMCI+PHN0b3Agb2Zmc2V0PSIwcHkiIHN0b3AtY29sb3I9IiNiMGIwYjAiLz48c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iI2YwZjBmMCIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2IwYjBiMCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg=="
            alt="Static Security Background"
            width={1024}
            height={1024}
            unoptimized={true}
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
