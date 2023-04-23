import Image from "next/image";
import Link from "next/link";
import { useMantineColorScheme } from "@mantine/core";
import { useGlobalStyles } from "@constants";

interface LogoProps {
  iconOnly?: boolean;
  size?: number;
  drawer?: boolean;
}

const defaultSize = 50;

export default function Logo({ iconOnly, size, drawer }: LogoProps) {
  const { colorScheme } = useMantineColorScheme();
  const { classes: gClasses } = useGlobalStyles();
  const dark = colorScheme === "dark";

  const logoSize = size ?? defaultSize;

  if (iconOnly) {
    return (
      <Link href="/">
        <Image
          alt="SG logo"
          src={
            dark
              ? "/logo/Ikona_Oranzine.webp"
              : "/logo/Ikona_Tamsiai_Zalia.webp"
          }
          height={0}
          width={0}
          style={{
            height: logoSize + 10,
            width: "auto",
          }}
          unoptimized
        />
      </Link>
    );
  }

  if (drawer) {
    return (
      <Link href="/">
        <Image
          alt="SG logo"
          src={
            dark
              ? "/logo/HLogotipas_Oranzine.webp"
              : "/logo/HLogotipas_Tamsiai_Zalia.webp"
          }
          height={0}
          width={0}
          style={{
            height: logoSize * 0.75,
            width: "auto",
          }}
          unoptimized
        />
      </Link>
    );
  }

  return (
    <>
      <Link
        href="/"
        className={gClasses.smallDisplay}
        style={{
          paddingBottom: "1rem",
        }}
      >
        <Image
          alt="SG logo"
          src={
            dark
              ? "/logo/Logotipas_Oranzine.webp"
              : "/logo/Logotipas_Tamsiai_Zalia.webp"
          }
          height={0}
          width={0}
          style={{
            height: logoSize + 10,
            width: "auto",
          }}
          unoptimized
        />
      </Link>
      <Link href="/" className={gClasses.bigDisplay}>
        <Image
          alt="SG logo"
          src={
            dark
              ? "/logo/HLogotipas_Oranzine.webp"
              : "/logo/HLogotipas_Tamsiai_Zalia.webp"
          }
          height={0}
          width={0}
          style={{
            height: logoSize,
            width: "auto",
          }}
          unoptimized
        />
      </Link>
    </>
  );
}
