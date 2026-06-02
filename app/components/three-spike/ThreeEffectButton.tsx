"use client";

/**
 * Accessible call-to-action that wears a WebGL flourish (spike).
 *
 * The real element is a DOM <button> or next/link <a> — keyboard focus, screen
 * reader text, and SEO stay intact. A decorative, aria-hidden <Canvas> sits
 * behind the label and renders a block that spins faster + shifts color on
 * hover/focus and compresses on press, driven by local React state.
 */

import { Canvas, useFrame } from "@react-three/fiber";
import Link from "next/link";
import { type ReactNode, useRef, useState } from "react";
import * as THREE from "three";

import { lerp } from "@/app/components/three-spike/scrollKeyframes";

type ThreeEffectButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
};

const BLOCK_COLOR_IDLE = "#8b5cf6";
const BLOCK_COLOR_HOVER = "#06b6d4";

function ButtonBlock({ active, pressed }: { active: boolean; pressed: boolean }) {
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
    <mesh ref={meshRef}>
      <boxGeometry args={[1.15, 1.15, 1.15]} />
      <meshStandardMaterial
        color={active ? BLOCK_COLOR_HOVER : BLOCK_COLOR_IDLE}
        emissive={BLOCK_COLOR_IDLE}
        emissiveIntensity={active ? 0.7 : 0.3}
        roughness={0.25}
        metalness={0.5}
        toneMapped={false}
      />
    </mesh>
  );
}

export function ThreeEffectButton({ children, href, onClick }: ThreeEffectButtonProps) {
  const [active, setActive] = useState(false);
  const [pressed, setPressed] = useState(false);

  const interactionHandlers = {
    onPointerEnter: () => setActive(true),
    onPointerLeave: () => {
      setActive(false);
      setPressed(false);
    },
    onPointerDown: () => setPressed(true),
    onPointerUp: () => setPressed(false),
    onFocus: () => setActive(true),
    onBlur: () => {
      setActive(false);
      setPressed(false);
    },
  };

  const className =
    "relative inline-flex items-center justify-center overflow-hidden rounded-full border border-accentPrimary/40 bg-surfaceElevated/70 px-7 py-3 text-sm font-semibold text-textPrimary shadow-sm backdrop-blur-sm transition-colors hover:border-accentPrimary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accentPrimary focus-visible:ring-offset-2 focus-visible:ring-offset-backgroundPage";

  const decorativeCanvas = (
    <span aria-hidden className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[2, 3, 4]} intensity={1.6} />
        <ButtonBlock active={active} pressed={pressed} />
      </Canvas>
    </span>
  );

  const label = <span className="relative z-10">{children}</span>;

  if (href) {
    return (
      <Link href={href} className={className} {...interactionHandlers}>
        {decorativeCanvas}
        {label}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className} {...interactionHandlers}>
      {decorativeCanvas}
      {label}
    </button>
  );
}
