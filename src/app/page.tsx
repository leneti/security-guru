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
    <div className="flex flex-col">
      {/* Hero Section - Glassmorphism effect */}
      <section className="relative bg-gradient-to-br from-midnight to-midnight-light text-offWhite py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMC0xMHY2aDZ2LTZoLTZ6bTEwIDEwdjZoNnYtNmgtNnptMC0xMHY2aDZ2LTZoLTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{t("title")}</h1>
            <p className="text-xl md:text-2xl text-sage-light mb-8 mb-10">{t("subtitle")}</p>
            <p className="text-lg text-peach mb-10 font-medium">
              Kokybė, profesionalumas ir inovatyvumas
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/kontaktai"
                className="bg-peach text-midnight px-8 py-4 rounded-lg font-semibold text-lg hover:bg-peach-dark transition-colors"
              >
                {tNav("homeSecurity")}
              </Link>
              <Link
                href="/kontaktai"
                className="border-2 border-peach text-peach px-8 py-4 rounded-lg font-semibold text-lg hover:bg-peach hover:text-midnight transition-colors"
              >
                {tNav("businessSecurity")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-offWhite">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-midnight mb-12">
            {tServices("title")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {services.map((service) => (
              <Link
                key={service.id}
                href="/paslaugos"
                className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow text-center group"
              >
                <div className="w-16 h-16 rounded-full bg-peach/20 flex items-center justify-center text-midnight group-hover:bg-peach group-hover:text-midnight transition-colors mb-4">
                  {service.icon}
                </div>
                <h3 className="text-midnight font-semibold text-sm">{service.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators - Sage card with midnight text for contrast */}
      <section className="py-16 bg-sage text-midnight">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <svg
                className="w-12 h-12 text-peach mx-auto mb-4"
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
              <h3 className="text-xl font-semibold mb-2 text-midnight">Darbo laikas</h3>
              <p className="text-midnight-light">{tCommon("workingHours")}</p>
            </div>
            <div className="text-center p-6">
              <svg
                className="w-12 h-12 text-peach mx-auto mb-4"
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
              <h3 className="text-xl font-semibold mb-2 text-midnight">Darbo teritorija</h3>
              <p className="text-midnight-light">{tCommon("serviceArea")}</p>
            </div>
            <div className="text-center p-6">
              <svg
                className="w-12 h-12 text-peach mx-auto mb-4"
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
              <h3 className="text-xl font-semibold mb-2 text-midnight">Susisiekite</h3>
              <p className="text-midnight-light">{tCommon("phone")}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
