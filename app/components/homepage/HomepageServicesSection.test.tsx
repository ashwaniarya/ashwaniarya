import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { homepageServicesConfiguration } from "@/app/config/homepageServicesConfiguration";

import { HomepageServicesSection } from "./HomepageServicesSection";

const markup = renderToStaticMarkup(<HomepageServicesSection />);
const count = (needle: string) => markup.split(needle).length - 1;

describe("HomepageServicesSection", () => {
  it("renders 8 cards (7 Contra services plus Custom application) in both carousel layouts", () => {
    expect(count('data-test="outcomes-carousel-card"')).toBe(16);
    expect(markup).toContain('data-layout="compact" data-page-size="4" data-page-count="2"');
    expect(markup).toContain('data-layout="wide" data-page-size="6" data-page-count="2"');
    expect(markup).toContain("Next page of services");
  });

  it("links every service to its own Contra page in a new tab with rel noopener", () => {
    for (const service of homepageServicesConfiguration) {
      expect(count(`href="${service.contraUrl}" target="_blank" rel="noopener noreferrer"`)).toBe(2);
    }
    expect(count('data-test="service-book-link"')).toBe(14);
  });

  it("shows exact Contra titles and prices, and a Custom application button that opens a dialog", () => {
    expect(markup).toContain("Frontend-heavy full-stack build (React / Next.js + Node/FastAPI)");
    expect(markup).toContain("$4,800");
    expect(count('data-test="custom-application-open"')).toBe(2);
    expect(markup).toContain('aria-haspopup="dialog"');
    expect(markup).toContain('name="company_website"');
  });

  it("renders one inquiry dialog with the privacy and required-fields lines, and names hidden tags for screen readers", () => {
    expect(count("<dialog")).toBe(1);
    expect(markup).toContain("Your message goes to my inbox by email. I use it only to reply to you.");
    expect(markup).toContain("All fields are required.");
    expect(markup).not.toMatch(/Resend/);
    expect(markup).toContain("more tags: OpenAI, Python, Redis, AI Agent Developer, Artificial Intelligence");
    expect(markup).toContain('aria-label="Service cards"');
  });
});

