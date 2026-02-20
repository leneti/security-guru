import type { GlobalConfig } from "payload";

export const Navigation: GlobalConfig = {
  slug: "navigation",
  access: {
    read: () => true,
  },
  admin: {
    group: "Content",
  },
  fields: [
    {
      name: "nav_links",
      type: "array",
      required: true,
      fields: [
        {
          name: "href",
          type: "text",
          required: true,
        },
        {
          name: "label",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "contact_button_text",
      type: "text",
      required: true,
    },
    {
      name: "menu_icon",
      type: "text",
      required: true,
    },
    {
      name: "close_icon",
      type: "text",
      required: true,
    },
  ],
};
