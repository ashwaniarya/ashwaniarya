## 2024-05-18 - "Skip to main content" link accessibility pattern
**Learning:** Adding a skip-to-content link required integrating with the existing centralized policy pattern (`app/constants/policy.ts`) for styling and ensuring the target `<main>` container is programmatically focusable (`tabIndex={-1}`) but visually clean (`focus:outline-none`).
**Action:** Always create policy objects in `constants/policy.ts` when adding new global visual components and ensure anchor targets correctly handle programmatic focus without unsightly visual rings.
