import { describe, expect, it } from "vitest";

import {
  clamp,
  keyframe,
  lerp,
  sampleTimeline,
} from "@/app/components/three/math/scrollKeyframes";

describe("lerp", () => {
  it("returns the endpoints at t=0 and t=1", () => {
    expect(lerp(2, 10, 0)).toBe(2);
    expect(lerp(2, 10, 1)).toBe(10);
  });

  it("returns the midpoint at t=0.5", () => {
    expect(lerp(0, 10, 0.5)).toBe(5);
  });
});

describe("clamp", () => {
  it("clamps below, within, and above the range", () => {
    expect(clamp(-1, 0, 1)).toBe(0);
    expect(clamp(0.5, 0, 1)).toBe(0.5);
    expect(clamp(2, 0, 1)).toBe(1);
  });
});

describe("keyframe", () => {
  const stops = [
    [0, 0],
    [0.5, 10],
    [1, -2],
  ] as const;

  it("holds the first value at or before the first stop", () => {
    expect(keyframe(-0.5, stops)).toBe(0);
    expect(keyframe(0, stops)).toBe(0);
  });

  it("holds the last value at or after the last stop", () => {
    expect(keyframe(1, stops)).toBe(-2);
    expect(keyframe(2, stops)).toBe(-2);
  });

  it("interpolates inside the first segment", () => {
    expect(keyframe(0.25, stops)).toBe(5);
  });

  it("interpolates inside a later segment", () => {
    // halfway between 10 and -2
    expect(keyframe(0.75, stops)).toBe(4);
  });

  it("returns the exact value at an interior stop", () => {
    expect(keyframe(0.5, stops)).toBe(10);
  });

  it("throws when given no stops", () => {
    expect(() => keyframe(0.5, [])).toThrow();
  });
});

describe("sampleTimeline", () => {
  const stops = [
    [0, 0],
    [1, 100],
  ] as const;

  it("samples the timeline at the ref's current progress", () => {
    expect(sampleTimeline({ current: 0.5 }, stops)).toBe(50);
  });

  it("treats null progress as 0", () => {
    expect(sampleTimeline({ current: null }, stops)).toBe(0);
  });

  it("treats non-finite progress as 0 (never breaks a scene)", () => {
    expect(sampleTimeline({ current: Number.NaN }, stops)).toBe(0);
    expect(sampleTimeline({ current: Number.POSITIVE_INFINITY }, stops)).toBe(0);
  });

  it("clamps out-of-range progress into [0,1]", () => {
    expect(sampleTimeline({ current: 5 }, stops)).toBe(100);
    expect(sampleTimeline({ current: -5 }, stops)).toBe(0);
  });
});
