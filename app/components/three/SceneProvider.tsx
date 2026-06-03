"use client";

/**
 * App-wide input driver for the 3D system. Runs ONCE (mounted in the root
 * layout) and feeds every scene + button:
 *  - GSAP ScrollTrigger writes normalized page scroll progress (0..1).
 *  - A window pointermove listener writes the normalized cursor (-1..1).
 * Both land in refs exposed via context, so high-frequency input never
 * triggers a React re-render — scenes read the refs inside `useFrame`.
 */

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";

export type PointerPosition = { x: number; y: number };

export type SceneRefs = {
  scrollProgressRef: RefObject<number>;
  pointerRef: RefObject<PointerPosition>;
};

const SceneRefsContext = createContext<SceneRefs | null>(null);

export function useSceneRefs(): SceneRefs {
  const refs = useContext(SceneRefsContext);
  if (!refs) {
    throw new Error("useSceneRefs must be used within <SceneProvider>");
  }
  return refs;
}

export function SceneProvider({ children }: { children: ReactNode }) {
  const scrollProgressRef = useRef(0);
  const pointerRef = useRef<PointerPosition>({ x: 0, y: 0 });

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
    // The page grows as lazy images load — recompute the scroll range.
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

  const sceneRefs = useMemo<SceneRefs>(
    () => ({ scrollProgressRef, pointerRef }),
    [],
  );

  return (
    <SceneRefsContext.Provider value={sceneRefs}>
      {children}
    </SceneRefsContext.Provider>
  );
}
