## 2026-04-23 - Added Skip to Main Content Link
**Learning:** For a skip link to work perfectly without leaving confusing browser focus rings on non-interactive elements, the target element (like `<main>`) must have `tabIndex={-1}` to allow programmatic focus and `focus:outline-none` so users don't see a default ring around the entire page content.
**Action:** Always pair internal anchor links targeting layout sections with `tabIndex={-1}` and `focus:outline-none` on the target element for accessible, clean focus transitions.
