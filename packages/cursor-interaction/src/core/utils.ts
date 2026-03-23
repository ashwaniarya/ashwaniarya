export const lerp = (start: number, end: number, factor: number): number => {
  return start + (end - start) * factor;
};

export const distance = (p1: { x: number; y: number }, p2: { x: number; y: number }): number => {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
};
