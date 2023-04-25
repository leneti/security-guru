import {
  Overlay,
  Center,
  useMantineColorScheme,
  Box,
  createStyles,
} from "@mantine/core";
import Image from "next/image";
import { PageTitle, SlideDownTitle } from "@components";
import { bgImgHeight } from "@constants";
import houses from "@assets/unsplash-houses.webp";

const useStyles = createStyles(() => ({
  container: {
    position: "relative",
    minHeight: bgImgHeight,
  },

  image: { objectFit: "cover" },
}));

export interface PageBGProps {
  pageTitle: string;
  children?: React.ReactNode;
}

export default function PageBackground({ pageTitle, children }: PageBGProps) {
  const dark = useMantineColorScheme().colorScheme === "dark";
  const { classes } = useStyles();

  return (
    <>
      <PageTitle>{pageTitle}</PageTitle>
      <SlideDownTitle title={pageTitle} />

      <Box className={classes.container}>
        <Image
          src={houses}
          alt="houses"
          fill
          className={classes.image}
          priority
        />
        <Overlay opacity={0.1} zIndex={0} blur={dark ? 1 : 2}>
          <Center p="xl" sx={{ minHeight: bgImgHeight }}>
            {children}
          </Center>
        </Overlay>
      </Box>
    </>
  );
}
