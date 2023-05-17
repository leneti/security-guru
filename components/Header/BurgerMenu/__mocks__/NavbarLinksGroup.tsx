import { LinksGroupProps } from "../types";

export default function NavbarLinksGroupMock({
  label,
  links,
  url,
}: Partial<LinksGroupProps>) {
  if (!url) {
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
  return (
    <a href={url} className={`mock_navbar_link--${label}`}>
      {label}
    </a>
  );
}
