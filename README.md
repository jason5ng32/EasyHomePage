# EasyHomePage

**English** | [简体中文](./README-zh.md)

EasyHomePage is a modern personal homepage template driven entirely by Markdown and images.

No complex frontend coding is required. Simply edit the Markdown files and images inside the `site/` directory to generate a sleek, responsive, and deployment-ready static personal portfolio or homepage.

---

## Core Design & Directory Structure

All user-specific content lives cleanly within the `site/` directory:

```text
site/
  assets/              # Shared static assets (avatars, logos, project screenshots)
  en/                  # English content (default & fallback language)
    config.md          # Site info, branding, theme, navigation, social links
    sections/          # Section content (intro, stories, skills, experience, etc.)
  zh-CN/               # Simplified Chinese content
    config.md
    sections/
```

> **Backward Compatibility**: If you only need a single language, you can keep the root structure (`site/config.md` and `site/sections/*.md`). The app will automatically run in single-language mode and hide the language switcher.

---

## Quick Start

This project uses [pnpm](https://pnpm.io/) as the package manager.

```bash
# 1. Install dependencies
pnpm install

# 2. Start local development server
pnpm run dev

# 3. Build for production (output to docs/)
pnpm run build
```

Open the URL shown in your terminal (typically `http://localhost:18772`) to preview changes with hot reloading.

---

## Customization

### 1. Site Configuration & Navigation (`site/{lang}/config.md`)

Configure site metadata, brand identity, navigation items, and social accounts in `config.md`:

- **Site & Brand**: `site.title`, `site.description`, `brand.name`, `brand.avatar`, `brand.logo`, etc.
- **Navigation Ordering & Toggling**: Reordering items in `navigation.items` updates both the navbar order and section layout order. Set `enabled: false` to hide any section.
- **Social Links**: Configure profiles in `socialLinks` (supports icons like `github`, `twitter`/`x`, `linkedin`, `instagram`, `envelope`, `rss`, `wikipedia`, etc.).

### 2. Section Content (`site/{lang}/sections/*.md`)

Each section is powered by a dedicated Markdown file with YAML frontmatter at the top and standard Markdown content:

| Section File | Purpose | Key Content & Frontmatter |
| :--- | :--- | :--- |
| `introduce.md` | Hero introduction | Name, subtitle, hero metrics (`heroStat`) |
| `stories.md` | Narrative stories / vignettes | Story cards, narrative paragraphs, tag labels |
| `skills.md` | Skills and proficiencies | Skill items, proficiency levels (0–100), icons |
| `jobs.md` | Career history & experience | Company, role, time span, bullet points (top-aligned) |
| `products.md` | Featured products & projects | Screenshots, URLs, launch year, detailed highlights |
| `works.md` | Open source & side works | Project links, tech stack badges, short description |
| `services.md` | Advisory & consulting services | Pricing, service descriptions, inclusions & exclusions |
| `footer.md` | Closing note & contact callout | Parting thoughts, contact instructions |

### 3. Theme & Colors

Choose a built-in theme preset in `config.md`:

```yaml
theme:
  preset: 'graphite' # Options: graphite, violet, ocean, forest, rose
```

Dark mode automatically respects the visitor's operating system preferences.

---

## Internationalization (i18n)

1. **Auto-Discovery**: Built on the `site/{lang}/` structure. Adding a new language folder (such as `site/ja/`) is automatically recognized by the app with **zero code modifications**.
2. **Smart Detection & Fallback**: Visitors are automatically served their preferred browser language on first visit. If no match is found, it falls back seamlessly to English (`en`).
3. **Seamless Live Switcher**: A compact toggle button (`EN | 中`) is integrated in both the desktop navbar and mobile drawer. Switching languages updates the entire page instantly and remembers preference in `localStorage`.

---

## Deploy to GitHub Pages

1. Push your repository to GitHub.
2. In your repository, go to **Settings -> Pages**.
3. Under **Build and deployment -> Source**, select **GitHub Actions** (the repository includes an automated workflow), or select **Deploy from a branch** and choose the `gh-pages` branch.
4. Pushing code to `main` will automatically build and publish your site.

---

## FAQ

- **What happens if a section's content is empty?** The page renders a graceful empty-state placeholder card without breaking the layout.
- **How to customize styles or components?** Page components are located in `src/components/`, and global styling tokens and utilities are maintained in `src/style.css`.
