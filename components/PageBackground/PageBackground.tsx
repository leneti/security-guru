import {
  Container,
  Overlay,
  Center,
  useMantineColorScheme,
  Box,
} from "@mantine/core";
import { PageTitle, SlideDownTitle } from "@components";

export interface PageBGProps {
  pageTitle: string;
  children?: React.ReactNode;
}

export default function PageBackground({ pageTitle, children }: PageBGProps) {
  const dark = useMantineColorScheme().colorScheme === "dark";

  return (
    <>
      <PageTitle>{pageTitle}</PageTitle>
      <SlideDownTitle title={pageTitle} />

      <Box
        sx={{
          position: "relative",
          backgroundImage: "url(/unsplash-houses.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Overlay opacity={0.1} zIndex={0} blur={dark ? 1 : 2} />
        <Container
          fluid
          p={0}
          sx={{
            position: "relative",
          }}
        >
          <Center py="xl" sx={{ minHeight: 700 }}>
            {children}
          </Center>
        </Container>
      </Box>
    </>
  );
}
