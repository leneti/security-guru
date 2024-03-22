import { ActionIcon, Group, Text } from "@mantine/core";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconMail,
} from "@tabler/icons-react";
import { Logo } from "@site/components/Logo";
import Link from "@link";
import classes from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.inner}>
        <div className={classes.logo}>
          <Logo iconOnly />
          <Text size="xs" className={classes.description}>
            Kokybė, profesionalumas ir inovatyvumas
          </Text>
        </div>
      </div>

      <div className={classes.afterFooter}>
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
            variant="subtle"
          >
            <IconBrandFacebook className={classes.icon} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            component={Link}
            href="https://www.instagram.com/mbsecurityguru/"
            target="_blank"
            title="Instagram paskyra"
            variant="subtle"
          >
            <IconBrandInstagram className={classes.icon} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            component={Link}
            href="/kontaktai"
            title="Susisiekite"
            variant="subtle"
          >
            <IconMail className={classes.icon} stroke={1.5} />
          </ActionIcon>
        </Group>
      </div>
    </footer>
  );
}
