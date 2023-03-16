import {
  Container,
  Overlay,
  Center,
  useMantineColorScheme,
  Box,
} from "@mantine/core";
import { PageTitle } from "@components";

export interface PageBGProps {
  pageTitle: string;
  children?: JSX.Element;
}

export default function PageBackground({ pageTitle, children }: PageBGProps) {
  const dark = useMantineColorScheme().colorScheme === "dark";

  return (
    <>
      <PageTitle>{pageTitle}</PageTitle>

      <Box
        sx={{
          position: "relative",
          backgroundImage: "url(/unsplash-houses.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Overlay opacity={0} zIndex={0} blur={dark ? 1 : 2} />
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
