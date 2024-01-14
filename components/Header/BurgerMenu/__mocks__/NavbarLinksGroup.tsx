import { JSX } from "react";
import type { LinksGroupSingle, LinksGroupDropdown, LinksGroupProps } from "../types";

function NavbarLinksGroupMock({ label, links }: LinksGroupDropdown): JSX.Element;
function NavbarLinksGroupMock({ label, url }: LinksGroupSingle): JSX.Element;

function NavbarLinksGroupMock(props: LinksGroupProps) {
  const { label } = props;

  if ("url" in props) {
    const { url } = props;

    return (
      <a href={url} className={`mock_navbar_link--${label}`}>
        {label}
      </a>
    );
  }

  const { links } = props;

  return (
    <div className={`mock_navbar_links_group--${label}`}>
      {links?.map(({ label, url }) => (
        <a key={url} href={url} className={`mock_navbar_link--${label}`}>
          {label}
        </a>
      ))}
    </div>
  );
}

export default NavbarLinksGroupMock;
