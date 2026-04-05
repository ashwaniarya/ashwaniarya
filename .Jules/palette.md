## 2025-01-20 - [Add Keyboard Focus States to External Links]
**Learning:** Found that `ExternalTextLink` component lacked keyboard focus indicators, making it hard for keyboard-only users to see what was focused. Adding `focus-visible` ring utilities makes interactive elements predictable and visually accessible.
**Action:** Next time creating a custom link or button component, I will ensure `focus-visible` styles are included from the start.
