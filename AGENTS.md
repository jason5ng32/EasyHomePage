# AGENTS.md

Single source of truth for anyone — human or AI — contributing to EasyHomePage.

This project is a Markdown-driven personal homepage template. Most users should be able to create their own homepage by editing content/config files under `site/`, without touching Vue source code.

## Overview

**EasyHomePage** is a static personal homepage template built with Vue 3, Vite, Tailwind CSS, and shadcn-vue style primitives.

The core product promise:

- Users edit Markdown, YAML frontmatter, and images.
- The app renders a polished personal homepage.
- The final site can be deployed as static files, especially to GitHub Pages.

This is not a backend app. It currently has no API layer, no database, no server-side rendering, and no full runtime i18n system.

## Stack

| Layer | Technology |
|---|---|
| Framework | Vue 3 (`<script setup>`, Composition API) |
| Build | Vite + `@vitejs/plugin-vue` |
| Content | `vite-plugin-markdown`, YAML frontmatter, `markdown-it` |
| Styling | Tailwind CSS v4 + semantic CSS variables in `src/style.css` |
| UI primitives | shadcn-vue copy-in style, built on `reka-ui` |
| Icons | `lucide-vue-next` |
| Mobile navigation | `vaul-vue` Drawer |
| Toast | `vue-sonner` |
| State | Pinia, currently minimal |
| Deployment output | `docs/`, for GitHub Pages |

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Start Vite dev server. Default port is `18772` unless `FRONTEND_PORT` is set. |
| `npm run build` | Production build into `docs/`. |
| `npm run preview` | Vite preview of the build output. |
| `npm run start` | Run `server.js` for serving the built site. |

There is no formal test suite right now. For implementation changes, run at least `npm run build` before handing off.

## Project Layout

```text
.
├── AGENTS.md
├── README.md
├── index.html
├── vite.config.js
├── package.json
│
├── site/                       User-editable source
│   ├── config.md               Global site config
│   ├── sections/               One Markdown file per homepage section
│   │   ├── introduce.md
│   │   ├── stories.md
│   │   ├── skills.md
│   │   ├── jobs.md
│   │   ├── products.md
│   │   ├── works.md
│   │   ├── services.md
│   │   └── footer.md
│   └── assets/                 User images and product screenshots
│
├── src/
│   ├── App.vue                 App shell; renders enabled sections in config order
│   ├── main.js                 App bootstrap, metadata, theme, analytics
│   ├── theme.js                Theme preset + custom token application
│   ├── style.css               Tailwind entry and design tokens
│   ├── content/                Config/content adapters and guards
│   ├── components/             Homepage sections and shared components
│   ├── components/ui/          shadcn-vue primitives
│   └── lib/                    Shared frontend helpers
│
├── docs/                       Ignored build output for GitHub Pages
├── project-docs/               Ignored local optimization notes and progress
└── ref/                        Ignored/reference material only
```

## Content Model

User-facing content lives in `site/`.

- `site/config.md` controls global metadata, navigation order, section visibility, brand images, theme preset, custom color tokens, analytics, and social links.
- `site/sections/*.md` controls section content. Each homepage section has one structured Markdown file.
- `site/assets/` stores images referenced by config or section Markdown.

### Frontmatter Style

Use lower camel case for content fields:

- Good: `title`, `subtitle`, `badge`, `openLabel`, `featuredLabel`, `heroStatValue`
- Avoid: `Title`, `Badge`, `OpenLabel`

For section item lists, prefer this shape:

```yaml
items:
  - title: 'Example'
    date: '2026'
    tags:
      - Tag
    content: |
      Markdown copy goes here.
```

### Sorting

- Jobs and Works sort by `date` descending.
- Products sort by year/date descending.
- Services and Stories keep author-defined order.
- The first Product is treated as the featured product after sorting.

### Navigation

`site/config.md` navigation controls both nav items and actual section rendering.

Known section IDs:

- `Introduce`
- `Stories`
- `Skills`
- `Jobs`
- `Products`
- `Works`
- `Services`
- `Footer`

Do not invent a new `id` without adding the corresponding section component and content adapter.

## Architecture Conventions

### JavaScript And Vue

- Use JavaScript only. Do not introduce TypeScript unless the user explicitly decides to migrate the project.
- Vue components use `<script setup>` and the Composition API.
- Use the `@` alias for imports from `src`, for example `@/content/sections`.
- Keep section components mostly presentational. Content loading, sorting, image resolution, defaults, and common guards belong in `src/content/`.

### Content Layer

- `src/content/site.js` is the adapter for global config and content asset paths.
- `src/content/sections.js` is the adapter for section Markdown.
- `src/content/guards.js` provides lightweight runtime warnings for common content mistakes.
- Do not import `site/sections/*.md` directly inside section components. Import normalized section data from `@/content/sections`.
- Do not hardcode user-facing personal facts in Vue files if they can reasonably live in `site/config.md` or a section Markdown file.

### Markdown Rendering

