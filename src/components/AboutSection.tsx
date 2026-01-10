"use client";

import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-dark text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#051F1C] skew-x-12 transform translate-x-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">
              Kodėl rinktis mus?
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold mb-8 leading-tight">
              Saugumas reikalauja <br />
              <span className="text-primary">Ekspertų Dėmesio</span>
            </h2>
            <p className="text-sage mb-8 text-lg leading-relaxed font-light">
              SECURITY GURU teikia pirmenybę jūsų saugumo reikalavimams. Mūsų ekspertai skiria laiką suprasti jūsų rūpesčius ir pateikia asmeninius sprendimus.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-primary border border-primary/20">
                  <span className="material-symbols-outlined">check</span>
                </div>
                <div>
                  <h4 className="font-semibold text-xl mb-1">Visapusiški sprendimai</h4>
                        <p className="text-gray-400 text-sm">
                          Nuo signalizacijos iki vaizdo stebėjimo - viskas iš vienų rankų.
                        </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-primary border border-primary/20">
                  <span className="material-symbols-outlined">check</span>
                </div>
                <div>
                  <h4 className="font-semibold text-xl mb-1">Orientacija į klientą</h4>
                        <p className="text-gray-400 text-sm">
                          Glaudžiai bendradarbiaujame užtikrindami jūsų ramybę.
                        </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-primary border border-primary/20">
                  <span className="material-symbols-outlined">check</span>
                </div>
                <div>
                  <h4 className="font-semibold text-xl mb-1">Lankstumas</h4>
                        <p className="text-gray-400 text-sm">
                          Dirbame 7 dienas per savaitę, nuo 9 iki 21 val.
                        </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-primary/20 rounded-xl transform rotate-3 blur-lg"></div>
            <Image
              src="data:image/svg+xml;base64,IDxzdmcgd2lkdGg9IjEwMjQiIGhlaWdodD0iMTAyNCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+IDxkZWZzPiA8bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSItMTAwJSIgeTE9IjAiIHgyPSIwIiB5Mj0iMCI+IDxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2IwYjBiMCIvPiA8c3RvcCBvZmZzZXQ9Ii41IiBzdG9wLWNvbG9yPSIjZjBmMGYwIi8+IDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2IwYjBiMCIvPiA8YW5pbWF0ZVRyYW5zZm9ybSBpZD0iYSIgYXR0cmlidXRlTmFtZT0iZ3JhZGllbnRUcmFuc2Zvcm0iIHR5cGU9InRyYW5zbGF0ZSIgZnJvbT0iMCIgdG89IjIiIGR1cj0iMXMiIGJlZ2luPSIwcyIvPiA8YW5pbWF0ZVRyYW5zZm9ybSBpZD0iYiIgYXR0cmlidXRlTmFtZT0iZ3JhZGllbnRUcmFuc2Zvcm0iIHR5cGU9InRyYW5zbGF0ZSIgZnJvbT0iMCIgdG89IjIiIGR1cj0iMS41cyIgYmVnaW49ImEuZW5kIi8+IDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9ImdyYWRpZW50VHJhbnNmb3JtIiB0eXBlPSJ0cmFuc2xhdGUiIGZyb209IjAiIHRvPSIyIiBkdXI9IjJzIiBiZWdpbj0iYi5lbmQiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+IDwvbGluZWFyR3JhZGllbnQ+IDwvZGVmcz4gPHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9InVybCgjZykiLz4gPC9zdmc+"
              alt="Technician"
              width={1024}
              height={1024}
              unoptimized={true}
              className="relative rounded-xl shadow-2xl border border-white/10 w-full object-cover"
            />

            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-xl max-w-xs hidden md:block">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-green-600 text-3xl">verified_user</span>
                <span className="font-bold text-dark text-lg">Garantuota Kokybė</span>
              </div>
              <p className="text-gray-500 text-xs">
                Naudojame tik sertifikuotą ir patikimą įrangą.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}