## 🚀 Phase 1 – Scaffolding Plan (TypeScript, App Router)

This document describes the concrete steps to complete **Phase 1: Scaffolding** for the personal website, using **Next.js App Router** and **TypeScript**. It is written so that another AI or developer can implement the phase without guessing, and can clearly verify when each step is done.

The goal of Phase 1 is to create a **minimal but real, shippable website skeleton**:

- A working Next.js app using the **App Router** and **Static Site Generation**.
- A simple **home page** at `/`.
- An example **work detail page** at `/work/example-case-study`.
- A **central configuration module** for site identity and policy-like values.
- Tailwind CSS wired up with **minimal, clean styling**, ready for later design-system work.

No advanced design system, content model, or search behavior is implemented in this phase; those arrive in later phases.

---

## ✅ Task Checklist (with Tests)

All task names are descriptive and written to be easy to scan. Each task includes at least one simple way to test or validate it.

### 1. Project Initialization and Base Configuration

- [ ] **Create the Next.js project with TypeScript and App Router**
  - **Description**: Initialize a new Next.js application in this repository using the App Router (`app/` directory) and TypeScript. Ensure the default structure compiles and runs locally.
  - **How to test**:
    - Install dependencies (`npm install` or `pnpm install` or `yarn install`, depending on the chosen package manager).
    - Run the development server (`npm run dev` or equivalent).
    - Open `http://localhost:3000` in a browser and confirm that the default Next.js page loads without errors.

- [ ] **Add and configure TypeScript for the project**
  - **Description**: Ensure `tsconfig.json` is present and configured for a typical Next.js TypeScript setup, keeping types simple and descriptive.
  - **How to test**:
    - Run `npm run dev` and confirm there are no TypeScript compilation errors.
    - Optionally run `tsc --noEmit` (if configured) to confirm there are no type errors.

- [ ] **Create a minimal Next.js configuration file**
  - **Description**: Add `next.config` (for example, `next.config.mjs`) with minimal necessary configuration, avoiding unnecessary experimental flags. Confirm it is compatible with the App Router.
  - **How to test**:
    - Start the dev server and verify that routing via the `app/` directory works as expected (home page loads, no Next.js config warnings or errors in the console).

### 2. Tailwind CSS and Global Styles

- [ ] **Integrate Tailwind CSS and PostCSS**
  - **Description**: Add Tailwind CSS, PostCSS, and Autoprefixer dependencies. Create `tailwind.config` and `postcss.config` files with a minimal, standard setup.
  - **How to test**:
    - Run the dev server.
    - Add an obvious Tailwind class (for example, a background color) to a temporary element on the home page.
    - Confirm in the browser that the styling is applied, which proves Tailwind is wired up correctly.

- [ ] **Create global styles file and connect it to the App Router layout**
  - **Description**: Create `styles/globals.css` (or similar) that includes `@tailwind base;`, `@tailwind components;`, and `@tailwind utilities;`. Ensure this file is imported by the root layout in `app/layout.tsx`.
  - **How to test**:
    - Add a simple global rule (for example, `body` using a sans-serif font via Tailwind).
    - Refresh the browser and confirm the global style is applied to all pages.

- [ ] **Define minimal Tailwind theme values**
  - **Description**: In `tailwind.config`, define a very small set of design-related values (for example, colors like `backgroundPage`, `textPrimary`, `accentPrimary`). These should be named clearly to support later expansion into a proper design system.
  - **How to test**:
    - Use one of the configured theme colors on a heading or section.
    - Confirm the color appears correctly in the browser and is available via Tailwind class names.

### 3. Central Configuration Module

- [ ] **Create the central site configuration module**
  - **Description**: Add `config/siteConfiguration.ts` that exports clearly named configuration objects and values. This should be the single source of truth for policy-like and identity values.
  - **How to test**:
    - Confirm that pages and components import values from this module rather than hard-coding labels or limits.

- [ ] **Define site identity and navigation configuration**
  - **Description**: Inside `siteConfiguration`, add:
    - `siteName` (for example, `"Arya – Personal Website"`).
    - `siteDescription` (short description of the site’s purpose).
    - `ownerName`.
    - `navigationLinks`: an array of objects such as `{ label: string; href: string }` for navigation items like “Home” and “Example Work”.
  - **How to test**:
    - Update `siteName` or a navigation label in `siteConfiguration`.
    - Reload the site and confirm that the header and relevant page content reflect the updated value without editing any component code.

- [ ] **Define layout and search configuration objects**
  - **Description**: In `siteConfiguration`, add:
    - `layoutConfiguration` with values such as:
      - `maximumPageWidth` (used by the main layout container).
      - Optional class bundles for horizontal or vertical padding (for example, `pageHorizontalPaddingClass`).
    - `searchConfiguration` with values such as:
      - `minimumQueryLength`.
      - `maximumSearchResults`.
    - The search values will not be used in Phase 1 but are defined to enforce centralized policy handling.
  - **How to test**:
    - Temporarily log or display a layout configuration value on a page to confirm it is imported correctly.
    - Confirm that any limit or layout decision used in Phase 1 is read from `siteConfiguration` instead of being hard-coded.

### 4. Root Layout and Shared Layout Components

- [ ] **Implement the root layout component in `app/layout.tsx`**
  - **Description**: Create the root layout for the App Router that:
    - Defines `<html lang="en">` and `<body>`.
    - Applies global Tailwind-based classes to the `<body>` (for example, background color and font).
    - Imports and uses `styles/globals.css`.
    - Uses values from `siteConfiguration` for default metadata (for example, title and description).
  - **How to test**:
    - Start the dev server and inspect the rendered HTML.
    - Confirm the `<html>` and `<body>` structure is correct, the global classes are applied, and the default `<title>` and `<meta name="description">` reflect values from `siteConfiguration`.

