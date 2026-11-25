"use client";

import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";
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

/**
 * Focusable scroll-snap region (snap lives on this scrolling element). Touch swipes and trackpads
 * scroll it natively, arrow keys scroll it once focused, and prev/next step one card pitch.
 * Prev is disabled at the start and Next at the end.
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
    scroller.scrollBy({ left: direction * measureCardPitch(scroller), behavior: "smooth" });
  };

  const policy = homepageSelectedWorkSectionPolicy;

  return (
    <div>
      <div
        ref={scrollerRef}
        id={regionId}
        role="region"
        aria-label={label}
        tabIndex={0}
        className={policy.scrollerClassName}
        data-test="selected-work-scroller"
      >
        {children}
      </div>
      <div className={policy.scrollControlsRowClassName}>
        <button
          type="button"
          aria-label="Previous project"
          aria-controls={regionId}
          disabled={atStart}
          className={policy.scrollControlButtonClassName}
          onClick={() => scrollByOneCard(-1)}
        >
          <TbChevronLeft aria-hidden className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Next project"
          aria-controls={regionId}
          disabled={atEnd}
          className={policy.scrollControlButtonClassName}
          onClick={() => scrollByOneCard(1)}
        >
          <TbChevronRight aria-hidden className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
