## 2024-05-26 - Add skip to content link
**Learning:** Adding a skip-to-content link required combining `tabIndex={-1}` with `focus:outline-none` on the `<main>` element to allow it to receive programmatic focus from the skip link without displaying an unwanted visual focus ring.
**Action:** When creating in-page anchor links to non-interactive container elements, always use this combination (`tabIndex={-1}` and `focus:outline-none`) to maintain both keyboard accessibility and visual polish.
