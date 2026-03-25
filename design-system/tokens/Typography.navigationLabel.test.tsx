import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { NavigationLabel } from "@/design-system/tokens/Typography";

describe("NavigationLabel", () => {
  it("emits nav label classes including uppercase and text-inherit", () => {
    const html = renderToStaticMarkup(<NavigationLabel>Home</NavigationLabel>);
    expect(html).toContain("uppercase");
    expect(html).toContain("text-inherit");
    expect(html).toContain("tracking-[0.12em]");
    expect(html).toContain("Home");
  });
});
