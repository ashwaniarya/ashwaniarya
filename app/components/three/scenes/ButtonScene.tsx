"use client";

/**
 * Per-button 3D motif, rendered into the shared canvas as a <View> tracking the
 * button's DOM rect (so it sits behind the button's translucent surface). Spins
 * faster + shifts color on hover/focus and compresses on press. Self-contained
 * camera + lights since each drei View has an isolated scene.
 */

import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import { lerp } from "@/app/components/three/math/scrollKeyframes";

const COLOR_IDLE = "#8b5cf6";
const COLOR_ACTIVE = "#06b6d4";

type ButtonSceneProps = { active: boolean; pressed: boolean };

export function ButtonScene({ active, pressed }: ButtonSceneProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const spinSpeed = active ? 1.9 : 0.5;
    mesh.rotation.x += delta * spinSpeed;
    mesh.rotation.y += delta * spinSpeed * 1.25;
    const targetScale = pressed ? 0.68 : active ? 1.18 : 0.95;
    mesh.scale.setScalar(lerp(mesh.scale.x, targetScale, 0.22));
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 3]} fov={45} />
      <ambientLight intensity={0.9} />
      <directionalLight position={[2, 3, 4]} intensity={1.6} />
      <mesh ref={meshRef}>
        <boxGeometry args={[1.15, 1.15, 1.15]} />
        <meshStandardMaterial
          color={active ? COLOR_ACTIVE : COLOR_IDLE}
          emissive={COLOR_IDLE}
          emissiveIntensity={active ? 0.7 : 0.3}
          roughness={0.25}
          metalness={0.5}
          toneMapped={false}
        />
      </mesh>
    </>
  );
}
