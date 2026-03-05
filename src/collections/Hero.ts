import type { GlobalConfig } from "payload";

import { revalidateFrontend } from "@/lib/revalidation";

export const Hero: GlobalConfig = {
  slug: "hero",
  access: {
    read: () => true,
  },
  admin: {
    group: "Content",
  },
  fields: [
    {
      name: "badge_text",
      type: "text",
      required: true,
    },
    {
      name: "heading",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "test_rich_text",
      type: "richText",
    },
    {
      name: "services_button",
      type: "group",
      fields: [
        {
          name: "type",
          type: "select",
          options: ["primary", "secondary"],
          required: true,
        },
        {
          name: "text",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "contact_button",
      type: "group",
      fields: [
        {
          name: "type",
          type: "select",
          options: ["primary", "secondary"],
          required: true,
        },
        {
          name: "text",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "scroll_icon",
      type: "text",
      required: true,
    },
  ],
  hooks: {
    afterChange: [revalidateFrontend],
  },
};
