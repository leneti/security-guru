import type { CollectionConfig } from "payload";

export const Services: CollectionConfig = {
  slug: "services",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    { name: "image", type: "upload", relationTo: "media" },
    { name: "title", type: "text", required: true },
    { name: "description", type: "textarea", required: true },
    { name: "icon", type: "text", required: true },
    { name: "price", type: "number", required: true },
  ],
};
