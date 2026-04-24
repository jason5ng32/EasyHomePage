# EasyHomePage Optimization Plan

Last updated: 2026-04-24

This document is the long-term source of truth for the EasyHomePage optimization work. When starting a new Codex session, read this file and `project-docs/optimization-progress.md` before making changes.

Note: this file intentionally lives under `project-docs/` instead of `docs/` because the current Vite build output directory is `docs/`.

## Goals

- Keep the core value of the project: a personal homepage generated from Markdown files and static assets.
- Modernize the UI from Bootstrap to Tailwind CSS and shadcn-vue style components.
- Make configuration friendly for non-developer users.
- Add internationalization without making Markdown authoring harder.
- Preserve static deployment through Vite build output and GitHub Pages.

## Current Architecture Summary

- Framework: Vue 3 + Vite.
- Content source: Markdown files under `contents/`.
- Markdown pipeline: `vite-plugin-markdown` with `markdown-it`.
- UI stack: Bootstrap 5, Bootstrap Icons, scoped component CSS, and global CSS in `src/style.css`.
- Deployment: `npm run build` outputs to `docs/`; GitHub Actions copies that build output to the `gh-pages` branch.
- Main limitation: configuration, section order, content schema, analytics, metadata, and some personal details are spread across Vue files, Markdown frontmatter, and `index.html`.

## Phase 1: UI Foundation Migration

Objective: Replace Bootstrap as the UI foundation with Tailwind CSS, shadcn-vue style components, and a modern design token system while preserving existing behavior.

### Task Checklist

- [ ] Install and configure Tailwind CSS for the existing Vite + Vue project.
- [ ] Initialize shadcn-vue configuration for the project.
- [ ] Add a minimal set of base UI components:
  - [ ] Button
  - [ ] Card
  - [ ] Badge
  - [ ] Tabs
  - [ ] Sheet or Drawer for mobile navigation
  - [ ] Separator
  - [ ] Avatar
  - [ ] Tooltip if needed for icon-only actions
  - [ ] Sonner or equivalent toast component
- [ ] Replace Bootstrap Icons with a Vue-friendly icon library, preferably `lucide-vue-next`.
- [ ] Remove Bootstrap JavaScript usage from `src/main.js`.
- [ ] Replace Bootstrap Toast usage in pricing interactions.
- [ ] Replace Bootstrap grid classes with Tailwind layout utilities.
- [ ] Replace Bootstrap navbar and collapse behavior with Vue state and shadcn-vue components.
- [ ] Move global design tokens into Tailwind/theme CSS variables.
- [ ] Add built-in theme presets in the global stylesheet.
  - [ ] Provide 4-5 color schemes for users to choose from.
  - [ ] Use semantic CSS variables such as `--background`, `--foreground`, `--primary`, `--secondary`, `--accent`, `--muted`, `--border`, and `--ring`.
  - [ ] Ensure presets support shadcn-vue/Tailwind token usage instead of hardcoded component colors.
  - [ ] Keep the structure ready for user-defined custom colors later.
- [ ] Add dark mode support through semantic CSS variables.
  - [ ] Follow the user's system color-scheme preference.
  - [ ] Do not add manual light/dark mode controls.
  - [ ] Do not expose URL parameters or config that manually override light/dark mode.
- [ ] Replace the old Bootstrap-era visual structure with a modern personal-homepage-first design.
- [ ] Verify desktop and mobile layouts in browser.
- [ ] Verify production build still succeeds.

### Acceptance Criteria

- `bootstrap` and `bootstrap-icons` are no longer required by the application UI.
- No component relies on `data-bs-*` attributes or Bootstrap JavaScript.
- The page remains usable on mobile and desktop.
- The homepage still builds into static assets suitable for GitHub Pages.

## Phase 2: Configuration And Content Model

Objective: Move user-facing configuration out of Vue code and into content/config files, then centralize Markdown loading and schema handling.

### Task Checklist

- [ ] Add a user-facing site configuration file, likely `contents/site.config.yaml`.
- [ ] Decide and document the config format. YAML is preferred for readability.
- [ ] Move these values into config:
  - [ ] Site name
  - [ ] Site title
  - [ ] Site description
  - [ ] Author name
  - [ ] Logo/avatar paths
  - [ ] Favicon path
  - [ ] Default locale
  - [ ] Available locales
  - [ ] Section order
  - [ ] Section enabled/disabled state
  - [ ] Theme color or theme preset
  - [ ] Optional custom color tokens that can override a built-in theme preset
  - [ ] Birthday or age/version display settings
  - [ ] Analytics provider and measurement ID
  - [ ] Social links
- [ ] Normalize frontmatter field names across Markdown files.
  - [ ] Prefer lower camel case, for example `title`, `subtitle`, `badge`, `date`, `cover`, `tags`.
  - [ ] Avoid mixed `Title` and `title` conventions.
- [ ] Add a content loading layer under `src/content/`.
  - [ ] Load site config.
  - [ ] Load section index Markdown.
  - [ ] Load section item Markdown.
  - [ ] Resolve image asset paths.
  - [ ] Sort items consistently by `order` or `date`.
  - [ ] Apply defaults for optional fields.
