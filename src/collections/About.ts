import type { GlobalConfig } from "payload";

import { revalidateFrontend } from "@/lib/revalidation";

export const About: GlobalConfig = {
  slug: "about",
  access: {
    read: () => true,
  },
  admin: {
    group: "Content",
  },
  fields: [
    {
      name: "subtitle",
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
      name: "features",
      type: "array",
      required: true,
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
        {
          name: "icon",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "quality_overlay",
      type: "group",
      required: true,
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
        {
          name: "icon",
          type: "text",
          required: true,
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFrontend],
  },
};
