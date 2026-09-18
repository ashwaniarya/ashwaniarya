import { ImageResponse } from "next/og";

import { siteIdentityConfiguration } from "@/app/config/siteConfiguration";

export const alt = siteIdentityConfiguration.homepageTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const shareCardPalette = {
  backgroundPage: "#0a0c18",
  surfaceMuted: "#0f1424",
  textPrimary: "#f1f5f9",
  textSecondary: "#94a3b8",
  accentPrimary: "#a78bfa",
  accentSecondary: "#38bdf8",
  accentHighlight: "#e879f9",
  borderDefault: "#334155",
} as const;

const highlightedCapabilities = [
  "React",
  "Next.js",
  "Three.js",
  "GSAP",
  "TypeScript",
];

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: shareCardPalette.backgroundPage,
          padding: "72px 80px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -260,
            right: -160,
            width: 620,
            height: 620,
            borderRadius: 999,
            background: `radial-gradient(circle, ${shareCardPalette.accentPrimary}33 0%, ${shareCardPalette.backgroundPage}00 70%)`,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -280,
            left: -180,
            width: 640,
            height: 640,
            borderRadius: 999,
            background: `radial-gradient(circle, ${shareCardPalette.accentSecondary}2b 0%, ${shareCardPalette.backgroundPage}00 70%)`,
            display: "flex",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 26,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: shareCardPalette.accentHighlight,
              fontWeight: 600,
            }}
          >
            <div
              style={{
                width: 46,
                height: 4,
                borderRadius: 4,
                background: shareCardPalette.accentHighlight,
                display: "flex",
              }}
            />
            Design Engineer
          </div>

          <div
            style={{
              fontSize: 92,
              fontWeight: 800,
              color: shareCardPalette.textPrimary,
              letterSpacing: -2,
              lineHeight: 1.05,
              display: "flex",
            }}
          >
            {siteIdentityConfiguration.ownerName}
          </div>

          <div
            style={{
              fontSize: 34,
              lineHeight: 1.4,
              color: shareCardPalette.textSecondary,
              maxWidth: 900,
              display: "flex",
            }}
          >
            Polished product UI, motion and 3D, shipped end to end. Three-time
            founding engineer.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `2px solid ${shareCardPalette.borderDefault}`,
            paddingTop: 34,
          }}
        >
          <div style={{ display: "flex", gap: 14 }}>
            {highlightedCapabilities.map((capability) => (
              <div
                key={capability}
                style={{
                  display: "flex",
                  fontSize: 24,
                  color: shareCardPalette.textPrimary,
                  background: shareCardPalette.surfaceMuted,
                  border: `2px solid ${shareCardPalette.borderDefault}`,
                  borderRadius: 999,
                  padding: "10px 22px",
                }}
              >
                {capability}
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: shareCardPalette.accentSecondary,
              fontWeight: 600,
            }}
          >
            Remote from Bangalore
          </div>
        </div>
      </div>
    ),
    size,
  );
}
