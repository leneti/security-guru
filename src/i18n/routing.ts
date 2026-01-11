import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["lt"],
  // Used when no locale matches
  defaultLocale: "lt",
  localePrefix: "as-needed",
});
