# Personal Website Architecture

This document describes the high-level architecture and conventions for the personal portfolio and blog. It is written so that another AI (or developer) can safely implement or extend the project in clearly defined phases.

## Overall Goal

Create a simple portfolio and personal blog that showcases:

- UX work
- Product experiments
- Notable engineering work

The site should feel fast, be easy to understand from the code, and be simple to extend over time.

## Requirements

- **Search engine and generative AI friendly**
  - Use semantic HTML elements and clear heading structure.
  - Provide stable, descriptive URLs and page titles.
  - Add basic metadata (description, social sharing tags, and sitemap) when needed in later phases.

- **Easy to change design**
  - Visual design should be driven by a small set of design tokens (colors, typography, spacing, breakpoints).
  - Changing values in one central place should update the look of the site.

- **People can easily search the site**
  - There should be a simple way for users to search work and posts.
  - Search can start as a small client-side index built from static data.

- **Low cognitive load and simple code**
  - Prefer small, focused components and modules.
  - Avoid clever abstractions that make the code harder to read.

## Testing and Validation Principles

- **Test every step within a phase**
  - Each task or step in a phase must have a clear way to verify that it works as expected.
  - The AI should not consider a step complete unless there is at least a basic test or manual check described and, where possible, executed.
- **Document how to test**
  - For every planned task, the associated plan file must include a short description of how to test or validate the change (for example, which page to open, what behavior to expect, or which command to run).
  - Tests should be simple to execute and understand, prioritizing clarity over completeness in early phases.
- **Do not skip testing when moving between phases**
  - A phase should not be treated as finished until its planned steps and their tests have been completed or explicitly discussed with the user.

## Tech Stack

- **Framework**: Next.js with Static Site Generation (SSG).
- **Styling**: Tailwind CSS configured with design tokens.
- **Content source (initial)**: Static HTML content written inside React components (no CMS and no Markdown in early phases).
- **Language**: TypeScript or JavaScript (either is acceptable; if TypeScript is chosen, types must be simple and descriptive).

## Naming and Code Conventions

- **Descriptive names**
  - Use easy to remember, descriptive names.
  - Avoid short or cryptic names. Names should express what a value holds or what a function or component does.

- **Modules and folders**
  - Group files by feature or responsibility (for example: layout, design system, search, content).
  - Keep module boundaries simple and obvious.

- **Centralized configuration and policy**
  - Any policy-like value (for example: timeouts, retry limits, item counts, search result limits) must live in a central configuration file.
  - Do not scatter magic numbers or hard-coded policy values inside components.
  - A future implementation should use a configuration module (for example, `config/siteConfiguration` or similar) that exposes clearly named constants and simple configuration objects.

## High-Level Architecture

Another AI implementing this project should follow these guidelines.

- **Pages and routing**
  - Use Next.js pages (or app router) to define:
    - A home page that introduces the person and highlights key work.
    - One or more detail pages for individual pieces of work or posts.
  - Routes should be descriptive (for example, `/work/experiment-user-onboarding` rather than obscure identifiers).

- **Content model**
  - Early phases: content lives as static JSX or HTML fragments inside page components or small shared content modules.
  - Each piece of work should at least have:
    - A title
    - A short description
    - One or more tags (for search and grouping)
    - A date or year (optional but recommended)
  - It should be straightforward to later move this content into Markdown, MDX, or a CMS without changing the core layout components.

- **Styling and design system**
  - Tailwind CSS configuration defines design tokens (for example: color palette, spacing scale, font families, font sizes, breakpoints).
  - Components use Tailwind utility classes that align with these tokens.
  - Shared layout components (for example, `PageLayout`, `Section`, `Card`) should be used across pages instead of repeating layout logic.

- **Search**
  - Search can be implemented as a small in-memory index built from a static list of content items.
  - A shared module (for example, `search/contentSearch`) should:
    - Expose a function that takes a search query string.
    - Return a list of matching items with their titles, URLs, and short snippets.
  - Search behavior settings (for example, minimum query length and maximum number of results) must live in the central configuration module.

## Phased Implementation Plan

The work should be done in clear phases. Each phase should leave the project in a working, shippable state.

### Phase 1: Scaffolding

**Goal**: Set up the basic project structure and routes with minimal styling.

- Initialize a Next.js project configured for Static Site Generation.
- Integrate Tailwind CSS with a minimal but working configuration.
- Create:
  - A home page route with simple placeholder content explaining the purpose of the site.
  - At least one example work or blog detail page with static HTML content.
- Introduce a central configuration module for policy values, even if it is very small at this stage.

#### Mode of Operation for Phase 1

- **Step 1: Read and summarize**  
  - The AI must read this entire document, then re-read the Phase 1 section and summarize the expected outcome in its own words to the user.
- **Step 2: Propose a low-level plan**  
  - The AI must propose a clear, low-level implementation plan for Phase 1 only.  
  - The plan should include:
    - The list of files and folders it intends to create or modify.
    - The main responsibilities of each file or module.
    - Any configuration or policy values it plans to define in the central configuration module.
  - The AI should also propose a file name pattern for the detailed Phase 1 plan, using the format: `feature-phase-1-scaffolding-PLAN-NAME.md` (for example, `feature-phase-1-scaffolding-basic-setup.md`).
