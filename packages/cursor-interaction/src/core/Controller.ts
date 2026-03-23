import { CursorState, IFeedback, Point } from './types';

export class Controller {
  private static instance: Controller;
  private state: CursorState = {
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    isHovering: false,
    target: null,
  };
  
  private listeners: Set<IFeedback> = new Set();
  private rafId: number | null = null;
  private lastTime: number = 0;

  private constructor() {
    if (typeof window !== 'undefined') {
      this.initListeners();
      this.startLoop();
    }
  }

  public static getInstance(): Controller {
    if (!Controller.instance) {
      Controller.instance = new Controller();
    }
    return Controller.instance;
  }

  private initListeners() {
    window.addEventListener('mousemove', this.handleMouseMove.bind(this));
  }

  private handleMouseMove(e: MouseEvent) {
    this.state.position = { x: e.clientX, y: e.clientY };
    // Velocity calculation could go here
  }

  private startLoop() {
    this.rafId = requestAnimationFrame(this.loop.bind(this));
  }

  private loop(timestamp: number) {
    // Delta time calculation if needed
    // const dt = timestamp - this.lastTime;
    this.lastTime = timestamp;

    this.listeners.forEach(feedback => feedback.update(this.state));
    this.rafId = requestAnimationFrame(this.loop.bind(this));
  }

  public getState(): CursorState {
    return { ...this.state };
  }

  public register(feedback: IFeedback) {
    this.listeners.add(feedback);
  }

  public unregister(feedback: IFeedback) {
    this.listeners.delete(feedback);
  }
  
  public cleanup() {
      if (typeof window !== 'undefined') {
        window.removeEventListener('mousemove', this.handleMouseMove.bind(this));
        if (this.rafId) cancelAnimationFrame(this.rafId);
      }
  }
}
