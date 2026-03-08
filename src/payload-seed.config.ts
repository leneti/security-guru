import path from "path";
import { fileURLToPath } from "url";

import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor, FixedToolbarFeature, TextStateFeature } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";

import { About } from "./collections/About";
import { Footer } from "./collections/Footer";
import { Hero } from "./collections/Hero";
import { Media } from "./collections/Media";
import { Navigation } from "./collections/Navigation";
import { Services } from "./collections/Services";
import { SiteMetadata } from "./collections/SiteMetadata";
import { Users } from "./collections/Users";
import { TEXT_STATE_COLORS, type TextStateConfig } from "./lib/richtext-text-state";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Helper to remove hooks from collections/globals (seed script runs outside Next.js)
const removeHooks = <T extends { hooks?: object }>(config: T): T => {
  const { hooks: _hooks, ...rest } = config;
  return rest as T;
};

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || "",
  db: mongooseAdapter({ url: process.env.DATABASE_URL || "" }),
  admin: { user: Users.slug },
  collections: [Users, Media, Services].map(removeHooks),
  globals: [Hero, About, Footer, Navigation, SiteMetadata].map(removeHooks),
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      FixedToolbarFeature(),
      TextStateFeature({ state: { color: TEXT_STATE_COLORS } satisfies TextStateConfig }),
    ],
  }),
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  plugins: [],
});
