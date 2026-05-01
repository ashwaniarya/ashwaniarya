## 2024-05-01 - Keyboard Accessibility: Skip to Main Content Link
**Learning:** For Next.js apps with a global sticky header or complex navigation, a visually hidden "Skip to main content" link at the very top of `app/layout.tsx` is essential. The target element must be programmatically focusable using `tabIndex={-1}` and `focus:outline-none` so keyboard navigation avoids unwanted focus rings when skipping.
**Action:** Always verify keyboard focus flow for sticky headers, implementing a `skipToContentPolicy` in `app/constants/policy.ts` to manage the styling in a centralized way.
