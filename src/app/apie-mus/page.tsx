import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function AboutPage() {
  const t = useTranslations("About");

  const values = [
    {
      id: "clientFocus",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      id: "professionalism",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
    {
      id: "innovation",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
    },
    {
      id: "flexibility",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-midnight text-offWhite py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center">{t("title")}</h1>
          <p className="text-xl text-peach text-center mt-4 font-medium">{t("subtitle")}</p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 bg-offWhite">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xl text-gray-700 leading-relaxed">{t("intro")}</p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-midnight mb-12">
            {t("values.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => {
              const valueKey = value.id as
                | "clientFocus"
                | "professionalism"
                | "innovation"
                | "flexibility";
              return (
                <div
                  key={value.id}
                  className="flex flex-col items-center p-6 bg-sage-light/50 rounded-xl text-center hover:shadow-md transition-shadow"
                >
                  <div className="w-16 h-16 rounded-full bg-peach/20 flex items-center justify-center text-midnight mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-midnight mb-3">
                    {t(`values.${valueKey}.title`)}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {t(`values.${valueKey}.description`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-midnight text-offWhite">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Kodėl rinktis mus?</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-peach mr-3 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Ilgametė patirtis saugumo srityje</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-peach mr-3 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Kvalifikuoti specialistai</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-peach mr-3 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Moderniausios saugumo technologijos</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-peach mr-3 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Greitas ir patikimas aptarnavimas</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-peach mr-3 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Konkurentinės kainos</span>
                </li>
              </ul>
            </div>
            <div className="bg-sage/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-midnight">Mūsų darbo teritorija</h3>
              <p className="text-gray-700 mb-4">
                Teikiame paslaugas visoje Vilniaus apskrityje, įskaitant:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Vilnius</li>
                <li>• Trakai</li>
                <li>• Elektrėnai</li>
                <li>• Širvintos</li>
                <li>• Švenčionys</li>
                <li>• ir kitos apskrities savivaldybės</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-peach text-midnight">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Pasiruošę pradėti bendradarbiauti?</h2>
          <p className="text-midnight/80 mb-8 max-w-2xl mx-auto">
            Susisiekite su mumis ir mes parinksime geriausią apsaugos sprendimą jūsų namams ar
            verslui
          </p>
          <Link
            href="/kontaktai"
            className="inline-flex bg-midnight text-offWhite px-8 py-4 rounded-lg font-semibold text-lg hover:bg-midnight-light transition-colors"
          >
            {t("contactCta")}
          </Link>
        </div>
      </section>
    </div>
  );
}