- [ ] **Create `PageLayout` component for consistent page structure**
  - **Description**: Add `app/components/layout/PageLayout.tsx` that:
    - Wraps page content in a centered container.
    - Uses `layoutConfiguration.maximumPageWidth` and related values for max width and padding.
    - Renders a `main` region where page content is displayed.
    - Optionally composes `SiteHeader` and `SiteFooter` (if not added directly in `app/layout.tsx`).
  - **How to test**:
    - Wrap the home page and example work page in `PageLayout`.
    - Resize the browser window and confirm that the content remains centered and respects the configured maximum width and padding.

- [ ] **Create `SiteHeader` component using navigation configuration**
  - **Description**: Add `app/components/layout/SiteHeader.tsx` that:
    - Displays the `siteName`.
    - Iterates over `navigationLinks` from `siteConfiguration` to render navigation items.
  - **How to test**:
    - Confirm that links for “Home” and “Example Work” appear in the header.
    - Click the links to verify they navigate correctly to `/` and `/work/example-case-study`.
    - Change a label or link in `siteConfiguration` and confirm the header updates accordingly.

- [ ] **Create `SiteFooter` component for ownership information**
  - **Description**: Add `app/components/layout/SiteFooter.tsx` that:
    - Displays a simple ownership or copyright line using `ownerName`.
    - Optionally includes the current year and an additional short message or tagline from configuration.
  - **How to test**:
    - Confirm the footer appears on both the home page and the example work page.
    - Adjust a footer-related configuration value and verify that the footer content changes without modifying the component.

### 5. Home Page and Example Work Page

- [ ] **Implement the home page at `/`**
  - **Description**: Create `app/page.tsx` that:
    - Uses `PageLayout`.
    - Displays a clear main heading using `siteName`.
    - Includes a short introductory paragraph using `siteDescription`.
    - Briefly explains what visitors can expect (for example, UX work, product experiments, engineering notes).
    - Provides at least one obvious link or call-to-action to the example work page.
  - **How to test**:
    - Open `/` in the browser.
    - Confirm the heading and description match values in `siteConfiguration`.
    - Click the link to the example work page and verify navigation works.

- [ ] **Implement the example work page at `/work/example-case-study`**
  - **Description**: Create `app/work/example-case-study/page.tsx` that:
    - Uses `PageLayout`.
    - Provides a realistic but static structure for a case study:
      - Main title (for example, “Example UX Case Study”).
      - Short summary paragraph.
      - Several sections with headings such as “Context”, “What was done”, and “Outcome”.
    - Uses semantic HTML (`<h1>`, `<h2>`, `<p>`, `<section>` where appropriate).
  - **How to test**:
    - Open `/work/example-case-study` in the browser.
    - Confirm the page renders the expected sections and text.
    - Check that the structure uses proper headings and is easy to read.

### 6. Documentation and Validation

- [ ] **Update the main README to reflect Phase 1 structure**
  - **Description**: Add a short description in `README.md` explaining the project, how to run it, and where to find this Phase 1 plan document. Keep it concise and focused on helping someone new get started quickly.
  - **How to test**:
    - Have a fresh reader (or a future AI) follow the README instructions to:
      - Install dependencies.
      - Run the dev server.
      - Navigate to `/` and `/work/example-case-study` successfully.

- [ ] **Confirm that all policy-like values come from the central configuration**
  - **Description**: Review the code to ensure any policy-like value (limits, labels that might change, layout widths, search-related numbers) is defined in `siteConfiguration` and not scattered as hard-coded “magic numbers” or strings.
  - **How to test**:
    - Perform a quick search in the codebase for numbers or labels that look like policies (for example, fixed max widths, limits on items).
    - Verify that each such value is either clearly non-policy (purely presentational and unlikely to change) or is sourced from `siteConfiguration`.

---

## 🧠 Assumptions and Constraints

- The project will use **TypeScript** for both pages and components.
- The project will use the **Next.js App Router** (`app/` directory), not the older `pages/` router.
- The example work page route will be **`/work/example-case-study`**.
- No CMS, Markdown, or external content sources will be used in Phase 1.
- Search behavior will **not** be implemented in Phase 1, but its configuration shape will be defined in the central configuration module.
- All naming should be **descriptive and easy to remember**, avoiding abbreviations and unclear short names.

---

## 🔍 Testing Overview for Phase 1

At the end of Phase 1, all of the following should be true:

- Running the development server and opening `/` shows:
  - A clear home page with a heading using `siteName`.
  - Descriptive text using `siteDescription`.
  - Navigation via `SiteHeader` and `SiteFooter` is visible.
- Navigating to `/work/example-case-study` shows:
  - A realistic but static case study layout with multiple sections.
  - Consistent layout and styling via `PageLayout`.
- Updating configuration values in `siteConfiguration` (for example, `siteName`, `navigationLinks`, `maximumPageWidth`) affects the site behavior or appearance **without editing component code**.
- Tailwind CSS is active and uses the small set of defined theme values for colors and basic styling.

If all items in the checklist are completed and the above behaviors hold true, **Phase 1: Scaffolding** can be considered complete and the project is ready for Phase 2 work on the token-based design system.

---

## ❓ Open Questions for Future Phases

These questions do not block Phase 1 implementation but may influence choices in later phases:

- Are there specific accessibility or SEO requirements (beyond semantic HTML and basic metadata) that should influence how pages are structured?
- Are there preferred visual themes or inspirations that should guide the token design in Phase 2?
- Are there particular categories of work (for example, UX research, interaction design, product strategy) that should be reflected in navigation or content groupings later on?


