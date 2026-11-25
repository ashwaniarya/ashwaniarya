// @vitest-environment jsdom
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

import { HomepageProductionProofSection } from "./HomepageProductionProofSection";
import { HomepageSelectedWorkSection } from "./HomepageSelectedWorkSection";
import { HomepageServicesSection } from "./HomepageServicesSection";
import { HorizontalSnapScroller } from "./HorizontalSnapScroller";
import { ServiceInquiryDialogProvider } from "./ServiceInquiryDialog";
import {
  homepageProductionProofSectionPolicy,
  homepageSelectedWorkSectionPolicy,
  meshEditorialSurfacePolicy,
} from "@/app/constants/policy";

const globalsCss = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
const layoutSource = readFileSync(join(process.cwd(), "app/layout.tsx"), "utf8");
const classes = (value: string) => value.split(/\s+/);

describe("carousel bleed and snap styles", () => {
  const scrollers = {
    selectedWork: homepageSelectedWorkSectionPolicy.scrollerClassName,
    outcomesAndServices: homepageProductionProofSectionPolicy.carouselScrollerClassName,
  };

  it.each(Object.entries(scrollers))("%s scroller bleeds, snaps on x and hides its scrollbar", (_name, className) => {
    const list = classes(className);
    for (const required of ["carousel-bleed", "scrollbar-hidden", "snap-x", "snap-mandatory", "overflow-x-auto", "data-[dragging=true]:snap-none"]) {
      expect(list).toContain(required);
    }
    // The old contained track: a small negative margin, matching padding and a visible thin scrollbar.
    for (const removed of ["-mx-1", "px-1", "scroll-px-1", "[scrollbar-width:thin]"]) expect(list).not.toContain(removed);
    // Smooth scrolling only without reduced motion.
    expect(list).not.toContain("scroll-smooth");
    expect(list).toContain("motion-safe:scroll-smooth");
  });

  it("snaps per card (Selected work) and per page (Outcomes and Services)", () => {
    expect(classes(homepageSelectedWorkSectionPolicy.tileListItemClassName)).toEqual(expect.arrayContaining(["snap-start", "snap-always"]));
    expect(classes(homepageProductionProofSectionPolicy.carouselPageClassName)).toEqual(expect.arrayContaining(["snap-start", "snap-always"]));
  });

  it("defines the hidden scrollbar for every engine", () => {
    const rule = globalsCss.slice(globalsCss.indexOf("@utility scrollbar-hidden"));
    expect(rule).toMatch(/scrollbar-width:\s*none/);
    expect(rule).toMatch(/-ms-overflow-style:\s*none/);
    expect(rule).toMatch(/&::-webkit-scrollbar\s*{\s*display:\s*none/);
  });

  it("bleeds by the gutter on both sides and pads and scroll-pads back by the same amount", () => {
    expect(globalsCss).toMatch(/@property --carousel-page-width\s*{\s*syntax:\s*"<length>";\s*inherits:\s*true;\s*initial-value:\s*0px;/);
    expect(globalsCss).toMatch(/@utility carousel-bleed-frame\s*{\s*container-type:\s*inline-size;\s*--carousel-page-width:\s*100cqw;/);
    const rule = globalsCss.slice(globalsCss.indexOf("@utility carousel-bleed {"));
    expect(rule).toMatch(/--carousel-bleed:\s*max\(0px, calc\(\(var\(--carousel-page-width\) - 100cqw\) \/ 2\)\)/);
    expect(rule).toMatch(/margin-inline:\s*calc\(-1 \* var\(--carousel-bleed\)\)/);
    expect(rule).toMatch(/^\s*padding-inline:\s*var\(--carousel-bleed\)/m);
    expect(rule).toMatch(/scroll-padding-inline:\s*var\(--carousel-bleed\)/);
    // The page width comes from the layout container, which excludes the vertical scrollbar.
    expect(layoutSource).toContain('<div className="@container flex min-h-dvh flex-col">');
    // No page-level horizontal clipping is used to hide overflow.
    expect(globalsCss).not.toMatch(/overflow-x:\s*(hidden|clip)/);
  });

  it.each([
    ["Selected work", () => <HomepageSelectedWorkSection />],
    ["Outcomes achieved", () => <HomepageProductionProofSection />],
    ["Services", () => (
      <ServiceInquiryDialogProvider>
        <HomepageServicesSection />
      </ServiceInquiryDialogProvider>
    )],
  ])("%s: the panel has no border and does not clip; every scroller sits in a bleed frame", (_name, render) => {
    const markup = renderToStaticMarkup(render());
    const shell = markup.match(/<div class="relative isolate ([^"]*)" data-bleed="true">/);
    expect(shell).not.toBeNull();
    expect(classes(shell![1])).not.toContain("overflow-hidden");
    expect(classes(shell![1])).not.toContain("border");
    expect(shell![1]).toContain(meshEditorialSurfacePolicy.carouselShellBaseClassName);
    const scrollerCount = (markup.match(/class="carousel-bleed /g) ?? []).length;
    expect(scrollerCount).toBeGreaterThan(0);
    expect((markup.match(/class="carousel-bleed-frame[ "]/g) ?? []).length).toBe(scrollerCount);
  });
});

// jsdom has no layout: cards sit 340px apart, so one card pitch is 340px.
describe("Selected work scroller mouse drag and reduced motion", () => {
  let container: HTMLDivElement;
  let root: Root;
  let reduced = false;
  const scrollTo = vi.fn();
  const scrollBy = vi.fn();
  const linkClicks = vi.fn();
  const setPointerCapture = vi.fn();

  beforeAll(() => {
    (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
    globalThis.ResizeObserver = class {
      observe() {}
      disconnect() {}
    } as unknown as typeof ResizeObserver;
    window.matchMedia = ((query: string) => ({ matches: query.includes("reduce") ? reduced : false, media: query })) as unknown as typeof window.matchMedia;
    HTMLElement.prototype.scrollTo = scrollTo as unknown as typeof HTMLElement.prototype.scrollTo;
    HTMLElement.prototype.scrollBy = scrollBy as unknown as typeof HTMLElement.prototype.scrollBy;
    HTMLElement.prototype.setPointerCapture = setPointerCapture;
    Object.defineProperty(HTMLElement.prototype, "clientWidth", { configurable: true, get: () => 400 });
    Object.defineProperty(HTMLElement.prototype, "scrollWidth", { configurable: true, get: () => 1000 });
    const scrollLefts = new WeakMap<HTMLElement, number>();
    Object.defineProperty(HTMLElement.prototype, "scrollLeft", {
      configurable: true,
      get(this: HTMLElement) {
        return scrollLefts.get(this) ?? 0;
      },
      set(this: HTMLElement, value: number) {
        scrollLefts.set(this, value);
      },
    });
    Object.defineProperty(HTMLElement.prototype, "offsetLeft", {
      configurable: true,
      get(this: HTMLElement) {
        return this.tagName === "LI" && this.parentElement ? Array.from(this.parentElement.children).indexOf(this) * 340 : 0;
      },
    });
  });
  beforeEach(() => {
    reduced = false;
    scrollTo.mockClear();
    scrollBy.mockClear();
    linkClicks.mockClear();
    setPointerCapture.mockClear();
    container = document.createElement("div");
    document.body.append(container);
    root = createRoot(container);
    act(() =>
      root.render(
        <HorizontalSnapScroller label="Selected work">
          <ul>
            <li>
              <a href="#one" onClick={(event) => { event.preventDefault(); linkClicks(); }}>One</a>
            </li>
            <li>
              <input aria-label="Field" />
            </li>
          </ul>
        </HorizontalSnapScroller>,
      ),
    );
  });
  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  const scroller = () => container.querySelector<HTMLElement>('[data-test="selected-work-scroller"]')!;
  function pointer(target: Element, type: string, clientX: number, pointerType = "mouse", button = 0) {
    const event = new MouseEvent(type, { bubbles: true, cancelable: true, clientX, button });
    Object.defineProperty(event, "pointerType", { value: pointerType });
    Object.defineProperty(event, "pointerId", { value: 1 });
    act(() => {
      target.dispatchEvent(event);
    });
  }

  it("drags with the mouse, pauses snap while dragging, settles one card on, and swallows the click after", () => {
    const link = container.querySelector("a")!;
    pointer(link, "pointerdown", 300);
    pointer(link, "pointermove", 200);
    expect(scroller().dataset.dragging).toBe("true");
    pointer(link, "pointerup", 200);
    expect(scroller().dataset.dragging).toBeUndefined();
    expect(scrollTo).toHaveBeenCalledWith({ left: 340, behavior: "smooth" });
    act(() => link.click());
    expect(linkClicks).not.toHaveBeenCalled();
  });

  it("springs back on a short drag and lets a plain click through", () => {
    const link = container.querySelector("a")!;
    pointer(link, "pointerdown", 300);
    pointer(link, "pointermove", 280);
    pointer(link, "pointerup", 280);
    expect(scrollTo).toHaveBeenCalledWith({ left: 0, behavior: "smooth" });
    act(() => link.click());
    expect(linkClicks).not.toHaveBeenCalled();
    pointer(link, "pointerdown", 100);
    pointer(link, "pointerup", 101);
    act(() => link.click());
    expect(linkClicks).toHaveBeenCalledTimes(1);
  });

  it("uses instant scrolling for arrows and drags under reduced motion", () => {
    reduced = true;
    act(() => container.querySelector<HTMLButtonElement>('[aria-label="Next project"]')!.click());
    expect(scrollBy).toHaveBeenCalledWith({ left: 340, behavior: "auto" });
    const link = container.querySelector("a")!;
    pointer(link, "pointerdown", 300);
    pointer(link, "pointermove", 100);
    pointer(link, "pointerup", 100);
    expect(scrollTo).toHaveBeenCalledWith({ left: 340, behavior: "auto" });
  });

  it("drags only for a primary mouse press past 6px outside form fields, captures, moves opposite and blocks dragstart", () => {
    const link = container.querySelector("a")!;
    const field = container.querySelector("input")!;
    for (const [target, type, button] of [[link, "touch", 0], [link, "mouse", 2], [field, "mouse", 0]] as const) {
      pointer(target, "pointerdown", 300, type, button);
      pointer(target, "pointermove", 200, type, button);
      expect(scroller().dataset.dragging).toBeUndefined();
      pointer(target, "pointerup", 200, type, button);
    }
    expect(setPointerCapture).not.toHaveBeenCalled();
    pointer(link, "pointerdown", 300);
    pointer(link, "pointermove", 295);
    expect(setPointerCapture).not.toHaveBeenCalled();
    pointer(link, "pointermove", 294);
    expect(setPointerCapture).toHaveBeenCalledTimes(1);
    expect(scroller().scrollLeft).toBe(6);
    const dragStart = new Event("dragstart", { bubbles: true, cancelable: true });
    act(() => {
      link.dispatchEvent(dragStart);
    });
    expect(dragStart.defaultPrevented).toBe(true);
    pointer(link, "pointerup", 294);
  });

  it("a cancelled drag resets without eating the next real click", () => {
    const link = container.querySelector("a")!;
    pointer(link, "pointerdown", 300);
    pointer(link, "pointermove", 200);
    pointer(link, "pointercancel", 200);
    expect(scroller().dataset.dragging).toBeUndefined();
    act(() => link.click());
    expect(linkClicks).toHaveBeenCalledTimes(1);
  });

  it("keeps Prev focusable with aria-disabled at the start and ignores its click", () => {
    const prev = container.querySelector<HTMLButtonElement>('[aria-label="Previous project"]')!;
    expect(prev.getAttribute("aria-disabled")).toBe("true");
    expect(prev.disabled).toBe(false);
    act(() => prev.click());
    expect(scrollBy).not.toHaveBeenCalled();
  });
});
