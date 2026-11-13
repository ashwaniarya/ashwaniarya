import type { MetadataRoute } from "next";

import { siteOriginUrl as siteOrigin } from "@/app/config/siteConfiguration";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/design-system"],
    },
    sitemap: `${siteOrigin}/sitemap.xml`,
    host: siteOrigin,
  };
}
