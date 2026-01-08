"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";

export default function Footer() {
  const t = useTranslations("Footer");
  const common = useTranslations("Common");
  const nav = useTranslations("Navigation");

  return (
    <footer className="bg-midnight text-sage-light">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/assets/logo/SVG/03_Horizontalus_Logotipas/HLogotipas_Oranzine.svg"
                alt="SECURITY GURU"
                width={140}
                height={24}
              />
            </div>
            <p className="text-sm text-sage">{t("tagline")}</p>
            <p className="text-xs text-sage-dark">{common("companyCode")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-peach font-semibold mb-4">{t("quickLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm hover:text-peach transition-colors">
                  {nav("home")}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm hover:text-peach transition-colors">
                  {nav("services")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm hover:text-peach transition-colors">
                  {nav("about")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-peach transition-colors">
                  {nav("contact")}
                </Link>
              </li>
              <li>
                <Link href="/eshop" className="text-sm hover:text-peach transition-colors">
                  {nav("eshop")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-peach font-semibold mb-4">{t("services")}</h3>
            <ul className="space-y-2">
              <li className="text-sm">Apsaugos signalizacijos</li>
              <li className="text-sm">Įeigos kontrolės</li>
              <li className="text-sm">Priešgaisrinės signalizacijos</li>
              <li className="text-sm">Vaizdo stebėjimo</li>
              <li className="text-sm">Integruoti sprendimai</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-peach font-semibold mb-4">{t("contactInfo")}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-peach"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>{common("phone")}</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-peach"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>{common("phone2")}</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-peach"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>{common("email")}</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-peach"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{common("workingHours")}</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-peach"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>{common("serviceArea")}</span>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex space-x-4 mt-6">
              <a
                href="https://www.facebook.com/people/Security-guru/100088856047734/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sage-light hover:text-peach transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/mbsecurityguru/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sage-light hover:text-peach transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,2.16c3.2,0,3.58,0,4.85.07,3.25.15,4.77,1.69,4.92,4.92.06,1.27.07,1.65.07,4.85s0,3.58-.07,4.85c-.15,3.23-1.66,4.77-4.92,4.92-1.27.06-1.65.07-4.85.07s-3.58,0-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s0-3.58.07-4.85C2.38,3.92,3.9,2.38,7.15,2.23,8.42,2.18,8.8,2.16,12,2.16ZM12,0C8.74,0,8.33,0,7.05.07c-4.27.2-6.78,2.71-7,7C0,8.33,0,8.74,0,12s0,3.67.07,4.95c.2,4.27,2.71,6.78,7,7C8.33,24,8.74,24,12,24s3.67,0,4.95-.07c4.27-.2,6.78-2.71,7-7C24,15.67,24,15.26,24,12s0-3.67-.07-4.95c-.2-4.27-2.71-6.78-7-7C15.67,0,15.26,0,12,0Zm0,5.84A6.16,6.16,0,1,0,18.16,12,6.16,6.16,0,0,0,12,5.84ZM12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16ZM18.41,4.15a1.44,1.44,0,1,0,1.44,1.44A1.44,1.44,0,0,0,18.41,4.15Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-sage-dark mt-8 pt-8 text-center text-sm text-sage-dark">
          <p>
            &copy; {new Date().getFullYear()} SECURITY GURU. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