- [ ] Add schema validation or runtime guards for common content mistakes.
- [ ] Refactor section components to receive normalized data instead of importing Markdown directly.
- [ ] Document the content authoring rules in README or a dedicated docs file.

### Acceptance Criteria

- A non-developer can change common site settings without editing `src/`.
- Section order and visibility are configurable.
- Built-in theme presets and custom color overrides are configurable from content/config files.
- Content schema is documented and consistent.
- Components are less coupled to the physical `contents/` file layout.

## Phase 3: Internationalization

Objective: Support multiple languages while keeping the Markdown-driven authoring workflow simple.

### Recommended Direction

Use a hybrid model:

- Markdown content lives under locale-specific directories.
- Small UI strings use a lightweight i18n dictionary.

Suggested structure:

```text
contents/
  zh-CN/
    site.config.yaml
    introduce.md
    products/
  en-US/
    site.config.yaml
    introduce.md
    products/
```

### Task Checklist

- [ ] Choose the i18n runtime approach.
  - [ ] Option A: Vue I18n for UI strings.
  - [ ] Option B: Small custom dictionary if UI strings remain minimal.
- [ ] Restructure `contents/` into locale folders.
- [ ] Add locale-aware content loading.
- [ ] Add locale fallback behavior.
- [ ] Add language switcher UI.
- [ ] Update routing or URL strategy.
  - [ ] `/` maps to default locale.
  - [ ] `/{locale}/` renders a selected locale.
- [ ] Update `html lang` dynamically or at build/runtime entry.
- [ ] Update document title and meta description per locale.
- [ ] Ensure image assets can be shared or localized.
- [ ] Document how to add a new language.

### Acceptance Criteria

- The site can render at least Chinese and English content structures.
- Missing localized content fails gracefully or falls back predictably.
- Language switching works without breaking static hosting.
- SEO metadata is locale-aware.

## Phase 4: Visual Redesign And Template Polish

Objective: Turn the project from a personal one-off page into a polished, reusable homepage template.

### Task Checklist

- [ ] Redesign the page information architecture around reusable sections.
- [ ] Create modern section components:
  - [ ] Hero/Introduce
  - [ ] Conversations or testimonials
  - [ ] Abilities/features
  - [ ] Jobs/timeline
  - [ ] Products
  - [ ] Works/projects
  - [ ] Pricing/offers
  - [ ] Footer/contact
- [ ] Add section variants where useful.
  - [ ] Card grid
  - [ ] Timeline
  - [ ] Split feature
  - [ ] Quote/testimonial list
  - [ ] Product showcase
- [ ] Improve responsive layout with Tailwind breakpoints.
- [ ] Keep dark mode system-driven only.
- [ ] Improve typography, spacing, and section rhythm.
- [ ] Add empty states for disabled or missing sections.
- [ ] Improve image handling and aspect ratios.
- [ ] Add accessibility checks:
  - [ ] Keyboard navigation
  - [ ] Focus states
  - [ ] Landmark structure
  - [ ] Alt text
  - [ ] Contrast
- [ ] Update README with screenshots and template usage instructions.
- [ ] Add a starter content set separate from the original personal content if needed.

### Acceptance Criteria

- The first screen clearly presents the site owner or project.
- The page looks current and deliberate on desktop and mobile.
- Users can remove or reorder sections without layout breakage.
- The template feels reusable beyond the original author's personal homepage.

## Cross-Cutting Work

These items may happen during any phase.

- [ ] Keep GitHub Pages static deployment working.
- [ ] Keep build output behavior clear because the repository also uses `docs/` as build output.
- [ ] Consider changing build output from `docs/` to `dist/` to avoid conflict with project documentation.
- [ ] Add basic automated checks:
  - [ ] `npm run build`
  - [ ] Type or lint checks if introduced
  - [ ] Content validation script
- [ ] Preserve user content unless a migration is intentional and documented.
- [ ] Update docs whenever content schema or user workflow changes.

## Open Decisions

- [ ] Whether to keep build output as `docs/` or migrate to `dist/`.
- [ ] Whether to migrate the project from JavaScript to TypeScript.
- [ ] Whether to use Vue I18n or a smaller custom i18n helper.
- [ ] Whether original personal content should remain as sample content or move to an example profile.
- [ ] Whether to introduce a content validation library such as Zod.
- [x] The exact 4-5 built-in theme presets to ship. Phase 1 currently includes violet, graphite, ocean, forest, and rose.

## Working Rules For Future Sessions

- Read `project-docs/optimization-plan.md` and `project-docs/optimization-progress.md` before continuing optimization work.
- Read `project-docs/optimization-memory.md` before continuing optimization work if it exists.
- Update `project-docs/optimization-progress.md` after each meaningful change.
- Each phase follows this workflow:
  - Codex completes the phase implementation.
  - Codex performs self-checks before asking for user review.
  - The user reviews the phase.
  - If the user finds issues, Codex fixes them and re-runs relevant checks.
  - If the user approves the phase, create a commit for that phase.
- If the user says an issue pattern should be remembered, record the root cause and preferred solution in `project-docs/optimization-memory.md`.
- Update this plan when the strategy changes, not for every small implementation detail.
- Prefer incremental migrations that keep the site buildable after each phase.
