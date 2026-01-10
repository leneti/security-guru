"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function HomePage() {
  const t = useTranslations("Hero");
  const tCommon = useTranslations("Common");
  const tNav = useTranslations("Navigation");
  const tServices = useTranslations("Services");

  const services = [
    {
      id: "alarm",
      title: tServices("alarmSystems.title"),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      ),
    },
    {
      id: "access",
      title: tServices("accessControl.title"),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.2-2.858.567-4.163a4 4 0 117.317 1.12c.65.927 1.116 2.016 1.347 3.122"
          />
        </svg>
      ),
    },
    {
      id: "fire",
      title: tServices("fireAlarm.title"),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
          />
        </svg>
      ),
    },
    {
      id: "video",
      title: tServices("videoSurveillance.title"),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      id: "integrated",
      title: tServices("integratedSolutions.title"),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Modern light design */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-offWhite">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(2,22,20)_1px,transparent_0)] [background-size:40px_40px]"></div>
        </div>
        
        <div className="container mx-auto px-6 md:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div>
              {/* Tag/Badge */}
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage-light/50 border border-sage/30">
                  <div className="w-2 h-2 rounded-full bg-peach"></div>
                  <span className="text-sm text-midnight/70 font-medium">Profesionalūs apsaugos sprendimai</span>
                </div>
              </div>

              {/* Main Heading with Peach Underline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-midnight mb-6 leading-tight">
                {t("title")}
                <span className="block w-full max-w-[90%] h-1.5 bg-peach mt-4 rounded-full"></span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-midnight/70 mb-8 leading-relaxed">
                {t("subtitle")}
              </p>
              
              {/* Motto */}
              <p className="text-lg text-midnight/60 mb-12 font-medium">
                Kokybė, profesionalumas ir inovatyvumas
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/kontaktai"
                  className="bg-midnight text-offWhite px-8 py-4 rounded-lg font-semibold text-lg hover:bg-midnight-light transition-all duration-200 shadow-lg hover:shadow-xl text-center"
                >
                  {tNav("homeSecurity")}
                </Link>
                <Link
                  href="/kontaktai"
                  className="bg-white border-2 border-midnight/20 text-midnight px-8 py-4 rounded-lg font-semibold text-lg hover:border-midnight/40 hover:bg-sage-light/30 transition-all duration-200 shadow-md hover:shadow-lg text-center"
                >
                  {tNav("businessSecurity")}
                </Link>
              </div>
            </div>

            {/* Right Column - Image Placeholder */}
            <div className="hidden lg:block">
              <div className="glass-card rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
                <div className="w-full h-full bg-gradient-to-br from-sage-light/30 via-peach/10 to-mauve/10 flex items-center justify-center">
                  {/* Placeholder content - can be replaced with actual image */}
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
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <p className="text-midnight/30 text-sm font-medium">Security Image</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-midnight mb-4">
              {tServices("title")}
            </h2>
            <p className="text-midnight/60 text-lg max-w-2xl mx-auto">
              Visapusiški saugumo sprendimai jūsų namams ir verslui
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {services.map((service) => (
              <Link
                key={service.id}
                href="/paslaugos"
                className="glass-card flex flex-col items-center p-8 rounded-2xl hover:shadow-xl transition-all duration-300 text-center group hover:-translate-y-1"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-peach/20 to-peach/10 flex items-center justify-center text-midnight group-hover:from-peach/30 group-hover:to-peach/20 transition-all duration-300 mb-6">
                  {service.icon}
                </div>
                <h3 className="text-midnight font-semibold text-base leading-tight">{service.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-20 relative bg-offWhite">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="glass-card text-center p-8 rounded-2xl hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-peach/20 to-peach/10 flex items-center justify-center text-midnight mx-auto mb-6">
                <svg
                  className="w-8 h-8"
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
              </div>
              <h3 className="text-xl font-semibold mb-3 text-midnight">Darbo laikas</h3>
              <p className="text-midnight/70">{tCommon("workingHours")}</p>
            </div>
            <div className="glass-card text-center p-8 rounded-2xl hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-peach/20 to-peach/10 flex items-center justify-center text-midnight mx-auto mb-6">
                <svg
                  className="w-8 h-8"
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
              </div>
              <h3 className="text-xl font-semibold mb-3 text-midnight">Darbo teritorija</h3>
              <p className="text-midnight/70">{tCommon("serviceArea")}</p>
            </div>
            <div className="glass-card text-center p-8 rounded-2xl hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-peach/20 to-peach/10 flex items-center justify-center text-midnight mx-auto mb-6">
                <svg
                  className="w-8 h-8"
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
              </div>
              <h3 className="text-xl font-semibold mb-3 text-midnight">Susisiekite</h3>
              <p className="text-midnight/70">{tCommon("phone")}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
