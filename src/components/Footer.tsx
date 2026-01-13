import Image from "next/image";

import logo from "@/assets/logo/svg/horizontal_logo/h_logo_peach.svg";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-dark pt-20 pb-10 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 md:gap-12">
          <div className="col-span-1 text-center sm:col-span-2 sm:text-left md:col-span-2">
            <Image
              src={logo}
              alt="Security Guru logo"
              unoptimized
              height={40}
              loading="eager"
              className="mx-auto mb-6 sm:mx-0"
            />
            <p className="mx-auto mb-6 max-w-sm text-sm text-gray-400 sm:mx-0">
              Kokybiški saugumo sprendimai jūsų namams ir verslui. Ilgametė patirtis ir
              profesionalumas garantuoja jūsų ramybę.
            </p>
            <div className="flex justify-center space-x-4 sm:justify-start">
              <a
                href="https://www.facebook.com/people/Security-guru/100088856047734/"
                target="_blank"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all hover:bg-primary hover:text-dark"
              >
                <span className="font-bold">f</span>
              </a>
              <a
                href="https://www.instagram.com/mbsecurityguru/"
                target="_blank"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all hover:bg-primary hover:text-dark"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="text-center sm:text-left">
            <h4 className="mb-6 font-bold text-primary">Navigacija</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a href="#services" className="transition-colors hover:text-white">
                  Paslaugos
                </a>
              </li>
              <li>
                <a href="#about" className="transition-colors hover:text-white">
                  Apie mus
                </a>
              </li>
              <li>
                <a href="#shop" className="transition-colors hover:text-white">
                  E-Parduotuvė
                </a>
              </li>
              <li>
                <a href="#contact" className="transition-colors hover:text-white">
                  Kontaktai
                </a>
              </li>
            </ul>
          </div>
          <div className="text-center sm:text-left">
            <h4 className="mb-6 font-bold text-primary">Rekvizitai</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>MB &quot;Security Guru&quot;</li>
              <li>Įmonės kodas: 306109454</li>
              <li>Vilnius, Lietuva</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center border-t border-white/10 pt-8 text-center text-xs text-gray-500 md:flex-row md:justify-between md:text-left">
          <p>© 2026 Security Guru. Visos teisės saugomos.</p>
          <p className="mt-2 md:mt-0">Sukurta saugumui.</p>
        </div>
      </div>
    </footer>
  );
}
