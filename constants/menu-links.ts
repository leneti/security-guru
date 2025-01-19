import type { ForwardRefExoticComponent, RefAttributes } from "react";
import {
  type Icon,
  IconBadge4k,
  IconBriefcase,
  IconMail,
  type IconProps,
  IconShieldCheck,
} from "@tabler/icons-react";

interface LinkBasic {
  label: string;
  icon: ForwardRefExoticComponent<Omit<IconProps, "ref"> & RefAttributes<Icon>>;
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
    label: "E-parduotuvė",
    url: "https://securitygurushop.lt/",
    icon: IconBadge4k,
  },
  {
    label: "Apie mus",
    url: "/apie-mus",
    icon: IconShieldCheck,
  },
  {
    label: "Paslaugos",
    icon: IconBriefcase,
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
    icon: IconMail,
  },
];

export const flatLinks = menuLinks.flatMap((link) =>
  "url" in link ? { url: link.url } : link.links.map(({ url }) => ({ url })),
);
