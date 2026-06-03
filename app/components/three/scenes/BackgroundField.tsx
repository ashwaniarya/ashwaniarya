"use client";

/**
 * The animated depth grid, rendered into the shared canvas as a fullscreen
 * <View>. Reads the scroll/pointer refs (via the authoring hooks) every frame
 * and drives a traveling Z-extrude wave + amplitude (scroll), a parallax tilt
 * (pointer), and a violet -> cyan shimmer. Self-contained: brings its own
 * camera + lights since each drei View has an isolated scene. The grid is
 * lighter on small screens.
 */

import { Instance, Instances, PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import { usePointer, useScrollProgress } from "@/app/components/three/hooks";
import { clamp, lerp } from "@/app/components/three/math/scrollKeyframes";

type InstanceHandle = THREE.Object3D & { color: THREE.Color };
type BlockLayout = { x: number; y: number; distance: number };

const BLOCK_SIZE = 0.04;
const BLOCK_SPACING = 0.28;
const BLOCK_COLOR_NEAR = new THREE.Color("#8b5cf6");
const BLOCK_COLOR_FAR = new THREE.Color("#06b6d4");

function buildLayout(columnCount: number, rowCount: number): BlockLayout[] {
  const blocks: BlockLayout[] = [];
  const xOffset = ((columnCount - 1) * BLOCK_SPACING) / 2;
  const yOffset = ((rowCount - 1) * BLOCK_SPACING) / 2;
  for (let column = 0; column < columnCount; column += 1) {
    for (let row = 0; row < rowCount; row += 1) {
      const x = column * BLOCK_SPACING - xOffset;
      const y = row * BLOCK_SPACING - yOffset;
      blocks.push({ x, y, distance: Math.hypot(x, y) });
    }
  }
  return blocks;
}

export function BackgroundField() {
  const scrollProgressRef = useScrollProgress();
  const pointerRef = usePointer();
  const groupRef = useRef<THREE.Group>(null);
  const handlesRef = useRef<InstanceHandle[]>([]);

  const layout = useMemo<BlockLayout[]>(() => {
    const isSmallScreen =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 640px)").matches;
    return isSmallScreen ? buildLayout(40, 30) : buildLayout(70, 44);
  }, []);

  useFrame((state) => {
    const rawProgress = scrollProgressRef.current ?? 0;
    const scrollProgress = Number.isFinite(rawProgress)
      ? clamp(rawProgress, 0, 1)
      : 0;
    const pointer = pointerRef.current ?? { x: 0, y: 0 };
    const elapsed = state.clock.elapsedTime;

    const group = groupRef.current;
    if (group) {
      group.rotation.x = lerp(
        group.rotation.x,
        pointer.y * 0.16 + scrollProgress * 0.12,
        0.05,
      );
      group.rotation.y = lerp(
        group.rotation.y,
        pointer.x * 0.22 + scrollProgress * 0.3,
        0.05,
      );
    }

    const amplitude = lerp(0.3, 1.8, scrollProgress);
    const phase = elapsed * 0.7 + scrollProgress * Math.PI * 4;
    const handles = handlesRef.current;
    for (let index = 0; index < layout.length; index += 1) {
      const handle = handles[index];
      if (!handle) continue;
      const wave = Math.sin(layout[index].distance * 0.55 - phase);
      const normalizedWave = wave * 0.5 + 0.5;
      handle.position.z = wave * amplitude;
      handle.scale.setScalar(0.65 + 0.35 * normalizedWave);
      handle.color.lerpColors(
        BLOCK_COLOR_NEAR,
        BLOCK_COLOR_FAR,
        clamp(normalizedWave * 0.65 + scrollProgress * 0.35, 0, 1),
      );
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[6, 8, 10]} intensity={1.5} />
      <pointLight position={[-8, -5, 6]} intensity={2.2} decay={0} color="#06b6d4" />
      <group ref={groupRef}>
        <Instances limit={layout.length}>
          <boxGeometry args={[BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE]} />
          <meshStandardMaterial roughness={0.35} metalness={0.45} toneMapped={false} />
          {layout.map((block, index) => (
            <Instance
              key={index}
              position={[block.x, block.y, 0]}
              ref={(instance) => {
                if (instance) {
                  handlesRef.current[index] = instance as unknown as InstanceHandle;
                }
              }}
            />
          ))}
        </Instances>
      </group>
    </>
  );
}
