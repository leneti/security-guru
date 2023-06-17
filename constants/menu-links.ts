import {
  TablerIconsProps,
  IconShieldCheck,
  IconMail,
  IconBriefcase,
  // IconTools,
} from "@tabler/icons-react";

interface LinkBasic {
  label: string;
  icon: React.FC<TablerIconsProps>;
  initiallyOpened?: boolean;
  hidden?: boolean;
}

interface LinkUrl {
  url: string;
}

type SubLink = LinkUrl & Pick<LinkBasic, "label">;

interface LinkParent {
  links: SubLink[];
}

type Link = LinkBasic & (LinkParent | LinkUrl);

export const menuLinks: Link[] = [
  {
    label: "Apie mus",
    url: "/apie-mus",
    icon: IconShieldCheck, // IconUser | IconBriefcase | IconInfoCircle
  },
  {
    label: "Paslaugos",
    icon: IconBriefcase, // IconCog | IconGrid
    initiallyOpened: true,
    links: [
      {
        label: "Apsaugos signalizacijos sistemos",
        url: "/paslaugos/apsaugos-signalizacijos-sistemos",
      },
      {
        label: "Įeigos kontrolės sistemos",
        url: "/paslaugos/ieigos-kontroles-sistemos",
      },
      {
        label: "Integruoti apsaugos sprendimai",
        url: "/paslaugos/integruoti-apsaugos-sprendimai",
      },
      {
        label: "Priešgaisrinės signalizacijos sistemos",
        url: "/paslaugos/priesgaisrines-signalizacijos-sistemos",
      },
      {
        label: "Vaizdo stebėjimo sistemos",
        url: "/paslaugos/vaizdo-stebejimo-sistemos",
      },
    ],
  },
  // {
  //   label: "Projektai",
  //   url: "/projektai",
  //   icon: IconTools, // IconNotebook | IconSignature | IconArchive
  // },
  {
    label: "Susisiekite",
    url: "/susisiekite",
    icon: IconMail, // IconPhone | IconHeadset | IconMessageCircle
  },
];

export const flatLinks = menuLinks.flatMap((link) =>
  "url" in link ? { url: link.url } : link.links.map(({ url }) => ({ url }))
);
