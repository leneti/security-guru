import type {
  AboutData,
  FooterData,
  HeroData,
  NavigationData,
  ServiceData,
  SiteMetadataData,
} from "./page-data-types";

/**
 * Default data for PayloadCMS globals.
 * Used both for:
 * 1. Seeding the database with initial content
 * 2. Fallback when globals are not found in the database
 *
 * This single source of truth ensures consistency between
 * the seeded data and the runtime defaults.
 */

export const DEFAULT_HERO_DATA: HeroData = {
  badge_text: "Saugumas Pirmiausia",
  heading: {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 1,
              mode: "normal",
              style: "",
              text: "Kokybė",
              type: "text",
              version: 1,
              $: {
                color: "peach",
              },
            },
            {
              detail: 0,
              format: 1,
              mode: "normal",
              style: "",
              text: ", Profesionalumas ir Inovatyvumas",
              type: "text",
              version: 1,
            },
          ],
          direction: null,
          format: "",
          indent: 0,
          type: "heading",
          version: 1,
          tag: "h1",
        },
      ],
      direction: null,
      format: "",
      indent: 0,
      type: "root",
      version: 1,
    },
  },
  description:
    "Apsaugokite tai, kas svarbiausia. Profesionalios saugumo sistemos namams ir verslui Vilniuje ir Vilniaus apskrityje.",
  services_button: {
    type: "primary",
    text: "Mūsų Paslaugos",
  },
  contact_button: {
    type: "secondary",
    text: "Gauti Pasiūlymą",
  },
  scroll_icon: "keyboard_arrow_down",
};

export const DEFAULT_SERVICES_DATA: ServiceData[] = [
  {
    title: "Apsaugos signalizacijos sistemos",
    description:
      "Montuojame ir įrengiame apsaugos signalizacijas namuose ir biuruose, kad užtikrinti jūsų patalpų saugumą.",
    icon: "sensors",
    price: 199,
  },
  {
    title: "Įeigos kontrolės sistemos",
    description:
      "Diegiame ir įrengiame eismo valdymo sistemas biuruose ir viešosiose vietose eismo srautams valdyti ir saugumui užtikrinti.",
    icon: "fingerprint",
    price: 99,
  },
  {
    title: "Priešgaisrinės signalizacijos sistemos",
    description:
      "Montuojame ir įrengiame priešgaisrinę signalizaciją namuose ir biuruose, kad aptiktume ir įspėti apie gaisrą.",
    icon: "local_fire_department",
    price: 199,
  },
  {
    title: "Vaizdo stebėjimo sistemos",
    description:
      "Montuojame ir įrengiame stebėjimo sistemas namuose ir biuruose, kad stebėti veiklą ir aptikti bet kokį įtartiną elgesį.",
    icon: "videocam",
    price: 199,
  },
  {
    title: "Integruoti apsaugos sprendimai",
    description:
      "Pagal užsakymą įrengiame integruotą apsaugos sistemą, kuri apima apsaugos signalizaciją, eismo kontrolę, priešgaisrinę signalizaciją ir stebėjimo sistemas.",
    icon: "hub",
    price: 199,
  },
];

export const DEFAULT_ABOUT_DATA: AboutData = {
  subtitle: "Kodėl rinktis mus?",
  heading: "Saugumas reikalauja Ekspertų Dėmesio",
  description:
    "SECURITY GURU teikia pirmenybę jūsų saugumo reikalavimams. Mūsų ekspertai skiria laiką suprasti jūsų rūpesčius ir pateikia asmeninius sprendimus.",
  features: [
    {
      title: "Visapusiški sprendimai",
      description: "Nuo signalizacijos iki vaizdo stebėjimo - viskas iš vienų rankų.",
      icon: "check",
    },
    {
      title: "Orientacija į klientą",
      description: "Glaudžiai bendradarbiaujame užtikrindami jūsų ramybę.",
      icon: "check",
    },
    {
      title: "Lankstumas",
      description: "Dirbame 7 dienas per savaitę, nuo 9 iki 21 val.",
      icon: "check",
    },
  ],
  quality_overlay: {
    title: "Garantuota Kokybė",
    description: "Naudojame tik sertifikuotą ir patikimą įrangą.",
    icon: "verified_user",
  },
};

export const DEFAULT_FOOTER_DATA: FooterData = {
  description:
    "Kokybiški saugumo sprendimai jūsų namams ir verslui. Ilgametė patirtis ir profesionalumas garantuoja jūsų ramybę.",
  navigation_links: [
    { label: "Paslaugos", href: "#services" },
    { label: "Apie mus", href: "#about" },
    { label: "Kontaktai", href: "#contact" },
  ],
  company_details: {
    company_name: 'MB "Security Guru"',
    company_code: "306109454",
    location: "Vilnius, Lietuva",
  },
  copyright_text: "© 2026 Security Guru. Visos teisės saugomos.",
};

export const DEFAULT_NAVIGATION_DATA: NavigationData = {
  nav_links: [
    { href: "#services", label: "Paslaugos" },
    { href: "#about", label: "Apie mus" },
  ],
  contact_button_text: "Susisiekti",
  menu_icon: "menu",
  close_icon: "close",
};

export const DEFAULT_SITE_METADATA_DATA: SiteMetadataData = {
  title: "Security Guru - Apsaugos sistemos Vilniuje",
  description:
    "Profesionalūs apsaugos sprendimai jūsų namams ir verslui. Apsaugos signalizacijos, įeigos kontrolės, priešgaisrinės signalizacijos, vaizdo stebėjimo sistemos Vilniuje ir Vilniaus apskrityje.",
};
