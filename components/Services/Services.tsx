import { Grid } from "@mantine/core";
import { ServiceCard } from "@site/components/ServiceCard";
import { serviceData } from "@site/constants";

export default function Services() {
  return (
    <Grid columns={6} grow>
      {serviceData.map((service) => (
        <Grid.Col span={{ base: 6, md: 3, lg: 2 }} key={service.title}>
          <ServiceCard {...service} />
        </Grid.Col>
      ))}
    </Grid>
  );
}
