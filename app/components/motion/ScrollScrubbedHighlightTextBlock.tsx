"use client";

import { useLayoutEffect, useMemo, useRef, type RefObject } from "react";

import { scrollScrubbedHighlightPolicy } from "@/app/constants/policy";
import { computeHighlightedCharacterCount } from "@/app/lib/motion/computeHighlightedCharacterCount";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export type ScrollScrubbedHighlightTextBlockProps = Readonly<{
  lines: readonly string[];
  sectionRef: RefObject<HTMLElement | null>;
  paragraphClassName?: string;
}>;

/**
 * Renders body copy as always-visible characters; ScrollTrigger scrub lights a prefix of characters.
 * Reverse scroll reduces the lit prefix. Respects `prefers-reduced-motion` by lighting all characters.
 */
export function ScrollScrubbedHighlightTextBlock({
  lines,
  sectionRef,
  paragraphClassName = "",
}: ScrollScrubbedHighlightTextBlockProps) {
  const rootReference = useRef<HTMLDivElement>(null);

  const characterLatticeDescriptorList = useMemo(() => {
    let globalCharacterIndex = 0;
    return lines.map((lineText, lineIndex) => {
      const characters = Array.from(lineText);
      const entries = characters.map((character) => {
        const descriptor = {
          key: `${lineIndex}-${globalCharacterIndex}`,
          character,
          globalCharacterIndex,
        };
        globalCharacterIndex += 1;
        return descriptor;
      });
      return { lineIndex, entries };
    });
  }, [lines]);

  useLayoutEffect(() => {
    const sectionElement = sectionRef.current;
    const rootElement = rootReference.current;
    if (!sectionElement || !rootElement) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const motionContext = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      const characterSpanNodeList =
        rootElement.querySelectorAll<HTMLElement>("[data-scroll-highlight-char]");
      const totalCharacterCount = characterSpanNodeList.length;

      const applyLitCharacterCount = (litCharacterCount: number) => {
        const boundedCount = Math.min(
          totalCharacterCount,
          Math.max(0, litCharacterCount),
        );
        for (let characterIndex = 0; characterIndex < characterSpanNodeList.length; characterIndex += 1) {
          const spanElement = characterSpanNodeList[characterIndex];
          const isLit = characterIndex < boundedCount;
          spanElement.classList.toggle(
            scrollScrubbedHighlightPolicy.litCharacterClassName,
            isLit,
          );
          spanElement.classList.toggle(
            scrollScrubbedHighlightPolicy.dimCharacterClassName,
            !isLit,
          );
        }
      };

      if (prefersReducedMotion || totalCharacterCount === 0) {
        applyLitCharacterCount(totalCharacterCount);
        return;
      }

      applyLitCharacterCount(0);

      ScrollTrigger.create({
        trigger: sectionElement,
        start: scrollScrubbedHighlightPolicy.scrollTriggerStart,
        end: scrollScrubbedHighlightPolicy.scrollTriggerEnd,
        scrub: scrollScrubbedHighlightPolicy.scrubLagSeconds,
        onUpdate: (scrollTriggerInstance) => {
          applyLitCharacterCount(
            computeHighlightedCharacterCount(
              scrollTriggerInstance.progress,
              totalCharacterCount,
            ),
          );
        },
      });
    }, rootElement);

    const refreshScrollTriggersOnResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", refreshScrollTriggersOnResize);

    return () => {
      window.removeEventListener("resize", refreshScrollTriggersOnResize);
      motionContext.revert();
    };
  }, [lines, sectionRef]);

  const paragraphTypographyClassName =
    scrollScrubbedHighlightPolicy.paragraphTypographyClassName;

  return (
    <div ref={rootReference} className="prose-rhythm">
      {characterLatticeDescriptorList.map(({ lineIndex, entries }) => (
        <p
          key={`highlight-line-${lineIndex}`}
          className={`${paragraphTypographyClassName} ${paragraphClassName}`.trim()}
        >
          {entries.map(({ key, character, globalCharacterIndex }) => (
            <span
              key={key}
              data-scroll-highlight-char
              data-char-order={globalCharacterIndex}
              className={scrollScrubbedHighlightPolicy.dimCharacterClassName}
            >
              {character}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}
