# AGENTS.md

> **Maintenance rules**: ≤ 80 lines; EasyHomePage-specific conventions only, do not repeat global profile / red / blue / grey lines; `<To be added>` indicates unconfirmed info, retrieve via reading code, checking [local-context.md](./local-context.md), or asking the user; every Never must pair with a Do; ending pointer to [local-context.md](./local-context.md) must be preserved.

### Project Positioning

EasyHomePage is a Markdown- and image-driven personal homepage template that enables non-technical users to quickly generate a modern, deployable static personal website by editing files in `site/`.

### Tech Stack

Vue 3.5 + Vite 8 + JavaScript + Pinia 4; Tailwind CSS 4 + shadcn-vue style local components; content layer uses `vite-plugin-markdown`, YAML frontmatter, `markdown-it`; icons via `@lucide/vue`, Drawer via `vaul-vue`, Toast via `vue-sonner`.

### Common Commands

- Package manager: pnpm (migrated from npm, lockfile is `pnpm-lock.yaml`)
- Install dependencies: `pnpm install`
- Dev server: `pnpm run dev`
- Run tests: `<To be added: no formal test suite yet>`
- Lint / Type check: `<To be added: no lint/typecheck script yet>`
- Production build: `pnpm run build` (Vite 8 requires Node 20.19+ / 22.12+; local Node 24 is compatible)

### Project-Specific Gotchas & Domain Terms

- Never: Do not turn rendered pages into EasyHomePage product showcases. Do: The page is primarily the user's personal website; put template docs in README.
- Never: Do not hardcode personal facts or section copy in Vue components. Do: Put them in `site/config.md` or `site/sections/*.md`.
- Never: Do not import Markdown directly inside section components. Do: Read normalized data via `@/content/site` and `@/content/sections`.
- Never: Do not add redundant fields that increase user burden. Do: Use array ordering when sequence suffices instead of adding an extra `order` field.
- Never: Do not scatter `bg-white/10`, `border-white/15`, or bare `rgb(...)`. Do: Use or extend semantic design tokens in `src/style.css`.
- Never: Do not add a manual dark mode toggle. Do: Dark mode follows system preferences only.
- Never: Do not introduce `sm:`, `lg:`, `xl:` breakpoints by default. Do: Use default mobile styles + `md:` unless there is a clear layout rationale.
- Never: Do not style all sections with identical card layouts. Do: Stories, Skills, Jobs, Products, Works, and Services must have distinct visual identities.
- Never: Do not treat `docs/` as source code. Do: Treat it strictly as build artifacts produced by `pnpm run build`.
- Never: Do not revert package manager to npm/yarn. Do: Consistently use pnpm (`pnpm install` / `pnpm run ...`), and configure `pnpm/action-setup` + setup-node `cache: pnpm` in CI workflows unless the user decides otherwise.
- Never: Do not continue relying on UA analytics code. Do: Use GA4 Measurement ID (`G-...`) for Google Analytics.
- Never: Do not rely solely on runtime metadata. Do: Inject title, description, favicon, loading copy, and analytics into HTML at Vite build time (with English fallback preferred).
- Never: Do not implement i18n with heavy external libraries or scattered key-value maps. Do: Adhere to Markdown-driven structure (`site/{lang}/`), treating content as language, with browser auto-detection and seamless hot-swapping.

### Git / PR Conventions

- `dev` is the user's integration branch; AI must not occupy, recreate, or linger on `dev`.
- When development is needed, synchronize from user's `dev`, then work in an independent branch or worktree.
- Run at least `pnpm run build` before delivering implementation changes; pure documentation changes can skip this.
- Evaluate whether to update README whenever content structure, theme config, deployment flow, or analytics settings change.

---

If [local-context.md](./local-context.md) exists at the workspace root, read and use it—it contains links to Knowledge Hub resources for this project (local machine only, not in git).
