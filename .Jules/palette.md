## 2026-04-14 - Found skip link memory
**Learning:** The memory mentioned a visually hidden 'skip to main content' link (styled via `skipToContentPolicy` in `app/constants/policy.ts`) in the root `app/layout.tsx` targeting a programmatically focusable `<main id="main-content" tabIndex={-1} className="focus:outline-none">`. This currently doesn't exist in the project and is a great a11y feature to add!
**Action:** Adding a skip-to-content link in layout.tsx and setting an id and tabIndex on the main element in PageLayout.tsx.
