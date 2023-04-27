import { Grid } from "@mantine/core";
import { ServiceCard } from "@components";
import { serviceData } from "@constants";

export default function Services() {
  return (
    <Grid columns={12}>
      <Grid.Col sm={12} lg={7}>
        <ServiceCard {...serviceData[0]} />
      </Grid.Col>
      <Grid.Col sm={6} lg={5}>
        <ServiceCard {...serviceData[1]} />
      </Grid.Col>
      <Grid.Col sm={6} lg={4}>
        <ServiceCard {...serviceData[2]} />
      </Grid.Col>
      <Grid.Col sm={6} lg={4}>
        <ServiceCard {...serviceData[3]} />
      </Grid.Col>
      <Grid.Col sm={6} lg={4}>
        <ServiceCard {...serviceData[4]} />
      </Grid.Col>
    </Grid>
  );
}
