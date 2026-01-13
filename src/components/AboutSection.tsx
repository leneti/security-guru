import Image from "next/image";

export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-dark py-24 text-white">
      <div className="absolute top-0 right-0 h-full w-1/3 translate-x-20 skew-x-12 transform bg-[#051F1C]"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 md:grid-cols-2">
          <div>
            <span className="mb-2 block text-sm font-bold tracking-widest text-primary uppercase">
              Kodėl rinktis mus?
            </span>
            <h2 className="mb-8 text-4xl leading-tight font-semibold md:text-5xl">
              Saugumas reikalauja <br />
              <span className="text-primary">Ekspertų Dėmesio</span>
            </h2>
            <p className="mb-8 text-lg leading-relaxed font-light text-sage">
              SECURITY GURU teikia pirmenybę jūsų saugumo reikalavimams. Mūsų ekspertai skiria laiką
              suprasti jūsų rūpesčius ir pateikia asmeninius sprendimus.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-white/10 text-primary">
                  <span className="material-symbols-outlined">check</span>
                </div>
                <div>
                  <h4 className="mb-1 text-xl font-semibold">Visapusiški sprendimai</h4>
                  <p className="text-sm text-gray-400">
                    Nuo signalizacijos iki vaizdo stebėjimo - viskas iš vienų rankų.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-white/10 text-primary">
                  <span className="material-symbols-outlined">check</span>
                </div>
                <div>
                  <h4 className="mb-1 text-xl font-semibold">Orientacija į klientą</h4>
                  <p className="text-sm text-gray-400">
                    Glaudžiai bendradarbiaujame užtikrindami jūsų ramybę.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-white/10 text-primary">
                  <span className="material-symbols-outlined">check</span>
                </div>
                <div>
                  <h4 className="mb-1 text-xl font-semibold">Lankstumas</h4>
                  <p className="text-sm text-gray-400">
                    Dirbame 7 dienas per savaitę, nuo 9 iki 21 val.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rotate-3 transform rounded-xl bg-primary/20 blur-lg"></div>
            <Image
              src="data:image/svg+xml;base64,IDxzdmcgd2lkdGg9IjEwMjQiIGhlaWdodD0iMTAyNCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+IDxkZWZzPiA8bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSItMTAwJSIgeTE9IjAiIHgyPSIwIiB5Mj0iMCI+IDxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2IwYjBiMCIvPiA8c3RvcCBvZmZzZXQ9Ii41IiBzdG9wLWNvbG9yPSIjZjBmMGYwIi8+IDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2IwYjBiMCIvPiA8YW5pbWF0ZVRyYW5zZm9ybSBpZD0iYSIgYXR0cmlidXRlTmFtZT0iZ3JhZGllbnRUcmFuc2Zvcm0iIHR5cGU9InRyYW5zbGF0ZSIgZnJvbT0iMCIgdG89IjIiIGR1cj0iMXMiIGJlZ2luPSIwcyIvPiA8YW5pbWF0ZVRyYW5zZm9ybSBpZD0iYiIgYXR0cmlidXRlTmFtZT0iZ3JhZGllbnRUcmFuc2Zvcm0iIHR5cGU9InRyYW5zbGF0ZSIgZnJvbT0iMCIgdG89IjIiIGR1cj0iMS41cyIgYmVnaW49ImEuZW5kIi8+IDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9ImdyYWRpZW50VHJhbnNmb3JtIiB0eXBlPSJ0cmFuc2xhdGUiIGZyb209IjAiIHRvPSIyIiBkdXI9IjJzIiBiZWdpbj0iYi5lbmQiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+IDwvbGluZWFyR3JhZGllbnQ+IDwvZGVmcz4gPHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9InVybCgjZykiLz4gPC9zdmc+"
              alt="Technician"
              width={1024}
              height={1024}
              unoptimized={true}
              className="relative w-full rounded-xl border border-white/10 object-cover shadow-2xl"
            />

            <div className="absolute -bottom-6 -left-6 hidden max-w-xs rounded-lg bg-white p-6 shadow-xl md:block">
              <div className="mb-2 flex items-center gap-3">
                <span className="material-symbols-outlined text-3xl text-green-600">
                  verified_user
                </span>
                <span className="text-lg font-bold text-dark">Garantuota Kokybė</span>
              </div>
              <p className="text-xs text-gray-500">
                Naudojame tik sertifikuotą ir patikimą įrangą.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
