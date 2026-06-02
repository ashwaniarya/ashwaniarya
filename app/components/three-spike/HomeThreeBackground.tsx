"use client";

/**
 * Full-viewport WebGL background for the home page (spike).
 *
 * Owns the input -> refs pipeline: GSAP ScrollTrigger writes scroll progress
 * (0..1) and a pointermove listener writes the normalized cursor (-1..1). Both
 * land in refs that `BlockField` reads each frame, so high-frequency input
 * never triggers a React re-render. Mounts as a fixed, decorative, click-through
 * layer behind page content (`-z-10`; the page background lives on <html> so
 * this shows through a transparent <body>).
 */

import { useGSAP } from "@gsap/react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import { BlockField } from "@/app/components/three-spike/BlockField";

export function HomeThreeBackground() {
  const scrollProgressRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0 });

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const scrollTrigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        scrollProgressRef.current = self.progress;
      },
    });
    // The page grows as lazy images load — recompute the scroll range so
    // progress stays a valid 0..1 instead of dividing by a stale range.
    ScrollTrigger.refresh();
    return () => scrollTrigger.kill();
  }, []);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      pointerRef.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -((event.clientY / window.innerHeight) * 2 - 1),
      };
    };
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[6, 8, 10]} intensity={1.5} />
        <pointLight position={[-8, -5, 6]} intensity={2.2} decay={0} color="#06b6d4" />
        <BlockField scrollProgressRef={scrollProgressRef} pointerRef={pointerRef} />
      </Canvas>
    </div>
  );
}
