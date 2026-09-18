import type { MetadataRoute } from "next";

const canonicalSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export default function robots(): MetadataRoute.Robots {
  const siteOrigin = canonicalSiteUrl?.endsWith("/")
    ? canonicalSiteUrl.slice(0, -1)
    : canonicalSiteUrl;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/design-system"],
    },
    ...(siteOrigin
      ? { sitemap: `${siteOrigin}/sitemap.xml`, host: siteOrigin }
      : {}),
  };
}
