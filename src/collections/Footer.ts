import type { GlobalConfig } from "payload";

export const Footer: GlobalConfig = {
  slug: "footer",
  access: {
    read: () => true,
  },
  admin: {
    group: "Content",
  },
  fields: [
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "navigation_links",
      type: "array",
      required: true,
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "href",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "company_details",
      type: "group",
      required: true,
      fields: [
        {
          name: "company_name",
          type: "text",
          required: true,
        },
        {
          name: "company_code",
          type: "text",
          required: true,
        },
        {
          name: "location",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "copyright_text",
      type: "text",
      required: true,
    },
  ],
};
