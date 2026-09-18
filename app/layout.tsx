import type { Metadata } from "next";
import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import { SiteFooter } from "@/app/components/layout/SiteFooter";
import { SiteHeader } from "@/app/components/layout/SiteHeader";
import { SceneCanvasMount } from "@/app/components/three/SceneCanvasMount";
import { StructuredData } from "@/app/components/seo/StructuredData";
import { SceneProvider } from "@/app/components/three/SceneProvider";
import { siteIdentityConfiguration } from "@/app/config/siteConfiguration";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const canonicalSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  ...(canonicalSiteUrl
    ? {
        metadataBase: new URL(
          canonicalSiteUrl.endsWith("/")
            ? canonicalSiteUrl.slice(0, -1)
            : canonicalSiteUrl,
        ),
      }
    : {}),
  title: {
    default: siteIdentityConfiguration.homepageTitle,
    template: `%s | ${siteIdentityConfiguration.siteName}`,
  },
  description: siteIdentityConfiguration.homepageDescription,
  applicationName: siteIdentityConfiguration.siteName,
  authors: [{ name: siteIdentityConfiguration.ownerName }],
  creator: siteIdentityConfiguration.ownerName,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: siteIdentityConfiguration.siteName,
    title: siteIdentityConfiguration.homepageTitle,
    description: siteIdentityConfiguration.homepageDescription,
    locale: "en_US",
    ...(canonicalSiteUrl ? { url: "/" } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: siteIdentityConfiguration.homepageTitle,
    description: siteIdentityConfiguration.homepageDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData canonicalSiteUrl={canonicalSiteUrl} />
      </head>
      <body
        className={[
          plusJakartaSans.variable,
          geistMono.variable,
          "antialiased",
          "min-h-dvh text-textPrimary",
        ].join(" ")}
      >
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-71D4ZMWTJR" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-71D4ZMWTJR');
          `}
        </Script>
        <SceneProvider>
          <SceneCanvasMount />
          <div className="flex min-h-dvh flex-col">
            <SiteHeader />
            <div className="flex min-h-0 flex-1 flex-col">{children}</div>
            <SiteFooter />
          </div>
        </SceneProvider>
      </body>
    </html>
  );
}
