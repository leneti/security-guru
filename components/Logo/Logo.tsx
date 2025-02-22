import Image from "next/image";
import HLogotipas_Oranzine from "@site/assets/logo/HLogotipas_Oranzine.webp";
import Ikona_Oranzine from "@site/assets/logo/Ikona_Oranzine.webp";
import Logotipas_Oranzine from "@site/assets/logo/Logotipas_Oranzine.webp";
import Link from "@link";
import classes from "./Logo.module.css";
import type { LogoProps } from "./types";

const defaultSize = 50;
const logoAltText = "Security Guru logotipas";

export default function Logo(props: LogoProps) {
  const { iconOnly, size, onClick, vertical, className: extraClasses } = props;
  const logoSize = size ?? defaultSize;
  const src = iconOnly
    ? Ikona_Oranzine
    : vertical
      ? Logotipas_Oranzine
      : HLogotipas_Oranzine;

  return (
    <Link
      href="/"
      onClick={onClick}
      style={{ height: logoSize }}
      className={extraClasses}
    >
      <Image
        alt={logoAltText}
        src={src}
        height={logoSize}
        className={classes.logo}
        unoptimized
        priority
      />
    </Link>
  );
}
