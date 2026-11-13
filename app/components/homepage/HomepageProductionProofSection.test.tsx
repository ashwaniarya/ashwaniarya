import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  homepageProductionProofMetricsConfiguration,
  homepageProductionProofSectionCopyConfiguration,
} from "@/app/config/homepageProductionProofConfiguration";
import {
  homepageProductionProofSectionPolicy,
  homepageScrollHighlightPolicy,
} from "@/app/constants/policy";

import { HomepageProductionProofSection } from "./HomepageProductionProofSection";

const renderedMarkup = renderToStaticMarkup(<HomepageProductionProofSection />);

describe("HomepageProductionProofSection", () => {
  it("labels the section for assistive technology and end-to-end selectors", () => {
    expect(renderedMarkup).toContain('data-test="homepage-production-proof-section"');
    expect(renderedMarkup).toContain('aria-labelledby="homepage-production-proof-heading"');
    expect(renderedMarkup).toContain('id="homepage-production-proof-heading"');
  });

  it("renders the section heading and intro copy", () => {
    expect(renderedMarkup).toContain(
      homepageProductionProofSectionCopyConfiguration.sectionHeading,
    );
    for (const introLine of homepageProductionProofSectionCopyConfiguration.sectionIntroLines) {
      expect(renderedMarkup).toContain(introLine);
    }
  });

  it("renders one tile per configured metric", () => {
    const listItemCount = renderedMarkup.split("<li").length - 1;
    expect(listItemCount).toBe(homepageProductionProofMetricsConfiguration.length);
  });

  it("renders every metric label, value and context line", () => {
    for (const metric of homepageProductionProofMetricsConfiguration) {
      expect(renderedMarkup).toContain(metric.metricLabel);
      expect(renderedMarkup).toContain(metric.contextLine);
    }
  });

  it("wires the presentation policy classes rather than inline strings", () => {
    expect(renderedMarkup).toContain(
      homepageProductionProofSectionPolicy.metricCardsListClassName,
    );
    expect(renderedMarkup).toContain(
      homepageProductionProofSectionPolicy.metricLabelClassName,
    );
    expect(renderedMarkup).toContain(
      homepageProductionProofSectionPolicy.metricValueClassName,
    );
  });

  it("ships the scroll highlight hooks without a hidden state in server markup", () => {
    expect(renderedMarkup).not.toContain("data-scroll-highlight");
    expect(renderedMarkup).toContain(homepageScrollHighlightPolicy.accentBarClassName);
    expect(renderedMarkup).toContain(homepageScrollHighlightPolicy.headingClassName);
    expect(renderedMarkup).toContain(homepageScrollHighlightPolicy.keyFigureClassName);
    expect(renderedMarkup).toContain(homepageScrollHighlightPolicy.staggerItemClassName);
    expect(renderedMarkup).toContain("transition-delay:240ms");
  });
});
