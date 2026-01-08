import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function ServicesPage() {
  const t = useTranslations("Services");

  const services = [
    {
      id: "alarm",
      title: t("alarmSystems.title"),
      description: t("alarmSystems.description"),
      price: t("alarmSystems.price"),
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      ),
      fullDescription:
        "Įsibrovimo ir pavojaus signalizacijos sistemos yra diegiamos nesankcionuoto patekimo į saugomą patalpą aptikimui ir prevencijai. Statistikos duomenimis, namai arba patalpos, kuriuose nėra įrengta apsaugos signalizacijos sistema, vagystės rizika išauga 300%*. Dar vienas įdiegtos signalizacijos sistemos privalumas yra namų draudimo įmokos sumažinimas- draudimo įmonės draudžiant namus įvertina ar namuose yra įrengta apsaugos signalizacija ir ar ji yra pajungtaotą steb į centralizuėjimo pultą. Įmonė teikia apsaugos signalizacijos sistemų montavimo, priežiūros ir remonto paslaugas.",
    },
    {
      id: "access",
      title: t("accessControl.title"),
      description: t("accessControl.description"),
      price: t("accessControl.price"),
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.2-2.858.567-4.163a4 4 0 117.317 1.12c.65.927 1.116 2.016 1.347 3.122"
          />
        </svg>
      ),
      fullDescription:
        "Pagrindinė įeigos kontrolės sistemų paskirtis yra riboti pašalinių asmenų patekimą į saugomas patalpas arba teritorijas. Be to, šios sistemos gali atlikti laiko apskaitos funkcijas. Šiandieninėse realijose šios sistemos yra neatsiejamos bendros apsaugos sistemos dalis, kurios yra diegiamos įvairios paskirties objektuose- administracinėse, gamybinėse, gyvenamuosiuose. Įmonė teikia įeigos kontrolės bei telefonspynių sistemų diegimo, priežiūros ir remonto paslaugas.",
    },
    {
      id: "fire",
      title: t("fireAlarm.title"),
      description: t("fireAlarm.description"),
      price: t("fireAlarm.price"),
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      fullDescription:
        "Priešgaisrinės signalizacijos sistemos yra naudojamos automatiniam, gaisrui būdingiems požymiams, tokiems kaip dūmai, liepsna, didelė temperatūra, aptikimui. Šiuolaikinės priešgaisrinės sistemos gali ne tik nustatyti kurioje patalpoje kilo gaisras bet ir valdyti pastatų automatikos sistemas, bei stebėti kiekvieno jutiklio užterštumo lygį realiu laiku. Remiantis Priešgaisrinės apsaugos ir gelbėjimo departamento taisyklemis gaisro aptikimo ir signalizavimo sistemos įrengimas yra privalomas projektuojant ir statant naujus pastatus, bei juos renovuojant arba keičiant jų paskirtį. Šių taisyklių nepaisymas gali brangiai kainuoti, jog gaisras yra viena iš didžiausių grėsmių turtui ir žmonių gyvybei bei sveikatai. Be to, pastate neįrengta gaisro aptikimo sistema gali stipriai padidinti pastato draudimo kaštus. Mūsų įmonė teikia priešgaisrinių signalizacijos sistemų montavimo, remonto bei priežiūros paslaugas.",
    },
    {
      id: "video",
      title: t("videoSurveillance.title"),
      description: t("videoSurveillance.description"),
      price: t("videoSurveillance.price"),
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      ),
      fullDescription:
        "Vaizdo stebėjimo sistemos yra skirtos teritorijų, patalpų, kiemų bei specifinių daiktų stebėjimui ir apsaugai. Jos atlieka aptikimo, atpažinimo, identifikavimo, autentifikavimo bei specialias užduotis. Įdiegta vaizdo stebėjimo sistema ne tik leidžia stebėti nuotolinį ar vietinį objektą bei atkurti įvykių eigą, bet atlieka ir prevencijos bei atbaidymo funkcijas. Mūsų įmonė teikia vaizdo stebėjimo sistemų montavimo, priežiūros ir remonto paslaugas.",
    },
    {
      id: "integrated",
      title: t("integratedSolutions.title"),
      description: t("integratedSolutions.description"),
      price: t("integratedSolutions.price"),
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
          />
        </svg>
      ),
      fullDescription:
        "Apsaugos sistemos yra integruojamos, siekiant išgauti didesnio saugumo ir funkcionalumo. Pavyzdžiui, įeigos kontrolės sistemos yra integruojamos į gaisro aptikimo sistemas- esant gaisro požymiams visi pastato išėjimai yra automatiškai atrakinami. Išmanios vaizdo sistemos yra integruojamos į įsibrovimo pavojaus sistemas, gaunant perimetro apsaugos sprendimą. Mūsų įmonė teikia įeigos kontrolės, vaizdo stebėjimo, apsaugos bei gaisro aptikimo sistemų integracijos paslaugas.",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-midnight text-offWhite py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center">{t("title")}</h1>
          <p className="text-xl text-sage text-center mt-4 max-w-2xl mx-auto">
            Kokybė, profesionalumas ir inovatyvumas - mūsų vertybės teikiant profesionalias apsaugos
            sprendimus
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 bg-offWhite">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`flex flex-col lg:flex-row gap-8 p-8 bg-white rounded-2xl shadow-md ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="lg:w-1/3 flex flex-col items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-peach/20 flex items-center justify-center text-midnight mb-4">
                    {service.icon}
                  </div>
                  <p className="text-2xl font-bold text-midnight">{service.price}</p>
                </div>
                <div className="lg:w-2/3">
                  <h2 className="text-2xl font-bold text-midnight mb-4">{service.title}</h2>
                  <p className="text-gray-700 mb-6 leading-relaxed">{service.fullDescription}</p>
                  <Link
                    href="/kontaktai"
                    className="inline-flex items-center bg-midnight text-offWhite px-6 py-3 rounded-lg font-semibold hover:bg-midnight-light transition-colors"
                  >
                    Susisiekti
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-midnight text-offWhite">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Reikia individualaus pasiūlymo?</h2>
          <p className="text-sage mb-8 max-w-2xl mx-auto">
            Susisiekite su mumis ir mes parinksime geriausią apsaugos sprendimą jūsų poreikiams
          </p>
          <Link
            href="/kontaktai"
            className="inline-flex bg-peach text-midnight px-8 py-4 rounded-lg font-semibold text-lg hover:bg-peach-dark transition-colors"
          >
            Susisiekti dabar
          </Link>
        </div>
      </section>
    </div>
  );
}
