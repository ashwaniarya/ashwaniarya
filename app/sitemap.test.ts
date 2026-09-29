import { afterEach, describe, expect, it, vi } from "vitest";

import type * as SelectedWorkConfigurationModule from "@/app/config/portfolioSelectedWorkConfiguration";

const selectedWorkConfigurationModulePath = "@/app/config/portfolioSelectedWorkConfiguration";

async function loadSitemapWithSiteUrl(siteUrl: string) {
  vi.stubEnv("NEXT_PUBLIC_SITE_URL", siteUrl);
  vi.resetModules();
  const { default: sitemap } = await import("@/app/sitemap");
  return sitemap();
}

describe("sitemap", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.doUnmock(selectedWorkConfigurationModulePath);
  });

  it("lists the homepage and every case-study page exactly once", async () => {
    const sitemapUrls = (await loadSitemapWithSiteUrl("https://example.com/")).map(
      (sitemapEntry) => sitemapEntry.url,
    );

    expect(sitemapUrls).toEqual(
      expect.arrayContaining([
        "https://example.com",
        "https://example.com/work/getbujo",
        "https://example.com/work/pulseboard",
      ]),
    );
    expect(new Set(sitemapUrls).size).toBe(sitemapUrls.length);
  });

  it("lists a path once when a selected-work case study repeats a case-study slug", async () => {
    vi.doMock(selectedWorkConfigurationModulePath, async (importOriginal) => {
      const originalModule = await importOriginal<typeof SelectedWorkConfigurationModule>();
      const [firstSelectedWork] = originalModule.getAllSelectedWork();
      return {
        ...originalModule,
        getAllSelectedWork: () => [{ ...firstSelectedWork, caseStudyHref: "/work/getbujo" }],
      };
    });

    const sitemapUrls = (await loadSitemapWithSiteUrl("https://example.com")).map(
      (sitemapEntry) => sitemapEntry.url,
    );

    expect(sitemapUrls.filter((sitemapUrl) => sitemapUrl === "https://example.com/work/getbujo")).toHaveLength(1);
  });

  it("returns no entries without a canonical site URL", async () => {
    expect(await loadSitemapWithSiteUrl("")).toEqual([]);
  });
});
