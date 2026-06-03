/**
 * "Scroll-as-timeline" interpolation helpers — the authoring math.
 *
 * `keyframe` maps a normalized progress (0..1) to a value across ordered stops,
 * like keyframes on a timeline. `sampleTimeline` is the runtime-facing variant:
 * it reads a progress ref (clamped + finite-guarded) so scene `useFrame`
 * callbacks can animate 3D properties without ever re-rendering React.
 * Pure + framework free, so it is trivially unit-testable.
 */

/** Linear interpolation between `start` and `end` at `t` (not clamped). */
export const lerp = (start: number, end: number, t: number): number =>
  start + (end - start) * t;

/** Clamp `value` into the inclusive range [minimum, maximum]. */
export const clamp = (value: number, minimum: number, maximum: number): number =>
  Math.min(maximum, Math.max(minimum, value));

/** A single [position, value] pair on a timeline; positions are ascending. */
export type Keyframe = readonly [position: number, value: number];

/**
 * Interpolate a value across ordered [position, value] stops.
 *
 * Stops must be sorted ascending by position. A `progress` before the first
 * stop or after the last holds flat at that end's value (no extrapolation).
 *
 * @example keyframe(0.25, [[0, 0], [0.5, 10], [1, -2]]) // => 5
 */
export function keyframe(
  progress: number,
  stops: ReadonlyArray<Keyframe>,
): number {
  if (stops.length === 0) {
    throw new Error("keyframe requires at least one stop");
  }

  const firstStop = stops[0];
  if (progress <= firstStop[0]) {
    return firstStop[1];
  }

  const lastStop = stops[stops.length - 1];
  if (progress >= lastStop[0]) {
    return lastStop[1];
  }

  for (let index = 1; index < stops.length; index += 1) {
    const [stopPosition, stopValue] = stops[index];
    if (progress <= stopPosition) {
      const [previousPosition, previousValue] = stops[index - 1];
      const span = stopPosition - previousPosition;
      const localProgress = span === 0 ? 0 : (progress - previousPosition) / span;
      return lerp(previousValue, stopValue, localProgress);
    }
  }

  // Unreachable: the >= lastStop guard above covers progress past the end.
  return lastStop[1];
}

/** Minimal read-only ref shape so this stays decoupled from React's types. */
export type ProgressRef = { readonly current: number | null };

/**
 * Sample a timeline from a live progress ref. Non-finite or null progress
 * (e.g. a transient bad scroll value) is treated as 0 so a scene never breaks.
 */
export function sampleTimeline(
  progressRef: ProgressRef,
  stops: ReadonlyArray<Keyframe>,
): number {
  const raw = progressRef.current ?? 0;
  const progress = Number.isFinite(raw) ? clamp(raw, 0, 1) : 0;
  return keyframe(progress, stops);
}
