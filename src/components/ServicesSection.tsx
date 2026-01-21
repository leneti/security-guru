import type { Service } from "@/payload-types";
import Image from "next/image";

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
          {services.map((service) => (
            <div
              key={service.id}
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:shadow-2xl"
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 z-10 bg-dark/20 transition-all group-hover:bg-dark/0"></div>
                <Image
                  src={
                    typeof service.image === "string"
                      ? service.image
                      : service.image?.url ||
                        "data:image/svg+xml;base64,IDxzdmcgd2lkdGg9IjEwMjQiIGhlaWdodD0iMTAyNCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+IDxkZWZzPiA8bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSItMTAwJSIgeTE9IjAiIHgyPSIwIiB5Mj0iMCI+IDxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2IwYjBiMCIvPiA8c3RvcCBvZmZzZXQ9Ii41IiBzdG9wLWNvbG9yPSIjZjBmMGYwIi8+IDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2IwYjBiMCIvPiA8YW5pbWF0ZVRyYW5zZm9ybSBpZD0iYSIgYXR0cmlidXRlTmFtZT0iZ3JhZGllbnRUcmFuc2Zvcm0iIHR5cGU9InRyYW5zbGF0ZSIgZnJvbT0iMCIgdG89IjIiIGR1cj0iMXMiIGJlZ2luPSIwcyIvPiA8YW5pbWF0ZVRyYW5zZm9ybSBpZD0iYiIgYXR0cmlidXRlTmFtZT0iZ3JhZGllbnRUcmFuc2Zvcm0iIHR5cGU9InRyYW5zbGF0ZSIgZnJvbT0iMCIgdG89IjIiIGR1cj0iMS41cyIgYmVnaW49ImEuZW5kIi8+IDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9ImdyYWRpZW50VHJhbnNmb3JtIiB0eXBlPSJ0cmFuc2xhdGUiIGZyb209IjAiIHRvPSIyIiBkdXI9IjJzIiBiZWdpbj0iYi5lbmQiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+IDwvbGluZWFyR3JhZGllbnQ+IDwvZGVmcz4gPHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9InVybCgjZykiLz4gPC9zdmc+"
                  }
                  alt={service.title}
                  width={400}
                  height={200}
                  unoptimized={true}
                  className="h-full w-full transform object-cover transition-transform duration-700 group-hover:scale-110"
                />
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
          ))}
        </div>
      </div>
    </section>
  );
}
