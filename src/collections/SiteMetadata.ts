import type { GlobalConfig } from "payload";

export const SiteMetadata: GlobalConfig = {
  slug: "site-metadata",
  access: {
    read: () => true,
  },
  admin: {
    group: "Content",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
  ],
};
