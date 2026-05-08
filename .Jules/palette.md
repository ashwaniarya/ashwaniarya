## 2024-05-08 - Skip-to-content Pattern
**Learning:** Using `tabIndex={-1}` in combination with `focus:outline-none` on target elements (`<main>`) is crucial for internal anchor links like "Skip to main content". It allows programmatic focus shift for screen readers and keyboard users without rendering an ugly focus ring around the entire page content.
**Action:** Always apply this pattern when adding skip links to ensure a polished accessibility experience.
