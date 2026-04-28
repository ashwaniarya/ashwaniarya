## 2024-05-15 - Accessible Internal Anchor Targets
**Learning:** When creating accessible "Skip to main content" links, the target container must be able to receive programmatic focus. However, if the container is not inherently interactive (like a `<main>` tag), it will display an unwanted visible focus ring upon navigation.
**Action:** Always add `tabIndex={-1}` and `focus:outline-none` to non-interactive internal anchor targets (e.g., `#main-content`) to allow programmatic focus for screen readers while suppressing the visual focus ring.
