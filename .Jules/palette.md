## 2024-05-21 - Added Skip to Main Content Link
**Learning:** For single-page Next.js apps with sticky headers, the skip link target needs `tabIndex={-1}` to be programmatically focusable without interrupting tab flow, and `focus:outline-none` to prevent an ugly browser focus ring around the entire main content area when activated.
**Action:** Always add `tabIndex={-1}` and `focus:outline-none` together when making non-interactive layout components (like `<main>`) the target of internal skip links.
