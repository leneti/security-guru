import { Grid } from "@mantine/core";
import { ServiceCard } from "@components";
import ass from "@assets/services/ass.webp";
import ias from "@assets/services/ias.webp";
import iks from "@assets/services/iks.webp";
import pss from "@assets/services/pss.webp";
import vss from "@assets/services/vss.webp";

const data = [
  {
    image: ias,
    title: "Integruoti apsaugos sprendimai",
    price: "nuo €200",
    description:
      "Pagal užsakymą įrengiame integruotą apsaugos sistemą, kuri apima apsaugos signalizaciją, eismo kontrolę, priešgaisrinę signalizaciją ir stebėjimo sistemas.",
  },
  {
    image: ass,
    title: "Apsaugos signalizacijos sistemos",
    price: "nuo €200",
    description:
      "Montuojame ir įrengiame apsaugos signalizacijas namuose ir biuruose, kad užtikrinti jūsų patalpų saugumą.",
  },
  {
    image: pss,
    title: "Priešgaisrinės signalizacijos sistemos",
    price: "nuo €200",
    description:
      "Montuojame ir įrengiame priešgaisrinę signalizaciją namuose ir biuruose, kad aptiktume ir įspėti apie gaisrą.",
  },
  {
    image: iks,
    title: "Įeigos kontrolės sistemos",
    price: "nuo €100",
    description:
      "Diegiame ir įrengiame eismo valdymo sistemas biuruose ir viešosiose vietose eismo srautams valdyti ir saugumui užtikrinti.",
  },
  {
    image: vss,
    title: "Vaizdo stebėjimo sistemos",
    price: "nuo €200",
    description:
      "Montuojame ir įrengiame stebėjimo sistemas namuose ir biuruose, kad  stebėti veiklą ir aptikti bet kokį įtartiną elgesį.",
  },
];

export default function Services() {
  return (
    <Grid columns={12}>
      <Grid.Col sm={12} lg={7}>
        <ServiceCard {...data[0]} />
      </Grid.Col>
      <Grid.Col sm={6} lg={5}>
        <ServiceCard {...data[1]} />
      </Grid.Col>
      <Grid.Col sm={6} lg={4}>
        <ServiceCard {...data[2]} />
      </Grid.Col>
      <Grid.Col sm={6} lg={4}>
        <ServiceCard {...data[3]} />
      </Grid.Col>
      <Grid.Col sm={6} lg={4}>
        <ServiceCard {...data[4]} />
      </Grid.Col>
    </Grid>
  );
}
