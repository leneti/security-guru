import { Grid } from "@mantine/core";
import { ServiceCard } from "@components";
import { serviceData } from "@constants";

export default function Services() {
  return (
    <Grid columns={6} grow>
      {serviceData.map((service) => (
        <Grid.Col sm={6} md={3} lg={2} key={service.title}>
          <ServiceCard {...service} />
        </Grid.Col>
      ))}
    </Grid>
  );
}
