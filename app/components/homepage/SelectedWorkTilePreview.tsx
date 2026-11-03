import Image from "next/image";

import type { SelectedWorkTilePreviewConfiguration } from "@/app/config/portfolioSelectedWorkConfiguration";
import { homepageSelectedWorkSectionPolicy } from "@/app/constants/policy";

export type SelectedWorkTilePreviewProps = Readonly<{
  tilePreview: SelectedWorkTilePreviewConfiguration;
}>;

/**
 * Renders the visual header for a selected-work card: optimized screenshot or a
 * monospace code-style panel when no public capture exists.
 */
export function SelectedWorkTilePreview({ tilePreview }: SelectedWorkTilePreviewProps) {
  if (tilePreview.previewKind === "code") {
    return (
      <figure className={homepageSelectedWorkSectionPolicy.tileFigureClassName}>
        <div
          className={homepageSelectedWorkSectionPolicy.tileCodePreviewPanelClassName}
          role="img"
          aria-label={tilePreview.accessibilityLabel}
        >
          <pre className={homepageSelectedWorkSectionPolicy.tileCodePreviewPreClassName}>
            <code>{tilePreview.codeLines.join("\n")}</code>
          </pre>
        </div>
      </figure>
    );
  }

  const { webpSrc, pngSrc, alt, width, height } = tilePreview;

  return (
    <figure className={homepageSelectedWorkSectionPolicy.tileFigureClassName}>
      <picture>
        <source srcSet={webpSrc} type="image/webp" />
        <Image
          src={pngSrc}
          alt={alt}
          width={width}
          height={height}
          sizes={homepageSelectedWorkSectionPolicy.tileImageSizes}
          className={homepageSelectedWorkSectionPolicy.tileImageClassName}
          unoptimized
        />
      </picture>
    </figure>
  );
}
