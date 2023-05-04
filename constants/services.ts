import ass from "@assets/services/ass.webp";
import ias from "@assets/services/ias.webp";
import iks from "@assets/services/iks.webp";
import pss from "@assets/services/pss.webp";
import vss from "@assets/services/vss.webp";
import { ServiceCardProps } from "@components/ServiceCard";

const baseUrl = "/paslaugos";

export const serviceData: ServiceCardProps[] = [
  {
    image: ass,
    title: "Apsaugos signalizacijos sistemos",
    price: "nuo €200",
    description:
      "Montuojame ir įrengiame apsaugos signalizacijas namuose ir biuruose, kad užtikrinti jūsų patalpų saugumą.",
    url: `${baseUrl}/apsaugos-signalizacijos-sistemos`,
  },
  {
    image: iks,
    title: "Įeigos kontrolės sistemos",
    price: "nuo €100",
    description:
      "Diegiame ir įrengiame eismo valdymo sistemas biuruose ir viešosiose vietose eismo srautams valdyti ir saugumui užtikrinti.",
    url: `${baseUrl}/ieigos-kontroles-sistemos`,
  },
  {
    image: pss,
    title: "Priešgaisrinės signalizacijos sistemos",
    price: "nuo €200",
    description:
      "Montuojame ir įrengiame priešgaisrinę signalizaciją namuose ir biuruose, kad aptiktume ir įspėti apie gaisrą.",
    url: `${baseUrl}/priesgaisrines-signalizacijos-sistemos`,
  },
  {
    image: vss,
    title: "Vaizdo stebėjimo sistemos",
    price: "nuo €200",
    description:
      "Montuojame ir įrengiame stebėjimo sistemas namuose ir biuruose, kad  stebėti veiklą ir aptikti bet kokį įtartiną elgesį.",
    url: `${baseUrl}/vaizdo-stebejimo-sistemos`,
  },
  {
    image: ias,
    title: "Integruoti apsaugos sprendimai",
    price: "nuo €200",
    description:
      "Pagal užsakymą įrengiame integruotą apsaugos sistemą, kuri apima apsaugos signalizaciją, eismo kontrolę, priešgaisrinę signalizaciją ir stebėjimo sistemas.",
    url: `${baseUrl}/integruoti-apsaugos-sprendimai`,
  },
];
