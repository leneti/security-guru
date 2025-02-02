import type { StaticImageData } from "next/image";

export interface ServiceCardProps {
  image: string | StaticImageData;
  title: string;
  description: string;
  price: string;
  url: string;
}
