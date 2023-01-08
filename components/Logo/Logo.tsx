import { useMantineTheme, useMantineColorScheme } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  iconOnly?: boolean;
  size?: number;
}

const defaultSize = 50;

function LogoIcon(logoSize: number) {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
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

export default function Logo({ iconOnly, size }: LogoProps) {
  const theme = useMantineTheme();
  const { width } = useViewportSize();
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const logoSize = size ?? defaultSize;

  if (iconOnly) {
    return LogoIcon(logoSize);
  }

  if (width < theme.breakpoints.md) {
    return (
      <Link href="/">
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
    );
  } else {
    return (
      <Link href="/">
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
    );
  }
}
