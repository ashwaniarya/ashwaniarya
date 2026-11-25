import { readFileSync } from "node:fs";
import { join } from "node:path";

import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { HeroSection } from "@/app/components/homepage/HeroSection";
import { HomepageContactSection } from "@/app/components/homepage/HomepageContactSection";
import { HomepageProductionProofSection } from "@/app/components/homepage/HomepageProductionProofSection";
import { HomepageSelectedWorkSection } from "@/app/components/homepage/HomepageSelectedWorkSection";
import { HomepageServicesSection } from "@/app/components/homepage/HomepageServicesSection";
import { HomepageTechnologyStackSection } from "@/app/components/homepage/HomepageTechnologyStackSection";
import { ServiceInquiryDialogProvider } from "@/app/components/homepage/ServiceInquiryDialog";
import { microIconBehaviours, microIconComponents, microIconNames } from "@/app/components/icons/MicroIcons";

const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
const microCss = css.slice(css.indexOf("/*\n * Micro icons"));
const motionBlockStart = microCss.indexOf("@media (prefers-reduced-motion: no-preference)");
const keyframesStart = microCss.indexOf("@keyframes");
const motionBlock = microCss.slice(motionBlockStart, keyframesStart);

function svgOf(markup: string) {
  const match = markup.match(/^<svg ([^>]*)>/);
  expect(match).not.toBeNull();
  return match![1];
}

describe("micro icons", () => {
  it.each(microIconNames)("%s renders a decorative currentColor SVG with an animated part", (name) => {
    const Icon = microIconComponents[name];
    const markup = renderToStaticMarkup(<Icon className="h-4 w-4" />);
    const attributes = svgOf(markup);
    expect(attributes).toContain('aria-hidden="true"');
    expect(attributes).toContain('focusable="false"');
    expect(attributes).toContain('stroke="currentColor"');
    expect(attributes).toContain(`class="micro-icon micro-icon-${name} h-4 w-4"`);
    expect(attributes).toContain(`data-micro-icon="${name}"`);
    expect(attributes).toContain('data-trigger="hover"');
    expect(markup).not.toMatch(/<title|role=/);
    expect(markup).toContain('class="mi-part');
    expect(renderToStaticMarkup(<Icon trigger="view" />)).toContain('data-trigger="view"');
  });

  it("gives every icon its own keyframes, used only under prefers-reduced-motion: no-preference", () => {
    const animationsOutsideMotionBlock = (microCss.slice(0, motionBlockStart) + microCss.slice(keyframesStart)).match(
      /animation:\s*mi-/g,
    );
    expect(animationsOutsideMotionBlock).toBeNull();
    const keyframesByIcon = microIconNames.map((name) => {
      const Icon = microIconComponents[name];
      const parts = renderToStaticMarkup(<Icon />);
      const partClass = parts.match(/class="mi-part (mi-[a-z-]+)/)![1];
      const rule = motionBlock.match(new RegExp(`\\.${partClass} \\{[^}]*animation: (mi-[a-z-]+) `));
      expect(rule, `${name} has an animation rule`).not.toBeNull();
      expect(microCss).toContain(`@keyframes ${rule![1]} `);
      return rule![1];
    });
    expect(new Set(keyframesByIcon).size).toBe(microIconNames.length);
    expect(new Set(Object.values(microIconBehaviours)).size).toBe(microIconNames.length);
  });

  it("stops all icon motion under prefers-reduced-motion: reduce", () => {
    expect(microCss).toMatch(
      /@media \(prefers-reduced-motion: reduce\) \{\s*\.micro-icon,\s*\.micro-icon \* \{\s*animation: none !important;\s*transition: none !important;/,
    );
  });

  it("plays hover icons from links, buttons and marked rows (not disabled arrows), and view icons once the section is shown", () => {
    expect(motionBlock).toContain(
      ':where(a, button, [data-micro-trigger]):not([aria-disabled="true"], :disabled):is(:hover, :focus-visible, :focus-within) .micro-icon[data-trigger="hover"]',
    );
    expect(motionBlock).toContain('[data-scroll-highlight="shown"] .micro-icon[data-trigger="view"]');
  });

  const placements: Array<[string, () => React.ReactElement, Array<[string, "hover" | "view"]>]> = [
    ["Hero", () => <HeroSection />, [["eye", "hover"]]],
    ["Selected work", () => <HomepageSelectedWorkSection />, [["code", "view"], ["arrow-right", "hover"], ["chevron-left", "hover"], ["chevron-right", "hover"]]],
    ["Outcomes achieved", () => <HomepageProductionProofSection />, [["chart", "view"], ["chevron-right", "hover"]]],
    [
      "Services",
      () => (
        <ServiceInquiryDialogProvider>
          <HomepageServicesSection />
        </ServiceInquiryDialogProvider>
      ),
      [["gear", "view"], ["arrow-up-right", "hover"], ["sparkle", "hover"], ["close", "hover"], ["send", "hover"]],
    ],
    ["Technology stack", () => <HomepageTechnologyStackSection />, [["bolt", "view"]]],
    ["Contact", () => <HomepageContactSection />, [["chat", "view"], ["mail", "hover"], ["phone", "hover"], ["pin", "hover"]]],
  ];

  it.each(placements)("%s places its icons with the right trigger", (_name, render, expected) => {
    const markup = renderToStaticMarkup(render());
    for (const [icon, trigger] of expected) {
      expect(markup).toContain(`data-micro-icon="${icon}" data-trigger="${trigger}"`);
    }
  });

  it("keeps heading text intact next to the heading icon", () => {
    const markup = renderToStaticMarkup(<HomepageProductionProofSection />);
    expect(markup).toMatch(/id="homepage-outcomes-achieved-heading"><svg [^>]*data-micro-icon="chart"[^>]*>.*?<\/svg>Outcomes achieved<\/h2>/);
  });

  it("marks contact rows and Selected work cards as hover triggers", () => {
    expect(renderToStaticMarkup(<HomepageContactSection />)).toMatch(/<li data-micro-trigger="true"/);
    expect(renderToStaticMarkup(<HomepageSelectedWorkSection />)).toContain('data-micro-trigger="true" data-test="selected-work-card"');
  });
});
