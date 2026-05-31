## 2024-05-31 - Skip to Content Links
**Learning:** Skip-to-content links require the target element to be programmatically focusable (`tabIndex={-1}`) but they must also hide the focus ring (`focus:outline-none`) if the target is an inert element like `<main>`, otherwise users will see a confusing focus ring around the entire page content.
**Action:** Always add `focus:outline-none` when making structural containers like `<main>` focusable for skip links.
