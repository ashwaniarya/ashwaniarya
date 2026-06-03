"use client";

/**
 * Thin wrapper over drei's <View>, used in the HtmlView (out-of-canvas) pattern:
 * the View renders its OWN positioned <div> — sized/placed by `className`/`style`
 * — and portals its scene into the single shared canvas via <View.Port />,
 * scissored to that div's screen rect. The aria-hidden <span> marks the whole
 * 3D layer decorative.
 *
 * NOTE: drei's `track` prop is silently ignored on the HtmlView path (it only
 * applies when a <View> is rendered INSIDE the <Canvas>). Out here, the element
 * tracked IS the div the View renders, so it MUST carry the positioning classes
 * — otherwise it collapses to height 0 and the view renders into a zero-area
 * scissor (i.e. nothing). See node_modules/@react-three/drei/web/View.js.
 */

import { View } from "@react-three/drei";
import type { CSSProperties, ReactNode } from "react";

type TrackedViewProps = {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

export function TrackedView({ className, style, children }: TrackedViewProps) {
  return (
    <span aria-hidden>
      <View className={className} style={style}>
        {children}
      </View>
    </span>
  );
}
