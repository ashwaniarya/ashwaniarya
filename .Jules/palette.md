## 2024-03-24 - Add Skip to Main Content Link
**Learning:** This application lacks a "skip to main content" link, making keyboard navigation extremely tedious as users have to tab through the global header navigation on every page load.
**Action:** Implemented a visually hidden, focusable "Skip to main content" link at the start of the document that targets a programmatically focusable `<main id="main-content" tabIndex={-1} className="focus:outline-none">` element. This bypasses the header without introducing visual focus rings on the main container itself.
