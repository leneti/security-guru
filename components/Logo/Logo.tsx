import { useMantineColorScheme, createStyles } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  iconOnly?: boolean;
  size?: number;
}

const defaultSize = 50;

const useStyles = createStyles((theme) => ({
  bigDisplay: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  smallDisplay: {
    paddingBottom: "1rem",

    [theme.fn.largerThan("md")]: {
      display: "none",
    },
  },
}));

export default function Logo({ iconOnly, size }: LogoProps) {
  const { colorScheme } = useMantineColorScheme();
  const { classes } = useStyles();
  const dark = colorScheme === "dark";

  const logoSize = size ?? defaultSize;

  if (iconOnly) {
    return (
      <Link href="/">
        <Image
          alt="SG logo"
          src={dark ? "/Ikona_Oranzine.png" : "/Ikona_Tamsiai_Zalia.png"}
          height={logoSize + 10}
          width={((logoSize + 10) / 2001) * 2000}
          unoptimized
        />
      </Link>
    );
  }

  return (
    <>
      <Link href="/" className={classes.smallDisplay}>
        <Image
          alt="SG logo"
          src={
            dark ? "/Logotipas_Oranzine.png" : "/Logotipas_Tamsiai_Zalia.png"
          }
          height={logoSize + 10}
          width={((logoSize + 10) / 785) * 2000}
          unoptimized
        />
      </Link>
      <Link href="/" className={classes.bigDisplay}>
        <Image
          alt="SG logo"
          src={
            dark ? "/HLogotipas_Oranzine.png" : "/HLogotipas_Tamsiai_Zalia.png"
          }
          height={logoSize}
          width={(logoSize / 341) * 2000}
          unoptimized
        />
      </Link>
    </>
  );
}
