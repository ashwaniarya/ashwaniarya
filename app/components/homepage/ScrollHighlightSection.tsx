"use client";

import { useEffect, useRef, type ComponentProps } from "react";

import { homepageScrollHighlightPolicy } from "@/app/constants/policy";

export function ScrollHighlightSection({ className = "", ...sectionProps }: ComponentProps<"section">) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    // Hidden state is applied only after mount so server HTML (and no-JS visitors) see the final state.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      section.dataset.scrollHighlight = "shown";
      return;
    }
    const { top, bottom } = section.getBoundingClientRect();
    if (top < window.innerHeight * homepageScrollHighlightPolicy.triggerViewportFraction && bottom > 0) {
      section.dataset.scrollHighlight = "shown";
      return;
    }
    section.dataset.scrollHighlight = "pending";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        section.dataset.scrollHighlight = "shown";
        observer.disconnect();
      },
      { rootMargin: homepageScrollHighlightPolicy.triggerRootMargin },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${homepageScrollHighlightPolicy.sectionGroupClassName} ${className}`.trim()}
      {...sectionProps}
    />
  );
}
