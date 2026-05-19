## 2024-05-19 - Added skip-to-content link
**Learning:** For single-page Next.js apps with sticky global headers, providing a "skip to main content" link is a critical accessibility pattern. It should target a programmatically focusable container (e.g., `<main id="main-content" tabIndex={-1}>`) using a `.sr-only` class that becomes visible on focus.
**Action:** Always ensure that structural layout components include a programmatically focusable main content area (`tabIndex={-1}` and `focus:outline-none`) and that a corresponding skip link is provided early in the DOM.
