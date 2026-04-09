## 2025-02-23 - Skip To Content Link Added
**Learning:** This app uses a sticky global header which makes keyboard navigation tedious for keyboard-only users navigating the main flow on each page load. A visually hidden 'skip to main content' link that becomes visible on focus provides an essential accessibility bypass.
**Action:** When a layout features a sticky or tall header, inject a visually hidden anchor tag as the first interactive element inside the body, targeting a programmatically focusable (`tabIndex={-1}`) `<main>` container with `focus:outline-none`.
