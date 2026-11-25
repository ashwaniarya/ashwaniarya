"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";

import { homepageSelectedWorkSectionPolicy } from "@/app/constants/policy";

export type HorizontalSnapScrollerProps = Readonly<{
  label: string;
  children: ReactNode;
}>;

/** Distance between the first two direct cards, so a step always lands on the next snap point. */
export function measureCardPitch(scroller: HTMLElement): number {
  const cards = scroller.querySelectorAll<HTMLElement>(":scope > ul > li");
  if (cards.length > 1) return cards[1].offsetLeft - cards[0].offsetLeft;
  return scroller.clientWidth * 0.85;
}

/** A mouse press becomes a drag only past this distance, so plain clicks on links still work. */
const dragStartThresholdPx = 6;
/** A drag shorter than this springs back to the card it started on. */
const dragStepThresholdPx = 40;
const dragExcludedTargetSelector = "input, textarea, select, [contenteditable], dialog";

function scrollBehavior(): ScrollBehavior {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}

/**
 * Focusable scroll-snap region (snap lives on this scrolling element). Touch swipes and trackpads
 * scroll it natively, arrow keys scroll it once focused, prev/next step one card pitch, and a mouse
 * drag moves it and settles on a card on release (snap is paused while dragging).
 * Prev is aria-disabled at the start and Next at the end (they stay focusable, so keyboard focus is not lost).
 */
export function HorizontalSnapScroller({ label, children }: HorizontalSnapScrollerProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const regionId = useId();
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    setAtStart(scroller.scrollLeft <= 1);
    setAtEnd(scroller.scrollLeft >= scroller.scrollWidth - scroller.clientWidth - 1);
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    updateEdges();
    scroller.addEventListener("scroll", updateEdges, { passive: true });
    const resizeObserver = new ResizeObserver(updateEdges);
    resizeObserver.observe(scroller);
    return () => {
      scroller.removeEventListener("scroll", updateEdges);
      resizeObserver.disconnect();
    };
  }, [updateEdges]);

  const scrollByOneCard = (direction: 1 | -1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    scroller.scrollBy({ left: direction * measureCardPitch(scroller), behavior: scrollBehavior() });
  };

  const dragRef = useRef<{ pointerId: number; startX: number; startScroll: number; captured: boolean } | null>(null);
  const suppressNextClickRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (
      event.pointerType !== "mouse" ||
      event.button !== 0 ||
      !scrollerRef.current ||
      (event.target as Element).closest?.(dragExcludedTargetSelector)
    )
      return;
    dragRef.current = { pointerId: event.pointerId, startX: event.clientX, startScroll: scrollerRef.current.scrollLeft, captured: false };
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
    const scroller = scrollerRef.current;
    dragRef.current = null;
    if (!drag || !drag.captured || !scroller) return;
    setIsDragging(false);
    // The click that follows a real drag must not open the link under the cursor. A cancelled pointer
    // gets no click, so only a release arms the guard (otherwise the next real click would be eaten).
    suppressNextClickRef.current = event.type === "pointerup";
    const pitch = measureCardPitch(scroller);
    const deltaX = event.clientX - drag.startX;
    const cards = Math.abs(deltaX) < dragStepThresholdPx ? 0 : Math.max(1, Math.round(Math.abs(deltaX) / pitch));
    const startCard = Math.round(drag.startScroll / pitch);
    scroller.scrollTo({ left: (startCard + (deltaX < 0 ? cards : -cards)) * pitch, behavior: scrollBehavior() });
  };
  const onClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    if (!suppressNextClickRef.current) return;
    suppressNextClickRef.current = false;
    event.preventDefault();
    event.stopPropagation();
  };

  const policy = homepageSelectedWorkSectionPolicy;

  return (
    <div className={policy.scrollerFrameClassName}>
      <div
        ref={scrollerRef}
        id={regionId}
        role="region"
        aria-label={label}
        tabIndex={0}
        className={policy.scrollerClassName}
        data-dragging={isDragging ? "true" : undefined}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        onDragStart={(event) => event.preventDefault()}
        data-test="selected-work-scroller"
      >
        {children}
      </div>
      <div className={policy.scrollControlsRowClassName}>
        <button
          type="button"
          aria-label="Previous project"
          aria-controls={regionId}
          aria-disabled={atStart}
          className={policy.scrollControlButtonClassName}
          onClick={() => {
            if (!atStart) scrollByOneCard(-1);
          }}
        >
          <TbChevronLeft aria-hidden className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Next project"
          aria-controls={regionId}
          aria-disabled={atEnd}
          className={policy.scrollControlButtonClassName}
          onClick={() => {
            if (!atEnd) scrollByOneCard(1);
          }}
        >
          <TbChevronRight aria-hidden className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
