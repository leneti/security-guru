import Image from "next/image";
import Link from "next/link";
import Ikona_Oranzine from "@assets/logo/Ikona_Oranzine.webp";
import HLogotipas_Oranzine from "@assets/logo/HLogotipas_Oranzine.webp";
import Logotipas_Oranzine from "@assets/logo/Logotipas_Oranzine.webp";
import { LogoProps } from "./types";
import { rem } from "@mantine/core";

const defaultSize = 50;
const logoAltText = "Security Guru logotipas";

export default function Logo(props: LogoProps) {
  const { iconOnly, size, onClick, vertical } = props;
  const logoSize = size ?? defaultSize;
  const src = iconOnly
    ? Ikona_Oranzine
    : vertical
    ? Logotipas_Oranzine
    : HLogotipas_Oranzine;
  const width = (logoSize * 2000) / (iconOnly ? 2001 : vertical ? 785 : 341);

  return (
    <Link href="/" onClick={onClick}>
      <Image
        alt={logoAltText}
        src={src}
        height={logoSize}
        width={width}
        style={{
          height: rem(logoSize),
          width: rem(width),
        }}
        unoptimized
      />
    </Link>
  );
}
