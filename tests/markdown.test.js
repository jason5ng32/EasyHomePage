import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({ html: true, linkify: true });
const rootDir = process.cwd();
const siteDir = path.resolve(rootDir, 'site');

const knownThemePresets = ['graphite', 'violet', 'ocean', 'forest', 'rose'];
const expectedSectionFiles = [
  'introduce.md',
  'stories.md',
  'skills.md',
  'jobs.md',
  'products.md',
  'works.md',
  'services.md',
  'footer.md',
];
const knownSectionIds = [
  'Introduce',
  'Stories',
  'Skills',
  'Jobs',
  'Products',
  'Works',
  'Services',
  'Footer',
];

describe('Markdown files validation', () => {
  describe('Global Configuration (site/config.md)', () => {
    const configPath = path.resolve(siteDir, 'config.md');

    it('should exist and parse valid YAML frontmatter', () => {
      expect(fs.existsSync(configPath), 'site/config.md does not exist').toBe(true);
      const rawContent = fs.readFileSync(configPath, 'utf8');
      expect(() => matter(rawContent)).not.toThrow();
    });

    it('should validate brand configuration and ensure assets exist', () => {
      const { data } = matter(fs.readFileSync(configPath, 'utf8'));
      expect(data.brand, 'brand configuration is required in site/config.md').toBeDefined();
      expect(typeof data.brand.name).toBe('string');
      expect(data.brand.name.trim().length).toBeGreaterThan(0);

      // Verify asset files exist on disk
      if (data.brand.logo && !data.brand.logo.startsWith('http')) {
        const logoPath = path.resolve(siteDir, data.brand.logo);
        expect(fs.existsSync(logoPath), `Brand logo not found at: ${logoPath}`).toBe(true);
      }
      if (data.brand.avatar && !data.brand.avatar.startsWith('http')) {
        const avatarPath = path.resolve(siteDir, data.brand.avatar);
        expect(fs.existsSync(avatarPath), `Brand avatar not found at: ${avatarPath}`).toBe(true);
      }
    });

    it('should validate theme configuration', () => {
      const { data } = matter(fs.readFileSync(configPath, 'utf8'));
      expect(data.theme, 'theme configuration is required in site/config.md').toBeDefined();
      expect(knownThemePresets).toContain(data.theme.preset);
    });

    it('should configure at most 2 languages with valid structure', () => {
      const { data } = matter(fs.readFileSync(configPath, 'utf8'));
      expect(Array.isArray(data.languages), 'languages must be an array').toBe(true);
      expect(data.languages.length).toBeGreaterThanOrEqual(1);
      expect(data.languages.length).toBeLessThanOrEqual(2);

      data.languages.forEach((lang, idx) => {
        expect(typeof lang.code, `languages[${idx}].code is required`).toBe('string');
        expect(typeof lang.name, `languages[${idx}].name is required`).toBe('string');
        expect(typeof lang.short, `languages[${idx}].short is required`).toBe('string');
      });
    });

    it('should validate social links format', () => {
      const { data } = matter(fs.readFileSync(configPath, 'utf8'));
      if (data.socialLinks) {
        expect(Array.isArray(data.socialLinks)).toBe(true);
        data.socialLinks.forEach((link, idx) => {
          expect(link.name, `socialLinks[${idx}].name is required`).toBeDefined();
          expect(link.url, `socialLinks[${idx}].url is required`).toBeDefined();
          expect(link.icon, `socialLinks[${idx}].icon is required`).toBeDefined();
        });
      }
    });
  });

  describe('Locale & Section Markdown files', () => {
    const configPath = path.resolve(siteDir, 'config.md');
    const { data: globalData } = matter(fs.readFileSync(configPath, 'utf8'));
    const configuredLanguages = (globalData.languages || []).map((l) => (typeof l === 'string' ? l : l.code));

    configuredLanguages.forEach((langCode) => {
      describe(`Locale: ${langCode}`, () => {
        const langDir = path.resolve(siteDir, langCode);

        it(`should have a directory for ${langCode}`, () => {
          expect(fs.existsSync(langDir), `Directory not found for locale: ${langDir}`).toBe(true);
        });

        it(`should have a valid locale.md for ${langCode}`, () => {
          const localePath = path.resolve(langDir, 'locale.md');
          expect(fs.existsSync(localePath), `locale.md missing in ${langDir}`).toBe(true);

          const { data } = matter(fs.readFileSync(localePath, 'utf8'));
          expect(data.site, 'site object missing in locale.md').toBeDefined();
          expect(typeof data.site.title).toBe('string');
          expect(data.site.title.trim().length).toBeGreaterThan(0);
          expect(typeof data.site.description).toBe('string');

          // Verify navigation items
          expect(Array.isArray(data.navigation?.items), 'navigation.items must be an array').toBe(true);
          data.navigation.items.forEach((item, idx) => {
            expect(knownSectionIds, `Unknown section ID: ${item.id} in navigation.items[${idx}]`).toContain(item.id);
            expect(typeof item.label, `Label missing in navigation.items[${idx}]`).toBe('string');
            expect(item.label.trim().length).toBeGreaterThan(0);
          });
        });

        it(`should contain all required section files in ${langCode}/sections`, () => {
          const sectionsDir = path.resolve(langDir, 'sections');
          expect(fs.existsSync(sectionsDir), `sections/ directory missing in ${langDir}`).toBe(true);

          expectedSectionFiles.forEach((filename) => {
            const filePath = path.resolve(sectionsDir, filename);
            expect(fs.existsSync(filePath), `Missing section file: ${filePath}`).toBe(true);

            // Verify matter parsing & markdown rendering
            const raw = fs.readFileSync(filePath, 'utf8');
            let parsed;
            expect(() => {
              parsed = matter(raw);
            }, `YAML parse error in ${filePath}`).not.toThrow();

            expect(() => {
              md.render(parsed.content || '');
            }, `Markdown render error in ${filePath}`).not.toThrow();
          });
        });

        it(`should validate specific section data structures in ${langCode}`, () => {
          const sectionsDir = path.resolve(langDir, 'sections');

          // 1. Stories
          const storiesData = matter(fs.readFileSync(path.resolve(sectionsDir, 'stories.md'), 'utf8')).data;
          if (storiesData.items) {
            expect(Array.isArray(storiesData.items)).toBe(true);
            storiesData.items.forEach((item, idx) => {
              expect(typeof item.content === 'string' && item.content.length > 0, `stories.items[${idx}].content is required in ${langCode}`).toBe(true);
            });
          }

          // 2. Skills
          const skillsData = matter(fs.readFileSync(path.resolve(sectionsDir, 'skills.md'), 'utf8')).data;
          if (skillsData.items) {
            expect(Array.isArray(skillsData.items)).toBe(true);
            skillsData.items.forEach((item, idx) => {
              expect(item.title, `skills.items[${idx}].title is required in ${langCode}`).toBeDefined();
              if (item.level !== undefined) {
                const lvl = Number(item.level);
                expect(lvl).toBeGreaterThanOrEqual(0);
                expect(lvl).toBeLessThanOrEqual(100);
              }
            });
          }

          // 3. Jobs
          const jobsData = matter(fs.readFileSync(path.resolve(sectionsDir, 'jobs.md'), 'utf8')).data;
          if (jobsData.items) {
            expect(Array.isArray(jobsData.items)).toBe(true);
            jobsData.items.forEach((item, idx) => {
              expect(item.title, `jobs.items[${idx}].title is required in ${langCode}`).toBeDefined();
              expect(item.company, `jobs.items[${idx}].company is required in ${langCode}`).toBeDefined();
            });
          }

          // 4. Products (ensure covers exist in site/assets/products/)
          const productsData = matter(fs.readFileSync(path.resolve(sectionsDir, 'products.md'), 'utf8')).data;
          if (productsData.items) {
            expect(Array.isArray(productsData.items)).toBe(true);
            const productAssetsDir = path.resolve(siteDir, 'assets/products');
            productsData.items.forEach((item, idx) => {
              expect(item.title, `products.items[${idx}].title is required in ${langCode}`).toBeDefined();
              expect(item.cover, `products.items[${idx}].cover is required in ${langCode}`).toBeDefined();

              // Verify cover file exists
              const coverPath = path.resolve(productAssetsDir, item.cover);
              expect(fs.existsSync(coverPath), `Product cover not found: ${coverPath} in products.items[${idx}] (${langCode})`).toBe(true);
            });
          }

          // 5. Works
          const worksData = matter(fs.readFileSync(path.resolve(sectionsDir, 'works.md'), 'utf8')).data;
          if (worksData.items) {
            expect(Array.isArray(worksData.items)).toBe(true);
            worksData.items.forEach((item, idx) => {
              expect(item.title, `works.items[${idx}].title is required in ${langCode}`).toBeDefined();
            });
          }
        });
      });
    });
  });
});
