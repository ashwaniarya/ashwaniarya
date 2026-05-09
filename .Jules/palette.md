## 2024-05-15 - Skip-to-content links for sticky headers
**Learning:** Adding a "skip to main content" link is critical for keyboard accessibility when the site uses a sticky global header, allowing users to bypass repetitive navigation.
**Action:** When working on layouts with sticky headers, always implement a visually hidden but programmatically focusable skip link (e.g. `focus:not-sr-only focus:fixed`) that targets an inner container with `tabIndex={-1}` and `focus:outline-none`.
