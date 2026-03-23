import { useEffect, useRef } from 'react';
import { Controller } from '../core/Controller';
import { IFeedback } from '../core/types';

export const useCursor = (feedback: IFeedback) => {
  const ref = useRef<HTMLElement>(null);
  const controller = useRef(Controller.getInstance());

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleEnter = () => {
        // We might want to notify the controller or the feedback directly
        // Ideally the controller knows about "targets" but for now let's just trigger feedback
        // But wait, the feedback needs the state from the controller.
        // And the controller is the one running the loop.
        
        // This part of the architecture is tricky. 
        // If the feedback is purely visual based on global cursor, it just needs `update`.
        // If it interacts with a specific element (hover effect), it needs to know when THAT element is hovered.
        
        // Let's hook up local listeners that trigger the feedback methods
        // accessing the controller's current state (which we might need to expose getter for)
        // Or we pass the state?
        
        // Simple approach:
        // Feedback is registered to the loop for continuous updates (e.g. magnetic effect)
        // Feedback is also triggered on mouse enter/leave for state changes.
        
        // For now, let's register the feedback to the controller loop if it needs continuous updates.
        controller.current.register(feedback);
    };
    
    const handleLeave = () => {
        controller.current.unregister(feedback);
        // Clean up visual state?
        // feedback.onLeave(element, ...);
    };

    // We also need to bind the specific element interactions:
    const onMouseEnter = () => feedback.onEnter(element, controller.current.getState());
    const onMouseLeave = () => feedback.onLeave(element, controller.current.getState());
    const onMouseMove = () => feedback.onMove(element, controller.current.getState());

    element.addEventListener('mouseenter', onMouseEnter);
    element.addEventListener('mouseleave', onMouseLeave);
    element.addEventListener('mousemove', onMouseMove);

    return () => {
      element.removeEventListener('mouseenter', onMouseEnter);
      element.removeEventListener('mouseleave', onMouseLeave);
      element.removeEventListener('mousemove', onMouseMove);
      controller.current.unregister(feedback);
    };
  }, [feedback]);

  return ref;
};
