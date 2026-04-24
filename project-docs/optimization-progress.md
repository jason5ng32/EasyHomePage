# EasyHomePage Optimization Progress

Last updated: 2026-04-24

This document tracks execution status, decisions, blockers, and next steps. It should be updated after every meaningful optimization session.

Note: this file intentionally lives under `project-docs/` instead of `docs/` because the current Vite build output directory is `docs/`.

## Current Status

Overall status: Phase 1 redesign revision self-checked and ready for user review.

Current phase: Phase 1 - UI foundation migration plus visual redesign revision, pending user review.

## Progress Checklist

### Phase 0: Planning

- [x] Scan existing project architecture.
- [x] Identify current UI stack and Bootstrap dependency points.
- [x] Identify configuration hardcoding and content schema issues.
- [x] Agree on a four-phase optimization plan.
- [x] Create long-term project tracking files.
- [x] Document the phase review and commit workflow.
- [x] Create a project memory file for recurring issue patterns.

### Phase 1: UI Foundation Migration

- [x] Install Tailwind CSS.
- [x] Initialize shadcn-vue.
- [x] Add base UI components.
- [x] Add 4-5 built-in theme presets with semantic Tailwind/shadcn-compatible CSS variables.
- [x] Add system-driven dark mode variable support.
- [x] Replace Bootstrap layout classes.
- [x] Replace Bootstrap JavaScript behavior.
- [x] Replace Bootstrap Icons.
- [x] Verify responsive layout.
- [x] Verify production build.
- [x] Apply a full modern visual redesign instead of preserving the old Bootstrap-era layout.

### Phase 2: Configuration And Content Model

- [ ] Add `contents/site.config.yaml` or equivalent.
- [ ] Add config support for theme preset selection and optional custom color overrides.
- [ ] Move common user settings out of Vue files.
- [ ] Normalize Markdown frontmatter.
- [ ] Add centralized content loading.
- [ ] Add schema validation or runtime guards.
- [ ] Refactor section components to consume normalized data.
- [ ] Update content authoring documentation.

### Phase 3: Internationalization

- [ ] Choose i18n runtime approach.
- [ ] Restructure content into locale folders.
- [ ] Add locale-aware content loading.
- [ ] Add locale fallback behavior.
- [ ] Add language switcher.
- [ ] Add locale-aware title/meta/lang handling.
- [ ] Document how to add a new language.

### Phase 4: Visual Redesign And Template Polish

- [ ] Redesign major sections.
- [ ] Add reusable section/block components.
- [ ] Improve responsive behavior.
- [ ] Keep dark mode system-driven only.
- [ ] Improve accessibility.
- [ ] Add empty states.
- [ ] Update README and usage docs.
- [ ] Decide whether to include starter content separate from original personal content.

## Architecture Findings

- The app is a Vue 3 + Vite single page site.
- `contents/` is the user-facing content directory.
- Markdown is imported directly inside section components with `vite-plugin-markdown`.
- Section components currently own their own data loading, sorting, image resolution, and HTML post-processing.
- Bootstrap is imported globally in `src/style.css`.
- Bootstrap JavaScript is imported in `src/main.js`.
- Bootstrap Toast is used directly in `src/components/Pricing.vue`.
- Bootstrap Icons are used across multiple components and content files.
- Navigation labels are read from `contents/nav.md`, but the section list and order are hardcoded in `src/components/Nav.vue`.
- Birthday/version logic is hardcoded in `src/components/Nav.vue`.
- Google Analytics measurement ID is hardcoded in `src/main.js`.
- HTML language, title, description, loading text, and icons are hardcoded in `index.html`.
- Build output currently goes to `docs/`, which may conflict with project documentation files.

## Decisions

- Use project Markdown files as the long-term progress tracker.
- Keep Codex plan mode for short-running execution only.
- Prefer shadcn-vue over a React rewrite because the project is already Vue 3.
- Preserve Markdown-driven authoring and static deployment as core product constraints.
- Use a staged migration rather than a full rewrite.
- Store optimization tracking files in `project-docs/` because `docs/` is currently ignored and used as Vite build output.
- Phase 1 should include several built-in color themes in the global stylesheet; Phase 2 should expose theme selection and custom colors through user-facing config.
- Dark mode should be supported at the theme-token level and must follow the operating system preference only. Do not add manual light/dark controls, URL overrides, or config-driven mode switching.
- Each phase should be self-checked by Codex, reviewed by the user, and committed only after approval.
- Recurring issue patterns requested by the user should be recorded in `project-docs/optimization-memory.md`.
- For component styling, prefer a default mobile-first state plus the `md` breakpoint. Avoid adding `sm`, `lg`, `xl`, or extra breakpoint tiers unless the layout genuinely needs them.
- Phase 1 should not preserve the old Bootstrap-era UI structure. Since the project is moving to shadcn-vue/Tailwind, the homepage should receive a more modern and higher-taste visual redesign now.
- UI review should primarily rely on the user's local visual inspection. Codex should avoid Playwright screenshots unless debugging a concrete interaction or layout issue.
- `shadcn-vue@latest` currently exposes `vega`, `nova`, `maia`, `lyra`, `mira`, and `luma` presets/styles, but not React shadcn's `new-york` style. Use shadcn-vue/reka components and emulate the desired new-york-like visual language through tokens and local styling instead of forcing a framework rewrite.

