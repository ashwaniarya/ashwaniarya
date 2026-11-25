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
/** Static markup escapes "&" inside arbitrary Tailwind variants. */
const asMarkup = (className: string) => className.replaceAll("&", "&amp;");

describe("HomepageProductionProofSection", () => {
  it("labels the section for assistive technology and end-to-end selectors", () => {
    expect(renderedMarkup).toContain('data-test="homepage-production-proof-section"');
    expect(renderedMarkup).toContain('aria-labelledby="homepage-outcomes-achieved-heading"');
    expect(renderedMarkup).toContain('id="homepage-outcomes-achieved-heading"');
  });

  it("renders the section heading and intro copy", () => {
    expect(renderedMarkup).toContain(homepageProductionProofSectionCopyConfiguration.sectionHeading);
    for (const introLine of homepageProductionProofSectionCopyConfiguration.sectionIntroLines) {
      expect(renderedMarkup).toContain(introLine);
    }
  });

  it("renders each configured metric once per layout (compact and wide)", () => {
    const listItemCount = renderedMarkup.split("<li").length - 1;
    expect(listItemCount).toBe(homepageProductionProofMetricsConfiguration.length * 2);
  });

  it("renders labelled, keyboard-focusable carousels with arrow and dot controls", () => {
    expect(renderedMarkup).toContain('aria-roledescription="carousel"');
    expect(renderedMarkup).toContain(
      `aria-label="${homepageProductionProofSectionCopyConfiguration.carouselLabel}"`,
    );
    expect(renderedMarkup).toContain('tabindex="0"');
    expect(renderedMarkup).toContain('aria-label="Previous page of outcomes"');
    expect(renderedMarkup).toContain('aria-label="Next page of outcomes"');
    expect(renderedMarkup).toContain('aria-label="Go to page 2 of 2"');
    expect(renderedMarkup).toContain('aria-live="polite"');
  });

  it("pages eight cards as two 2x2 pages below lg and two 3x2 pages at lg", () => {
    expect(homepageProductionProofMetricsConfiguration).toHaveLength(8);
    expect(renderedMarkup).toContain(
      'class="lg:hidden" data-test="outcomes-carousel" data-layout="compact" data-page-size="4" data-page-count="2"',
    );
    expect(renderedMarkup).toContain(
      'class="hidden lg:block" data-test="outcomes-carousel" data-layout="wide" data-page-size="6" data-page-count="2"',
    );
    expect(renderedMarkup.split('data-test="outcomes-carousel-page"').length - 1).toBe(4);
    expect(renderedMarkup.split('data-test="outcomes-carousel-controls"').length - 1).toBe(2);
    expect(renderedMarkup.split('data-test="outcomes-carousel-dot"').length - 1).toBe(4);
  });

  it("renders every metric label, value and context line", () => {
    for (const metric of homepageProductionProofMetricsConfiguration) {
      expect(renderedMarkup).toContain(metric.metricLabel);
      expect(renderedMarkup).toContain(metric.contextLine);
    }
  });

  it("does not render internal source references", () => {
    for (const metric of homepageProductionProofMetricsConfiguration) {
      if (metric.sourceReference.includes("/workspace")) {
        expect(renderedMarkup).not.toContain(metric.sourceReference);
      }
    }
  });

  it("wires the presentation policy classes rather than inline strings", () => {
    expect(renderedMarkup).toContain(asMarkup(homepageProductionProofSectionPolicy.carouselScrollerClassName));
    expect(renderedMarkup).toContain(asMarkup(homepageProductionProofSectionPolicy.carouselPageClassName));
    expect(renderedMarkup).toContain(homepageProductionProofSectionPolicy.metricLabelClassName);
    expect(renderedMarkup).toContain(homepageProductionProofSectionPolicy.metricValueClassName);
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
