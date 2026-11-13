const editorialAccentMarkVariantClassNames = {
  horizontalTitle:
    "block h-1 w-16 shrink-0 rounded-full bg-gradient-to-r from-accentPrimary via-accentHighlight to-accentSecondary",
  verticalSection:
    "mt-2 block h-8 w-1 shrink-0 rounded-full bg-gradient-to-b from-accentPrimary via-accentHighlight to-accentSecondary",
} as const;

export type EditorialAccentMarkVariant = keyof typeof editorialAccentMarkVariantClassNames;

export type EditorialAccentMarkProps = Readonly<{
  variant: EditorialAccentMarkVariant;
  className?: string;
}>;

/** Gradient rule used on case study titles and section markers — shared on homepage for visual continuity. */
export function EditorialAccentMark({
  variant,
  className = "",
}: EditorialAccentMarkProps) {
  return (
    <span
      aria-hidden
      className={`${editorialAccentMarkVariantClassNames[variant]} ${className}`.trim()}
    />
  );
}
