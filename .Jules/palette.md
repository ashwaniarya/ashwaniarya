## 2024-04-08 - Skip To Content pattern
**Learning:** Since the app has a sticky global header across all pages, a visually hidden "skip to main content" link is a necessary pattern to prevent keyboard users from tabbing through the header navigation on every page load.
**Action:** Use a `skipToContentPolicy` in `app/constants/policy.ts` to implement a `sr-only focus:not-sr-only` link as the first focusable element inside the layout body pointing to a programmatically focusable `<main id="main-content" tabIndex={-1}>` element.
