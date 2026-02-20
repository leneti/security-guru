import path from "path";
import { fileURLToPath } from "url";

import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig, type CollectionConfig, type GlobalConfig } from "payload";

import { ColorFeature } from "./components/payload/ColorFeature";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Minimal collection definitions for seeding (no admin UI components)
const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [],
};

const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  upload: true,
};

const Services: CollectionConfig = {
  slug: "services",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
  ],
};

const Hero: GlobalConfig = {
  slug: "hero",
  access: {
    read: () => true,
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
};

const About: GlobalConfig = {
  slug: "about",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "subtitle",
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
      name: "features",
      type: "array",
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
};

const Footer: GlobalConfig = {
  slug: "footer",
  access: {
    read: () => true,
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

const Navigation: GlobalConfig = {
  slug: "navigation",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "nav_links",
      type: "array",
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

const SiteMetadata: GlobalConfig = {
  slug: "site-metadata",
  access: {
    read: () => true,
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

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || "",
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || "",
  }),
  collections: [Users, Media, Services],
  admin: {
    user: Users.slug,
  },
  globals: [Hero, About, Footer, Navigation, SiteMetadata],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [...defaultFeatures, ColorFeature],
  }),
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  plugins: [],
});
