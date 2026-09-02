import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

interface BuildMetadataOptions {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
}

export function buildTitle(title: string): string {
  return `${title} | ${siteConfig.name}`;
}

export function buildDescription(description: string): string {
  return description.trim();
}

export function buildCanonicalUrl(path = "/"): string {
  const normalizedPath = path.startsWith("/")
    ? path
    : `/${path}`;

  return new URL(
    normalizedPath,
    siteConfig.url,
  ).toString();
}

export function buildMetadata({
  title,
  description,
  path = "/",
  keywords,
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  const canonical = buildCanonicalUrl(path);

  return {
    title: buildTitle(title),
    description: buildDescription(description),

    ...(keywords && keywords.length > 0
      ? { keywords }
      : {}),

    alternates: {
      canonical,
    },

    robots: noIndex
      ? {
          index: false,
          follow: true,
        }
      : {
          index: true,
          follow: true,
        },

    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: canonical,
      siteName: siteConfig.name,
      title: buildTitle(title),
      description: buildDescription(description),
    },

    twitter: {
      card: "summary_large_image",
      title: buildTitle(title),
      description: buildDescription(description),
    },
  };
}