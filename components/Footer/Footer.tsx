import {
  createStyles,
  Text,
  Container,
  ActionIcon,
  Group,
  useMantineTheme,
} from "@mantine/core";
import { IconBrandInstagram, IconBrandFacebook, IconMail } from "@tabler/icons";
import Link from "next/link";
import Logo from "@components/Logo";

const useStyles = createStyles((theme) => ({
  footer: {
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
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

  link: {
    display: "block",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[6],
    fontSize: theme.fontSizes.sm,
    paddingTop: 3,
    paddingBottom: 3,

    "&:hover": {
      textDecoration: "underline",
    },
  },

  title: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: theme.spacing.xs / 2,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },

  afterFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  social: {
    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.xs,
    },
  },
}));

export default function Footer() {
  const theme = useMantineTheme();
  const { classes } = useStyles();

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <Logo iconOnly size={40} />
          <Text size="xs" color="dimmed" className={classes.description}>
            Kokybė, profesionalumas ir inovatyvumas
          </Text>
        </div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text color="dimmed" size="sm">
          © {new Date().getFullYear()} MB Security Guru
        </Text>

        <Group spacing={0} className={classes.social} position="right" noWrap>
          <ActionIcon size="lg">
            <Link
              href="https://www.facebook.com/people/Security-guru/100088856047734/"
              target="_blank"
            >
              <IconBrandFacebook
                size={18}
                stroke={1.5}
                color={
                  theme.fn.primaryColor()
                }
              />
            </Link>
          </ActionIcon>
          <ActionIcon size="lg">
            <Link
              href="https://www.instagram.com/mbsecurityguru/"
              target="_blank"
            >
              <IconBrandInstagram size={18} stroke={1.5} color={
                  theme.fn.primaryColor()
                } />
            </Link>
          </ActionIcon>
          <ActionIcon size="lg">
            <Link href="/">
              <IconMail size={18} stroke={1.5} color={
                  theme.fn.primaryColor()
                } />
            </Link>
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}
