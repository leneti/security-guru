export interface Link {
  link?: string;
  label: string;
  links?: Link[];
}

export interface HeaderSearchProps {
  links: Link[];
}
