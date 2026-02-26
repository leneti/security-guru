import Image from "next/image";

import { ColoredHeading } from "@/components/payload/ColoredHeading";
import { AboutData } from "@/lib/page-data-types";

export async function AboutSection({ data }: { data: AboutData }) {
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
              alt=""
              role="presentation"
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
