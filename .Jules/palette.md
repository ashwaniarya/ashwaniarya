## 2024-05-18 - Skip to Main Content Link
**Learning:** Using `tabIndex={-1}` and `focus:outline-none` on the `#main-content` anchor target is critical to prevent visual focus rings when the skip link is used, while still allowing screen readers and programmatic keyboard navigation to work correctly and reset focus to the main content area.
**Action:** When adding skip links, ensure the target element uses this combination of attributes to maintain aesthetic quality without compromising accessibility.
