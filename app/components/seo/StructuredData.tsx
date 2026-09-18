import { siteIdentityConfiguration } from "@/app/config/siteConfiguration";

type StructuredDataProps = Readonly<{
  canonicalSiteUrl: string | undefined;
}>;

export function StructuredData({ canonicalSiteUrl }: StructuredDataProps) {
  if (!canonicalSiteUrl) {
    return null;
  }

  const siteOrigin = canonicalSiteUrl.endsWith("/")
    ? canonicalSiteUrl.slice(0, -1)
    : canonicalSiteUrl;

  const personSchema = {
    "@type": "Person",
    "@id": `${siteOrigin}/#person`,
    name: siteIdentityConfiguration.ownerName,
    url: siteOrigin,
    jobTitle: siteIdentityConfiguration.ownerJobTitle,
    description: siteIdentityConfiguration.homepageDescription,
    image: `${siteOrigin}/images/homepage-profile.webp`,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteIdentityConfiguration.ownerLocality,
      addressCountry: siteIdentityConfiguration.ownerCountry,
    },
    knowsAbout: [...siteIdentityConfiguration.expertiseAreas],
    sameAs: [...siteIdentityConfiguration.socialProfileUrls],
  };

  const websiteSchema = {
    "@type": "WebSite",
    "@id": `${siteOrigin}/#website`,
    url: siteOrigin,
    name: siteIdentityConfiguration.siteName,
    description: siteIdentityConfiguration.homepageDescription,
    inLanguage: "en",
    publisher: { "@id": `${siteOrigin}/#person` },
  };

  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [personSchema, websiteSchema],
  };

  // Escaping `<` keeps a stray "</script>" in any future config string from
  // closing this tag early; every value here is a build-time constant.
  const serializedStructuredData = JSON.stringify(structuredDataGraph).replace(
    /</g,
    "\\u003c",
  );

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializedStructuredData }}
    />
  );
}
