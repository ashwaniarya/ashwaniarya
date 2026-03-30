import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { CaseStudyProductChapterIllustration } from "./CaseStudyProductChapterIllustration";

const testIllustration = {
  webpSrc: "/chrome_assistant.webp",
  pngSrc: "/chrome_assistant.png",
  alt: "Test shopping assistant screenshot alt text.",
  width: 1280,
  height: 800,
} as const;

describe("CaseStudyProductChapterIllustration", () => {
  it("renders picture with WebP source and PNG fallback img including alt", () => {
    const html = renderToStaticMarkup(
      <CaseStudyProductChapterIllustration illustration={testIllustration} />,
    );

    expect(html).toContain("<figure");
    expect(html).toContain("<picture>");
    expect(html).toContain('type="image/webp"');
    expect(html).toContain('srcSet="/chrome_assistant.webp"');
    expect(html).toContain('src="/chrome_assistant.png"');
    expect(html).toContain('alt="Test shopping assistant screenshot alt text."');
    expect(html).toContain('width="1280"');
    expect(html).toContain('height="800"');
  });
});
