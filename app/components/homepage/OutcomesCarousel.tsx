"use client";

import {
  Children,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from "react";

import {
  chunkOutcomesCarouselPages,
  clampOutcomesCarouselPage,
  getOutcomesCarouselPageSize,
  type OutcomesCarouselLayoutName,
} from "@/app/components/homepage/outcomesCarouselPaging";
import { MicroChevronLeftIcon, MicroChevronRightIcon } from "@/app/components/icons/MicroIcons";
import { homepageProductionProofSectionPolicy } from "@/app/constants/policy";

export type OutcomesCarouselProps = Readonly<{
  label: string;
  /** Plural noun for the arrow labels, e.g. "Next page of outcomes". */
  pageNoun?: string;
  /** One node per card, rendered inside an `<li>`. */
  children: ReactNode;
  itemClassName?: string;
  /** Per-card transition delay step, for the section's stagger reveal. */
  staggerStepMilliseconds?: number;
}>;

const dragThresholdPx = 40;
/** A mouse press only becomes a drag (and captures the pointer) after this much movement, so plain clicks reach links and buttons in cards. */
const dragStartThresholdPx = 6;
/** Presses that start on these never begin a drag: text fields and selects keep their own mouse behaviour. */
const dragExcludedTargetSelector = "input, textarea, select, [contenteditable], dialog";

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Scroll offset that brings page `index` to the snap edge (pages are measured from page 0). */
function pageScrollLeft(scroller: HTMLElement, index: number): number {
  const pages = scroller.children;
  const first = pages[0] as HTMLElement | undefined;
  const page = pages[index] as HTMLElement | undefined;
  return first && page ? page.offsetLeft - first.offsetLeft : 0;
}

function nearestPage(scroller: HTMLElement): number {
  let nearest = 0;
  for (let index = 1; index < scroller.children.length; index += 1) {
    const distance = Math.abs(
      pageScrollLeft(scroller, index) - scroller.scrollLeft,
    );
    if (
      distance <
      Math.abs(pageScrollLeft(scroller, nearest) - scroller.scrollLeft)
    )
      nearest = index;
  }
  return nearest;
}

type TrackProps = Readonly<{
  layoutName: OutcomesCarouselLayoutName;
  visibilityClassName: string;
  label: string;
  pageNoun: string;
  items: readonly ReactNode[];
  itemClassName: string;
  staggerStepMilliseconds: number;
}>;

/**
 * One layout's pages. Each page is its own grid, so row heights never leak between pages.
 * Touch swipes scroll natively with snap, a mouse drag pages on release, arrow keys page when
 * the region has focus, and prev/next plus dots page too. Controls render only with 2+ pages.
 */
function OutcomesCarouselTrack({
  layoutName,
  visibilityClassName,
  label,
  pageNoun,
  items,
  itemClassName,
  staggerStepMilliseconds,
}: TrackProps) {
  const policy = homepageProductionProofSectionPolicy;
  const scrollerRef = useRef<HTMLDivElement>(null);
  const regionId = useId();
  const [activePage, setActivePage] = useState(0);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startScroll: number;
    startPage: number;
    captured: boolean;
  } | null>(null);
  const suppressNextClickRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  const pageSize = getOutcomesCarouselPageSize(layoutName);
  const pages = chunkOutcomesCarouselPages(items, pageSize);
  const pageCount = pages.length;
  const hasMultiplePages = pageCount > 1;

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const sync = () => setActivePage(nearestPage(scroller));
    scroller.addEventListener("scroll", sync, { passive: true });
    const resizeObserver = new ResizeObserver(sync);
    resizeObserver.observe(scroller);
    return () => {
      scroller.removeEventListener("scroll", sync);
      resizeObserver.disconnect();
    };
  }, []);

  // Reserve the tallest page's height, so paging never moves the content below (no layout shift on swipe or wheel).
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const pageElements = Array.from(scroller.children) as HTMLElement[];
    const fit = () => {
      const { paddingTop, paddingBottom } = getComputedStyle(scroller);
      const tallest = Math.max(0, ...pageElements.map((page) => page.offsetHeight));
      scroller.style.height = `${tallest + parseFloat(paddingTop) + parseFloat(paddingBottom)}px`;
    };
    fit();
    const resizeObserver = new ResizeObserver(fit);
    for (const page of pageElements) resizeObserver.observe(page);
    return () => resizeObserver.disconnect();
  }, [pageCount]);

  const goToPage = (page: number) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const target = clampOutcomesCarouselPage(page, pageCount);
    scroller.scrollTo({
      left: pageScrollLeft(scroller, target),
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
    setActivePage(target);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    // Only keys pressed on the region itself page it: fields and dialogs inside cards keep their own keys.
    if (!hasMultiplePages || event.target !== event.currentTarget) return;
    const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    if (step !== undefined) {
      event.preventDefault();
      goToPage(activePage + step);
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      goToPage(event.key === "Home" ? 0 : pageCount - 1);
    }
  };

  // Touch and pen scroll natively (snap does the paging); a mouse drag pages on release.
  // The pointer is captured only once the press has moved past dragStartThresholdPx, so a
  // plain click on a link or button inside a card is delivered to that element as usual.
  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (
      event.pointerType !== "mouse" ||
      event.button !== 0 ||
      !hasMultiplePages ||
      !scrollerRef.current ||
      (event.target as Element).closest?.(dragExcludedTargetSelector)
    )
      return;
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScroll: scrollerRef.current.scrollLeft,
      startPage: activePage,
      captured: false,
    };
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || !scrollerRef.current) return;
    const deltaX = event.clientX - drag.startX;
    if (!drag.captured) {
      if (Math.abs(deltaX) < dragStartThresholdPx) return;
      drag.captured = true;
      event.currentTarget.setPointerCapture(drag.pointerId);
      setIsDragging(true);
    }
    scrollerRef.current.scrollLeft = drag.startScroll - deltaX;
  };
  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    dragRef.current = null;
    if (!drag.captured) return;
    setIsDragging(false);
    // The click that follows a real drag must not open a link under the cursor.
    suppressNextClickRef.current = true;
    const deltaX = event.clientX - drag.startX;
    const step = Math.abs(deltaX) < dragThresholdPx ? 0 : deltaX < 0 ? 1 : -1;
    goToPage(drag.startPage + step);
  };
  const onClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    if (!suppressNextClickRef.current) return;
    suppressNextClickRef.current = false;
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div
      className={visibilityClassName}
      data-test="outcomes-carousel"
      data-layout={layoutName}
      data-page-size={pageSize}
      data-page-count={pageCount}
    >
      <div
        ref={scrollerRef}
        id={regionId}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={hasMultiplePages ? 0 : -1}
        data-dragging={isDragging ? "true" : undefined}
        className={policy.carouselScrollerClassName}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        onDragStart={(event) => event.preventDefault()}
        data-test="outcomes-carousel-scroller"
      >
        {pages.map((pageItems, pageIndex) => (
          <ul
            key={pageIndex}
            className={`${policy.carouselPageClassName} ${
              layoutName === "wide"
                ? policy.carouselWidePageGridClassName
                : policy.carouselCompactPageGridClassName
            }`}
            data-test="outcomes-carousel-page"
          >
            {pageItems.map((item, slot) => {
              const index = pageIndex * pageSize + slot;
              return (
                <li
                  key={index}
                  data-test="outcomes-carousel-card"
                  className={`min-w-0 ${itemClassName}`}
                  style={{
                    transitionDelay: `${index * staggerStepMilliseconds}ms`,
                  }}
                >
                  {item}
                </li>
              );
            })}
          </ul>
        ))}
      </div>
      {hasMultiplePages ? (
        <>
          <div
            className={policy.carouselControlsRowClassName}
            data-test="outcomes-carousel-controls"
          >
            <button
              type="button"
              aria-label={`Previous page of ${pageNoun}`}
              aria-controls={regionId}
              aria-disabled={activePage <= 0}
              className={policy.carouselArrowButtonClassName}
              onClick={() => { if (activePage > 0) goToPage(activePage - 1); }}
              data-test="outcomes-carousel-prev"
            >
              <MicroChevronLeftIcon className="h-5 w-5" />
            </button>
            <div className={policy.carouselDotsRowClassName}>
              {pages.map((_, page) => (
                <button
                  key={page}
                  type="button"
                  aria-label={`Go to page ${page + 1} of ${pageCount}`}
                  aria-current={page === activePage ? "true" : undefined}
                  aria-controls={regionId}
                  className={policy.carouselDotButtonClassName}
                  onClick={() => goToPage(page)}
                  data-test="outcomes-carousel-dot"
                >
                  <span aria-hidden className={policy.carouselDotClassName} />
                </button>
              ))}
            </div>
            <button
              type="button"
              aria-label={`Next page of ${pageNoun}`}
              aria-controls={regionId}
              aria-disabled={activePage >= pageCount - 1}
              className={policy.carouselArrowButtonClassName}
              onClick={() => { if (activePage < pageCount - 1) goToPage(activePage + 1); }}
              data-test="outcomes-carousel-next"
            >
              <MicroChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
          <p
            className="sr-only"
            aria-live="polite"
            data-test="outcomes-carousel-status"
          >
            {`Page ${activePage + 1} of ${pageCount}`}
          </p>
        </>
      ) : null}
    </div>
  );
}

/**
 * Paged scroll-snap carousel: 2x2 pages below `lg` (1024px), 3x2 pages at `lg` and up. Both
 * layouts are server-rendered and CSS shows one, so there is no layout flash or resize logic;
 * the hidden layout is `display: none` and out of the accessibility tree.
 */
export function OutcomesCarousel({
  label,
  pageNoun = "outcomes",
  children,
  itemClassName = "",
  staggerStepMilliseconds = 0,
}: OutcomesCarouselProps) {
  const items = Children.toArray(children);
  const policy = homepageProductionProofSectionPolicy;
  const shared = { label, pageNoun, items, itemClassName, staggerStepMilliseconds };
  return (
    <>
      <OutcomesCarouselTrack
        layoutName="compact"
        visibilityClassName={policy.carouselCompactTrackClassName}
        {...shared}
      />
      <OutcomesCarouselTrack
        layoutName="wide"
        visibilityClassName={policy.carouselWideTrackClassName}
        {...shared}
      />
    </>
  );
}
