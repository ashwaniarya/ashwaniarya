import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  getAllSelectedWork,
  homepageSelectedWorkSectionCopyConfiguration,
} from "@/app/config/portfolioSelectedWorkConfiguration";

import { SelectedWorkTile } from "./SelectedWorkTile";

type RenderedAnchor = Readonly<{ anchorAttributes: string; anchorContent: string }>;

function collectRenderedAnchors(renderedMarkup: string): RenderedAnchor[] {
  return Array.from(
    renderedMarkup.matchAll(/<a\s([^>]*)>([\s\S]*?)<\/a>/g),
    ([, anchorAttributes, anchorContent]) => ({ anchorAttributes, anchorContent }),
  );
}

function findRenderedAnchorByHref(renderedAnchors: readonly RenderedAnchor[], href: string) {
  return renderedAnchors.find((renderedAnchor) => renderedAnchor.anchorAttributes.includes(`href="${href}"`));
}

const allSelectedWork = getAllSelectedWork();
const pulseboardWork = allSelectedWork.find((work) => work.slug === "pulseboard")!;
const liveOnlyWorkWithSource = allSelectedWork.find((work) => !work.caseStudyHref && work.sourceUrl)!;
const { caseStudyCueLabel, liveLinkLabel, sourceLinkLabel } = homepageSelectedWorkSectionCopyConfiguration;

describe("SelectedWorkTile", () => {
  describe("with a case study", () => {
    const renderedAnchors = collectRenderedAnchors(renderToStaticMarkup(<SelectedWorkTile work={pulseboardWork} />));

    it("opens the case study in the same tab and shows the cue", () => {
      const caseStudyCardAnchor = findRenderedAnchorByHref(renderedAnchors, "/work/pulseboard");

      expect(caseStudyCardAnchor).toBeDefined();
      expect(caseStudyCardAnchor!.anchorAttributes).not.toContain("target=");
      expect(caseStudyCardAnchor!.anchorContent).toContain(caseStudyCueLabel);
    });

    it("gives the live app and the source their own new-tab links", () => {
      const secondaryLinks = [
        { href: pulseboardWork.liveUrl, label: liveLinkLabel },
        { href: pulseboardWork.sourceUrl!, label: sourceLinkLabel },
      ];

      for (const { href, label } of secondaryLinks) {
        const secondaryAnchor = findRenderedAnchorByHref(renderedAnchors, href);
        expect(secondaryAnchor, href).toBeDefined();
        expect(secondaryAnchor!.anchorContent).toBe(label);
        expect(secondaryAnchor!.anchorAttributes).toContain('target="_blank"');
        expect(secondaryAnchor!.anchorAttributes).toContain('rel="noopener noreferrer"');
      }
    });
  });

  describe("with a case study and no source", () => {
    const renderedMarkup = renderToStaticMarkup(
      <SelectedWorkTile work={{ ...pulseboardWork, sourceUrl: undefined }} />,
    );
    const renderedAnchors = collectRenderedAnchors(renderedMarkup);

    it("renders the card and the live link, and no source link", () => {
      expect(renderedAnchors).toHaveLength(2);
      expect(findRenderedAnchorByHref(renderedAnchors, "/work/pulseboard")).toBeDefined();
      expect(findRenderedAnchorByHref(renderedAnchors, pulseboardWork.liveUrl)?.anchorContent).toBe(liveLinkLabel);
      expect(renderedMarkup).not.toContain(`>${sourceLinkLabel}<`);
    });
  });

  describe("without a case study", () => {
    const renderedMarkup = renderToStaticMarkup(<SelectedWorkTile work={liveOnlyWorkWithSource} />);
    const renderedAnchors = collectRenderedAnchors(renderedMarkup);

    it("opens the live app in a new tab and shows no case-study cue", () => {
      const liveCardAnchor = findRenderedAnchorByHref(renderedAnchors, liveOnlyWorkWithSource.liveUrl);

      expect(liveCardAnchor).toBeDefined();
      expect(liveCardAnchor!.anchorAttributes).toContain('target="_blank"');
      expect(renderedMarkup).not.toContain(caseStudyCueLabel);
    });

    it("renders only the card and the source link", () => {
      expect(renderedAnchors).toHaveLength(2);
      expect(findRenderedAnchorByHref(renderedAnchors, liveOnlyWorkWithSource.sourceUrl!)?.anchorContent).toBe(
        sourceLinkLabel,
      );
    });
  });
});
