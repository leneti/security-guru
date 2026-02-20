import type { About } from "@/payload-types";
import Image from "next/image";

import { ColoredHeading } from "@/components/payload/ColoredHeading";
import { getPayloadClient } from "@/lib/payload-client";

/**
 * Feature type extracted from About global
 */
type Feature = About["features"][number];

/**
 * Quality overlay type extracted from About global
 */
type QualityOverlay = About["quality_overlay"];

interface AboutData {
  subtitle: string;
  heading: string;
  description: string;
  features: Feature[];
  quality_overlay: QualityOverlay;
}

const DEFAULT_ABOUT_DATA: AboutData = {
  subtitle: "Kodėl rinktis mus?",
  heading: "Saugumas reikalauja Ekspertų Dėmesio",
  description:
    "SECURITY GURU teikia pirmenybę jūsų saugumo reikalavimams. Mūsų ekspertai skiria laiką suprasti jūsų rūpesčius ir pateikia asmeninius sprendimus.",
  features: [
    {
      id: "1",
      title: "Visapusiški sprendimai",
      description: "Nuo signalizacijos iki vaizdo stebėjimo - viskas iš vienų rankų.",
      icon: "check",
    },
    {
      id: "2",
      title: "Orientacija į klientą",
      description: "Glaudžiai bendradarbiaujame užtikrindami jūsų ramybę.",
      icon: "check",
    },
    {
      id: "3",
      title: "Lankstumas",
      description: "Dirbame 7 dienas per savaitę, nuo 9 iki 21 val.",
      icon: "check",
    },
  ],
  quality_overlay: {
    title: "Garantuota Kokybė",
    description: "Naudojame tik sertifikuotą ir patikimą įrangą.",
    icon: "verified_user",
  },
};

async function getAboutData(): Promise<AboutData> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.findGlobal({ slug: "about" });

    // Handle the case where global might not exist
    const about = result as About | null;

    if (!about) {
      return DEFAULT_ABOUT_DATA;
    }

    return {
      subtitle: about.subtitle || DEFAULT_ABOUT_DATA.subtitle,
      heading: (about.heading as unknown as string) || DEFAULT_ABOUT_DATA.heading,
      description: about.description || DEFAULT_ABOUT_DATA.description,
      features: about.features?.map((f) => f) || DEFAULT_ABOUT_DATA.features,
      quality_overlay: {
        title: about.quality_overlay?.title || DEFAULT_ABOUT_DATA.quality_overlay.title,
        description:
          about.quality_overlay?.description || DEFAULT_ABOUT_DATA.quality_overlay.description,
        icon: about.quality_overlay?.icon || DEFAULT_ABOUT_DATA.quality_overlay.icon,
      },
    };
  } catch {
    // If PayloadCMS is not available, return default data
    console.warn("Failed to fetch About global, using default data");
    return DEFAULT_ABOUT_DATA;
  }
}

export async function AboutSection() {
  const data = await getAboutData();

  return (
    <section id="about" className="relative overflow-hidden bg-dark py-24 text-white">
      <div className="absolute top-0 right-0 h-full w-1/3 translate-x-20 skew-x-12 transform bg-[#051F1C]"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 md:grid-cols-2">
          <div>
            <span className="mb-2 block text-sm font-bold tracking-widest text-primary uppercase">
              {data.subtitle}
            </span>
            <h2 className="mb-8 text-4xl leading-tight font-semibold md:text-5xl">
              <ColoredHeading text={data.heading} variant="about" />
            </h2>
            <p className="mb-8 text-lg leading-relaxed font-light text-sage">{data.description}</p>

            <div className="space-y-6">
              {data.features.map((feature) => (
                <div key={feature.id} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-white/10 text-primary">
                    <span className="material-symbols-outlined">{feature.icon}</span>
                  </div>
                  <div>
                    <h4 className="mb-1 text-xl font-semibold">{feature.title}</h4>
                    <p className="text-sm text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rotate-3 transform rounded-xl bg-primary/20 blur-lg"></div>
            <Image
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjwvc3ZnPg=="
              alt="Technician"
              width={1024}
              height={1024}
              unoptimized={true}
              className="relative w-full rounded-xl border border-white/10 object-cover shadow-2xl"
            />

            <div className="absolute -bottom-6 -left-6 hidden max-w-xs rounded-lg bg-white p-6 shadow-xl md:block">
              <div className="mb-2 flex items-center gap-3">
                <span className="material-symbols-outlined text-3xl text-green-600">
                  {data.quality_overlay.icon}
                </span>
                <span className="text-lg font-bold text-dark">{data.quality_overlay.title}</span>
              </div>
              <p className="text-xs text-gray-500">{data.quality_overlay.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
