import { Overlay, Center, Box, createStyles, Container } from "@mantine/core";
import Image from "next/image";
import { PageTitle, SlideDownTitle } from "@components";
import { bgImgHeight } from "@constants";
import houses from "@assets/unsplash-houses.webp";

const useStyles = createStyles((theme) => ({
  container: {
    position: "relative",
    minHeight: bgImgHeight,
  },

  image: { objectFit: "cover" },

  colorOnly: {
    minHeight: bgImgHeight,
    backgroundColor: theme.fn.primaryColor(),
    padding: `calc(${theme.spacing.xl} * 2) calc(${theme.spacing.xl} * 4)`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    [theme.fn.smallerThan("md")]: {
      padding: `calc(${theme.spacing.xl} * 2) calc(${theme.spacing.xl} * 3)`,
    },

    [theme.fn.smallerThan("sm")]: {
      padding: `calc(${theme.spacing.xl} * 2) ${theme.spacing.xl}`,
    },
  },

  content: {
    minHeight: bgImgHeight,
    zIndex: 1,
  },
}));

export interface PageBGProps {
  pageTitle: string;
  children?: React.ReactNode;
  colorOnly?: boolean;
  wip?: boolean;
}

export default function PageBackground(props: PageBGProps) {
  const { pageTitle, children, colorOnly, wip } = props;
  const { classes } = useStyles();

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
