## 2024-05-18 - Skip-to-content links
**Learning:** Sticky global headers break the default keyboard navigation order unless users tab through every nav element first. Using a visually hidden "Skip to main content" link at the top of the body is critical for screen reader and keyboard accessibility, allowing users to jump directly to primary content.
**Action:** When working on sites with sticky or complex global headers, always implement a visually hidden, focusable skip link targetting a main container equipped with `tabIndex={-1}` and `focus:outline-none`.
