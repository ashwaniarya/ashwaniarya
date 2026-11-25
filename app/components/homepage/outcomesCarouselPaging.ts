/** Paging rules for the outcomes carousel. Pure, so the server markup and the client agree. */

/** Tailwind `lg`. At and above it a page is 3x2; below it (phones and tablets) a page is 2x2. */
export const outcomesCarouselDesktopMinWidthPx = 1024;

export const outcomesCarouselLayouts = {
  compact: { columns: 2, rows: 2 },
  wide: { columns: 3, rows: 2 },
} as const;

export type OutcomesCarouselLayoutName = keyof typeof outcomesCarouselLayouts;

export function getOutcomesCarouselLayoutName(viewportWidthPx: number): OutcomesCarouselLayoutName {
  return viewportWidthPx >= outcomesCarouselDesktopMinWidthPx ? "wide" : "compact";
}

export function getOutcomesCarouselPageSize(layoutName: OutcomesCarouselLayoutName): number {
  const { columns, rows } = outcomesCarouselLayouts[layoutName];
  return columns * rows;
}

export function getOutcomesCarouselPageCount(itemCount: number, pageSize: number): number {
  if (itemCount <= 0 || pageSize <= 0) return 0;
  return Math.ceil(itemCount / pageSize);
}

/** Splits items into pages of `pageSize`, keeping order (row by row inside a page). */
export function chunkOutcomesCarouselPages<T>(items: readonly T[], pageSize: number): T[][] {
  if (pageSize <= 0) return [];
  const pages: T[][] = [];
  for (let start = 0; start < items.length; start += pageSize) {
    pages.push(items.slice(start, start + pageSize));
  }
  return pages;
}

export function clampOutcomesCarouselPage(page: number, pageCount: number): number {
  if (pageCount <= 0) return 0;
  return Math.min(Math.max(page, 0), pageCount - 1);
}
