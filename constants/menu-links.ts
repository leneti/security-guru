import {
  TablerIcon,
  IconInfoCircle,
  IconShieldCheck,
  IconMail,
  IconBriefcase,
} from "@tabler/icons";

interface LinkBasic {
  label: string;
  icon: TablerIcon;
  initiallyOpened?: boolean;
}

interface LinkUrl {
  link: string;
}

type SubLink = LinkUrl & Pick<LinkBasic, "label">;

interface LinkParent {
  links: SubLink[];
}

type Link = LinkBasic & (LinkParent | LinkUrl);

export const menuLinks: Link[] = [
  {
    label: "Apie mus",
    link: "/apie-mus",
    icon: IconInfoCircle, // IconUser | IconBriefcase
  },
  {
    label: "Apsaugos sprendimai",
    link: "/apsaugos-sprendimai",
    icon: IconShieldCheck, // IconLock | IconShieldLock
  },
  {
    label: "Paslaugos",
    icon: IconBriefcase, // IconCog | IconGrid
    initiallyOpened: true,
    links: [
      {
        label: "Apsaugos signalizacijos sistemos",
        link: "/paslaugos/apsaugos-signalizacijos-sistemos",
      },
      {
        label: "Įeigos kontrolės sistemos",
        link: "/paslaugos/ieigos-kontroles-sistemos",
      },
      {
        label: "Integruoti apsaugos sprendimai",
        link: "/paslaugos/integruoti-apsaugos-sprendimai",
      },
      {
        label: "Priešgaisrinės signalizacijos sistemos",
        link: "/paslaugos/priesgaisrines-signalizacijos-sistemos",
      },
      {
        label: "Vaizdo stebėjimo sistemos",
        link: "/paslaugos/vaizdo-stebejimo-sistemos",
      },
    ],
  },
  {
    label: "Kontaktai",
    link: "/kontaktai",
    icon: IconMail, // IconPhone | IconHeadset | IconMessageCircle
  },
];
