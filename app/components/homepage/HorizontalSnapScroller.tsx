"use client";

import { useRef, type ReactNode } from "react";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";

import { homepageSelectedWorkSectionPolicy } from "@/app/constants/policy";

export type HorizontalSnapScrollerProps = Readonly<{
  label: string;
  children: ReactNode;
}>;

/**
 * Focusable scroll-snap region. Touch swipes and trackpads scroll it natively, arrow keys scroll
 * it once focused, and the prev/next buttons step one card at a time.
 */
export function HorizontalSnapScroller({ label, children }: HorizontalSnapScrollerProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByOneCard = (direction: 1 | -1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const firstCard = scroller.querySelector("li");
    const step = firstCard ? firstCard.getBoundingClientRect().width + 20 : scroller.clientWidth * 0.85;
    scroller.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={scrollerRef}
        role="region"
        aria-label={label}
        tabIndex={0}
        className={homepageSelectedWorkSectionPolicy.scrollerClassName}
        data-test="selected-work-scroller"
      >
        {children}
      </div>
      <div className={homepageSelectedWorkSectionPolicy.scrollControlsRowClassName}>
        <button
          type="button"
          aria-label="Previous project"
          className={homepageSelectedWorkSectionPolicy.scrollControlButtonClassName}
          onClick={() => scrollByOneCard(-1)}
        >
          <TbChevronLeft aria-hidden className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Next project"
          className={homepageSelectedWorkSectionPolicy.scrollControlButtonClassName}
          onClick={() => scrollByOneCard(1)}
        >
          <TbChevronRight aria-hidden className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
