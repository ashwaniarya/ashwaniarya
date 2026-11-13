export function DriftingGlowBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="drifting-glow drifting-glow-primary" />
      <div className="drifting-glow drifting-glow-secondary" />
      <div className="drifting-glow drifting-glow-tertiary" />
    </div>
  );
}
