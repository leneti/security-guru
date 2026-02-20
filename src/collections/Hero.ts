import type {
  CustomComponent,
  FieldClientComponent,
  FieldServerComponent,
  GlobalConfig,
  PayloadComponent,
} from "payload";

import { ButtonSelector } from "@/components/payload/ButtonSelector";

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
      type: "richText",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "services_button",
      type: "group",
      admin: {
        components: {
          Field: ButtonSelector as unknown as CustomComponent &
            PayloadComponent<FieldClientComponent | FieldServerComponent>,
        },
      },
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
      admin: {
        components: {
          Field: ButtonSelector as unknown as CustomComponent &
            PayloadComponent<FieldClientComponent | FieldServerComponent>,
        },
      },
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
};
