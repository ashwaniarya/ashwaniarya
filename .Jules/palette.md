## 2025-04-15 - [Skip to Content Strategy]
**Learning:** For marketing/portfolio sites with sticky global headers and deep-scroll homepage architectures, skipping directly to `<main>` without an outline avoids an aggressive default browser focus ring engulfing the entire page layout. Visually, the user has skipped content, but the experience remains elegant.
**Action:** Always add a visually hidden but focusable skip link and combine it with `focus:outline-none` on the target `<main>` wrapper container.