## Open Questions

- Should build output remain `docs/`, or should it move to `dist/` to avoid overwriting documentation?
- Should the codebase migrate to TypeScript while adding content schemas?
- Should the i18n layer use Vue I18n or a lightweight local dictionary?
- Should original personal content remain the default sample content?
- Should content validation use Zod or simple custom guards?

## Next Step

User reviews the revised Phase 1 UI. If approved, create a Phase 1 commit. If issues are found, fix them and re-run `npm run build`.

## Session Log

### 2026-04-24

- Scanned the existing project.
- Confirmed the app is Vue 3 + Vite with Markdown-driven content.
- Identified Bootstrap, configuration, and i18n limitations.
- Created `project-docs/optimization-plan.md`.
- Created `project-docs/optimization-progress.md`.
- Added the requirement for built-in theme presets and future user-defined color customization.
- Added the phase review/commit workflow.
- Created `project-docs/optimization-memory.md`.
- Implemented Phase 1 UI foundation migration.
- Added Tailwind CSS v4, shadcn-vue configuration, shadcn-vue UI components, lucide icons, and vue-sonner.
- Removed Bootstrap and Bootstrap Icons from application dependencies and source imports.
- Replaced Bootstrap-driven layout, navigation, card, badge, icon, tabs, and toast usage in the current section components.
- Added five semantic theme presets in `src/style.css`: violet, graphite, ocean, forest, and rose.
- Self-checks completed:
  - `npm run build` passes.
  - Browser console reports no warnings or errors during checked flow.
  - Desktop viewport has no horizontal overflow.
  - Mobile viewport horizontal overflow was found and fixed by adding `min-w-0` behavior to section grids and tabs.
  - Mobile navigation sheet opens and closes.
  - Pricing toast action works.
- User review feedback:
  - Do not preserve the old UI and interaction structure just because the existing app used it.
  - Make Phase 1 a real modern visual redesign now that shadcn-vue/Tailwind is in place.
  - Avoid Playwright screenshots for routine UI review because the user can inspect UI faster locally.
  - Check whether `new-york` is viable; current `shadcn-vue@latest` CLI does not expose `new-york`, so use shadcn-vue components with a new-york-like local visual direction.
- Revised Phase 1 after feedback:
  - Reworked the UI into a more decisive modern editorial/template design instead of preserving the old section layout.
  - Rebuilt the hero, navigation, conversation wall, capabilities, jobs timeline, product bento, works index, pricing cards, and footer.
  - Changed the default theme to a higher-contrast graphite theme while keeping violet, ocean, forest, and rose presets available.
  - Added dark mode token support that follows `prefers-color-scheme`; color theme preview remains available through `?theme=graphite|violet|ocean|forest|rose`.
  - Added stable media frame styles for product imagery and adjusted section anchor offsets around the fixed navigation.
  - Routine Playwright screenshot review was skipped per user preference.
  - `npm run build` passes after the redesign revision.
  - Bootstrap reference scan still reports no source or dependency usage.
- Latest user review feedback:
  - Dark mode must follow the system only, with no manual switcher or URL mode override.
  - The page must read as a personal homepage, not as a project showcase or template usage page.
  - Jobs timeline dots were visibly misaligned.
  - The Products featured image offset was directionally good, but the enlarged image treatment created excess blank space because all product images share the same dimensions.
  - The bottom copyright footer is unnecessary.
- Applied latest feedback:
  - Removed manual dark-mode URL handling and local mode storage from `src/theme.js`.
  - Removed project-showcase phrases from rendered UI copy, including `Markdown powered`, `Personal homepage kit`, and `Template promise`.
  - Reworked the Jobs timeline grid and dot positioning.
  - Reworked the Products bento layout so the featured image keeps an intentional offset without forcing a tall empty media area.
  - Simplified the intro Markdown copy so the first screen reads as a personal homepage instead of a page/about-template explanation.
  - Adjusted the mobile hero vertical alignment so the personal identity appears in the first viewport instead of being pushed too low.
  - Removed reveal animation from the hero content so the first viewport does not briefly render as an empty block.
  - Changed the app shell from `overflow-hidden` to horizontal-only clipping to avoid clipping vertical page behavior while still preventing horizontal overflow.
  - Removed the bottom copyright footer strip.
