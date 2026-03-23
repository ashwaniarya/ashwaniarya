import { BaseFeedback } from './BaseFeedback';
import { CursorState } from '../core/types';

export class ScaleFeedback extends BaseFeedback {
  private scale: number = 1.1;

  constructor(scale: number = 1.1) {
    super();
    this.scale = scale;
  }

  onEnter(element: HTMLElement, state: CursorState): void {
    element.style.transform = `scale(${this.scale})`;
    element.style.transition = 'transform 0.3s ease';
  }

  onLeave(element: HTMLElement, state: CursorState): void {
    element.style.transform = 'scale(1)';
  }
}
