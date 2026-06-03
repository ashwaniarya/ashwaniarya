"use client";

/**
 * The "scroll-as-timeline" authoring API. Compose these inside any scene that
 * lives under <SceneProvider>:
 *
 *   const sampleY = useScrollTimeline([[0, 0], [0.5, 3], [1, -2]]);
 *   useFrame(() => { mesh.position.y = sampleY(); });
 *
 * All return refs / ref-readers (never values), so animating against scroll or
 * pointer does not re-render React.
 */

import { useCallback, type RefObject } from "react";

import {
  type Keyframe,
  sampleTimeline,
} from "@/app/components/three/math/scrollKeyframes";
import {
  type PointerPosition,
  useSceneRefs,
} from "@/app/components/three/SceneProvider";

/** Live page scroll progress (0..1), clamped + finite-guarded by consumers. */
export function useScrollProgress(): RefObject<number> {
  return useSceneRefs().scrollProgressRef;
}

/** Live normalized cursor position (x/y in -1..1). */
export function usePointer(): RefObject<PointerPosition> {
  return useSceneRefs().pointerRef;
}

/**
 * Bind a set of timeline stops to page scroll. Returns a sampler to call each
 * frame; it reads the live scroll ref and interpolates across the stops.
 */
export function useScrollTimeline(
  stops: ReadonlyArray<Keyframe>,
): () => number {
  const progressRef = useScrollProgress();
  return useCallback(
    () => sampleTimeline(progressRef, stops),
    [progressRef, stops],
  );
}

export { sampleTimeline } from "@/app/components/three/math/scrollKeyframes";
export type { Keyframe } from "@/app/components/three/math/scrollKeyframes";
