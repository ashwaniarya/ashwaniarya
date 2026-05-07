import type { Metadata } from "next";
import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { SiteFooter } from "@/app/components/layout/SiteFooter";
import { SiteHeader } from "@/app/components/layout/SiteHeader";
import { siteIdentityConfiguration } from "@/app/config/siteConfiguration";
import { skipToContentPolicy } from "@/app/constants/policy";

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
    default: siteIdentityConfiguration.siteName,
    template: `%s | ${siteIdentityConfiguration.siteName}`,
  },
  description: siteIdentityConfiguration.siteDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={[
          plusJakartaSans.variable,
          geistMono.variable,
          "antialiased",
          "min-h-dvh bg-backgroundPage text-textPrimary",
        ].join(" ")}
      >
        <a href="#main-content" className={skipToContentPolicy.skipLinkClassName}>
          Skip to main content
        </a>
        <div className="flex min-h-dvh flex-col">
          <SiteHeader />
          <div className="flex min-h-0 flex-1 flex-col">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
