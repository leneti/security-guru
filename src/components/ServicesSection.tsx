import Image from "next/image";

import type { Service } from "@/payload-types";

export function ServicesSection(props: { services: Service[] }) {
  const { services } = props;

  return (
    <section id="services" className="bg-light py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-semibold text-dark">Mūsų Paslaugos</h2>
          <div className="mx-auto h-1 w-20 bg-primary"></div>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Siūlome platų apsaugos sprendimų spektrą, pritaikytą pagal jūsų individualius poreikius.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const imageSrc = typeof service.image === "string" ? service.image : service.image?.url;
            return (
              <div
                key={service.id}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:shadow-2xl"
              >
                <div className="relative h-48 overflow-hidden bg-gray-200">
                  <div className="absolute inset-0 z-10 bg-dark/20 transition-all group-hover:bg-dark/0"></div>
                  {imageSrc && (
                    <Image
                      src={imageSrc}
                      alt={service.title}
                      width={400}
                      height={200}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="h-full w-full transform object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute top-4 right-4 z-20 flex aspect-square rounded-full bg-white/90 p-2 backdrop-blur">
                    <span className={`material-symbols-outlined text-primary`}>{service.icon}</span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-2 text-xl font-bold text-dark transition-colors group-hover:text-primary">
                    {service.title}
                  </h3>
                  <p className="mb-4 flex-1 text-sm leading-relaxed font-light text-gray-600">
                    {service.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                    <span className="text-xs font-bold tracking-wider text-gray-400 uppercase">
                      Projekto kaina
                    </span>
                    <span className="rounded bg-primary/20 px-3 py-1 text-sm font-bold text-dark">
                      Nuo {service.price}€
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
