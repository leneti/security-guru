import { ServiceCardProps } from "../types";

export function ServiceCard(props: Partial<ServiceCardProps>) {
  const { title, image, description, price, url } = props;

  return (
    <>
      <h3>Mock title: {title}</h3>
      <div>Mock image: {JSON.stringify(image)}</div>
      <div>Mock description: {description}</div>
      <div>Mock price: {price}</div>
      <div>Mock url: {url}</div>
    </>
  );
}
