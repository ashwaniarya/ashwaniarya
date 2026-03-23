# Card Component Plan

## Goal

Create a reusable `Card` component that serves as a styled container for project previews, work items, and other content blocks. The component uses design tokens and follows SRP: it provides layout and styling only; content is composed by the caller.

## Context

- **Use cases**: ProjectCardGrid (Projects Section on homepage), work item listings, case study previews
- **Architecture**: Card is a content component per [docs/architechture.md](docs/architechture.md) Phase 2
- **Design tokens**: `backgroundPage`, `borderDefault`, `radiusMd`/`radiusLg`, `shadowSm`/`shadowMd`

## Component Design

### Responsibility

Card = **styled container**. It does not fetch data, render specific content (title, description, tags), or know about projects. Callers compose content using Typography components and other atoms.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `ReactNode` | Yes | Content to render inside the card |
| `href` | `string` | No | If provided, card renders as a link (wraps in Next.js `Link`) |
| `className` | `string` | No | Additional Tailwind classes for the container |

### Behavior

```
┌─────────────────────────────────────────────────────────┐
│  href?                                                   │
│    ├── Yes → <Link href={href} className={...}>          │
│    │           {children}                                │
│    │         </Link>                                     │
│    └── No  → <div className={...}>                       │
│                {children}                                │
│              </div>                                      │
└─────────────────────────────────────────────────────────┘
```

### Visual Style (Design Tokens)

- **Background**: `bg-backgroundPage`
- **Border**: `border border-borderDefault`
- **Radius**: `rounded-lg` (uses `--radius-lg`)
- **Shadow**: `shadow-sm` (subtle elevation)
- **Padding**: `p-6` (consistent internal spacing)
- **Hover** (when `href` present): `hover:border-accentPrimary/50 hover:shadow-md transition-colors transition-shadow`

### File Location

```
app/components/content/Card.tsx
```

Content components live in `app/components/content/` to separate from layout (`layout/`) and feature-specific (`homepage/`).

## Usage Examples

### Static card (div)

```tsx
<Card>
  <Heading level="h3">Project Title</Heading>
  <BodyText size="sm" className="mt-2">Short description.</BodyText>
</Card>
```

### Link card (project preview)

```tsx
<Card href="/work/example-case-study">
  <Heading level="h3">Example UX Case Study</Heading>
  <BodyText size="sm" className="mt-2">A realistic placeholder...</BodyText>
</Card>
```

## Policy Values

Card-specific policy (if needed) goes in `app/constants/policy.ts`:

| Key | Value | Purpose |
|-----|-------|---------|
| `cardPaddingClassName` | `"p-6"` | Internal padding |
| `cardMinWidthClassName` | `"min-w-0"` | Grid behavior (optional) |

Per YAGNI: start with hardcoded classes in the component. Extract to policy only if values need to change across the site.

## Implementation Checklist

- [ ] **Create `app/components/content/` directory**
  - **Test**: Directory exists; no runtime impact.

- [ ] **Implement `Card` component**
  - Renders `div` or `Link` based on `href`
  - Uses tokens: `bg-backgroundPage`, `border-borderDefault`, `rounded-lg`, `shadow-sm`, `p-6`
  - Hover styles when `href` is present
  - **Test**: Render Card with and without `href`; verify styles apply; no console errors.

- [ ] **Add Card to design system showcase page**
  - New section "Components" with Card examples (static + link)
  - **Test**: Visit `/design-system`; Card section renders; both variants visible.

- [ ] **Smoke test**
  - Use Card in a placeholder ProjectsSection or on the design system page
  - **Test**: `npm run build` succeeds; page renders correctly.

## Accessibility

- When `href` is present: use semantic `<a>` (via Link); ensure focus styles are visible
- When `div`: ensure interactive children (if any) are keyboard accessible
- Card itself is not focusable when used as a link wrapper—the link is focusable

## Diagram

```
  Page / Section (caller)
           |
           v
  +---------------------------+
  | Card (styled container)   |
  | props: children           |
  |        href?  className?  |
  +---------------------------+
           |
           v
         href?
        /     \
      yes      no
       |        |
       v        v
   Next.js    static
   Link        div
       \        /
        \      /
         v    v
  +---------------------------+
  | Design tokens (Tailwind)  |
  | bg-backgroundPage         |
  | border-borderDefault      |
  | rounded-lg, shadow-sm     |
  +---------------------------+
```

## Notes

- **SRP**: Card = container. No CardHeader, CardBody subcomponents unless a clear need emerges.
- **YAGNI**: Single variant (default). Add "elevated" or "compact" only when a second use case requires it.
- **Composition**: Callers use `Heading`, `BodyText`, `Caption`, `Label` from the design system for content.
