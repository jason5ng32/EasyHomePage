import { defineConfig } from 'vite'
import dotenv, { parse } from 'dotenv';
import vue from '@vitejs/plugin-vue'
import path from "path"
import { plugin as mdPlugin } from 'vite-plugin-markdown';
import MarkdownIt from 'markdown-it';


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


export default defineConfig({
  base: './',
  plugins: [
    vue(),
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
          if (assetInfo.name.endsWith('.woff') || assetInfo.name.endsWith('.woff2')) {
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
