import {
  Container,
  Title,
  Divider,
  createStyles,
  UnstyledButton,
  Center,
  Button,
} from "@mantine/core";
import { useReducedMotion, useScrollIntoView } from "@mantine/hooks";
import { IconChevronRight } from "@tabler/icons";
import { Hero, PageTitle, Services } from "@components";
import Link from "next/link";

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
      minHeight: 700,
      padding: `calc(${theme.spacing.xl} * 3) 0`,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",

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
    },
  })
);

export default function Home() {
  const reducedMotion = useReducedMotion();
  const { classes } = useStyles({ reducedMotion });
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLHeadingElement>({
    offset: 20,
  });

  return (
    <>
      <PageTitle />

      <Hero />

      <UnstyledButton
        className={classes.scrollDownArrow}
        onClick={() =>
          scrollIntoView({
            alignment: "start",
          })
        }
      />

      <Container fluid className={classes.services}>
        <Title ref={targetRef} order={2} size="h1">
          Paslaugos
        </Title>
        <Divider w="100%" my="xl" />
        <Services />
      </Container>

      <Center
        sx={(theme) => ({
          marginBottom: `calc(${theme.spacing.xl} * 3)`,
        })}
      >
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
