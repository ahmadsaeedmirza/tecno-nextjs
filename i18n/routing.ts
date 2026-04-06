import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "de", "fr", "es", "zh", "ja", "ar", "hi"],

  // Used when no locale matches
  defaultLocale: "en",

  // Our routes live under app/[locale]/..., so we must
  // always include the locale prefix in URLs.
  localePrefix: "always",
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
