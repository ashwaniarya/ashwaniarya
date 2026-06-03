"use client";

/**
 * The ssr:false boundary for the entire 3D system. The root layout imports
 * only this; everything WebGL (canvas, drei View, three.js) loads client-side
 * after hydration, so the server-rendered DOM stays plain and correct.
 */

import dynamic from "next/dynamic";

const SceneRoot = dynamic(() => import("@/app/components/three/SceneRoot"), {
  ssr: false,
});

export function SceneCanvasMount() {
  return <SceneRoot />;
}
