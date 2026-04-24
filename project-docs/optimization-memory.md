# EasyHomePage Optimization Memory

Last updated: 2026-04-24

This file stores recurring project-specific lessons and issue-resolution patterns that the user explicitly asks Codex to remember.

## How To Use This File

- Add an entry only when the user asks that a problem and its solution should be remembered for future work.
- Keep entries concrete and actionable.
- Include the date, symptom, root cause, fix, and files or areas affected when useful.
- Read this file together with `project-docs/optimization-plan.md` and `project-docs/optimization-progress.md` before continuing optimization work.

## Entries

### 2026-04-24 - Responsive Style Scope

- Symptom: Too many breakpoint-specific utility classes (`sm`, `lg`, `xl`) and extra media queries make later visual tuning harder to maintain.
- Root cause: Component styles were being tuned at several viewport tiers even when the layout only needed mobile and non-mobile states.
- Fix: Define styles with a default mobile-first state, then use `md` as the standard non-mobile breakpoint. Add `sm`, `lg`, `xl`, or extra media queries only when there is a concrete layout need, and keep the reason obvious in the surrounding code.
- Applies to: Component templates, scoped CSS, section layouts, and future Tailwind class definitions.

### 2026-04-24 - Semantic Color Tokens

- Symptom: Component styles used local opacity colors such as `bg-white/10`, `border-white/15`, `text-white/65`, and per-component `rgb(...)` or `color-mix(...)` values.
- Root cause: Visual hierarchy was tuned inside individual components instead of being represented by reusable theme tokens.
- Fix: Define reusable semantic tokens in `src/style.css` first, then reference them from components with Tailwind token classes or CSS variables. Keep color mixing, opacity, and theme compatibility inside the global style layer.
- Applies to: Component colors, panel surfaces, card surfaces, tags, floating UI, shadows, and future theme customization.
