import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { HomepageHeroProfileImage } from "./HomepageHeroProfileImage";

describe("HomepageHeroProfileImage", () => {
  it("renders picture with WebP source and PNG fallback including dimensions and alt", () => {
    const html = renderToStaticMarkup(<HomepageHeroProfileImage />);

    expect(html).toContain("<picture>");
    expect(html).toContain('type="image/webp"');
    expect(html).toContain('srcSet="/images/homepage-profile.webp"');
    expect(html).toContain('src="/images/homepage-profile.png"');
    expect(html).toContain('alt="Arya profile portrait"');
    expect(html).toContain('width="160"');
    expect(html).toContain('height="160"');
  });
});
