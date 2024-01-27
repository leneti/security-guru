import { Text, Container, Group, ActionIcon } from "@mantine/core";
import {
  IconBrandInstagram,
  IconBrandFacebook,
  IconMail,
} from "@tabler/icons-react";
import Link from "next/link";
import { Logo } from "@site/components/Logo";
import classes from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <Logo iconOnly />
          <Text size="xs" className={classes.description}>
            Kokybė, profesionalumas ir inovatyvumas
          </Text>
        </div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text size="sm">© {new Date().getFullYear()} MB Security Guru</Text>

        <Group
          gap="xs"
          className={classes.social}
          justify="flex-end"
          wrap="nowrap"
        >
          <ActionIcon
            component={Link}
            href="https://www.facebook.com/people/Security-guru/100088856047734/"
            target="_blank"
            title="Facebook puslapis"
          >
            <IconBrandFacebook
              className={classes.icon}
              // size={smallScreen ? 28 : 18}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon
            component={Link}
            href="https://www.instagram.com/mbsecurityguru/"
            target="_blank"
            title="Instagram paskyra"
          >
            <IconBrandInstagram
              className={classes.icon}
              // size={smallScreen ? 28 : 18}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon component={Link} href="/kontaktai" title="Susisiekite">
            <IconMail
              className={classes.icon}
              // size={smallScreen ? 28 : 18}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}
