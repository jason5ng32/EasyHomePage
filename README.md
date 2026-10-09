# EasyHomePage

**English** | [简体中文](./README-zh.md)

EasyHomePage is a modern personal homepage template driven entirely by Markdown and images.

No complex frontend coding is required. Simply edit the Markdown files and images inside the `site/` directory to generate a sleek, responsive, and deployment-ready static personal portfolio or homepage.

---

## Core Design & Directory Structure

All user-specific content lives cleanly within the `site/` directory:

```text
site/
  config.md            # Global site-wide configuration (brand, theme, languages, social links, analytics, etc.)
  assets/              # Shared static assets (avatars, logos, project screenshots)
  en/                  # English content directory (folder name matches language code)
    locale.md          # English-specific metadata (title, description, navigation labels)
    sections/          # English section content (intro, stories, skills, experience, etc.)
  zh-CN/               # Simplified Chinese content directory
    locale.md          # Chinese-specific metadata
    sections/          # Chinese section content
```

---

## Quick Start

This project uses [pnpm](https://pnpm.io/) as the package manager.

```bash
# 1. Install dependencies
pnpm install

# 2. Start local development server
pnpm run dev

# 3. Run automated tests and Markdown validation
pnpm run test

# 4. Build for production (output to docs/)
pnpm run build
```

Open the URL shown in your terminal (typically `http://localhost:18772`) to preview changes with hot reloading.

---

## Single-Language vs Dual-Language Deployment

EasyHomePage supports **up to 2 languages** (any two languages in the world) and works out-of-the-box for single-language deployments:

### 1. Single-Language Deployment (Only one language needed)
If you only need a single language (e.g., pure English or pure Chinese):
1. In `site/config.md`, declare only that language under `languages` (or leave just one entry);
2. Keep only the corresponding language folder under `site/` (e.g., keep only `site/en/` and remove other language folders);
3. **The site automatically operates in single-language mode and hides the language switcher from both the navbar and mobile drawer.**

### 2. Dual-Language Deployment (Bilingual mode)
1. Configure 2 languages under `languages` in `site/config.md`, optionally marking one with `default: true` as the fallback language;
2. Maintain the corresponding two subdirectories under `site/` (e.g., `en/` and `zh-CN/`, or any pair like `ja/` and `en/`);
3. On first visit, the site detects the visitor's browser language and displays the matching version (falling back to the default language if unmatched);
4. A compact toggle switch (e.g., `EN | 中`) is displayed on desktop and mobile drawer for seamless, zero-reload switching persisted in `localStorage`.

---

## Customization

### 1. Global Configuration (`site/config.md`)

Manage cross-language settings centrally without duplication:

- **Brand Assets (`brand`)**: `name`, `logo`, `avatar`, `favicon`.
- **Theme & Colors (`theme`)**: Preset options include `graphite`, `violet`, `ocean`, `forest`, `rose`. Dark mode automatically follows the visitor's system preferences.
- **Languages (`languages`)**: Specify `code`, display `name`, `short` label, and `default: true`. Supports up to 2 languages.
- **Social Profiles (`socialLinks`)**: Configure external profile links (supports `github`, `twitter`/`x`, `linkedin`, `instagram`, `envelope`, `rss`, `wikipedia`, etc.).
- **Analytics (`analytics`)**: Configure GA4 Measurement ID (`G-...`).

### 2. Localized Metadata & Navigation (`site/{lang}/locale.md`)

Configure copy and navigation labels specific to each language:

- **Site Copy (`site`)**: `title`, `description` (for SEO), `loadingTitle` / `loadingDescription` (initial loading overlay).
- **Navigation (`navigation.items`)**: Set the display `label` for each section. Reordering items reorganizes both the navbar and section order; set `enabled: false` to hide any section.

### 3. Section Content (`site/{lang}/sections/*.md`)

Each section is powered by a dedicated Markdown file with YAML frontmatter at the top:

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
