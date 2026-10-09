import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { getAllSelectedWork } from "@/app/config/portfolioSelectedWorkConfiguration";

import { SelectedWorkTilePreview } from "./SelectedWorkTilePreview";

describe("SelectedWorkTilePreview", () => {
  it("renders a monospace code panel for code previews", () => {
    const postgresMcpWork = getAllSelectedWork().find((work) => work.slug === "postgres-mcp")!;
    expect(postgresMcpWork.tilePreview.previewKind).toBe("code");

    const renderedMarkup = renderToStaticMarkup(
      <SelectedWorkTilePreview tilePreview={postgresMcpWork.tilePreview} />,
    );

    expect(renderedMarkup).toContain("postgres-mcp");
    expect(renderedMarkup).toContain('role="img"');
    expect(renderedMarkup).not.toContain("<img");
  });

  it("renders optimized raster assets for screenshot previews", () => {
    const automixWork = getAllSelectedWork().find((work) => work.slug === "automixpilot")!;
    const renderedMarkup = renderToStaticMarkup(
      <SelectedWorkTilePreview tilePreview={automixWork.tilePreview} />,
    );

    expect(renderedMarkup).toContain("/images/work/automixpilot.webp");
    expect(renderedMarkup).toContain("/images/work/automixpilot.png");
  });
});
