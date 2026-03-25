import { Card } from "@/app/components/content/Card";
import { PageLayout } from "@/app/components/layout/PageLayout";
import {
  designSystemColorTokens,
  designSystemRadiusTokens,
  designSystemShadowTokens,
  designSystemSpacingTokens,
  designSystemTypographyTokens,
} from "@/app/config/designSystemConfiguration";
import { BodyText, Heading } from "@/design-system/tokens/Typography";

function ColorSwatch({
  name,
  variable,
  tailwindClass,
}: Readonly<{ name: string; variable: string; tailwindClass: string }>) {
  const isDarkToken =
    name.includes("Text") || name.includes("Accent") || name.includes("Glow");
  return (
    <div className="flex flex-col gap-2">
      <div
        className={`flex h-16 items-center justify-center rounded-md border border-borderDefault ${tailwindClass}`}
      >
        <span
          className={`text-sm font-medium ${isDarkToken ? "text-white" : "text-textPrimary"}`}
        >
          Aa
        </span>
      </div>
      <div className="space-y-0.5">
        <p className="text-sm font-medium text-textPrimary">{name}</p>
        <code className="block truncate text-xs text-textSecondary">{variable}</code>
        <code className="block truncate text-xs text-textSecondary">
          {tailwindClass}
        </code>
      </div>
    </div>
  );
}

function TypographySample({
  name,
  tailwindClass,
  sampleText,
}: Readonly<{ name: string; tailwindClass: string; sampleText: string }>) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-textSecondary">{name}</p>
      <p className={`text-textPrimary ${tailwindClass}`}>{sampleText}</p>
      <code className="block truncate text-xs text-textSecondary">
        {tailwindClass}
      </code>
    </div>
  );
}

function SpacingBlock({
  name,
  value,
  tailwindClass,
}: Readonly<{ name: string; value: string; tailwindClass: string }>) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`min-h-4 rounded-sm bg-accentPrimary/20 ${tailwindClass}`}
        aria-hidden
      />
      <div className="text-center">
        <p className="text-sm font-medium text-textPrimary">{name}</p>
        <p className="text-xs text-textSecondary">{value}</p>
        <code className="block truncate text-xs text-textSecondary">
          {tailwindClass}
        </code>
      </div>
    </div>
  );
}

function RadiusSample({
  name,
  variable,
  tailwindClass,
}: Readonly<{ name: string; variable: string; tailwindClass: string }>) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={`h-16 bg-accentPrimary/30 border border-borderDefault ${tailwindClass}`}
        aria-hidden
      />
      <div className="space-y-0.5">
        <p className="text-sm font-medium text-textPrimary">{name}</p>
        <code className="block truncate text-xs text-textSecondary">{variable}</code>
        <code className="block truncate text-xs text-textSecondary">{tailwindClass}</code>
      </div>
    </div>
  );
}

function ShadowSample({
  name,
  variable,
  tailwindClass,
}: Readonly<{ name: string; variable: string; tailwindClass: string }>) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={`h-16 rounded-md bg-backgroundPage border border-borderDefault ${tailwindClass}`}
        aria-hidden
      />
      <div className="space-y-0.5">
        <p className="text-sm font-medium text-textPrimary">{name}</p>
        <code className="block truncate text-xs text-textSecondary">{variable}</code>
        <code className="block truncate text-xs text-textSecondary">
          {tailwindClass}
        </code>
      </div>
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <PageLayout>
      <div className="space-y-16">
        <header className="space-y-2">
          <Heading level="h1">Design System</Heading>
          <p className="text-base leading-6 text-textSecondary">
            Token-based design system for the personal website. All values are
            defined in CSS variables and mapped to Tailwind utilities.
          </p>
        </header>

        <section className="space-y-6" aria-labelledby="colors-heading">
          <Heading level="h2" id="colors-heading">
            Colors
          </Heading>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
            {designSystemColorTokens.map((token) => (
              <ColorSwatch
                key={token.variable}
                name={token.name}
                variable={token.variable}
                tailwindClass={token.tailwindClass}
              />
            ))}
          </div>
        </section>

        <section className="space-y-6" aria-labelledby="typography-heading">
          <Heading level="h2" id="typography-heading">
            Typography
          </Heading>
          <div className="grid gap-8 sm:grid-cols-2">
            {designSystemTypographyTokens.map((token) => (
              <TypographySample
                key={token.name}
                name={token.name}
                tailwindClass={token.tailwindClass}
                sampleText={token.sampleText}
              />
            ))}
          </div>
        </section>

        <section className="space-y-6" aria-labelledby="spacing-heading">
          <Heading level="h2" id="spacing-heading">
            Spacing
          </Heading>
          <div className="flex flex-wrap gap-8">
            {designSystemSpacingTokens.map((token) => (
              <SpacingBlock
                key={token.name}
                name={token.name}
                value={token.value}
                tailwindClass={token.tailwindClass}
              />
            ))}
          </div>
        </section>

        <section className="space-y-6" aria-labelledby="radius-heading">
          <Heading level="h2" id="radius-heading">
            Border Radius
          </Heading>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {designSystemRadiusTokens.map((token) => (
              <RadiusSample
                key={token.variable}
                name={token.name}
                variable={token.variable}
                tailwindClass={token.tailwindClass}
              />
            ))}
          </div>
        </section>

        <section className="space-y-6" aria-labelledby="shadows-heading">
          <Heading level="h2" id="shadows-heading">
            Shadows
          </Heading>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {designSystemShadowTokens.map((token) => (
              <ShadowSample
                key={token.variable}
                name={token.name}
                variable={token.variable}
                tailwindClass={token.tailwindClass}
              />
            ))}
          </div>
        </section>

        <section className="space-y-6" aria-labelledby="components-heading">
          <Heading level="h2" id="components-heading">
            Components
          </Heading>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <p className="text-sm font-medium text-textPrimary">Card (static)</p>
              <Card>
                <Heading level="h3">Project title</Heading>
                <BodyText size="sm" className="mt-2">
                  Short description inside a non-interactive card.
                </BodyText>
              </Card>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-textPrimary">Card (link)</p>
              <Card href="/work/example-case-study">
                <Heading level="h3">Example case study</Heading>
                <BodyText size="sm" className="mt-2">
                  Entire surface is a Next.js link with hover and focus styles.
                </BodyText>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
