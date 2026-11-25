import { describe, expect, it } from "vitest";

import {
  formatServicePriceUsd,
  homepageServicesConfiguration,
  homepageServicesSectionCopyConfiguration,
} from "@/app/config/homepageServicesConfiguration";
import { findRetiredClaims } from "@/app/config/retiredClaimPatterns";

/** Snapshot of https://contra.com/ashwani_arya/services read on 25 Nov 2026 IST (service data in the page). */
const verifiedContraServices = [
  ["Paid trial day", 440, "https://contra.com/s/eL2XMAg7-paid-trial-day", ["React"]],
  ["Live video and real-time UI", 2200, "https://contra.com/s/sWNrMEL6-live-video-and-real-time-ui", ["React"]],
  ["AI agent / LLM pipeline build", 2200, "https://contra.com/s/oc3oAELR-ai-agent-llm-pipeline-build", ["LangGraph", "Python"]],
  [
    "Frontend-heavy full-stack build (React / Next.js + Node/FastAPI)",
    4400,
    "https://contra.com/s/PvklZRQE-frontend-heavy-full-stack-build-react-nextjs-nodefast-api",
    ["Next.js"],
  ],
  [
    "AI agent and LLM pipeline builds",
    3000,
    "https://contra.com/s/oNqvlEZo-ai-agent-and-llm-pipeline-builds",
    ["FastAPI", "LangChain", "Next.js", "OpenAI", "Python", "Redis", "AI Agent Developer", "Artificial Intelligence"],
  ],
  [
    "SaaS MVP build, from idea to production",
    4800,
    "https://contra.com/s/WbMUlWqX-saa-s-mvp-build-from-idea-to-production",
    ["FastAPI", "Next.js", "Node.js", "PostgreSQL", "Prisma", "React", "Stripe"],
  ],
  [
    "React, Next.js and TypeScript dashboards",
    1800,
    "https://contra.com/s/g7AQFmkF-react-nextjs-and-type-script-dashboards",
    ["Next.js", "React", "Storybook", "Tailwind CSS", "TypeScript", "Frontend Engineer"],
  ],
] as const;

describe("homepageServicesConfiguration", () => {
  it("lists the 7 Contra services exactly: title, price, URL and tags, in Contra's order", () => {
    expect(homepageServicesConfiguration).toHaveLength(7);
    homepageServicesConfiguration.forEach((service, index) => {
      const [title, priceUsd, contraUrl, tags] = verifiedContraServices[index];
      expect(service.title).toBe(title);
      expect(service.priceUsd).toBe(priceUsd);
      expect(service.contraUrl).toBe(contraUrl);
      expect(service.tags).toEqual(tags);
    });
  });

  it("uses unique keys and Contra service URLs", () => {
    const keys = homepageServicesConfiguration.map((service) => service.serviceKey);
    expect(new Set(keys).size).toBe(keys.length);
    for (const service of homepageServicesConfiguration) {
      expect(service.contraUrl).toMatch(/^https:\/\/contra\.com\/s\/[A-Za-z0-9]+-[a-z0-9-]+$/);
    }
  });

  it("formats prices the way Contra shows them", () => {
    expect(formatServicePriceUsd(440)).toBe("$440");
    expect(formatServicePriceUsd(2200)).toBe("$2,200");
  });

  it("keeps the copy I wrote free of em and en dashes and of retired claims", () => {
    const writtenCopy = JSON.stringify(homepageServicesSectionCopyConfiguration);
    expect(writtenCopy).not.toMatch(/[\u2013\u2014]/);
    expect(findRetiredClaims(writtenCopy)).toEqual([]);
    expect(findRetiredClaims(JSON.stringify(homepageServicesConfiguration))).toEqual([]);
    expect(homepageServicesSectionCopyConfiguration.sectionIntroLines.join(" ")).toMatch(/product engineer and builder/);
  });

  it("pins the privacy and required-fields lines shown in the inquiry dialog", () => {
    expect(homepageServicesSectionCopyConfiguration.customApplication.privacyLine).toBe(
      "Your message goes to my inbox by email. I use it only to reply to you.",
    );
    expect(homepageServicesSectionCopyConfiguration.customApplication.requiredFieldsLine).toBe("All fields are required.");
  });
});

