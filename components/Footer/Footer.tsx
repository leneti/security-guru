import {
  createStyles,
  Text,
  Container,
  Group,
  useMantineTheme,
  ActionIcon,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconBrandInstagram, IconBrandFacebook, IconMail } from "@tabler/icons";
import Link from "next/link";
import { Logo } from "@components";

const useStyles = createStyles((theme) => ({
  footer: {
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    borderTop: `1px solid ${theme.colors.dark[5]}`,
    color: theme.colors.gray[6],
  },

  logo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  description: {
    marginTop: theme.spacing.xs,
    textAlign: "center",
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    alignItems: "center",
  },

  wrapper: {
    width: 160,
  },

  afterFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${theme.colors.dark[4]}`,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  social: {
    [theme.fn.smallerThan("md")]: {
      marginTop: theme.spacing.xl,
      gap: theme.spacing.xl,
    },
  },
}));

export default function Footer() {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const smallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <Logo iconOnly size={40} />
          <Text size="xs" className={classes.description}>
            Kokybė, profesionalumas ir inovatyvumas
          </Text>
        </div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text size="sm">© {new Date().getFullYear()} MB Security Guru</Text>

        <Group spacing="xs" className={classes.social} position="right" noWrap>
          <ActionIcon
            component={Link}
            href="https://www.facebook.com/people/Security-guru/100088856047734/"
            target="_blank"
            title="Facebook puslapis"
          >
            <IconBrandFacebook
              size={smallScreen ? 28 : 18}
              stroke={1.5}
              color={theme.fn.primaryColor()}
            />
          </ActionIcon>
          <ActionIcon
            component={Link}
            href="https://www.instagram.com/mbsecurityguru/"
            target="_blank"
            title="Instagram paskyra"
          >
            <IconBrandInstagram
              size={smallScreen ? 28 : 18}
              stroke={1.5}
              color={theme.fn.primaryColor()}
            />
          </ActionIcon>
          <ActionIcon component={Link} href="/kontaktai" title="Susisiekite">
            <IconMail
              size={smallScreen ? 28 : 18}
              stroke={1.5}
              color={theme.fn.primaryColor()}
            />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}
