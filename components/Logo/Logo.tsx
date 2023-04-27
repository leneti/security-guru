import Image from "next/image";
import Link from "next/link";
import { useGlobalStyles } from "@utils";
import Ikona_Oranzine from "@assets/logo/Ikona_Oranzine.webp";
import HLogotipas_Oranzine from "@assets/logo/HLogotipas_Oranzine.webp";
import Logotipas_Oranzine from "@assets/logo/Logotipas_Oranzine.webp";
import { LogoProps } from "./types";

const defaultSize = 50;

export default function Logo(props: LogoProps) {
  const { iconOnly, size, drawer, onClick } = props;
  const { classes: gClasses } = useGlobalStyles();

  const logoSize = size ?? defaultSize;

  if (iconOnly) {
    return (
      <Link href="/" onClick={onClick}>
        <Image
          alt="SG logo"
          src={Ikona_Oranzine}
          height={logoSize + 10}
          width={((logoSize + 10) / 2001) * 2000}
          unoptimized
        />
      </Link>
    );
  }

  if (drawer) {
    return (
      <Link href="/" onClick={onClick}>
        <Image
          alt="SG logo"
          src={HLogotipas_Oranzine}
          height={logoSize * 0.75}
          width={(logoSize / 341) * 2000 * 0.75}
          unoptimized
        />
      </Link>
    );
  }

  return (
    <>
      <Link
        href="/"
        onClick={onClick}
        className={gClasses.smallDisplay}
        style={{
          paddingBottom: "1rem",
        }}
      >
        <Image
          alt="SG logo"
          src={Logotipas_Oranzine}
          height={logoSize + 10}
          width={((logoSize + 10) / 785) * 2000}
          unoptimized
        />
      </Link>
      <Link href="/" onClick={onClick} className={gClasses.bigDisplay}>
        <Image
          alt="SG logo"
          src={HLogotipas_Oranzine}
          height={logoSize}
          width={(logoSize / 341) * 2000}
          unoptimized
        />
      </Link>
    </>
  );
}
