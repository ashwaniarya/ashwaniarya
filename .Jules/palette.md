## 2024-05-20 - [Skip to Main Content Link]
**Learning:** Adding a skip-to-content link required combining `sr-only` with `focus:not-sr-only`, but for the target anchor to receive focus appropriately without looking messy, the target element needs `tabIndex={-1}` and `className="focus:outline-none"` so it doesn't show a generic focus ring.
**Action:** Use this standard for all internal skip/anchor links that shouldn't show focus rings.
