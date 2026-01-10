"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function PreFooterSection() {
  const t = useTranslations("PreFooter");

  return (
    <section className="relative py-20 bg-midnight overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255)_1px,transparent_0)] [background-size:40px_40px]"></div>
      </div>

      <div className="container mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image Placeholder */}
          <div className="order-2 lg:order-1">
            <div className="glass-card rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
              <div className="w-full h-full bg-gradient-to-br from-sage-light/30 via-peach/10 to-mauve/10 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-peach/20 to-peach/10 flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-midnight/20"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-midnight/30 text-sm font-medium">Patikimas saugumas</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {t("title")}
            </h2>

            <p className="text-xl md:text-2xl text-sage-light mb-8 leading-relaxed">
              {t("subtitle")}
            </p>

            <Link
              href="/kontaktai"
              className="bg-peach text-midnight px-8 py-4 rounded-lg font-semibold text-lg hover:bg-peach-light transition-all duration-200 shadow-lg hover:shadow-xl inline-block"
            >
              {t("cta")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}