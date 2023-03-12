import { Container, Box, BackgroundImage } from "@mantine/core";
import { PageTitle } from "@site/components";

export default function Home() {
  return (
    <>
      <PageTitle>Įeigos kontrolės sistemos</PageTitle>

      <Box
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors["brand-light-green"][3],
        })}
      >
        <Container fluid p={0}>
          <BackgroundImage src="/unsplash-houses.webp">
            <Box sx={{ height: "75vh" }}></Box>
          </BackgroundImage>
        </Container>
      </Box>
    </>
  );
}
