## 2025-05-22 - Skip to Content Internal Anchor Focus Outline

**Learning:** When creating a visually hidden "Skip to main content" link that targets a semantic HTML element (like `<main>`), the browser will apply a large, awkward focus ring around the entire target element when navigated to via keyboard. This is a common accessibility issue.

**Action:** Ensure that the target element (e.g., `<main id="main-content">`) has both `tabIndex={-1}` (to allow programmatic focus without adding it to the natural tab order) and a `focus:outline-none` class (to prevent the visual outline when focused via the internal anchor link). This ensures robust screen reader support while maintaining a clean visual experience.