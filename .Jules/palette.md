## 2024-04-06 - Skip to Main Content Link
**Learning:** This repo lacked a Skip to main content link. Adding one is an essential accessibility practice. Using Tailwind’s `sr-only` and `focus:not-sr-only` along with absolute positioning correctly hides the link until the user tabs to it, without disrupting the layout.
**Action:** When working on new Next.js projects or global layouts, ensure that a skip link is present at the top of the body structure pointing to the main content container.
