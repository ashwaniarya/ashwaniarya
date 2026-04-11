## 2024-05-24 - Adding skip-to-content links for sticky headers
**Learning:** For apps with sticky global headers that trap focus on keyboard navigation, adding a visually hidden 'skip to main content' link enables users to bypass the navigation and access main content immediately.
**Action:** In `app/layout.tsx`, added a skip link targeting a focusable `<main>` element with `tabIndex={-1}` and `focus:outline-none`, ensuring clean keyboard navigation without unwanted focus rings around the entire main layout block.
