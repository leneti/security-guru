import { Grid } from "@mantine/core";
import ServiceCard from "@components/ServiceCard";

const data = [
  {
    image:
      "https://cdn.discordapp.com/attachments/1071828506708820109/1099674216917385286/leneti_The_custom_installation_of_the_integrated_security_syste_1e71c570-f14c-4e8f-b835-16697e8fc236.png",
    title: "Integruoti apsaugos sprendimai",
    price: "nuo €200",
    description:
      "Pagal užsakymą įrengiame integruotą apsaugos sistemą, kuri apima apsaugos signalizaciją, eismo kontrolę, priešgaisrinę signalizaciją ir stebėjimo sistemas.",
  },
  {
    image:
      "https://cdn.discordapp.com/attachments/1071828506708820109/1092165061432328232/leneti_Realistic_modern_security_alarm_system_matte_black_finis_b7294c0b-4511-4b9d-9f52-86db9616a34b.png",
    title: "Apsaugos signalizacijos sistemos",
    price: "nuo €200",
    description:
      "Montuojame ir įrengiame apsaugos signalizacijas namuose ir biuruose, kad užtikrinti jūsų patalpų saugumą.",
  },
  {
    image:
      "https://cdn.discordapp.com/attachments/1071828506708820109/1099791833187491870/leneti_Fire_alarms_for_homes_and_offices_are_an_essential_part__5b8447ae-3bf0-44c4-af47-9788d746f3c9.png",
    title: "Priešgaisrinės signalizacijos sistemos",
    price: "nuo €200",
    description:
      "Montuojame ir įrengiame priešgaisrinę signalizaciją namuose ir biuruose, kad aptiktume ir įspėti apie gaisrą.",
  },
  {
    image:
      "https://cdn.discordapp.com/attachments/1071828506708820109/1092222696575746158/leneti_Realistic_modern_access_control_system_matte_black_finis_34506954-f3d5-4877-a848-e7e4d3253b21.png",
    title: "Įeigos kontrolės sistemos",
    price: "nuo €100",
    description:
      "Diegiame ir įrengiame eismo valdymo sistemas biuruose ir viešosiose vietose eismo srautams valdyti ir saugumui užtikrinti.",
  },
  {
    image:
      "https://cdn.discordapp.com/attachments/1071828506708820109/1099791861473878079/leneti_Surveillance_systems_for_homes_and_offices_are_an_effect_fcc9a709-b643-4aa5-b9cf-f43699806594.png",
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
