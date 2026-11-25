// @vitest-environment jsdom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

import { OutcomesCarousel } from "./OutcomesCarousel";

// jsdom has no layout, ResizeObserver, matchMedia, scrollTo or pointer capture; stub just enough.
beforeAll(() => {
  (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    addEventListener() {},
    removeEventListener() {},
  })) as unknown as typeof window.matchMedia;
  HTMLElement.prototype.scrollTo = function scrollTo() {} as typeof HTMLElement.prototype.scrollTo;
});

let container: HTMLDivElement;
let root: Root;
const linkClicks = vi.fn();
const setPointerCapture = vi.fn();

const items = Array.from({ length: 8 }, (_, index) => (
  <a
    key={index}
    href={`#card-${index}`}
    data-test="card-link"
    onClick={(event) => {
      event.preventDefault();
      linkClicks(index);
    }}
  >
    Card {index}
  </a>
));

beforeEach(() => {
  linkClicks.mockClear();
  setPointerCapture.mockClear();
  HTMLElement.prototype.setPointerCapture = setPointerCapture;
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  act(() => root.render(<OutcomesCarousel label="Outcomes achieved">{items}</OutcomesCarousel>));
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

/** The compact (2x2, 2 pages) track; the wide track is hidden by CSS in the browser. */
const compact = () => container.querySelector<HTMLElement>('[data-layout="compact"]')!;
const inCompact = <T extends Element>(selector: string) => compact().querySelector<T>(selector)!;
const allInCompact = (selector: string) => Array.from(compact().querySelectorAll<HTMLElement>(selector));
const status = () => inCompact('[data-test="outcomes-carousel-status"]').textContent;

function pointer(target: Element, type: string, clientX: number) {
  const event = new MouseEvent(type, { bubbles: true, cancelable: true, clientX, button: 0 });
  Object.defineProperty(event, "pointerType", { value: "mouse" });
  Object.defineProperty(event, "pointerId", { value: 1 });
  act(() => {
    target.dispatchEvent(event);
  });
}

describe("OutcomesCarousel behaviour", () => {
  it("starts on page 1 with Prev aria-disabled (still focusable) and Next enabled", () => {
    const prev = inCompact<HTMLButtonElement>('[data-test="outcomes-carousel-prev"]');
    const next = inCompact<HTMLButtonElement>('[data-test="outcomes-carousel-next"]');
    expect(prev.getAttribute("aria-disabled")).toBe("true");
    expect(prev.disabled).toBe(false);
    expect(next.getAttribute("aria-disabled")).toBe("false");
    expect(status()).toBe("Page 1 of 2");
  });

  it("points every control's aria-controls at the region id", () => {
    const region = inCompact<HTMLElement>('[data-test="outcomes-carousel-scroller"]');
    expect(region.id).not.toBe("");
    const controls = allInCompact("[aria-controls]");
    expect(controls).toHaveLength(4);
    for (const control of controls) expect(control.getAttribute("aria-controls")).toBe(region.id);
  });

  it("moves to page 2 on Next, keeps focus on Next at the end, and ignores a click when aria-disabled", () => {
    const next = inCompact<HTMLButtonElement>('[data-test="outcomes-carousel-next"]');
    next.focus();
    act(() => next.click());
    expect(status()).toBe("Page 2 of 2");
    expect(next.getAttribute("aria-disabled")).toBe("true");
    expect(document.activeElement).toBe(next);
    act(() => next.click());
    expect(status()).toBe("Page 2 of 2");

    const prev = inCompact<HTMLButtonElement>('[data-test="outcomes-carousel-prev"]');
    prev.focus();
    act(() => prev.click());
    expect(status()).toBe("Page 1 of 2");
    expect(document.activeElement).toBe(prev);
  });

  it("jumps to a page from its dot and marks it current", () => {
    const dots = allInCompact('[data-test="outcomes-carousel-dot"]');
    act(() => dots[1].click());
    expect(status()).toBe("Page 2 of 2");
    expect(dots[1].getAttribute("aria-current")).toBe("true");
    expect(dots[0].hasAttribute("aria-current")).toBe(false);
  });

  it("announces the page once: only the live region says 'Page n of N'", () => {
    const pageLabels = allInCompact('[data-test="outcomes-carousel-page"]').map((page) => page.getAttribute("aria-label"));
    expect(pageLabels.every((label) => label === null)).toBe(true);
    expect(compact().querySelectorAll('[aria-live="polite"]')).toHaveLength(1);
  });

  it("lets a plain mouse click reach a link inside a card (no pointer capture without a drag)", () => {
    const link = allInCompact('[data-test="card-link"]')[0];
    pointer(link, "pointerdown", 100);
    pointer(link, "pointerup", 101);
    act(() => link.click());
    expect(setPointerCapture).not.toHaveBeenCalled();
    expect(linkClicks).toHaveBeenCalledWith(0);
    expect(status()).toBe("Page 1 of 2");
  });

  it("captures only after the drag threshold, pages on release, and swallows the click after a drag", () => {
    const link = allInCompact('[data-test="card-link"]')[0];
    pointer(link, "pointerdown", 300);
    pointer(link, "pointermove", 297);
    expect(setPointerCapture).not.toHaveBeenCalled();
    pointer(link, "pointermove", 200);
    expect(setPointerCapture).toHaveBeenCalledTimes(1);
    pointer(link, "pointerup", 200);
    act(() => link.click());
    expect(linkClicks).not.toHaveBeenCalled();
    expect(status()).toBe("Page 2 of 2");
    // The next plain click goes through again.
    act(() => link.click());
    expect(linkClicks).toHaveBeenCalledTimes(1);
  });
});
