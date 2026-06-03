"use client";

/**
 * The reusable interactive primitive. Renders the REAL element (button /
 * next-link / bare anchor) so keyboard, screen-reader, and SEO semantics stay
 * intact; canvas-variant buttons also portal a <ButtonScene> into the shared
 * canvas (tracking this element's rect) for the WebGL motif. The 3D layer is
 * mounted client-side only (post-hydration) so SSR stays plain DOM.
 */

import Link from "next/link";
import { useState, useSyncExternalStore, type ReactNode } from "react";

/** False during SSR + the hydration render, true once on the client. */
const subscribeNoop = () => () => {};
function useIsClient(): boolean {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );
}

import { ButtonScene } from "@/app/components/three/scenes/ButtonScene";
import { TrackedView } from "@/app/components/three/views/TrackedView";
import { button3DPolicy, type Button3DVariant } from "@/app/constants/policy";

type Button3DProps = {
  children: ReactNode;
  variant: Button3DVariant;
  href?: string;
  isExternal?: boolean;
  onClick?: () => void;
  className?: string;
};

export function Button3D({
  children,
  variant,
  href,
  isExternal = false,
  onClick,
  className = "",
}: Button3DProps) {
  const [active, setActive] = useState(false);
  const [pressed, setPressed] = useState(false);
  const isMounted = useIsClient();

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

  const mergedClassName = [button3DPolicy.variantClassName[variant], className]
    .join(" ")
    .trim();
  const hasCanvas = button3DPolicy.canvasVariants.includes(variant);

  const decoration =
    isMounted && hasCanvas ? (
      <TrackedView className="pointer-events-none absolute inset-0">
        <ButtonScene active={active} pressed={pressed} />
      </TrackedView>
    ) : null;

  if (href && isExternal) {
    const isWebUrl = href.startsWith("http");
    return (
      <a
        href={href}
        className={mergedClassName}
        {...(isWebUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...interactionHandlers}
      >
        {decoration}
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link
        href={href}
        className={mergedClassName}
        {...interactionHandlers}
      >
        {decoration}
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={mergedClassName}
      {...interactionHandlers}
    >
      {decoration}
      {children}
    </button>
  );
}