- Follow-up user review feedback:
  - Keep the Products featured image rotation on desktop, but remove artificial vertical staggering from the remaining product cards.
  - Make Works cards equal priority and equal size; this section should express chronology, not hierarchy.
  - Fix Pricing toast behavior.
  - Restore the Jobs left sticky interaction on desktop while the right timeline scrolls.
  - Restore the personal Hero copy that was removed too aggressively.
  - Replace Hero CTA buttons with one centered circular down-arrow link to the second section.
- Applied follow-up feedback:
  - Removed the artificial `translate-y` staggering from non-featured product cards while keeping the featured image rotation.
  - Removed Works card column-span differences and changed the desktop grid to equal cards.
  - Imported `vue-sonner/style.css` and moved the Toaster to `bottom-right` so the toast is visible and not covered by the fixed nav.
  - Removed reveal transform from the Jobs sticky column and kept it as `lg:sticky`.
  - Restored the Hero personal explanation and checklist in `contents/introduce.md`.
  - Removed the Hero product/work CTA buttons and added a centered circular arrow link to the second content section.
- Started post-Phase-1 user-driven structure refinements:
  - Renamed the former `Conversations` section to `Testimonials`.
  - Replaced the multi-file conversation content model with one structured `contents/testimonials.md` file.
  - The new testimonial cards support per-card Markdown body content, bullet lists, tags, display name, role, optional custom avatar, and optional Lucide icon key.
  - When no avatar is provided, the component chooses a stable Lucide icon fallback from card metadata.
  - Adjusted testimonial card styling so it reads as third-party quote content rather than generic content cards.
  - Removed repeated per-card `Testimonial` labels and removed the `year` field from the content schema.
  - Changed testimonial layout to a masonry-style column flow so varied text lengths create a more natural staggered rhythm.
  - Adjusted Testimonials to use one column by default and four masonry columns from the `md` breakpoint upward.
  - Recorded the default-plus-`md` responsive styling convention in `project-docs/optimization-memory.md`.
  - Replaced the Testimonials row-based grid with four independent desktop columns so later cards no longer wait for the tallest card in the previous row.
  - Expanded `contents/testimonials.md` to 12 sample items with mixed paragraph and bullet content for layout testing.
  - Renamed the section from `Testimonials` to `Stories`, including component name, content file, navigation item, anchor, and internal story-oriented class names.
  - Removed quote-style card decoration from the section so each card reads more like a story fragment than a testimonial quote.
  - Simplified the Stories content schema so each item only needs story content plus optional tags; removed `name`, `role`, `icon`, avatar rendering, and related icon fallback logic.
  - Renamed `Abilities` to `Skills` across component, navigation, and section anchor.
  - Merged the Skills content model into one `contents/skills.md` file instead of several per-skill Markdown files.
  - Reworked the Skills UI into a dark skill matrix with configurable skill items, tags, icons, and level bars.
  - Adjusted the Introduce section from forced `100svh` first-screen layout to content-driven vertical spacing, removing viewport-height constraints and negative bottom offset.
  - Added semantic color tokens for panel, story, intro, and section-label surfaces in `src/style.css`.
  - Replaced local opacity color usage in Skills, Stories, and Introduce with those semantic tokens.
  - Merged Jobs content into one `contents/jobs.md` file and updated `Jobs.vue` to read from the single structured content source.
  - Added shared Markdown rendering helpers in `src/lib/markdown.js` and reused them in Skills and Jobs for consistent list marker formatting.
  - Applied the Skills-style left-column Markdown typography to Jobs.
  - Merged Products content into one `contents/products.md` file and updated `Products.vue` to read from the single structured content source.
  - Reused the shared Markdown rendering helper for Products section copy and product descriptions.
  - Merged Works content into one `contents/works.md` file and updated `Works.vue` to read from the single structured content source.
  - Reused the shared Markdown rendering helper for the Works section introduction and item descriptions.
  - Renamed `Pricing` to `Services` across component, navigation item, section anchor, and content source.
  - Merged Services content into one `contents/services.md` file and removed the old `contents/pricing/*.md` content split.
  - Updated `Services.vue` to consume the single structured content source and keep the existing toast interaction.
  - Adjusted navigation anchor offsets to match the current fixed navigation height.
  - Added active-section highlighting to the navigation for both click scrolling and manual scrolling.
  - Replaced the mobile navigation `Sheet` with a shadcn-vue `Drawer` bottom sheet for smoother mobile navigation.
