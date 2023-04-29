import {
  Container,
  Title,
  Divider,
  createStyles,
  UnstyledButton,
  Center,
  Button,
  px,
} from "@mantine/core";
import { useReducedMotion, useScrollIntoView } from "@mantine/hooks";
import { IconChevronRight } from "@tabler/icons";
import Link from "next/link";
import { Hero, PageTitle, Services } from "@components";
import { headerHeight } from "@constants";

const useStyles = createStyles(
  (theme, { reducedMotion }: { reducedMotion: boolean }) => ({
    scrollDownArrow: {
      position: "relative",
      width: "100%",

      ["::before"]: {
        animation: `bounce 1s ease ${reducedMotion ? "0" : "3"}`,
        bottom: theme.spacing.xl,
        color: theme.white,
        content: '"╲╱"',
        fontSize: "2rem",
        left: "50%",
        letterSpacing: "-2px",
        lineHeight: "4rem",
        marginLeft: "-3rem",
        opacity: 0.8,
        position: "absolute",
        textAlign: "center",
        width: "6rem",
        zIndex: 1,
      },

      ["@keyframes bounce"]: {
        ["50%"]: {
          transform: "translateY(-50%)",
        },
      },
    },

    services: {
      maxWidth: theme.breakpoints.xl,
      padding: `calc(${theme.spacing.xl} * 4) 0`,
      marginLeft: "auto",
      marginRight: "auto",

      [`@media (max-width: calc(${theme.spacing.xl} * 2 + ${theme.breakpoints.xl}))`]:
        {
          paddingLeft: `calc(${theme.spacing.xl} - ((100vw - ${theme.breakpoints.xl}) / 2))`,
          paddingRight: `calc(${theme.spacing.xl} - ((100vw - ${theme.breakpoints.xl}) / 2))`,
        },

      [theme.fn.smallerThan("xl")]: {
        paddingLeft: theme.spacing.xl,
        paddingRight: theme.spacing.xl,
      },

      [theme.fn.smallerThan("md")]: {
        paddingTop: `calc(${theme.spacing.xl} * 3)`,
      },

      [theme.fn.smallerThan("sm")]: {
        paddingTop: `calc(${theme.spacing.xl} * 2)`,
      },

      [theme.fn.smallerThan("xs")]: {
        paddingTop: theme.spacing.xl,
      },
    },

    contactBtnBox: {
      marginBottom: `calc(${theme.spacing.xl} * 3)`,
    },
  })
);

export default function Home() {
  const { classes } = useStyles({ reducedMotion: useReducedMotion() });
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLHeadingElement>({
    offset: 20 + px(headerHeight),
  });
  const scrollToServices = () => scrollIntoView({ alignment: "start" });

  return (
    <>
      <PageTitle />

      <Hero />

      <UnstyledButton
        title="Eiti žemyn"
        className={classes.scrollDownArrow}
        onClick={scrollToServices}
      />

      <Container fluid className={classes.services}>
        <Title ref={targetRef} order={2} size="h1" align="center">
          Paslaugos
        </Title>
        <Divider w="100%" my="xl" />
        <Services />
      </Container>

      <Center className={classes.contactBtnBox}>
        <Button
          component={Link}
          href="/susisiekite"
          rightIcon={<IconChevronRight size={20} />}
          size="lg"
          variant="subtle"
        >
          Susisiekite
        </Button>
      </Center>
    </>
  );
}
