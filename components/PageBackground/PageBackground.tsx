import { Overlay, Center, Box, createStyles, Container } from "@mantine/core";
import Image from "next/image";
import { SlideDownTitle } from "@components/SlideDownTitle";
import { PageTitle } from "@components/PageTitle";
import { bgImgHeight } from "@constants";
import houses from "@assets/unsplash-houses.webp";
import { PageBGProps } from "./types";
import { getBGColor } from "@site/utils";

const useStyles = createStyles((theme, { wip }: { wip?: boolean }) => ({
  container: {
    position: "relative",
    minHeight: bgImgHeight,
  },

  image: { objectFit: "cover" },

  colorOnly: {
    backgroundColor: wip ? getBGColor(theme) : theme.fn.primaryColor(),
    padding: `calc(${theme.spacing.xl} * 2) calc(${theme.spacing.xl} * 4)`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    [theme.fn.smallerThan("md")]: {
      padding: `calc(${theme.spacing.xl} * 2) calc(${theme.spacing.xl} * 3)`,
    },

    [theme.fn.smallerThan("sm")]: {
      padding: `${theme.spacing.xl} ${theme.spacing.xl}`,
    },
  },

  content: {
    minHeight: bgImgHeight,
    zIndex: 1,
  },
}));

export default function PageBackground(props: PageBGProps) {
  const { pageTitle, colorOnly, wip, children } = props;
  const { classes } = useStyles({ wip });

  return (
    <>
      <PageTitle>{pageTitle}</PageTitle>

      <SlideDownTitle title={pageTitle} wip={wip} />

      {colorOnly ? (
        <Container fluid className={classes.colorOnly}>
          {children}
        </Container>
      ) : (
        <Box className={classes.container}>
          <Image
            src={houses}
            alt="houses"
            fill
            className={classes.image}
            priority
          />
          <Overlay opacity={0.1} zIndex={0} blur={1} />
          <Center p="xl" className={classes.content}>
            {children}
          </Center>
        </Box>
      )}
    </>
  );
}
