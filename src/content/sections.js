import { formatListHtml, renderContent, renderMarkdown } from '@/lib/markdown';
import { asArray, requireFields } from '@/content/guards';
import { fallbackLocale } from '@/content/site';

const productImages = import.meta.glob('/site/assets/products/*', { eager: true });

const multiSectionModules = import.meta.glob('/site/*/sections/*.md', { eager: true });
const legacySectionModules = import.meta.glob('/site/sections/*.md', { eager: true });

const sortByDateDesc = (items = []) => {
    return [...items].sort((a, b) => (a.date < b.date ? 1 : -1));
};

const sortByYearDesc = (items = []) => {
    return [...items].sort((a, b) => Number(b.date || 0) - Number(a.date || 0));
};

const resolveProductCover = (cover) => {
    const imagePathKey = Object.keys(productImages).find((key) => key.endsWith(`/${cover}`));
    return imagePathKey ? productImages[imagePathKey].default : cover;
};

// 获取特定语言的 section module
const getSectionModule = (sectionName, locale) => {
    const localizedPath = `/site/${locale}/sections/${sectionName}.md`;
    if (multiSectionModules[localizedPath]) {
        return multiSectionModules[localizedPath];
    }

    const fallbackPath = `/site/${fallbackLocale}/sections/${sectionName}.md`;
    if (multiSectionModules[fallbackPath]) {
        return multiSectionModules[fallbackPath];
    }

    const legacyPath = `/site/sections/${sectionName}.md`;
    if (legacySectionModules[legacyPath]) {
        return legacySectionModules[legacyPath];
    }

    return { attributes: {}, html: '' };
};

const buildSectionsForLocale = (locale) => {
    // 1. Introduce
    const introduceMod = getSectionModule('introduce', locale);
    const introduceAttributes = introduceMod.attributes || {};
    const introduceHtml = introduceMod.html || '';
    const introduce = {
        ...introduceAttributes,
        html: formatListHtml(introduceHtml, 'content-check'),
    };

    // 2. Stories
    const storiesMod = getSectionModule('stories', locale);
    const storiesAttributes = storiesMod.attributes || {};
    const stories = {
        ...storiesAttributes,
        items: asArray(storiesAttributes.items, `stories.items (${locale})`).map((item, index) => {
            const safeItem = item || {};
            requireFields(safeItem, ['content'], `stories.items[${index}]`);
            return {
                ...safeItem,
                tags: asArray(safeItem.tags, `stories.items[${index}].tags`),
                html: renderMarkdown(safeItem.content || ''),
            };
        }),
    };

    // 3. Skills
    const skillsMod = getSectionModule('skills', locale);
    const skillsAttributes = skillsMod.attributes || {};
    const skills = {
        ...skillsAttributes,
        descriptionHtml: renderContent(skillsAttributes.description || '', 'content-dot ml-4 mt-2 text-panel-muted'),
        items: asArray(skillsAttributes.items, `skills.items (${locale})`).map((item, index) => {
            const safeItem = item || {};
            requireFields(safeItem, ['title'], `skills.items[${index}]`);
            return {
                ...safeItem,
                tags: asArray(safeItem.tags, `skills.items[${index}].tags`),
                level: Number(safeItem.level || 0),
                html: renderContent(safeItem.content || ''),
            };
        }),
    };

    // 4. Jobs
    const jobsMod = getSectionModule('jobs', locale);
    const jobsAttributes = jobsMod.attributes || {};
    const jobs = {
        ...jobsAttributes,
        descriptionHtml: renderContent(jobsAttributes.description || '', 'content-dot ml-4 mt-2 text-muted-foreground'),
        items: sortByDateDesc(asArray(jobsAttributes.items, `jobs.items (${locale})`)).map((item, index) => {
            const safeItem = item || {};
            requireFields(safeItem, ['title', 'company'], `jobs.items[${index}]`);
            return {
                ...safeItem,
                html: renderContent(safeItem.content || '', 'content-arrow'),
            };
        }),
    };

    // 5. Products
    const productsMod = getSectionModule('products', locale);
    const productsAttributes = productsMod.attributes || {};
    const products = {
        ...productsAttributes,
        items: sortByYearDesc(asArray(productsAttributes.items, `products.items (${locale})`)).map((item, index) => {
            const safeItem = item || {};
            requireFields(safeItem, ['title', 'cover'], `products.items[${index}]`);
            return {
                ...safeItem,
                tags: asArray(safeItem.tags, `products.items[${index}].tags`),
                cover: resolveProductCover(safeItem.cover),
                html: renderContent(safeItem.content || '', 'content-dot'),
            };
        }),
    };

    // 6. Works
    const worksMod = getSectionModule('works', locale);
    const worksAttributes = worksMod.attributes || {};
    const works = {
        ...worksAttributes,
        items: sortByDateDesc(asArray(worksAttributes.items, `works.items (${locale})`)).map((item, index) => {
            const safeItem = item || {};
            requireFields(safeItem, ['title'], `works.items[${index}]`);
            return {
                ...safeItem,
                tags: asArray(safeItem.tags, `works.items[${index}].tags`),
                html: renderContent(safeItem.content || ''),
            };
        }),
    };

    // 7. Services
    const servicesMod = getSectionModule('services', locale);
    const servicesAttributes = servicesMod.attributes || {};
    const services = {
        ...servicesAttributes,
        items: asArray(servicesAttributes.items, `services.items (${locale})`).map((item, index) => {
            const safeItem = item || {};
            requireFields(safeItem, ['title'], `services.items[${index}]`);
            return {
                ...safeItem,
                includes: asArray(safeItem.includes, `services.items[${index}].includes`),
                excludes: asArray(safeItem.excludes, `services.items[${index}].excludes`),
            };
        }),
    };

    // 8. Footer
    const footerMod = getSectionModule('footer', locale);
    const footerAttributes = footerMod.attributes || {};
    const footer = {
        ...footerAttributes,
    };

    return {
        introduce,
        stories,
        skills,
        jobs,
        products,
        works,
        services,
        footer,
    };
};

const sectionsCache = {};

export const getSections = (locale = fallbackLocale) => {
    if (!sectionsCache[locale]) {
        sectionsCache[locale] = buildSectionsForLocale(locale);
    }
    return sectionsCache[locale];
};

// 兼容单例静态导出
const defaultSections = getSections(fallbackLocale);
export const introduceSection = defaultSections.introduce;
export const storiesSection = defaultSections.stories;
export const skillsSection = defaultSections.skills;
export const jobsSection = defaultSections.jobs;
export const productsSection = defaultSections.products;
export const worksSection = defaultSections.works;
export const servicesSection = defaultSections.services;
export const footerSection = defaultSections.footer;
