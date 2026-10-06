import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  calculateBudgetUsagePercent,
  pulseboardCaseStudyConfiguration,
} from "@/app/config/portfolioPulseboardCaseStudyConfiguration";
import { primaryHomepageNavigationHref } from "@/app/config/siteConfiguration";

import { PulseboardCaseStudyPageContent } from "./PulseboardCaseStudyPageContent";

function escapeHtmlText(text: string) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#x27;");
}

const renderedMarkup = renderToStaticMarkup(<PulseboardCaseStudyPageContent />);
const renderedAnchors = Array.from(
  renderedMarkup.matchAll(/<a\s([^>]*)>([\s\S]*?)<\/a>/g),
  ([, anchorAttributes, anchorContent]) => ({ anchorAttributes, anchorContent }),
);

function findRenderedAnchorByHref(href: string) {
  return renderedAnchors.find((renderedAnchor) =>
    renderedAnchor.anchorAttributes.includes(`href="${escapeHtmlText(href)}"`),
  );
}

const { links, heroScreenshot, glance, architecture, designSystem, performance, failureModes, testing, limits } =
  pulseboardCaseStudyConfiguration;
const headerLinks = [links.primaryLink, ...links.secondaryLinks];

describe("PulseboardCaseStudyPageContent", () => {
  it("links back to the homepage work section in the same tab", () => {
    const backLinkAnchor = findRenderedAnchorByHref(primaryHomepageNavigationHref.work);

    expect(backLinkAnchor).toBeDefined();
    expect(backLinkAnchor!.anchorAttributes).not.toContain("target=");
  });

  it("renders every Pulseboard link as an anchor", () => {
    const expectedHrefs = [
      ...headerLinks.map((headerLink) => headerLink.href),
      ...architecture.decisionRecords.map((decisionRecord) => decisionRecord.href),
      performance.virtualizedTable.benchmarkHref,
      failureModes.demoHref,
    ];

    for (const expectedHref of expectedHrefs) {
      expect(findRenderedAnchorByHref(expectedHref), expectedHref).toBeDefined();
    }
  });

  it("labels every header link", () => {
    for (const headerLink of headerLinks) {
      expect(findRenderedAnchorByHref(headerLink.href)?.anchorContent, headerLink.href).toContain(
        escapeHtmlText(headerLink.label),
      );
    }
  });

  it("opens every outbound link in a new tab without an opener", () => {
    const outboundAnchors = renderedAnchors.filter((renderedAnchor) =>
      renderedAnchor.anchorAttributes.includes('href="http'),
    );

    expect(outboundAnchors.length).toBeGreaterThan(1);
    for (const { anchorAttributes } of outboundAnchors) {
      expect(anchorAttributes).toContain('target="_blank"');
      expect(anchorAttributes).toContain('rel="noopener noreferrer"');
    }
  });

  it("renders every glance metric", () => {
    for (const { metricLabel, valueLabel } of glance.metrics) {
      expect(renderedMarkup).toContain(`>${escapeHtmlText(valueLabel)}<`);
      expect(renderedMarkup).toContain(escapeHtmlText(metricLabel));
    }
  });

  it("renders one h1 and a heading-labelled section per topic", () => {
    const sections = [architecture, designSystem, performance, failureModes, testing, limits];

    expect(renderedMarkup.match(/<h1[\s>]/g)).toHaveLength(1);
    expect(renderedMarkup.match(/<h2[\s>]/g)).toHaveLength(sections.length);
    for (const { sectionTitle, sectionTitleId } of sections) {
      expect(renderedMarkup).toContain(`aria-labelledby="${sectionTitleId}"`);
      expect(renderedMarkup).toContain(`id="${sectionTitleId}"`);
      expect(renderedMarkup).toContain(escapeHtmlText(sectionTitle));
    }
  });

  it("draws each usage bar at its computed share of the budget", () => {
    const { virtualizedTable, bundleBudgets } = performance;
    const frameUsagePercent = calculateBudgetUsagePercent(
      virtualizedTable.p95FrameMilliseconds,
      virtualizedTable.frameBudgetMilliseconds,
    );

    expect(renderedMarkup).toContain(`>${frameUsagePercent}%<`);
    expect(renderedMarkup).toContain(`width:${frameUsagePercent}%`);
    for (const { chunkLabel, usedKilobytes, budgetKilobytes } of bundleBudgets.budgets) {
      expect(renderedMarkup, chunkLabel).toContain(
        `width:${calculateBudgetUsagePercent(usedKilobytes, budgetKilobytes)}%`,
      );
    }
  });

  it("loads the hero screenshot eagerly, webp first", () => {
    const heroImageTag = renderedMarkup.match(/<img\s[^>]*>/)?.[0] ?? "";

    expect(heroImageTag).toContain(`src="${heroScreenshot.pngSrc}"`);
    expect(heroImageTag).toContain('loading="eager"');
    expect(heroImageTag).toContain('fetchPriority="high"');
    expect(renderedMarkup).toContain(`srcSet="${heroScreenshot.webpSrc}"`);
  });

  it("renders every design-system rule, test tier and limit", () => {
    for (const { title, description } of [...designSystem.rules, ...testing.testTiers]) {
      expect(renderedMarkup).toContain(escapeHtmlText(title));
      expect(renderedMarkup).toContain(escapeHtmlText(description));
    }
    for (const { limitText } of limits.items) {
      expect(renderedMarkup).toContain(escapeHtmlText(limitText));
    }
  });
});
