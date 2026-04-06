import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function encodeUrlPathSegments(inputUrl: string) {
  if (!inputUrl) return inputUrl;

  // Don't touch special URL schemes.
  if (/^(data|blob):/i.test(inputUrl)) return inputUrl;

  const dummyBase = "http://localhost";
  let url: URL;
  let isRelative = false;

  try {
    url = new URL(inputUrl);
  } catch {
    url = new URL(inputUrl, dummyBase);
    isRelative = true;
  }

  const encodedPathname = url.pathname
    .split("/")
    .map((segment) => {
      if (!segment) return segment;
      try {
        segment = decodeURIComponent(segment);
      } catch {
        // ignore
      }
      return encodeURIComponent(segment);
    })
    .join("/");

  url.pathname = encodedPathname;

  const result = url.toString();
  if (!isRelative) return result;

  // Strip dummy origin for relative URLs.
  return result.replace(dummyBase, "");
}
