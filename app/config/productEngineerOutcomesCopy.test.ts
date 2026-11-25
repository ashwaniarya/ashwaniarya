import { describe, expect, it } from "vitest";

import { homepageAboutMeCopyConfiguration, homepageHeroCopyConfiguration } from "@/app/config/homepageConfiguration";
import { homepageWorkHistoryConfiguration } from "@/app/config/homepageWorkHistoryConfiguration";
import { getCaseStudyBySlug } from "@/app/config/portfolioCaseStudiesConfiguration";
import { findRetiredClaims } from "@/app/config/retiredClaimPatterns";

const positioningLine =
  "I take ambiguous business problems, ship the first version fast, and iterate to maximise outcomes.";

const roleText = (roleKey: string) =>
  homepageWorkHistoryConfiguration.find((role) => role.roleKey === roleKey)!.detailLines.join(" ");
const caseStudyText = (slug: string) => getCaseStudyBySlug(slug)!.engagementOverviewParagraphs.join(" ");

describe("product engineer positioning and outcomes (confirmed facts relayed by Head, 25 Nov 2026)", () => {
  it("uses the approved positioning line in About, keeping the hero at two lines", () => {
    expect(homepageAboutMeCopyConfiguration.paragraphs[0]).toContain(positioningLine);
    expect(homepageHeroCopyConfiguration.descriptionLines).toHaveLength(2);
  });

  it("frames getbujo with the confirmed outcomes in the timeline and the case study", () => {
    for (const text of [roleText("getbujo"), caseStudyText("getbujo")]) {
      expect(text).toMatch(/built the platform end to end/i);
      expect(text).toContain("24s to 6s");
      expect(text).toMatch(/global UI with clear join states/);
      expect(text).toMatch(/per-call sentiment score/);
      expect(text).toMatch(/AWS EC2 to Railway/);
      expect(text).toContain("100K to 150K sessions, with 4K to 5K opens");
    }
  });

  it("frames AIClicks with the confirmed outcomes in the timeline and the case study", () => {
    for (const text of [roleText("aiclicks"), caseStudyText("aiclicks")]) {
      expect(text).toMatch(/sole contractor on (the|its) product surfaces/i);
      expect(text).toContain("90% to 98% across 6 platforms");
      expect(text).toMatch(/scheduled worker pulling posts from 6 platforms/);
      expect(text).toMatch(/Stripe PaymentIntents and Invoices with an idempotent ledger/);
    }
  });

  it("keeps the decided role titles", () => {
    expect(homepageWorkHistoryConfiguration.find((r) => r.roleKey === "getbujo")!.title).toBe("Founding Engineer");
    expect(homepageWorkHistoryConfiguration.find((r) => r.roleKey === "aiclicks")!.title).toBe(
      "Founding Engineer, Full Stack",
    );
  });

  it("guards catch every excluded claim", () => {
    for (const claim of [
      "80 agents",
      "30K chats/mo",
      "$20K MRR",
      "WebSocket in 4 days",
      "950 commits",
      "5s join",
      "$150K ARR",
      "100K/day sessions",
      "99%",
      "30,000 chats",
      "950+ commits",
      "a four-day WebSocket migration",
      "$20K monthly",
      "30K+ chats per month.",
      "950 + commits.",
      "$20,000/month",
      "20K/mo.",
      "30K per month",
      "30K a month",
      "30 K chats",
      "30K+ conversations",
      "30K+ chats/mo",
      "$20K a month",
      "20K per month",
      "950-plus commits",
      "950 Git commits",
      "$150K\u00a0ARR",
      "80\u00a0agents",
      "WebSocket\u00a0in\u00a04\u00a0days",
      "30K\u202fchats/mo",
      "four\u2011day WebSocket",
      "4\u2013day WebSocket",
      "100K\u2013day",
      "100K\u2215day",
      "$0\u2013$150K",
    ]) {
      expect(findRetiredClaims(claim), claim).not.toEqual([]);
    }
  });

  it("guards do not trip on the confirmed numbers", () => {
    for (const fact of [
      "cut Zoom join time from 24s to 6s",
      "accuracy went from 90% to 98% across 6 platforms",
      "100K to 150K sessions, with 4K to 5K opens",
    ]) {
      expect(findRetiredClaims(fact), fact).toEqual([]);
    }
  });

  it("uses no em or en dashes in the new copy", () => {
    const text = [
      homepageAboutMeCopyConfiguration.paragraphs[0],
      roleText("getbujo"),
      roleText("aiclicks"),
      caseStudyText("getbujo"),
      caseStudyText("aiclicks"),
    ].join(" ");
    expect(text).not.toMatch(/[\u2013\u2014]/);
  });
});