- Reuse helpers in `src/lib/markdown.js`.
- Use `renderContent` for raw Markdown strings.
- Use `formatListHtml` only when the Markdown plugin has already produced HTML.
- Avoid ad hoc string replacement in components when a shared Markdown helper can express the pattern.

## UI System

### shadcn-vue First

Before hand-rolling a common UI primitive:

1. Check `src/components/ui/`.
2. If no local primitive fits, check shadcn-vue patterns and copy in a compatible primitive if needed.
3. Only hand-roll Tailwind markup when the shape is truly section-specific.

Current local primitives include button, badge, card, drawer, sheet, separator, sonner, tabs, tooltip, and avatar.

### Design Tokens

Use semantic tokens from `src/style.css`.

Preferred classes include:

- `bg-background`, `text-foreground`
- `bg-card`, `text-card-foreground`
- `bg-muted`, `text-muted-foreground`
- `bg-primary`, `text-primary-foreground`
- `bg-accent`, `text-accent-foreground`
- `border`, `border-border`
- panel-specific tokens such as `bg-panel`, `text-panel-muted`, `bg-panel-card`

Do not scatter one-off opacity colors such as `bg-white/10`, `border-white/15`, or raw `rgb(...)` component colors. Add or reuse semantic tokens in `src/style.css` instead.

Theme presets live in `src/style.css`; user selection and optional token overrides live in `site/config.md`.

Dark mode follows the operating system only. Do not add a manual dark-mode toggle, URL mode override, or config-driven light/dark switch.

### Responsive Rules

Default to one mobile-first style plus the `md` breakpoint.

- Use default classes for mobile.
- Use `md:` for the non-mobile layout.
- Avoid `sm:`, `lg:`, `xl:`, and extra media-query tiers unless there is a concrete layout reason.

This rule applies to page-level sections and custom components. Stock shadcn-vue primitives may still contain their own variant names or internal responsive classes.

### Visual Direction

This template should feel like a modern personal homepage, not a project documentation page and not a landing page explaining EasyHomePage itself.

Design priorities:

- Personal identity is the first-viewport signal.
- Content should feel editorial, confident, and polished.
- Keep whitespace intentional.
- Avoid fake marketing sections, project usage instructions inside the rendered homepage, or text that explains the template.
- Cards should have clear section-specific roles; avoid making every section feel visually identical.
- Use real images when imagery matters. Product screenshots should be framed with stable aspect ratios.

Do not preserve old Bootstrap-era UI patterns just because they existed before.

### Motion

- Use restrained motion that supports hierarchy.
- Respect `prefers-reduced-motion`.
- `ScrollReveal` is acceptable for page reveal effects, but do not apply it to hero content in a way that makes the first viewport appear empty.

## Accessibility

Keep the baseline accessibility polish intact:

- Preserve the skip link in `App.vue`.
- Keep `<main id="main-part" tabindex="-1">`.
- Navigation needs an explicit `aria-label`.
- Icon-only links and buttons need `aria-label`.
- Decorative icons should use `aria-hidden="true"`.
- Images need useful `alt` text; if an image is content, the `alt` should identify it.
- Custom focus styles must be visible.
- Do not remove keyboard usability while improving visuals.

## Internationalization Scope

Full runtime i18n is intentionally out of scope for now.

Rationale:

- Most visible copy is user-authored Markdown or config.
- A user can author the whole site in one language by editing `site/`.
- `site.site.language`, title, and description already drive basic metadata.

Do not add Vue I18n, locale routing, language switchers, or locale folder restructuring unless the user explicitly reopens the i18n decision.

## Testing And Verification

- Run `npm run build` before handing off implementation changes.
- For visual changes, the user prefers to inspect the UI locally. Do not default to Playwright screenshots for routine layout review.
- Use browser automation only when debugging a concrete interaction/layout issue or when the user asks for it.
- If a change affects content authoring, verify that a malformed but common input fails gracefully or produces a clear `[EasyHomePage content]` warning.

## Git And Workflow

- Work on `dev` unless the user gives a different branch instruction.
- Do not commit without explicit user approval.
- The expected flow is: AI edits, AI self-checks, user reviews, user requests fixes if needed, user approves commit, AI commits.
- One concern per commit. Do not bundle unrelated work.
- Preserve user changes. If the worktree is dirty, inspect before editing and do not revert changes you did not make.
- `project-docs/` is intentionally ignored and local-only. Keep progress/memory there when useful, but do not stage it.
- `docs/` is build output and ignored.
- `ref/` is reference material. Do not treat it as product source unless the user explicitly asks.

## Documentation

- Keep `README.md` focused on non-technical users configuring their own homepage.
- If content schema, directory structure, theme config, or deployment workflow changes, update README in the same change unless the user explicitly wants docs deferred.
- Keep `AGENTS.md` current when project conventions change.

## Current Product Decisions

- Use `site/` as the user-facing content/config/assets directory.
- Keep the original personal content as the default sample content for now.
- Use single-file Markdown per section.
- Use config-driven section order and visibility.
- Use built-in theme presets plus optional custom semantic color tokens.
- Keep dark mode system-driven only.
- Skip screenshots in README for now.
