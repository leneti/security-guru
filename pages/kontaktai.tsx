import { Container, Box, BackgroundImage, Center } from "@mantine/core";
import { GetInTouch, PageTitle } from "@components";

export default function Contacts() {
  return (
    <>
      <PageTitle>Kontaktai</PageTitle>

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
            <Center py="xl" sx={{ minHeight: "75vh" }}>
              <GetInTouch />
            </Center>
          </BackgroundImage>
        </Container>
      </Box>
    </>
  );
}
