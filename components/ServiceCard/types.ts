import { StaticImageData } from "next/image";

export interface ServiceCardProps {
  image: StaticImageData;
  title: string;
  description: string;
  price: string;
}
