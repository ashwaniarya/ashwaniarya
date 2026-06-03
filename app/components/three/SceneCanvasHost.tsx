"use client";

/**
 * The single, app-wide WebGL canvas. Mounted once (root layout), it renders
 * drei's <View.Port /> so every scattered <View> across the page portals into
 * this one context — 1 WebGL context, N views (avoids the ~16-context cap).
 *
 * Perf layer: DPR is capped (lower on coarse-pointer/mobile) and the render
 * loop is paused while the tab is hidden.
 */

import { View } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";

export function SceneCanvasHost() {
  const [frameloop, setFrameloop] = useState<"always" | "never">("always");
  // Client-only (ssr:false), so reading matchMedia in the lazy initializer is safe.
  const [maxDpr] = useState(() =>
    window.matchMedia("(pointer: coarse)").matches ? 1.5 : 2,
  );

  useEffect(() => {
    const handleVisibility = () => {
      setFrameloop(document.hidden ? "never" : "always");
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <Canvas
        frameloop={frameloop}
        dpr={[1, maxDpr]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        eventSource={document.body}
        eventPrefix="client"
      >
        <View.Port />
      </Canvas>
    </div>
  );
}