- **Step 3: Create a plan file (documentation only)**  
  - After the user approves the low-level plan, the AI should create the plan file inside an appropriate `docs/` subfolder or another agreed documentation folder.
  - The plan file must contain:
    - A restatement of the high-level goal for Phase 1.
    - A checklist of tasks with descriptive names (no abbreviations).
    - A brief testing note for each task that explains how to verify that the task has been completed correctly.
    - Any assumptions or open questions for the user.
  - The AI must not create or modify any application code in this step.
- **Step 4: Wait for implementation approval**  
  - The AI must explicitly ask the user for approval before starting any implementation.
  - The AI must not start creating or changing application code for Phase 1 until the user clearly approves the plan and explicitly grants permission to implement.

### Phase 2: Token-Based Design System

**Goal**: Make the design easy to change through design tokens and reusable components.

- Expand the Tailwind configuration to define:
  - Color tokens (primary, secondary, background, text, accents).
  - Typography tokens (font families, font sizes, line heights).
  - Spacing and sizing scale (margin, padding, gaps).
  - Breakpoints for responsive design.
- Build small reusable components that use these tokens, such as:
  - Layout components (for example, `PageLayout`, `Header`, `Footer`).
  - Content components (for example, `Section`, `Card`, `Tag`).
  - Typography components (for example, `PageTitle`, `SectionTitle`, `BodyText`), if helpful.
- Ensure that changing tokens in Tailwind (and any small theme-related configuration) is enough to significantly change the visual style without rewriting components.

#### Mode of Operation for Phase 2

- **Step 1: Re-read Phase 2 and summarize**  
  - The AI must re-read the Phase 2 description and summarize the design system goals to the user.
- **Step 2: Propose a low-level plan**  
  - The AI must propose a low-level implementation plan focused only on Phase 2.  
  - The plan should cover:
    - The exact Tailwind configuration changes it intends to make.
    - The set of reusable components it plans to create or extend.
    - How these components will use the design tokens.
  - The AI must propose a plan file name following this pattern: `feature-phase-2-design-system-PLAN-NAME.md` (for example, `feature-phase-2-design-system-core-tokens.md`).
- **Step 3: Create a plan file (documentation only)**  
  - After the user approves the low-level plan, the AI should create the corresponding plan file in the documentation area.
  - The plan file should include:
    - A clear list of design tokens to introduce or refine.
    - The list of components to implement, with a one-sentence description for each.
    - A brief testing note for each planned change, describing how to visually or functionally verify that the tokens and components behave as expected.
    - Any constraints or preferences from the user about visual style or complexity.
  - The AI must not change any application code at this step.
- **Step 4: Wait for implementation approval**  
  - The AI must request explicit user approval before making any Tailwind or component code changes.
  - The AI must not start implementation work for Phase 2 until the user authorizes it.

### Phase 3: First Real Pages and Basic Search

**Goal**: Replace placeholders with real content and add simple search.

- Implement a real home page that:
  - Introduces the person clearly.
  - Highlights a small number of key pieces of work or posts.
- Implement at least one real detail page for a specific project or article as static HTML in a React component.
- Create a central content definition module (for example, `content/workItems`) that:
  - Exposes an array of content items with fields such as title, slug, tags, and summary.
  - Is used by both the pages and the search module.
- Implement a basic client-side search:
  - A search box component that allows typing a query.
  - A search module that matches the query against titles, tags, and descriptions from the central content definition.
  - A simple results list that links to the relevant pages.
- Keep search configuration (such as maximum results and minimum query length) inside the central configuration module.

#### Mode of Operation for Phase 3

- **Step 1: Re-read Phase 3 and summarize**  
  - The AI must re-read the Phase 3 description and summarize the expected behavior of the real pages and search to the user.
- **Step 2: Propose a low-level plan**  
  - The AI must propose a focused low-level implementation plan for Phase 3 only.  
  - The plan should specify:
    - Which real pages will be implemented (for example, home page and one or more detail pages) and their main sections.
    - The structure of the central content definition module (fields, naming, and how it will be used).
    - The design of the search module (how queries are processed, what fields are searched, and how results are ranked or filtered).
  - The AI must propose a plan file name following this pattern: `feature-phase-3-content-and-search-PLAN-NAME.md` (for example, `feature-phase-3-content-and-search-initial-implementation.md`).
- **Step 3: Create a plan file (documentation only)**  
  - After the user approves the Phase 3 low-level plan, the AI should create the plan file in the documentation area.
  - The plan file should include:
    - A structured list of pages and their main content sections.
    - The content item schema (for example, title, slug, tags, summary, and any other fields).
    - The search behavior, including configuration values that will live in the central configuration module.
    - A brief testing note for each page and search-related task, explaining how to confirm that content is displayed correctly and search results are accurate and relevant.
  - The AI must not implement pages or search logic at this step.
- **Step 4: Wait for implementation approval**  
  - The AI must explicitly ask the user for permission to implement Phase 3.
  - The AI must not start coding or modifying page or search logic until the user clearly approves the plan and gives permission to proceed.

## How Another AI Should Use This Document

- Treat this document as the high-level source of truth for:
  - Project goals
  - Allowed technologies
  - Naming and configuration conventions
  - The order and scope of phases
- Before making changes, the AI should:
  - Respect the phase boundaries (do not introduce a CMS or Markdown in early phases).
  - Keep naming descriptive and avoid new abbreviations.
  - Add or update policy-like values only through the central configuration module.
- When extending the system (for example, adding new pages or components), the AI should:
  - Reuse the design system and existing layout components.
  - Add to the content model and search configuration instead of duplicating logic.


