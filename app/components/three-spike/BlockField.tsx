"use client";

/**
 * The animated depth grid — a field of instanced blocks that reads the scroll
 * and pointer refs every frame and drives a traveling extrude wave, a parallax
 * tilt, and a violet -> cyan color shimmer. All motion happens in `useFrame`
 * (no React state) so the grid never re-renders.
 *
 * The grid is intentionally larger than the viewport so the scroll/pointer tilt
 * never slides an empty edge into frame.
 */

import { Instance, Instances } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { type RefObject, useMemo, useRef } from "react";
import * as THREE from "three";

import { clamp, lerp } from "@/app/components/three-spike/scrollKeyframes";

type BlockFieldProps = {
  scrollProgressRef: RefObject<number>;
  pointerRef: RefObject<{ x: number; y: number }>;
};

/** Mutable per-instance handle drei hands back from `<Instance ref>`. */
type InstanceHandle = THREE.Object3D & { color: THREE.Color };

const COLUMN_COUNT = 22;
const ROW_COUNT = 14;
const BLOCK_SPACING = 1.0;
const BLOCK_SIZE = 0.5;

// Token palette (globals.css): --color-glow-violet / --color-glow-cyan.
const BLOCK_COLOR_NEAR = new THREE.Color("#8b5cf6");
const BLOCK_COLOR_FAR = new THREE.Color("#06b6d4");

type BlockLayout = { x: number; y: number; distance: number };

export function BlockField({ scrollProgressRef, pointerRef }: BlockFieldProps) {
  const groupRef = useRef<THREE.Group>(null);
  const handlesRef = useRef<InstanceHandle[]>([]);

  const layout = useMemo<BlockLayout[]>(() => {
    const blocks: BlockLayout[] = [];
    const xOffset = ((COLUMN_COUNT - 1) * BLOCK_SPACING) / 2;
    const yOffset = ((ROW_COUNT - 1) * BLOCK_SPACING) / 2;
    for (let column = 0; column < COLUMN_COUNT; column += 1) {
      for (let row = 0; row < ROW_COUNT; row += 1) {
        const x = column * BLOCK_SPACING - xOffset;
        const y = row * BLOCK_SPACING - yOffset;
        blocks.push({ x, y, distance: Math.hypot(x, y) });
      }
    }
    return blocks;
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
      // Gentle tilt only — the field overfills the frame, so small angles read
      // as parallax without revealing an empty edge.
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
  );
}
