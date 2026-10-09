import { defineConfig } from 'vite'
import dotenv from 'dotenv';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue'
import path from "path"
import fs from 'node:fs';
import { plugin as mdPlugin } from 'vite-plugin-markdown';
import MarkdownIt from 'markdown-it';
import matter from 'gray-matter';

dotenv.config();

const frontEndPort = parseInt(process.env.FRONTEND_PORT || 18772, 10);

const markdownIt = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

const markdownOptions = {
  mode: ['markdown', 'html'],
  markdown: (body) => {
    return markdownIt.render(body);
  },
};

const escapeHtml = (value = '') => {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

const getSiteConfig = () => {
  const rootDir = import.meta.dirname;

  // 1. Read global configuration
  const globalConfigPath = path.resolve(rootDir, 'site/config.md');
  const globalConfig = fs.existsSync(globalConfigPath)
    ? matter(fs.readFileSync(globalConfigPath, 'utf8')).data || {}
    : {};

  // 2. Determine default build locale
  let defaultLocale = 'en';
  const configuredLanguages = Array.isArray(globalConfig.languages)
    ? globalConfig.languages
    : [];

  const explicitDefault = configuredLanguages.find((l) => typeof l === 'object' && l.default)?.code;
  if (explicitDefault) {
    defaultLocale = explicitDefault;
  } else if (configuredLanguages.length > 0) {
    const first = configuredLanguages[0];
    defaultLocale = typeof first === 'string' ? first : (first?.code || 'en');
  } else {
    // If not declared, scan subdirectories
    const siteDir = path.resolve(rootDir, 'site');
    if (fs.existsSync(siteDir)) {
      const entries = fs.readdirSync(siteDir, { withFileTypes: true });
      const dirs = entries.filter((e) => e.isDirectory() && e.name !== 'assets').map((e) => e.name);
      if (dirs.includes('en')) {
        defaultLocale = 'en';
      } else if (dirs.length > 0) {
        defaultLocale = dirs[0];
      }
    }
  }

  // 3. Read locale-specific metadata
  const localePath = path.resolve(rootDir, `site/${defaultLocale}/locale.md`);
  const legacyLocalePath = path.resolve(rootDir, `site/${defaultLocale}/config.md`);

  let localeData = {};
  if (fs.existsSync(localePath)) {
    localeData = matter(fs.readFileSync(localePath, 'utf8')).data || {};
  } else if (fs.existsSync(legacyLocalePath)) {
    localeData = matter(fs.readFileSync(legacyLocalePath, 'utf8')).data || {};
  }

  return {
    site: {
      title: 'EasyHomePage',
      description: 'Markdown-driven personal homepage.',
      loadingTitle: 'Loading Homepage',
      loadingDescription: 'Getting everything ready...',
      language: defaultLocale,
      ...(globalConfig.site || {}),
      ...(localeData.site || {}),
    },
    brand: {
      favicon: 'favicon.ico',
      ...(globalConfig.brand || {}),
      ...(localeData.brand || {}),
    },
  };
};

const siteMetadataPlugin = () => {
  return {
    name: 'easy-homepage-site-metadata',
    transformIndexHtml(html) {
      const config = getSiteConfig();
      const site = config.site || {};
      const brand = config.brand || {};

      const language = escapeHtml(site.language || 'en');
      const title = escapeHtml(site.title || 'EasyHomePage');
      const description = escapeHtml(site.description || 'Markdown-driven personal homepage.');
      const favicon = escapeHtml(brand.favicon || 'favicon.ico');
      const loadingTitle = escapeHtml(site.loadingTitle || 'Loading Homepage');
      const loadingDescription = escapeHtml(site.loadingDescription || 'Getting everything ready...');

      return html
        .replace(/<html lang="[^"]*">/, `<html lang="${language}">`)
        .replace(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${description}" />`)
        .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
        .replace(/<link rel="icon" href="[^"]*"\s*\/?>/, `<link rel="icon" href="${favicon}">`)
        .replace(/<strong class="jn-loading-title">.*?<\/strong>/, `<strong class="jn-loading-title">${loadingTitle}</strong>`)
        .replace(/<p class="jn-loading-description">.*?<\/p>/, `<p class="jn-loading-description">${loadingDescription}</p>`);
    },
  };
};

export default defineConfig({
  base: './',
  plugins: [
    siteMetadataPlugin(),
    vue(),
    tailwindcss(),
    mdPlugin(markdownOptions)
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  build: {
    outDir: './docs',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        assetFileNames: (assetInfo) => {
          const assetName = assetInfo.names?.[0] || assetInfo.originalFileNames?.[0] || assetInfo.name || '';

          if (assetName.endsWith('.woff') || assetName.endsWith('.woff2')) {
            return 'fonts/[name][extname]';
          }

          return 'assets/[name]-[hash][extname]';
        },
      }
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    host: '0.0.0.0',
    port: frontEndPort,
  }
});
