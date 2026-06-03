"use client";

/**
 * Client root for the shared 3D system: the fullscreen background <View>
 * (which renders its own fixed, click-through rect) plus the single canvas host
 * that owns the <View.Port />. Loaded via SceneCanvasMount behind an ssr:false
 * boundary so no WebGL runs during SSR/hydration.
 */

import { SceneCanvasHost } from "@/app/components/three/SceneCanvasHost";
import { BackgroundField } from "@/app/components/three/scenes/BackgroundField";
import { TrackedView } from "@/app/components/three/views/TrackedView";

export default function SceneRoot() {
  return (
    <>
      <TrackedView className="pointer-events-none fixed inset-0 -z-10">
        <BackgroundField />
      </TrackedView>
      <SceneCanvasHost />
    </>
  );
}
