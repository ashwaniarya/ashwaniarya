## 2024-05-27 - Skip to Content Link implementation
**Learning:** When adding a "skip to main content" link to improve keyboard accessibility, the target `<main>` element needs `tabIndex={-1}` to be programmatically focusable. However, this causes some browsers to show a visible focus ring when the skip link is used.
**Action:** Adding `focus:outline-none` to the `<main>` element ensures it can receive programmatic focus (fixing the skip link functionality) without showing a disruptive visual focus ring to users.
