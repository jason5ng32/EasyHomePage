import { defineConfig } from 'vite'
import dotenv, { parse } from 'dotenv';
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
  mode: ['markdown','html'],
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
  const enConfigPath = path.resolve(__dirname, 'site/en/config.md');
  if (fs.existsSync(enConfigPath)) {
    return matter(fs.readFileSync(enConfigPath, 'utf8')).data || {};
  }

  const zhConfigPath = path.resolve(__dirname, 'site/zh-CN/config.md');
  if (fs.existsSync(zhConfigPath)) {
    return matter(fs.readFileSync(zhConfigPath, 'utf8')).data || {};
  }

  const legacyConfigPath = path.resolve(__dirname, 'site/config.md');
  if (fs.existsSync(legacyConfigPath)) {
    return matter(fs.readFileSync(legacyConfigPath, 'utf8')).data || {};
  }

  return {};
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
      "@": path.resolve(__dirname, "./src"),
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
})
