export interface Point {
  x: number;
  y: number;
}

export interface CursorState {
  position: Point;
  velocity: Point;
  isHovering: boolean;
  target: HTMLElement | null;
}

export interface IFeedback {
  onEnter(element: HTMLElement, state: CursorState): void;
  onLeave(element: HTMLElement, state: CursorState): void;
  onMove(element: HTMLElement, state: CursorState): void;
  update(state: CursorState): void;
}
