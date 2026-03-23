import { CursorState, IFeedback } from '../core/types';

export abstract class BaseFeedback implements IFeedback {
  abstract onEnter(element: HTMLElement, state: CursorState): void;
  abstract onLeave(element: HTMLElement, state: CursorState): void;
  
  // Optional implementation
  onMove(element: HTMLElement, state: CursorState): void {}
  update(state: CursorState): void {}
}
