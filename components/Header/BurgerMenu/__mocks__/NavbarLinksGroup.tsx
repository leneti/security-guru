import { LinksGroupProps } from "../types";

export default function NavbarLinksGroupMock(props: Partial<LinksGroupProps>) {
  const { label } = props;

  if ("links" in props) {
    return (
      <div className={`mock_navbar_links_group--${label}`}>
        {props.links?.map(({ label, url }) => (
          <a key={url} href={url} className={`mock_navbar_link--${label}`}>
            {label}
          </a>
        ))}
      </div>
    );
  }

  if ("url" in props) {
    return (
      <a href={props.url} className={`mock_navbar_link--${label}`}>
        {label}
      </a>
    );
  }

  return null;
}
